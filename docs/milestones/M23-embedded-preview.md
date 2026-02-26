# Milestone 23 — Embedded Website Preview in Dashboard

**Title:** Milestone 23 — Embedded Website Preview in Dashboard

**Context:** The user wants to see the actual website inside the dashboard, so they can visually identify which section they're editing. This milestone adds an iframe-based preview panel.

**Reference:** Read `docs/AGENT_RULES.md`, `docs/FIRESTORE_SCHEMA.md`, `docs/APP_MAP.md`, and `dashboard/milestones/00-shared-requirements-and-rules.md`.

---

## INPUTS

- M21 completed (editor UI polished).
- M03–M13 completed (website is data-driven from Firestore).
- Both apps deployed: website at `https://sduksa.web.app` (or custom domain), dashboard at its Firebase Hosting site.
- Dashboard at `/dashboard/` subfolder. TypeScript, React 18, Vite 5, Tailwind 3.
- Section IDs from `dashboard/src/types/content.ts`: hero, hadara, experience, identity, destinations, heritage, vision, massage, room, footer.

---

## INSTRUCTIONS

### Step 1: Create PreviewPanel component

Create `dashboard/src/components/PreviewPanel.tsx`:

```tsx
interface PreviewPanelProps {
  siteUrl: string;
  highlightSection?: string;
}
```

- **siteUrl:** Comes from environment: `import.meta.env.VITE_WEBSITE_URL || 'https://sduksa.web.app'`
- **highlightSection:** If provided, append `#${highlightSection}` to the iframe `src` so the page scrolls to that section (sections must have matching `id` attributes on the website)
- **Features:**
  - **Device toggle:** Desktop (100%), Tablet (768px), Mobile (375px) — scale the iframe container width accordingly
  - **Refresh button:** Reload the iframe (e.g. after saving content). Use a `key` prop that increments to force remount
  - **Loading overlay:** Show a spinner or skeleton while the iframe loads. Use `onLoad` on the iframe to hide it
- **Styling:** Border `rounded-xl`, shadow, `overflow-hidden`
- **Size:** Fill available height: `calc(100vh - topbar)` or similar. Use flex/grid so the panel expands

**Implementation sketch:**

