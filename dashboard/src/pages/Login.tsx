/**
 * Sign-in page at /login. Luxury brand redesign: split layout (brand + form),
 * password visibility toggle, bilingual labels, RTL. Auth logic unchanged.
 */
import { useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { PrefToggles } from '@/components/PrefToggles';

export function Login() {
  const { user, loading, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { t, language } = usePreferences();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'auth/invalid-credential'
          ? t('invalidCredentials')
          : t('signInFailed');
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream" aria-hidden="true">
        <div className="w-10 h-10 border-2 border-maroon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user != null) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream dark:bg-stone-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile: compact branded header above form */}
      <div className="md:hidden py-6 text-center bg-gradient-to-br from-maroon to-maroon-dark text-white relative">
        <div className="absolute top-4 left-4">
          <PrefToggles />
        </div>
        <h2 className="text-2xl font-serif font-semibold">سدو بوتيك</h2>
        <p className="text-sm text-cream/90 mt-1">SDU Boutique</p>
      </div>

      {/* Form area: appears on RIGHT in RTL (40% desktop), full on mobile — DOM order first so RTL places it right */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-cream dark:bg-stone-900 min-h-screen md:min-h-0 relative">
        <div className="absolute top-4 left-4 hidden md:block">
          <PrefToggles />
        </div>
        <div className="w-full max-w-md rounded-xl bg-white dark:bg-stone-800 shadow-xl border border-sand dark:border-stone-600 p-8">
          <h1 className="text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-1">{t('dashboardTitle')}</h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-6">{t('login')}</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                {t('email')}
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-sand dark:border-stone-600 bg-cream dark:bg-stone-700 px-4 py-2.5 text-stone-800 dark:text-stone-100 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors duration-200"
                placeholder="admin@example.com"
                dir="ltr"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-sand dark:border-stone-600 bg-cream dark:bg-stone-700 pl-4 pr-12 py-2.5 text-stone-800 dark:text-stone-100 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors duration-200"
                  placeholder="••••••••"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 rounded transition-colors duration-200"
                  aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878a4.501 4.501 0 116.045 6.045M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2 text-sm" role="alert">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-maroon text-white py-3 font-medium hover:bg-maroon-dark focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {submitting ? t('loggingIn') : t('login')}
            </button>
          </form>
        </div>
      </div>

      {/* Brand area: appears on LEFT in RTL (60% desktop), hidden on mobile */}
      <div className="hidden md:flex md:w-[60%] bg-gradient-to-br from-maroon to-maroon-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-[length:24px_24px] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1' fill='%23fff'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <h2 className="text-3xl font-serif font-semibold">سدو بوتيك</h2>
          <p className="mt-2 text-cream/90 text-lg">SDU Boutique</p>
          <p className="mt-4 text-sm text-cream/80">اختبر الرفاهية كما يجب أن تكون</p>
        </div>
      </div>
    </div>
  );
}
