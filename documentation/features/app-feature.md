# Easy Quran Class — Install as App (PWA) Feature

**Feature name:** Install as Mobile Application  
**Product:** Easy Quran Class website (`easyquranclass.com`)  
**Type:** Progressive Web App (PWA) install + open-from-browser  
**Surfaces:** Mobile phones and tablets (including iPad). **Not** shown on desktop / large screens.  
**Related files:** `documentation/features/app-feature.md` (this doc)

---

## 1. Purpose

Visitors on phones and tablets can:

1. **Install** the website as an app on the home screen / app drawer (Chrome Android one-tap install; iOS Add to Home Screen steps).  
2. **Open** the installed app again from the browser via a sidebar menu item (**Open in App**), without an automatic “already installed” popup.  
3. See an **Install as App** item in the burger menu when the app is **not** installed.

This improves return visits, makes the site feel like a native app (`display: standalone`), and supports brand icons (logo) on the home screen.

---

## 2. User-facing behaviour

### 2.1 When the app is **not** installed

| Surface | Behaviour |
|---|---|
| Auto popup | After a short delay, shows **Install This As Mobile Application** with platform-specific steps or a one-tap **Install App** button when the browser supports `beforeinstallprompt`. |
| Burger menu | Shows **Install as App** (Urdu: **ایپ انسٹال کریں**). Tapping opens the same install dialog. |
| Desktop / large screen | No popup and no menu item (`max-width` under ~1200px, or any iPhone/iPad). |

### 2.2 When the app **is** installed

| Surface | Behaviour |
|---|---|
| Auto popup | **Not shown.** The old “Open Easy Quran Class” popup is suppressed. |
| Burger menu | Shows **Open in App** (Urdu: **ایپ میں کھولیں**) instead of Install. |
| Inside the installed app | No install/open prompts (`display-mode: standalone` or iOS `navigator.standalone`). |

### 2.3 Platform differences

| Platform | Install | Open from browser |
|---|---|---|
| **Android Chrome / Edge / Samsung Internet** | Native install sheet when `beforeinstallprompt` is available; otherwise menu instructions (⋮ → Install app). | **Open in App** uses an Android `intent://` HTTPS handoff to the installed WebAPK when possible. |
| **iPhone / iPad (Safari or Chrome)** | Steps: Share → **Add to Home Screen** → Add. | Browsers cannot silently launch a home-screen web app. Sidebar **Open in App** shows a short guide to open the icon from the home screen. |
| **Desktop** | Feature hidden. | Feature hidden. |

### 2.4 Uninstall / reinstall

- If the user **uninstalls** the app, Chromium typically fires `beforeinstallprompt` again → install UI returns; the burger shows **Install as App** again.  
- A localStorage flag (`eqc-pwa-installed`) is cleared when the browser offers install again, so a deleted app does not stay stuck on “already installed”.  
- After install, opening the site once **from the home screen** (standalone) also records that the app is installed (important for iOS).

---

## 3. Technical overview

### 3.1 What makes it a PWA

| Piece | Role |
|---|---|
| `src/app/manifest.js` → `/manifest.webmanifest` | Name, `start_url`, `display: standalone`, icons, `related_applications`, `protocol_handlers`, `launch_handler` |
| `public/sw.js` | Service worker with a `fetch` handler (required for Chromium installability). Registered only in **production**. |
| `src/components/pwa/PwaRegister.jsx` | Registers `/sw.js` when `NODE_ENV === 'production'`. |
| Icons under `public/` + App Router icons | `logo.jpg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon.ico`, etc. |
| HTTPS | Required on the live domain for install prompts and service workers. |

### 3.2 Key UI modules

| File | Role |
|---|---|
| `src/components/pwa/InstallAppPrompt.jsx` | Auto install dialog (not for “already installed” open). Listens for manual open from the burger. |
| `src/components/pwa/pwaUtils.js` | Shared helpers: viewport check, install detection, `openInstallPrompt()`, `openInstalledApp()`, storage keys, events. |
| `src/components/pwa/usePwaMenuActions.js` | Hook: `showInstall` / `showOpen` for the burger menu. |
| `src/components/user/navbar/UserNavbar.jsx` | Burger items **Install as App** / **Open in App**. |
| `src/components/Providers.jsx` | Mounts `PwaRegister` + `InstallAppPrompt` outside the language loader so mobile always gets the feature. |

### 3.3 Detection logic (simplified)

