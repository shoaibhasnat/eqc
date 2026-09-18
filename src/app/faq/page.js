import JsonLd from '@/components/seo/JsonLd';
import PageFaq from '@/components/seo/PageFaq';
import { FAQ_PAGE_FAQS } from '@/lib/faqs';
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'FAQ for Online Quran Classes',
  description:
    'Answers about Easy Quran Class: how online Quran classes work, Quran classes for kids, Tajweed, Arabic grammar, namaz lectures, and how to enroll.',
  path: '/faq',
  keywords: ['online Quran classes FAQ', 'how to learn Quran online', 'Quran classes for kids FAQ'],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'FAQ', path: '/faq' },
            ]),
            faqJsonLd(FAQ_PAGE_FAQS),
          ],
        }}
      />
      <PageFaq
        pageTop
        title="Quran Class FAQs"
        subtitle="Clear answers for parents, beginners, and adults looking for the best online Quran academy."
        faqs={FAQ_PAGE_FAQS}
      />
    </>
  );
}
