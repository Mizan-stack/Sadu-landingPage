/**
 * Migrate images from src/assets to Firebase Storage and update config with Storage URLs.
 * Run: cd dashboard && GOOGLE_APPLICATION_CREDENTIALS=../sduksa-key.json npx tsx scripts/migrate-images-to-storage.ts
 */
import 'dotenv/config';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';
import type { SiteConfig } from '../src/types/content';

const SITE_ID = 'sdu-boutique';
// Try both formats: .firebasestorage.app (new) or .appspot.com (legacy)
const STORAGE_BUCKETS = ['sduksa.firebasestorage.app', 'sduksa.appspot.com'] as const;
const STORAGE_BASE = `sites/${SITE_ID}/images`;
const PROJECT_ROOT = join(__dirname, '..', '..');
const ASSETS_IMAGES = join(PROJECT_ROOT, 'src', 'assets', 'images');
const ASSETS_ICONS = join(PROJECT_ROOT, 'src', 'assets', 'icons');

/** Map from seed path (e.g. /assets/images/hero.png) to Storage URL */
const pathToUrl: Record<string, string> = {};

function listFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
}

async function uploadAndGetUrl(
  localPath: string,
  storagePath: string,
  bucketName: string
): Promise<string> {
  const bucket = getStorage().bucket(bucketName);
  const file = bucket.file(storagePath);
  const buffer = readFileSync(localPath);
  await file.save(buffer, {
    metadata: { contentType: 'image/png' },
  });
  await file.makePublic();
  const encoded = encodeURIComponent(storagePath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encoded}?alt=media`;
}

async function main() {
  if (getApps().length === 0) {
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (keyPath) {
      initializeApp({ credential: cert(keyPath), storageBucket: STORAGE_BUCKETS[0] });
    } else {
      initializeApp({ storageBucket: STORAGE_BUCKETS[0] });
    }
  }

  const db = getFirestore();
  const configRef = db.doc('sites/sdu-boutique/config/main');

  // Find which bucket exists
  let bucketName: string | null = null;
  for (const b of STORAGE_BUCKETS) {
    try {
      const bucket = getStorage().bucket(b);
      const [exists] = await bucket.exists();
      if (exists) {
        bucketName = b;
        console.log(`Using bucket: ${b}`);
        break;
      }
    } catch {
      // try next
    }
  }
  if (!bucketName) {
    console.error(
      '\nFirebase Storage bucket not found. Please enable Storage in Firebase Console:\n' +
        '  1. Go to https://console.firebase.google.com/project/sduksa/storage\n' +
        '  2. Click "Get started" to create the default bucket\n' +
        '  3. Run this script again.\n'
    );
    process.exit(1);
  }

  console.log('Uploading images to Firebase Storage...');

  for (const name of listFiles(ASSETS_IMAGES)) {
    const localPath = join(ASSETS_IMAGES, name);
    const storagePath = `${STORAGE_BASE}/${name}`;
    const url = await uploadAndGetUrl(localPath, storagePath, bucketName);
    pathToUrl[`/assets/images/${name}`] = url;
    console.log(`  ${name} -> ${url.slice(0, 60)}...`);
  }

  for (const name of listFiles(ASSETS_ICONS)) {
    const localPath = join(ASSETS_ICONS, name);
    const storagePath = `${STORAGE_BASE}/icons/${name}`;
    const url = await uploadAndGetUrl(localPath, storagePath, bucketName);
    pathToUrl[`/assets/icons/${name}`] = url;
    console.log(`  icons/${name} -> ${url.slice(0, 60)}...`);
  }

  console.log('\nAdding to image library...');
  const imageLibraryRef = db.collection('sites').doc(SITE_ID).collection('imageLibrary');
  for (const [path, url] of Object.entries(pathToUrl)) {
    const name = path.split('/').pop() ?? path;
    const storagePath = path.startsWith('/assets/images/')
      ? `${STORAGE_BASE}/${name}`
      : `${STORAGE_BASE}/icons/${name}`;
    await imageLibraryRef.add({
      name,
      storagePath,
      downloadUrl: url,
      uploadedAt: new Date(),
    });
  }

  console.log('\nUpdating config with Storage URLs...');
  const snap = await configRef.get();
  if (!snap.exists) {
    console.error('Config document not found. Run seed first.');
    process.exit(1);
  }

  const config = snap.data() as SiteConfig;

  function replaceUrls(obj: unknown): unknown {
    if (typeof obj === 'string') {
      return pathToUrl[obj] ?? obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(replaceUrls);
    }
    if (obj && typeof obj === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        out[k] = replaceUrls(v);
      }
      return out;
    }
    return obj;
  }

  const updated = replaceUrls(config) as SiteConfig;
  await configRef.set(updated, { merge: true });
  console.log('Config updated with Storage URLs.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
