# Milestone 12 — NavBar and Global Config Data-Driven

**Where to run:** In the **website** (landing page) project — `src/components/shared/NavBar.jsx`.

**Goal:** Make NavBar read all content from Firestore via `useContentContext`, with local imports and constants as fallbacks. Update BOTH home and contact page render paths.

---

## INPUTS

- **Schema:** `docs/FIRESTORE_SCHEMA.md` — section `global`
- **Content hook:** `import { useContentContext } from '../../contexts/ContentContext';` → `const { config } = useContentContext(); const global = config?.global;`
- **Component path:** `src/components/shared/NavBar.jsx`
- **Context:** NavBar has: logo, sidebar logo, menu button, phone number, booking button, and section navigation items. Also the contact page navbar variant. All content currently from local imports and `siteConfig.js` constants.

**Schema fields (global):** `logoUrl`, `sidebarLogoUrl`, `phone`, `bookNowText`, `bookNowLink`, `nav[]` with `id`, `label`, `target`, `route?`

---

## INSTRUCTIONS

1. **Read** `src/components/shared/NavBar.jsx` to understand the current structure.

2. **Add the content context import:**
   ```jsx
   import { useContentContext } from '../../contexts/ContentContext';
   ```
   (Path is `../../contexts/ContentContext` because NavBar is in `src/components/shared/`.)

3. **Get global data** inside the component:
   ```jsx
   const { config } = useContentContext();
   const global = config?.global;
   ```

4. **Replace sections array** with nav items from global:
   ```jsx
   const navItems = global?.nav || [
     { id: "hero", label: "الرئيسية", target: "hero" },
     { id: "experience", label: "التجربة", target: "experience" },
     { id: "destinations", label: "الوجهات", target: "destinations" },
     { id: "heritage", label: "الثقافة", target: "heritage" },
     { id: "start-story", label: "الحجوزات", target: "start-story" },
     { id: "contact", label: "تواصل معنا", target: "contact", route: "/contact" },
   ];
   ```
   Remove the old `sections` constant.

5. **Replace logo** (all occurrences):
   ```jsx
   src={global?.logoUrl || mainTitleLogo}
   ```

6. **Replace sidebar logo:**
   ```jsx
   src={global?.sidebarLogoUrl || mainTitleSidebar}
   ```

7. **Replace phone number** (all occurrences):
   ```jsx
   {global?.phone || UNIFIED_PHONE_NUMBER}
   ```

8. **Replace booking text** (all occurrences of "احجز الآن"):
   ```jsx
   {global?.bookNowText || "احجز الآن"}
   ```

9. **Replace booking link** (all occurrences):
   ```jsx
   href={global?.bookNowLink || BOOKING_URL}
   ```

10. **Update sidebar nav rendering:** Use `navItems` instead of `sections`. The nav item structure changes from `{ id, label, route? }` to `{ id, label, target, route? }`. Update:
    - **`goToSection`:** Use `item.target` or `item.id` for scrolling (both work; `target` is the scroll target).
    - **`handleSidebarNavigation`:** Check `sec.target === "start-story"` (or `sec.id === "start-story"`) for the booking section. Use `sec.target` for `goToSection(sec.target)`. Use `sec.route` for routing when present.
    ```jsx
    const handleSidebarNavigation = (sec) => {
      const scrollTarget = sec.target ?? sec.id;
      if (scrollTarget === "start-story") {
        setMenuOpen(false);
        if (isHome) {
          goToSection(scrollTarget);
        } else {
          window.sessionStorage.setItem(PENDING_SCROLL_SECTION_KEY, scrollTarget);
          navigate("/");
        }
        return;
      }
      if (sec.route) {
        setMenuOpen(false);
        navigate(sec.route);
        return;
      }
      goToSection(scrollTarget);
    };
    ```
    And in the map: `{navItems.map((sec, i) => ...)}` instead of `{sections.map(...)}`.

11. **CRITICAL: Update BOTH render paths:**
    - **Home navbar:** All logo, phone, booking text/link, sidebar nav items.
    - **Contact page navbar** (the `if (!isHome)` block): Logo, booking link, booking text. The contact navbar has a simpler layout but still needs `global?.logoUrl`, `global?.bookNowLink`, `global?.bookNowText`.

---

## OUTPUTS CHECKLIST

- [ ] `NavBar.jsx` imports `useContentContext` from `../../contexts/ContentContext`
- [ ] `navItems` comes from `global?.nav` with fallback array
- [ ] Logo uses `global?.logoUrl || mainTitleLogo` (all occurrences)
- [ ] Sidebar logo uses `global?.sidebarLogoUrl || mainTitleSidebar`
- [ ] Phone uses `global?.phone || UNIFIED_PHONE_NUMBER`
- [ ] Booking text uses `global?.bookNowText || "احجز الآن"`
- [ ] Booking link uses `global?.bookNowLink || BOOKING_URL`
- [ ] Sidebar uses `navItems`; `handleSidebarNavigation` and `goToSection` use `target`/`route` correctly
- [ ] Contact page navbar (non-home path) also uses global data for logo, booking link, booking text
- [ ] Local imports and constants remain as fallbacks
- [ ] No hardcoded content that should come from Firestore
- [ ] Lint passes; both home and contact navbars render correctly
