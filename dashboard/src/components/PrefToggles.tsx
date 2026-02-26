/**
 * Language and theme toggle buttons. Compact, accessible.
 */
import { usePreferences } from '@/contexts/PreferencesContext';

export function PrefToggles() {
  const { language, theme, setLanguage, setTheme, t } = usePreferences();

  return (
    <div className="flex items-center gap-2" role="group" aria-label={t('language')}>
      {/* Language */}
      <div className="flex rounded-lg border border-sand dark:border-stone-600 overflow-hidden">
        <button
          type="button"
          onClick={() => void setLanguage('ar')}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            language === 'ar'
              ? 'bg-maroon text-white'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-sand dark:hover:bg-stone-700'
          }`}
          aria-pressed={language === 'ar'}
          aria-label="العربية"
        >
          ع
        </button>
        <button
          type="button"
          onClick={() => void setLanguage('en')}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-maroon text-white'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-sand dark:hover:bg-stone-700'
          }`}
          aria-pressed={language === 'en'}
          aria-label="English"
        >
          EN
        </button>
      </div>

      {/* Theme */}
      <div className="flex rounded-lg border border-sand dark:border-stone-600 overflow-hidden">
        <button
          type="button"
          onClick={() => void setTheme('light')}
          className={`p-1.5 transition-colors ${
            theme === 'light'
              ? 'bg-maroon text-white'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-sand dark:hover:bg-stone-700'
          }`}
          aria-pressed={theme === 'light'}
          aria-label={t('lightMode')}
          title={t('lightMode')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => void setTheme('dark')}
          className={`p-1.5 transition-colors ${
            theme === 'dark'
              ? 'bg-maroon text-white'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-sand dark:hover:bg-stone-700'
          }`}
          aria-pressed={theme === 'dark'}
          aria-label={t('darkMode')}
          title={t('darkMode')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
