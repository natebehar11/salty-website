'use client';

import type { Coach, SiteSettings } from '@/types/sanity';

/* ─── Section Components ─────────────────────────────────────────────── */
import AboutHero from '@/components/sections/about/AboutHero';
import AboutGeoSnapshot from '@/components/sections/about/AboutGeoSnapshot';
import AboutStory from '@/components/sections/about/AboutStory';
import AboutFounders from '@/components/sections/about/AboutFounders';
import AboutCoaches from '@/components/sections/about/AboutCoaches';
import AboutStats from '@/components/sections/about/AboutStats';
import AboutCTA from '@/components/sections/about/AboutCTA';

/* ─── Dividers & Energy Breaks ───────────────────────────────────────── */
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';
import DoubleLineDivider from '@/components/layout/DoubleLineDivider';
import MarqueeTicker from '@/components/retreat/MarqueeTicker';
import ParallaxVideoBreak from '@/components/retreat/ParallaxVideoBreak';

/* ─── Props ──────────────────────────────────────────────────────────── */

interface AboutClientProps {
  coaches: Coach[];
  founders: Coach[];
  settings: SiteSettings | null;
}

/* ─── Compositor ─────────────────────────────────────────────────────── */

export default function AboutClient({ coaches, founders, settings }: AboutClientProps) {
  return (
    <main>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            mainEntity: {
              '@type': 'Organization',
              name: 'SALTY Retreats',
              url: 'https://getsaltyretreats.com',
              foundingDate: '2023',
              description:
                'SALTY Retreats is a fitness travel company that organizes all-inclusive group fitness retreats combining daily workouts, adventure activities, and cultural exploration.',
            },
          }),
        }}
      />

      {/* ── 1. Hero [Video + Dark Teal overlay] ── */}
      <AboutHero />

      {/* ↓ SWOOP left */}
      <SwoopDivider color="var(--color-surface-base)" direction="left" />

      {/* ── 2. GEO Snapshot [Paper White] ── */}
      <AboutGeoSnapshot />

      {/* ↓ DOUBLE LINES */}
      <DoubleLineDivider topColor="var(--color-coral)" bottomColor="var(--color-golden)" />

      {/* ── 3. The Story [Warm Cream] (Our Recipe is last block) ── */}
      <AboutStory />

      {/* ↓ Video section divider (replaces first MarqueeTicker) — after Our Recipe */}
      <ParallaxVideoBreak
        videoId="WHQUq4Pu4Hg"
        caption="The fun is the wellness."
        overlayOpacity={0.2}
      />

      {/* ↓ WAVE paired (matches homepage pattern) */}
      <WaveDivider color="var(--color-teal)" height={36} />
      <WaveDivider color="var(--color-teal)" height={36} flip />

      {/* ── 4. Meet the Founders [Paper White] ── */}
      <AboutFounders founders={founders} />

      {/* ↓ MarqueeTicker energy break */}
      <MarqueeTicker
        items={['CITY', 'COAST', 'JUNGLE', 'OCEAN', 'COMMUNITY']}
        separator="◆"
        backgroundColor="var(--color-coral)"
        textColor="var(--color-teal)"
      />

      {/* ── 5. Our Coaches [Sand] ── */}
      <AboutCoaches coaches={coaches} />

      {/* ↓ DOUBLE LINES */}
      <DoubleLineDivider topColor="var(--color-coral)" bottomColor="var(--color-golden)" />

      {/* ── 6. The Numbers [Dark Teal] ── */}
      <AboutStats settings={settings} />

      {/* ── 7. CTA [Video + Dark Deep] ── */}
      <AboutCTA />
    </main>
  );
}
