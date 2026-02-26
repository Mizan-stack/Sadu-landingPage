/**
 * Firebase initialization for SDU Boutique Dashboard.
 * Uses the same project as the website (VITE_FIREBASE_* env vars).
 */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

if (!apiKey || !authDomain || !projectId || !appId) {
  throw new Error(
    'Firebase config is missing. Create dashboard/.env from .env.example and add your Firebase config values from Firebase Console → Project settings → Your apps.'
  );
}

const storageBucket =
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'sduksa.firebasestorage.app';
const storageBucketUrl = storageBucket.startsWith('gs://')
  ? storageBucket
  : `gs://${storageBucket}`;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  appId,
  storageBucket,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app, storageBucketUrl);

export { app, db, auth, storage };
