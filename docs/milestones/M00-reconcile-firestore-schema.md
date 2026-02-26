# Milestone 00 — Reconcile Firestore Schema

**Title:** Milestone 00 — Reconcile Firestore Schema

**Context:** The dashboard was built against an OLD schema with section IDs (`hero`, `hadara`, `experiences`, `greenGallery`, `heritage`, `events`, `locations`, `visitUs`, `ourSands`, `shurafa`, `culturalGallery`, `futureSadu`) that DON'T match the actual website. The website has sections: `hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`.

This milestone updates the dashboard's TypeScript types file to match the new unified schema.

---

## INPUTS

- [ ] `docs/FIRESTORE_SCHEMA.md` exists with the new schema

**Verify before starting:** Run `ls docs/FIRESTORE_SCHEMA.md` or open the file. If it does not exist, STOP and create it first.

---

## INSTRUCTIONS

### Step 1: Read the schema

1. Open and read `docs/FIRESTORE_SCHEMA.md` completely.
2. Note every interface, field name, and type defined there.
3. Note the section IDs in display order: `hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`.

### Step 2: Rewrite dashboard/src/types/content.ts

1. Open `dashboard/src/types/content.ts`.
2. Delete all existing content.
3. Rewrite the file to match the new schema exactly. The file MUST export:

**Interfaces (from schema):**
- `GlobalContent` — with fields: `logoUrl`, `sidebarLogoUrl`, `phone`, `bookNowText`, `bookNowLink`, `copyrightText`, `nav` (array of `{ id, label, target, route? }`)
- `HeroSection` — `title`, `slides[]` (each `{ imageUrl }`), `stats[]` (each `{ value, label }`), `hotelCardText`
- `HadaraSection` — `titleIconUrl`, `ornamentUrl`, `introText`, `heading`, `body`, `mainImageUrl`, `smallImageUrl`, `patternImageUrl`
- `ExperienceSection` — `heading`, `description`, `backgroundImageUrl`, `cards[]` (each `{ title, imageUrl, description }`)
- `IdentitySection` — `heading`, `body`, `mainImageUrl`, `patternImageUrl`
- `DestinationsSection` — `heading`, `cards[]` (each `{ name, imageUrl, description }`)
- `HeritageSection` — `heading`, `body`, `ornamentUrl`, `images[]` (each `{ imageUrl }`)
- `VisionSection` — `heading`, `body`, `mainImageUrl`, `smallImageUrl`, `patternImageUrl`
- `MassageSection` — `heading`, `body`, `mainImageUrl`, `smallImageUrl`
- `RoomSection` — `heading`, `description`, `backgroundImageUrl`, `ornamentUrl`, `cards[]` (each `{ title, imageUrl, description }`)
- `FooterSection` — `heading`, `body`, `backgroundImageUrl`, `bookNowText`
- `HomeContent` — object with keys: `hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`
- `ContactFormPlaceholders` — `name`, `phone`, `email`, `message`
- `ContactForm` — `nameLabel`, `phoneLabel`, `emailLabel`, `messageLabel`, `submitText`, `placeholders`
- `ContactContent` — `title`, `intro`, `sideImageUrl`, `form`
- `SiteConfig` — `global`, `home`, `contact`

**Helper interfaces (for reuse):**
- `CardItem` — `{ title: string; imageUrl: string; description: string }`
- `DestinationCard` — `{ name: string; imageUrl: string; description: string }`
- `HeroStat` — `{ value: string; label: string }`
- `HeroSlide` — `{ imageUrl: string }`
- `HeritageImage` — `{ imageUrl: string }`
- `NavItem` — `{ id: string; label: string; target: string; route?: string }`

**Constants:**
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

### Step 3: Do NOT change any other dashboard files

- Do NOT modify `dashboard/scripts/seed-config.ts`
- Do NOT modify `dashboard/src/lib/config.ts`
- Do NOT modify any dashboard components or pages
- This milestone ONLY changes `dashboard/src/types/content.ts`

### Step 4: Verify TypeScript compiles

Run from the dashboard directory:
```bash
cd dashboard && npx tsc --noEmit
```
Fix any type errors until compilation succeeds.

---

## OUTPUTS (Verification Checklist)

- [ ] `dashboard/src/types/content.ts` rewritten with all new interfaces
- [ ] `SECTION_IDS` matches the 10 website sections in order: `hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`
- [ ] No TypeScript compilation errors in the types file (`npx tsc --noEmit` passes)
- [ ] Interfaces match `docs/FIRESTORE_SCHEMA.md` exactly (field names, types, structure)
- [ ] No other dashboard files were modified
