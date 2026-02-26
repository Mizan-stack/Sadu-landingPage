# AI Agent Rules — SDU Boutique

> **MANDATORY.** Every AI agent working on this project MUST read and follow these rules.
> Violations cause integration bugs, broken UI, or data loss.

---

## Rule 1: Schema is the source of truth

- The Firestore schema lives in `docs/FIRESTORE_SCHEMA.md`. NEVER rename fields, change types, or add/remove keys without updating that file first.
- Both the landing page and the dashboard read/write the SAME Firestore document at `sites/sdu-boutique/config`.
- If you change a field name in one app, the other app WILL break. Always update both.

---

## Rule 2: Section IDs are LOCKED

The homepage section IDs are (in order):

```
hero, hadara, experience, identity, destinations, heritage,
vision, massage, room, footer
```

- Use these EXACT camelCase IDs everywhere: Firestore keys, HTML `id` attributes, dashboard routes, TypeScript types.
- Do NOT rename, reorder, add, or remove section IDs without updating: (1) `docs/FIRESTORE_SCHEMA.md`, (2) the landing page component, (3) the dashboard types in `dashboard/src/types/content.ts`, (4) the dashboard editor in `dashboard/src/pages/SectionDetail.tsx`.

---

## Rule 3: Never hardcode content in the landing page

- ALL user-visible text (headings, paragraphs, labels, stats, card titles) must come from Firestore via the `useContent()` hook.
- ALL images displayed on the website must use URLs from Firestore (not local imports), EXCEPT decorative assets that are structural (pattern backgrounds, ornaments) which may have fallback local imports.
- If adding new content, add it to the schema first, then implement.

---

## Rule 4: Partial Firestore updates only

- The dashboard uses `updateDoc` with merge to update only the specific key being edited.
- `updateGlobal(global)` updates ONLY `global`. It does NOT touch `home` or `contact`.
- `updateSection(sectionId, data)` updates ONLY `home.${sectionId}`. Other sections are untouched.
- `updateContact(contact)` updates ONLY `contact`.
- NEVER use `setDoc` without `{ merge: true }`. This would wipe all other data.

---

## Rule 5: Don't break existing styles or layout

- The landing page's visual design matches the Figma. Do NOT change:
  - Color values (`#7A1E2C`, `#F3E0CF`, `#E9DFD2`, `#E3D6C6`, `#6B5B4D`)
  - Font stack (`"TS Zunburk", "IBM Plex Sans Arabic", Tajawal, sans-serif`)
  - Layout structure (grid, flex, spacing, max-widths)
  - RTL direction (`dir="rtl"`)
  - Responsive breakpoints (mobile-first, `sm:`, `lg:`)
  - framer-motion animations (initial, whileInView, transitions)
- When replacing hardcoded text with Firestore data, only change the data source, NOT the JSX structure or Tailwind classes.

---

## Rule 6: Loading and error states

- Every component that reads from Firestore MUST handle: loading (skeleton/spinner), error (message + retry), and empty data (fallback).
- Use the shared `useContent()` hook; do NOT create multiple Firestore listeners per section.
- Prefer one read per page load (single config document).

---

## Rule 7: TypeScript in dashboard, JSX in landing page

- **Dashboard:** All files are `.ts` / `.tsx`. Use strict types from `dashboard/src/types/content.ts`. No `any`.
- **Landing page:** Currently `.js` / `.jsx`. New files should be `.jsx` unless the milestone says otherwise. When the landing page reads Firestore, type safety comes from JSDoc or runtime checks.

---

## Rule 8: No secrets in code

- Firebase config in the dashboard uses `import.meta.env.VITE_FIREBASE_*`.
- The landing page will use the same pattern when Firebase is added.
- NEVER commit `.env` files. Only `.env.example` with placeholder values.
- NEVER hardcode API keys, project IDs, or auth tokens in source files.

---

## Rule 9: Performance constraints

- **Landing page:** ONE Firestore read per page load (the single config document). Cache it. No per-section reads.
- **Dashboard:** ONE Firestore read on login/mount, cached in the `useConfig` hook. Refetch only on save.
- Minimize re-renders: use `React.memo` for section components that receive data as props.
- Images from Firestore are URLs — the website renders them with `<img src={url}>`. No base64, no inline data.

---

## Rule 10: RTL and Arabic

- The landing page is Arabic-primary. `<html lang="ar" dir="rtl">`.
- Every section has `dir="rtl"` on its root element.
- The dashboard supports both LTR (UI chrome) and RTL (Arabic content fields).
- When editing text fields in the dashboard, Arabic content inputs should have `dir="rtl"`.

---

## Rule 11: Image handling

- Images are stored as URLs in Firestore.
- The dashboard currently accepts URL paste. Firebase Storage upload will be added later.
- When replacing local image imports with Firestore URLs, the `<img>` tag's `src` changes from `import` to `{data.fieldName}`. Alt text and classes stay the same.
- Always provide a fallback: if the URL is empty/missing, show a placeholder or the original local asset.

---

## Rule 12: Testing before marking done

Before completing any milestone:

- [ ] The landing page renders correctly (no blank sections, no broken images, no layout shifts).
- [ ] The dashboard can save content for the affected section(s) and the landing page reflects the change.
- [ ] No console errors (React, Firestore, or network).
- [ ] Mobile and desktop layouts are both correct.
- [ ] RTL text alignment is preserved.
- [ ] Lint passes with no new errors.

---

## Rule 13: File naming and structure

- **Landing page sections:** One folder per section under `src/components/sections/`, e.g. `HeroSection/HeroSection.jsx`.
- **Dashboard pages:** Flat in `dashboard/src/pages/`, e.g. `SectionDetail.tsx`.
- **Shared types:** `dashboard/src/types/content.ts` — this is the single source for TypeScript interfaces.
- **Firestore helpers:** `dashboard/src/lib/config.ts` — all Firestore read/write functions.
- Do NOT create duplicate utility files. Reuse existing patterns.

---

## Rule 14: Milestone execution

- Each milestone is a self-contained prompt. Read it fully before starting.
- Each milestone lists its INPUTS (what must exist before) and OUTPUTS (what it produces).
- Do NOT skip milestones or combine them unless explicitly told to.
- After completing a milestone, verify the OUTPUTS checklist.
- If a milestone modifies the schema, update `docs/FIRESTORE_SCHEMA.md` as part of that milestone.

---

## Rule 15: Dashboard UI/UX standards

- Match the luxury brand aesthetic: warm colors (cream, beige, maroon), clean spacing, no clutter.
- All form actions (save, delete, upload) show: loading spinner during operation, success toast on completion, error message on failure.
- Confirm before destructive actions (delete item, replace image).
- Required fields are marked with red asterisk. Validate before submit.
- Sidebar navigation: clear, collapsible on mobile, breadcrumbs for depth > 1.
- No overlapping elements, no hidden UI behind other elements, no z-index conflicts.
