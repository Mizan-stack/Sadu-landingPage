# Milestone 03 — HeroSection Data-Driven

**Title:** Milestone 03 — HeroSection Data-Driven

**Context:** HeroSection currently has hardcoded slides (3 images), title (2 lines), stats (3 items), and a "فنادقنا" hotel card. This milestone replaces all hardcoded content with Firestore data.

---

## INPUTS

- [ ] M02 completed (`useContentContext` available, Firestore has seed data)

**Verify before starting:** Ensure `ContentProvider` wraps the app and `useContentContext()` is available. Firestore should have seed data from M01.

---

## INSTRUCTIONS

### Step 1: Read the current HeroSection

1. Open `src/components/sections/HeroSection/HeroSection.jsx`
2. Note the current structure: slides array, title, stats, hotel card text

### Step 2: Read the schema

Read `docs/FIRESTORE_SCHEMA.md` → hero section fields:
- `title` (string, may contain `\n`)
- `slides[]` (each `{ imageUrl: string }`)
- `stats[]` (each `{ value: string; label: string }`)
- `hotelCardText` (string)

### Step 3: Add imports and data hook

At the top of the component, add:
```jsx
import { useContentContext } from '../../../contexts/ContentContext';
```

Inside the component function, add:
```jsx
const { config, loading } = useContentContext();
const data = config?.home?.hero;
```

### Step 4: Replace hardcoded slides

**OLD:** 
```jsx
import heroImage from "../../../assets/images/hero.png";
import heroImage2 from "../../../assets/images/bg-10.png";
import heroImage3 from "../../../assets/images/bg-11.png";
const heroSlides = [heroImage, heroImage2, heroImage3];
const slides = [...new Set(heroSlides.filter(Boolean))];
const fallbackSlides = slides.length > 0 ? slides : [heroImage];
```

**NEW:** 
- Keep the local imports as FALLBACKS
- Use: `const slides = data?.slides?.map(s => s.imageUrl).filter(Boolean) || [heroImage, heroImage2, heroImage3];`
- Replace the old `const slides = [...]` and `const fallbackSlides = [...]` logic
- Use: `const activeSlides = slides.length > 0 ? slides : [heroImage];`
- Update all references from `fallbackSlides` to `activeSlides` in the component (slider, thumbnails, hotel card image)

### Step 5: Replace title

**OLD:** 
```jsx
<span className="block">اختبر الرفاهية كما</span>
<span className="block">يجب أن تكون</span>
```

**NEW:** 
```jsx
const titleLines = (data?.title || "اختبر الرفاهية كما\nيجب أن تكون").split('\n');
```
Then in JSX:
```jsx
{titleLines.map((line, i) => (
  <span key={i} className="block">{line}</span>
))}
```

### Step 6: Replace stats

**OLD:** 
```jsx
const stats = [
  { value: "24/7", label: "خدمة ضيوف مخصصة" },
  { value: "233+", label: "غرفة وجناح" },
  { value: "5", label: "وجهة بوتيكية" },
];
```

**NEW:** 
```jsx
const stats = data?.stats || [
  { value: "24/7", label: "خدمة ضيوف مخصصة" },
  { value: "233+", label: "غرفة وجناح" },
  { value: "5", label: "وجهة بوتيكية" },
];
```

### Step 7: Replace hotel card text

**OLD:** hardcoded `"فنادقنا"` in the hotel card div

**NEW:** 
```jsx
{data?.hotelCardText || "فنادقنا"}
```

### Step 8: Do NOT change

- Any Tailwind classes
- framer-motion animations
- Layout structure
- Responsive behavior
- Do NOT add loading skeletons to the hero (it's above the fold and should use fallbacks for instant render)

### Step 9: Handle loading

- Do NOT show a loading spinner/skeleton for the hero
- Use fallbacks immediately so the section renders with original content when `data` is undefined
- The hero should never appear empty or broken

---

## OUTPUTS (Verification Checklist)

- [ ] HeroSection reads hero data from `useContentContext()`
- [ ] Slides come from Firestore (with local fallback when `data?.slides` is empty)
- [ ] Title text comes from Firestore (with fallback)
- [ ] Stats come from Firestore (with fallback)
- [ ] Hotel card text comes from Firestore (with fallback)
- [ ] No visual change when Firestore data matches the hardcoded content
- [ ] If Firestore is empty/unavailable, the section renders with original hardcoded content
- [ ] No layout shifts, no broken styles
- [ ] All references to `fallbackSlides` updated to `activeSlides` (or equivalent)
- [ ] Slider, thumbnails, and hotel card all use `activeSlides` for images
