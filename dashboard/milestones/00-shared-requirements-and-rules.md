# Shared Requirements & Rules (All Milestones)

Use this document in every milestone. Keep behavior consistent and integration bug-free.

---

## 1. Project context

- **SDU Boutique:** Luxury/cultural website (Arabic primary). Design is in Figma; the website mimics that design.
- **Dashboard:** Admin web app to edit all website content and (optionally) view analytics. Hosted on Firebase on a separate domain from the main website.
- **Integration:** Website reads content from Firestore. Dashboard writes to the same Firestore. No editing of HTML; everything is data-driven.

---

## 2. Tech stack (dashboard)

- **Framework:** React (create-react-app or Vite).
- **Styling:** TailwindCSS. Match the website’s luxurious, warm aesthetic (beige, cream, dark red/maroon, emerald, RTL-friendly).
- **Backend:** Firebase only — Firestore (data), Firebase Auth (admin login), Firebase Hosting (dashboard app).
- **State:** Prefer local component state and Firestore listeners; add a global store only if needed.

---

## 3. Code quality rules

- **TypeScript:** Use TypeScript for all new files (`.ts` / `.tsx`). Strict types for Firestore documents and API surfaces.
- **Errors:** No silent catches. Log and/or show user-friendly messages. Validate required fields before writing to Firestore.
- **Security:** Never commit API keys or secrets. Use Firebase config from environment; restrict Firestore and Auth to the same project as the website.
- **Accessibility:** Semantic HTML, labels for inputs, sufficient contrast. RTL support where the UI is Arabic.
- **Performance:** Minimize Firestore reads (batch, cache). Avoid unnecessary re-renders (memo/useCallback where it matters).
- **Tokens/verbosity:** Prefer concise code and comments. No long duplicate blocks; extract shared logic and components.

---

## 4. Firestore conventions (shared with website – LOCKED)

- **Single config doc:** Path is `sites/sdu-boutique/config`. One document with top-level keys: `global`, `home`, `contact`. Do not add extra collections or documents for content; the website uses Option C (single read per page).
- **Site ID:** `sdu-boutique` (fixed).
- **Section IDs (home):** hero, hadara, experiences, greenGallery, heritage, events, locations, visitUs, ourSands, shurafa, culturalGallery, futureSadu. Use these exact camelCase IDs; the website expects them.
- **Field names:** Match `docs/FIRESTORE_SCHEMA.md` exactly (e.g. `bookNowLink`, `title`, `subtitle`, `mainImageUrl`, `insetImageUrl`, `form.nameLabel`, `form.placeholders.name`). Do not rename.
- **Images:** Store URLs. Dashboard may offer URL input or Firebase Storage upload; website only displays by URL.
- **Schema:** The final schema is in `docs/FIRESTORE_SCHEMA.md` and is the source of truth for dashboard and website.

---

## 5. UX rules (dashboard)

- **Clear feedback:** Loading states, success toasts, and clear error messages for every save/delete.
- **Confirmation:** Confirm before destructive actions (e.g. delete section, replace image).
- **Navigation:** Simple sidebar or tabs for “Sections”, “Contact page”, “Global”, “Analytics” (if applicable). Breadcrumbs if depth > 1.
- **Forms:** Required fields marked; validation before submit. Prefer inline editing where it fits (e.g. section title) and forms for longer content.
- **RTL:** Support RTL for Arabic labels and content in the dashboard.

---

## 6. Integration checklist (per milestone)

Before considering a milestone done:

- [ ] No hardcoded secrets or API keys.
- [ ] Firestore field names and section IDs match what the website expects (or document any temporary mismatch).
- [ ] Changes work in the same Firebase project the website uses (or document the project/site ID).
- [ ] Lint passes; TypeScript has no errors.
- [ ] Any new env vars are documented (e.g. in README or `.env.example`).

---

## 7. Milestone handoff

- Each milestone produces a small “Handoff” section at the end of its prompt (what was done, what the next milestone can assume).
- Reuse existing files and patterns from previous milestones; do not duplicate auth or Firestore init unnecessarily.
- If you must change the Firestore schema, document it and note the impact on the website so the frontend can be updated.

Reference this document in every milestone prompt so all agents follow the same requirements and rules.
