import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import Providers from '@/components/Providers';
import JsonLd from '@/components/seo/JsonLd';
import { CORE_KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import '../global.css';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Easy Quran Class | Best Online Quran Academy',
    template: '%s | Easy Quran Class',
  },
  description: SITE_DESCRIPTION,
  keywords: CORE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Education',
  applicationName: SITE_NAME,
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
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Easy Quran Class | Best Online Quran Academy',
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: '/images/home-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Easy Quran Class - Learn Quran online with qualified teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Quran Class | Best Online Quran Academy',
    description: SITE_DESCRIPTION,
    images: ['/images/home-banner.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport = {
  themeColor: '#B8702F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [organizationJsonLd(), websiteJsonLd()],
          }}
        />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
