# Milestone 04 – Dashboard Content Editors (Dashboard Repo)

**Where to run:** In this **dashboard** repo.  
**Prerequisite:** Milestones 02 and 03 done (schema, types, auth, layout).

Use **Auto + Composer plan**. Follow `milestones/00-shared-requirements-and-rules.md` for requirements and rules. Use **exactly** the schema in `docs/FIRESTORE_SCHEMA.md` (single config doc at `sites/sdu-boutique/config`).

---

## Objective

Implement editing UIs for all content: global, every homepage section, and the contact page. The website reads from **one document** (`sites/sdu-boutique/config`). The dashboard must **read** that doc and **write** by updating it (merge) so other keys are not overwritten.

---

## Critical: single config document

- **Path:** `sites/sdu-boutique/config`
- **Shape:** `{ global, home, contact }`
- **Load:** `getDoc(doc(db, 'sites', 'sdu-boutique', 'config'))` once per page or use a shared hook that caches the config.
- **Save:** When editing one part (e.g. global, or `home.hero`), do **not** replace the whole doc unless you have the full config in state. Prefer `updateDoc(docRef, { 'global': newGlobal })` or `updateDoc(docRef, { 'home.hero': newHero })` (dot notation for nested fields) so you don’t wipe `home` or `contact`. Alternatively: read full config, update the relevant key in memory, then `setDoc(docRef, merged, { merge: true })`.

---

## Tasks

### 1. Global editor (`/global`)

- **Fields (exact):** logoUrl, phone, bookNowText, bookNowLink, nav (array of `{ label, target }`). See `docs/FIRESTORE_SCHEMA.md`.
- **UI:** Form with inputs; nav as repeatable rows (add/remove). Image: URL input (or optional Storage upload).
- **Load:** Read config doc; use `config.global`. **Save:** Update only `global` (e.g. `updateDoc` with `{ global: newGlobal }` or merge).
- **Feedback:** Loading, success toast, error message. Validation: required fields non-empty.

### 2. Section editors (`/sections`, `/sections/:sectionId`)

- **List:** All homepage section IDs in order: hero, hadara, experiences, greenGallery, heritage, events, locations, visitUs, ourSands, shurafa, culturalGallery, futureSadu. Each row: section name/ID and link to edit.
- **Per-section edit:** One page per section. Fields must match `docs/FIRESTORE_SCHEMA.md` **exactly**:
  - **hero:** title, subtitle, imageUrl
  - **hadara:** title, slogan, body, leftImageUrl, insetImageUrl
  - **experiences:** title, description, backgroundImageUrl
  - **greenGallery, culturalGallery, events:** items[] with imageUrl, caption (events: imageUrl, caption)
  - **heritage:** title, body, imageUrl
  - **locations:** title, body, items[] with imageUrl, caption?
  - **visitUs, ourSands:** title, description, mainImageUrl, insetImageUrl
  - **shurafa:** title, description, backgroundImageUrl
  - **futureSadu:** title, description, imageUrl
- **Load:** From full config; use `config.home[sectionId]`. **Save:** Update only that section (e.g. `updateDoc(docRef, { [`home.${sectionId}`]: newSection })` or read–merge–set).
- **Feedback:** Loading, success toast, error message. Confirm before destructive actions.

### 3. Contact page editor (`/contact`)

- **Fields (exact):** title, intro, sideImageUrl?, form.nameLabel, form.mobileLabel, form.emailLabel, form.messageLabel, form.submitText, form.placeholders.name, form.placeholders.mobile, form.placeholders.email, form.placeholders.message. See `docs/FIRESTORE_SCHEMA.md`.
- **Load:** `config.contact`. **Save:** Update only `contact` (e.g. `updateDoc` with `{ contact: newContact }`).
- **Feedback:** Same as above.

### 4. Images

- **Option A:** All image fields are URL inputs (user pastes URL). Document in UI.
- **Option B:** Firebase Storage upload; store download URL in the field. Use Storage rules so only authenticated users can upload.
- Choose one; use consistently. Document in README.

### 5. UX and quality

- **RTL:** Support RTL for Arabic labels and content.
- **Validation:** Required fields and (if applicable) URL format. Show errors before submit.
- **No silent failures:** Catch, log, and show a clear message for every Firestore write.
- **Reuse:** Use types from `src/types/content.ts` and the same Firebase `db` and config path. Do not duplicate schema.

---

## Rules (from shared doc)

- Section IDs and field names must match `docs/FIRESTORE_SCHEMA.md` exactly (e.g. bookNowLink not bookNowUrl; visitUs not visit-us; culturalGallery not gallery-cultural).
- All writes only when user is authenticated (already enforced by layout and Firestore rules).
- When saving, do not overwrite other top-level keys (global/home/contact); update only the part being edited.

---

## Handoff

- **Done when:** An admin can edit global, every homepage section, and the contact page; save uses the single config doc without wiping other sections.
- **Next milestone (05):** Analytics and deployment.
