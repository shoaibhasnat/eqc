import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

export default function manifest() {
  return {
    id: '/',
    name: SITE_NAME,
    short_name: 'EQC',
    description: SITE_DESCRIPTION,
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'browser'],
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#B8702F',
    lang: 'en',
    categories: ['education', 'lifestyle'],
    launch_handler: {
      client_mode: ['navigate-existing', 'auto'],
    },
    protocol_handlers: [
      {
        protocol: 'web+eqc',
        url: '/?source=protocol&url=%s',
      },
    ],
    icons: [
      {
        src: '/logo.jpg',
        sizes: '160x160',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    related_applications: [
      {
        platform: 'webapp',
        url: `${SITE_URL}/manifest.webmanifest`,
      },
      {
        platform: 'webapp',
        url: 'https://www.easyquranclass.com/manifest.webmanifest',
      },
    ],
    prefer_related_applications: false,
  };
}
