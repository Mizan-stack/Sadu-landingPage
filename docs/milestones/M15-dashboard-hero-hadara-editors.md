# Milestone 15 — Dashboard Hero & Hadara Section Editors

**Title:** Dashboard Hero & Hadara Section Editors

**Context:** The `SectionDetail.tsx` currently has editors for the OLD schema. The hero editor only has title/subtitle/imageUrl. The hadara editor has title/slogan/body/leftImageUrl/insetImageUrl. Both need complete rewrites to match the new schema in `docs/FIRESTORE_SCHEMA.md`.

**Reference:** Read `dashboard/milestones/00-shared-requirements-and-rules.md` for project rules.

---

## INPUTS

- M14 completed (new types exist in `dashboard/src/types/content.ts`).
- Types `HeroSection` and `HadaraSection` match `docs/FIRESTORE_SCHEMA.md`:
  - **HeroSection:** `title`, `hotelCardText`, `slides: Array<{ imageUrl }>`, `stats: Array<{ value, label }>`
  - **HadaraSection:** `heading`, `introText`, `body`, `titleIconUrl`, `ornamentUrl`, `mainImageUrl`, `smallImageUrl`, `patternImageUrl`

---

## INSTRUCTIONS

### Step 1: Open the section detail file

Open `dashboard/src/pages/SectionDetail.tsx`.

### Step 2: Update imports

Ensure `HeroSection` and `HadaraSection` are imported from `@/types/content` if needed for type assertions.

### Step 3: Replace `case 'hero'` block

Replace the existing hero case with a complete editor for all new hero fields:

```tsx
case 'hero': {
  const s = form as HeroSection;
  const updateSlide = (index: number, field: string, value: string) => {
    setForm((p) => {
      if (!p || !('slides' in p)) return p;
      const next = [...(p as HeroSection).slides];
      next[index] = { ...next[index], [field]: value };
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
      next[index] = { ...next[index], [field]: value };
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
      <div>{label('hero-title', 'Title / العنوان', true)}{input('hero-title', s.title, (v) => set({ title: v }))}</div>
      <div>{label('hero-hotelCardText', 'Hotel card text / نص بطاقة الفنادق')}{input('hero-hotelCardText', s.hotelCardText, (v) => set({ hotelCardText: v }))}</div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-stone-700">Slides / الشرائح</span>
          <button type="button" onClick={addSlide} className="text-sm text-maroon hover:underline">+ Add slide</button>
        </div>
        <div className="space-y-3">
          {(s.slides || []).map((slide, i) => (
            <div key={i} className="rounded border border-sand p-3 space-y-2" dir="ltr">
              <div>{label(`slide-${i}-url`, 'Image URL')}<input type="url" className="w-full rounded border border-sand bg-white px-3 py-2" value={slide.imageUrl} onChange={(e) => updateSlide(i, 'imageUrl', e.target.value)} placeholder="https://…" /></div>
              <button type="button" onClick={() => removeSlide(i)} className="text-sm text-red-600 hover:bg-red-50 px-2">Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-stone-700">Stats / الإحصائيات</span>
          <button type="button" onClick={addStat} className="text-sm text-maroon hover:underline">+ Add stat</button>
        </div>
        <div className="space-y-3">
          {(s.stats || []).map((stat, i) => (
            <div key={i} className="rounded border border-sand p-3 space-y-2">
              <div>{label(`stat-${i}-value`, 'Value')}<input type="text" className="w-full rounded border border-sand bg-white px-3 py-2" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} dir="rtl" /></div>
              <div>{label(`stat-${i}-label`, 'Label / التسمية')}<input type="text" className="w-full rounded border border-sand bg-white px-3 py-2" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} dir="rtl" /></div>
              <button type="button" onClick={() => removeStat(i)} className="text-sm text-red-600 hover:bg-red-50 px-2">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  break;
}
```

### Step 4: Replace `case 'hadara'` block

Replace the existing hadara case with a complete editor for all new hadara fields:

```tsx
case 'hadara': {
  const s = form as HadaraSection;
  fields = (
    <>
      <div>{label('hadara-heading', 'Heading / العنوان')}{input('hadara-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('hadara-introText', 'Intro text / النص التمهيدي')}{textarea('hadara-introText', s.introText, (v) => set({ introText: v }))}</div>
      <div>{label('hadara-body', 'Body / النص الجانبي')}{textarea('hadara-body', s.body, (v) => set({ body: v }))}</div>
      <div>{label('hadara-titleIconUrl', 'Title icon URL')}{input('hadara-titleIconUrl', s.titleIconUrl, (v) => set({ titleIconUrl: v }), 'url')}</div>
      <div>{label('hadara-ornamentUrl', 'Ornament URL')}{input('hadara-ornamentUrl', s.ornamentUrl, (v) => set({ ornamentUrl: v }), 'url')}</div>
      <div>{label('hadara-mainImageUrl', 'Main image URL')}{input('hadara-mainImageUrl', s.mainImageUrl, (v) => set({ mainImageUrl: v }), 'url')}</div>
      <div>{label('hadara-smallImageUrl', 'Small image URL')}{input('hadara-smallImageUrl', s.smallImageUrl, (v) => set({ smallImageUrl: v }), 'url')}</div>
      <div>{label('hadara-patternImageUrl', 'Pattern image URL')}{input('hadara-patternImageUrl', s.patternImageUrl, (v) => set({ patternImageUrl: v }), 'url')}</div>
    </>
  );
  break;
}
```

### Step 5: Add `dir="rtl"` to Arabic content inputs

For hadara fields that contain Arabic text (heading, introText, body), add `dir="rtl"` to the input/textarea elements. Update the `input` and `textarea` helper functions to accept an optional `dir` prop, or add it inline:

- For `input()`: add a 5th optional parameter for `dir`, e.g. `input(..., 'text', undefined, 'rtl')`
- Or wrap the inputs in a div with `dir="rtl"` for the hadara text fields.

Simplest approach: add `dir="rtl"` directly to the input/textarea in the hadara case where the content is Arabic. Example for heading:

```tsx
<input ... dir="rtl" />
```

If the shared `input` helper doesn't support `dir`, create inline inputs for hadara text fields with `dir="rtl"`.

### Step 6: Ensure types are correct

Verify `dashboard/src/types/content.ts` has the new `HeroSection` and `HadaraSection` interfaces matching the schema. If not, update them first (M14 scope).

---

## OUTPUTS

- [ ] Hero editor shows all fields: title, hotelCardText, slides array, stats array
- [ ] Hadara editor shows all fields: heading, introText, body, titleIconUrl, ornamentUrl, mainImageUrl, smallImageUrl, patternImageUrl
- [ ] Array editors (slides, stats) have add/remove functionality
- [ ] Save button works and updates Firestore correctly
- [ ] No TypeScript errors
- [ ] Arabic content inputs have `dir="rtl"` where appropriate

---

## Handoff

After M15: Hero and Hadara section editors in `SectionDetail.tsx` match the new Firestore schema. Array editors (slides, stats) use the helper pattern. M16 can proceed to update experience, identity, and destinations editors.
