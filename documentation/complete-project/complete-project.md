# Easy Quran Class — Complete Project Documentation

**Project name:** Easy Quran Class  
**Live domain:** https://easyquranclass.com  
**Repository folder:** `easyquranclass-next-website`  
**Stack:** Next.js 16 (App Router) · React 19 · MUI 7 · Nodemailer  
**Type:** Public website for an online Quran academy  

This document is the full operating and engineering guide for the website: how it is built, how every page works, how emails are sent, how SEO/AI files are generated, how to run it locally, how to push to GitHub, and how to deploy on Vercel with a custom domain.

---

## Table of contents

1. Project overview  
2. What the website does  
3. Features  
4. Tech stack and requirements  
5. Local setup and how to run  
6. Environment variables  
7. Architecture  
8. Folder structure  
9. How to operate the website (non-developer)  
10. How to code in this website (developer)  
11. Pages — routes, purpose, and full working  
12. API routes  
13. Email sending logic  
14. Language system (English / Urdu)  
15. Content and data files  
16. SEO, GEO, robots, sitemap, llms.txt  
17. Forms, accessibility, and agent SEO  
18. GitHub: create repo and push code  
19. Vercel deploy and custom domain DNS  
20. Google Search Console verification  
21. Common tasks and recipes  
22. Troubleshooting  

---

## 1. Project overview

Easy Quran Class is a marketing and learning website for an **online Quran academy**. Visitors can:

- Learn about the academy (mission, vision, teachers, stats)
- Browse **all 114 Surahs** with YouTube recitation playlists and PDF notes
- Watch lecture playlists: Arabic grammar, Tajweed, namaz/salah, and short Islamic videos
- Open Arabic and namaz notes as PDFs
- Calculate Zakat on the homepage
- Switch the UI between **English** and **Urdu**
- Send an enrollment / inquiry message through a contact form that emails the academy owner via Gmail SMTP

The site is **not** a student LMS (no login, no payments, no class booking backend). Enrollment happens by phone, email, or the contact form.

**Brand details used in the product**

| Field | Value |
|---|---|
| Brand | Easy Quran Class |
| Type | Online Quran academy |
| Location | Valencia Town, Block H, Lahore, Pakistan |
| Phone | 0301 8477994 |
| Public email | info@easyquranclass.com |
| YouTube | https://www.youtube.com/@easyquranclass |
| Site URL | https://easyquranclass.com |

---

## 2. What the website does

### For visitors

1. Land on a branded homepage with a banner, intro lecture, lecture cards, “why choose us”, Zakat calculator, social links, FAQs, and a contact form.  
2. Open About to read mission, vision, values, academy copy, and stats.  
3. Open Surah to search/filter 114 Surahs, then open a Surah player with videos, share, YouTube, and PDF.  
4. Open Lectures to pick a playlist, then play videos in an in-page player.  
5. Open Notes to view PDFs in a dialog.  
6. Open Contact to see NAP (name, address, phone), map, form, and enrollment FAQs.  
7. Open FAQ for question-and-answer content used by Google and AI engines.  
8. Toggle English / Urdu. The choice is stored in `localStorage` as `websiteLanguage`.

### For the academy owner

1. Receive branded HTML emails when someone submits the contact form.  
2. Reply from Gmail using **Reply-To** (the visitor’s email).  
3. Update almost all visible copy by editing JSON, without rewriting React components.  
4. Rank in Google and be readable by ChatGPT, Claude, Perplexity, and other AI crawlers.

### What it does *not* do

- No user accounts  
- No database  
- No payment gateway  
- No CMS admin panel  
- No server-rendered Urdu URLs (`/ur/...`) — language is client-side only  
- Inheritance calculator exists in code but is commented out on the homepage  

---

## 3. Features

### Product features

- English / Urdu bilingual UI from one JSON file  
- Responsive layout (mobile, tablet, desktop) with MUI breakpoints  
- Fixed glass-style navbar with lectures dropdown  
- Footer with crawlable quick links, phone, email, address, YouTube  
- YouTube playlist players for lectures and Surahs  
- Share / copy video link dialogs  
- PDF viewer dialog (Google Drive preview URLs)  
- Zakat calculator (2.5% of net assets above nisab)  
- Homepage and page-level FAQs  
- Contact form with client + server validation  
- Branded HTML email to the owner inbox  
- Skip-to-content link for accessibility  

### Technical / SEO features

- Next.js App Router metadata: unique title, description, canonical, Open Graph, Twitter  
- JSON-LD: EducationalOrganization + LocalBusiness, WebSite + SearchAction, FAQPage, Course, BreadcrumbList, AboutPage, VideoObject, LearningResource  
- Dynamic `robots.txt` allowing search and AI crawlers  
- Dynamic `sitemap.xml` (static pages + 4 lecture playlists + 114 Surahs)  
- `llms.txt` content map for AI agents  
- Web app manifest  
- Google site verification meta tag  
- Permanent redirect `/home` → `/`  
- Semantic `<main>`, form labels/`id`s, crawlable `<a href>` navigation  

---

## 4. Tech stack and requirements

### Runtime

| Tool | Version used on this project | Required |
|---|---|---|
| Node.js | 24.x (18+ is acceptable; 20+ recommended) | Yes |
| npm | 11.x | Yes |
| Git | any current | Yes for GitHub |
| Modern browser | Chrome / Edge / Firefox | Yes |

