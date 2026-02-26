# Run & Deploy Guide — SDU Boutique

## Manual setup (one-time, before first run)

### 1. Firebase project setup

- Ensure project **sduksa** exists in [Firebase Console](https://console.firebase.google.com).
- Enable **Firestore** (if not already).
- Enable **Authentication** → **Email/Password** sign-in.
- Create a **second hosting site** named `admin-sduksa`:
  - Firebase Console → Hosting → Add another site → name it `admin-sduksa`.
- Enable **Storage** (for image uploads from the dashboard).

### 2. Environment variables

**Landing page** (root):

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase config from **Project settings → General → Your apps**:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=sduksa.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sduksa
VITE_FIREBASE_APP_ID=...
```

**Dashboard** (`dashboard/`):

```bash
cd dashboard
cp .env.example .env
```

Edit `dashboard/.env` with the same Firebase values, plus:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=sduksa.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sduksa
VITE_FIREBASE_APP_ID=...

VITE_WEBSITE_URL=https://sduksa.web.app
```

### 3. Seed Firestore (first time only)

The website reads content from Firestore. If the config document is empty, you’ll see fallbacks. To populate it:

1. Create a **service account key**:
   - Firebase Console → Project settings → Service accounts → Generate new private key.
   - Save the JSON file somewhere safe (e.g. `dashboard/keys/sduksa-key.json`).

2. Run the seed script:

```bash
cd dashboard
export GOOGLE_APPLICATION_CREDENTIALS=./keys/sduksa-key.json
npm run seed
```

Or with `gcloud` auth:

```bash
cd dashboard
gcloud auth application-default login
npm run seed
```

### 4. Create a dashboard admin user

- Firebase Console → Authentication → Users → Add user.
- Use the email/password you’ll use to log into the dashboard.

---

## How to run locally

### Landing page

```bash
# From project root
npm install
npm run dev
```

Open: **http://localhost:5173**

### Dashboard

```bash
cd dashboard
npm install
npm run dev
```

Open: **http://localhost:5173** (or the port shown in the terminal)

---

## Deploy scripts

### Landing page (website)

From the **project root**:

```bash
npm run deploy
```

This runs `npm run build && firebase deploy --only hosting` and deploys the website.

**When the dashboard is in a separate repo**, the root will only contain the landing page. The same command deploys the website.

### Dashboard

From the **dashboard** folder:

```bash
cd dashboard
npm run deploy
```

This runs `npm run build && firebase deploy --only hosting` and deploys the dashboard to the `admin-sduksa` hosting site.

**When the dashboard is in a separate repo**, copy these into the dashboard repo:

- `dashboard/` contents (src, package.json, firebase.json, .firebaserc, etc.)
- `dashboard/.firebaserc` with `"default": "sduksa"`
- `dashboard/firebase.json` with hosting site `admin-sduksa`
- `dashboard/.env.example` and your `.env`

Then run `npm run deploy` from the dashboard root.

---

## Troubleshooting

### Sections stuck on "Loading" in the dashboard

1. **Deploy Firestore rules** (from project root):
   ```bash
   firebase deploy --only firestore
   ```
   The rules must allow read on `sites/sdu-boutique/config/{configDoc}`.

2. **Run the seed script** to create the config document (if you haven't):
   ```bash
   cd dashboard
   export GOOGLE_APPLICATION_CREDENTIALS=./path/to/serviceAccountKey.json
   npm run seed
   ```

3. If it still hangs, check the browser console for Firestore errors (e.g. permission-denied).

---

### `auth/invalid-api-key` in the dashboard

This means the Firebase config is missing or empty. Fix it:

1. **Go to Firebase Console**
   - Open [Firebase Console](https://console.firebase.google.com) → select project **sduksa**
   - Click the gear icon → **Project settings** → scroll to **Your apps**

2. **Get your Firebase config**
   - If you have a web app, click it. If not, click **Add app** → **Web** (</> icon) → register it (e.g. name: "Dashboard")
   - Copy the config object values: `apiKey`, `authDomain`, `projectId`, `appId`

3. **Create or edit `dashboard/.env`**
   ```bash
   cd dashboard
   cp .env.example .env
   ```
   Open `dashboard/.env` and paste your values (no quotes around the values):
   ```
   VITE_FIREBASE_API_KEY=AIzaSy...your-actual-key
   VITE_FIREBASE_AUTH_DOMAIN=sduksa.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=sduksa
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
   VITE_WEBSITE_URL=https://sduksa.web.app
   ```

4. **Restart the dev server** (or rebuild and redeploy)
   - Local: stop the dev server (Ctrl+C) and run `npm run dev` again
   - Deployed: run `npm run deploy` from the dashboard folder to rebuild with the correct env

### Firestore & Storage rules

From the **project root** (where `firestore.rules` and `storage.rules` live):

```bash
firebase deploy --only firestore
firebase deploy --only storage
```

Or use the scripts:

```bash
npm run deploy:firestore
npm run deploy:storage
```

---

## Quick reference

| Task              | Command                          | Where      |
|-------------------|-----------------------------------|------------|
| Run website       | `npm run dev`                    | Root       |
| Run dashboard     | `npm run dev`                    | dashboard/ |
| Deploy website    | `npm run deploy`                 | Root       |
| Deploy dashboard  | `npm run deploy`                 | dashboard/ |
| Seed Firestore    | `npm run seed`                   | dashboard/ |
| Deploy Firestore  | `npm run deploy:firestore`       | Root       |
| Deploy Storage    | `npm run deploy:storage`        | Root       |

---

## After separating the dashboard

1. **Dashboard repo** should include:
   - All files under `dashboard/`
   - `dashboard/.firebaserc` with project `sduksa`
   - `dashboard/firebase.json` with hosting site `admin-sduksa`
   - `dashboard/package.json` with `"deploy": "npm run build && firebase deploy --only hosting"`
   - `dashboard/.env.example` and your `.env`

2. **Landing page repo** keeps:
   - Root files (src, package.json, firebase.json, .firebaserc)
   - Firestore and Storage rules (or move them to a shared config repo if you prefer)

3. **Firestore/Storage rules** can stay in either repo. Deploy them from wherever the rules files live:

   ```bash
   firebase deploy --only firestore
   firebase deploy --only storage
   ```
