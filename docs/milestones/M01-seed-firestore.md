# Milestone 01 — Seed Firestore with Website Content

**Title:** Milestone 01 — Seed Firestore with Website Content

**Context:** The Firestore document at `sites/sdu-boutique/config` needs to be populated with the current hardcoded content from the landing page. This seed data ensures the website works immediately when sections switch to Firestore reads.

---

## INPUTS

- [ ] M00 completed (new types exist in `dashboard/src/types/content.ts`)
- [ ] `docs/FIRESTORE_SCHEMA.md` exists for field names
- [ ] `docs/APP_MAP.md` section 3 (field mapping) exists

**Verify before starting:** Run `ls dashboard/src/types/content.ts docs/FIRESTORE_SCHEMA.md docs/APP_MAP.md`. All must exist.

---

## INSTRUCTIONS

### Step 1: Read the schema and mapping

1. Read `docs/FIRESTORE_SCHEMA.md` completely — note all field names and types.
2. Read `docs/APP_MAP.md` section 3 — note the section-to-schema field mapping.

### Step 2: Rewrite dashboard/scripts/seed-config.ts

1. Open `dashboard/scripts/seed-config.ts`.
2. Rewrite it to use the NEW schema (from M00 / FIRESTORE_SCHEMA.md).
3. The script MUST:
   - Import `firebase-admin` (app and firestore)
   - Initialize with `cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)` if set, else `initializeApp()` for application default credentials
   - Use `setDoc` with `merge: true` on path `sites/sdu-boutique/config` (or equivalent: `db.doc(CONFIG_PATH).set(data, { merge: true })`)
   - Populate ALL fields for: `global`, ALL 10 home sections (`hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`), and `contact`

### Step 3: Image URLs

- Use placeholder paths like `/assets/images/hero.png`, `/assets/images/bg-1.png`, etc.
- OR if images are deployed on Firebase Hosting: `https://[PROJECT].web.app/assets/images/[filename]`
- Map assets per `docs/APP_MAP.md` section 7 (Assets inventory)

### Step 4: Arabic content (exact text from website)

Copy the exact Arabic text from the website components. Use this content:

**hero:**
- `title`: `"اختبر الرفاهية كما\nيجب أن تكون"`
- `stats`: `[{ value: "24/7", label: "خدمة ضيوف مخصصة" }, { value: "233+", label: "غرفة وجناح" }, { value: "5", label: "وجهة بوتيكية" }]`
- `hotelCardText`: `"فنادقنا"`
- `slides`: 3 items with imageUrl for hero.png, bg-10.png, bg-11.png

**hadara:**
- `heading`: `"هوية نعتز بها"`
- `introText`: `"علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nعلامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها."`
- `body`: `"علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nتحت مظلة علامة سدو، تتجسد التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي تلامس خصوصية الضيف وتمنحه شعورًا حقيقيًا بالترحيب والانتماء."`

**experience:**
- `heading`: `"على الرحب والقلب\nأوسع من الدار"`
- `description`: `"علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nفلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة."`
- `cards`: 4 items — `[{ title: "إقامة متفردة", description: "خصوصية تامة تحيط بكم وتصميم يعكس الطابع الأصيل والرفاهية." }, { title: "كرم الضيافة", description: "خدمة تُقدَّم بشغف، تُعنى بالتفاصيل لتمنحكم تجربة لا تُنسى." }, { title: "جودة السكن", description: "مساحات ورفاهية عصرية صُممت لتأخذ بكم إلى أقصى درجات الراحة." }, { title: "رحابة الاستقبال", description: "فريق محترف يستقبلكم بروح الضيافة السعودية الأصيلة." }]`

**identity:**
- `heading`: `"هويتنا أصل ضيافتنا"`
- `body`: `"نستمد من عمق التراث السعودي فنون الضيافة الأصيلة، لتجربة فندقية تعكس هويتنا وتمنح ضيوفنا لحظات إقامة لا تُنسى بتجربة وروح سعودية خالصة.\n\nيجمع نموذجنا الفندقي بين مرونة الابتكار ودقة التنفيذ عبر اعتماد أرقى الممارسات التي تحقق النجاح لشركائنا وتمنح ضيوفنا أعلى معايير جودة الإقامة."`

**destinations:**
- `heading`: `"اختر وجهتك"`
- `cards`: 3 items — `[{ name: "سدو بوتيك الخبر", description: "مساحة مصممة للهدوء وخصوصية الإقامة." }, { name: "سدو بوتيك الرياض", description: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة." }, { name: "سدو بوتيك المدينة", description: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة." }]`