### Application packages (`package.json`)

| Package | Role |
|---|---|
| `next` 16.3.5 | App Router framework, metadata, sitemap, robots, API routes |
| `react` / `react-dom` 19.2.8 | UI |
| `@mui/material` 7.x | Components, Grid, Accordion, Dialog, TextField |
| `@mui/icons-material` | Icons |
| `@mui/material-nextjs` | App Router Emotion cache (`AppRouterCacheProvider`) |
| `@emotion/react`, `@emotion/styled`, `@emotion/cache` | MUI styling |
| `framer-motion` | Motion on navbar, cards, footer |
| `nodemailer` | Gmail SMTP |
| `react-countup` | About page stats counters |
| `react-intersection-observer` | Trigger counters when visible |
| `react-slick` / `slick-carousel` | Carousel CSS imported globally |

There is **no database**, **no Prisma**, **no auth library**.

### External services

| Service | Why |
|---|---|
| Gmail + App Password | SMTP for contact emails |
| Google Drive | PDF preview embeds |
| YouTube | Lecture and Surah videos |
| Google Search Console | Domain verification and indexing |
| Vercel | Hosting |
| Domain registrar (GoDaddy, Namecheap, etc.) | Custom domain DNS |
| GitHub | Source control (recommended) |

### Gmail SMTP requirement

The sending account must have 2-Step Verification enabled. Create an **App Password** (Google Account → Security → App passwords). Do **not** use the normal Gmail password.

---

## 5. Local setup and how to run

### 5.1 Install

```bash
cd easyquranclass-next-website
npm install
```

### 5.2 Create environment file

Copy `.env.example` to `.env.local` and fill values (see section 6).

```bash
copy .env.example .env.local
```

On macOS / Linux:

```bash
cp .env.example .env.local
```

### 5.3 Start development server

```bash
npm run dev
```

Open http://localhost:3000

Next.js 16 uses Turbopack by default. The terminal prints the local and LAN URLs.

### 5.4 Production build (local)

```bash
npm run build
npm start
```

`next build` compiles App Router pages, generates `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and the contact API. `next start` serves the production server.

### 5.5 npm scripts

| Script | Command | Use |
|---|---|---|
| Dev | `npm run dev` | Daily development |
| Build | `npm run build` | Production compile / Vercel uses this |
| Start | `npm start` | Run the production build locally |

There is no test or lint script in `package.json`.

---

## 6. Environment variables

All secrets live in `.env.local` (never commit this file). Vercel needs the same keys in **Project → Settings → Environment Variables**.

### 6.1 Variable reference

| Variable | Public? | Purpose |
|---|---|---|
| `SMTP_HOST` | No | SMTP host. Use `smtp.gmail.com` |
| `SMTP_PORT` | No | `465` with SSL |
| `SMTP_SECURE` | No | `true` for port 465 |
| `SMTP_USER` | No | Gmail address that **sends** mail |
| `SMTP_APP_PASSWORD` | No | Gmail app password (spaces are stripped in code) |
| `CONTACT_RECEIVER_EMAIL` | No | Owner inbox that **receives** inquiries |
| `CONTACT_FROM_NAME` | No | Display name on the From header, e.g. `Easy Quran Class` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site origin, no trailing slash: `https://easyquranclass.com` |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Brand name in titles, emails, schema |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Public contact email on the site |
| `NEXT_PUBLIC_CONTACT_PHONE` | Yes | Public phone |
| `NEXT_PUBLIC_YOUTUBE_URL` | Yes | Channel URL for schema `sameAs` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Yes | Google Search Console token only (not the full `google-site-verification=` prefix) |

`NEXT_PUBLIC_*` values are inlined into the browser bundle. SMTP secrets stay on the server.

### 6.2 Example `.env.local` (placeholders only)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-gmail@gmail.com
SMTP_APP_PASSWORD=xxxx xxxx xxxx xxxx

CONTACT_RECEIVER_EMAIL=owner@example.com
CONTACT_FROM_NAME=Easy Quran Class

NEXT_PUBLIC_SITE_URL=https://easyquranclass.com
NEXT_PUBLIC_SITE_NAME=Easy Quran Class
NEXT_PUBLIC_CONTACT_EMAIL=info@easyquranclass.com
NEXT_PUBLIC_CONTACT_PHONE=03018477994
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@easyquranclass
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-token
```

### 6.3 Email identity model

This is easy to confuse. The code splits three identities:

1. **SMTP_USER** — Gmail account that authenticates and sends. Gmail requires From to match this account.  
2. **CONTACT_RECEIVER_EMAIL** — where the inquiry is delivered (`to:`). Can be a different inbox.  
3. **Visitor email** — set as `replyTo`, so the owner hits Reply and writes to the visitor.

---

## 7. Architecture

```
Browser (visitor)
    │
    ├── GET pages (SSR HTML + client hydration)
    │     layout.js → Providers (LanguageProvider + Navbar + Footer)
    │     page.js → client components that read WebsiteContent.json
    │
    ├── GET /robots.txt, /sitemap.xml, /llms.txt, /manifest.webmanifest
    │     generated by App Router special files
    │
    └── POST /api/contact
          validate JSON
          nodemailer → Gmail SMTP
          email → CONTACT_RECEIVER_EMAIL
          Reply-To → visitor
