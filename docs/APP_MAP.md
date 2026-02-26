# APP MAP — SDU Boutique (Landing Page + Dashboard)

> **Purpose:** Complete structural map so any AI agent can understand both apps without file traversal.
> **Last updated:** 2026-02-25

---

## 1. Repository layout

```
Sadu-landingPage/                 ← ROOT (landing page)
├── index.html                    ← RTL, lang="ar", loads /src/main.jsx
├── package.json                  ← React 19, Vite 7, Tailwind 4, framer-motion
├── vite.config.js                ← plugins: react, tailwindcss
├── firebase.json                 ← Firebase Hosting config (website)
├── .firebaserc                   ← Firebase project: sduksa
├── docs/                         ← ★ THIS FOLDER — shared docs
│   ├── APP_MAP.md                ← You are here
│   ├── AGENT_RULES.md            ← Rules for AI agents
│   ├── FIRESTORE_SCHEMA.md       ← Unified schema (source of truth)
│   └── milestones/               ← Integration milestone prompts
├── src/
│   ├── main.jsx                  ← Entry: StrictMode, sets lang=ar dir=rtl
│   ├── App.jsx                   ← BrowserRouter → MainLayout
│   ├── index.css                 ← Tailwind import
│   ├── styles/
│   │   ├── fonts.css             ← @font-face "TS Zunburk" variable font
│   │   └── globals.css           ← CSS vars, body font stack
│   ├── constants/
│   │   └── siteConfig.js         ← BOOKING_URL, UNIFIED_PHONE_NUMBER
│   ├── services/
│   │   └── landing.service.js    ← EMPTY (placeholder for Firestore reads)
│   ├── layouts/
│   │   └── MainLayout.jsx        ← NavBar + Routes (/ → Home, /contact → ContactPage)
│   ├── pages/
│   │   ├── Home.jsx              ← Renders 10 sections in order
│   │   └── ContactPage.jsx       ← Contact form page
│   ├── components/
│   │   ├── shared/
│   │   │   └── NavBar.jsx        ← Sticky nav, sidebar menu, scroll detection
│   │   ├── sections/             ← One folder per section
│   │   │   ├── HeroSection/HeroSection.jsx
│   │   │   ├── HadaraSection/HadaraSection.jsx
│   │   │   ├── ExperienceSection/ExperienceSection.jsx
│   │   │   ├── IdentitySection/IdentitySection.jsx
│   │   │   ├── DestinationsSection/DestinationsSection.jsx
│   │   │   ├── HeritageSection/HeritageSection.jsx
│   │   │   ├── VisionSection/VisionSection.jsx
│   │   │   ├── MassageSection/MassageSection.jsx
│   │   │   ├── RoomSection/RoomSection.jsx
│   │   │   └── FooterSection/FooterSection.jsx
│   │   └── common/
│   │       ├── PageContainer.jsx       ← max-w-[1320px] wrapper
│   │       ├── TopFrameOrnament.jsx    ← Decorative top frame image
│   │       ├── FloatingImagePair.jsx   ← Main image + small floating overlay
│   │       ├── CardRail.jsx            ← Horizontal scrollable card rail
│   │       └── InlineBookingCTA.jsx    ← Booking button/link
│   └── assets/
│       ├── fonts/TSZunburkVF2VF.ttf
│       ├── images/                     ← hero.png, bg-1..bg-18.png
│       └── icons/                      ← booking.png, booking-1.png, fram.png,
│                                          main-title.png, main-title-2.png,
│                                          main-title-3.png, menu.png, phone.png
└── dashboard/                    ← DASHBOARD APP (separate Vite + TS project)
    ├── package.json              ← React 18, Vite 5, Tailwind 3, firebase 11, TS
    ├── tsconfig.json             ← strict, path alias @/* → src/*
    ├── vite.config.ts            ← path aliases
    ├── tailwind.config.js        ← cream, sand, beige, maroon, emerald
    ├── firebase.json             ← Dashboard Firebase Hosting (site: dashboard)
    ├── firestore.rules           ← read: public, write: auth required
    ├── .firebaserc               ← project: sduksa, site: dashboard
    ├── .env.example              ← VITE_FIREBASE_* template
    ├── scripts/seed-config.ts    ← Seed Firestore with initial data
    ├── docs/
    │   └── FIRESTORE_SCHEMA.md   ← OLD schema (to be replaced by docs/FIRESTORE_SCHEMA.md)
    └── src/
        ├── main.tsx              ← Entry point
        ├── App.tsx               ← BrowserRouter, AuthProvider, routes
        ├── index.css             ← Tailwind directives
        ├── types/content.ts      ← TypeScript interfaces for Firestore schema
        ├── lib/
        │   ├── firebase.ts       ← initializeApp, getFirestore, getAuth
        │   └── config.ts         ← loadConfig, updateGlobal, updateSection, updateContact
        ├── contexts/
        │   └── AuthContext.tsx    ← signIn/signOut, onAuthStateChanged
        ├── hooks/
        │   └── useConfig.ts      ← Load and cache SiteConfig from Firestore
        ├── components/
        │   ├── Layout.tsx        ← Sidebar nav + Outlet
        │   ├── ProtectedRoute.tsx← Auth guard
        │   └── FormFeedback.tsx  ← Success/error messages
        └── pages/
            ├── Login.tsx         ← Email/password form
            ├── DashboardHome.tsx ← Nav cards (Global, Sections, Contact, Analytics)
            ├── Global.tsx        ← Edit global: logo, phone, nav, bookNow
            ├── Sections.tsx      ← Grid of section links
            ├── SectionDetail.tsx ← Dynamic editor per section type
            ├── Contact.tsx       ← Contact page content editor
            └── Analytics.tsx     ← Link to Firebase Console
```

