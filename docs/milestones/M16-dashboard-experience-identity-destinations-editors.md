# Milestone 16 — Dashboard Experience, Identity & Destinations Editors

**Title:** Dashboard Experience, Identity & Destinations Editors

**Context:** The `SectionDetail.tsx` has old section cases (`experiences`, `greenGallery`, `events`, `locations`). The new schema uses `experience`, `identity`, and `destinations`. This milestone rewrites/creates these editors and removes obsolete cases.

**Reference:** Read `dashboard/milestones/00-shared-requirements-and-rules.md` and `docs/FIRESTORE_SCHEMA.md`.

---

## INPUTS

- M15 completed (hero and hadara editors updated).
- Types in `dashboard/src/types/content.ts` include:
  - `ExperienceSection`: heading, description, backgroundImageUrl, cards: Array<{ title, imageUrl, description }>
  - `IdentitySection`: heading, body, mainImageUrl, patternImageUrl
  - `DestinationsSection`: heading, cards: Array<{ name, imageUrl, description }>
- `HomeContent` and `SECTION_IDS` in content.ts use the new section IDs.

---

## INSTRUCTIONS

### Step 1: Open the section detail file

Open `dashboard/src/pages/SectionDetail.tsx`.

### Step 2: Update imports

Add `ExperienceSection`, `IdentitySection`, and `DestinationsSection` to imports from `@/types/content` if not already present.

### Step 3: Replace `case 'experiences'` with `case 'experience'`

Remove the old `case 'experiences'` block. Add a new `case 'experience'` block:

```tsx
case 'experience': {
  const s = form as ExperienceSection;
  const updateCard = (index: number, field: string, value: string) => {
    setForm((p) => {
      if (!p || !('cards' in p)) return p;
      const next = [...(p as ExperienceSection).cards];
      next[index] = { ...next[index], [field]: value };
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
      <div>{label('exp-heading', 'Heading / العنوان')}{input('exp-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('exp-description', 'Description / الوصف')}{textarea('exp-description', s.description, (v) => set({ description: v }))}</div>
      <div>{label('exp-bg', 'Background image URL')}{input('exp-bg', s.backgroundImageUrl, (v) => set({ backgroundImageUrl: v }), 'url')}</div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-stone-700">Cards / البطاقات</span>
          <button type="button" onClick={addCard} className="text-sm text-maroon hover:underline">+ Add card</button>
        </div>
        <div className="space-y-3">
          {(s.cards || []).map((card, i) => (
            <div key={i} className="rounded border border-sand p-3 space-y-2">
              <div>{label(`card-${i}-title`, 'Title')}<input type="text" className="w-full rounded border border-sand bg-white px-3 py-2" value={card.title} onChange={(e) => updateCard(i, 'title', e.target.value)} dir="rtl" /></div>
              <div>{label(`card-${i}-imageUrl`, 'Image URL')}<input type="url" className="w-full rounded border border-sand bg-white px-3 py-2" value={card.imageUrl} onChange={(e) => updateCard(i, 'imageUrl', e.target.value)} /></div>
              <div>{label(`card-${i}-description`, 'Description')}<textarea rows={2} className="w-full rounded border border-sand bg-white px-3 py-2" value={card.description} onChange={(e) => updateCard(i, 'description', e.target.value)} dir="rtl" /></div>
              <button type="button" onClick={() => removeCard(i)} className="text-sm text-red-600 hover:bg-red-50 px-2">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  break;
}
```

### Step 4: Create `case 'identity'`

Add a new case (did not exist before):

```tsx
case 'identity': {
  const s = form as IdentitySection;
  fields = (
    <>
      <div>{label('id-heading', 'Heading / العنوان')}{input('id-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('id-body', 'Body / النص')}{textarea('id-body', s.body, (v) => set({ body: v }))}</div>
      <div>{label('id-mainImageUrl', 'Main image URL')}{input('id-mainImageUrl', s.mainImageUrl, (v) => set({ mainImageUrl: v }), 'url')}</div>
      <div>{label('id-patternImageUrl', 'Pattern image URL')}{input('id-patternImageUrl', s.patternImageUrl, (v) => set({ patternImageUrl: v }), 'url')}</div>
    </>
  );
  break;
}
```

