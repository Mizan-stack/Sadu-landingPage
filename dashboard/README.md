# SDU Boutique Dashboard

Admin web app to edit website content stored in Firestore. Same Firebase project as the SDU Boutique website.

**Docs:** [Firestore schema](docs/FIRESTORE_SCHEMA.md) · [Analytics](docs/ANALYTICS.md)

## Run the app

1. **Environment:** Copy `.env.example` to `.env` and set Firebase config (from Firebase Console → Project settings):

   ```bash
   cp .env.example .env
   # Edit .env: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID
   ```

2. **Install and dev server:**

   ```bash
   npm install
   npm run dev
   ```

   Open the URL shown (e.g. http://localhost:5173). Sign in at `/login` to access the dashboard.

## First admin user

The dashboard uses **Firebase Auth** (email/password). Firestore rules allow writes when `request.auth != null`, so any signed-in user can edit. To create the first admin:

1. **Firebase Console:** Authentication → Sign-in method → enable **Email/Password**. Then Authentication → Users → Add user: enter email and password. Use that email/password to sign in at `/login`.

2. **Optional — restrict to admins only:** To allow only specific users, you can later restrict Firestore writes to a list of UIDs or a custom claim `admin: true`. To set a custom claim (e.g. `admin: true`) for a user, use a one-time script with the Firebase Admin SDK and that user’s UID, or set it in Firebase Console (if your plan supports it). Document your chosen approach in this README.

## Build and deploy (Firebase Hosting)

The dashboard is deployed to **Firebase Hosting** on a **separate site** in the same Firebase project (multi-site). The website keeps its own site/domain.

- **Firebase project:** Same as the SDU Boutique website. Set it with `firebase use <projectId>` (or create `.firebaserc` via `firebase init`).
- **Hosting site ID:** `dashboard` (create the site in Firebase Console → Hosting → Add another site if needed).
- **First-time setup:** Link the local app to the Hosting site:
  ```bash
  firebase use <your-project-id>
  firebase target:apply hosting dashboard dashboard
  ```
- **Build:** Output is `dist` (Vite default).
  ```bash
  npm run build
  ```
- **Deploy:**
  ```bash
  firebase deploy --only hosting:dashboard
  ```
  The dashboard will be available at the Firebase-generated URL for the `dashboard` site (e.g. `https://<projectId>.web.app` if that’s the site’s URL, or the URL shown in Console).

**Production env:** Set `VITE_FIREBASE_*` at build time (e.g. in CI or locally before `npm run build`). Do not commit production secrets; use your pipeline or Firebase Hosting env if available.

### Custom domain (optional)

To use a custom domain (e.g. `dashboard.sadu-boutique.com`): Firebase Console → Hosting → select the **dashboard** site → Add custom domain, then follow the DNS steps. No code changes needed for a SPA.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript + Vite production build (output: `dist`)
- `npm run lint` — run ESLint
- `npm run seed` — seed Firestore config (see `.env` for optional `GOOGLE_APPLICATION_CREDENTIALS`)

## Images

All image fields (logo, section images, contact side image) use **URL inputs**: paste an image URL into the field. Optional: you can later add Firebase Storage upload and store the download URL in the same fields.

## RTL (Arabic)

The UI is RTL-friendly. Use `dir="rtl"` on containers when rendering Arabic labels; the layout and sidebar support both LTR and RTL.

---

## Milestone 05 handoff (Analytics & Deployment)

- **Analytics:** Documented in `docs/ANALYTICS.md`. The website should use Firebase Analytics (same project); reports are in Firebase Console → Analytics. The dashboard includes an Analytics page with a link to the Console and short instructions (Option A).
- **Hosting:** `firebase.json` configures the **dashboard** Hosting site with `public: "dist"`. Deploy with `firebase deploy --only hosting:dashboard` after `firebase use` and `firebase target:apply hosting dashboard dashboard`.
- **Result:** Dashboard is production-ready on its own Firebase Hosting URL (or custom domain if configured).
