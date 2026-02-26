# Milestone 18 — Dashboard Room, Footer, Global & Contact Editors

**Title:** Dashboard Room, Footer, Global & Contact Editors

**Context:** This milestone updates the room (was shurafa), footer (was futureSadu), global, and contact editors to match the new schema. It also updates the sections list to use the new SECTION_IDS and SECTION_LABELS.

**Reference:** Read `dashboard/milestones/00-shared-requirements-and-rules.md` and `docs/FIRESTORE_SCHEMA.md`.

---

## INPUTS

- M17 completed (heritage, vision, massage editors done).
- Schema from `docs/FIRESTORE_SCHEMA.md`:
  - **RoomSection:** heading, description, backgroundImageUrl, ornamentUrl, cards: Array<{ title, imageUrl, description }>
  - **FooterSection:** heading, body, backgroundImageUrl, bookNowText
  - **GlobalContent:** logoUrl, sidebarLogoUrl, phone, bookNowText, bookNowLink, copyrightText, nav: Array<{ id, label, target, route? }>
  - **ContactContent:** title, intro, sideImageUrl, form: { nameLabel, phoneLabel, emailLabel, messageLabel, submitText, placeholders: { name, phone, email, message } }

---

## INSTRUCTIONS

### Part A: Room editor (SectionDetail.tsx)

#### Step 1: Replace `case 'shurafa'` with `case 'room'`

Open `dashboard/src/pages/SectionDetail.tsx`. Remove `case 'shurafa'`. Add:

```tsx
case 'room': {
  const s = form as RoomSection;
  const updateCard = (index: number, field: string, value: string) => {
    setForm((p) => {
      if (!p || !('cards' in p)) return p;
      const next = [...(p as RoomSection).cards];
      next[index] = { ...next[index], [field]: value };
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
      <div>{label('room-heading', 'Heading / العنوان')}{input('room-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('room-description', 'Description / الوصف')}{textarea('room-description', s.description, (v) => set({ description: v }))}</div>
      <div>{label('room-bg', 'Background image URL')}{input('room-bg', s.backgroundImageUrl, (v) => set({ backgroundImageUrl: v }), 'url')}</div>
      <div>{label('room-ornamentUrl', 'Ornament URL')}{input('room-ornamentUrl', s.ornamentUrl, (v) => set({ ornamentUrl: v }), 'url')}</div>
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

Add `dir="rtl"` to heading, description, and card text fields.

---

### Part B: Footer editor (SectionDetail.tsx)

#### Step 2: Replace `case 'futureSadu'` with `case 'footer'`

Remove `case 'futureSadu'`. Add:

```tsx
case 'footer': {
  const s = form as FooterSection;
  fields = (
    <>
      <div>{label('foot-heading', 'Heading / العنوان (multiline, use \\n)')}{textarea('foot-heading', s.heading, (v) => set({ heading: v }))}</div>
      <div>{label('foot-body', 'Body / النص')}{textarea('foot-body', s.body, (v) => set({ body: v }))}</div>
      <div>{label('foot-bg', 'Background image URL')}{input('foot-bg', s.backgroundImageUrl, (v) => set({ backgroundImageUrl: v }), 'url')}</div>
      <div>{label('foot-bookNowText', 'Book now text / نص احجز الآن')}{input('foot-bookNowText', s.bookNowText, (v) => set({ bookNowText: v }))}</div>
    </>
  );
  break;
}
```

Add `dir="rtl"` to heading, body, and bookNowText inputs.

---

### Part C: Global editor (Global.tsx)

#### Step 3: Open Global.tsx

Open `dashboard/src/pages/Global.tsx`.

#### Step 4: Update defaultGlobal and add new fields

Update the default and form to include `sidebarLogoUrl` and `copyrightText`:

```ts
const defaultGlobal: GlobalContent = {
  logoUrl: '',
  sidebarLogoUrl: '',
  phone: '',
  bookNowText: '',
  bookNowLink: '',
  copyrightText: '',
  nav: [{ id: '', label: '', target: '', route: '' }],
};
```

#### Step 5: Add sidebarLogoUrl input (after logoUrl)

```tsx
<div>
  <label htmlFor="global-sidebarLogoUrl" className="block text-sm font-medium text-stone-700 mb-1">
    Sidebar logo URL (mobile)
  </label>
  <input
    id="global-sidebarLogoUrl"
    type="url"
    className="w-full rounded border border-sand bg-white px-3 py-2 text-stone-900"
    value={form.sidebarLogoUrl ?? ''}
    onChange={(e) => setForm((p) => ({ ...p, sidebarLogoUrl: e.target.value }))}
    placeholder="https://…"
  />
