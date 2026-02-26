# Milestone 10 — RoomSection Data-Driven

**Where to run:** In the **website** (landing page) project — `src/components/sections/RoomSection/`.

**Goal:** Make RoomSection read all content from Firestore via `useContentContext`, with local imports as fallbacks.

---

## INPUTS

- **Schema:** `docs/FIRESTORE_SCHEMA.md` — section `room`
- **Content hook:** `import { useContentContext } from '../../../contexts/ContentContext';` → `const { config } = useContentContext(); const data = config?.home?.room;`
- **Section path:** `src/components/sections/RoomSection/RoomSection.jsx`
- **Context:** RoomSection has: ornament (fram.png), parallax bg image (bg-4.png), heading + description text overlay, CardRail with 4 cards (title, image, description). Very similar to ExperienceSection.

**Schema fields for `room`:**

- `heading`, `description`, `backgroundImageUrl`, `ornamentUrl`
- `cards[]` with `title`, `imageUrl`, `description`

---

## INSTRUCTIONS

1. **Read** `src/components/sections/RoomSection/RoomSection.jsx` to understand the current structure.

2. **Add the content context import and usage** at the top of the component:
   ```jsx
   import { useContentContext } from '../../../contexts/ContentContext';

   export default function RoomSection() {
     const { config } = useContentContext();
     const data = config?.home?.room;
     const sliderRef = useRef(null);
     // ... rest
   ```

3. **Replace ornament image:**
   ```jsx
   src={data?.ornamentUrl || topFrame}
   ```
   Keep the `topFrame` import from `../../../assets/icons/fram.png` as fallback.

4. **Replace background image:**
   ```jsx
   src={data?.backgroundImageUrl || heroBg}
   ```
   Keep the `heroBg` import from `../../../assets/images/bg-4.png` as fallback.

5. **Replace heading text:**
   ```jsx
   {data?.heading || "قيمنا تنسج هويتنا في الضيافة"}
   ```

6. **Replace description text:**
   ```jsx
   {data?.description || "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nفلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة."}
   ```
   (Use the existing paragraph text as fallback; preserve line breaks with `\n` if needed.)

7. **Replace cards array** — build from `data?.cards` with fallbacks. CardRail expects `{ img, title, desc }`:
   ```jsx
   const cards = (data?.cards || [
     { title: "الأصالة", imageUrl: card1, description: "إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل " },
     { title: "الكرم", imageUrl: card2, description: "حفاوة تفيض بالود والترحاب، وتجسد جود الضيافة" },
     { title: "التفرد", imageUrl: card3, description: "إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل " },
     { title: "الطموح", imageUrl: card4, description: "نبتكر آفاقًا جديدة للضيافة السعودية تجمع بين طموحنا ورؤية 2030." },
   ]).map(c => ({
     img: c.imageUrl || c.img,
     title: c.title,
     desc: c.description || c.desc,
   }));
   ```
   Keep local imports for `card1`, `card2`, `card3`, `card4` as fallbacks.

8. **Remove** the top-level `const cards = [...]` declaration and use the computed `cards` inside the component.

---

## OUTPUTS CHECKLIST

- [ ] `RoomSection.jsx` imports `useContentContext` from `../../../contexts/ContentContext`
- [ ] Ornament uses `data?.ornamentUrl || topFrame`
- [ ] Background uses `data?.backgroundImageUrl || heroBg`
- [ ] Heading uses `data?.heading || "قيمنا تنسج هويتنا في الضيافة"`
- [ ] Description uses `data?.description` with fallback
- [ ] Cards are built from `data?.cards` with fallbacks; each card has `img`, `title`, `desc` for CardRail
- [ ] Local asset imports remain as fallbacks
- [ ] No hardcoded content that should come from Firestore
- [ ] Lint passes; component renders correctly