```tsx
import { useState, useEffect } from 'react';

type DeviceSize = 'desktop' | 'tablet' | 'mobile';

const DEVICE_WIDTHS: Record<DeviceSize, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

interface PreviewPanelProps {
  siteUrl: string;
  highlightSection?: string;
  refreshKey?: number;
}

export function PreviewPanel({ siteUrl, highlightSection, refreshKey = 0 }: PreviewPanelProps) {
  const [device, setDevice] = useState<DeviceSize>('desktop');
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(refreshKey);

  // Sync with parent's refreshKey (e.g. after save)
  useEffect(() => {
    setIframeKey(refreshKey);
  }, [refreshKey]);

  const url = highlightSection ? `${siteUrl}#${highlightSection}` : siteUrl;

  const handleRefresh = () => {
    setIframeKey((k) => k + 1);
    setLoading(true);
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-sand shadow-lg overflow-hidden bg-cream">
      <div className="flex items-center justify-between p-2 border-b border-sand bg-white">
        <div className="flex gap-1">
          {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`px-3 py-1 rounded text-sm ${device === d ? 'bg-maroon text-white' : 'bg-sand text-stone-600'}`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 rounded hover:bg-sand text-stone-600"
          title="Refresh preview"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>
        </button>
      </div>
      <div
        className="flex-1 overflow-auto p-4 flex justify-center"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        <div
          className="relative bg-white rounded-lg overflow-hidden shadow-inner"
          style={{ width: DEVICE_WIDTHS[device], maxWidth: '100%' }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream z-10">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-maroon border-t-transparent" />
            </div>
          )}
          <iframe
            key={iframeKey}
            src={url}
            title="Website preview"
            className="w-full border-0"
            style={{ height: 'calc(100vh - 220px)', minHeight: 500 }}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
```

Ensure the website sections have `id` attributes matching section IDs (e.g. `<section id="hero">`). If not, add them in the landing page section components.

### Step 2: Add preview to SectionDetail page

Open `dashboard/src/pages/SectionDetail.tsx`.

1. Add state for preview refresh:
   ```tsx
   const [previewKey, setPreviewKey] = useState(0);
   ```

2. After successful save (inside `handleSubmit`, after `setSuccess`):
   ```tsx
   setPreviewKey((k) => k + 1);
   ```

3. Add a split layout:
   - **LEFT (55%):** The existing form editor
   - **RIGHT (45%):** `PreviewPanel` with `siteUrl={import.meta.env.VITE_WEBSITE_URL || 'https://sduksa.web.app'}` and `highlightSection={validId}` and `refreshKey={previewKey}`

4. Layout structure:
   ```tsx
   <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 h-[calc(100vh-120px)]">
     <div className="overflow-y-auto">
       {/* existing form */}
     </div>
     <div className="hidden lg:block min-h-0">
       <PreviewPanel
         siteUrl={import.meta.env.VITE_WEBSITE_URL || 'https://sduksa.web.app'}
         highlightSection={validId ?? undefined}
         refreshKey={previewKey}
       />
     </div>
   </div>
   ```

5. **Mobile:** On screens smaller than `lg`, hide the preview by default. Add a "Preview" toggle button that shows the preview in a modal or full-screen overlay, or as a collapsible panel below the form.

### Step 3: Add .env variable

Add to `dashboard/.env.example`:

```
VITE_WEBSITE_URL=https://sduksa.web.app
```

If `dashboard/.env.example` does not exist, create it with this line. Add a comment: `# URL of the live website (for preview iframe)`.

### Step 4: Handle iframe embedding (CORS / X-Frame-Options)

The website must allow being embedded in an iframe. Firebase Hosting may send `X-Frame-Options: SAMEORIGIN` by default, which blocks embedding from the dashboard (different origin).

Add headers to the **website's** Firebase Hosting config. The website is deployed from the **repo root**. Check `firebase.json` at the project root.

If using a single `firebase.json` at root with multiple hosting sites, add headers to the default (website) site. Example structure:

```json
{
  "hosting": [
    {
      "site": "default",
      "public": "dist",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "headers": [
        {
          "source": "**",
          "headers": [
            {
              "key": "Content-Security-Policy",
              "value": "frame-ancestors *"
            }
          ]
        }
      ]
    }
  ]
}
```

Or, if the site blocks embedding via `X-Frame-Options`, you may need to omit it. `Content-Security-Policy: frame-ancestors *` allows embedding from any origin. Use `frame-ancestors https://your-dashboard-domain.web.app` for a stricter setup.

**Note:** If both apps use `*.web.app` or `*.firebaseapp.com` under the same Firebase project, embedding may work without changes. If you see "Refused to display in a frame" errors, add the headers above.

### Step 5: Ensure website sections have IDs

In the landing page, each section component should have an `id` matching its section ID (e.g. `id="hero"`, `id="hadara"`). Check `src/components/sections/*/` and `src/pages/Home.jsx`. If sections are not wrapped with IDs, add them:

```jsx
<section id="hero">...</section>
<section id="hadara">...</section>
```

Use the exact section IDs from `docs/FIRESTORE_SCHEMA.md`: hero, hadara, experience, identity, destinations, heritage, vision, massage, room, footer.

---

## OUTPUTS

- [ ] `dashboard/src/components/PreviewPanel.tsx` exists with iframe, device toggles (Desktop/Tablet/Mobile), and refresh button
- [ ] `dashboard/src/pages/SectionDetail.tsx` has split layout (editor left, preview right on desktop)
- [ ] Preview scrolls to the section being edited (via `#sectionId` in iframe URL)
- [ ] Refresh after save reloads the preview (via `previewKey` increment)
- [ ] Mobile: preview is togglable or accessible without blocking the form
- [ ] `VITE_WEBSITE_URL` documented in `dashboard/.env.example`
- [ ] Website allows iframe embedding (headers configured if needed)
- [ ] No iframe loading errors or "Refused to display in a frame" in console
- [ ] Website sections have `id` attributes matching section IDs

---

## Handoff

After M23: The dashboard section editor shows a live preview of the website. Users can see changes after saving and can switch between device sizes. The preview scrolls to the section being edited.
