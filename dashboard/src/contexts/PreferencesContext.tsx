/**
 * User preferences: language (ar/en) and theme (light/dark).
 * Persists to Firestore users/{uid}. Auto-creates on first save.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  loadPreferences,
  savePreferences,
  type Language,
  type Theme,
  type UserPreferences,
} from '@/lib/preferences';
import { translations } from '@/lib/translations';

const DEFAULTS: UserPreferences = { language: 'ar', theme: 'light' };
const STORAGE_KEY = 'sdu-dashboard-prefs';

function loadFromStorage(): UserPreferences {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      const j = JSON.parse(s);
      return {
        language: j.language === 'en' ? 'en' : 'ar',
        theme: j.theme === 'dark' ? 'dark' : 'light',
      };
    }
  } catch {}
  return { ...DEFAULTS };
}

function saveToStorage(p: UserPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

interface PreferencesContextValue {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => Promise<void>;
  setTheme: (t: Theme) => Promise<void>;
  t: (key: import('@/lib/translations').TranslationKey) => string;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<UserPreferences>(() =>
    user ? DEFAULTS : loadFromStorage()
  );

  useEffect(() => {
    if (!user) {
      setPrefs(loadFromStorage());
      return;
    }
    let cancelled = false;
    loadPreferences(user.uid)
      .then((p) => {
        if (!cancelled) setPrefs(p);
      })
      .catch(() => {
        if (!cancelled) setPrefs(DEFAULTS);
      })
      .finally(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  const persist = useCallback(
    async (patch: Partial<UserPreferences>) => {
      const next = { ...prefs, ...patch };
      setPrefs(next);
      if (user) {
        try {
          await savePreferences(user.uid, patch);
        } catch (e) {
          console.warn('Failed to save preferences', e);
          setPrefs(prefs);
        }
      } else {
        saveToStorage(next);
      }
    },
    [user, prefs]
  );

  const setLanguage = useCallback(
    async (lang: Language) => {
      await persist({ language: lang });
    },
    [persist]
  );

  const setTheme = useCallback(
    async (t: Theme) => {
      await persist({ theme: t });
    },
    [persist]
  );

  const t = useCallback(
    (key: import('@/lib/translations').TranslationKey) => {
      const dict = prefs.language === 'en' ? translations.en : translations.ar;
      return dict[key] ?? key;
    },
    [prefs.language]
  );

  useEffect(() => {
    document.documentElement.lang = prefs.language === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = prefs.language === 'ar' ? 'rtl' : 'ltr';
  }, [prefs.language]);

  useEffect(() => {
    if (prefs.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [prefs.theme]);

  const value: PreferencesContextValue = {
    language: prefs.language,
    theme: prefs.theme,
    setLanguage,
    setTheme,
    t,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (ctx == null) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
}