Add `dir="rtl"` to heading and body inputs (inline or via helper).

### Step 5: Create `case 'destinations'` (replaces `locations`)

Add a new case. Note: destinations cards use `name` not `title`:

```tsx
case 'destinations': {
  const s = form as DestinationsSection;
  const updateCard = (index: number, field: string, value: string) => {
    setForm((p) => {
      if (!p || !('cards' in p)) return p;
      const next = [...(p as DestinationsSection).cards];
      next[index] = { ...next[index], [field]: value };
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
      <div>{label('dest-heading', 'Heading / العنوان')}{input('dest-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-stone-700">Cards / البطاقات</span>
          <button type="button" onClick={addCard} className="text-sm text-maroon hover:underline">+ Add card</button>
        </div>
        <div className="space-y-3">
          {(s.cards || []).map((card, i) => (
            <div key={i} className="rounded border border-sand p-3 space-y-2">
              <div>{label(`card-${i}-name`, 'Name / الاسم')}<input type="text" className="w-full rounded border border-sand bg-white px-3 py-2" value={card.name} onChange={(e) => updateCard(i, 'name', e.target.value)} dir="rtl" /></div>
              <div>{label(`card-${i}-imageUrl`, 'Image URL')}<input type="url" className="w-full rounded border border-sand bg-white px-3 py-2" value={card.imageUrl} onChange={(e) => updateCard(i, 'imageUrl', e.target.value)} /></div>
              <div>{label(`card-${i}-description`, 'Description')}<textarea rows={2} className="w-full rounded border border-sand bg-white px-3 py-2" value={card.description} onChange={(e) => updateCard(i, 'description', e.target.value)} dir="rtl" /></div>
              <button type="button" onClick={() => removeCard(i)} className="text-sm text-red-600 hover:bg-red-50 px-2">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  break;
}
```

### Step 6: Remove old cases

Delete the following case blocks entirely:

- `case 'experiences'` (replaced by `experience`)
- `case 'greenGallery'`
- `case 'events'`
- `case 'locations'` (replaced by `destinations`)

Also remove any helper functions that were only used by these cases (e.g. `updateGalleryItem`, `addGalleryItem`, `removeGalleryItem`, `updateLocationsItem`, etc.) if they are no longer referenced. If other cases still use them, keep them.

### Step 7: Update SECTION_IDS and SECTION_LABELS

Ensure `dashboard/src/types/content.ts` has the correct `SECTION_IDS` and `SECTION_LABELS` for the new schema. If M14 already did this, skip. Otherwise update to:

```ts
export const SECTION_IDS = ['hero', 'hadara', 'experience', 'identity', 'destinations', 'heritage', 'vision', 'massage', 'room', 'footer'] as const;
export const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero / البطل',
  hadara: 'Hadara / حضارة',
  experience: 'Experience / التجربة',
  identity: 'Identity / الهوية',
  destinations: 'Destinations / الوجهات',
  heritage: 'Heritage / التراث',
  vision: 'Vision / الرؤية',
  massage: 'Message / الرسالة',
  room: 'Values / القيم',
  footer: 'Footer / التذييل',
};
```

---

## OUTPUTS

- [ ] Experience editor: heading, description, backgroundImageUrl, cards array (title, imageUrl, description)
- [ ] Identity editor: heading, body, mainImageUrl, patternImageUrl
- [ ] Destinations editor: heading, cards array (name, imageUrl, description)
- [ ] Old section cases removed (experiences, greenGallery, events, locations)
- [ ] All editors save correctly to Firestore
- [ ] No TypeScript errors

---

## Handoff

After M16: Experience, identity, and destinations editors exist. Old gallery/locations cases removed. M17 can proceed to heritage, vision, and massage editors.
