/**
 * Contact page editor: title, intro, sideImageUrl, form labels and placeholders.
 * Saves only `contact` via updateDoc (does not overwrite global/home).
 */
import { useState, useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { updateContact } from '@/lib/config';
import { FormFeedback } from '@/components/FormFeedback';
import { ImagePicker } from '@/components/ImagePicker';
import { PreviewPanel } from '@/components/PreviewPanel';
import type { ContactContent } from '@/types/content';

const defaultContact: ContactContent = {
  title: '',
  intro: '',
  sideImageUrl: '',
  form: {
    nameLabel: '',
    phoneLabel: '',
    emailLabel: '',
    messageLabel: '',
    submitText: '',
    placeholders: { name: '', phone: '', email: '', message: '' },
  },
};

function validateContact(c: ContactContent): string | null {
  if (!c.title.trim()) return 'Contact title is required.';
  if (!c.form.nameLabel.trim()) return 'Form name label is required.';
  if (!c.form.submitText.trim()) return 'Submit button text is required.';
  return null;
}

const siteUrl = import.meta.env.VITE_WEBSITE_URL || 'https://sduksa.web.app';
const contactPageUrl = `${siteUrl.replace(/\/$/, '')}/contact`;

export function Contact() {
  const { config, loading, error: loadError, refetch } = useConfig();
  const [form, setForm] = useState<ContactContent>(defaultContact);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  useEffect(() => {
    if (config?.contact) setForm(config.contact);
  }, [config?.contact]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateContact(form);
    if (err) {
      setError(err);
      setSuccess(null);
      return;
    }
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      await updateContact(form);
      setSuccess('Contact page saved.');
      setPreviewKey((k) => k + 1);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Save failed';
      setError(message);
      console.error('updateContact error', e);
    } finally {
      setSaving(false);
    }
  }

  const updateForm = (patch: Partial<ContactContent['form']>) =>
    setForm((p) => ({ ...p, form: { ...p.form, ...patch } }));
  const updatePlaceholders = (patch: Partial<ContactContent['form']['placeholders']>) =>
    setForm((p) => ({ ...p, form: { ...p.form, placeholders: { ...p.form.placeholders, ...patch } } }));

  const inputClass = 'w-full rounded border border-sand dark:border-stone-600 bg-white dark:bg-stone-700 px-3 py-2 text-stone-900 dark:text-stone-100';

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-4">Contact</h1>
        <p className="text-stone-600 dark:text-stone-400">Loading…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-4">Contact</h1>
        <FormFeedback error={loadError} success={null} />
        <button type="button" onClick={() => void refetch()} className="mt-2 rounded bg-sand dark:bg-stone-600 px-3 py-1 text-sm text-stone-800 dark:text-stone-200">Retry</button>
      </div>
    );
  }

  return (
    <div dir="ltr">
      <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mb-1">Contact Page</h1>
      <p className="text-stone-600 dark:text-stone-400 mb-4">Edit contact page title, intro, and form labels/placeholders. Paste URL or upload image.</p>
      <FormFeedback success={success} error={error} />

      {/* Mobile: Preview toggle */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobilePreviewOpen(true)}
          className="rounded-xl border border-sand dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-sand dark:hover:bg-stone-600 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 h-[calc(100vh-120px)] min-h-0">
        <div className="flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-24">
            <form id="contact-form" onSubmit={handleSubmit} className="max-w-xl space-y-4">
              <div>
                <label htmlFor="contact-title" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Page title <span className="text-red-600 dark:text-red-400">*</span></label>
                <input id="contact-title" type="text" className={inputClass} value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="contact-intro" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Intro text</label>
                <textarea id="contact-intro" rows={3} className={inputClass} value={form.intro} onChange={(e) => setForm((p) => ({ ...p, intro: e.target.value }))} />
              </div>
              <ImagePicker
                label="Side image (optional)"
                value={form.sideImageUrl ?? ''}
                onChange={(url) => setForm((p) => ({ ...p, sideImageUrl: url }))}
              />

              <fieldset className="border border-sand dark:border-stone-600 rounded p-4">
                <legend className="text-sm font-medium text-stone-700 dark:text-stone-300">Form labels</legend>
                <div className="grid gap-3 mt-2">
                  <div><label htmlFor="form-nameLabel" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Name label *</label><input id="form-nameLabel" type="text" className={inputClass} value={form.form.nameLabel} onChange={(e) => updateForm({ nameLabel: e.target.value })} /></div>
                  <div><label htmlFor="form-phoneLabel" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Phone label / تسمية الجوال</label><input id="form-phoneLabel" type="text" className={inputClass} value={form.form.phoneLabel} onChange={(e) => updateForm({ phoneLabel: e.target.value })} /></div>
                  <div><label htmlFor="form-emailLabel" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Email label</label><input id="form-emailLabel" type="text" className={inputClass} value={form.form.emailLabel} onChange={(e) => updateForm({ emailLabel: e.target.value })} /></div>
                  <div><label htmlFor="form-messageLabel" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Message label</label><input id="form-messageLabel" type="text" className={inputClass} value={form.form.messageLabel} onChange={(e) => updateForm({ messageLabel: e.target.value })} /></div>
                  <div><label htmlFor="form-submitText" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Submit button text *</label><input id="form-submitText" type="text" className={inputClass} value={form.form.submitText} onChange={(e) => updateForm({ submitText: e.target.value })} /></div>
                </div>
              </fieldset>

              <fieldset className="border border-sand dark:border-stone-600 rounded p-4">
                <legend className="text-sm font-medium text-stone-700 dark:text-stone-300">Form placeholders</legend>
                <div className="grid gap-3 mt-2">
                  <div><label htmlFor="ph-name" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Name placeholder</label><input id="ph-name" type="text" className={inputClass} value={form.form.placeholders.name} onChange={(e) => updatePlaceholders({ name: e.target.value })} /></div>
                  <div><label htmlFor="ph-phone" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Phone placeholder</label><input id="ph-phone" type="text" className={inputClass} value={form.form.placeholders.phone} onChange={(e) => updatePlaceholders({ phone: e.target.value })} placeholder="مثال: 1256 123 961" /></div>
                  <div><label htmlFor="ph-email" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Email placeholder</label><input id="ph-email" type="text" className={inputClass} value={form.form.placeholders.email} onChange={(e) => updatePlaceholders({ email: e.target.value })} /></div>
                  <div><label htmlFor="ph-message" className="block text-sm text-stone-600 dark:text-stone-400 mb-1">Message placeholder</label><input id="ph-message" type="text" className={inputClass} value={form.form.placeholders.message} onChange={(e) => updatePlaceholders({ message: e.target.value })} /></div>
                </div>
              </fieldset>

            </form>
          </div>
        </div>
        <div className="hidden lg:block min-h-0">
          <PreviewPanel siteUrl={contactPageUrl} refreshKey={previewKey} />
        </div>
      </div>

      {/* Fixed save bar — always visible at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:pl-[280px] rtl:md:pl-0 rtl:md:pr-[280px] px-4 md:px-6 py-3 border-t border-sand dark:border-stone-600 bg-cream/95 dark:bg-stone-900/95 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-2xl">
          <button
            type="submit"
            form="contact-form"
            disabled={saving}
            className="w-full rounded-xl bg-maroon px-6 py-3 text-white font-medium hover:bg-maroon-dark disabled:opacity-60 transition-colors shadow-sm"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* Mobile preview overlay */}
      {mobilePreviewOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-stone-900 lg:hidden flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-sand dark:border-stone-600 bg-white dark:bg-stone-900 shrink-0">
            <span className="font-medium text-stone-800 dark:text-stone-100">Preview</span>
            <button
              type="button"
              onClick={() => setMobilePreviewOpen(false)}
              className="p-2 rounded hover:bg-sand dark:hover:bg-stone-600 text-stone-600 dark:text-stone-400"
              aria-label="Close preview"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 min-h-0 p-2">
            <PreviewPanel siteUrl={contactPageUrl} refreshKey={previewKey} />
          </div>
        </div>
      )}
    </div>
  );
}
