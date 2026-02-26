# Milestone 04 — HadaraSection Data-Driven

**Title:** Milestone 04 — HadaraSection Data-Driven

**Context:** HadaraSection has: top ornament (fram.png), title icon (main-title-2.png), center intro paragraph, 2-column grid with FloatingImagePair (bg-1 main + bg-2 small) and text block (heading + body) with pattern bg (bg-3). All hardcoded.

---

## INPUTS

- [ ] M02 completed (`useContentContext` available)

**Verify before starting:** Ensure `ContentProvider` wraps the app and `useContentContext()` is available.

---

## INSTRUCTIONS

### Step 1: Read the current HadaraSection

1. Open `src/components/sections/HadaraSection/HadaraSection.jsx`
2. Note all hardcoded values: topFrame, titleIcon, intro text, FloatingImagePair images, pattern image, heading, body

### Step 2: Read the schema

Read `docs/FIRESTORE_SCHEMA.md` → hadara fields:
- `titleIconUrl` — main-title-2 icon above intro
- `ornamentUrl` — top frame ornament (fram.png)
- `introText` — center paragraph below icon
- `heading` — "هوية نعتز بها"
- `body` — text block next to images
- `mainImageUrl` — large image (bg-1.png)
- `smallImageUrl` — small floating image (bg-2.png)
- `patternImageUrl` — pattern background (bg-3.png)

### Step 3: Add imports and data hook

At the top of the component, add:
```jsx
import { useContentContext } from '../../../contexts/ContentContext';
```

Inside the component function, add:
```jsx
const { config } = useContentContext();
const data = config?.home?.hadara;
```

### Step 4: Keep local image imports as fallbacks

Keep these imports:
```jsx
import titleIcon from "../../../assets/icons/main-title-2.png";
import topFrame from "../../../assets/icons/fram.png";
import bgMain from "../../../assets/images/bg-1.png";
import bgSmall from "../../../assets/images/bg-2.png";
import bgPattern from "../../../assets/images/bg-3.png";
```

### Step 5: Replace each field with data-driven value + fallback

| Element | OLD | NEW |
|---------|-----|-----|
| Ornament (TopFrameOrnament) | `src={topFrame}` | `src={data?.ornamentUrl \|\| topFrame}` |
| Title icon (img) | `src={titleIcon}` | `src={data?.titleIconUrl \|\| titleIcon}` |
| Intro paragraph | Hardcoded text | `{data?.introText \|\| "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nعلامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها."}` |
| FloatingImagePair bigImageSrc | `bigImageSrc={bgMain}` | `bigImageSrc={data?.mainImageUrl \|\| bgMain}` |
| FloatingImagePair smallImageSrc | `smallImageSrc={bgSmall}` | `smallImageSrc={data?.smallImageUrl \|\| bgSmall}` |
| Pattern image (img) | `src={bgPattern}` | `src={data?.patternImageUrl \|\| bgPattern}` |
| Heading (h2) | `هوية نعتز بها` | `{data?.heading \|\| "هوية نعتز بها"}` |
| Body paragraph (p) | Hardcoded text | `{data?.body \|\| "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nتحت مظلة علامة سدو، تتجسد التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي تلامس خصوصية الضيف وتمنحه شعورًا حقيقيًا بالترحيب والانتماء."}` |

**Intro text fallback (exact from component):**
```
علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من
فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.
علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من
فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.
```
(Use `\n` or `<br />` as in the original for line breaks.)

**Body text fallback (exact from component):**
```
علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية،
مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها
وعمقها.
تحت مظلة علامة سدو، تتجسد التصاميم المكانية التي تروي قصص
الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي
تلامس خصوصية الضيف وتمنحه شعورًا حقيقيًا بالترحيب والانتماء.
```
(Use `\n` or `<br />` as in the original.)

### Step 6: Do NOT change

- Tailwind classes
- framer-motion animations
- Layout structure
- Responsive behavior
- FloatingImagePair wrapper classes (bigImageClassName, smallWrapperClassName, smallImageClassName)
- PageContainer or TopFrameOrnament usage

### Step 7: Handle line breaks in intro and body

If the original uses `<br />` for line breaks, you may need to split by `\n` and render with `<br />` or use `whiteSpace: 'pre-line'` to preserve newlines. Match the original rendering.

---

## OUTPUTS (Verification Checklist)

- [ ] HadaraSection reads hadara data from `useContentContext()`
- [ ] All 8 fields (titleIconUrl, ornamentUrl, introText, heading, body, mainImageUrl, smallImageUrl, patternImageUrl) come from Firestore with local fallbacks
- [ ] No visual change when data matches hardcoded content
- [ ] No layout shifts or broken styles
- [ ] Line breaks in intro and body render correctly (match original)
- [ ] FloatingImagePair receives correct image URLs (or imported fallbacks)
