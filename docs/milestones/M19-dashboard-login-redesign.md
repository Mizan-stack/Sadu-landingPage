# Milestone 19 — Dashboard Login Page Redesign

**Title:** Dashboard Login Page Redesign

**Context:** The current login page at `dashboard/src/pages/Login.tsx` is basic/minimal. Redesign it to match the luxury brand aesthetic with warm colors, elegant typography, and the SDU Boutique identity.

**Reference:** Read `dashboard/milestones/00-shared-requirements-and-rules.md`.

---

## INPUTS

- M18 completed (all editors updated).
- Current `Login.tsx`: simple centered card with email/password form, uses `signIn` from AuthContext.
- Tailwind colors (from project): cream (#faf8f5), sand (#e8e4df), beige (#d4cfc7), maroon (#722f37), maroon-dark (#5a252c), emerald (#0d6b5c).

---

## INSTRUCTIONS

### Step 1: Open Login.tsx

Open `dashboard/src/pages/Login.tsx`.

### Step 2: Add password visibility state

Add state for toggling password visibility:

```tsx
const [showPassword, setShowPassword] = useState(false);
```

### Step 3: Redesign layout — full-screen split

**Desktop layout:**
- LEFT side (60%): Branded area with maroon gradient, optional pattern overlay, brand name/logo, tagline
- RIGHT side (40%): Clean cream/white form card with the login form

**Mobile layout:**
- Stacked: form card full-width over the branded background

### Step 4: Implement the split layout structure

```tsx
return (
  <div className="min-h-screen flex flex-col md:flex-row" dir="rtl">
    {/* LEFT: Brand area - 60% on desktop */}
    <div className="hidden md:flex md:w-[60%] bg-gradient-to-br from-maroon to-maroon-dark relative overflow-hidden">
      {/* Optional: pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('...')] bg-repeat" aria-hidden="true" />
      <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
        <h2 className="text-3xl font-serif font-semibold">سدو بوتيك</h2>
        <p className="mt-2 text-cream/90 text-lg">SDU Boutique</p>
        <p className="mt-4 text-sm text-cream/80">اختبر الرفاهية كما يجب أن تكون</p>
      </div>
    </div>

    {/* RIGHT: Form area - 40% on desktop, full on mobile */}
    <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-cream min-h-screen md:min-h-0">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl border border-sand p-8">
        {/* Form content */}
      </div>
    </div>
  </div>
);
```

### Step 5: Form card content

Inside the form card div:

- Heading: "لوحة التحكم" (Dashboard)
- Subheading: "تسجيل الدخول" (Sign in)
- Email input with label and icon (optional SVG or emoji)
- Password input with label and eye-toggle icon
- Error message display (red, with icon)
- Submit button: maroon bg, white text, hover effect
- Loading state on button (disabled, "جاري تسجيل الدخول…" or "Signing in…")

### Step 6: Email input with label

```tsx
<div>
  <label htmlFor="login-email" className="block text-sm font-medium text-stone-700 mb-1">
    البريد الإلكتروني / Email
  </label>
  <input
    id="login-email"
    type="email"
    autoComplete="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full rounded-lg border border-sand bg-cream px-4 py-2.5 text-stone-800 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors"
    placeholder="admin@example.com"
    dir="ltr"
  />
</div>
```

### Step 7: Password input with eye toggle

```tsx
<div>
  <label htmlFor="login-password" className="block text-sm font-medium text-stone-700 mb-1">
    كلمة المرور / Password
  </label>
  <div className="relative">
    <input
      id="login-password"
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full rounded-lg border border-sand bg-cream px-4 py-2.5 pr-12 text-stone-800 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors"
      placeholder="••••••••"
      dir="ltr"
    />
    <button
      type="button"
      onClick={() => setShowPassword((p) => !p)}
      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-500 hover:text-stone-700 rounded"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878a4.501 4.501 0 116.045 6.045M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )}
    </button>
  </div>
</div>
```

### Step 8: Error display

```tsx
{error && (
  <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg px-3 py-2 text-sm" role="alert">
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
    {error}
  </div>
)}
```

### Step 9: Submit button

```tsx
<button
  type="submit"
  disabled={submitting}
  className="w-full rounded-lg bg-maroon text-white py-3 font-medium hover:bg-maroon-dark focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
>
  {submitting ? 'جاري تسجيل الدخول…' : 'تسجيل الدخول'}
</button>
```

### Step 10: Add subtle transitions

Use Tailwind `transition-colors`, `transition-all`, `duration-200` on interactive elements. No framer-motion or new dependencies.

### Step 11: Keep auth logic unchanged

Do NOT change:
- `signIn(email, password)` from AuthContext
- Error handling (invalid-credential message)
- `submitting` state
- Redirect on success (`Navigate to={from}`)
- Loading spinner for initial auth check

### Step 12: Mobile brand area

On mobile, show a compact branded header above the form instead of hiding it entirely:

```tsx
<div className="md:hidden py-6 text-center bg-gradient-to-br from-maroon to-maroon-dark text-white">
  <h2 className="text-2xl font-serif font-semibold">سدو بوتيك</h2>
  <p className="text-sm text-cream/90 mt-1">SDU Boutique</p>
</div>
```

---

## OUTPUTS

- [ ] Login page has luxury brand design (maroon gradient, cream form card)
- [ ] Split layout on desktop (60% brand / 40% form), stacked on mobile
- [ ] Email and password fields with proper labels (bilingual)
- [ ] Password visibility toggle (eye icon)
- [ ] Error display with icon
- [ ] Loading state on submit button
- [ ] RTL support (dir="rtl" on form container)
- [ ] Auth logic unchanged (still uses signIn from AuthContext)
- [ ] No new dependencies added
- [ ] Accessible form markup (labels, aria-label on toggle)

---

## Handoff

After M19: Login page matches the SDU Boutique luxury aesthetic. Dashboard migration to new schema and UI polish complete.
