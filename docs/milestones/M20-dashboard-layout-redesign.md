# Milestone 20 — Dashboard Layout, Navigation & Home Page Redesign

**Title:** Dashboard Layout, Navigation & Home Page Redesign

**Context:** The dashboard Layout.tsx has a basic sidebar and the DashboardHome.tsx has simple nav cards. Redesign both for a luxury admin experience.

**Reference:** Read `docs/AGENT_RULES.md`, `docs/FIRESTORE_SCHEMA.md`, `docs/APP_MAP.md`.

---

## INPUTS

- M19 completed (login redesigned).
- Dashboard at `/dashboard/` subfolder. TypeScript, React 18, Vite 5, Tailwind 3.
- Tailwind config colors: cream (#faf8f5), sand (#e8e4df), beige (#d4cfc7), maroon (#722f37), maroon-dark (#5a252c), emerald (#0d6b5c).
- Design should match a luxury brand (warm, clean, spacious).

---

## INSTRUCTIONS

### Step 1: Open Layout.tsx

Open `dashboard/src/components/Layout.tsx`.

### Step 2: Redesign the sidebar

**Desktop layout:**
- Fixed sidebar (280px width on desktop), collapsible on mobile with hamburger
- Sidebar bg: cream (#faf8f5) with subtle border-right in sand
- Top: SDU Boutique brand logo or text "سدو بوتيك" + "لوحة التحكم" subtitle
- Nav items with icons (use emoji or simple SVG icons inline):
  - 🏠 Home (/)
  - 🌐 Global Settings (/global)
  - 📄 Sections (/sections)
  - 📞 Contact Page (/contact)
  - 📊 Analytics (/analytics)
- Active item: maroon bg with white text, rounded-lg
- Hover: sand bg, smooth transition
- Bottom: User email display + Sign Out button (outline style, maroon text)
- Mobile: Overlay sidebar with backdrop blur, slide from right (RTL)

**Sidebar structure example:**

```tsx
<aside className="fixed top-0 right-0 h-full w-[280px] bg-cream border-l border-sand z-40 flex flex-col">
  {/* Brand header */}
  <div className="p-6 border-b border-sand">
    <h1 className="text-xl font-semibold text-maroon">سدو بوتيك</h1>
    <p className="text-sm text-stone-500">لوحة التحكم</p>
  </div>
  {/* Nav items */}
  <nav className="flex-1 p-4 space-y-1">
    {navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-maroon text-white' : 'hover:bg-sand text-stone-700'
          }`
        }
      >
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
  {/* User section */}
  <div className="p-4 border-t border-sand">
    <p className="text-sm text-stone-600 truncate mb-2">{user?.email}</p>
    <button onClick={signOut} className="w-full py-2 rounded-lg border border-maroon text-maroon hover:bg-maroon hover:text-white transition-colors">
      تسجيل الخروج
    </button>
  </div>
</aside>
```

### Step 3: Mobile sidebar behavior

- Add hamburger button: visible only on mobile (md:hidden), fixed top-right
- Sidebar overlay: `fixed inset-0 bg-black/30 backdrop-blur-sm` when open
- Sidebar slides from right: `translate-x-0` when open, `translate-x-full` when closed
- Close on overlay click or nav item click
- Use `useState` for `sidebarOpen` state

### Step 4: Main content area

- Main content: `bg-white` or very light cream (`bg-cream/30`)
- Proper padding: `px-6 py-8` on desktop, `px-4 py-6` on mobile
- Add left margin on desktop: `ml-[280px]` (or `mr-[280px]` for RTL) to account for fixed sidebar
- Breadcrumb trail at the top: show current page name (e.g., "Home", "Sections", "Hero / البطل")
- Use `useLocation()` and `useMatch()` to derive breadcrumb from route

### Step 5: Breadcrumb component

```tsx
function Breadcrumb() {
  const location = useLocation();
  const match = useMatch('/sections/:sectionId');
  const path = location.pathname;
  const crumbs = path === '/' ? ['Home'] : path.split('/').filter(Boolean);
  // Map: global → Global Settings, sections → Sections, etc.
  return (
    <nav className="text-sm text-stone-500 mb-6">
      {crumbs.map((c, i) => (
        <span key={c}>
          {i > 0 && ' / '}
          <span className={i === crumbs.length - 1 ? 'text-stone-800 font-medium' : ''}>
            {c}
          </span>
        </span>
      ))}
    </nav>
  );
}
```

### Step 6: Open DashboardHome.tsx

Open `dashboard/src/pages/DashboardHome.tsx`.

### Step 7: Redesign the home page

- Welcome header: "مرحبًا بك في لوحة التحكم" with user's email
- Stats row (optional, can be static): total sections (10), content type (Arabic RTL), hosting (Firebase)
- Quick action cards in a 2x2 grid:
  - "Global Settings" — icon + description "Logo, phone, navigation, booking link"
  - "Homepage Sections" — icon + description "Edit 10 homepage sections"
  - "Contact Page" — icon + description "Title, form, side image"
  - "Analytics" — icon + description "View site analytics"
- Each card: cream bg, maroon accent border-top (4px), hover shadow, click navigates
- Clean spacing, rounded-xl corners

### Step 8: Quick action card structure

```tsx
<Link
  to="/global"
  className="block p-6 rounded-xl bg-cream border-t-4 border-t-maroon hover:shadow-lg transition-shadow"
>
  <span className="text-2xl font-semibold text-maroon">🌐</span>
  <h3 className="mt-2 text-lg font-medium text-stone-800">Global Settings</h3>
  <p className="mt-1 text-sm text-stone-600">Logo, phone, navigation, booking link</p>
</Link>
```

### Step 9: Ensure no z-index conflicts

- Sidebar: `z-40`
- Overlay: `z-30`
- Main content: `z-10` or default
- Ensure no overlapping UI elements

---

## OUTPUTS

- [ ] Sidebar is fixed on desktop, collapsible on mobile
- [ ] Active nav item highlighted in maroon
- [ ] Sign out button visible
- [ ] DashboardHome has welcome header and 4 quick action cards
- [ ] Responsive layout (mobile-friendly)
- [ ] No z-index conflicts between sidebar and content
- [ ] No overlapping UI elements

---

## Handoff

After M20: Dashboard layout and home page match the luxury aesthetic. Navigation is clear and accessible on all devices.
