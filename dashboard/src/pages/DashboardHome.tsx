/**
 * Dashboard home: welcome header, optional stats, and quick action cards.
 * Luxury aesthetic — cream cards with maroon accent, hover shadow.
 */
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePreferences } from '@/contexts/PreferencesContext';

const quickActions = [
  { to: '/global', icon: '🌐', titleKey: 'globalSettings' as const, descKey: 'globalSettingsDesc' as const },
  { to: '/sections', icon: '📄', titleKey: 'sections' as const, descKey: 'sectionsDesc' as const },
  { to: '/contact', icon: '📞', titleKey: 'contactPage' as const, descKey: 'contactPageDesc' as const },
  { to: '/analytics', icon: '📊', titleKey: 'analytics' as const, descKey: 'analyticsDesc' as const },
];

export function DashboardHome() {
  const { user } = useAuth();
  const { t } = usePreferences();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-800 dark:text-stone-100">
          {t('welcomeTitle')}
        </h1>
        {user?.email && (
          <p className="mt-1 text-stone-600 dark:text-stone-400">{user.email}</p>
        )}
      </header>

      <section className="mb-8 rounded-xl bg-cream/50 dark:bg-stone-800/50 border border-sand dark:border-stone-600 p-4 md:p-5">
        <h2 className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">{t('overview')}</h2>
        <ul className="text-sm text-stone-600 dark:text-stone-400 flex flex-wrap gap-x-6 gap-y-1">
          <li><span className="font-medium text-stone-700 dark:text-stone-300">10</span> {t('homepageSections')}</li>
          <li>{t('contentArabic')}</li>
          <li>{t('hostingFirebase')}</li>
        </ul>
      </section>

      <section>
        <h2 className="sr-only">{t('quickActions')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickActions.map(({ to, icon, titleKey, descKey }) => (
            <Link
              key={to}
              to={to}
              className="block p-6 rounded-xl bg-cream dark:bg-stone-800 border border-sand dark:border-stone-600 border-t-4 border-t-maroon hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl" aria-hidden>{icon}</span>
              <h3 className="mt-2 text-lg font-medium text-stone-800 dark:text-stone-100">{t(titleKey)}</h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{t(descKey)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
