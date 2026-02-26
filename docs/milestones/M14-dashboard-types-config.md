# Milestone 14 — Update Dashboard TypeScript Types and Config Service

**Where to run:** In the **dashboard** project — `dashboard/src/`.

**Goal:** Align dashboard types and config service with the unified schema in `docs/FIRESTORE_SCHEMA.md`. Remove all references to old section IDs.

---

## INPUTS

- **Schema:** `docs/FIRESTORE_SCHEMA.md` (source of truth)
- **Types file:** `dashboard/src/types/content.ts`
- **Config service:** `dashboard/src/lib/config.ts`
- **Hooks:** `dashboard/src/hooks/useConfig.ts`

**Old section IDs to remove:** `experiences`, `greenGallery`, `events`, `locations`, `visitUs`, `ourSands`, `shurafa`, `culturalGallery`, `futureSadu`

**New section IDs:** `hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`

---

## INSTRUCTIONS

1. **Read** `docs/FIRESTORE_SCHEMA.md` for the complete new schema. Use it as the source of truth.

2. **Update** `dashboard/src/types/content.ts`:
   - Replace all interfaces to match the schema exactly.
   - `GlobalContent` must include: `logoUrl`, `sidebarLogoUrl`, `phone`, `bookNowText`, `bookNowLink`, `copyrightText`, `nav` with `{ id, label, target, route? }`.
   - `HomeContent` must have keys: `hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`.
   - Each section interface must match the schema (e.g. `HeroSection` with `title`, `slides`, `stats`, `hotelCardText`; `RoomSection` with `heading`, `description`, `backgroundImageUrl`, `ornamentUrl`, `cards`; etc.).
   - `ContactContent` must use `form.phoneLabel` (not `mobileLabel`) and `form.placeholders.phone` (not `mobile`) per schema.
   - Update `SECTION_IDS` and `SECTION_LABELS` to use the new section IDs.
   - Remove all old interfaces: `ExperiencesSection`, `GreenGallerySection`, `EventsSection`, `LocationsSection`, `VisitUsSection`, `OurSandsSection`, `ShurafaSection`, `CulturalGallerySection`, `FutureSaduSection`.

3. **Update** `dashboard/src/lib/config.ts`:
   - The functions `getConfigRef`, `loadConfig`, `updateGlobal`, `updateContact` stay the same.
   - `updateSection` uses `keyof HomeContent` — it will automatically use the new types once `HomeContent` is updated. No signature change needed.
   - Ensure imports from `@/types/content` resolve correctly.

4. **Check** `dashboard/src/hooks/useConfig.ts` — it uses `SiteConfig` type. No changes needed if types are correct.

5. **Search and replace** old section IDs across the entire `dashboard/src/` directory:
   - Search for: `experiences`, `greenGallery`, `events`, `locations`, `visitUs`, `ourSands`, `shurafa`, `culturalGallery`, `futureSadu`
   - Replace or remove them. Update any UI that lists sections (e.g. sidebar, section editor) to use the new `SECTION_IDS` and `SECTION_LABELS`.
   - Update any component that references a section by ID.

6. **Verify** all imports resolve. Run TypeScript compile:
   ```bash
   cd dashboard && npm run build
   ```
   Or: `npx tsc --noEmit`

---

## OUTPUTS CHECKLIST

- [ ] `dashboard/src/types/content.ts` matches `docs/FIRESTORE_SCHEMA.md` exactly
- [ ] `GlobalContent` has `logoUrl`, `sidebarLogoUrl`, `phone`, `bookNowText`, `bookNowLink`, `copyrightText`, `nav`
- [ ] `HomeContent` has keys: `hero`, `hadara`, `experience`, `identity`, `destinations`, `heritage`, `vision`, `massage`, `room`, `footer`
- [ ] `SECTION_IDS` and `SECTION_LABELS` use new section IDs
- [ ] `dashboard/src/lib/config.ts` works with new types (no changes needed if types are correct)
- [ ] No references to old section IDs anywhere in `dashboard/src/`
- [ ] TypeScript compiles without errors (`npm run build` or `tsc --noEmit`)
- [ ] Lint passes
