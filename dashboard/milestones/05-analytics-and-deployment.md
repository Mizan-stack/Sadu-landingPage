# Milestone 05 – Analytics & Deployment (Dashboard Repo)

**Where to run:** In this **dashboard** repo.  
**Prerequisite:** Milestones 02, 03, and 04 done (schema, auth, content editors).

Use **Auto + Composer plan**. Follow `milestones/00-shared-requirements-and-rules.md` for requirements and rules.

---

## Objective

1. Enable **Firebase Analytics** on the **website** (if not already) and document how to view reports; optionally add a simple analytics view in the dashboard.
2. **Deploy the dashboard** to Firebase Hosting on a **separate site** (second domain or Firebase-generated URL).

---

## Tasks

### 1. Analytics (website)

- **Document:** In this repo (e.g. `docs/ANALYTICS.md`), document that the **website** should use Firebase Analytics (same Firebase project). List what it gives: users, sessions, country/city, device, custom events (e.g. `contact_form_submit`, `book_now_click`). Explain that reports are in **Firebase Console → Analytics** (no backend needed).
- **Optional – dashboard analytics view:** If you want key metrics inside the dashboard:
  - **Option A:** Link or embed: add an “Analytics” page in the dashboard with a link to Firebase Console Analytics (or GA4 report) and short instructions. Easiest and token-cheap.
  - **Option B:** Use Google Analytics Data API (GA4): connect the same project to GA4, then in the dashboard call the API to show e.g. last 30 days users, top countries. Requires GA4 property and API setup; document steps in `docs/ANALYTICS.md`.
- Prefer Option A for MVP; add Option B only if you need in-dashboard charts without leaving the app.

### 2. Firebase Hosting – dashboard site

- **Multi-site:** Use Firebase Hosting **multiple sites** in the same project. The website keeps its current site (and domain). Add a **second site** for the dashboard (e.g. `dashboard` or `sadu-dashboard`). Document the site ID in README.
- **Build:** Dashboard build command (e.g. `npm run build` or `vite build`). Output directory (e.g. `dist` or `build`). Add a `firebase.json` (or update existing) with a `hosting` array: one entry for the website (if managed here) and one for the dashboard pointing to the dashboard app’s build output.
- **Deploy:** Document deploy command, e.g. `firebase deploy --only hosting:dashboard`. First-time setup: `firebase use` and `firebase target:apply hosting dashboard <siteId>`.
- **Env:** Ensure production env vars (Firebase config) are set for the dashboard build (e.g. in CI or in the project’s hosting config). Do not commit production keys; use Firebase Hosting env or build-time env.

### 3. Custom domain (optional)

- If the dashboard should use a custom domain (e.g. `dashboard.sadu-boutique.com`): document in README how to add it in Firebase Console → Hosting → dashboard site → Add custom domain. No code changes needed for a simple SPA.

### 4. README and handoff

- **README:** Update with: how to run the dashboard locally, how to build and deploy, which Firebase project and Hosting site to use, link to `docs/FIRESTORE_SCHEMA.md` and `docs/ANALYTICS.md`.
- **Handoff:** List what was done (Analytics doc, Hosting config, deploy steps) and that the dashboard is production-ready on its own domain or Firebase URL.

---

## Rules (from shared doc)

- No secrets in repo; production config via env or Firebase.
- Dashboard and website remain in the **same** Firebase project; only Hosting uses two sites.
- Keep analytics implementation simple (Console + optional link/embed) to avoid scope creep.

---

## Handoff

- **Done when:** Analytics is documented (and optionally linked from the dashboard), and the dashboard deploys to Firebase Hosting on a separate site and is reachable on its URL.
- **Optional follow-ups:** Custom domain for dashboard; GA4 Data API for in-dashboard charts; CI/CD for automatic deploys.
