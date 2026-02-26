# Milestone 25 — Performance Optimization, Security & Final Deployment

**Title:** Milestone 25 — Performance Optimization, Security & Final Deployment

**Context:** Final milestone. Optimize both apps for production, lock down security, and deploy.

**Reference:** Read `docs/AGENT_RULES.md`, `docs/FIRESTORE_SCHEMA.md`, `docs/APP_MAP.md`, and `dashboard/milestones/00-shared-requirements-and-rules.md`.

---

## INPUTS

- All previous milestones completed (M00–M24).
- Landing page at repo root. React 19, Vite 7, Tailwind 4, framer-motion.
- Dashboard at `/dashboard/` subfolder. TypeScript, React 18, Vite 5, Tailwind 3.
- Firebase project: `sduksa`. Website hosting: default site. Dashboard hosting: dashboard site.
- Firestore path: `sites/sdu-boutique/config`.

---

## INSTRUCTIONS

### Part A: Landing page performance

#### Step 1: Firestore persistence

In the landing page, enable Firestore persistence for offline support.

**File:** `src/lib/firebase.js` (or wherever Firestore `db` is initialized).

Add after `db` is created:

```js
import { enableIndexedDbPersistence } from 'firebase/firestore';

// After getFirestore(app) or similar
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistence failed: multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistence not supported in this browser');
  }
});
```

**Note:** `enableIndexedDbPersistence` may be deprecated in Firebase v10+. If the installed `firebase` package does not export it, use the newer API:

```js
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});
```

Check `package.json` for the `firebase` version and use the appropriate API. If in doubt, try `enableIndexedDbPersistence` first; if it fails at import, switch to `initializeFirestore` with cache options.

#### Step 2: Cache useContent at module level

Ensure the `useContent` hook (or equivalent) caches the config so there is at most one Firestore read per session. If it already uses a shared cache or context, verify it does not re-fetch on every component mount.

#### Step 3: Lazy-load section components

Open `src/pages/Home.jsx`.

- Keep `HeroSection` as a normal import (above the fold).
- Lazy-load all other sections:

```jsx
import { lazy, Suspense } from 'react';
import HeroSection from '../components/sections/HeroSection/HeroSection';

const HadaraSection = lazy(() => import('../components/sections/HadaraSection/HadaraSection'));
const ExperienceSection = lazy(() => import('../components/sections/ExperienceSection/ExperienceSection'));
const IdentitySection = lazy(() => import('../components/sections/IdentitySection/IdentitySection'));
const DestinationsSection = lazy(() => import('../components/sections/DestinationsSection/DestinationsSection'));
const HeritageSection = lazy(() => import('../components/sections/HeritageSection/HeritageSection'));
const VisionSection = lazy(() => import('../components/sections/VisionSection/VisionSection'));
const MassageSection = lazy(() => import('../components/sections/MassageSection/MassageSection'));
const RoomSection = lazy(() => import('../components/sections/RoomSection/RoomSection'));
const FooterSection = lazy(() => import('../components/sections/FooterSection/FooterSection'));

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div className="h-[400px] bg-sand/30 animate-pulse" />}>
        <HadaraSection />
        <ExperienceSection />
        <IdentitySection />
        <DestinationsSection />
        <HeritageSection />
        <VisionSection />
        <MassageSection />
        <RoomSection />
        <FooterSection />
      </Suspense>
    </>
  );
}
```

Adjust the fallback height to match typical section height. A single `Suspense` boundary is fine; you can split if needed.

#### Step 4: React.memo for section components

Add `React.memo` to section components that receive data as props to prevent unnecessary re-renders. Example:

```jsx
export default React.memo(function HadaraSection({ data }) {
  // ...
});
```

Apply to sections that have stable props from Firestore.

#### Step 5: Image optimization

Add `loading="lazy"` and `decoding="async"` to all `<img>` tags **except** the hero slider images (above the fold).

```jsx
<img src={url} alt="..." loading="lazy" decoding="async" />
```

For hero images (first visible slides), omit `loading="lazy"` or use `loading="eager"`.

#### Step 6: Vite build optimizations

Open `vite.config.js` (or `vite.config.ts`) at the repo root.

Add to the `build` config:

```js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        firebase: ['firebase/app', 'firebase/firestore'],
        vendor: ['react', 'react-dom', 'framer-motion'],
      },
    },
  },
},
```

