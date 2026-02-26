# SDU Boutique – Dashboard & Website Integration Plan

## 1. Integration strategy (recommended)

**Use Firestore as the single source of truth. The website reads content; the dashboard writes it.**

| Aspect | Approach |
|--------|----------|
| **Website** | React app fetches content from Firestore (e.g. `sites/{siteId}/sections`, `pages`, `contactConfig`). All headings, paragraphs, image URLs, form labels, and CTAs come from Firestore. No hardcoded copy. |
| **Dashboard** | Same Firebase project. Admin app to edit that Firestore data (sections, pages, contact form config, etc.). No direct “editing of HTML”. |
| **Why** | Clear separation, one source of truth, real-time or cached updates, good performance with Firestore client SDK (caching, persistence). No HTML string manipulation or fragile scraping. |
| **Performance** | Website: one or a few reads per page (e.g. one doc per page or one “site config” doc). Use Firestore offline persistence and/or in-memory cache to avoid repeated reads. |

**Not recommended:** Having the dashboard “edit the HTML” of the website. That would require storing HTML in Firestore and rendering it (dangerous for XSS, hard to maintain, poor DX).

---

## 2. Analytics (visitors, location, behavior)

- **Primary:** Enable **Firebase Analytics** on the website. It’s free and gives:
  - Number of users and sessions  
  - Country/city (approximate location)  
  - Device, browser, traffic sources  
  - Custom events (e.g. “contact_form_submit”, “book_now_click”)

- **Where to view:** Firebase Console → Analytics. No extra backend needed.

- **Optional later:** Pull key metrics into the dashboard (e.g. via GA4 + Google Analytics Data API) for an in-dashboard analytics view. First phase: use Firebase Console only to keep scope small.

---

## 3. Hosting and domains

- **Website:** Current domain, hosted on Firebase Hosting (existing).
- **Dashboard:** Separate Firebase Hosting site (or same project, different site) so it can use a different domain (e.g. `dashboard.yourdomain.com` or a separate Firebase-generated URL). Same Firebase project for Auth + Firestore.

---

## 4. Order of operations

1. **Run the integration prompt on the website (frontend) repo**  
   Use the prompt in `milestones/01-integration-prompt.md` in the **website** project. It will:
   - Align the site with a data-driven content model (Firestore).
   - Produce a short “current situation” report (structure, routes, tech stack) so the dashboard milestones can stay in sync.

2. **Share the frontend report back**  
   After the frontend agent finishes, you’ll have:
   - Rules and patterns for how the website reads from Firestore.
   - A description of sections/pages and any existing IDs or keys.

3. **Run dashboard milestones in this repo**  
   Execute `02` → `03` → `04` → `05` in order, each in a Cursor agent (Auto + Composer plan). Each milestone file is self-contained (prompt + rules + requirements).

4. **Optional:** After seeing the frontend report, the milestone prompts (e.g. Firestore schema, section IDs) can be adjusted once so dashboard and website stay aligned.

---

## 5. Content model (high level)

Editable areas derived from the Figma/design:

- **Global / layout:** Logo, nav labels, “Book Now” CTA, phone number.
- **Home (or main) page sections:**  
  Hero (heading, subtext, image); “حضارة” block (heading, slogan, 2 images, body text); “عن مساحات…” / “تجاربنا” (image, heading, text); galleries (4 or 3 images + captions); “تراث عمل سابق”; “احداث ومناسبات”; “مواقعنا”; “زيارتنا”; “رمالنا”; “جماعة شرفاء”; “مستقبل سادو”.
- **Contact page:** Heading, intro paragraph, form field labels, placeholders, submit button text; optional side image.

Exact Firestore schema (collection names, field names, and section IDs) will be fixed in **Milestone 02** and in the frontend integration so both sides use the same structure.

---

## 6. Tech alignment

- **Website:** React, vanilla JS, TailwindCSS; reads from Firestore; Firebase Hosting.
- **Dashboard:** React (or same stack for consistency), TailwindCSS, Firebase Auth (admin only), Firestore (read/write), Firebase Hosting on a second domain.
- **Shared:** One Firebase project; Firestore security rules so the website can read public content and only authenticated dashboard users can write.

This keeps integration simple, performance-friendly, and maintainable.
