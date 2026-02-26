import { useState, useEffect } from 'react';
import { doc, getDoc, getDocFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';

let cachedConfig = null;

/**
 * Path must match dashboard seed: sites/sdu-boutique/config/main
 * (dashboard/src/types/content.ts CONFIG_PATH)
 */
const CONFIG_REF = db
  ? doc(db, 'sites', 'sdu-boutique', 'config', 'main')
  : null;

export function useContent() {
  const [config, setConfig] = useState(cachedConfig ?? null);
  const [loading, setLoading] = useState(!cachedConfig);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedConfig !== null) {
      setConfig(cachedConfig);
      setLoading(false);
      return;
    }
    if (!db || !CONFIG_REF) {
      setError(new Error('Firebase not configured'));
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    // Use getDocFromServer to bypass Firestore cache so edits from dashboard appear immediately
    getDocFromServer(CONFIG_REF)
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          cachedConfig = data;
          setConfig(data);
        } else {
          setConfig(null);
        }
      })
      .catch((err) => {
        console.warn('[useContent] Failed to load config:', err);
        setError(err);
        setConfig(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { config, loading, error };
}