Adjust chunk names if the project uses different entry points. The goal is to split vendor and Firebase into separate chunks for better caching.

---

### Part B: Dashboard performance

#### Step 7: Lazy-load page components

Open `dashboard/src/App.tsx` (or the main router file).

```tsx
import { lazy, Suspense } from 'react';

const Global = lazy(() => import('@/pages/Global').then((m) => ({ default: m.Global })));
const Sections = lazy(() => import('@/pages/Sections').then((m) => ({ default: m.Sections })));
const SectionDetail = lazy(() => import('@/pages/SectionDetail').then((m) => ({ default: m.SectionDetail })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
// ... other pages

// Wrap routes:
<Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading…</div>}>
  <Routes>
    {/* ... */}
  </Routes>
</Suspense>
```

Apply to all route-level page components. Keep the layout (sidebar, etc.) eager-loaded.

---

### Part C: Security

#### Step 8: Verify Firestore rules

Create or update `firestore.rules` (at project root or in `dashboard/` depending on where `firebase.json` expects it).

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sites/{siteId}/config {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

The catch-all `match /{document=**}` denies access to everything not explicitly allowed. Ensure `sites/{siteId}/config` is the only writable path for content.

#### Step 9: Verify Storage rules (if M22 completed)

If Firebase Storage is used for image uploads, ensure `storage.rules` exists and restricts writes to authenticated users:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /sites/{siteId}/images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

#### Step 10: No secrets in codebase

- Ensure `.env` is in `.gitignore` for both root and `dashboard/`.
- Verify `.env.example` exists for both:
  - Root: e.g. `VITE_FIREBASE_*` placeholders
  - Dashboard: `VITE_FIREBASE_*`, `VITE_WEBSITE_URL`, etc.
- Grep for hardcoded API keys, project IDs, or tokens. Remove any found.

#### Step 11: Deploy Firestore and Storage rules

From the project root (or dashboard, depending on `firebase.json` location):

```bash
firebase deploy --only firestore:rules
```

If Storage is used:

```bash
firebase deploy --only storage
```

---

### Part D: Final deployment

#### Step 12: Build and deploy the landing page

```bash
# From repo root
npm run build
firebase deploy --only hosting
```

If the project uses multiple hosting sites and the default site is the website:

```bash
firebase deploy --only hosting:default
```

#### Step 13: Build and deploy the dashboard

```bash
cd dashboard
npm run build
firebase deploy --only hosting:dashboard
```

Ensure `dashboard/firebase.json` (or the root `firebase.json`) has the `dashboard` site configured.

---

### Part E: Final verification

#### Step 14: Verification checklist

1. **Website:** Open `https://sduksa.web.app` (or custom domain). All sections load with Firestore content. No blank sections or broken images.
2. **Dashboard:** Open the dashboard URL. Login works. Can edit each section. Save reflects on the website.
3. **Mobile:** Check mobile layout on both apps. No overflow, readable text, working navigation.
4. **Preview:** Embedded preview in the dashboard works. Device toggles and refresh work.
5. **Console:** No errors in production builds (React, Firestore, network).
6. **Offline:** Disconnect internet. Reload the website. Cached content should still display (if persistence is enabled).

---

## OUTPUTS

- [ ] Firestore persistence enabled in the landing page (or equivalent cache)
- [ ] Section components lazy-loaded (except Hero)
- [ ] `React.memo` applied to section components where appropriate
- [ ] Images have `loading="lazy"` (except hero)
- [ ] Vite chunks split (firebase, vendor) in landing page
- [ ] Dashboard routes lazy-loaded with Suspense
- [ ] Firestore security rules deployed and restrictive
- [ ] Storage rules deployed (if applicable)
- [ ] No secrets in codebase; `.env` in `.gitignore`
- [ ] `.env.example` exists for both apps
- [ ] Both apps built successfully
- [ ] Website deployed to default hosting site
- [ ] Dashboard deployed to dashboard hosting site
- [ ] Website loads content from Firestore
- [ ] Dashboard can edit and save content
- [ ] Mobile layouts verified
- [ ] No console errors in production
- [ ] Offline: website shows cached content when disconnected

---

## Handoff

After M25: Both apps are production-ready, optimized, and deployed. Security rules are in place. The project is complete for the current milestone set.
