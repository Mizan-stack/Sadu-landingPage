# Dashboard validation report

**Date:** After all milestones (02–05) completed.  
**Build:** `npm run build` passes (TypeScript + Vite).

---

## 1. Integration & schema

| Check | Status |
|-------|--------|
| Single config path `sites/sdu-boutique/config` | ✅ Used everywhere (`config.ts`, types) |
| Types match `docs/FIRESTORE_SCHEMA.md` | ✅ `src/types/content.ts` matches (global, home sections, contact) |
| Section IDs (camelCase) | ✅ hero, hadara, experiences, greenGallery, heritage, events, locations, visitUs, ourSands, shurafa, culturalGallery, futureSadu |
| Field names (bookNowLink, mainImageUrl, etc.) | ✅ Match schema; no bookNowUrl or titleAr |

---

## 2. Firebase & Firestore

| Check | Status |
|-------|--------|
| Firebase init from env (`VITE_FIREBASE_*`) | ✅ `src/lib/firebase.ts` |
| Config ref and load/update helpers | ✅ `getConfigRef`, `loadConfig`, `updateGlobal`, `updateSection`, `updateContact` |
| Partial updates (no overwrite) | ✅ `updateDoc` with `global`, `home.${sectionId}`, or `contact` only |
| Firestore rules: read public, write auth | ✅ `firestore.rules`: read true, write `request.auth != null` |
| Seed script | ✅ `scripts/seed-config.ts` (minimal config; does not overwrite) |

---

## 3. Auth & routing

| Check | Status |
|-------|--------|
| AuthProvider, useAuth | ✅ `contexts/AuthContext.tsx` |
| Protected routes | ✅ `ProtectedRoute` wraps layout; redirect to `/login` when not signed in |
| Login page | ✅ `pages/Login.tsx` (email/password) |
| Routes: /, /global, /sections, /sections/:id, /contact, /analytics | ✅ `App.tsx` |

---

## 4. Content editors

| Check | Status |
|-------|--------|
| Global editor (logo, phone, bookNow, nav) | ✅ Loads `config.global`, saves via `updateGlobal` |
| Sections list | ✅ All 12 section IDs with links to `/sections/:sectionId` |
| Section detail (all 12 section types) | ✅ Correct fields per section (hero, hadara, galleries, locations, etc.) |
| Contact editor (title, intro, form labels/placeholders) | ✅ Saves via `updateContact` |
| Loading / error / success feedback | ✅ FormFeedback, retry, toasts/success messages |
| Validation before save | ✅ Global and Contact validate required fields |

---

## 5. Deployment & docs

| Check | Status |
|-------|--------|
| firebase.json (hosting dashboard, public: dist) | ✅ |
| README (run, first admin, build, deploy) | ✅ |
| docs/FIRESTORE_SCHEMA.md | ✅ |
| docs/ANALYTICS.md | ✅ |
| .env.example (no secrets) | ✅ |

---

## 6. Optional / improvements

- **Config doc must exist before first save:** If the document doesn’t exist, `updateDoc` will throw. Run `npm run seed` once (with service account) or create the doc manually so the first dashboard save works. Alternatively, add a “create if missing” path (e.g. `setDoc` with merge when doc doesn’t exist).
- **Bundle size:** Build warns about chunks > 500 kB; consider code-splitting (e.g. lazy routes) later if needed.
- **RTL:** Layout and forms use `dir="ltr"` where appropriate; Arabic content can be pasted into fields.

---

## 7. Visitor / usage monitoring

### What is implemented

| Feature | Where | Status |
|--------|--------|--------|
| **Link to analytics** | Dashboard → Analytics page | ✅ Button “Open Firebase Console → Analytics” |
| **Documentation** | `docs/ANALYTICS.md` | ✅ How to enable Firebase Analytics on the website and where to view reports |
| **In-dashboard visitor stats** | Dashboard app | ❌ **Not implemented** |

### What is not in the dashboard

The following are **not** shown inside the dashboard app; they are only available in **Firebase Console → Analytics** (or GA4) once the **website** has Firebase Analytics enabled:

- **Number of visitors / users**
- **Sessions and engagement**
- **User location** (country, city)
- **Device / browser / traffic source**
- **Custom events** (e.g. contact form submit, book now click)

So: **visitor usage monitoring is documented and reachable via a link, but there is no in-dashboard view of visit counts, locations, or behavior.** The milestone chose “Option A” (link + docs) for MVP.

### How to get visitor stats inside the dashboard

To show visitor count, location, or events **inside** the dashboard:

1. **Option B (GA4 Data API):**  
   - Link the Firebase project to a **GA4 property** (Firebase Console → Project settings → Integrations).  
   - Use the **Google Analytics Data API** (e.g. `runReport`) with a server or a backend-for-frontend to fetch metrics (users, country, events).  
   - Dashboard calls your backend or uses a proxy; backend uses a service account to call the GA4 API.  
   - Then build a simple Analytics page with cards/charts (e.g. “Users last 30 days”, “Top countries”).

2. **Custom events in Firestore (alternative):**  
   - Website writes anonymized “page_view” or “visit” events to a Firestore collection (or a Cloud Function that aggregates counts).  
   - Dashboard reads from that collection and displays counts.  
   - Gives full control but requires wiring the website and possibly rate/cost limits on writes.

Recommendation: use **Option B (GA4 Data API)** if you want in-dashboard visitor/location/behavior metrics without leaving the app. The current implementation is correct for the agreed MVP (link + docs).
