/**
 * Dashboard layout: fixed sidebar (luxury aesthetic), collapsible on mobile,
 * breadcrumbs, and main content area. RTL-friendly; sidebar on right.
 */
import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { PrefToggles } from '@/components/PrefToggles';
import { NavigationLoader } from '@/components/NavigationLoader';
import { SECTION_IDS } from '@/types/content';

const navItems: { path: string; icon: string; labelAr: string; labelEn: string }[] = [
  { path: '/', icon: '🏠', labelAr: 'الرئيسية', labelEn: 'Home' },
  { path: '/library', icon: '🖼️', labelAr: 'مكتبة الصور', labelEn: 'Image Library' },
  { path: '/global', icon: '🌐', labelAr: 'الإعدادات العامة', labelEn: 'Global Settings' },
  { path: '/sections', icon: '📄', labelAr: 'الأقسام', labelEn: 'Sections' },
  { path: '/contact', icon: '📞', labelAr: 'صفحة التواصل', labelEn: 'Contact Page' },
  { path: '/analytics', icon: '📊', labelAr: 'التحليلات', labelEn: 'Analytics' },
];

const SECTION_LABELS: Record<string, { ar: string; en: string }> = {
  hero: { ar: 'البطل', en: 'Hero' },
  hadara: { ar: 'حضارة', en: 'Hadara' },
  experience: { ar: 'التجربة', en: 'Experience' },
  identity: { ar: 'الهوية', en: 'Identity' },
  destinations: { ar: 'الوجهات', en: 'Destinations' },
  heritage: { ar: 'التراث', en: 'Heritage' },
  vision: { ar: 'الرؤية', en: 'Vision' },
  massage: { ar: 'الرسالة', en: 'Message' },
  room: { ar: 'القيم', en: 'Values' },
  footer: { ar: 'التذييل', en: 'Footer' },
};

function Breadcrumb() {
  const location = useLocation();
  const { sectionId } = useParams<{ sectionId: string }>();
  const { t, language } = usePreferences();
  const path = location.pathname;

  const PATH_LABELS: Record<string, string> = {
    '': t('home'),
    library: t('imageLibrary'),
    global: t('globalSettings'),
    sections: t('sections'),
    contact: t('contactPage'),
    analytics: t('analytics'),
  };

  const crumbs: string[] = [];
  if (path === '/') {
    crumbs.push(t('home'));
  } else {
    const segments = path.split('/').filter(Boolean);
    segments.forEach((seg) => {
      if (seg === 'sections' && sectionId && SECTION_LABELS[sectionId]) {
        crumbs.push(t('sections'));
        crumbs.push(SECTION_LABELS[sectionId][language]);
      } else if (seg !== sectionId) {
        crumbs.push(PATH_LABELS[seg] ?? seg);
      }
    });
  }

  return (
    <nav className="text-sm text-stone-500 dark:text-stone-400 mb-6" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={`${c}-${i}`}>
          {i > 0 && ' / '}
          <span className={i === crumbs.length - 1 ? 'text-stone-800 dark:text-stone-200 font-medium' : ''}>
            {c}
          </span>
        </span>
      ))}
    </nav>
  );
}

const SECTION_IDS_SET = new Set(SECTION_IDS);

export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'EDIT_SECTION' && typeof event.data.sectionId === 'string') {
        if (SECTION_IDS_SET.has(event.data.sectionId as (typeof SECTION_IDS)[number])) {
          navigate(`/sections/${event.data.sectionId}`);
        }
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [navigate]);

  const { t, language } = usePreferences();

  return (
    <div className="min-h-screen flex bg-cream dark:bg-stone-900 transition-colors" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <NavigationLoader />
      {/* Mobile hamburger — same side as sidebar: left for LTR, right for RTL */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-cream dark:bg-stone-800 border border-sand dark:border-stone-600 text-stone-700 dark:text-stone-200 hover:bg-sand dark:hover:bg-stone-700 transition-colors rtl:left-auto rtl:right-4"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay — visible only when sidebar open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
          aria-hidden
        />
      )}

      {/* Sidebar — left for LTR (English), right for RTL (Arabic) */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px] z-40 flex flex-col shadow-lg
          bg-cream dark:bg-stone-800 border-r border-sand dark:border-stone-600
          rtl:left-auto rtl:right-0 rtl:border-r-0 rtl:border-l rtl:border-l-sand dark:rtl:border-l-stone-600
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 rtl:translate-x-full rtl:md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-sand dark:border-stone-600">
          <h1 className="text-xl font-semibold text-maroon">{t('sduBoutique')}</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">{t('dashboardTitle')}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
          {navItems.map(({ path, icon, labelAr, labelEn }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-maroon text-white' : 'hover:bg-sand dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200'
                }`
              }
            >
              <span>{icon}</span>
              <span>{language === 'ar' ? labelAr : labelEn}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-sand dark:border-stone-600 space-y-3">
          <PrefToggles />
          <p className="text-sm text-stone-600 dark:text-stone-400 truncate" title={user?.email ?? undefined}>
            {user?.email ?? '—'}
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full py-2 rounded-lg border border-maroon text-maroon hover:bg-maroon hover:text-white transition-colors"
          >
            {t('signOut')}
          </button>
        </div>
      </aside>

      {/* Main content — margin for fixed sidebar: left margin when sidebar left (LTR), right when sidebar right (RTL) */}
      <main className="flex-1 min-w-0 ml-0 md:ml-[280px] px-4 py-6 md:px-6 md:py-8 bg-white dark:bg-stone-900 md:bg-cream/30 dark:md:bg-stone-900/50 z-10 rtl:md:ml-0 rtl:md:mr-[280px]">
        <Breadcrumb />
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-stone-600 dark:text-stone-400">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-maroon border-t-transparent" aria-hidden />
              <p className="text-sm font-medium">{t('loading')}</p>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
