import ContactUs from '@/components/user/contact/ContactUs';
import JsonLd from '@/components/seo/JsonLd';
import { CONTACT_FAQS } from '@/lib/faqs';
import { SITE_ADDRESS, SITE_EMAIL, SITE_PHONE, breadcrumbJsonLd, createPageMetadata, faqJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact Easy Quran Class',
  description:
    'Contact Easy Quran Class to start Quran, Tajweed, or namaz learning. Call 0301 8477994, email info@easyquranclass.com, or send a message from anywhere.',
  path: '/contact',
  keywords: ['contact Easy Quran Class', 'start Quran learning'],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Contact', path: '/contact' },
            ]),
            {
              '@type': 'ContactPage',
              name: 'Contact Easy Quran Class',
              telephone: SITE_PHONE,
              email: SITE_EMAIL,
              description: SITE_ADDRESS,
            },
            faqJsonLd(CONTACT_FAQS),
          ],
        }}
      />
      <ContactUs />
    </>
  );
}