</div>
```

#### Step 6: Add copyrightText input (after bookNowLink)

```tsx
<div>
  <label htmlFor="global-copyrightText" className="block text-sm font-medium text-stone-700 mb-1">
    Copyright text / نص حقوق النشر
  </label>
  <input
    id="global-copyrightText"
    type="text"
    className="w-full rounded border border-sand bg-white px-3 py-2 text-stone-900"
    value={form.copyrightText ?? ''}
    onChange={(e) => setForm((p) => ({ ...p, copyrightText: e.target.value }))}
    placeholder="2026 © جميع الحقوق محفوظة سدو بوتيك"
    dir="rtl"
  />
</div>
```

#### Step 7: Update nav item editor

Each nav item now has: `id`, `label`, `target`, `route` (optional). Update `setNavItem`, `addNavItem`, and the nav inputs:

```tsx
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
```

Nav item inputs (4 fields per item):

```tsx
{form.nav.map((item, i) => (
  <div key={i} className="rounded border border-sand p-3 space-y-2">
    <div><label>ID (section id)</label><input type="text" value={item.id} onChange={(e) => setNavItem(i, 'id', e.target.value)} placeholder="hero" /></div>
    <div><label>Label / التسمية</label><input type="text" value={item.label} onChange={(e) => setNavItem(i, 'label', e.target.value)} dir="rtl" placeholder="الرئيسية" /></div>
    <div><label>Target (scroll or URL)</label><input type="text" value={item.target} onChange={(e) => setNavItem(i, 'target', e.target.value)} placeholder="#hero or https://…" /></div>
    <div><label>Route (optional)</label><input type="text" value={item.route ?? ''} onChange={(e) => setNavItem(i, 'route', e.target.value)} placeholder="/contact" /></div>
    <button type="button" onClick={() => removeNavItem(i)} ...>Remove</button>
  </div>
))}
```

#### Step 8: Update validateGlobal

```ts
function validateGlobal(g: GlobalContent): string | null {
  if (!g.bookNowText?.trim()) return 'Book now text is required.';
  if (!g.bookNowLink?.trim()) return 'Book now link is required.';
  const badNav = g.nav?.find((n) => !n.label?.trim() || !n.target?.trim());
  if (badNav) return 'Every nav item must have label and target.';
  return null;
}
```

#### Step 9: Update types in content.ts

Ensure `GlobalContent` in `dashboard/src/types/content.ts` has:

```ts
export interface GlobalContent {
  logoUrl: string;
  sidebarLogoUrl?: string;
  phone: string;
  bookNowText: string;
  bookNowLink: string;
  copyrightText?: string;
  nav: Array<{ id?: string; label: string; target: string; route?: string }>;
}
```

---

### Part D: Contact editor (Contact.tsx)

#### Step 10: Open Contact.tsx

Open `dashboard/src/pages/Contact.tsx`.

#### Step 11: Change mobileLabel to phoneLabel

- In `defaultContact`, change `mobileLabel` to `phoneLabel`.
- In `ContactForm` type, change `mobileLabel` to `phoneLabel`.
- In `placeholders`, change `mobile` to `phone` (schema uses `phone`).

Update the form field:

```tsx
<div><label htmlFor="form-phoneLabel" ...>Phone label / تسمية الجوال</label><input id="form-phoneLabel" ... value={form.form.phoneLabel} onChange={(e) => updateForm({ phoneLabel: e.target.value })} /></div>
```

Update placeholders:

```tsx
<div><label htmlFor="ph-phone" ...>Phone placeholder</label><input id="ph-phone" ... value={form.form.placeholders.phone} onChange={(e) => updatePlaceholders({ phone: e.target.value })} /></div>
```

#### Step 12: Verify all contact fields

Ensure these fields exist and are wired: title, intro, sideImageUrl, form.nameLabel, form.phoneLabel, form.emailLabel, form.messageLabel, form.submitText, form.placeholders.name, form.placeholders.phone, form.placeholders.email, form.placeholders.message.

---

### Part E: Sections list (Sections.tsx)

#### Step 13: Update Sections.tsx

Open `dashboard/src/pages/Sections.tsx`. It imports `SECTION_IDS` and `SECTION_LABELS` from `@/types/content`. Ensure `dashboard/src/types/content.ts` has been updated (in M14 or earlier) with:

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

Sections.tsx itself needs no code changes if it already uses `SECTION_IDS` and `SECTION_LABELS` from content.ts. Just ensure content.ts is correct.

---

## OUTPUTS

- [ ] Room editor: heading, description, backgroundImageUrl, ornamentUrl, cards array
- [ ] Footer editor: heading, body, backgroundImageUrl, bookNowText
- [ ] Global editor: new fields sidebarLogoUrl, copyrightText; nav items have id, label, target, route
- [ ] Contact editor: phoneLabel (not mobileLabel); placeholders.phone (not mobile)
- [ ] Sections list page shows 10 sections with correct labels
- [ ] Old section cases removed (shurafa, futureSadu)
- [ ] No TypeScript errors

---

## Handoff

After M18: All section editors, global, and contact match the new schema. M19 can proceed to login page redesign.
