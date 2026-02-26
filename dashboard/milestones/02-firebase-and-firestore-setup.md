# Milestone 02 – Firebase & Firestore Setup (Dashboard Repo)

**Where to run:** In this **dashboard** repo.  
**Prerequisite:** Frontend contract is locked. Use **exactly** the schema in `docs/FIRESTORE_SCHEMA.md` (single config doc at `sites/sdu-boutique/config`).

Use **Auto + Composer plan**. Follow `milestones/00-shared-requirements-and-rules.md` for requirements and rules.

---

## Objective

Set up the Firebase project and Firestore so the dashboard and the website share the same data. Use the **exact** schema from the frontend contract (single document). Define security rules and TypeScript types. Do **not** build the dashboard UI yet.

---

## Tasks

### 1. Firebase project and config

- Use the **same** Firebase project as the SDU Boutique website (same `VITE_FIREBASE_*` / `REACT_APP_FIREBASE_*` as the website).
- Add Firebase config (e.g. `src/lib/firebase.ts` or `src/config/firebase.ts`). Use env vars: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`. Add `.env.example` with these keys; do not commit real keys.
- Initialize Firebase App, Firestore, and Auth. Export `app`, `db`, `auth` for use in later milestones.

### 2. Firestore content schema (LOCKED – do not change)

The website uses **Option C: single config document**.

- **Path:** `sites/sdu-boutique/config` (one document).
- **Top-level keys:** `global`, `home`, `contact`.
- **Section IDs (home):** hero, hadara, experiences, greenGallery, heritage, events, locations, visitUs, ourSands, shurafa, culturalGallery, futureSadu.

Full field names and shapes are in **`docs/FIRESTORE_SCHEMA.md`**. Do not rename fields or section IDs; the website expects these exact keys.

### 3. Firestore security rules

- **Read:** allow for `sites/sdu-boutique/config` (so the website can read without auth).
- **Write:** allow only when `request.auth != null`. Optionally restrict by custom claim `admin: true` or allowlist of UIDs.
- Put rules in `firestore.rules`. Document in `docs/FIRESTORE_SCHEMA.md` that website is read-only and dashboard (authenticated) has write access.

### 4. Optional seed data

If the config doc does not exist yet, you may add a script or instructions to seed minimal `global`, `home.hero`, and `contact` so the website and dashboard have something to display/edit. Do not overwrite existing content.

### 5. TypeScript types

Define interfaces in `src/types/content.ts` (or equivalent) that **exactly** match `docs/FIRESTORE_SCHEMA.md`:

- `GlobalContent` (logoUrl, phone, bookNowText, bookNowLink, nav[])
- `HomeContent` (hero, hadara, experiences, greenGallery, heritage, events, locations, visitUs, ourSands, shurafa, culturalGallery, futureSadu – each with the correct shape)
- `ContactContent` (title, intro, sideImageUrl?, form: { nameLabel, mobileLabel, emailLabel, messageLabel, submitText, placeholders })
- `SiteConfig` = `{ global: GlobalContent, home: HomeContent, contact: ContactContent }`

Use these types for all Firestore reads/writes in later milestones.

---

## Rules (from shared doc)

- No hardcoded secrets; use env vars and `.env.example`.
- Firestore path and field names must match `docs/FIRESTORE_SCHEMA.md` exactly.
- All new code in TypeScript; strict types for the config doc.

---

## Handoff

- **Done when:** Firebase is initialized, security rules are in place, and TypeScript types in `src/types/content.ts` match the schema.
- **Next milestone (03)** can assume: `app`, `db`, `auth` are available; config is at `sites/sdu-boutique/config`; types define `SiteConfig`.
