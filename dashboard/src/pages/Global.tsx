/**
 * Global settings editor: logo, phone, book now, nav.
 * Saves only `global` via updateDoc (does not overwrite home/contact).
 */
import { useState, useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { updateGlobal } from '@/lib/config';
import { FormFeedback } from '@/components/FormFeedback';
import { ImagePicker } from '@/components/ImagePicker';
import type { GlobalContent } from '@/types/content';

const defaultGlobal: GlobalContent = {
  logoUrl: '',
  sidebarLogoUrl: '',
  phone: '',
  bookNowText: '',
  bookNowLink: '',
  copyrightText: '',
  nav: [{ id: '', label: '', target: '', route: '' }],
};

function validateGlobal(g: GlobalContent): string | null {
  if (!g.bookNowText?.trim()) return 'Book now text is required.';
  if (!g.bookNowLink?.trim()) return 'Book now link is required.';
  const badNav = g.nav?.find((n) => !n.label?.trim() || !n.target?.trim());
  if (badNav) return 'Every nav item must have label and target.';
  return null;
}

const inputClass = 'w-full rounded border border-sand dark:border-stone-600 bg-white dark:bg-stone-700 px-3 py-2 text-stone-900 dark:text-stone-100';

export function Global() {
  const { config, loading, error: loadError, refetch } = useConfig();
  const [form, setForm] = useState<GlobalContent>(defaultGlobal);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (config?.global) setForm(config.global);
  }, [config?.global]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateGlobal(form);
    if (err) {
      setError(err);
      setSuccess(null);
      return;
    }
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      await updateGlobal(form);
      setSuccess('Global settings saved.');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Save failed';
      setError(message);
      console.error('updateGlobal error', e);
    } finally {
      setSaving(false);
    }
  }

  function setNavItem(i: number, field: 'id' | 'label' | 'target' | 'route', value: string) {
    setForm((prev) => ({
      ...prev,
      nav: prev.nav.map((item, idx) =>
        idx === i ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addNavItem() {
    setForm((prev) => ({ ...prev, nav: [...prev.nav, { id: '', label: '', target: '', route: '' }] }));
  }

  function removeNavItem(i: number) {
    setForm((prev) => ({
      ...prev,
      nav: prev.nav.filter((_, idx) => idx !== i),
    }));
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-4">Global</h1>
        <p className="text-stone-600 dark:text-stone-400">Loading…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-4">Global</h1>
        <FormFeedback error={loadError} success={null} />
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-2 rounded bg-sand dark:bg-stone-600 px-3 py-1 text-sm text-stone-800 dark:text-stone-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div dir="ltr">
      <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-4">Global</h1>
      <p className="text-stone-600 dark:text-stone-400 mb-4">
        Logo, phone, book-now button, and navigation. Paste a URL or upload an image.
      </p>

      <FormFeedback success={success} error={error} />
      {error && <div className="mt-2" />}

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <ImagePicker
          label="Logo"
          value={form.logoUrl}
          onChange={(url) => setForm((p) => ({ ...p, logoUrl: url }))}
        />
        <ImagePicker
          label="Sidebar logo (mobile)"
          value={form.sidebarLogoUrl ?? ''}
          onChange={(url) => setForm((p) => ({ ...p, sidebarLogoUrl: url }))}
        />
        <div>
          <label htmlFor="global-phone" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
            Phone
          </label>
          <input
            id="global-phone"
            type="text"
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+966 …"
          />
        </div>
        <div>
          <label htmlFor="global-bookNowText" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
            Book now button text <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="global-bookNowText"
            type="text"
            className={inputClass}
            value={form.bookNowText}
            onChange={(e) => setForm((p) => ({ ...p, bookNowText: e.target.value }))}
            placeholder="احجز الآن"
          />
        </div>
        <div>
          <label htmlFor="global-bookNowLink" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
            Book now link <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="global-bookNowLink"
            type="text"
            className={inputClass}
            value={form.bookNowLink}
            onChange={(e) => setForm((p) => ({ ...p, bookNowLink: e.target.value }))}
            placeholder="https://… or #section"
          />
        </div>
        <div>
          <label htmlFor="global-copyrightText" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
            Copyright text / نص حقوق النشر
          </label>
          <input
            id="global-copyrightText"
            type="text"
            className={inputClass}
            value={form.copyrightText ?? ''}
            onChange={(e) => setForm((p) => ({ ...p, copyrightText: e.target.value }))}
            placeholder="2026 © جميع الحقوق محفوظة سدو بوتيك"
            dir="rtl"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Navigation items *</span>
            <button
              type="button"
              onClick={addNavItem}
              className="text-sm text-maroon hover:underline"
            >
              + Add item
            </button>
          </div>
          <div className="space-y-3">
            {form.nav.map((item, i) => (
              <div key={i} className="rounded border border-sand dark:border-stone-600 p-3 space-y-2">
                <div><label className="block text-sm text-stone-600 dark:text-stone-400 mb-1">ID (section id)</label><input type="text" className={inputClass} value={item.id ?? ''} onChange={(e) => setNavItem(i, 'id', e.target.value)} placeholder="hero" /></div>
                <div><label className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Label / التسمية</label><input type="text" className={inputClass} value={item.label} onChange={(e) => setNavItem(i, 'label', e.target.value)} dir="rtl" placeholder="الرئيسية" /></div>
                <div><label className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Target (scroll or URL)</label><input type="text" className={inputClass} value={item.target} onChange={(e) => setNavItem(i, 'target', e.target.value)} placeholder="#hero or https://…" /></div>
                <div><label className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Route (optional)</label><input type="text" className={inputClass} value={item.route ?? ''} onChange={(e) => setNavItem(i, 'route', e.target.value)} placeholder="/contact" /></div>
                <button type="button" onClick={() => removeNavItem(i)} className="text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 px-2" disabled={form.nav.length <= 1}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-maroon px-4 py-2 text-white font-medium hover:bg-maroon-dark disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
