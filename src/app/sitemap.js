import { LECTURE_SLUGS, SITE_URL } from '@/lib/seo';

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/surah', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/lectures', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/notes', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.9, changeFrequency: 'monthly' },
  ];

  const lectureRoutes = LECTURE_SLUGS.map((lecture) => ({
    url: `${SITE_URL}/lectures/${lecture.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const surahRoutes = Array.from({ length: 114 }, (_, index) => ({
    url: `${SITE_URL}/surah/${index + 1}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...lectureRoutes,
    ...surahRoutes,
  ];
}
