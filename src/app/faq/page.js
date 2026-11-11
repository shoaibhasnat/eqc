import JsonLd from '@/components/seo/JsonLd';
import PageFaq from '@/components/seo/PageFaq';
import { FAQ_PAGE_FAQS } from '@/lib/faqs';
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'FAQ',
  description:
    'Answers about Easy Quran Class: how Quran learning works, learning for kids, Tajweed, Arabic grammar, namaz lectures, and how to get started.',
  path: '/faq',
  keywords: ['Easy Quran Class FAQ', 'how to learn Quran online', 'Quran learning for kids FAQ'],
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
        title="Frequently Asked Questions"
        subtitle="Clear answers for parents, beginners, and adults learning the Quran with Easy Quran Class."
        faqs={FAQ_PAGE_FAQS}
      />
    </>
  );
}
