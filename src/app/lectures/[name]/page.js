import LecturesDetail from '@/components/user/lectures/lecturesDetail/LecturesDetail';
import JsonLd from '@/components/seo/JsonLd';
import { LECTURE_SLUGS, SITE_URL, breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return LECTURE_SLUGS.map((lecture) => ({ name: lecture.slug }));
}

export async function generateMetadata({ params }) {
  const { name } = await params;
  const lecture = LECTURE_SLUGS.find((item) => item.slug === name);

  return createPageMetadata({
    title: lecture?.title || 'Quran Lecture Playlist',
    description:
      lecture?.description ||
      'Watch Easy Quran Class lecture playlists for Quran, Tajweed, namaz, and Arabic grammar.',
    path: `/lectures/${name}`,
    keywords: [lecture?.title || 'Quran lectures', 'online Islamic lectures'],
  });
}

export default async function LecturesDetailPage({ params }) {
  const { name } = await params;
  const lecture = LECTURE_SLUGS.find((item) => item.slug === name);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Lectures', path: '/lectures' },
              { name: lecture?.title || name, path: `/lectures/${name}` },
            ]),
            lecture
              ? {
                  '@type': 'Course',
                  name: lecture.title,
                  description: lecture.description,
                  url: `${SITE_URL}/lectures/${name}`,
                  isAccessibleForFree: true,
                  provider: {
                    '@id': `${SITE_URL}/#organization`,
                  },
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'Online',
                    inLanguage: ['en', 'ur'],
                  },
                }
              : undefined,
          ].filter(Boolean),
        }}
      />
      <LecturesDetail />
    </>
  );
}
