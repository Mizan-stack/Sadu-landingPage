# SDU Boutique Dashboard – Milestones

Run these milestones in order. Use **Auto + Composer plan** for each. Each file is a **full prompt** to paste into the Cursor agent.

---

## Order of operations

### Step 0: Integration (website repo)

1. Open the **website** (frontend) project.
2. Copy the full content of **`01-integration-prompt.md`**.
3. Paste into Cursor (Auto + Composer) and run. The agent will make the website data-driven from Firestore and output a **“Current situation” report**.
4. Copy the report (and any schema doc) and keep it for the next step.

### Step 1: Optional alignment

- If you have the “Current situation” report from the website, you can **update** `02-firebase-and-firestore-setup.md` (and optionally `04-dashboard-content-editors.md`) to use the exact paths and section IDs from that report. Then run the dashboard milestones.
- If you run dashboard milestones first, use the schema as written in Milestone 02 and share `docs/FIRESTORE_SCHEMA.md` with the website team so they align.

### Step 2: Dashboard milestones (this repo)

Run in this **dashboard** repo, one milestone per Cursor session (Auto + Composer):

| Order | File | What it does |
|-------|------|--------------|
| 0 | `00-shared-requirements-and-rules.md` | **Reference only** – read before each milestone; do not run as a prompt. |
| 1 | `01-integration-prompt.md` | **Run in the website repo**, not here. See Step 0 above. |
| 2 | `02-firebase-and-firestore-setup.md` | Firebase init, Firestore schema, security rules, TypeScript types. |
| 3 | `03-dashboard-scaffold-and-auth.md` | Dashboard app shell, layout, routing, Firebase Auth (login). |
| 4 | `04-dashboard-content-editors.md` | Editable UIs for global, all sections, contact page. |
| 5 | `05-analytics-and-deployment.md` | Analytics doc, deploy dashboard to Firebase Hosting (second site/domain). |

---

## How to run each milestone

1. Open the file (e.g. `02-firebase-and-firestore-setup.md`).
2. Copy the **entire** file content.
3. In Cursor, start a new Composer session with **Auto + Composer plan**.
4. Paste the content as the user message (you can add: “Implement this milestone. Follow 00-shared-requirements-and-rules.md.”).
5. When the agent is done, move to the next milestone in the same repo (reuse the same codebase).

---

## Rules and requirements

- **Always** keep `00-shared-requirements-and-rules.md` in mind; each milestone references it.
- **Same Firebase project** for website and dashboard; only Hosting uses two sites (website + dashboard).
- **Section IDs and Firestore paths** must match between website and dashboard; use the schema from Milestone 02 (or from the website’s “Current situation” report) and document it in `docs/FIRESTORE_SCHEMA.md`.