---

## 2. Landing page sections — render order & content

The Home page renders these sections in this EXACT order:

| # | Component | Section ID | Content summary |
|---|-----------|-----------|-----------------|
| 1 | HeroSection | `hero` | 3-image slider (auto 4s), title (2 lines), 3 stats (value+label), "فنادقنا" card |
| 2 | HadaraSection | `hadara` | Ornament, title icon, intro paragraph, 2-col grid: FloatingImagePair + heading+body with pattern bg |
| 3 | ExperienceSection | `experience` | Parallax bg image, heading+description overlay, CardRail with 4 cards (title+img+desc) |
| 4 | IdentitySection | `identity` | Layered bg + pattern, main image, heading+body text |
| 5 | DestinationsSection | `destinations` | Heading, 3 destination cards (name+img+desc), mobile swipe / desktop expandable |
| 6 | HeritageSection | `heritage` | Ornament, heading+body, 3 images grid (2 on mobile, 3 on desktop) |
| 7 | VisionSection | `vision` | Pattern bg, FloatingImagePair (big+small), heading+body |
| 8 | MassageSection | `massage` | FloatingImagePair (big+small), heading+body |
| 9 | RoomSection | `room` | Ornament, parallax bg image, heading+description overlay, CardRail with 4 cards |
| 10 | FooterSection | `contact` / `start-story` | Parallax bg image, floating card (heading+body+bookNow CTA), copyright bar |

Other pages:
- **ContactPage** (`/contact`): Hero title, 2-col grid: side image + form (name, phone, email, message)
- **NavBar**: Sticky, scroll-aware, mobile sidebar, logo, phone, bookNow, section links

---

## 3. Section-to-schema field mapping

Each section's hardcoded content maps to these Firestore fields (see `docs/FIRESTORE_SCHEMA.md` for types):

### hero
| UI element | Firestore field |
|-----------|----------------|
| Slider images (3) | `slides[].imageUrl` |
| Title "اختبر الرفاهية كما يجب أن تكون" | `title` |
| Stats (24/7, 233+, 5) | `stats[].value`, `stats[].label` |
| "فنادقنا" text | `hotelCardText` |

### hadara
| UI element | Firestore field |
|-----------|----------------|
| Title icon (main-title-2.png) | `titleIconUrl` |
| Ornament (fram.png) | `ornamentUrl` |
| Intro paragraph (top center) | `introText` |
| Heading "هوية نعتز بها" | `heading` |
| Body text | `body` |
| Main image (bg-1.png) | `mainImageUrl` |
| Small floating image (bg-2.png) | `smallImageUrl` |
| Pattern background (bg-3.png) | `patternImageUrl` |

