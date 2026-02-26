/**
 * Sections list: all homepage section IDs in order; link to edit each.
 */
import { Link } from 'react-router-dom';
import { SECTION_IDS, SECTION_LABELS, SECTION_DESCRIPTIONS } from '@/types/content';

export function Sections() {
  return (
    <div dir="ltr">
      <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-1">
        أقسام الصفحة الرئيسية
      </h1>
      <p className="text-stone-600 dark:text-stone-400 mb-6">
        Edit content for each section of the website homepage
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTION_IDS.map((sectionId, index) => (
          <li key={sectionId}>
            <Link
              to={`/sections/${sectionId}`}
              className="block p-6 rounded-xl bg-cream dark:bg-stone-800 border border-sand dark:border-stone-600 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2 py-1 rounded bg-maroon/10 dark:bg-maroon/20 text-maroon dark:text-maroon-light">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
                  {SECTION_LABELS[sectionId] ?? sectionId}
                </h3>
              </div>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                {SECTION_DESCRIPTIONS[sectionId] ?? '—'}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-maroon dark:text-maroon-light font-medium text-sm">
                Edit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
