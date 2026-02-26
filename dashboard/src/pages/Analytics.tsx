/**
 * Analytics: link to Firebase Console Analytics and short instructions.
 * Website analytics (users, sessions, events) are in the same Firebase project.
 */
export function Analytics() {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const analyticsUrl = projectId
    ? `https://console.firebase.google.com/project/${projectId}/analytics`
    : 'https://console.firebase.google.com/';

  return (
    <div>
      <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-4">Analytics</h1>
      <p className="text-stone-600 dark:text-stone-400 mb-6">
        Website analytics (users, sessions, device, country) and custom events (e.g. contact form, book now) are in the same Firebase project. View reports in Firebase Console.
      </p>
      <div className="rounded-lg border border-sand dark:border-stone-600 bg-white dark:bg-stone-800 p-6 max-w-2xl">
        <h2 className="font-medium text-stone-900 dark:text-stone-100 mb-2">Open Firebase Analytics</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
          Use the Dashboard for overview (users, sessions) and Events for custom events like <code className="bg-stone-100 dark:bg-stone-700 px-1 rounded">contact_form_submit</code> and <code className="bg-stone-100 dark:bg-stone-700 px-1 rounded">book_now_click</code>.
        </p>
        <a
          href={analyticsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-maroon-dark px-4 py-2 text-white hover:bg-maroon-dark/90 transition-colors"
        >
          Open Firebase Console → Analytics
          <span className="text-sm opacity-80" aria-hidden>↗</span>
        </a>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mt-6">
        Full details and optional GA4 setup: <code className="bg-stone-100 dark:bg-stone-700 px-1 rounded">docs/ANALYTICS.md</code> in this repo.
      </p>
    </div>
  );
}
