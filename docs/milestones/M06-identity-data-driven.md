# Milestone 06 — IdentitySection Data-Driven

**Reference:** `docs/milestones/00-shared-requirements-and-rules.md` (if present) and `docs/FIRESTORE_SCHEMA.md`.

**Context:** IdentitySection has: layered bg colors, pattern image (bg-3.png), main image (bg-9.png), heading "هويتنا أصل ضيافتنا", and body text (2 paragraphs separated by `<br/><br/>`).

**Schema fields (from `docs/FIRESTORE_SCHEMA.md`):** `heading`, `body`, `mainImageUrl`, `patternImageUrl`

---

## INPUTS

- **File to modify:** `src/components/sections/IdentitySection/IdentitySection.jsx`
- **Content source:** Firestore `sites/sdu-boutique/config` → `home.identity`
- **Content hook:** `useContentContext` from `../../../contexts/ContentContext`
- **Schema:** `docs/FIRESTORE_SCHEMA.md` (identity section)

---

## INSTRUCTIONS

### Step 1: Read the component

Read `src/components/sections/IdentitySection/IdentitySection.jsx` to understand its structure.

### Step 2: Import useContentContext

Add the import:

```jsx
import { useContentContext } from '../../../contexts/ContentContext';
```

### Step 3: Get data inside the component

Inside `IdentitySection`, add:

```jsx
const { config } = useContentContext();
const data = config?.home?.identity;
```

### Step 4: Replace pattern image

Find the pattern overlay image (currently `patternBg`). Replace:

```jsx
src={patternBg}
```

with:

```jsx
src={data?.patternImageUrl || patternBg}
```

Keep the `patternBg` local import as fallback.

### Step 5: Replace main image

Find the main image (currently `mainImage`). Replace:

```jsx
src={mainImage}
```

with:

```jsx
src={data?.mainImageUrl || mainImage}
```

Keep the `mainImage` local import as fallback.

### Step 6: Replace heading

Replace the hardcoded heading with:

```jsx
{data?.heading || "هويتنا أصل ضيافتنا"}
```

### Step 7: Replace body text

The body has 2 paragraphs separated by `<br/><br/>`. Use:

```jsx
const bodyParts = (data?.body || "نستمد من عمق التراث السعودي فنون الضيافة الأصيلة، لتجربة فندقية تعكس هويتنا وتمنح ضيوفنا لحظات إقامة لا تُنسى بتجربة وروح سعودية خالصة.\n\nيجمع نموذجنا الفندقي بين مرونة الابتكار ودقة التنفيذ عبر اعتماد أرقى الممارسات التي تحقق النجاح لشركائنا وتمنح ضيوفنا أعلى معايير جودة الإقامة.").split('\n\n');
```

Render the body. For example:

```jsx
<p className="...">
  {bodyParts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < bodyParts.length - 1 && <><br /><br /></>}
    </React.Fragment>
  ))}
</p>
```

Or keep a single `<p>` with the same visual result (paragraphs separated by `<br/><br/>`). Match the original layout.

### Step 8: Do NOT change

- Layout classes or the dual-background-color structure (`bg-[#E9DFD2]`, `bg-[#E3D6C6]`).
- Tailwind classes, framer-motion animations, or responsive behavior.

---

## OUTPUTS CHECKLIST

- [ ] `useContentContext` is imported and used.
- [ ] `data = config?.home?.identity` is defined.
- [ ] Pattern image uses `data?.patternImageUrl || patternBg`.
- [ ] Main image uses `data?.mainImageUrl || mainImage`.
- [ ] Heading uses `data?.heading` with fallback.
- [ ] Body text uses `data?.body` split by `\n\n`, rendered with `<br/><br/>` between parts.
- [ ] All local image imports (patternBg, mainImage) remain as fallbacks.
- [ ] No changes to layout classes or dual-background structure.
