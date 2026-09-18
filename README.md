# Easy Quran Class

Public website for **Easy Quran Class**, an online Quran academy teaching Quran recitation, Tajweed, Tafsir, Arabic grammar, and namaz to kids and adults worldwide.

- **Live site:** [https://easyquranclass.com](https://easyquranclass.com)
- **Repository:** [github.com/shoaibhasnat/eqc](https://github.com/shoaibhasnat/eqc)
- **Full guide:** [documentation/complete-project/complete-project.md](documentation/complete-project/complete-project.md)

## Features

- English / Urdu bilingual UI
- Home, About, Surah (all 114), Lectures, Notes, Contact, and FAQ pages
- YouTube lecture and Surah playlist players
- PDF notes viewer
- Zakat calculator
- Contact form that emails the academy owner through Gmail SMTP
- SEO metadata, JSON-LD schema, `robots.txt`, `sitemap.xml`, and `llms.txt` for search and AI crawlers

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, MUI 7, Emotion, Framer Motion |
| Email | Nodemailer + Gmail SMTP |
| Hosting | Vercel + custom domain |

There is no database, login, or payment flow. Enrollment is by phone, email, or the contact form.

## Requirements

- Node.js 18+ (20+ recommended)
- npm
- A Gmail account with 2-Step Verification and an [App Password](https://myaccount.google.com/apppasswords) for contact emails

## Getting started

```bash
git clone https://github.com/shoaibhasnat/eqc.git
cd eqc
npm install
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Fill `.env.local`, then start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

## Environment variables

Copy `.env.example`. Never commit `.env.local`.

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | Gmail account that **sends** mail |
| `SMTP_APP_PASSWORD` | Gmail app password |
| `CONTACT_RECEIVER_EMAIL` | Owner inbox that **receives** inquiries |
| `CONTACT_FROM_NAME` | From display name, e.g. `Easy Quran Class` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, `https://easyquranclass.com` |
| `NEXT_PUBLIC_SITE_NAME` | Brand name |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email shown on the site |
| `NEXT_PUBLIC_CONTACT_PHONE` | Public phone |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube channel URL |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console token only (no `google-site-verification=` prefix) |

Contact emails are sent **from** `SMTP_USER` **to** `CONTACT_RECEIVER_EMAIL`, with the visitor set as **Reply-To**.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — banner, intro, lectures, Zakat calculator, FAQs, contact form |
| `/about` | Mission, vision, academy copy, stats |
| `/surah` | All 114 Surahs (search and filter) |
| `/surah/[id]` | Surah video playlist and notes |
| `/lectures` | Lecture categories |
| `/lectures/[name]` | Grammar, Tajweed, namaz, or short-video playlist |
| `/notes` | Arabic and namaz PDF notes |
| `/contact` | NAP, form, map, enrollment FAQs |
| `/faq` | Full FAQ |
| `/home` | 301 redirect to `/` |

SEO files:

- [https://easyquranclass.com/robots.txt](https://easyquranclass.com/robots.txt)
- [https://easyquranclass.com/sitemap.xml](https://easyquranclass.com/sitemap.xml)
- [https://easyquranclass.com/llms.txt](https://easyquranclass.com/llms.txt)

## Project structure

```
src/app/                 App Router pages, API, robots, sitemap, llms.txt
src/components/user/     UI (home, about, surah, lectures, notes, contact)
src/contexts/            English / Urdu language provider
src/lib/                 SEO helpers, FAQs, mailer, email template
public/images/           Static images
```

Most visitor-facing copy lives in `src/components/user/contentFiles/WebsiteContent.json` (`en` and `ur`). Lecture videos are in `src/components/user/lectures/LecturesData.json`. Surah data is in `SurahsInEng.json` and `SurahsInUrdu.json`.

## Contact form

`POST /api/contact` validates name, email, and message (minimum 10 characters), then sends a branded HTML email through Nodemailer.

## Deploy on Vercel

1. Import this GitHub repo in [Vercel](https://vercel.com).
2. Add the same environment variables as `.env.local`.
3. Deploy.
4. In **Settings → Domains**, add `easyquranclass.com` and `www`.
5. At your domain registrar, add the **A / CNAME (or nameserver) records Vercel shows**.
6. Submit `https://easyquranclass.com/sitemap.xml` in Google Search Console.

## License

Private academy website. All rights reserved unless otherwise stated.
