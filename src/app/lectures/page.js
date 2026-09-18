import LecturesPage from '@/components/user/lectures/LecturesPage';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, courseJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Tajweed, Namaz & Grammar Lectures',
  description:
    'Watch Easy Quran Class lectures on Arabic grammar, Tajweed, namaz, and short Islamic lessons. Free playlists to support your online Quran studies.',
  path: '/lectures',
  keywords: ['Tajweed lectures', 'namaz lectures', 'Arabic grammar lectures'],
});

export default function LecturesRoutePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Lectures', path: '/lectures' },
            ]),
            ...courseJsonLd(),
          ],
        }}
      />
      <LecturesPage />
    </>
  );
}
