# Milestone 05 — ExperienceSection Data-Driven

**Reference:** `docs/milestones/00-shared-requirements-and-rules.md` (if present) and `docs/FIRESTORE_SCHEMA.md`.

**Context:** ExperienceSection has a parallax background image (bg-4.png), heading + description text overlay, and a CardRail with 4 cards (each: title, image, description). The cards are in a `const cards = [...]` array.

**Schema fields (from `docs/FIRESTORE_SCHEMA.md`):** `heading`, `description`, `backgroundImageUrl`, `cards[].title`, `cards[].imageUrl`, `cards[].description`

---

## INPUTS

- **File to modify:** `src/components/sections/ExperienceSection/ExperienceSection.jsx`
- **Content source:** Firestore `sites/sdu-boutique/config` → `home.experience`
- **Content hook:** `useContentContext` from `../../../contexts/ContentContext`
- **Schema:** `docs/FIRESTORE_SCHEMA.md` (experience section)

---

## INSTRUCTIONS

### Step 1: Read the component

Read `src/components/sections/ExperienceSection/ExperienceSection.jsx` to understand its structure.

### Step 2: Import useContentContext

Add the import:

```jsx
import { useContentContext } from '../../../contexts/ContentContext';
```

### Step 3: Get data inside the component

Inside `ExperienceSection`, add:

```jsx
const { config } = useContentContext();
const data = config?.home?.experience;
```

### Step 4: Replace background image

Find the parallax background image (currently `heroBg`). Replace:

```jsx
src={heroBg}
```

with:

```jsx
src={data?.backgroundImageUrl || heroBg}
```

Keep the `heroBg` local import as fallback. Do NOT remove the import.

### Step 5: Replace heading (split across 2 lines with `<br/>`)

The heading is currently hardcoded as two lines. Replace with:

```jsx
const headingLines = (data?.heading || "على الرحب والقلب\nأوسع من الدار").split('\n');
```

Render the heading as:

```jsx
<h2 className="...">
  {headingLines.map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < headingLines.length - 1 && <br />}
    </React.Fragment>
  ))}
</h2>
```

Add `import React from 'react';` if not already present (for `React.Fragment`).

### Step 6: Replace description

Replace the hardcoded description paragraph with:

```jsx
{data?.description || "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\n\nفلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة."}
```

If the description contains `\n`, you may split and render with `<br />` between parts to preserve line breaks. Otherwise a single string is fine.

### Step 7: Replace cards array

Move the cards definition inside the component (after `const data = ...`). Replace the static `cards` array with:

```jsx
const cards = (data?.cards || [
  { title: "إقامة متفردة", imageUrl: card1, description: "خصوصية تامة تحيط بكم وتصميم يعكس الطابع الأصيل والرفاهية." },
  { title: "كرم الضيافة", imageUrl: card2, description: "خدمة تُقدَّم بشغف، تُعنى بالتفاصيل لتمنحكم تجربة لا تُنسى." },
  { title: "جودة السكن", imageUrl: card3, description: "مساحات ورفاهية عصرية صُممت لتأخذ بكم إلى أقصى درجات الراحة." },
  { title: "رحابة الاستقبال", imageUrl: card4, description: "فريق محترف يستقبلكم بروح الضيافة السعودية الأصيلة." },
]).map(c => ({
  img: c.imageUrl || c.img,
  title: c.title,
  desc: c.description || c.desc
}));
```

**Note:** CardRail expects `{ img, title, desc }`. Map from schema's `{ imageUrl, title, description }`. Keep local imports `card1`, `card2`, `card3`, `card4` as fallbacks in the default array.

### Step 8: Do NOT modify

- `CardRail.jsx` — do not change it.
- Tailwind classes, framer-motion animations, layout, or responsive behavior.

---

## OUTPUTS CHECKLIST

- [ ] `useContentContext` is imported and used.
- [ ] `data = config?.home?.experience` is defined.
- [ ] Background image uses `data?.backgroundImageUrl || heroBg`.
- [ ] Heading uses `data?.heading` with `\n` split and `<br />` between lines.
- [ ] Description uses `data?.description` with fallback.
- [ ] Cards array is built from `data?.cards` with schema mapping to `{ img, title, desc }`.
- [ ] All local image imports (heroBg, card1–card4) remain as fallbacks.
- [ ] No changes to CardRail.jsx.
- [ ] No changes to Tailwind, framer-motion, or layout.
