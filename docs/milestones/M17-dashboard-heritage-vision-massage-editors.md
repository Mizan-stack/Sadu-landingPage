# Milestone 17 — Dashboard Heritage, Vision & Massage Editors

**Title:** Dashboard Heritage, Vision & Massage Editors

**Context:** The `SectionDetail.tsx` has old section cases for heritage (single imageUrl), visitUs, ourSands, and culturalGallery. The new schema uses heritage (with images array), vision (was visitUs), and massage (was ourSands). This milestone rewrites these editors and removes obsolete cases.

**Reference:** Read `dashboard/milestones/00-shared-requirements-and-rules.md` and `docs/FIRESTORE_SCHEMA.md`.

---

## INPUTS

- M16 completed (experience, identity, destinations editors done).
- Types in `dashboard/src/types/content.ts`:
  - **HeritageSection:** heading, body, ornamentUrl, images: Array<{ imageUrl }>
  - **VisionSection:** heading, body, mainImageUrl, smallImageUrl, patternImageUrl
  - **MassageSection:** heading, body, mainImageUrl, smallImageUrl

---

## INSTRUCTIONS

### Step 1: Open the section detail file

Open `dashboard/src/pages/SectionDetail.tsx`.

### Step 2: Update `case 'heritage'`

Replace the existing heritage case. Old schema had single `imageUrl`; new has `images` array:

```tsx
case 'heritage': {
  const s = form as HeritageSection;
  const updateImage = (index: number, field: string, value: string) => {
    setForm((p) => {
      if (!p || !('images' in p)) return p;
      const next = [...(p as HeritageSection).images];
      next[index] = { ...next[index], [field]: value };
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
      <div>{label('her-heading', 'Heading / العنوان')}{input('her-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('her-body', 'Body / النص')}{textarea('her-body', s.body, (v) => set({ body: v }))}</div>
      <div>{label('her-ornamentUrl', 'Ornament URL')}{input('her-ornamentUrl', s.ornamentUrl, (v) => set({ ornamentUrl: v }), 'url')}</div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-stone-700">Images / الصور</span>
          <button type="button" onClick={addImage} className="text-sm text-maroon hover:underline">+ Add image</button>
        </div>
        <div className="space-y-3">
          {(s.images || []).map((img, i) => (
            <div key={i} className="rounded border border-sand p-3 space-y-2">
              <div>{label(`img-${i}-url`, 'Image URL')}<input type="url" className="w-full rounded border border-sand bg-white px-3 py-2" value={img.imageUrl} onChange={(e) => updateImage(i, 'imageUrl', e.target.value)} placeholder="https://…" /></div>
              <button type="button" onClick={() => removeImage(i)} className="text-sm text-red-600 hover:bg-red-50 px-2">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  break;
}
```

Add `dir="rtl"` to heading and body inputs.

### Step 3: Create/update `case 'vision'` (was `visitUs`)

Replace `case 'visitUs'` and `case 'ourSands'` with a single `case 'vision'`:

```tsx
case 'vision': {
  const s = form as VisionSection;
  fields = (
    <>
      <div>{label('vis-heading', 'Heading / العنوان')}{input('vis-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('vis-body', 'Body / النص')}{textarea('vis-body', s.body, (v) => set({ body: v }))}</div>
      <div>{label('vis-mainImageUrl', 'Main image URL')}{input('vis-mainImageUrl', s.mainImageUrl, (v) => set({ mainImageUrl: v }), 'url')}</div>
      <div>{label('vis-smallImageUrl', 'Small image URL')}{input('vis-smallImageUrl', s.smallImageUrl, (v) => set({ smallImageUrl: v }), 'url')}</div>
      <div>{label('vis-patternImageUrl', 'Pattern image URL')}{input('vis-patternImageUrl', s.patternImageUrl, (v) => set({ patternImageUrl: v }), 'url')}</div>
    </>
  );
  break;
}
```

Add `dir="rtl"` to heading and body.

### Step 4: Create/update `case 'massage'` (was `ourSands`)

```tsx
case 'massage': {
  const s = form as MassageSection;
  fields = (
    <>
      <div>{label('msg-heading', 'Heading / العنوان')}{input('msg-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('msg-body', 'Body / النص')}{textarea('msg-body', s.body, (v) => set({ body: v }))}</div>
      <div>{label('msg-mainImageUrl', 'Main image URL')}{input('msg-mainImageUrl', s.mainImageUrl, (v) => set({ mainImageUrl: v }), 'url')}</div>
      <div>{label('msg-smallImageUrl', 'Small image URL')}{input('msg-smallImageUrl', s.smallImageUrl, (v) => set({ smallImageUrl: v }), 'url')}</div>
    </>
  );
  break;
}
```

Add `dir="rtl"` to heading and body.

### Step 5: Remove old cases

Delete the following case blocks:

- `case 'visitUs'`
- `case 'ourSands'`
- `case 'culturalGallery'`

Also remove the combined `case 'visitUs': case 'ourSands':` if it was a fallthrough. Ensure no references to these IDs remain.

### Step 6: Verify types

Ensure `HeritageSection`, `VisionSection`, and `MassageSection` in `dashboard/src/types/content.ts` match `docs/FIRESTORE_SCHEMA.md`.

---

## OUTPUTS

- [ ] Heritage editor: heading, body, ornamentUrl, images array
- [ ] Vision editor: heading, body, mainImageUrl, smallImageUrl, patternImageUrl
- [ ] Massage editor: heading, body, mainImageUrl, smallImageUrl
- [ ] Old section cases removed (visitUs, ourSands, culturalGallery)
- [ ] All editors save correctly to Firestore
- [ ] No TypeScript errors

---

## Handoff

After M17: Heritage, vision, and massage editors match the new schema. M18 can proceed to room, footer, global, contact, and sections list.