### experience
| UI element | Firestore field |
|-----------|----------------|
| Background image (bg-4.png) | `backgroundImageUrl` |
| Heading "على الرحب والقلب أوسع من الدار" | `heading` |
| Description paragraph | `description` |
| Card rail (4 cards) | `cards[].title`, `cards[].imageUrl`, `cards[].description` |

### identity
| UI element | Firestore field |
|-----------|----------------|
| Main image (bg-9.png) | `mainImageUrl` |
| Pattern background (bg-3.png) | `patternImageUrl` |
| Heading "هويتنا أصل ضيافتنا" | `heading` |
| Body text (2 paragraphs) | `body` |

### destinations
| UI element | Firestore field |
|-----------|----------------|
| Heading "اختر وجهتك" | `heading` |
| Destination cards (3) | `cards[].name`, `cards[].imageUrl`, `cards[].description` |

### heritage
| UI element | Firestore field |
|-----------|----------------|
| Ornament (fram.png) | `ornamentUrl` |
| Heading "ثقافة تاريخية" | `heading` |
| Body text | `body` |
| Images (3) | `images[].imageUrl` |

### vision
| UI element | Firestore field |
|-----------|----------------|
| Pattern background (bg-3.png) | `patternImageUrl` |
| Main image (bg-16.png) | `mainImageUrl` |
| Small floating image (bg-15.png) | `smallImageUrl` |
| Heading "رؤيتنا" | `heading` |
| Body text | `body` |

### massage
| UI element | Firestore field |
|-----------|----------------|
| Main image (bg-8.png) | `mainImageUrl` |
| Small floating image (bg-6.png) | `smallImageUrl` |
| Heading "رسالتنا" | `heading` |
| Body text | `body` |

### room
| UI element | Firestore field |
|-----------|----------------|
| Ornament (fram.png) | `ornamentUrl` |
| Background image (bg-4.png) | `backgroundImageUrl` |
| Heading "قيمنا تنسج هويتنا في الضيافة" | `heading` |
| Description text | `description` |
| Card rail (4 cards) | `cards[].title`, `cards[].imageUrl`, `cards[].description` |

### footer
| UI element | Firestore field |
|-----------|----------------|
| Background image (bg-11.png) | `backgroundImageUrl` |
| Heading "ابدأ قصتك في سدو" | `heading` |
| Body text | `body` |
| Book now button text | `bookNowText` |

### global (NavBar + shared)
| UI element | Firestore field |
|-----------|----------------|
| Logo (main-title.png) | `logoUrl` |
| Sidebar logo (main-title-3.png) | `sidebarLogoUrl` |
| Phone "920033780" | `phone` |
| Book now text "احجز الآن" | `bookNowText` |
| Book now link | `bookNowLink` |
| Copyright "2026 © جميع الحقوق محفوظة سدو بوتيك" | `copyrightText` |
| Nav items | `nav[].id`, `nav[].label`, `nav[].target`, `nav[].route?` |

### contact (ContactPage)
| UI element | Firestore field |
|-----------|----------------|
| Title "للتواصل مع سدو بوتيك" | `title` |
| Intro paragraph | `intro` |
| Side image (bg-8.png) | `sideImageUrl` |
| Name label "الاسم" | `form.nameLabel` |
| Phone label "رقم الجوال" | `form.phoneLabel` |
| Email label "بريدك الإلكتروني" | `form.emailLabel` |
| Message label "الرسالة" | `form.messageLabel` |
| Submit button "أرسل" | `form.submitText` |
| Placeholders | `form.placeholders.name/phone/email/message` |

---

## 4. Dashboard current state

### Routes
| Path | Component | Purpose |
|------|-----------|---------|
| `/login` | Login | Email/password auth |
| `/` | DashboardHome | Nav cards grid |
| `/global` | Global | Edit global settings |
| `/sections` | Sections | Section list |
| `/sections/:sectionId` | SectionDetail | Per-section editor |
| `/contact` | Contact | Contact page editor |
| `/analytics` | Analytics | Firebase Console link |

