'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import type { RetreatCard as RetreatCardType } from '@/types/sanity';
import RetreatCard, { type RetreatSlug, RETREAT_META } from '@/components/shared/RetreatCard';
import ScrollReveal from '@/components/shared/ScrollReveal';

/* ─── Retreat Color Themes (fallback when Sanity not configured) ──── */

const RETREAT_THEMES: Record<string, Record<string, string>> = {
  panama: {
    '--retreat-primary': '#3A6B35',
    '--retreat-secondary': '#C74235',
    '--retreat-accent': '#C74235',
    '--retreat-surface': '#E4E5DD',
    '--retreat-dark': '#0E3A2D',
    '--retreat-text-on-primary': '#F7F4ED',
    '--retreat-ticket-text': '#F7F4ED',
  },
  morocco: {
    '--retreat-primary': '#C74235',
    '--retreat-secondary': '#F75A3D',
    '--retreat-accent': '#F75A3D',
    '--retreat-surface': '#E4E5DD',
    '--retreat-dark': '#0E3A2D',
    '--retreat-text-on-primary': '#F7F4ED',
    '--retreat-ticket-text': '#F7F4ED',
  },
  sicily: {
    '--retreat-primary': '#FED260',
    '--retreat-secondary': '#C74235',
    '--retreat-accent': '#FED260',
    '--retreat-surface': '#E4E5DD',
    '--retreat-dark': '#0E3A2D',
    '--retreat-text-on-primary': '#0E3A2D',
    '--retreat-ticket-text': '#C74235',
  },
  'el-salvador': {
    '--retreat-primary': '#4A4E58',
    '--retreat-secondary': '#CCB4B3',
    '--retreat-accent': '#CCB4B3',
    '--retreat-surface': '#E4E5DD',
    '--retreat-dark': '#0E3A2D',
    '--retreat-text-on-primary': '#0E3A2D',
    '--retreat-ticket-text': '#F7F4ED',
  },
  'costa-rica': {
    '--retreat-primary': '#3A6B35',
    '--retreat-secondary': '#0E3A2D',
    '--retreat-accent': '#0E3A2D',
    '--retreat-surface': '#E4E5DD',
    '--retreat-dark': '#0E3A2D',
    '--retreat-text-on-primary': '#F7F4ED',
    '--retreat-ticket-text': '#A4E5D9',
  },
  nicaragua: {
    '--retreat-primary': '#B6D4EA',
    '--retreat-secondary': '#FED260',
    '--retreat-accent': '#B6D4EA',
    '--retreat-surface': '#E4E5DD',
    '--retreat-dark': '#0E3A2D',
    '--retreat-text-on-primary': '#0E3A2D',
    '--retreat-ticket-text': '#FED260',
  },
  'sri-lanka': {
    '--retreat-primary': '#0E3A2D',
    '--retreat-secondary': '#FF7E70',
    '--retreat-accent': '#F75A3D',
    '--retreat-surface': '#E4E5DD',
    '--retreat-dark': '#0E3A2D',
    '--retreat-text-on-primary': '#F7F4ED',
    '--retreat-ticket-text': '#FF7E70',
  },
};

/* ─── Fallback Retreat Data ──────────────────────────────────────────── */

const FALLBACK_RETREATS: {
  slug: RetreatSlug;
  dates: string;
  price: number;
  totalDays: number;
  imageSrc: string;
  badge?: 'selling-fast' | 'sold-out' | 'new-trip' | 'early-bird';
  status: string;
}[] = [
  {
    slug: 'panama',
    dates: 'March 14–22, 2026',
    price: 2249,
    totalDays: 9,
    imageSrc: '/images/retreat/palapa-laughing.png',
    badge: 'selling-fast',
    status: 'active',
  },
  {
    slug: 'morocco',
    dates: 'May 16–23, 2026',
    price: 1999,
    totalDays: 8,
    imageSrc: '/images/retreat/sand-dune-run.png',
    status: 'active',
  },
  {
    slug: 'sicily',
    dates: 'August 9–16, 2026',
    price: 2099,
    totalDays: 8,
    imageSrc: '/images/retreat/nate-water.png',
    status: 'active',
  },
  {
    slug: 'el-salvador',
    dates: 'November 21–28, 2026',
    price: 1949,
    totalDays: 8,
    imageSrc: '/images/retreat/beach-squats.png',
    badge: 'new-trip',
    status: 'active',
  },
  {
    slug: 'costa-rica',
    dates: 'January 9–16, 2027',
    price: 1899,
    totalDays: 8,
    imageSrc: '/images/retreat/surf-lesson.png',
    status: 'active',
  },
  {
    slug: 'nicaragua',
    dates: 'Winter 2027',
    price: 2100,
    totalDays: 8,
    imageSrc: '',
    status: 'coming-soon',
  },
];

/* ─── Slug Normalizer ──────────────────────────────────────────────── */

const META_KEYS = Object.keys(RETREAT_META) as RetreatSlug[];

