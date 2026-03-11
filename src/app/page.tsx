import { client } from '@/lib/sanity/client';
import { allRetreatsQuery, featuredTestimonialsQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import { generateFAQSchema, HOMEPAGE_FAQS } from '@/lib/faq-data';
import HomepageClient from './HomepageClient';

export default async function Home() {
  const [retreats, testimonials, settings] = await Promise.all([
    client.fetch(allRetreatsQuery).catch(() => []),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomepageClient
        retreats={retreats}
        testimonials={testimonials}
        settings={settings}
      />
    </>
  );
}