### Schema mismatch (dashboard vs website)
The dashboard was built against a DIFFERENT schema than what the website actually renders:

| Dashboard section ID | Website section ID | Status |
|---------------------|-------------------|--------|
| hero | hero | Fields mismatch (schema: title/subtitle/imageUrl, website: slides[]/stats[]/title) |
| hadara | hadara | Fields mismatch (schema: title/slogan/body, website: introText/heading/body + more images) |
| experiences | experience | ID mismatch + missing cards array |
| greenGallery | — | NO WEBSITE EQUIVALENT |
| heritage | heritage | Missing images array (schema has single imageUrl) |
| events | — | NO WEBSITE EQUIVALENT |
| locations | destinations | ID mismatch + fields differ |
| visitUs | vision | ID mismatch |
| ourSands | massage | ID mismatch |
| shurafa | room | ID mismatch + missing cards |
| culturalGallery | — | NO WEBSITE EQUIVALENT |
| futureSadu | footer | ID mismatch |

---

## 5. Color palette (shared)

| Name | Hex | Usage |
|------|-----|-------|
| Maroon | `#7A1E2C` | Headings, buttons, nav background (scrolled) |
| Beige | `#F3E0CF` | Section backgrounds (hadara, heritage, vision, massage, room) |
| Tan | `#E9DFD2` | Section backgrounds (experience, destinations, footer) |
| Light tan | `#E3D6C6` | IdentitySection left panel |
| Brown text | `#6B5B4D` | Body text |
| Cream white | `#F3E8DA` | Hero text |
| Black | `#000000` | App background |

---

## 6. Fonts

- **TS Zunburk** — Variable font (100-900), loaded from `src/assets/fonts/TSZunburkVF2VF.ttf`
- **IBM Plex Sans Arabic** — Google Fonts (fallback)
- **Tajawal** — Google Fonts (300, 400, 500, 700)
- Font stack: `"TS Zunburk", "IBM Plex Sans Arabic", Tajawal, sans-serif`

---

## 7. Assets inventory

### Images (src/assets/images/)
| File | Used in |
|------|---------|
| hero.png | HeroSection slide 1 |
| bg-1.png | HadaraSection main image |
| bg-2.png | HadaraSection small floating |
| bg-3.png | Pattern bg (Hadara, Identity, Vision) |
| bg-4.png | ExperienceSection + RoomSection parallax bg |
| bg-5.png | ExperienceSection card 1 |
| bg-6.png | ExperienceSection card 2, MassageSection small |
| bg-7.png | ExperienceSection card 3 |
| bg-8.png | ExperienceSection card 4, DestinationsSection card 2, ContactPage, MassageSection main, RoomSection card 4 |
| bg-9.png | IdentitySection main |
| bg-10.png | HeroSection slide 2, DestinationsSection card 3 |
| bg-11.png | HeroSection slide 3, DestinationsSection card 1, FooterSection bg |
| bg-12.png | HeritageSection image 1 |
| bg-13.png | HeritageSection image 2 |
| bg-14.png | HeritageSection image 3 |
| bg-15.png | VisionSection small floating |
| bg-16.png | VisionSection main, RoomSection card 1 |
| bg-17.png | RoomSection card 2 |
| bg-18.png | RoomSection card 3 |

### Icons (src/assets/icons/)
| File | Used in |
|------|---------|
| booking.png | NavBar booking icon |
| booking-1.png | ContactPage, FooterSection, NavBar (contact page) |
| fram.png | Ornament: HadaraSection, HeritageSection, RoomSection |
| main-title.png | NavBar logo (center/mobile) |
| main-title-2.png | HadaraSection title icon |
| main-title-3.png | NavBar sidebar logo |
| menu.png | NavBar menu icon |
| phone.png | NavBar phone icon |

---

## 8. Firebase configuration

- **Project ID:** `sduksa`
- **Firestore path:** `sites/sdu-boutique/config` (single document)
- **Website hosting:** default site
- **Dashboard hosting:** `dashboard` site
- **Auth:** Email/password (dashboard only)
- **Env vars (dashboard):** `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`
