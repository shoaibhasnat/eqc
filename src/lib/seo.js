export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://easyquranclass.com').replace(/\/$/, '');
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Easy Quran Class';
export const SITE_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || '03018477994';
export const SITE_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@easyquranclass.com';
export const SITE_YOUTUBE = process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@easyquranclass';
export const SITE_ADDRESS = 'Valencia Town, Block H, Lahore, Pakistan';
export const SITE_DESCRIPTION =
  'Easy Quran Class is an online Quran academy offering live Quran, Tajweed, Tafsir, Arabic grammar, and namaz classes for kids and adults worldwide.';

export const CORE_KEYWORDS = [
  'Easy Quran Class',
  'online Quran classes',
  'learn Quran online',
  'best online Quran academy',
  'Quran classes for kids',
  'Quran classes for adults',
  'online Tajweed classes',
  'Quran teacher online',
  'Tafsir classes online',
  'Arabic grammar for Quran',
  'namaz lectures',
  'online Islamic classes',
  'Quran academy Lahore',
  'learn Quran with Tajweed',
  'online Quran academy Pakistan',
  'Noorani Qaida online',
  'one to one Quran classes',
  'online Quran academy for beginners',
];

export const LECTURE_SLUGS = [
  {
    slug: 'grammar-lectures',
    title: 'Arabic Grammar Lectures',
    description:
      'Watch Easy Quran Class Arabic grammar lectures to understand Quranic verses, daily Islamic phrases, and the foundations of Nahw and Sarf.',
  },
  {
    slug: 'namaz-lectures',
    title: 'Namaz / Salah Lectures',
    description:
      'Learn salah step by step with Easy Quran Class namaz lectures covering prayer method, meanings, and the spiritual benefits of namaz.',
  },
  {
    slug: 'tajweed-lectures',
    title: 'Tajweed Lectures',
    description:
      'Improve Quran recitation with Easy Quran Class Tajweed lectures. Learn Tajweed rules in a simple, practical way for kids and adults.',
  },
  {
    slug: 'short-lectures',
    title: 'Short Islamic Video Lessons',
    description:
      'Watch short Islamic video lessons from Easy Quran Class on dua, ethics, reminders, and daily guidance for students of all ages.',
  },
];

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  absoluteTitle = false,
}) {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : title;

  return {
    title: absoluteTitle ? { absolute: fullTitle } : fullTitle,
    description,
    keywords: [...CORE_KEYWORDS, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: absoluteTitle ? fullTitle : `${fullTitle} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: absoluteUrl('/images/home-banner.jpg'),
          width: 1200,
          height: 630,
          alt: 'Easy Quran Class online Quran academy banner',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ? fullTitle : `${fullTitle} | ${SITE_NAME}`,
      description,
      images: [absoluteUrl('/images/home-banner.jpg')],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: ['EQC', 'Easy Quran Academy'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon-512.png'),
    },
    image: absoluteUrl('/images/home-banner.jpg'),
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Valencia Town, Block H',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    areaServed: 'Worldwide',
    knowsLanguage: ['en', 'ur', 'ar'],
    sameAs: [SITE_YOUTUBE],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_PHONE,
        contactType: 'customer support',
        email: SITE_EMAIL,
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Urdu'],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'ur'],
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/surah?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function courseJsonLd() {
  return LECTURE_SLUGS.map((lecture) => ({
    '@type': 'Course',
    name: lecture.title,
    description: lecture.description,
    url: absoluteUrl(`/lectures/${lecture.slug}`),
    inLanguage: ['en', 'ur', 'ar'],
    isAccessibleForFree: true,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      inLanguage: ['en', 'ur'],
    },
  }));
}

export function aboutPageJsonLd() {
  return {
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about#webpage`,
    url: absoluteUrl('/about'),
    name: `About ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };
}

export function videoJsonLd() {
  return {
    '@type': 'VideoObject',
    name: 'Introduction to Easy Quran Class',
    description: 'An introductory lecture about Easy Quran Class, an online Quran academy for kids and adults.',
    thumbnailUrl: [absoluteUrl('/images/home-banner.jpg')],
    embedUrl: 'https://www.youtube.com/embed/wj_cCz6BmVw',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