```

### Rendering model

- **Server Components** (`src/app/**/page.js`, `layout.js`): metadata, JSON-LD, redirects.  
- **Client Components** (`'use client'`): almost all UI (MUI, language, players, forms).  
- First HTML paint is always **English** so crawlers see real content. After mount, Urdu is restored from `localStorage` if saved.  
- Language switch shows a short loader (`Loader.jsx`) for ~300ms.

### Path alias

`jsconfig.json` maps `@/*` to `src/*`. Imports look like:

```js
import { SITE_URL } from '@/lib/seo';
import HomeMain from '@/components/user/home/HomeMain';
```

### Styling

- Global CSS: `src/global.css` + `src/variables.css`  
- Brand color: `--color-primary: #b8702f`  
- Font: Google Font **Quicksand** loaded in `layout.js`  
- MUI `sx` props for component layout  
- Direction is forced **LTR** even for Urdu (navbar and layout stay left-to-right)

### Redirects (`next.config.mjs`)

| From | To | Type |
|---|---|---|
| `/home` | `/` | Permanent (308) |

`src/app/home/page.js` also calls `redirect('/')` as a backup.

---

## 8. Folder structure

```
easyquranclass-next-website/
├── .env.example                 # Template for secrets (commit this)
├── .env.local                   # Real secrets (do not commit)
├── next.config.mjs              # Emotion compiler + /home redirect
├── package.json
├── jsconfig.json                # @/ path alias
├── AGENTS.md / CLAUDE.md        # Next.js 16 agent notes
├── public/
│   ├── favicon.ico
│   └── images/                  # Banner, about, stats images
├── documentation/
│   └── complete-project/
│       ├── complete-project.md  # This guide
│       └── complete-project.docx
└── src/
    ├── app/                     # Next.js App Router
    │   ├── layout.js            # Root HTML, metadata, schema
    │   ├── page.js              # Home /
    │   ├── home/page.js         # Redirects to /
    │   ├── about/page.js
    │   ├── contact/page.js
    │   ├── surah/page.js
    │   ├── surah/[id]/page.js   # Dynamic Surah 1–114
    │   ├── lectures/page.js
    │   ├── lectures/[name]/page.js
    │   ├── notes/page.js
    │   ├── faq/page.js
    │   ├── api/contact/route.js # POST contact email
    │   ├── robots.js
    │   ├── sitemap.js
    │   ├── manifest.js
    │   └── llms.txt/route.js
    ├── components/
    │   ├── Providers.jsx        # Language + navbar + footer shell
    │   ├── common/Loader.jsx
    │   ├── seo/JsonLd.jsx
    │   ├── seo/PageFaq.jsx
    │   └── user/
    │       ├── navbar/UserNavbar.jsx
    │       ├── footer/Footer.jsx
    │       ├── contentFiles/WebsiteContent.json
    │       ├── home/            # Banner, intro, lectures, zakat, FAQ, form
    │       ├── about/
    │       ├── contact/
    │       ├── surah/           # List + player + SurahsInEng/Urdu.json
    │       ├── lectures/        # Cards + player + LecturesData.json
    │       ├── notes/
    │       └── playlist/        # Legacy YouTube JSON dumps (reference)
    ├── contexts/LanguageContext.jsx
    ├── lib/
    │   ├── seo.js
    │   ├── faqs.js
    │   ├── mailer.js
    │   └── contactEmailTemplate.js
    ├── global.css
    └── variables.css
```

### Important data files

| File | Used by | Contents |
|---|---|---|
| `WebsiteContent.json` | LanguageContext | Almost all UI strings (en + ur) |
| `LecturesData.json` | LecturesPlayer, lecture cards | Playlist videos, titles, iframes |
| `SurahsInEng.json` | Surah list/player | 114 Surahs in English |
| `SurahsInUrdu.json` | Surah list/player | 114 Surahs in Urdu |
| `src/lib/faqs.js` | Home, About, Contact, FAQ pages | FAQ copy + schema |
| `src/lib/seo.js` | Metadata, sitemap, schema | Site constants and helpers |

`src/components/user/playlist/*.json` are older YouTube export files. The live players read `LecturesData.json` and `SurahsIn*.json`, not those playlist dumps.

---

## 9. How to operate the website (non-developer)

### Daily visitor flow

1. Open https://easyquranclass.com  
2. Use the top menu: Home, About, Surah, Notes, Contact, Lectures  
3. Switch **english / urdu** in the navbar  
4. On Contact (or homepage form), type name, email, message (minimum 10 characters) and Send  
5. Owner receives an email and can Reply  

### Change visible text without coding React

Edit `src/components/user/contentFiles/WebsiteContent.json`.

The file has two roots: `"en"` and `"ur"`. Keep the **same keys** in both languages.

Typical edits:

- Homepage banner title / description → `en.home.banner`  
- Navbar labels → `en.navbar.navItems`  
- Footer links → `en.footer.quickLinks`  
- About mission cards → `en.about.visionSection`  
- Notes titles and Google Drive `pdfUrl` → `en.notes.notesSection.notes`  
- Zakat field labels and nisab → `en.home.zakatCalculator`  

After save, the Next.js dev server hot-reloads. On Vercel, commit and push to redeploy.

### Change lecture videos

Edit `src/components/user/lectures/LecturesData.json`.

Each lecture object has:

- `name` — URL slug (`grammar-lectures`, `namaz-lectures`, `tajweed-lectures`, `short-lectures`)  
- `playlist_title`, `playlist_link`  
- `videos[]` with `video_title`, `video_link`, `image`, `time`, `iframe`  

Keep English and Urdu lecture **arrays in the same order**. The player finds the English slug, then uses the same index in the Urdu array.

Navbar mapping lives in `WebsiteContent.json`:

```json
"urlMapping": {
  "Foundations of Arabic Grammar": "grammar-lectures",
  "Salah (Namaz) Guidance": "namaz-lectures",
  "Quran Recitation with Tajweed": "tajweed-lectures",
  "Short Islamic Video Lessons": "short-lectures"
}
```

If you add a new playlist, add:

1. An entry in `LecturesData.json` (en and ur)  
2. A slug in `LECTURE_SLUGS` inside `src/lib/seo.js` (sitemap + metadata)  
3. A `urlMapping` entry and navbar dropdown title  
4. A folder route is already dynamic: `/lectures/[name]`

### Change Surah data

Edit `SurahsInEng.json` and `SurahsInUrdu.json`. Each Surah has `id` (1–114), names, `verseCount`, `revelation`, `pdf_link`, playlist fields, and `videos[]`.

Surahs **4, 5, and 6** are hard-coded as “Coming Soon” in `SurahPlayer.jsx` (`isComingSoon = [4, 5, 6]`). Remove those IDs when content is ready.

### Change FAQs / SEO copy

- Visitor-facing FAQ answers: `src/lib/faqs.js`  
- Titles and meta descriptions: each `src/app/<page>/page.js` via `createPageMetadata`  
- Default keywords and Organization schema: `src/lib/seo.js`  
- AI content map: `src/app/llms.txt/route.js`

### Change contact recipient

Set `CONTACT_RECEIVER_EMAIL` in `.env.local` (local) and in Vercel env vars (production). Restart the server / redeploy.

---

## 10. How to code in this website (developer)

### Rules of this codebase

1. **App Router only.** Pages live in `src/app`. Do not add a `pages/` router.  
2. **UI that uses hooks, MUI, or language must be `'use client'`.** Keep `page.js` as a thin server wrapper that exports `metadata` and renders a client component.  
3. **Do not put random values in the first render** (`Date.now()`, `Math.random()`). That causes hydration errors. Star/particle decorations must be deterministic.  
4. **Do not read `localStorage` during the first render.** LanguageContext starts as English, then hydrates.  
5. **Keep `/home` out of navigation.** Home is `/`. `/home` 301s to `/`.  
6. **Internal links must be real `<a href>`** (`next/link` or MUI `Link` + `NextLink`). Do not use `onClick` + `router.push` as the only navigation — crawlers need hrefs.  
7. **Copy belongs in JSON** when it is visitor-facing. Avoid hardcoding English strings in components unless they are SEO-only server metadata.  
8. **Read Next 16 docs in** `node_modules/next/dist/docs/` if an API looks unfamiliar. This version differs from older Next.js.

### Add a new static page

1. Create `src/app/your-page/page.js`.  
2. Export metadata:

```js
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Short unique title',
  description: '140–160 character summary with the primary keyword.',
  path: '/your-page',
  keywords: ['extra keyword'],
});
```

3. Render a client component from `src/components/user/...`.  
4. Add the path to `src/app/sitemap.js` `staticRoutes`.  
5. Add footer (and navbar if needed) entries in `WebsiteContent.json` for **en and ur**.  
6. Add a line to `src/app/llms.txt/route.js`.

Title template is `%s | Easy Quran Class`. Do not put “Easy Quran Class” in the `title` string unless you pass `absoluteTitle: true` (homepage only).

### Add JSON-LD

Use `JsonLd` in the server `page.js`:

```js
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

<JsonLd
  data={{
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Your Page', path: '/your-page' },
      ]),
    ],
  }}
/>
```

### Add an API route

Create `src/app/api/<name>/route.js` and export `GET`/`POST`. Contact is the only API today. `/api/` is disallowed in `robots.txt`.

### Styling

Prefer existing CSS variables:

- `--color-primary` `#b8702f`  
- `--color-primary-hover` `#a25e26`  
- `--color-primary-light` `#e6ae23`  
- `--light-grey-bg` `#faf6f2`  

Do not introduce a second design system.

### Client vs server split (typical page)

```
src/app/about/page.js          // server: metadata + JsonLd
src/components/user/about/About.jsx  // client: sections
```

---

## 11. Pages — routes, purpose, and full working

Navbar items (English): Home `/`, About `/about`, Surah `/surah`, Notes `/notes`, Contact `/contact`, Lectures dropdown.

### 11.1 Home — `/`

**Files:** `src/app/page.js`, `src/components/user/home/HomeMain.jsx`

**Metadata title:** `Easy Quran Class | Best Online Quran Academy`  
**Canonical:** `https://easyquranclass.com`

**Section order**

1. **Banner** — H1 from JSON, background `/images/home-banner.jpg`, CTA to `/contact`  
2. **IntroSection** — chips, H2, intro paragraph, YouTube embed  
3. **LecturesSection** — four lecture cards (grammar, Tajweed, short videos, namaz). “View Playlist” is a real link to `/lectures/<slug>`. PDF button opens Drive preview or a coming-soon dialog  
4. **WhyChooseUs** — four benefit cards  
5. **ZakatCalculator** — assets minus liabilities; if net ≥ nisab (default 5000), zakat = 2.5%  
6. **AskQuestion** — CTA copy pointing people to ask / contact  
7. **SocialPlatforms** — WhatsApp, Facebook, YouTube, Instagram cards from JSON  
8. **PageFaq** — `HOME_FAQS`  
9. **ContactForm** — same component as Contact page, posts to `/api/contact`

**Schema on this page:** breadcrumbs, FAQPage, Course list, VideoObject.

**SearchAction:** Organization/WebSite schema advertises search as `/surah?q={search_term_string}`. `SurahList` reads `?q=` into the search box.

### 11.2 About — `/about`

**Files:** `src/app/about/page.js`, `src/components/user/about/About.jsx`

**Working**

1. **VisionSection** — H1 “About Easy Quran Class”, intro paragraph, mission / vision / values cards  
2. **WhyChooseUs** — same component as home  
3. **QuranAcademy** — “Best Online Quran Academy” copy, Contact CTA, images + play button to a YouTube video  
4. **StatsSection** — counters (students, teachers, countries, years) using `react-countup`  
5. **PageFaq** — `ABOUT_FAQS`

**Schema:** breadcrumbs, AboutPage, FAQPage.

### 11.3 Surah list — `/surah`

**Files:** `src/app/surah/page.js`, `SurahMain.jsx`, `SurahList.jsx`

**Working**

- Loads `SurahsInEng.json` or `SurahsInUrdu.json` from language  
- Search box filters by name (also seeded from `?q=`)  
- Chips filter Meccan / Medinan  
- Each card links to `/surah/{id}`  
- PDF / playlist actions on the card  

Wrapped in `<Suspense>` because `useSearchParams()` needs it.

### 11.4 Surah detail — `/surah/[id]`

**Files:** `src/app/surah/[id]/page.js`, `SurahPlayer.jsx`

**Working**

- `generateStaticParams` prebuilds ids 1–114  
- `generateMetadata` uses Surah English name + meaning  
- Player reads `params.id`, finds the Surah, extracts YouTube ids from `video_link` or iframe  
- Sidebar/list of videos; selecting one plays it  
- Share, copy, open on YouTube, PDF dialog  
- IDs 4, 5, 6 show a coming-soon state  

**Schema:** breadcrumbs + LearningResource.

### 11.5 Lectures list — `/lectures`

**Files:** `src/app/lectures/page.js`, `LectureCards.jsx`

Shows the lecture categories from `LecturesData.json` / navbar mapping and links into `/lectures/<slug>`.

**Schema:** breadcrumbs + Course list.

### 11.6 Lecture detail — `/lectures/[name]`

**Valid slugs**

| Slug | Title |
|---|---|
| `grammar-lectures` | Arabic Grammar Lectures |
| `namaz-lectures` | Namaz / Salah Lectures |
| `tajweed-lectures` | Tajweed Lectures |
| `short-lectures` | Short Islamic Video Lessons |

**Working**

- `generateStaticParams` from `LECTURE_SLUGS`  
- `LecturesPlayer` finds the English lecture by `name`, then uses the same index in the active language array  
- Video list, player, share, YouTube, optional PDF  

**Schema:** breadcrumbs + Course with `hasCourseInstance` (Online).

### 11.7 Notes — `/notes`

**Files:** `src/app/notes/page.js`, `NotesSection.jsx`, `PDFDialog.jsx`

Two cards from JSON: Arabic Notes and Namaz Notes. Click opens `PDFDialog` with the Google Drive preview URL.

### 11.8 Contact — `/contact`

**Files:** `src/app/contact/page.js`, `ContactUs.jsx`, `ContactForm.jsx`, `MapSection.jsx`

**Working**

1. H1 + academy description  
2. Contact cards (address, phone, email, YouTube, website) — each is a link (`tel:`, `mailto:`, https)  
3. Contact form (`id="contact-form"`, fields `contact-name`, `contact-email`, `contact-message`)  
4. Enrollment FAQs  
5. Embedded Google Map  

**Schema:** breadcrumbs, ContactPage, FAQPage.

### 11.9 FAQ — `/faq`

**Files:** `src/app/faq/page.js`, `PageFaq.jsx`

Renders `FAQ_PAGE_FAQS` (home FAQs plus extras: beginners, notes/recordings, specific Surah, class language). Heading is H1 when `pageTop` is true.

Footer includes FAQ in both English (`FAQ`) and Urdu (`سوالات`).

### 11.10 `/home`

Not a real page. Permanent redirect to `/`. Do not link here.

---

## 12. API routes

There is **one** API route.

### `POST /api/contact`

**File:** `src/app/api/contact/route.js`

**Request JSON**

```json
{
  "name": "Ayesha Khan",
  "email": "ayesha@example.com",
  "message": "I want online Quran classes for my child."
}
```

**Validation**

| Field | Rule |
|---|---|
| `name` | Required, trimmed string |
| `email` | Required, valid email pattern |
| `message` | Required, at least 10 characters |

**Success:** `{ "ok": true }` with HTTP 200  

**Validation failure:** `{ "ok": false, "errors": { "email": "..." } }` with HTTP 400  

**Server / SMTP failure:** `{ "ok": false, "message": "Failed to send message. Please try again later." }` with HTTP 500  

**Client:** `ContactForm.jsx` `fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })`.

Robots disallow `/api/` so this endpoint is not indexed.

There are no GET handlers and no other `/api/*` folders.

---

## 13. Email sending logic

### Files

| File | Responsibility |
|---|---|
| `src/lib/mailer.js` | Nodemailer transport + meta (`from` user, receiver, site name) |
| `src/lib/contactEmailTemplate.js` | HTML + plain-text email, HTML-escaped fields |
| `src/app/api/contact/route.js` | Validate, send, return JSON |

### Transport

```js
nodemailer.createTransport({
  host: SMTP_HOST,       // smtp.gmail.com
  port: Number(SMTP_PORT || 465),
  secure: SMTP_SECURE === 'true',
  auth: { user: SMTP_USER, pass: SMTP_APP_PASSWORD without spaces },
});
```

If host/user/password or `CONTACT_RECEIVER_EMAIL` is missing, `getMailMeta()` / `getSmtpConfig()` throw and the API returns 500.

### Mail headers

| Header | Value |
|---|---|
| From | `"Easy Quran Class" <SMTP_USER>` |
| To | `CONTACT_RECEIVER_EMAIL` |
| Reply-To | `"Visitor Name" <visitor@email>` |
| Subject | `New contact inquiry from {name} \| {siteName}` |

Timestamp is formatted as `en-PK` in timezone `Asia/Karachi`.

### Template behaviour

- Escapes HTML in name, email, and message to prevent injection  
- Inserts `<br />` for newlines in the message  
- Shows an avatar initial, submitted time, “Website contact form” source  
- “Reply to {name}” button is a `mailto:` to the visitor  
- Brand colours match the site (`#B8702F`, `#20110A`)  
- A plain-text alternative is always included  

### Owner workflow

1. Email arrives in `CONTACT_RECEIVER_EMAIL`  
2. Click Reply in Gmail — goes to the visitor because of Reply-To  
3. Or click the gold button in the HTML template  

---

## 14. Language system (English / Urdu)

**File:** `src/contexts/LanguageContext.jsx`

| State | Meaning |
|---|---|
| `lang` | `'en'` or `'ur'` |
| `content` | `WebsiteContent.json[lang]` |
| `changeLanguage(newLang)` | Sets lang, shows loader 300ms, writes `localStorage.websiteLanguage` |
| `loading` | True only during a language switch, not on first paint |

`useLanguage()` is required inside `LanguageProvider` (wrapped in `Providers.jsx`).

Surah and lecture **video JSON** also have `en` / `ur` trees. Players pick the tree from `lang`, except lecture URLs always use English slugs.

HTML `dir` is always `ltr`.

---

## 15. Content and data files

### WebsiteContent.json map

```
en / ur
  home.banner
  home.introSection
  home.ourLectures
  home.socialPlatforms
  home.askQuestion
  home.zakatCalculator
  navbar.navItems
  navbar.lecturesDropdown (titles + urlMapping)
  footer.quickLinks, contactInfo, additionalInfo
  contact.contactInfo, contact.contactForm
  about.visionSection, whyChooseUsSection, aboutUsSection, statsSection
  notes.notesSection
```

### Lecture slugs (must stay in sync)

`WebsiteContent.json` urlMapping ↔ `LecturesData.json` `name` ↔ `src/lib/seo.js` `LECTURE_SLUGS` ↔ URL `/lectures/{name}`.

---

## 16. SEO, GEO, robots, sitemap, llms.txt

### 16.1 On-page metadata

`createPageMetadata()` in `src/lib/seo.js` sets for every page:

- `title` (plus layout template `| Easy Quran Class`, except home `absoluteTitle`)  
- `description`  
- `keywords`  
- `alternates.canonical`  
- Open Graph + Twitter cards  
- `robots: index, follow` with large image/snippet previews  

Google verification:

```js
verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
  : undefined
```

This emits:

```html
<meta name="google-site-verification" content="TOKEN" />
```

### 16.2 Structured data (JSON-LD)

Injected via `JsonLd.jsx` (`<script type="application/ld+json">`).

Sitewide in `layout.js`:

- `EducationalOrganization` + `LocalBusiness` (`#organization`)  
- `WebSite` with `SearchAction` → `/surah?q={search_term_string}`  

Per page as listed in section 11.

### 16.3 robots.txt — `src/app/robots.js`

URL: `https://easyquranclass.com/robots.txt`

- Allow `/`  
- Disallow `/api/`  
- Explicit allow for Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot, Bytespider, CCBot, meta-externalagent, YouBot, MistralAI-User, and others  
- `Sitemap: https://easyquranclass.com/sitemap.xml`  
- `Host: https://easyquranclass.com`

This is the file AI companies actually respect for allow/block.

### 16.4 sitemap.xml — `src/app/sitemap.js`

URL: `https://easyquranclass.com/sitemap.xml`

Includes:

- `/` (priority 1)  
- `/about`, `/surah`, `/lectures`, `/faq` (0.9)  
- `/notes`, `/contact` (0.8)  
- `/lectures/grammar-lectures`, `namaz-lectures`, `tajweed-lectures`, `short-lectures` (0.8)  
- `/surah/1` … `/surah/114` (0.6)  

After deploy, submit this URL in Google Search Console and Bing Webmaster Tools.

### 16.5 llms.txt — `src/app/llms.txt/route.js`

URL: `https://easyquranclass.com/llms.txt`  
Content-Type: `text/plain; charset=utf-8`

Markdown index of the academy: what it is, primary pages, lecture playlists, key facts, contact, sitemap/robots links.

This is **not** an access gate. `robots.txt` is. `llms.txt` is a curated map for agents that choose to read it.

### 16.6 Other SEO files

| URL | Source |
|---|---|
| `/manifest.webmanifest` | `src/app/manifest.js` |
| `/favicon.ico` | `public/favicon.ico` |

### 16.7 Sitelinks and green ticks

Sitelinks (main result + About / Surah / Lectures underneath) are generated by Google after indexing a clear IA, unique titles, and crawlable nav/footer links. They cannot be forced in HTML.

The green verification tick requires:

1. The meta tag live on the **production domain** (not localhost)  
2. Click Verify in Search Console  
3. Time for Google to trust the official site  

---

## 17. Forms, accessibility, and agent SEO

- Skip link `.skip-link` → `#main-content`  
- `<main id="main-content">` wraps all pages  
- Contact fields have `id`, `name`, `label`, `autoComplete`  
- Form `id="contact-form"`  
- Navbar/footer use `next/link`  
- Banner CTA is a link, not JS-only navigation  
- FAQ answers are visible HTML (accordion), duplicated in FAQPage schema  

---

## 18. GitHub: create repo and push code

This project may start without a remote. Use GitHub to store and to connect Vercel.

### 18.1 First-time push

In the project root:

```bash
git init
git add .
git commit -m "Initial Easy Quran Class Next.js website"
```

Create an empty GitHub repository (no README if the local repo already has files), then:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

SSH alternative:

```bash
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git push -u origin main
```

### 18.2 Daily push

```bash
git status
git add .
git commit -m "Describe why the change was made"
git push
```

### 18.3 Do not commit

- `.env.local`  
- `node_modules/`  
- `.next/`  
- SMTP passwords, app passwords, inbox addresses if you treat them as private  

`.env.example` **should** be committed so others know which keys exist.

### 18.4 `.gitignore`

Keep standard Next.js ignores: `node_modules`, `.next`, `.env*.local` (except `.env.example`).

---

## 19. Vercel deploy and custom domain DNS

Production is intended to run on **Vercel**, with the custom domain **easyquranclass.com** pointed at Vercel using DNS records at the original domain provider (GoDaddy, Namecheap, Cloudflare, etc.).

### 19.1 Deploy the project

1. Sign in at https://vercel.com with GitHub.  
2. **Add New → Project** and import the GitHub repository.  
3. Framework preset: **Next.js**.  
4. Root directory: repository root (where `package.json` lives).  
5. Build command: `next build` (default).  
6. Output: default (Vercel runs `next start` / its Next runtime).  
7. Add **Environment Variables** (all keys from section 6) for Production, Preview, and Development as needed.  
8. Click **Deploy**.

Every later `git push` to `main` triggers a production deployment.

CLI alternative:

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

### 19.2 Add the custom domain in Vercel

1. Open the project → **Settings → Domains**.  
2. Add `easyquranclass.com`.  
3. Add `www.easyquranclass.com` if you want www as well.  
4. Vercel will show the **exact DNS records** to create. **Always copy those records** — IPs can change.

Recommended setup:

- Apex `easyquranclass.com` → production  
- `www.easyquranclass.com` → redirect to apex (Vercel can do this when both domains are added)

### 19.3 Add Vercel DNS records at the domain provider

Log in to the registrar where the domain was purchased (the “original domain provider”). Open DNS management.

**Typical records Vercel asks for** (confirm in the Vercel Domains UI):

| Type | Name / Host | Value | TTL |
|---|---|---|---|
| A | `@` (or blank, for `easyquranclass.com`) | The A record IP Vercel shows (commonly `76.76.21.21`) | Auto / 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | Auto / 3600 |

Some accounts also show:

- Extra A or AAAA records  
- A recommendation to use **Vercel nameservers** instead of individual records  

If you use Vercel nameservers:

1. Copy the nameservers Vercel lists (like `ns1.vercel-dns.com`).  
2. In the registrar, replace the existing nameservers with Vercel’s.  
3. DNS then lives entirely in Vercel.

If you keep the registrar’s nameservers, only add/edit the A/CNAME rows Vercel lists. Remove old A records that still point to a previous host (old VPS, another CDN, parked GoDaddy page, etc.) or the domain will split.

### 19.4 Provider-specific notes

**GoDaddy**

- My Products → DNS → Records  
- Add A for `@` and CNAME for `www`  
- Save. Propagation can take from minutes up to 48 hours  

**Namecheap**

- Domain List → Manage → Advanced DNS  
- Same A + CNAME  

**Cloudflare**

- Either add the A/CNAME with proxy **DNS only** (grey cloud) unless you know you need orange-cloud proxy  
- Or change nameservers as Vercel instructs  

### 19.5 SSL

Vercel issues a Let’s Encrypt certificate automatically once DNS resolves. HTTPS will show valid after the domain status in Vercel is **Valid**.

### 19.6 After DNS is valid

1. Set `NEXT_PUBLIC_SITE_URL=https://easyquranclass.com` on Vercel and redeploy.  
2. Visit https://easyquranclass.com and https://easyquranclass.com/robots.txt  
3. Confirm `/sitemap.xml` and `/llms.txt`  
4. Submit the sitemap in Search Console  
5. Send a test contact form and confirm the owner email  

### 19.7 Preview vs production env

Preview deployments use `*.vercel.app`. Contact emails still send if SMTP vars are set on Preview. Restrict Preview SMTP if you do not want test mail hitting the owner inbox.

---

## 20. Google Search Console verification

1. Put the token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (local + Vercel).  
2. Deploy so https://easyquranclass.com HTML contains:

   `<meta name="google-site-verification" content="TOKEN" />`

3. In Search Console, choose URL prefix `https://easyquranclass.com` or Domain property.  
4. HTML tag method → Verify.  
5. Sitemaps → add `https://easyquranclass.com/sitemap.xml`.  

Localhost cannot complete verification.

---

## 21. Common tasks and recipes

### Change brand colour

Update `--color-primary` in `src/variables.css` and `themeColor` in `layout.js` / `manifest.js`.

### Change homepage H1

`WebsiteContent.json` → `en.home.banner.title` and `ur.home.banner.title`. Meta title is separate (`src/app/page.js`) and should stay keyword-focused.

### Test contact email locally

1. Fill SMTP vars in `.env.local`  
2. `npm run dev`  
3. Submit the form on `/contact`  
4. Check `CONTACT_RECEIVER_EMAIL` (and Gmail spam)

### Add a FAQ

Edit `src/lib/faqs.js` arrays (`HOME_FAQS`, `ABOUT_FAQS`, `CONTACT_FAQS`, `FAQ_PAGE_FAQS`). Schema is generated automatically by `faqJsonLd()`.

### Stop indexing a page

Add `robots: { index: false, follow: false }` in that page’s `createPageMetadata` call, or omit it from `sitemap.js`. Do not noindex important academy pages.

---

## 22. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Contact form 500 | SMTP missing or Gmail blocked | Check `.env.local`, App Password, 2FA |
| Email sends from SMTP but owner does not see it | Wrong `CONTACT_RECEIVER_EMAIL` or spam | Confirm env on Vercel, check spam |
| Reply goes to SMTP_USER | Reply-To not applied | Confirm API still sets `replyTo` |
| Hydration mismatch overlay | `Math.random()` / `Date` in first render | Use deterministic values |
| Google does not verify | Token only on localhost | Deploy, then verify production HTML |
| `/home` still in Google | Old indexed URL | Redirect is 308; request recrawl |
| Urdu not sticking | `localStorage` blocked | Language defaults to English |
| Surah 4–6 empty | Hard-coded coming soon | Edit `SurahPlayer.jsx` |
| Vercel domain stays “Invalid” | Old A record still at registrar | Delete conflicting records; wait TTL |
| Images 404 | File not in `public/images` | Paths are `/images/...` from `public/` |
| Metadata not updating | Cached production | Redeploy; hard refresh |

### Dev server already on port 3000

Stop the other process or run `npx next dev -p 3001`.

---

## Appendix A — Route checklist

| Route | Indexable | Notes |
|---|---|---|
| `/` | Yes | Homepage |
| `/about` | Yes | |
| `/surah` | Yes | |
| `/surah/1` … `/surah/114` | Yes | 4–6 coming soon in UI |
| `/lectures` | Yes | |
| `/lectures/grammar-lectures` | Yes | |
| `/lectures/namaz-lectures` | Yes | |
| `/lectures/tajweed-lectures` | Yes | |
| `/lectures/short-lectures` | Yes | |
| `/notes` | Yes | |
| `/contact` | Yes | |
| `/faq` | Yes | |
| `/home` | Redirect | 308 → `/` |
| `/api/contact` | No | POST only, robots disallow |
| `/robots.txt` | — | Generated |
| `/sitemap.xml` | — | Generated |
| `/llms.txt` | — | Generated |
| `/manifest.webmanifest` | — | Generated |

## Appendix B — Page titles (as implemented)

| Page | Title Google should show |
|---|---|
| Home | Easy Quran Class \| Best Online Quran Academy |
| About | About Our Online Quran Academy \| Easy Quran Class |
| Contact | Contact & Enroll in Quran Classes \| Easy Quran Class |
| Surah list | All 114 Quran Surahs Online \| Easy Quran Class |
| Lectures list | Tajweed, Namaz & Grammar Lectures \| Easy Quran Class |
| Notes | Arabic Grammar & Namaz Notes PDF \| Easy Quran Class |
| FAQ | FAQ for Online Quran Classes \| Easy Quran Class |
| Lecture detail | `{Playlist title} \| Easy Quran Class` |
| Surah detail | `Surah {Name} ({Meaning}) Online \| Easy Quran Class` |

---

*Document generated for the Easy Quran Class Next.js website. Update this file when routes, env vars, or deploy steps change.*
