# Milestone 22 — Firebase Storage Image Upload

**Title:** Firebase Storage Image Upload

**Context:** Currently, all image fields in the dashboard are URL-only (paste a link). This milestone adds the ability to upload images to Firebase Storage and automatically set the URL.

**Reference:** Read `docs/AGENT_RULES.md`, `docs/FIRESTORE_SCHEMA.md`, `docs/APP_MAP.md`.

---

## INPUTS

- M21 completed (editor UI polished).
- Dashboard at `/dashboard/` subfolder. TypeScript, React 18, Vite 5, Tailwind 3.
- Firebase package already installed (`firebase` or `firebase/app`, `firebase/firestore`, `firebase/auth`).
- Storage should be available via the same firebase package.

---

## INSTRUCTIONS

### Step 1: Add Storage to Firebase config

Open `dashboard/src/lib/firebase.ts` and add:

```ts
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const storage: FirebaseStorage = getStorage(app);

export { app, db, auth, storage };
```

### Step 2: Create upload helper

Create `dashboard/src/lib/upload.ts`:

```ts
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(
  file: File,
  path: string
): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}
```

The `path` should be like `sites/sdu-boutique/images/{sectionId}/{timestamp}-{filename}`.

### Step 3: Create ImageField component

Create `dashboard/src/components/ImageField.tsx` with:

**Props:**
- `label: string`
- `value: string`
- `onChange: (url: string) => void`
- `storagePath: string` (e.g., `sites/sdu-boutique/images/hero`)

**Renders:**
- Label text
- Current image preview (if value is set): 120x80 thumbnail, rounded, click to view full
- URL text input (for paste)
- "Upload" button that opens a file picker (`accept="image/*"`)
- Upload progress indicator (0–100%)
- On upload complete: call `onChange(downloadUrl)` to set the URL

**States:**
- `uploading: boolean`
- `progress: number` (0–100)
- `error: string | null`

**Styling:**
- Sand border, cream bg, maroon upload button
- Max file size check: 5MB. Show error if exceeded.
- Accepted types: `image/jpeg`, `image/png`, `image/webp`

### Step 4: ImageField implementation sketch

```tsx
interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  storagePath: string;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

function ImageField({ label, value, onChange, storagePath }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    if (file.size > MAX_SIZE) {
      setError('File size exceeds 5MB');
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      setError('Only JPEG, PNG, WebP allowed');
      return;
    }
    setUploading(true);
    try {
      const path = `${storagePath}/${Date.now()}-${file.name}`;
      const url = await uploadImage(file, path);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      {value && (
        <img src={value} alt="preview" className="h-[120px] w-[160px] rounded object-cover border border-sand" />
      )}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-sand bg-cream px-4 py-2"
        placeholder="Paste URL or upload"
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg bg-maroon text-white px-4 py-2 text-sm disabled:opacity-60"
      >
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
```

### Step 5: Integrate into SectionDetail.tsx

Replace all image URL inputs with the new ImageField component. Example:

```tsx
<ImageField
  label="Background Image"
  value={s.backgroundImageUrl}
  onChange={(url) => set({ backgroundImageUrl: url })}
  storagePath={`sites/sdu-boutique/images/${validId}`}
/>
```

Replace for each section's image fields:

- **hero:** `slides[].imageUrl` (each slide needs its own ImageField)
- **hadara:** `titleIconUrl`, `ornamentUrl`, `mainImageUrl`, `smallImageUrl`, `patternImageUrl`
- **experience:** `backgroundImageUrl`, `cards[].imageUrl`
- **identity:** `mainImageUrl`, `patternImageUrl`
- **destinations:** `cards[].imageUrl`
- **heritage:** `ornamentUrl`, `images[].imageUrl`
- **vision:** `mainImageUrl`, `smallImageUrl`, `patternImageUrl`
- **massage:** `mainImageUrl`, `smallImageUrl`
- **room:** `backgroundImageUrl`, `ornamentUrl`, `cards[].imageUrl`
- **footer:** `backgroundImageUrl`

Use `validId` = `sectionId` from params (sanitized for path safety).

### Step 6: Integrate into Global.tsx

Replace logoUrl and sidebarLogoUrl inputs:

```tsx
<ImageField
  label="Logo URL"
  value={global.logoUrl}
  onChange={(url) => setGlobal({ ...global, logoUrl: url })}
  storagePath="sites/sdu-boutique/images/global"
/>
<ImageField
  label="Sidebar Logo URL"
  value={global.sidebarLogoUrl}
  onChange={(url) => setGlobal({ ...global, sidebarLogoUrl: url })}
  storagePath="sites/sdu-boutique/images/global"
/>
```

### Step 7: Integrate into Contact.tsx

Replace sideImageUrl:

```tsx
<ImageField
  label="Side Image URL"
  value={contact.sideImageUrl}
  onChange={(url) => setContact({ ...contact, sideImageUrl: url })}
  storagePath="sites/sdu-boutique/images/contact"
/>
```

### Step 8: Create Storage rules

Create `dashboard/storage.rules` (or add to project root if Firebase config expects it there):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /sites/{siteId}/images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

If the project uses `firebase.json` for Storage rules, ensure the `storage` block points to this file:

```json
{
  "storage": {
    "rules": "storage.rules"
  }
}
```

Deploy rules with: `firebase deploy --only storage`

### Step 9: Optional — progress indicator

For upload progress, use `uploadBytesResumable` instead of `uploadBytes`:

```ts
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export async function uploadImage(
  file: File,
  path: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(percent);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}
```

### Step 10: Verify no console errors

After integration, run the dashboard and test:
- Paste URL works
- Upload works (file → Firebase Storage → download URL → field value)
- No console errors

---

## OUTPUTS

- [ ] `dashboard/src/lib/upload.ts` exists with `uploadImage` function
- [ ] `dashboard/src/components/ImageField.tsx` exists
- [ ] ImageField shows preview, URL input, and upload button
- [ ] Upload works: file → Firebase Storage → download URL → field value
- [ ] Progress indicator during upload
- [ ] File size validation (5MB max)
- [ ] All image fields in SectionDetail, Global, Contact use ImageField
- [ ] Storage rules created
- [ ] No new console errors

---

## Handoff

After M22: Dashboard editors support both URL paste and direct image upload to Firebase Storage. No more external hosting required for images.
