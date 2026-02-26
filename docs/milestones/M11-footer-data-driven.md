# Milestone 11 — FooterSection Data-Driven

**Where to run:** In the **website** (landing page) project — `src/components/sections/FooterSection/`.

**Goal:** Make FooterSection read all content from Firestore via `useContentContext`, with local imports and constants as fallbacks.

---

## INPUTS

- **Schema:** `docs/FIRESTORE_SCHEMA.md` — section `footer` and `global`
- **Content hook:** `import { useContentContext } from '../../../contexts/ContentContext';` → `const { config } = useContentContext();`
- **Section path:** `src/components/sections/FooterSection/FooterSection.jsx`
- **Context:** FooterSection has: parallax bg image (bg-11.png), floating card with heading (2 lines), body text, booking CTA button, and bottom bar with copyright + phone number.

**Schema fields:**
- **footer:** `heading`, `body`, `backgroundImageUrl`, `bookNowText`
- **global:** `bookNowLink`, `copyrightText`, `phone`

---

## INSTRUCTIONS

1. **Read** `src/components/sections/FooterSection/FooterSection.jsx` to understand the current structure.

2. **Add the content context import and usage** at the top of the component:
   ```jsx
   import { useContentContext } from '../../../contexts/ContentContext';

   export default function FooterSection() {
     const { config } = useContentContext();
     const data = config?.home?.footer;
     const global = config?.global;
     // ... rest
   ```

3. **Replace background image:**
   ```jsx
   src={data?.backgroundImageUrl || footerBg}
   ```
   Keep the `footerBg` import from `../../../assets/images/bg-11.png` as fallback.

4. **Replace heading** (currently 2 lines with `<br/>`):
   ```jsx
   const headingLines = (data?.heading || "ابدأ قصتك في\nسدو").split('\n');
   ```
   Render each line. If there are 2 lines, render:
   ```jsx
   <h2 className="mb-6 text-[44px] font-medium leading-[1.3] text-[#7A1E2C]">
     {headingLines[0]}
     {headingLines.length > 1 && (
       <>
         <br />
         {headingLines[1]}
       </>
     )}
   </h2>
   ```
   Or use `headingLines.map((line, i) => <Fragment key={i}>{line}{i < headingLines.length - 1 && <br />}</Fragment>)` as needed.

5. **Replace body text:**
   ```jsx
   {data?.body || "هنا لا تقيم، بل تعيش تجربة مصممة لتشبهك. كل تفصيل، كل ضوء، وكل مساحة خُلقت لتمنحك شعورًا بالانتماء لا يمكن تكراره."}
   ```

6. **Replace booking CTA label:**
   ```jsx
   label={data?.bookNowText || "احجز الآن"}
   ```

7. **Replace booking URL:**
   ```jsx
   href={global?.bookNowLink || BOOKING_URL}
   ```
   Keep the `BOOKING_URL` import from `../../../constants/siteConfig` as fallback.

8. **Replace copyright text:**
   ```jsx
   {global?.copyrightText || "2026 © جميع الحقوق محفوظة سدو بوتيك"}
   ```

9. **Replace phone number:**
   ```jsx
   {global?.phone || UNIFIED_PHONE_NUMBER}
   ```
   Keep the `UNIFIED_PHONE_NUMBER` import from `../../../constants/siteConfig` as fallback.

---

## OUTPUTS CHECKLIST

- [ ] `FooterSection.jsx` imports `useContentContext` from `../../../contexts/ContentContext`
- [ ] Background uses `data?.backgroundImageUrl || footerBg`
- [ ] Heading uses `data?.heading` split by `\n`; fallback `"ابدأ قصتك في\nسدو"`
- [ ] Body uses `data?.body` with fallback
- [ ] Booking CTA label uses `data?.bookNowText || "احجز الآن"`
- [ ] Booking URL uses `global?.bookNowLink || BOOKING_URL`
- [ ] Copyright uses `global?.copyrightText` with fallback
- [ ] Phone uses `global?.phone || UNIFIED_PHONE_NUMBER`
- [ ] Local imports and constants remain as fallbacks
- [ ] No hardcoded content that should come from Firestore
- [ ] Lint passes; component renders correctly
