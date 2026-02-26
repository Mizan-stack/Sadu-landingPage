# Milestone 13 — ContactPage Data-Driven

**Where to run:** In the **website** (landing page) project — `src/pages/ContactPage.jsx`.

**Goal:** Make ContactPage read all content from Firestore via `useContentContext`, with local imports as fallbacks.

---

## INPUTS

- **Schema:** `docs/FIRESTORE_SCHEMA.md` — section `contact`
- **Content hook:** `import { useContentContext } from '../contexts/ContentContext';` → `const { config } = useContentContext(); const data = config?.contact;`
- **Page path:** `src/pages/ContactPage.jsx`
- **Context:** ContactPage has: title, intro paragraph, side image, and a form with 4 fields (name, phone, email, message) each with label + placeholder, plus submit button.

**Schema fields (contact):**
- `title`, `intro`, `sideImageUrl`
- `form.nameLabel`, `form.phoneLabel`, `form.emailLabel`, `form.messageLabel`
- `form.submitText`
- `form.placeholders.name`, `form.placeholders.phone`, `form.placeholders.email`, `form.placeholders.message`

---

## INSTRUCTIONS

1. **Read** `src/pages/ContactPage.jsx` to understand the current structure.

2. **Add the content context import and usage** at the top of the component:
   ```jsx
   import { useContentContext } from '../contexts/ContentContext';

   export default function ContactPage() {
     const { config } = useContentContext();
     const data = config?.contact;
     // ... rest
   ```

3. **Replace title:**
   ```jsx
   {data?.title || "للتواصل مع سدو بوتيك"}
   ```

4. **Replace intro paragraph:**
   ```jsx
   {data?.intro || "كل تواصل معنا هو بداية تجربة مصممة بعناية. يسعدنا أن نكون على تواصل معك، شاركنا استفساراتك أو خططك للإقامة، ودع فريق سدو يعتني بكل التفاصيل لنمنحك تجربة راقية ومطمئنة."}
   ```

5. **Replace side image:**
   ```jsx
   src={data?.sideImageUrl || contactImage}
   ```
   Keep the `contactImage` import from `../assets/images/bg-8.png` as fallback.

6. **Replace form labels:**
   - Name: `{data?.form?.nameLabel || "الاسم"}`
   - Phone: `{data?.form?.phoneLabel || "رقم الجوال"}`
   - Email: `{data?.form?.emailLabel || "بريدك الإلكتروني"}`
   - Message: `{data?.form?.messageLabel || "الرسالة"}`

7. **Replace placeholders:**
   - Name: `placeholder={data?.form?.placeholders?.name || "مثال: محمد أمين"}`
   - Phone: `placeholder={data?.form?.placeholders?.phone || "مثال: 1256 123 961"}`
   - Email: `placeholder={data?.form?.placeholders?.email || "username@example.com"}`
   - Message: `placeholder={data?.form?.placeholders?.message || "اكتب ما يأتي في خاطرك"}`

8. **Replace submit button text:**
   ```jsx
   {data?.form?.submitText || "أرسل"}
   ```

---

## OUTPUTS CHECKLIST

- [ ] `ContactPage.jsx` imports `useContentContext` from `../contexts/ContentContext`
- [ ] Title uses `data?.title` with fallback
- [ ] Intro uses `data?.intro` with fallback
- [ ] Side image uses `data?.sideImageUrl || contactImage`
- [ ] Form labels (name, phone, email, message) use `data?.form?.*Label` with fallbacks
- [ ] Form placeholders use `data?.form?.placeholders?.*` with fallbacks
- [ ] Submit button text uses `data?.form?.submitText || "أرسل"`
- [ ] Local imports remain as fallbacks
- [ ] No hardcoded content that should come from Firestore
- [ ] Lint passes; page renders correctly
