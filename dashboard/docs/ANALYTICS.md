# Analytics (SDU Boutique Website)

Analytics for the **SDU Boutique website** use **Firebase Analytics** in the same Firebase project as the dashboard. No backend is required; events are sent from the website to Firebase and reports are viewed in the Firebase Console.

---

## What the website should use

- **Firebase Analytics** (same Firebase project as the dashboard).
- **Automatic events:** users, sessions, first_open, session_start, etc.
- **Automatic attributes:** country, city, device category, platform, etc.
- **Recommended custom events** (implement on the website where relevant):
  - `contact_form_submit` — when the contact form is successfully submitted.
  - `book_now_click` — when the “Book now” button/link is clicked.

Reports are available in **Firebase Console → Analytics** (and in the linked **Google Analytics 4** property if you connect one). No backend needed; the website sends events client-side.

---

## Where to view reports

1. Open [Firebase Console](https://console.firebase.google.com/) and select the **SDU Boutique** project.
2. Go to **Analytics** in the left sidebar (or **Build → Analytics**).
3. Use the **Dashboard** for overview (users, sessions, engagement) and **Events** for custom events (e.g. `contact_form_submit`, `book_now_click`).
4. For geography, device, and more detail, use the linked **GA4** report (Firebase offers to create/link a GA4 property; use the same project).

---

## Dashboard link to Analytics

The dashboard has an **Analytics** page that links to Firebase Console Analytics and gives short instructions so you can open reports without leaving the app context. See the in-app Analytics page or this doc for the same steps.

---

## Optional: GA4 Data API (in-dashboard charts)

If you later want key metrics (e.g. last 30 days users, top countries) **inside** the dashboard:

1. Ensure the Firebase project is linked to a **GA4 property** (Firebase Console → Project settings → Integrations).
2. Create a **Google Cloud** service account with access to the **Google Analytics Data API**, and grant it to the GA4 property.
3. In the dashboard, call the [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1) (e.g. `runReport`) with the GA4 property ID and show charts.
4. Document the GA4 property ID, API setup, and any env vars (e.g. `GOOGLE_APPLICATION_CREDENTIALS` or a server-side API key) in this doc or in README — **do not commit secrets**.

For MVP, the **Console + link from the dashboard** (Option A) is enough.
