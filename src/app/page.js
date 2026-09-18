import HomeMain from '@/components/user/home/HomeMain';
import JsonLd from '@/components/seo/JsonLd';
import { HOME_FAQS } from '@/lib/faqs';
import { breadcrumbJsonLd, courseJsonLd, createPageMetadata, faqJsonLd, videoJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Easy Quran Class | Best Online Quran Academy',
  description:
    'Learn Quran online with qualified teachers. Easy Quran Class offers live Quran, Tajweed, Tafsir, Arabic grammar, and namaz classes for kids and adults worldwide.',
  path: '/',
  keywords: ['best online Quran academy', 'learn Quran online', 'online Quran classes for kids'],
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
