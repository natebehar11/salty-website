'use client';

import type { RetreatCard, Testimonial, SiteSettings } from '@/types/sanity';

/* ── Section Components ── */
import HomepageCinematicHero from '@/components/sections/HomepageCinematicHero';
import SaltySnapshot from '@/components/sections/SaltySnapshot';
import WhatMakesSalty from '@/components/sections/WhatMakesSalty';
import HowItWorks from '@/components/sections/HowItWorks';
import UpcomingRetreats from '@/components/sections/UpcomingRetreats';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQTeaser from '@/components/sections/FAQTeaser';
import CommunityCTA from '@/components/sections/CommunityCTA';

/* ── Dividers ── */
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';
import DoubleLineDivider from '@/components/layout/DoubleLineDivider';

/* ── Shared ── */
import MarqueeTicker from '@/components/retreat/MarqueeTicker';

/* ─── Types ───────────────────────────────────────────────────────────── */

interface HomepageClientProps {
  retreats: RetreatCard[];
  testimonials: Testimonial[];
  settings: SiteSettings | null;
}

/* ─── Homepage Compositor ─────────────────────────────────────────────── */

export default function HomepageClient({
  retreats,
  testimonials,
  settings,
}: HomepageClientProps) {
  return (
    <>
      {/* ── 1. Hero [Dark Teal] ── */}
      <HomepageCinematicHero
        whatsapp={settings?.whatsapp?.replace(/\D/g, '') || undefined}
      />

      {/* ── SWOOP left ── */}
      <SwoopDivider color="var(--color-paper-white)" direction="left" />

      {/* ── 2. SALTY Snapshot [Paper White] ── */}
      <SaltySnapshot />

      {/* ── Wave divider [Dark Teal] — paired top + bottom for cohesive wave ── */}
      <WaveDivider color="var(--color-teal)" height={80} />
      <WaveDivider color="var(--color-teal)" height={80} flip />

      {/* ── 4. What Makes SALTY, SALTY [Paper White] ── */}
      <WhatMakesSalty />

      {/* ── MarqueeTicker energy break ── */}
      <MarqueeTicker
        items={['SURF', 'SWEAT', 'EXPLORE', 'CONNECT', 'REPEAT']}
        separator="◆"
        backgroundColor="var(--color-palm-green)"
        textColor="var(--color-paper-white)"
      />

      {/* ── 5. How It Works [Warm Cream] ── */}
      <HowItWorks />

      {/* ── SWOOP right ── */}
      <SwoopDivider color="var(--color-paper-white)" direction="right" />

      {/* ── 6. Upcoming Retreats [Paper White] ── */}
      <UpcomingRetreats retreats={retreats} />

      {/* ── DOUBLE LINES ── */}
      <DoubleLineDivider
        topColor="var(--color-coral)"
        bottomColor="var(--color-golden)"
      />

      {/* ── 7. What People Say [Dark Teal] ── */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ── SWOOP left ── */}
      <SwoopDivider color="var(--color-sand)" direction="left" />

      {/* ── 8. FAQ Teaser [Sand] ── */}
      <FAQTeaser />

      {/* ── MarqueeTicker energy break ── */}
      <MarqueeTicker
        items={['CITY', 'COAST', 'JUNGLE', 'OCEAN', 'COMMUNITY']}
        separator="◆"
        backgroundColor="var(--color-coral)"
        textColor="var(--color-teal)"
      />

      {/* ── 9. Community CTA [Dark Deep] ── */}
      <CommunityCTA settings={settings} />

      {/* ── Schema.org: Organization ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SALTY Retreats',
            url: 'https://getsaltyretreats.com',
            logo: 'https://getsaltyretreats.com/images/salty-logo.png',
            description:
              'Group fitness retreats blending surf, yoga, and adventure across 7 countries for 20\u201335 guests.',
            sameAs: [
              settings?.instagram
                ? `https://instagram.com/${settings.instagram.replace('@', '')}`
                : 'https://instagram.com/getsaltyretreats',
              settings?.tiktok || 'https://www.tiktok.com/@getsaltyretreats',
            ].filter(Boolean),
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-431-829-1135',
              contactType: 'customer service',
              availableLanguage: 'English',
            },
            ...(settings
              ? {
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: settings.averageRating,
                    reviewCount: settings.totalGuests,
                    bestRating: 5,
                    worstRating: 1,
                  },
                }
              : {}),
          }),
        }}
      />
    </>
  );
}
