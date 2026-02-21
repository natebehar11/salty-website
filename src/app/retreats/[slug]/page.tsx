import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { retreats, getRetreatBySlug } from '@/data/retreats';
import RetreatHero from '@/components/retreat/RetreatHero';
import GeoBlock from '@/components/retreat/GeoBlock';
import ExperienceSection from '@/components/retreat/ExperienceSection';
import ActivitiesSection from '@/components/retreat/ActivitiesSection';
import PricingSection from '@/components/retreat/PricingSection';
import InclusionsSection from '@/components/retreat/InclusionsSection';
import ItinerarySection from '@/components/retreat/ItinerarySection';
import CoachesSection from '@/components/retreat/CoachesSection';
import AccommodationSection from '@/components/retreat/AccommodationSection';
import SaltyMeterSection from '@/components/retreat/SaltyMeter';
import TestimonialsSection from '@/components/retreat/TestimonialsSection';
import FAQSection from '@/components/retreat/FAQSection';
import FinalCTASection from '@/components/retreat/FinalCTASection';

export async function generateStaticParams() {
  return retreats.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const retreat = getRetreatBySlug(slug);
  if (!retreat) return { title: 'Retreat Not Found' };

  return {
    title: retreat.seoTitle,
    description: retreat.metaDescription,
    openGraph: {
      title: retreat.seoTitle,
      description: retreat.metaDescription,
      images: [retreat.heroImage],
      url: `https://getsaltyretreats.com/retreats/${retreat.slug}/`,
    },
  };
}

export default async function RetreatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const retreat = getRetreatBySlug(slug);

  if (!retreat) notFound();

  // Only render full page for retreats with complete data
  const hasFullData = retreat.experience.paragraphs.length > 0;

  if (!hasFullData) {
    return (
      <>
        <RetreatHero retreat={retreat} />
        <GeoBlock retreat={retreat} />
        <FinalCTASection retreat={retreat} />
      </>
    );
  }

  return (
    <>
      <RetreatHero retreat={retreat} />
      <GeoBlock retreat={retreat} />
      <ExperienceSection retreat={retreat} />
      <ActivitiesSection retreat={retreat} />
      <PricingSection retreat={retreat} />
      <InclusionsSection retreat={retreat} />
      <ItinerarySection retreat={retreat} />
      <CoachesSection retreat={retreat} />
      <AccommodationSection retreat={retreat} />
      <SaltyMeterSection retreat={retreat} />
      <TestimonialsSection retreat={retreat} />
      <FAQSection retreat={retreat} />
      <FinalCTASection retreat={retreat} />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                name: retreat.subtitle,
                description: retreat.metaDescription,
                brand: { '@type': 'Brand', name: 'SALTY Retreats' },
                image: `https://getsaltyretreats.com${retreat.heroImage}`,
                url: `https://getsaltyretreats.com/retreats/${retreat.slug}/`,
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'USD',
                  lowPrice: retreat.lowestPrice.toString(),
                  highPrice: (retreat.roomTiers[0]?.priceRegular || retreat.lowestPrice).toString(),
                  offerCount: retreat.roomTiers.length.toString(),
                  availability: 'https://schema.org/InStock',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: retreat.rating.value.toString(),
                  reviewCount: retreat.rating.count.toString(),
                  bestRating: '5',
                },
              },
              {
                '@type': 'Event',
                name: `SALTY ${retreat.destination} Retreat - ${new Date(retreat.startDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}`,
                description: retreat.metaDescription,
                startDate: retreat.startDate,
                endDate: retreat.endDate,
                eventStatus: 'https://schema.org/EventScheduled',
                eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                location: {
                  '@type': 'Place',
                  name: retreat.locations[0].name,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: retreat.locations[0].region,
                    addressCountry: retreat.locations[0].countryCode,
                  },
                },
                organizer: {
                  '@type': 'Organization',
                  name: 'SALTY Retreats',
                  url: 'https://getsaltyretreats.com',
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: retreat.faq.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getsaltyretreats.com' },
                  { '@type': 'ListItem', position: 2, name: 'Retreats', item: 'https://getsaltyretreats.com/retreats/' },
                  { '@type': 'ListItem', position: 3, name: retreat.subtitle, item: `https://getsaltyretreats.com/retreats/${retreat.slug}/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