1. If viewport is desktop → do nothing.  
2. If already running as installed app (standalone) → mark installed; hide all prompts.  
3. Wait briefly for `beforeinstallprompt` (Chromium).  
4. If BIP fires → **not installed** → may show install popup (unless recently dismissed).  
5. If related apps / localStorage / (Chromium + active SW + no BIP) suggest installed → **mark installed**, **do not** auto-open popup; burger shows **Open in App**.  
6. Otherwise → show install popup / **Install as App** in the menu.

Dismiss windows (localStorage):

- Install dismiss: `eqc-pwa-dismissed-at` (~3 days)  
- Open-guide dismiss (iOS guide only): `eqc-pwa-open-dismissed-at`  
- Installed flag: `eqc-pwa-installed`

Custom events:

- `eqc:open-install-prompt` — burger Install opens the dialog  
- `eqc:open-app-guide` — iOS Open in App shows home-screen guide  
- `eqc:pwa-installed` — refreshes burger menu visibility  

---

## 4. Manifest and icons

### Manifest highlights (`src/app/manifest.js`)

- `name` / `short_name`: Easy Quran Class / EQC  
- `start_url`: `/?source=pwa`  
- `display`: `standalone`  
- `theme_color`: `#B8702F`  
- Icons: `/logo.jpg`, `/icon-192.png`, `/icon-512.png` (any + maskable)  
- `related_applications` with `platform: webapp` pointing at the live manifest URL(s)  
- `protocol_handlers`: `web+eqc` (desktop Chromium; limited on Android)  

### Brand logo

Source asset: **`public/logo.jpg`**. Used for:

- Navbar (mobile, desktop, drawer)  
- Footer brand mark  
- Install dialog header  
- Favicon / apple touch / PWA icons (generated PNG/ICO sizes)  
- SEO organization `logo` in JSON-LD  

---

## 5. Dev vs production

| Concern | Development (`npm run dev`) | Production (`npm run build` + HTTPS host) |
|---|---|---|
| Service worker | **Not** registered | Registered at `/sw.js` |
| Native install prompt | Often unavailable | Available on supported Android browsers when criteria are met |
| Custom install popup / burger | Works for UI testing on mobile width | Full install path |
| LAN testing | `allowedDevOrigins: ['**.*']` in `next.config.mjs` helps phone → PC IP | Use real domain |

Always verify install on a **production HTTPS** URL (Vercel preview or `easyquranclass.com`).

---

## 6. How to test (QA checklist)

1. Open the site on a phone (or Chrome DevTools device mode under 1200px).  
2. **Not installed:** confirm install popup and burger **Install as App**.  
3. Install (Android) or Add to Home Screen (iOS); open the app once from the home screen.  
4. Reopen the **browser** tab to the site: **no** automatic Open popup; burger shows **Open in App**.  
5. Tap **Open in App** (Android should attempt to hand off; iOS shows guide).  
6. Uninstall the app; reopen browser: install UI returns.  
7. Desktop width: confirm no install popup and no burger install/open items (burger itself may only exist on small breakpoints).  

---

## 7. Limitations (honest)

- Browsers **block** silently auto-launching an installed PWA from a normal tab for security; that is why Open lives in the menu, not as a forced redirect.  
- iOS has **no** `beforeinstallprompt`; install is always Share → Add to Home Screen.  
- `getInstalledRelatedApps()` support varies; localStorage + BIP absence + standalone visits fill the gaps.  
- Service worker caching is minimal; it exists mainly for installability, not full offline mode.  

---

## 8. Operator notes

- Changing the logo: replace `public/logo.jpg`, regenerate sized PNG/ICO icons if needed, bump `CACHE_NAME` in `public/sw.js` so clients drop old icons.  
- Changing app name: `SITE_NAME` / manifest `name` and `short_name`.  
- Theme colour: `theme_color` in `manifest.js` and `viewport.themeColor` in `layout.js` (brand `#B8702F`).  

---

## 9. File checklist

| Path | Notes |
|---|---|
| `public/sw.js` | Service worker |
| `public/logo.jpg` | Master logo |
| `public/icon-192.png`, `public/icon-512.png` | PWA icons |
| `public/apple-touch-icon.png`, `public/favicon.ico` | Touch / favicon |
| `src/app/manifest.js` | Web app manifest |
| `src/app/icon.png`, `src/app/apple-icon.png` | Next.js metadata icons |
| `src/components/pwa/*` | Register, prompt, utils, menu hook |
| `src/components/Providers.jsx` | Mounts PWA UI |
| `src/components/user/navbar/UserNavbar.jsx` | Burger actions |
| `next.config.mjs` | `allowedDevOrigins` for LAN mobile testing |

---

*End of Install as App feature documentation.*
