# Firestore Content Schema (Website ↔ Dashboard Contract)

**Source:** Frontend integration contract. **Do not change** field names or section IDs without syncing with the website.

---

## Path (single document)

```
sites/sdu-boutique/config
```

**Site ID:** `sdu-boutique` (fixed).

---

## Document shape

One document with three top-level keys:

```ts
{
  global: GlobalContent,
  home: HomeContent,
  contact: ContactContent
}
```

Dashboard: **read** this doc once per load/session; **write** with `setDoc` or `updateDoc` (merge) so you don’t overwrite other keys.

---

## global

```ts
global: {
  logoUrl: string,
  phone: string,
  bookNowText: string,
  bookNowLink: string,
  nav: Array<{ label: string, target: string }>
}
```

---

## home (section IDs – order matters)

| # | Section ID       | Shape |
|---|------------------|--------|
| 1 | hero             | `{ title, subtitle, imageUrl }` |
| 2 | hadara           | `{ title, slogan, body, leftImageUrl, insetImageUrl }` |
| 3 | experiences      | `{ title, description, backgroundImageUrl }` |
| 4 | greenGallery     | `{ items: [{ imageUrl, caption }] }` |
| 5 | heritage         | `{ title, body, imageUrl }` |
| 6 | events           | `{ items: [{ imageUrl, caption }] }` |
| 7 | locations        | `{ title, body, items: [{ imageUrl, caption? }] }` |
| 8 | visitUs          | `{ title, description, mainImageUrl, insetImageUrl }` |
| 9 | ourSands         | `{ title, description, mainImageUrl, insetImageUrl }` |
|10 | shurafa          | `{ title, description, backgroundImageUrl }` |
|11 | culturalGallery  | `{ items: [{ imageUrl, caption }] }` |
|12 | futureSadu       | `{ title, description, imageUrl }` |

All fields above are `string` unless noted. Use these **exact** keys in the dashboard.

---

## contact

```ts
contact: {
  title: string,
  intro: string,
  sideImageUrl?: string,
  form: {
    nameLabel: string,
    mobileLabel: string,
    emailLabel: string,
    messageLabel: string,
    submitText: string,
    placeholders: {
      name: string,
      mobile: string,
      email: string,
      message: string
    }
  }
}
```

---

## Security

Rules live in **`firestore.rules`** in the dashboard repo. Deploy with Firebase CLI.

- **Read:** allow for `sites/sdu-boutique/config` so the **website** can read without auth (public content).
- **Write:** allow only when `request.auth != null`. Optionally restrict by custom claim `admin: true` or allowlist of UIDs.

**Summary:** Website is read-only (unauthenticated). Dashboard has write access when the user is signed in (same Firebase project; `VITE_FIREBASE_*` env vars).
