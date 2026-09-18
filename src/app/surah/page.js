import SurahMain from '@/components/user/surah/SurahMain';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'All 114 Quran Surahs Online',
  description:
    'Study all 114 Quran Surahs online with Easy Quran Class. Open recitation playlists, notes, and lectures for Al-Fatihah, Al-Baqarah, Ya-Sin, and more.',
  path: '/surah',
  keywords: ['Quran Surah list', 'learn Surah online', 'Al-Fatihah playlist'],
});

export default function SurahPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Surah', path: '/surah' },
          ]),
        }}
      />
      <SurahMain />
    </>
  );
}
