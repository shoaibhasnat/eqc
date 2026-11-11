import HomeMain from '@/components/user/home/HomeMain';
import JsonLd from '@/components/seo/JsonLd';
import { HOME_FAQS } from '@/lib/faqs';
import { breadcrumbJsonLd, courseJsonLd, createPageMetadata, faqJsonLd, videoJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Easy Quran Class | Online Quran Learning Platform',
  description:
    'A trusted platform to learn and understand the Holy Quran in an easy way for all age groups. Easy Quran Class offers Tajweed, Tafsir, Arabic grammar, and namaz guidance.',
  path: '/',
  keywords: ['online Quran learning platform', 'learn Quran online', 'Quran learning for kids'],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbJsonLd([{ name: 'Home', path: '/' }]),
            faqJsonLd(HOME_FAQS),
            videoJsonLd(),
            ...courseJsonLd(),
          ],
        }}
      />
      <HomeMain />
    </>
  );
}
