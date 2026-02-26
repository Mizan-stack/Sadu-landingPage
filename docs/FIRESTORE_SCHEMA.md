# Firestore Schema — SDU Boutique (Unified)

> **Source of truth** for both the landing page and the dashboard.
> Path: `sites/sdu-boutique/config` (single document).
> Do NOT change field names or section IDs without updating BOTH apps.

---

## Document path

```
sites/sdu-boutique/config/main
```

(Full document path; Firestore requires an even number of segments. Logical “config” = this document.)

**Site ID:** `sdu-boutique` (fixed).

---

## Top-level structure

```ts
{
  global: GlobalContent,
  home: HomeContent,
  contact: ContactContent
}
```

---

## global

```ts
interface GlobalContent {
  logoUrl: string;                // NavBar center logo
  sidebarLogoUrl: string;         // NavBar mobile sidebar logo
  phone: string;                  // "920033780"
  bookNowText: string;            // "احجز الآن"
  bookNowLink: string;            // "https://booking.zaaer.co/sdu-almadina"
  copyrightText: string;          // "2026 © جميع الحقوق محفوظة سدو بوتيك"
  nav: Array<{
    id: string;                   // section ID to scroll to (e.g. "hero")
    label: string;                // Arabic display label (e.g. "الرئيسية")
    target: string;               // scroll target ID or route
    route?: string;               // optional route path (e.g. "/contact")
  }>;
}
```

---

## home — Section IDs (in display order)

| # | Section ID | Type |
|---|-----------|------|
| 1 | `hero` | HeroSection |
| 2 | `hadara` | HadaraSection |
| 3 | `experience` | ExperienceSection |
| 4 | `identity` | IdentitySection |
| 5 | `destinations` | DestinationsSection |
| 6 | `heritage` | HeritageSection |
| 7 | `vision` | VisionSection |
| 8 | `massage` | MassageSection |
| 9 | `room` | RoomSection |
| 10 | `footer` | FooterSection |

### hero

```ts
interface HeroSection {
  title: string;                  // "اختبر الرفاهية كما\nيجب أن تكون"
  slides: Array<{
    imageUrl: string;             // slide image URL
  }>;
  stats: Array<{
    value: string;                // "24/7", "233+", "5"
    label: string;                // "خدمة ضيوف مخصصة", "غرفة وجناح", "وجهة بوتيكية"
  }>;
  hotelCardText: string;          // "فنادقنا"
}
```

### hadara

```ts
interface HadaraSection {
  titleIconUrl: string;           // main-title-2 icon above intro
  ornamentUrl: string;            // top frame ornament (fram.png)
  introText: string;              // center paragraph below icon
  heading: string;                // "هوية نعتز بها"
  body: string;                   // text block next to images
  mainImageUrl: string;           // large image (bg-1.png)
  smallImageUrl: string;          // small floating image (bg-2.png)
  patternImageUrl: string;        // pattern background (bg-3.png)
}
```

### experience

```ts
interface ExperienceSection {
  heading: string;                // "على الرحب والقلب\nأوسع من الدار"
  description: string;            // paragraph under heading
  backgroundImageUrl: string;     // parallax background (bg-4.png)
  cards: Array<{
    title: string;                // "إقامة متفردة", etc.
    imageUrl: string;             // card image
    description: string;          // card description
  }>;
}
```

### identity

```ts
interface IdentitySection {
  heading: string;                // "هويتنا أصل ضيافتنا"
  body: string;                   // body text (2 paragraphs, use \n\n)
  mainImageUrl: string;           // main image (bg-9.png)
  patternImageUrl: string;        // pattern overlay (bg-3.png)
}
```

### destinations

```ts
interface DestinationsSection {
  heading: string;                // "اختر وجهتك"
  cards: Array<{
    name: string;                 // "سدو بوتيك الخبر", etc.
    imageUrl: string;             // destination image
    description: string;          // short description
  }>;
}
```

### heritage

```ts
interface HeritageSection {
  heading: string;                // "ثقافة تاريخية"
  body: string;                   // body text
  ornamentUrl: string;            // top frame ornament (fram.png)
  images: Array<{
    imageUrl: string;             // gallery image (bg-12, bg-13, bg-14)
  }>;
}
```

### vision

```ts
interface VisionSection {
  heading: string;                // "رؤيتنا"
  body: string;                   // body text
  mainImageUrl: string;           // large image (bg-16.png)
  smallImageUrl: string;          // floating image (bg-15.png)
  patternImageUrl: string;        // pattern background (bg-3.png)
}
```

### massage

```ts
interface MassageSection {
  heading: string;                // "رسالتنا"
  body: string;                   // body text
  mainImageUrl: string;           // large image (bg-8.png)
  smallImageUrl: string;          // floating image (bg-6.png)
}
```

### room

```ts
interface RoomSection {
  heading: string;                // "قيمنا تنسج هويتنا في الضيافة"
  description: string;            // paragraph under heading
  backgroundImageUrl: string;     // parallax background (bg-4.png)
  ornamentUrl: string;            // top frame ornament (fram.png)
  cards: Array<{
    title: string;                // "الأصالة", "الكرم", etc.
    imageUrl: string;             // card image
    description: string;          // card description
  }>;
}
```

### footer

```ts
interface FooterSection {
  heading: string;                // "ابدأ قصتك في\nسدو"
  body: string;                   // paragraph text
  backgroundImageUrl: string;     // parallax background (bg-11.png)
  bookNowText: string;            // "احجز الآن" (CTA label)
}
```

---

## contact

```ts
interface ContactContent {
  title: string;                  // "للتواصل مع سدو بوتيك"
  intro: string;                  // intro paragraph
  sideImageUrl: string;           // side image (bg-8.png)
  form: {
    nameLabel: string;            // "الاسم"
    phoneLabel: string;           // "رقم الجوال"
    emailLabel: string;           // "بريدك الإلكتروني"
    messageLabel: string;         // "الرسالة"
    submitText: string;           // "أرسل"
    placeholders: {
      name: string;               // "مثال: محمد أمين"
      phone: string;              // "مثال: 1256 123 961"
      email: string;              // "username@example.com"
      message: string;            // "اكتب ما يأتي في خاطرك"
    };
  };
}
```

---

## Security rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sites/{siteId}/config {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

- **Read:** public (website reads without auth)
- **Write:** authenticated only (dashboard admins)

---

## Dashboard TypeScript types file

All interfaces above must be mirrored in `dashboard/src/types/content.ts`.

Constants:
```ts
export const CONFIG_PATH = 'sites/sdu-boutique/config';

export const SECTION_IDS = [
  'hero', 'hadara', 'experience', 'identity', 'destinations',
  'heritage', 'vision', 'massage', 'room', 'footer'
] as const;

export const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero / البطل',
  hadara: 'Hadara / حضارة',
  experience: 'Experience / التجربة',
  identity: 'Identity / الهوية',
  destinations: 'Destinations / الوجهات',
  heritage: 'Heritage / التراث',
  vision: 'Vision / الرؤية',
  massage: 'Message / الرسالة',
  room: 'Values / القيم',
  footer: 'Footer / التذييل',
};
```
