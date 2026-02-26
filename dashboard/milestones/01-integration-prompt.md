# Milestone 01 – Integration Prompt (Run on the WEBSITE / Frontend Repo)

**Where to run:** In the **website** (frontend) project — the React app that mimics the Figma design.  
**Goal:** Make the website data-driven from Firestore and produce a short “current situation” report so the dashboard can align with the same schema and section IDs.

---

## Instructions for the agent (website repo)

You are working on the SDU Boutique **website** (React + TailwindCSS). A separate **dashboard** app will edit all content via Firestore. Your job is to:

1. **Adopt a data-driven content model** so that every user-visible text and image comes from Firestore, not hardcoded in components.
2. **Set up Firestore reads** (same Firebase project the dashboard will use). Prefer one or a few reads per page (e.g. one doc per page or one “site config” doc) for performance.
3. **Define a stable schema** for the homepage and contact page that the dashboard will also use. Document it.
4. **Output a “Current situation” report** (see template below) so the dashboard team can implement editors that match your structure.

Do **not** build the dashboard or any admin UI. Only change the website so it **reads** from Firestore and document the schema and section IDs.

---

## Content to be data-driven (from Figma)

- **Global:** Logo URL, nav labels, “Book Now” CTA text/link, phone number.
- **Homepage sections (in order):**
  - Hero: heading, subtext, background image URL.
  - حضارة (Culture): heading, slogan, left image URL, right inset image URL, body text.
  - عن مساحات… / تجاربنا: background image URL, heading, description.
  - Green interior gallery: 4 items (image URL + caption each).
  - تراث عمل سابق: heading, body text, main image URL.
  - احداث ومناسبات: 3 items (image URL + caption each).
  - مواقعنا: heading, body text, 3 image URLs (optional captions).
  - زيارتنا: main image URL, inset image URL, heading, description.
  - رمالنا: main image URL, inset image URL, heading, description.
  - جماعة شرفاء: background image URL, heading, description.
  - Outdoor/cultural gallery: 4 items (image URL + caption each).
  - مستقبل سادو: image URL, heading, description.
- **Contact page:** Page heading, intro paragraph, form field labels (Name, Mobile, Email, Message), placeholders, submit button text; optional side image URL.

Use **stable section IDs** (e.g. `hero`, `hadara`, `experiences`, `heritage`, `events`, `locations`, `visit-us`, `our-sands`, `shurafa`, `cultural-gallery`, `future-sadu`, `contact`). You may adjust IDs to match your routes/naming; document the final list.

---

## Firestore structure (suggestion; you may refine)

- **Option A – One doc per page:**  
  `sites/{siteId}/pages/home`, `sites/{siteId}/pages/contact`, `sites/{siteId}/global`.
- **Option B – Sections in a collection:**  
  `sites/{siteId}/sections` with document IDs = section IDs (e.g. `hero`, `hadara`, …), plus `sites/{siteId}/global` for nav/logo/phone.
- **Option C – Single site config doc:**  
  One document with nested objects for global, home sections, contact. Simpler reads, larger doc.

Choose one approach and document it. The dashboard will write to the same paths. Use a fixed `siteId` (e.g. `sdu-boutique` or `default`) for now.

---

## Rules you must follow (website)

- **No hardcoded copy:** All headings, paragraphs, labels, placeholders, and image URLs that appear in the design must come from Firestore (or fallbacks only for first load/offline).
- **Performance:** Prefer at most one or two Firestore reads per page (e.g. one `getDoc` for the page or site config). Use Firestore persistence/cache if needed.
- **Security:** Use Firestore security rules so that these content docs are **read-only** for unauthenticated users (the website). Only the dashboard (authenticated admins) will write.
- **Types:** Define TypeScript types for each Firestore document shape and use them when reading.
- **Loading/error:** Show loading state while fetching; show a simple error state or fallback if the read fails.
- **RTL:** Keep existing RTL and Arabic typography; only the source of text switches to Firestore.

---

## Deliverables

1. **Code:** Website reads all above content from Firestore. Components receive data via props or a small context/hook (e.g. `useSiteContent()`).
2. **Schema doc:** A short document (e.g. `docs/FIRESTORE_CONTENT_SCHEMA.md` or in README) listing:
   - Firebase project ID and `siteId` used.
   - Chosen structure (Option A/B/C) and paths (e.g. `sites/sdu-boutique/pages/home`).
   - Section IDs for homepage and contact.
   - Field names and types (e.g. `hero.titleAr`, `hero.imageUrl`).
3. **“Current situation” report** (paste this into your response so the dashboard team can use it):

```markdown
## Current situation (website)

- **Firebase project ID:** 
- **Site ID:** 
- **Structure:** (e.g. Option B – sections collection)
- **Paths:** (e.g. sites/sdu-boutique/sections, sites/sdu-boutique/global)
- **Homepage section IDs:** (ordered list)
- **Contact page:** (path and field names)
- **Global fields:** (logo, nav, phone, book now)
- **Notes:** (any dev-only or env vars, e.g. VITE_FIREBASE_*)
```

---

## Cursor rules to add (website repo)

Create or update `.cursor/rules/` in the **website** repo so future work stays consistent:

- **Content source:** “All user-visible text and images for the website come from Firestore. Do not add new hardcoded copy; add new fields in the schema and read them from Firestore.”
- **Schema:** “When adding a new section or page, update `docs/FIRESTORE_CONTENT_SCHEMA.md` (or the schema doc) and use the same section IDs and field names the dashboard expects.”
- **Firestore:** “Use the same Firebase project and siteId as documented. Firestore reads are read-only for the website; writes happen only from the dashboard app.”

Run this prompt in the website repo with **Auto + Composer plan**. When done, copy the “Current situation” report and any schema doc into the dashboard repo (e.g. in `milestones/` or `docs/`) so the dashboard milestones can reference it.
