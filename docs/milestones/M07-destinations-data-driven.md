# Milestone 07 — DestinationsSection Data-Driven

**Reference:** `docs/milestones/00-shared-requirements-and-rules.md` (if present) and `docs/FIRESTORE_SCHEMA.md`.

**Context:** DestinationsSection has heading "اختر وجهتك" and 3 destination cards (each: name, image, description). Cards are used in both mobile (swipeable) and desktop (expandable) views.

**Schema fields (from `docs/FIRESTORE_SCHEMA.md`):** `heading`, `cards[].name`, `cards[].imageUrl`, `cards[].description`

---

## INPUTS

- **File to modify:** `src/components/sections/DestinationsSection/DestinationsSection.jsx`
- **Content source:** Firestore `sites/sdu-boutique/config` → `home.destinations`
- **Content hook:** `useContentContext` from `../../../contexts/ContentContext`
- **Schema:** `docs/FIRESTORE_SCHEMA.md` (destinations section)

---

## INSTRUCTIONS

### Step 1: Read the component

Read `src/components/sections/DestinationsSection/DestinationsSection.jsx` to understand its structure.

### Step 2: Import useContentContext

Add the import:

```jsx
import { useContentContext } from '../../../contexts/ContentContext';
```

### Step 3: Get data and replace cards definition

Inside `DestinationsSection`, add:

```jsx
const { config } = useContentContext();
const data = config?.home?.destinations;
```

Replace the current `cards` array definition with:

```jsx
const cards = data?.cards || [
  { name: "سدو بوتيك الخبر", imageUrl: img1, description: "مساحة مصممة للهدوء وخصوصية الإقامة." },
  { name: "سدو بوتيك الرياض", imageUrl: img2, description: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة." },
  { name: "سدو بوتيك المدينة", imageUrl: img3, description: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة." },
];
```

Keep local imports `img1`, `img2`, `img3` as fallbacks in the default array.

### Step 4: Update JSX references to use schema field names

The schema uses `imageUrl`, `name`, `description`. The current code uses `card.img`, `card.title`, `card.desc`. Update all references:

| Old | New |
|-----|-----|
| `card.img` | `card.imageUrl` |
| `card.title` | `card.name` |
| `card.desc` | `card.description` |

Apply to:
- Mobile view: `cards[activeIndex].img` → `cards[activeIndex].imageUrl`, `cards[activeIndex].title` → `cards[activeIndex].name`, `cards[activeIndex].desc` → `cards[activeIndex].description`
- Desktop view: `card.img` → `card.imageUrl`, `card.title` → `card.name`, `card.desc` → `card.description`
- `alt` attributes: `alt={cards[activeIndex].title}` → `alt={cards[activeIndex].name}`, `alt={card.title}` → `alt={card.name}`

### Step 5: Replace heading

Replace the hardcoded heading with:

```jsx
{data?.heading || "اختر وجهتك"}
```

### Step 6: Do NOT change

- Mobile swipe behavior (drag handlers, `handleNext`, `handlePrev`).
- Desktop expandable card behavior.
- Tailwind classes, framer-motion animations, or layout.

---

## OUTPUTS CHECKLIST

- [ ] `useContentContext` is imported and used.
- [ ] `data = config?.home?.destinations` is defined.
- [ ] Cards array is built from `data?.cards` with schema fields `name`, `imageUrl`, `description`.
- [ ] All references use `card.imageUrl`, `card.name`, `card.description` (no `img`, `title`, `desc`).
- [ ] Heading uses `data?.heading` with fallback.
- [ ] Local image imports (img1, img2, img3) remain as fallbacks.
- [ ] Mobile swipe and desktop expandable behavior unchanged.
