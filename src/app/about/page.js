import About from '@/components/user/about/About';
import JsonLd from '@/components/seo/JsonLd';
import { ABOUT_FAQS } from '@/lib/faqs';
import { aboutPageJsonLd, breadcrumbJsonLd, createPageMetadata, faqJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'About Our Online Quran Academy',
  description:
    'Easy Quran Class is an online Quran academy in Lahore teaching Quran recitation, Tajweed, Tafsir, and Arabic with qualified teachers for kids and adults worldwide.',
  path: '/about',
  keywords: ['about Easy Quran Class', 'online Quran academy Lahore'],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ]),
            aboutPageJsonLd(),
            faqJsonLd(ABOUT_FAQS),
          ],
        }}
      />
      <About />
    </>
  );
}
