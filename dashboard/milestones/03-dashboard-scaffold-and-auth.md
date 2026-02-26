# Milestone 03 – Dashboard Scaffold & Auth (Dashboard Repo)

**Where to run:** In this **dashboard** repo.  
**Prerequisite:** Milestone 02 done (Firebase init, Firestore schema, types).

Use **Auto + Composer plan**. Follow `milestones/00-shared-requirements-and-rules.md` for requirements and rules.

---

## Objective

Create the dashboard React app shell: layout, navigation, and Firebase Auth (sign-in so only admins can use the dashboard). No section editors yet; only structure and auth.

---

## Tasks

### 1. App scaffold

- **Stack:** React (Vite or CRA) + TypeScript + TailwindCSS. If the repo is empty, scaffold with Vite + React + TS and add Tailwind.
- **Layout:** Sidebar or top nav with links: “Global”, “Sections” (or “Homepage”), “Contact”, “Analytics” (placeholder for later). Use the same warm, luxurious aesthetic as the website (beige, cream, dark red/maroon, emerald). Support RTL for Arabic labels.
- **Routing:** Use React Router. Routes: `/login`, `/` (redirect to dashboard home or first section), `/global`, `/sections`, `/sections/:sectionId`, `/contact`, `/analytics` (optional placeholder).
- **State:** Prefer local state and Firestore listeners. Add a small auth context (e.g. `AuthProvider`) that exposes `user`, `loading`, `signIn`, `signOut`. No global store unless necessary.

### 2. Firebase Auth

- **Sign-in:** Email/password or Google sign-in (choose one for MVP; document how to add the other). Sign-in page at `/login` with a simple form (email, password) and “Sign in” button.
- **Protection:** All routes except `/login` require authentication. If `user` is null, redirect to `/login`. Show a loading spinner while auth state is resolving.
- **Security:** Firestore rules from Milestone 02 already restrict writes to `request.auth != null`. No need to duplicate auth checks in Firestore rules; just ensure only signed-in users can open the dashboard.
- **Optional:** Restrict access to a list of admin UIDs or custom claim `admin: true`. Document in README how to set the first admin (e.g. Firebase Console or a one-time script).

### 3. Dashboard “home”

- Landing after login: either redirect to `/global` or to a simple dashboard home page that lists “Edit Global”, “Edit Sections”, “Edit Contact” and optionally “Analytics”. No editing UI yet; only navigation and placeholders.

### 4. UX and quality

- **Loading:** Show a clear loading state while checking auth. On sign-in error, show a user-friendly message (e.g. “Invalid email or password”).
- **Sign out:** Sign-out button in the layout (e.g. in the sidebar or header). Confirm or direct sign-out is fine for MVP.
- **Accessibility:** Semantic HTML, labeled inputs, sufficient contrast. RTL-friendly layout for Arabic.
- **Lint and types:** No lint errors; TypeScript strict with no `any` for public APIs.

---

## Rules (from shared doc)

- No hardcoded secrets; auth uses the same Firebase project as Milestone 02.
- Reuse `auth`, `db` from the existing Firebase init. Do not re-initialize Firebase.
- Follow the same design language as the website (warm, luxurious, RTL-capable).
- Document how to run the app and how to create the first admin user (if applicable).

---

## Handoff

- **Done when:** Dashboard app runs, login works, layout and navigation are in place, and all non-login routes are protected.
- **Next milestone (04)** can assume: Auth context and protected routes exist; it will add Firestore read/write and forms for each section (global, sections, contact).
