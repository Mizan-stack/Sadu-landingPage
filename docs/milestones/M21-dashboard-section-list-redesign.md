# Milestone 21 — Dashboard Section List & Editor Pages UI Overhaul

**Title:** Dashboard Section List & Editor Pages UI Overhaul

**Context:** The Sections.tsx page shows a flat list of section links. The SectionDetail.tsx forms are functional but plain. Redesign both for a polished admin experience.

**Reference:** Read `docs/AGENT_RULES.md`, `docs/FIRESTORE_SCHEMA.md`, `docs/APP_MAP.md`.

---

## INPUTS

- M20 completed (layout redesigned), M15–M18 completed (editors work).
- Dashboard at `/dashboard/` subfolder. TypeScript, React 18, Vite 5, Tailwind 3.
- Tailwind config colors: cream (#faf8f5), sand (#e8e4df), beige (#d4cfc7), maroon (#722f37), maroon-dark (#5a252c), emerald (#0d6b5c).
- Section IDs and labels from `dashboard/src/types/content.ts` (SECTION_LABELS).

---

## INSTRUCTIONS

### Step 1: Open Sections.tsx

Open `dashboard/src/pages/Sections.tsx`.

### Step 2: Add section descriptions constant

Add a local const at the top of the file:

```tsx
const SECTION_DESCRIPTIONS: Record<string, string> = {
  hero: 'Slider images, main title, statistics',
  hadara: 'Brand intro, images, pattern background',
  experience: 'Parallax banner, experience cards',
  identity: 'Brand identity text and image',
  destinations: 'Hotel destination cards',
  heritage: 'Cultural heritage gallery',
  vision: 'Brand vision statement',
  massage: 'Brand message statement',
  room: 'Values banner and value cards',
  footer: 'Call-to-action and booking',
};
```

### Step 3: Redesign Sections page as visual grid

- Page title: "أقسام الصفحة الرئيسية" (Homepage Sections)
- Subtitle: "Edit content for each section of the website homepage"
- Grid: 2 columns on desktop (`grid-cols-2`), 1 on mobile (`grid-cols-1`)
- Each section card:
  - Section name (bilingual from SECTION_LABELS)
  - Section number badge (1–10)
  - Brief description from SECTION_DESCRIPTIONS
  - "Edit" button or entire card is clickable → `/sections/:id`
  - Subtle cream bg, hover: shadow + slight scale
- Use `SECTION_IDS` from `content.ts` for order

### Step 4: Section card structure

```tsx
<Link
  to={`/sections/${sectionId}`}
  className="block p-6 rounded-xl bg-cream border border-sand hover:shadow-lg hover:scale-[1.02] transition-all"
>
  <div className="flex items-center justify-between">
    <span className="text-xs font-medium px-2 py-1 rounded bg-maroon/10 text-maroon">
      {index + 1}
    </span>
    <h3 className="text-lg font-semibold text-stone-800">
      {SECTION_LABELS[sectionId] ?? sectionId}
    </h3>
  </div>
  <p className="mt-2 text-sm text-stone-600">
    {SECTION_DESCRIPTIONS[sectionId] ?? '—'}
  </p>
  <span className="mt-4 inline-flex items-center gap-1 text-maroon font-medium text-sm">
    Edit
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">…</svg>
  </span>
</Link>
```

### Step 5: Open SectionDetail.tsx

Open `dashboard/src/pages/SectionDetail.tsx`.

### Step 6: Add breadcrumb

- Breadcrumb: Home → Sections → [Section Name]
- Use `useParams()` to get `sectionId`, then `SECTION_LABELS[sectionId]` for display name
- Link: Home → `/`, Sections → `/sections`, Section name → current (no link)

### Step 7: Improve form layout

- Section title + description at top (from SECTION_LABELS and SECTION_DESCRIPTIONS)
- Form fields in a card container: white bg, rounded-xl, shadow-sm, p-6
- Group related fields with section dividers or fieldset-like groups:
  - "Text Content" group (heading, body, description)
  - "Images" group (all URL inputs)
  - "Cards / Items" group (dynamic arrays)
- Each group has a subtle heading: `text-sm uppercase tracking-wide text-stone-400`
- Save button: full-width at bottom, maroon, larger padding
- Success/error feedback: use a toast-like notification at top-right instead of inline text

### Step 8: Add ImagePreview helper

Add this component inside SectionDetail.tsx or in a shared file:

```tsx
function ImagePreview({ url }: { url: string }) {
  if (!url) return null;
  return (
    <img
      src={url}
      alt="preview"
      className="h-10 w-10 rounded object-cover border border-sand"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}
```

### Step 9: Image URL inputs with preview

- For each image URL input, show a small preview thumbnail (40x40) next to the input if URL is valid
- Use `<ImagePreview url={value} />` in a flex container with the input

### Step 10: Array editors (cards, slides, stats, images)

- Add drag-handle visual hint (grab cursor icon), zebra stripe rows (alternating bg)
- Example: `alternating` row: `bg-stone-50` for odd, `bg-white` for even
- Cursor: `cursor-grab` on the handle area

### Step 11: Toast notification for save feedback

- On save success: show toast at top-right of viewport, "تم الحفظ بنجاح" (Saved successfully), auto-dismiss after 3s
- On save error: show toast with error message, red accent
- Use fixed positioning: `fixed top-4 right-4 z-50` (RTL: right side)

---

## OUTPUTS

- [ ] Sections page shows 10 sections in a visual grid with descriptions
- [ ] SectionDetail has grouped form fields with clear headings
- [ ] Image URL inputs have preview thumbnails
- [ ] Save feedback is prominent and clear
- [ ] Breadcrumb navigation works
- [ ] Mobile-friendly layout
- [ ] No overlapping elements or z-index issues

---

## Handoff

After M21: Section list and editor pages are polished and user-friendly. Editors match the luxury aesthetic.
