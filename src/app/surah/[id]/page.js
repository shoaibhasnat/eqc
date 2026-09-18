import SurahDetailMain from '@/components/user/surah/surahDetail/SurahDetailMain';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';
import surahDataEng from '@/components/user/surah/SurahsInEng.json';

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, index) => ({ id: String(index + 1) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const surah = surahDataEng.surahs.find((item) => String(item.id) === String(id));
  const name = surah?.name || `Surah ${id}`;
  const meaning = surah?.englishName ? ` (${surah.englishName})` : '';

  return createPageMetadata({
    title: `Surah ${name}${meaning} Online`,
    description: `Learn Surah ${name}${meaning} online with Easy Quran Class recitation playlists, Tajweed guidance, and notes for kids and adults.`,
    path: `/surah/${id}`,
    keywords: [`Surah ${name}`, `learn ${name} online`, 'Quran recitation'],
  });
}

export default async function SurahDetailPage({ params }) {
  const { id } = await params;
  const surah = surahDataEng.surahs.find((item) => String(item.id) === String(id));
  const name = surah?.name || `Surah ${id}`;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Surah', path: '/surah' },
              { name, path: `/surah/${id}` },
            ]),
            {
              '@type': 'LearningResource',
              name: `Surah ${name}`,
              educationalLevel: 'beginner to advanced',
              inLanguage: ['en', 'ar', 'ur'],
              learningResourceType: 'video lecture',
            },
          ],
        }}
      />
      <SurahDetailMain />
    </>
  );
}
