# Milestone 09 — VisionSection & MassageSection Data-Driven

**Reference:** `docs/milestones/00-shared-requirements-and-rules.md` (if present) and `docs/FIRESTORE_SCHEMA.md`.

**Context:** These two sections have nearly identical layouts: FloatingImagePair (main + small image), heading, body text. VisionSection also has a pattern background. This milestone handles BOTH sections since they are structurally identical.

---

## INPUTS

- **Files to modify:**
  - `src/components/sections/VisionSection/VisionSection.jsx`
  - `src/components/sections/MassageSection/MassageSection.jsx`
- **Content source:** Firestore `sites/sdu-boutique/config` → `home.vision`, `home.massage`
- **Content hook:** `useContentContext` from `../../../contexts/ContentContext`
- **Schema:** `docs/FIRESTORE_SCHEMA.md` (vision, massage sections)

---

## PART A: VisionSection

**Schema fields:** `heading`, `body`, `mainImageUrl`, `smallImageUrl`, `patternImageUrl`

### Instructions for VisionSection

1. **Import useContentContext**

   Add:
   ```jsx
   import { useContentContext } from '../../../contexts/ContentContext';
   ```

2. **Get data**

   Inside `VisionSection`:
   ```jsx
   const { config } = useContentContext();
   const data = config?.home?.vision;
   ```

3. **Replace pattern image**

   Find the pattern background image. Replace:
   ```jsx
   src={patternBg}
   ```
   with:
   ```jsx
   src={data?.patternImageUrl || patternBg}
   ```
   Keep `patternBg` import as fallback.

4. **Replace FloatingImagePair images**

   Replace:
   ```jsx
   bigImageSrc={bigImage}
   smallImageSrc={smallImage}
   ```
   with:
   ```jsx
   bigImageSrc={data?.mainImageUrl || bigImage}
   smallImageSrc={data?.smallImageUrl || smallImage}
   ```
   Keep `bigImage` and `smallImage` imports as fallbacks.

5. **Replace heading**

   Replace the hardcoded heading with:
   ```jsx
   {data?.heading || "رؤيتنا"}
   ```

6. **Replace body**

   Replace the hardcoded body paragraph with:
   ```jsx
   {data?.body || "أن تكون الوجهة الملهمة في قطاع الضيافة، عبر تقديم تجربة إقامة ترتكز على الاعتزاز بإرثنا الأصيل، وتجسد وعدنا الدائم لضيوفنا بأعلى معايير الجودة."}
   ```

---

## PART B: MassageSection

**Schema fields:** `heading`, `body`, `mainImageUrl`, `smallImageUrl`  
(No pattern image — MassageSection does not have one.)

### Instructions for MassageSection

1. **Import useContentContext**

   Add:
   ```jsx
   import { useContentContext } from '../../../contexts/ContentContext';
   ```

2. **Get data**

   Inside `MassageSection`:
   ```jsx
   const { config } = useContentContext();
   const data = config?.home?.massage;
   ```

3. **Replace FloatingImagePair images**

   Replace:
   ```jsx
   bigImageSrc={bigImage}
   smallImageSrc={smallImage}
   ```
   with:
   ```jsx
   bigImageSrc={data?.mainImageUrl || bigImage}
   smallImageSrc={data?.smallImageUrl || smallImage}
   ```
   Keep `bigImage` and `smallImage` imports as fallbacks.

4. **Replace heading**

   Replace the hardcoded heading with:
   ```jsx
   {data?.heading || "رسالتنا"}
   ```

5. **Replace body**

   Replace the hardcoded body paragraph with:
   ```jsx
   {data?.body || "تقديم تجربة ضيافة متكاملة، تنبع من روح السعودية، بأسلوب يجمع بين حفاوة المكان وطمأنينة الإقامة ليجد ضيوفنا في رحابنا ألفة الدار وفخامة الوجهة."}
   ```

---

## Do NOT change (both sections)

- Tailwind classes, framer-motion animations, layout, or responsive behavior.
- FloatingImagePair component (only its `bigImageSrc` and `smallImageSrc` props).
- Any other props passed to FloatingImagePair (e.g. `bigImageClassName`, `smallWrapperClassName`).

---

## OUTPUTS CHECKLIST

### VisionSection

- [ ] `useContentContext` is imported and used.
- [ ] `data = config?.home?.vision` is defined.
- [ ] Pattern image uses `data?.patternImageUrl || patternBg`.
- [ ] FloatingImagePair uses `bigImageSrc={data?.mainImageUrl || bigImage}` and `smallImageSrc={data?.smallImageUrl || smallImage}`.
- [ ] Heading uses `data?.heading` with fallback "رؤيتنا".
- [ ] Body uses `data?.body` with fallback.
- [ ] All local imports (patternBg, bigImage, smallImage) remain as fallbacks.

### MassageSection

- [ ] `useContentContext` is imported and used.
- [ ] `data = config?.home?.massage` is defined.
- [ ] FloatingImagePair uses `bigImageSrc={data?.mainImageUrl || bigImage}` and `smallImageSrc={data?.smallImageUrl || smallImage}`.
- [ ] Heading uses `data?.heading` with fallback "رسالتنا".
- [ ] Body uses `data?.body` with fallback.
- [ ] All local imports (bigImage, smallImage) remain as fallbacks.