**heritage:**
- `heading`: `"ثقافة تاريخية"`
- `body`: `"علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\n\nتُجسد فلسفة سدو في كمال التفاصيل بدءًا من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي تمنح الضيف شعورًا حقيقيًا بالترحيب والانتماء."`

**vision:**
- `heading`: `"رؤيتنا"`
- `body`: `"أن تكون الوجهة الملهمة في قطاع الضيافة، عبر تقديم تجربة إقامة ترتكز على الاعتزاز بإرثنا الأصيل، وتجسد وعدنا الدائم لضيوفنا بأعلى معايير الجودة."`

**massage:**
- `heading`: `"رسالتنا"`
- `body`: `"تقديم تجربة ضيافة متكاملة، تنبع من روح السعودية، بأسلوب يجمع بين حفاوة المكان وطمأنينة الإقامة ليجد ضيوفنا في رحابنا ألفة الدار وفخامة الوجهة."`

**room:**
- `heading`: `"قيمنا تنسج هويتنا في الضيافة"`
- `description`: `"علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nفلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة."`
- `cards`: 4 items — `[{ title: "الأصالة", description: "إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل " }, { title: "الكرم", description: "حفاوة تفيض بالود والترحاب، وتجسد جود الضيافة" }, { title: "التفرد", description: "إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل " }, { title: "الطموح", description: "نبتكر آفاقًا جديدة للضيافة السعودية تجمع بين طموحنا ورؤية 2030." }]`

**footer:**
- `heading`: `"ابدأ قصتك في\nسدو"`
- `body`: `"هنا لا تقيم، بل تعيش تجربة مصممة لتشبهك. كل تفصيل، كل ضوء، وكل مساحة خُلقت لتمنحك شعورًا بالانتماء لا يمكن تكراره."`
- `bookNowText`: `"احجز الآن"`

**global:**
- `phone`: `"920033780"`
- `bookNowText`: `"احجز الآن"`
- `bookNowLink`: `"https://booking.zaaer.co/sdu-almadina"`
- `copyrightText`: `"2026 © جميع الحقوق محفوظة سدو بوتيك"`
- `nav`: `[{ id: "hero", label: "الرئيسية", target: "#hero" }, { id: "experience", label: "التجربة", target: "#experience" }, { id: "destinations", label: "الوجهات", target: "#destinations" }, { id: "heritage", label: "الثقافة", target: "#heritage" }, { id: "start-story", label: "الحجوزات", target: "#start-story" }, { id: "contact", label: "تواصل معنا", target: "#contact", route: "/contact" }]`
- `logoUrl`, `sidebarLogoUrl`: placeholder paths to main-title.png, main-title-3.png

**contact:**
- `title`: `"للتواصل مع سدو بوتيك"`
- `intro`: `"كل تواصل معنا هو بداية تجربة مصممة بعناية. يسعدنا أن نكون على تواصل معك، شاركنا استفساراتك أو خططك للإقامة، ودع فريق سدو يعتني بكل التفاصيل لنمنحك تجربة راقية ومطمئنة."`
- `form.nameLabel`: `"الاسم"`
- `form.phoneLabel`: `"رقم الجوال"`
- `form.emailLabel`: `"بريدك الإلكتروني"`
- `form.messageLabel`: `"الرسالة"`
- `form.submitText`: `"أرسل"`
- `form.placeholders`: `{ name: "مثال: محمد أمين", phone: "مثال: 1256 123 961", email: "username@example.com", message: "اكتب ما يأتي في خاطرك" }`

### Step 5: Script structure

The seed script should:
- Use `set` with `{ merge: true }` so it can be run multiple times (updates/overwrites fields)
- NOT check `if (snap.exists)` and skip — the user may want to re-seed
- Log success: `console.log('Seeded config at', CONFIG_PATH)`
- Handle errors and exit with code 1 on failure

---

## OUTPUTS (Verification Checklist)

- [ ] `dashboard/scripts/seed-config.ts` updated with all content
- [ ] Script uses the new schema types/field names from M00
- [ ] All Arabic text matches what the website currently displays (compare with `src/components/sections/*` and `src/pages/ContactPage.jsx`)
- [ ] Running `cd dashboard && npx tsx scripts/seed-config.ts` would populate Firestore (requires `GOOGLE_APPLICATION_CREDENTIALS` or gcloud auth)
- [ ] All 10 home sections + global + contact are fully populated
- [ ] Image URLs use placeholder paths or Firebase Hosting URLs
