import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo';

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: 'EQC',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#B8702F',
    lang: 'en',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
