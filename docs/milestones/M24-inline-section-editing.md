# Milestone 24 — Inline Section Editing via Preview

**Title:** Milestone 24 — Inline Section Editing via Preview

**Context:** Building on M23, the user should be able to click a section in the website preview and be taken to that section's editor. This creates a visual editing flow: click in preview → open editor for that section.

**Reference:** Read `docs/AGENT_RULES.md`, `docs/FIRESTORE_SCHEMA.md`, `docs/APP_MAP.md`, and `dashboard/milestones/00-shared-requirements-and-rules.md`.

---

## INPUTS

- M23 completed (preview panel exists in SectionDetail).
- Landing page at repo root. React 19, Vite 7, Tailwind 4, framer-motion.
- Dashboard at `/dashboard/` subfolder. TypeScript, React 18, Vite 5, Tailwind 3.
- Section IDs: hero, hadara, experience, identity, destinations, heritage, vision, massage, room, footer.
- Website sections have `id` attributes (from M23).

---

## INSTRUCTIONS

### Step 1: Create EditableSection wrapper in the landing page

Create `src/components/common/EditableSection.jsx`.

**Critical:** The edit overlay is ONLY active when the site is loaded inside an iframe (in the dashboard).

**Detection:**
```jsx
const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
```

**Component:** `EditableSection` — wraps each section and shows an "Edit" button overlay when `isInIframe` is true.

```jsx
export function EditableSection({ sectionId, children }) {
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  return (
    <div id={sectionId} className="relative group">
      {children}
      {isInIframe && (
      <button
        type="button"
        onClick={() => {
          window.parent.postMessage({ type: 'EDIT_SECTION', sectionId }, '*');
        }}
        className="absolute top-4 left-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 text-[#722f37] rounded-full p-2 shadow-lg backdrop-blur-sm hover:bg-white cursor-pointer"
        title={`Edit ${sectionId}`}
        aria-label={`Edit section ${sectionId}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      )}
    </div>
  );
}
```

**Styling notes:**
- Use maroon color (`#722f37` or `text-maroon` if available in the landing page Tailwind config)
- `z-50` to ensure the button is above section content
- `opacity-0 group-hover:opacity-100` so the button appears only on hover
- `cursor-pointer` on the button

### Step 2: Wrap sections in Home.jsx

Open `src/pages/Home.jsx`.

1. Import `EditableSection`:
   ```jsx
   import { EditableSection } from '../components/common/EditableSection';
   ```

2. Wrap each section:
   ```jsx
   <EditableSection sectionId="hero">
     <HeroSection />
   </EditableSection>
   <EditableSection sectionId="hadara">
     <HadaraSection />
   </EditableSection>
   <EditableSection sectionId="experience">
     <ExperienceSection />
   </EditableSection>
   <EditableSection sectionId="identity">
     <IdentitySection />
   </EditableSection>
   <EditableSection sectionId="destinations">
     <DestinationsSection />
   </EditableSection>
   <EditableSection sectionId="heritage">
     <HeritageSection />
   </EditableSection>
   <EditableSection sectionId="vision">
     <VisionSection />
   </EditableSection>
   <EditableSection sectionId="massage">
     <MassageSection />
   </EditableSection>
   <EditableSection sectionId="room">
     <RoomSection />
   </EditableSection>
   <EditableSection sectionId="footer">
     <FooterSection />
   </EditableSection>
   ```

3. The `EditableSection` wrapper adds `id={sectionId}` to its root div, so `#sectionId` scrolling works. If section components already have `id` from M23, remove those to avoid duplicate IDs (the wrapper provides it).

### Step 3: Handle postMessage in the dashboard

The dashboard (parent window) must listen for `postMessage` and navigate to the section editor.

**Where to add the listener:** In a parent component that is always mounted when the preview is visible — e.g. `dashboard/src/components/Layout.tsx` or `dashboard/src/App.tsx`. It must work from any page, but the main use case is when the user is on SectionDetail and clicks "Edit" in the preview. In that case, we want to navigate to `/sections/{sectionId}`. If the user is already on that section's editor, no navigation is needed. If they're on a different section or the sections list, navigate to the clicked section.

Add in `Layout.tsx` (or the component that wraps all dashboard routes):

```tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Inside the layout component:
const navigate = useNavigate();

useEffect(() => {
  const handler = (event: MessageEvent) => {
    if (event.data?.type === 'EDIT_SECTION' && typeof event.data.sectionId === 'string') {
      navigate(`/sections/${event.data.sectionId}`);
    }
  };
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}, [navigate]);
```

**Security note:** Validate `event.data.sectionId` against `SECTION_IDS` to prevent open redirects or invalid routes:

```tsx
import { SECTION_IDS } from '@/types/content';

const validIds = new Set(SECTION_IDS);
if (validIds.has(event.data.sectionId)) {
  navigate(`/sections/${event.data.sectionId}`);
}
```

### Step 4: Visual feedback in the preview

- When hovering a section in the iframe, the edit overlay button appears.
- The cursor over the button should be `cursor-pointer`.
- The overlay must NOT interfere with normal website behavior when NOT in an iframe: `isInIframe` must be false for regular visitors, so they never see the overlay.

### Step 5: Guard all overlay logic

**IMPORTANT:** Every overlay-related render and handler must be guarded by `window.self !== window.top`. When the website is viewed directly (not in an iframe), `isInIframe` is false and:
- No overlay is rendered
- No postMessage is sent
- No visual changes for normal visitors

---

## OUTPUTS

- [ ] `EditableSection` wrapper component exists in the landing page (`src/components/common/EditableSection.jsx` or similar)
- [ ] Edit button appears on hover when the website is loaded in an iframe
- [ ] Clicking the edit button sends `postMessage({ type: 'EDIT_SECTION', sectionId }, '*')`
- [ ] Dashboard receives the message and navigates to `/sections/{sectionId}`
- [ ] Section ID is validated against `SECTION_IDS` before navigation
- [ ] Overlay is invisible when the website is NOT in an iframe (normal visitors see nothing)
- [ ] No z-index conflicts with website content
- [ ] No visual or functional changes to the website for normal visitors
- [ ] All 10 sections wrapped with `EditableSection`

---

## Handoff

After M24: Users can click any section in the dashboard preview to jump to that section's editor. The flow is: view preview → hover section → click Edit → editor opens for that section.
