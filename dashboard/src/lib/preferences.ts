/**
 * User preferences: language and theme. Stored in Firestore at users/{uid}.
 * Auto-creates doc on first write (setDoc with merge).
 */
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export interface UserPreferences {
  language: Language;
  theme: Theme;
}

const DEFAULTS: UserPreferences = {
  language: 'ar',
  theme: 'light',
};

export function prefsRef(uid: string) {
  return doc(db, 'users', uid);
}

export async function loadPreferences(uid: string): Promise<UserPreferences> {
  const snap = await getDoc(prefsRef(uid));
  if (snap.exists()) {
    const d = snap.data();
    return {
      language: d.language === 'en' ? 'en' : 'ar',
      theme: d.theme === 'dark' ? 'dark' : 'light',
    };
  }
  return { ...DEFAULTS };
}

export async function savePreferences(uid: string, prefs: Partial<UserPreferences>): Promise<void> {
  await setDoc(prefsRef(uid), prefs, { merge: true });
}
