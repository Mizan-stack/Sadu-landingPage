/**
 * Image Library: Firestore metadata + Firebase Storage.
 * Path: sites/sdu-boutique/imageLibrary/{imageId}
 * Storage: sites/sdu-boutique/images/{filename}
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { uploadImage } from './upload';

const SITE_ID = 'sdu-boutique';
const STORAGE_BASE = `sites/${SITE_ID}/images`;

export interface LibraryImage {
  id: string;
  name: string;
  storagePath: string;
  downloadUrl: string;
  uploadedAt: Date;
}

function imageLibraryRef() {
  return collection(db, 'sites', SITE_ID, 'imageLibrary');
}

function imageDocRef(id: string) {
  return doc(db, 'sites', SITE_ID, 'imageLibrary', id);
}

/** List all images in the library, newest first. */
export async function listImages(): Promise<LibraryImage[]> {
  const q = query(imageLibraryRef(), orderBy('uploadedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name ?? 'Untitled',
      storagePath: data.storagePath ?? '',
      downloadUrl: data.downloadUrl ?? '',
      uploadedAt: data.uploadedAt?.toDate?.() ?? new Date(),
    };
  });
}

/** Upload a new image to the library. */
export async function addImage(
  file: File,
  name: string,
  onProgress?: (percent: number) => void
): Promise<LibraryImage> {
  const path = `${STORAGE_BASE}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const downloadUrl = await uploadImage(file, path, onProgress);

  const docRef = await addDoc(imageLibraryRef(), {
    name: name || file.name,
    storagePath: path,
    downloadUrl,
    uploadedAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    name: name || file.name,
    storagePath: path,
    downloadUrl,
    uploadedAt: new Date(),
  };
}

/** Rename an image. */
export async function renameImage(id: string, newName: string): Promise<void> {
  await updateDoc(imageDocRef(id), { name: newName });
}

/** Delete an image from library and Storage. */
export async function deleteImage(id: string): Promise<void> {
  const snap = await getDoc(imageDocRef(id));
  if (!snap.exists()) return;
  const data = snap.data();
  const storagePath = data?.storagePath;
  if (storagePath) {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  }
  await deleteDoc(imageDocRef(id));
}
