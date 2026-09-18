import { SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_URL, SITE_YOUTUBE } from '@/lib/seo';

const LLMS_TXT = `# ${SITE_NAME}

> ${SITE_DESCRIPTION} Based in Valencia Town, Block H, Lahore, Pakistan. Contact: ${SITE_EMAIL}, ${SITE_PHONE}.

Easy Quran Class helps students learn Quran online with qualified teachers. Core offerings include live Quran recitation, Tajweed, Tafsir, Arabic grammar, namaz/salah guidance, Surah playlists, and study notes for kids and adults.

## Primary Pages
- [Home](${SITE_URL}/): Online Quran academy overview, lectures, Zakat calculator, and contact form
- [About](${SITE_URL}/about): Mission, vision, values, and why students choose Easy Quran Class
- [Surah](${SITE_URL}/surah): All 114 Quran Surahs with recitation playlists and notes
- [Lectures](${SITE_URL}/lectures): Arabic grammar, Tajweed, namaz, and short Islamic video lectures
- [Notes](${SITE_URL}/notes): Arabic notes and namaz notes in PDF
- [Contact](${SITE_URL}/contact): Address, phone, email, and inquiry form
- [FAQ](${SITE_URL}/faq): Answers about online Quran classes, Tajweed, kids classes, and enrollment

## Lecture Playlists
- [Arabic Grammar Lectures](${SITE_URL}/lectures/grammar-lectures)
- [Namaz / Salah Lectures](${SITE_URL}/lectures/namaz-lectures)
- [Tajweed Lectures](${SITE_URL}/lectures/tajweed-lectures)
- [Short Islamic Video Lessons](${SITE_URL}/lectures/short-lectures)

## Key Facts
- Brand: Easy Quran Class
- Type: Online Quran academy / Islamic education
- Audience: Kids, adults, beginners, and advancing students worldwide
- Languages: English and Urdu
- Location: Valencia Town, Block H, Lahore, Pakistan
- YouTube: ${SITE_YOUTUBE}

## Direct Answers
- Easy Quran Class is an online Quran academy for kids and adults.
- Students learn Quran recitation, Tajweed, Tafsir, Arabic grammar, and namaz.
- Classes are live, teacher-led, and available worldwide.
- Enrollment starts on the Contact page: ${SITE_URL}/contact
- Phone: ${SITE_PHONE}
- Email: ${SITE_EMAIL}

## Optional
- [XML Sitemap](${SITE_URL}/sitemap.xml)
- [Robots](${SITE_URL}/robots.txt)
`;

export async function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