/** Map Sanity slugs (e.g. "panama-fitness-retreat") → RETREAT_META key ("panama") */
function normalizeSlug(slug: string): RetreatSlug {
  if (META_KEYS.includes(slug as RetreatSlug)) return slug as RetreatSlug;
  const match = META_KEYS.find(key => slug.startsWith(key));
  return match || 'sri-lanka';
}

/* ─── Helper: Map Sanity data to RetreatCard props ───────────────────── */

function formatDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const sMonth = monthNames[start.getMonth()];
  const eMonth = monthNames[end.getMonth()];
  const sDay = start.getDate();
  const eDay = end.getDate();
  const year = end.getFullYear();

  if (sMonth === eMonth) {
    return `${sMonth} ${sDay}–${eDay}, ${year}`;
  }
  return `${sMonth} ${sDay} – ${eMonth} ${eDay}, ${year}`;
}

function mapStatusToBadge(status: string): 'selling-fast' | 'sold-out' | 'new-trip' | 'early-bird' | undefined {
  switch (status) {
    case 'selling-fast': return 'selling-fast';
    case 'sold-out': return 'sold-out';
    case 'new-trip': return 'new-trip';
    case 'early-bird': return 'early-bird';
    default: return undefined;
  }
}

/* ─── Grid Section ───────────────────────────────────────────────────── */

interface AdventuresGridProps {
  retreats: RetreatCardType[];
}

export default function AdventuresGrid({ retreats }: AdventuresGridProps) {
  const [meterOpenSlug, setMeterOpenSlug] = useState<string | null>(null);

  const toggleMeter = useCallback((slug: string) => {
    setMeterOpenSlug(prev => prev === slug ? null : slug);
  }, []);

  // Use Sanity data only when we have a meaningful set (3+), otherwise show full fallback grid
  const hasData = retreats.length >= 3;

  return (
    <section
      id="retreat-grid"
      className="w-full"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        padding: 'var(--space-section-y) var(--space-section-x)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--space-container-max)' }}>
        {/* Section Heading */}
        <ScrollReveal>
          <h2
            className="text-center uppercase mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h1)',
              color: 'var(--color-teal)',
              lineHeight: 1,
            }}
          >
            OUR RETREATS
          </h2>
        </ScrollReveal>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-12" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
          {hasData
            ? retreats.map((retreat, i) => {
                const slug = normalizeSlug(retreat.slug);
                const theme = retreat.colorTheme
                  ? {
                      '--retreat-primary': retreat.colorTheme.primary,
                      '--retreat-secondary': retreat.colorTheme.secondary,
                      '--retreat-accent': retreat.colorTheme.accent,
                      '--retreat-surface': retreat.colorTheme.surface,
                      '--retreat-dark': retreat.colorTheme.dark,
                      '--retreat-text-on-primary': retreat.colorTheme.textOnAccent,
                      '--retreat-ticket-text': retreat.colorTheme.ticketTextColor,
                    }
                  : RETREAT_THEMES[slug] || RETREAT_THEMES['sri-lanka'];

                return (
                  <ScrollReveal key={retreat._id} delay={i * 0.08}>
                    <div style={theme as React.CSSProperties}>
                      <Link href={`/retreats/${retreat.slug}`} className="block no-underline">
                        <RetreatCard
                          retreat={slug}
                          dates={retreat.startDate && retreat.endDate
                            ? formatDate(retreat.startDate, retreat.endDate)
                            : 'Coming Soon'}
                          price={retreat.lowestPrice || 1999}
                          totalDays={retreat.totalDays || 8}
                          badge={mapStatusToBadge(retreat.status)}
                          showMeter={meterOpenSlug === retreat.slug}
                          saltyMeterScores={retreat.saltyMeter}
                          onMeterToggle={() => toggleMeter(retreat.slug)}
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                );
              })
            : FALLBACK_RETREATS.map((retreat, i) => {
                const theme = RETREAT_THEMES[retreat.slug] || RETREAT_THEMES['sri-lanka'];
                return (
                  <ScrollReveal key={retreat.slug} delay={i * 0.08}>
                    <div style={theme as React.CSSProperties}>
                      <Link
                        href={retreat.status === 'coming-soon' ? '#' : `/retreats/${retreat.slug}`}
                        className="block no-underline"
                        aria-disabled={retreat.status === 'coming-soon'}
                      >
                        <RetreatCard
                          retreat={retreat.slug}
                          dates={retreat.dates}
                          price={retreat.price}
                          totalDays={retreat.totalDays}
                          imageSrc={retreat.imageSrc || undefined}
                          badge={retreat.badge}
                          showMeter={meterOpenSlug === retreat.slug}
                          saltyMeterScores={{
                            adventure: 7,
                            culture: 6,
                            party: 8,
                            sweat: 7,
                            rest: 5,
                          }}
                          onMeterToggle={() => toggleMeter(retreat.slug)}
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                );
              })
          }
        </div>
      </div>
    </section>
  );
}
