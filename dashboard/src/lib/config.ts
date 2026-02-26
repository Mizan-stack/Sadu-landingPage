/**
 * Firestore config helpers: doc ref and partial updates (no overwrite of other keys).
 * Path: sites/sdu-boutique/config
 */
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  SiteConfig,
  GlobalContent,
  ContactContent,
  HomeContent,
} from '@/types/content';

export function getConfigRef() {
  return doc(db, 'sites', 'sdu-boutique', 'config', 'main');
}

export async function loadConfig(): Promise<SiteConfig | null> {
  const ref = getConfigRef();
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as SiteConfig) : null;
}

/** Update only `global`. Other keys (home, contact) unchanged. */
export async function updateGlobal(global: GlobalContent): Promise<void> {
  const ref = getConfigRef();
  await updateDoc(ref, { global });
}

/** Update only one home section. Other sections and global/contact unchanged. */
export async function updateSection(
  sectionId: keyof HomeContent,
  section: HomeContent[keyof HomeContent]
): Promise<void> {
  const ref = getConfigRef();
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { home: { [sectionId]: section } }, { merge: true });
    return;
  }
  await updateDoc(ref, { [`home.${sectionId}`]: section });
}

/** Update only `contact`. Other keys unchanged. */
export async function updateContact(contact: ContactContent): Promise<void> {
  const ref = getConfigRef();
  await updateDoc(ref, { contact });
}
