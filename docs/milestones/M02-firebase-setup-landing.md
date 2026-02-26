# Milestone 02 — Add Firebase SDK and Service Layer to Landing Page

**Title:** Milestone 02 — Add Firebase SDK and Service Layer to Landing Page

**Context:** The landing page (at the repo root, NOT the dashboard) currently has zero Firebase integration. This milestone adds the Firebase JS SDK, creates the Firestore config, and builds a `useContent()` hook that reads the single config document.

---

## INPUTS

- [ ] M01 completed (Firestore has seed data at `sites/sdu-boutique/config`)

**Verify before starting:** Ensure M01 has been run and Firestore is populated, or at least the seed script exists and is ready.

---

## INSTRUCTIONS

### Step 1: Install Firebase package

Run in the **ROOT** directory (not `dashboard/`):
```bash
npm install firebase
```

### Step 2: Create src/lib/firebase.js

Create the file `src/lib/firebase.js` with this content:

```js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Step 3: Create .env.example at root

Create `.env.example` at the project root with:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

Add `.env` to `.gitignore` if not already present (so real keys are not committed).

### Step 4: Create src/hooks/useContent.js

Create `src/hooks/useContent.js`:

- Import `doc`, `getDoc` from `firebase/firestore`
- Import `db` from `../lib/firebase`
- Export a React hook `useContent()` that:
  - On mount, reads the config document. Use path segments:
  - If the seed script writes to `sites/sdu-boutique/config` and that path works in your project: `doc(db, 'sites', 'sdu-boutique', 'config')`
  - If the config is stored in the site document (path `sites/sdu-boutique`): `doc(db, 'sites', 'sdu-boutique')`
  - Match the path used by `dashboard/scripts/seed-config.ts` (CONFIG_PATH)
  - Returns `{ config, loading, error }` where `config` is the document data
  - Caches in a module-level variable so subsequent calls don't re-fetch (e.g. `let cachedConfig = null`; if cached, return immediately)
  - Handles errors: set `error` state, log to console
  - Sets `loading: true` initially, then `loading: false` when done

**Important:** The Firestore path for the config document. Per the schema, the document is at `sites/sdu-boutique/config`. In Firestore:
- If the config is stored as a document: the path could be `sites/sdu-boutique` (document) containing `global`, `home`, `contact` — OR there may be a subcollection. Check the seed script: it uses `db.doc('sites/sdu-boutique/config')`. In Web SDK v9: `doc(db, 'sites', 'sdu-boutique', 'config')` would reference a subcollection "config" under document "sdu-boutique" — but that needs a document ID. The typical setup: document at `sites/sdu-boutique` holds the config. Use `doc(db, 'sites', 'sdu-boutique')` and the document data will have `global`, `home`, `contact`. If the seed uses `sites/sdu-boutique/config`, the document might be at `sites/sdu-boutique/config/config` or similar. Match the seed script's path. For `db.doc('sites/sdu-boutique/config')` in Admin SDK, the path has 3 segments. In Web SDK `doc(db, 'sites', 'sdu-boutique', 'config')` — this references a document if "config" is the document ID in a subcollection... Actually the path "sites/sdu-boutique/config" in Firestore means: collection "sites", document "sdu-boutique", subcollection "config". So we need one more segment for a document. Common: store config IN the document "sdu-boutique" — so path is `sites/sdu-boutique` and the document data IS the config. Use `doc(db, 'sites', 'sdu-boutique')` and read that. The schema says "path: sites/sdu-boutique/config" — follow the seed script. If seed uses `db.doc(CONFIG_PATH)` with `CONFIG_PATH = 'sites/sdu-boutique/config'`, then in Web SDK use `doc(db, 'sites', 'sdu-boutique', 'config')` — the SDK will resolve it. If it fails (invalid path), the user will need to fix. Proceed with `doc(db, 'sites', 'sdu-boutique', 'config')` as specified in the user's original M02 instructions.

Actually re-reading the user's M02: "reads doc('sites', 'sdu-boutique', 'config') (use path segments, NOT collection path string)" — so they want `doc(db, 'sites', 'sdu-boutique', 'config')`. I'll put that in the milestone. The seed script uses `db.doc(CONFIG_PATH)` with `CONFIG_PATH = 'sites/sdu-boutique/config'`. In Firebase Admin, that's a valid document path in some configurations. I'll keep it as specified.

### Step 5: Create src/contexts/ContentContext.jsx

Create `src/contexts/ContentContext.jsx`:

- A React context that wraps the app
- Uses `useContent()` internally
- Provides `{ config, loading, error }` to all children via `ContentProvider`
- Export `ContentProvider` and `useContentContext` (hook to consume the context)

Example structure:
```jsx
import { createContext, useContext } from 'react';
import { useContent } from '../hooks/useContent';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const value = useContent();
  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentContext must be used within ContentProvider');
  return ctx;
}
```

### Step 6: Wrap the app with ContentProvider

In `src/App.jsx`:
- Import `ContentProvider`
- Wrap `BrowserRouter` (or the inner content) with `ContentProvider`
- Example: `<ContentProvider><BrowserRouter>...</BrowserRouter></ContentProvider>`

### Step 7: Usage pattern (for future milestones)

In each section component, the pattern will be:
```jsx
const { config, loading } = useContentContext();
const data = config?.home?.hero; // or whatever section
if (loading) return <LoadingSkeleton />;
if (!data) return null; // or fallback
```

**Do NOT change section components in this milestone** — that's M03+. Only add the infrastructure.

### Step 8: Graceful handling of missing .env

- If `.env` is missing or Firebase keys are empty, the app should NOT crash
- `useContent` should handle initialization errors (e.g. missing config) and set `error` state
- The website should still render (sections will use fallbacks when `config` is null/undefined)

---

## OUTPUTS (Verification Checklist)

- [ ] `firebase` package in `package.json` dependencies (root, not dashboard)
- [ ] `src/lib/firebase.js` exists and exports `db`
- [ ] `.env.example` exists at root with `VITE_FIREBASE_*` keys
- [ ] `src/hooks/useContent.js` exists and exports `useContent()`
- [ ] `src/contexts/ContentContext.jsx` exists and exports `ContentProvider` + `useContentContext`
- [ ] `App.jsx` wraps with `ContentProvider`
- [ ] No console errors on page load (even without .env values — should gracefully handle missing config)
- [ ] The website still renders exactly as before (no visual changes)
- [ ] Running `npm run dev` succeeds and the app loads
