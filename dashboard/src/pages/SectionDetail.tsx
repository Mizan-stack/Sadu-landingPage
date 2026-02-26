/**
 * Single section editor. Form shape depends on sectionId; save updates only that section.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useConfig } from '@/hooks/useConfig';
import { updateSection } from '@/lib/config';
import { FormFeedback } from '@/components/FormFeedback';
import { ImagePicker } from '@/components/ImagePicker';
import { PreviewPanel } from '@/components/PreviewPanel';
import {
  SECTION_IDS,
  SECTION_LABELS,
  SECTION_DESCRIPTIONS,
  type HomeContent,
  type HeroSection,
  type HadaraSection,
  type ExperienceSection,
  type IdentitySection,
  type DestinationsSection,
  type HeritageSection,
  type VisionSection,
  type MassageSection,
  type RoomSection,
  type FooterSection,
} from '@/types/content';

const SECTION_IDS_SET = new Set(SECTION_IDS);

function isSectionId(id: string): id is keyof HomeContent {
  return SECTION_IDS_SET.has(id as keyof HomeContent);
}

export function SectionDetail() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { config, loading, error: loadError, refetch } = useConfig();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<HomeContent[keyof HomeContent] | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [previewKey, setPreviewKey] = useState(0);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const validId = sectionId && isSectionId(sectionId) ? sectionId : null;
  const sectionData = validId && config?.home ? config.home[validId] : null;

  useEffect(() => {
    if (sectionData) setForm(sectionData);
  }, [sectionData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validId || !form) return;
    setSaving(true);
    try {
      await updateSection(validId, form);
      setToast({ message: 'تم الحفظ بنجاح', type: 'success' });
      await refetch();
      setPreviewKey((k) => k + 1);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Save failed';
      setToast({ message, type: 'error' });
      console.error('updateSection error', e);
    } finally {
      setSaving(false);
    }
  }

  const breadcrumb = (
    <nav className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-4" aria-label="Breadcrumb">
      <Link to="/" className="text-maroon dark:text-maroon-light hover:underline">Home</Link>
      <span aria-hidden>/</span>
      <Link to="/sections" className="text-maroon dark:text-maroon-light hover:underline">Sections</Link>
      {validId && (
        <>
          <span aria-hidden>/</span>
          <span className="text-stone-700 dark:text-stone-300 font-medium">{SECTION_LABELS[validId]}</span>
        </>
      )}
    </nav>
  );

  if (!sectionId || !validId) {
    return (
      <div dir="ltr">
        {breadcrumb}
        <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mt-4">Section not found</h1>
        <p className="text-stone-600 dark:text-stone-400">Invalid section ID.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div dir="ltr">
        {breadcrumb}
        <h1 className="text-2xl font-semibold text-maroon-dark dark:text-maroon-light mt-4">{SECTION_LABELS[validId]}</h1>
        <p className="text-stone-600 dark:text-stone-400">Loading…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div dir="ltr">
        {breadcrumb}
        <h1 className="text-2xl font-semibold text-maroon-dark mt-4">{SECTION_LABELS[validId]}</h1>
        <FormFeedback error={loadError} success={null} />
        <button type="button" onClick={() => void refetch()} className="mt-2 rounded bg-sand dark:bg-stone-600 px-3 py-1 text-sm text-stone-800 dark:text-stone-200">Retry</button>
      </div>
    );
  }

  if (!form) {
    return (
      <div dir="ltr">
        {breadcrumb}
        <h1 className="text-2xl font-semibold text-maroon-dark mt-4">{SECTION_LABELS[validId]}</h1>
        {config === null ? (
          <div className="mt-4 space-y-2 text-stone-600">
            <p>Config document not found in Firestore.</p>
            <p className="text-sm">Run the seed script to populate: <code className="rounded bg-sand px-1 py-0.5">cd dashboard && npm run seed</code></p>
            <p className="text-sm">Ensure Firestore rules are deployed: <code className="rounded bg-sand px-1 py-0.5">firebase deploy --only firestore</code></p>
            <button type="button" onClick={() => void refetch()} className="mt-2 rounded bg-sand px-3 py-1 text-sm hover:bg-beige">Retry</button>
          </div>
        ) : (
          <p className="text-stone-600 mt-4">No section data.</p>
        )}
      </div>
    );
  }

  const label = (id: string, text: string, required?: boolean) => (
    <label htmlFor={id} className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
      {text} {required && <span className="text-red-600">*</span>}
    </label>
  );
  const input = (
    id: string,
    value: string,
    onChange: (v: string) => void,
    _type?: 'text' | 'url',
    placeholder?: string,
    dir?: 'rtl' | 'ltr'
  ) => (
    <input
      id={id}
      type="text"
      className="w-full rounded border border-sand dark:border-stone-600 bg-white dark:bg-stone-700 px-3 py-2 text-stone-900 dark:text-stone-100"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
    />
  );
  const textarea = (id: string, value: string, onChange: (v: string) => void, dir?: 'rtl' | 'ltr') => (
    <textarea
      id={id}
      rows={3}
      className="w-full rounded border border-sand dark:border-stone-600 bg-white dark:bg-stone-700 px-3 py-2 text-stone-900 dark:text-stone-100"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      dir={dir}
    />
  );
  const groupHeading = (text: string) => (
    <h3 className="text-sm uppercase tracking-wide text-stone-400 dark:text-stone-500 mt-4 mb-2 first:mt-0">{text}</h3>
  );
  const arrayRow = (index: number, children: React.ReactNode, onRemove: () => void, key?: number) => (
    <div
      key={key ?? index}
      className={`flex items-start gap-2 rounded border border-sand dark:border-stone-600 p-3 ${index % 2 === 0 ? 'bg-white dark:bg-stone-800' : 'bg-stone-50 dark:bg-stone-700/50'}`}
    >
      <span className="cursor-grab shrink-0 pt-2 text-stone-400" aria-hidden title="Drag handle">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6h2v2H8V6zm0 5h2v2H8v-2zm0 5h2v2H8v-2zm5-10h2v2h-2V6zm0 5h2v2h-2v-2zm0 5h2v2h-2v-2z"/></svg>
      </span>
      <div className="flex-1 min-w-0 space-y-2">{children}</div>
      <button type="button" onClick={onRemove} className="shrink-0 text-sm text-red-600 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
    </div>
  );

  const set = (patch: Partial<HomeContent[keyof HomeContent]>) =>
    setForm((p) => (p ? ({ ...p, ...patch } as HomeContent[keyof HomeContent]) : p));

  let fields: React.ReactNode;
  switch (validId) {
    case 'hero': {
      const s = form as HeroSection;
      const updateSlide = (index: number, field: string, value: string) => {
        setForm((p) => {
          if (!p || !('slides' in p)) return p;
          const next = [...(p as HeroSection).slides];
          const cur = next[index];
          next[index] = { imageUrl: field === 'imageUrl' ? value : (cur?.imageUrl ?? '') };
          return { ...p, slides: next } as HomeContent[keyof HomeContent];
        });
      };
      const addSlide = () => {
        setForm((p) => {
          if (!p || !('slides' in p)) return p;
          return { ...p, slides: [...(p as HeroSection).slides, { imageUrl: '' }] } as HomeContent[keyof HomeContent];
        });
      };
      const removeSlide = (index: number) => {
        setForm((p) => {
          if (!p || !('slides' in p)) return p;
          const next = (p as HeroSection).slides.filter((_, i) => i !== index);
          return { ...p, slides: next } as HomeContent[keyof HomeContent];
        });
      };
      const updateStat = (index: number, field: string, value: string) => {
        setForm((p) => {
          if (!p || !('stats' in p)) return p;
          const next = [...(p as HeroSection).stats];
          const cur = next[index];
          next[index] = {
            value: field === 'value' ? value : (cur?.value ?? ''),
            label: field === 'label' ? value : (cur?.label ?? ''),
          };
          return { ...p, stats: next } as HomeContent[keyof HomeContent];
        });
      };
      const addStat = () => {
        setForm((p) => {
          if (!p || !('stats' in p)) return p;
          return { ...p, stats: [...(p as HeroSection).stats, { value: '', label: '' }] } as HomeContent[keyof HomeContent];
        });
      };
      const removeStat = (index: number) => {
        setForm((p) => {
          if (!p || !('stats' in p)) return p;
          const next = (p as HeroSection).stats.filter((_, i) => i !== index);
          return { ...p, stats: next } as HomeContent[keyof HomeContent];
        });
      };
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('hero-title', 'Title / العنوان', true)}{input('hero-title', s.title, (v) => set({ title: v }), undefined, undefined, 'rtl')}</div>
            <div>{label('hero-hotelCardText', 'Hotel card text / نص بطاقة الفنادق')}{input('hero-hotelCardText', s.hotelCardText, (v) => set({ hotelCardText: v }), undefined, undefined, 'rtl')}</div>
          </div>
          {groupHeading('Cards / Items')}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">Slides / الشرائح</span>
              <button type="button" onClick={addSlide} className="text-sm text-maroon hover:underline">+ Add slide</button>
            </div>
            <div className="space-y-2">
              {(s.slides || []).map((slide, i) =>
                arrayRow(
                  i,
                  <ImagePicker
                    label="Slide image"
                    value={slide.imageUrl}
                    onChange={(url) => updateSlide(i, 'imageUrl', url)}
                  />,
                  () => removeSlide(i)
                )
              )}
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">Stats / الإحصائيات</span>
              <button type="button" onClick={addStat} className="text-sm text-maroon hover:underline">+ Add stat</button>
            </div>
            <div className="space-y-2">
              {(s.stats || []).map((stat, i) =>
                arrayRow(
                  i,
                  <>
                    <div>{label(`stat-${i}-value`, 'Value')}{input(`stat-${i}-value`, stat.value, (v) => updateStat(i, 'value', v), 'text', undefined, 'rtl')}</div>
                    <div>{label(`stat-${i}-label`, 'Label / التسمية')}{input(`stat-${i}-label`, stat.label, (v) => updateStat(i, 'label', v), 'text', undefined, 'rtl')}</div>
                  </>,
                  () => removeStat(i)
                )
              )}
            </div>
          </div>
        </>
      );
      break;
    }
    case 'hadara': {
      const s = form as HadaraSection;
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('hadara-heading', 'Heading / العنوان')}{input('hadara-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
            <div>{label('hadara-introText', 'Intro text / النص التمهيدي')}{textarea('hadara-introText', s.introText, (v) => set({ introText: v }), 'rtl')}</div>
            <div>{label('hadara-body', 'Body / النص الجانبي')}{textarea('hadara-body', s.body, (v) => set({ body: v }), 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Title icon" value={s.titleIconUrl} onChange={(v) => set({ titleIconUrl: v })} />
            <ImagePicker label="Ornament" value={s.ornamentUrl} onChange={(v) => set({ ornamentUrl: v })} />
            <ImagePicker label="Main image" value={s.mainImageUrl} onChange={(v) => set({ mainImageUrl: v })} />
            <ImagePicker label="Small image" value={s.smallImageUrl} onChange={(v) => set({ smallImageUrl: v })} />
            <ImagePicker label="Pattern image" value={s.patternImageUrl} onChange={(v) => set({ patternImageUrl: v })} />
          </div>
        </>
      );
      break;
    }
    case 'experience': {
      const s = form as ExperienceSection;
      const updateCard = (index: number, field: string, value: string) => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          const next = [...(p as ExperienceSection).cards];
          const cur = next[index];
          next[index] = { title: cur?.title ?? '', imageUrl: cur?.imageUrl ?? '', description: cur?.description ?? '', [field]: value };
          return { ...p, cards: next } as HomeContent[keyof HomeContent];
        });
      };
      const addCard = () => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          return { ...p, cards: [...(p as ExperienceSection).cards, { title: '', imageUrl: '', description: '' }] } as HomeContent[keyof HomeContent];
        });
      };
      const removeCard = (index: number) => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          const next = (p as ExperienceSection).cards.filter((_, i) => i !== index);
          return { ...p, cards: next } as HomeContent[keyof HomeContent];
        });
      };
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('exp-heading', 'Heading / العنوان')}{input('exp-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
            <div>{label('exp-description', 'Description / الوصف')}{textarea('exp-description', s.description, (v) => set({ description: v }), 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Background image" value={s.backgroundImageUrl} onChange={(v) => set({ backgroundImageUrl: v })} />
          </div>
          {groupHeading('Cards / Items')}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">Cards / البطاقات</span>
              <button type="button" onClick={addCard} className="text-sm text-maroon hover:underline">+ Add card</button>
            </div>
            <div className="space-y-2">
              {(s.cards || []).map((card, i) =>
                arrayRow(
                  i,
                  <>
                    <div>{label(`card-${i}-title`, 'Title')}{input(`card-${i}-title`, card.title, (v) => updateCard(i, 'title', v), 'text', undefined, 'rtl')}</div>
                    <ImagePicker label="Card image" value={card.imageUrl} onChange={(v) => updateCard(i, 'imageUrl', v)} />
                    <div>{label(`card-${i}-description`, 'Description')}{textarea(`card-${i}-description`, card.description, (v) => updateCard(i, 'description', v), 'rtl')}</div>
                  </>,
                  () => removeCard(i)
                )
              )}
            </div>
          </div>
        </>
      );
      break;
    }
    case 'identity': {
      const s = form as IdentitySection;
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('id-heading', 'Heading / العنوان')}{input('id-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
            <div>{label('id-body', 'Body / النص')}{textarea('id-body', s.body, (v) => set({ body: v }), 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Main image" value={s.mainImageUrl} onChange={(v) => set({ mainImageUrl: v })} />
            <ImagePicker label="Pattern image" value={s.patternImageUrl} onChange={(v) => set({ patternImageUrl: v })} />
          </div>
        </>
      );
      break;
    }
    case 'destinations': {
      const s = form as DestinationsSection;
      const updateCard = (index: number, field: string, value: string) => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          const next = [...(p as DestinationsSection).cards];
          const cur = next[index];
          next[index] = { name: cur?.name ?? '', imageUrl: cur?.imageUrl ?? '', description: cur?.description ?? '', [field]: value };
          return { ...p, cards: next } as HomeContent[keyof HomeContent];
        });
      };
      const addCard = () => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          return { ...p, cards: [...(p as DestinationsSection).cards, { name: '', imageUrl: '', description: '' }] } as HomeContent[keyof HomeContent];
        });
      };
      const removeCard = (index: number) => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          const next = (p as DestinationsSection).cards.filter((_, i) => i !== index);
          return { ...p, cards: next } as HomeContent[keyof HomeContent];
        });
      };
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('dest-heading', 'Heading / العنوان')}{input('dest-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
          </div>
          {groupHeading('Cards / Items')}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">Cards / البطاقات</span>
              <button type="button" onClick={addCard} className="text-sm text-maroon hover:underline">+ Add card</button>
            </div>
            <div className="space-y-2">
              {(s.cards || []).map((card, i) =>
                arrayRow(
                  i,
                  <>
                    <div>{label(`card-${i}-name`, 'Name / الاسم')}{input(`card-${i}-name`, card.name, (v) => updateCard(i, 'name', v), 'text', undefined, 'rtl')}</div>
                    <ImagePicker label="Image" value={card.imageUrl} onChange={(v) => updateCard(i, 'imageUrl', v)} />
                    <div>{label(`card-${i}-description`, 'Description')}{textarea(`card-${i}-description`, card.description, (v) => updateCard(i, 'description', v), 'rtl')}</div>
                  </>,
                  () => removeCard(i)
                )
              )}
            </div>
          </div>
        </>
      );
      break;
    }
    case 'heritage': {
      const s = form as HeritageSection;
      const updateImage = (index: number, value: string) => {
        setForm((p) => {
          if (!p || !('images' in p)) return p;
          const next = [...(p as HeritageSection).images];
          next[index] = { imageUrl: value };
          return { ...p, images: next } as HomeContent[keyof HomeContent];
        });
      };
      const addImage = () => {
        setForm((p) => {
          if (!p || !('images' in p)) return p;
          return { ...p, images: [...(p as HeritageSection).images, { imageUrl: '' }] } as HomeContent[keyof HomeContent];
        });
      };
      const removeImage = (index: number) => {
        setForm((p) => {
          if (!p || !('images' in p)) return p;
          const next = (p as HeritageSection).images.filter((_, i) => i !== index);
          return { ...p, images: next } as HomeContent[keyof HomeContent];
        });
      };
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('her-heading', 'Heading / العنوان')}{input('her-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
            <div>{label('her-body', 'Body / النص')}{textarea('her-body', s.body, (v) => set({ body: v }), 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Ornament" value={s.ornamentUrl} onChange={(v) => set({ ornamentUrl: v })} />
          </div>
          {groupHeading('Cards / Items')}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">Images / الصور</span>
              <button type="button" onClick={addImage} className="text-sm text-maroon hover:underline">+ Add image</button>
            </div>
            <div className="space-y-2">
              {(s.images || []).map((img, i) =>
                arrayRow(
                  i,
                  <ImagePicker label="Image" value={img.imageUrl} onChange={(v) => updateImage(i, v)} />,
                  () => removeImage(i)
                )
              )}
            </div>
          </div>
        </>
      );
      break;
    }
    case 'vision': {
      const s = form as VisionSection;
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('vis-heading', 'Heading / العنوان')}{input('vis-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
            <div>{label('vis-body', 'Body / النص')}{textarea('vis-body', s.body, (v) => set({ body: v }), 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Main image" value={s.mainImageUrl} onChange={(v) => set({ mainImageUrl: v })} />
            <ImagePicker label="Small image" value={s.smallImageUrl} onChange={(v) => set({ smallImageUrl: v })} />
            <ImagePicker label="Pattern image" value={s.patternImageUrl} onChange={(v) => set({ patternImageUrl: v })} />
          </div>
        </>
      );
      break;
    }
    case 'massage': {
      const s = form as MassageSection;
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('msg-heading', 'Heading / العنوان')}{input('msg-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
            <div>{label('msg-body', 'Body / النص')}{textarea('msg-body', s.body, (v) => set({ body: v }), 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Main image" value={s.mainImageUrl} onChange={(v) => set({ mainImageUrl: v })} />
            <ImagePicker label="Small image" value={s.smallImageUrl} onChange={(v) => set({ smallImageUrl: v })} />
          </div>
        </>
      );
      break;
    }
    case 'room': {
      const s = form as RoomSection;
      const updateCard = (index: number, field: string, value: string) => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          const next = [...(p as RoomSection).cards];
          const cur = next[index];
          next[index] = { title: cur?.title ?? '', imageUrl: cur?.imageUrl ?? '', description: cur?.description ?? '', [field]: value };
          return { ...p, cards: next } as HomeContent[keyof HomeContent];
        });
      };
      const addCard = () => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          return { ...p, cards: [...(p as RoomSection).cards, { title: '', imageUrl: '', description: '' }] } as HomeContent[keyof HomeContent];
        });
      };
      const removeCard = (index: number) => {
        setForm((p) => {
          if (!p || !('cards' in p)) return p;
          const next = (p as RoomSection).cards.filter((_, i) => i !== index);
          return { ...p, cards: next } as HomeContent[keyof HomeContent];
        });
      };
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('room-heading', 'Heading / العنوان')}{input('room-heading', s.heading, (v) => set({ heading: v }), 'text', undefined, 'rtl')}</div>
            <div>{label('room-description', 'Description / الوصف')}{textarea('room-description', s.description, (v) => set({ description: v }), 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Background image" value={s.backgroundImageUrl} onChange={(v) => set({ backgroundImageUrl: v })} />
            <ImagePicker label="Ornament" value={s.ornamentUrl} onChange={(v) => set({ ornamentUrl: v })} />
          </div>
          {groupHeading('Cards / Items')}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">Cards / البطاقات</span>
              <button type="button" onClick={addCard} className="text-sm text-maroon hover:underline">+ Add card</button>
            </div>
            <div className="space-y-2">
              {(s.cards || []).map((card, i) =>
                arrayRow(
                  i,
                  <>
                    <div>{label(`card-${i}-title`, 'Title')}{input(`card-${i}-title`, card.title, (v) => updateCard(i, 'title', v), 'text', undefined, 'rtl')}</div>
                    <ImagePicker label="Card image" value={card.imageUrl} onChange={(v) => updateCard(i, 'imageUrl', v)} />
                    <div>{label(`card-${i}-description`, 'Description')}{textarea(`card-${i}-description`, card.description, (v) => updateCard(i, 'description', v), 'rtl')}</div>
                  </>,
                  () => removeCard(i)
                )
              )}
            </div>
          </div>
        </>
      );
      break;
    }
    case 'footer': {
      const s = form as FooterSection;
      fields = (
        <>
          {groupHeading('Text Content')}
          <div className="space-y-3">
            <div>{label('foot-heading', 'Heading / العنوان (multiline, use \\n)')}{textarea('foot-heading', s.heading, (v) => set({ heading: v }), 'rtl')}</div>
            <div>{label('foot-body', 'Body / النص')}{textarea('foot-body', s.body, (v) => set({ body: v }), 'rtl')}</div>
            <div>{label('foot-bookNowText', 'Book now text / نص احجز الآن')}{input('foot-bookNowText', s.bookNowText, (v) => set({ bookNowText: v }), 'text', undefined, 'rtl')}</div>
          </div>
          {groupHeading('Images')}
          <div className="space-y-3">
            <ImagePicker label="Background image" value={s.backgroundImageUrl} onChange={(v) => set({ backgroundImageUrl: v })} />
          </div>
        </>
      );
      break;
    }
    default:
      fields = <p className="text-stone-600">Unknown section type.</p>;
  }

  const siteUrl = import.meta.env.VITE_WEBSITE_URL || 'https://sduksa.web.app';

  return (
    <div dir="ltr">
      {toast && (
        <div
          role="status"
          className={`fixed top-4 right-4 z-50 rounded-lg border px-4 py-3 shadow-lg ${
            toast.type === 'success'
              ? 'border-emerald/40 bg-emerald/10 text-emerald-dark'
              : 'border-red-300 bg-red-50 text-red-800'
          }`}
        >
          {toast.message}
        </div>
      )}
      {breadcrumb}
      <h1 className="text-2xl font-semibold text-maroon-dark mb-1">{SECTION_LABELS[validId]}</h1>
      <p className="text-stone-600 mb-4">{SECTION_DESCRIPTIONS[validId] ?? '—'}</p>

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
            <form id="section-form" onSubmit={handleSubmit} className="max-w-xl">
              <div className="rounded-xl bg-white dark:bg-stone-800 shadow-sm border border-sand dark:border-stone-600 p-6">
                {fields}
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block min-h-0">
          <PreviewPanel
            siteUrl={siteUrl}
            highlightSection={validId}
            refreshKey={previewKey}
          />
        </div>
      </div>

      {/* Fixed save bar — always visible at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:pl-[280px] rtl:md:pl-0 rtl:md:pr-[280px] px-4 md:px-6 py-3 border-t border-sand dark:border-stone-600 bg-cream/95 dark:bg-stone-900/95 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-2xl">
          <button
            type="submit"
            form="section-form"
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
            <PreviewPanel
              siteUrl={siteUrl}
              highlightSection={validId}
              refreshKey={previewKey}
            />
          </div>
        </div>
      )}
    </div>
  );
}
