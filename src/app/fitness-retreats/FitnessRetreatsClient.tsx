'use client';

import type { RetreatCard, Testimonial, SiteSettings } from '@/types/sanity';

/* ─── Section Components ─────────────────────────────────────────────── */
import RetreatsHero from '@/components/sections/retreats/RetreatsHero';
import RetreatsGeoDefinition from '@/components/sections/retreats/RetreatsGeoDefinition';
import RetreatsActivities from '@/components/sections/retreats/RetreatsActivities';
import RetreatsQualifying from '@/components/sections/retreats/RetreatsQualifying';
import RetreatsDestinations from '@/components/sections/retreats/RetreatsDestinations';
import RetreatsStats from '@/components/sections/retreats/RetreatsStats';
import RetreatsInclusions from '@/components/sections/retreats/RetreatsInclusions';
import RetreatsTestimonials from '@/components/sections/retreats/RetreatsTestimonials';
import RetreatsFAQ from '@/components/sections/retreats/RetreatsFAQ';
import RetreatsCTA from '@/components/sections/retreats/RetreatsCTA';

/* ─── Dividers & Energy Breaks ───────────────────────────────────────── */
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';
import DoubleLineDivider from '@/components/layout/DoubleLineDivider';
import MarqueeTicker from '@/components/retreat/MarqueeTicker';
import { generateFAQSchema, FITNESS_RETREATS_FAQS } from '@/lib/faq-data';

/* ─── Props ──────────────────────────────────────────────────────────── */

interface FitnessRetreatsClientProps {
  retreats: RetreatCard[];
  testimonials: Testimonial[];
  settings: SiteSettings | null;
}

/* ─── Compositor ─────────────────────────────────────────────────────── */

export default function FitnessRetreatsClient({
  retreats,
  testimonials,
  settings,
}: FitnessRetreatsClientProps) {
  return (
    <main>
      {/* Schema.org — Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SALTY Retreats',
            url: 'https://getsaltyretreats.com',
            description:
              'All-inclusive group fitness retreats combining daily workouts, adventure activities, and cultural exploration.',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: settings?.averageRating?.toString() || '4.9',
              bestRating: '5',
              ratingCount: settings?.totalGuests?.toString() || '200',
            },
          }),
        }}
      />
      {/* Schema.org — FAQPage (matches RetreatsFAQ content) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(FITNESS_RETREATS_FAQS)),
        }}
      />

      {/* ── 1. Hero [Dark Teal] ── */}
      <RetreatsHero />

      {/* ↓ SWOOP left */}
      <SwoopDivider color="var(--color-surface-base)" direction="left" />

      {/* ── 2. GEO Definition [Paper White] ── */}
      <RetreatsGeoDefinition />

      {/* — no divider — */}

      {/* ── 3. What You'll Do [Warm Cream] ── */}
      <RetreatsActivities />

      {/* MarqueeTicker energy break */}
      <MarqueeTicker
        items={['SWEAT', 'SURF', 'YOGA', 'EXPLORE', 'CONNECT']}
        backgroundColor="var(--color-palm-green)"
        textColor="var(--color-paper-white)"
      />

      {/* ↓ WAVE */}
      <WaveDivider color="var(--color-surface-base)" />

      {/* ── 4. Not For You [Paper White] ── */}
      <RetreatsQualifying />

      {/* — no divider — */}

      {/* ── 5. Where We Go [Sand] ── */}
      <RetreatsDestinations retreats={retreats} />

      {/* ↓ DOUBLE LINES */}
      <DoubleLineDivider topColor="var(--color-coral)" bottomColor="var(--color-golden)" />

      {/* ── 6. By the Numbers [Dark Teal] ── */}
      <RetreatsStats settings={settings} />

      {/* ↓ SWOOP right */}
      <SwoopDivider color="var(--color-surface-base)" direction="right" />

      {/* ── 7. What's Included [Paper White] ── */}
      <RetreatsInclusions />

      {/* MarqueeTicker energy break */}
      <MarqueeTicker
        items={['COSTA RICA', 'PANAMA', 'MOROCCO', 'SICILY', 'SRI LANKA']}
        backgroundColor="var(--color-coral)"
        textColor="var(--color-paper-white)"
      />

      {/* ── 8. What People Say [Dark Teal] ── */}
      <RetreatsTestimonials testimonials={testimonials} />

      {/* ↓ SWOOP left */}
      <SwoopDivider color="var(--color-sand)" direction="left" />

      {/* ── 9. FAQ [Sand] ── */}
      <RetreatsFAQ />

      {/* — no divider — */}

      {/* ── 10. CTA + Footer [Dark Deep] ── */}
      <RetreatsCTA />
    </main>
  );
}
