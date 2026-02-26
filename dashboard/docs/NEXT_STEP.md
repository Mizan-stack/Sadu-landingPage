# What to do next

The frontend contract is locked. The dashboard milestones are updated to use the **exact** schema (single config doc at `sites/sdu-boutique/config`).

---

## Your next step

**Run Milestone 02 in this dashboard repo.**

1. Open **`milestones/02-firebase-and-firestore-setup.md`**.
2. Copy the **entire** file.
3. In Cursor, start a new Composer session with **Auto + Composer plan**.
4. Paste the content and add: *"Implement this milestone. Follow 00-shared-requirements-and-rules.md."*
5. When the agent is done, run **Milestone 03**, then **04**, then **05** in the same way (each in a new Composer session).

---

## Summary of what the frontend contract means

- **One Firestore read per page:** The website reads a single document: `sites/sdu-boutique/config` with `global`, `home`, and `contact`.
- **Dashboard writes to the same doc:** When you edit global, a section, or contact, the dashboard updates only that part of the config (merge/update), so the website and other sections stay in sync.
- **Section IDs are fixed:** hero, hadara, experiences, greenGallery, heritage, events, locations, visitUs, ourSands, shurafa, culturalGallery, futureSadu (camelCase).
- **Field names are fixed:** e.g. `bookNowLink` (not bookNowUrl), `title`/`subtitle` (not titleAr), `mainImageUrl`/`insetImageUrl`, `form.nameLabel`, `form.placeholders.name`, etc. See `docs/FIRESTORE_SCHEMA.md`.

The website may only have the hero wired so far; that’s fine. Once the dashboard writes to `sites/sdu-boutique/config`, the website’s single read will get that data. Your friend can finish wiring the rest of the sections on the website using the same config shape.
