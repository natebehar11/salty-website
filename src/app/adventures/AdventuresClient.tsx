'use client';

import type { RetreatCard, FAQCategory, SiteSettings } from '@/types/sanity';

/* ─── Section Components ─────────────────────────────────────────────── */
import AdventuresHero from '@/components/sections/adventures/AdventuresHero';
import AdventuresGrid from '@/components/sections/adventures/AdventuresGrid';
import AdventuresPastRetreats from '@/components/sections/adventures/AdventuresPastRetreats';
import AdventuresHelpChoosing from '@/components/sections/adventures/AdventuresHelpChoosing';
import AdventuresFAQ from '@/components/sections/adventures/AdventuresFAQ';
import AdventuresCTA from '@/components/sections/adventures/AdventuresCTA';

/* ─── Dividers & Energy Breaks ───────────────────────────────────────── */
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';
import DoubleLineDivider from '@/components/layout/DoubleLineDivider';
import MarqueeTicker from '@/components/retreat/MarqueeTicker';

/* ─── Props ──────────────────────────────────────────────────────────── */

interface AdventuresClientProps {
  retreats: RetreatCard[];
  faqCategories: FAQCategory[];
  settings: SiteSettings | null;
}

/* ─── Compositor ─────────────────────────────────────────────────────── */

export default function AdventuresClient({
  retreats,
  faqCategories,
  settings,
}: AdventuresClientProps) {
  return (
    <main>
      {/* Schema.org — CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Our Adventures | SALTY Retreats',
            description:
              'Browse all upcoming SALTY fitness retreats across 7 countries. All-inclusive group travel for fun-loving people.',
            url: 'https://getsaltyretreats.com/adventures',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: retreats.length || 6,
              itemListElement: (retreats.length > 0 ? retreats : []).map(
                (r, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `https://getsaltyretreats.com/retreats/${r.slug}`,
                  name: `${r.officialName} — ${r.name}`,
                })
              ),
            },
            provider: {
              '@type': 'Organization',
              name: 'SALTY Retreats',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: settings?.averageRating?.toString() || '4.9',
                bestRating: '5',
                ratingCount: settings?.totalGuests?.toString() || '200',
              },
            },
          }),
        }}
      />

      {/* ── 1. Hero [Sky/Cream gradient] ── */}
      <AdventuresHero />

      {/* ↓ SWOOP */}
      <SwoopDivider color="var(--color-surface-base)" direction="left" />

      {/* ── 2. Retreat Card Grid [Paper White] ── */}
      <AdventuresGrid retreats={retreats} />

      {/* MarqueeTicker energy break */}
      <MarqueeTicker
        items={['COSTA RICA', 'PANAMA', 'MOROCCO', 'SICILY', 'EL SALVADOR', 'SRI LANKA', 'NICARAGUA']}
        backgroundColor="var(--color-coral)"
        textColor="var(--color-paper-white)"
        speed={35}
      />

      {/* ↓ WAVE */}
      <WaveDivider color="var(--color-slate-grey)" />

      {/* ── 3. Past Retreats [Dark Charcoal] ── */}
      <AdventuresPastRetreats />

      {/* ↓ DOUBLE LINES */}
      <DoubleLineDivider topColor="var(--color-coral)" bottomColor="var(--color-golden)" />

      {/* ── 4. Need Help Choosing? [Dark Teal] ── */}
      <AdventuresHelpChoosing />

      {/* ↓ SWOOP */}
      <SwoopDivider color="var(--color-surface-base)" direction="right" />

      {/* ── 5. FAQs [Paper White] ── */}
      <AdventuresFAQ faqCategories={faqCategories} />

      {/* ── 6. CTA + Footer [Dark Deep] ── */}
      <AdventuresCTA />
    </main>
  );
}
