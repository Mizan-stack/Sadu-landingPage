# Milestone 08 — HeritageSection Data-Driven

**Reference:** `docs/milestones/00-shared-requirements-and-rules.md` (if present) and `docs/FIRESTORE_SCHEMA.md`.

**Context:** HeritageSection has: ornament (fram.png), heading "ثقافة تاريخية", body text, and 3 images in a grid. Mobile shows 2 images, desktop shows 3.

**Schema fields (from `docs/FIRESTORE_SCHEMA.md`):** `heading`, `body`, `ornamentUrl`, `images[].imageUrl`

---

## INPUTS

- **File to modify:** `src/components/sections/HeritageSection/HeritageSection.jsx`
- **Content source:** Firestore `sites/sdu-boutique/config` → `home.heritage`
- **Content hook:** `useContentContext` from `../../../contexts/ContentContext`
- **Schema:** `docs/FIRESTORE_SCHEMA.md` (heritage section)

---

## INSTRUCTIONS

### Step 1: Read the component

Read `src/components/sections/HeritageSection/HeritageSection.jsx` to understand its structure.

### Step 2: Import useContentContext

Add the import:

```jsx
import { useContentContext } from '../../../contexts/ContentContext';
```

### Step 3: Get data inside the component

Inside `HeritageSection`, add:

```jsx
const { config } = useContentContext();
const data = config?.home?.heritage;
```

### Step 4: Replace ornament

Find the TopFrameOrnament (currently `topFrame`). Replace:

```jsx
src={topFrame}
```

with:

```jsx
src={data?.ornamentUrl || topFrame}
```

Keep the `topFrame` local import as fallback.

### Step 5: Replace heading (both mobile and desktop blocks)

The heading appears in BOTH the mobile header block and the desktop header block. Replace both occurrences with:

```jsx
{data?.heading || "ثقافة تاريخية"}
```

### Step 6: Replace body text (both mobile and desktop blocks)

The body text appears in BOTH blocks. Use:

```jsx
const bodyText = data?.body || "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\n\nتُجسد فلسفة سدو في كمال التفاصيل بدءًا من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي تمنح الضيف شعورًا حقيقيًا بالترحيب والانتماء.";
```

If the body contains `\n\n`, split and render with `<br /><br />` between parts to preserve paragraphs. Apply the same body content to both mobile and desktop `<p>` elements.

### Step 7: Replace images array

Replace:

```jsx
const images = [img1, img2, img3];
```

with:

```jsx
const images = data?.images?.map(i => i.imageUrl) || [img1, img2, img3];
```

Keep local imports `img1`, `img2`, `img3` as fallbacks.

### Step 8: Verify mobile/desktop image logic

- **Mobile view:** `[images[0], images[2]]` — must work with the Firestore array (indices 0 and 2).
- **Desktop view:** `images.map(...)` — shows all 3 images.

Ensure this logic works when `images` comes from Firestore (array of URLs) or fallback (local imports).

### Step 9: Do NOT change

- Tailwind classes, framer-motion animations, layout, or responsive behavior.
- TopFrameOrnament component usage (only its `src` prop).

---

## OUTPUTS CHECKLIST

- [ ] `useContentContext` is imported and used.
- [ ] `data = config?.home?.heritage` is defined.
- [ ] Ornament uses `data?.ornamentUrl || topFrame`.
- [ ] Heading (both mobile and desktop) uses `data?.heading` with fallback.
- [ ] Body text (both mobile and desktop) uses `data?.body` with fallback.
- [ ] Images array: `data?.images?.map(i => i.imageUrl) || [img1, img2, img3]`.
- [ ] Mobile shows `[images[0], images[2]]`; desktop shows all 3.
- [ ] All local imports (topFrame, img1, img2, img3) remain as fallbacks.
