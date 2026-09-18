import NotesPage from '@/components/user/notes/NotesPage';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Arabic Grammar & Namaz Notes PDF',
  description:
    'Download Arabic grammar notes and namaz notes from Easy Quran Class to support online Quran learning, Tajweed practice, and salah revision.',
  path: '/notes',
  keywords: ['Quran notes PDF', 'Arabic notes', 'namaz notes'],
});

export default function NotesRoutePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Notes', path: '/notes' },
          ]),
        }}
      />
      <NotesPage />
    </>
  );
}
