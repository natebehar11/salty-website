'use client';

import type { RetreatCard } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import Link from 'next/link';

/* ─── Boarding Pass Colors ───────────────────────────────────────────── */

const PASS_COLORS = [
  { bg: '#F75A3D', text: '#0E3A2D', accent: '#FED260' },
  { bg: '#0E3A2D', text: '#F7F4ED', accent: '#A4E5D9' },
  { bg: '#3A6B35', text: '#F7F4ED', accent: '#FED260' },
  { bg: '#C74235', text: '#F7F4ED', accent: '#E7D7C0' },
  { bg: '#B6D4EA', text: '#0E3A2D', accent: '#F75A3D' },
];

/* ─── Barcode SVG ────────────────────────────────────────────────────── */

function BarcodeSVG({ color }: { color: string }) {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 1, 3];
  let x = 0;
  return (
    <svg width="100%" height="32" viewBox="0 0 100 32" preserveAspectRatio="none">
      {bars.map((w, i) => {
        const barX = x;
        x += w + 1;
        return i % 2 === 0 ? (
          <rect key={i} x={barX} y="0" width={w} height="32" fill={color} opacity={0.6} />
        ) : null;
      })}
    </svg>
  );
}

/* ─── Perforation Notch ──────────────────────────────────────────────── */

function PerforationNotch({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className="absolute z-10"
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: 'var(--color-sand)',
        top: '50%',
        transform: 'translateY(-50%)',
        [side]: -10,
      }}
    />
  );
}

/* ─── Status Badge ───────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  if (status === 'active') return null;

  const labels: Record<string, { text: string; bg: string; color: string }> = {
    'selling-fast': { text: 'SELLING FAST', bg: '#F75A3D', color: '#fff' },
    'sold-out': { text: 'SOLD OUT', bg: '#4A4E58', color: '#fff' },
    'early-bird': { text: 'EARLY BIRD', bg: '#FED260', color: '#0E3A2D' },
    'new-trip': { text: 'NEW', bg: '#3A6B35', color: '#fff' },
    'coming-soon': { text: 'COMING SOON', bg: '#B6D4EA', color: '#0E3A2D' },
  };

  const badge = labels[status];
  if (!badge) return null;

  return (
    <span
      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs uppercase tracking-wider z-10"
      style={{
        backgroundColor: badge.bg,
        color: badge.color,
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
      }}
    >
      {badge.text}
    </span>
  );
}

/* ─── Boarding Pass Card ─────────────────────────────────────────────── */

function BoardingPassCard({
  retreat,
  colorIndex,
}: {
  retreat: RetreatCard;
  colorIndex: number;
}) {
  const palette = PASS_COLORS[colorIndex % PASS_COLORS.length];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Link href={`/retreats/${retreat.slug}`} className="block group">
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
        style={{
          backgroundColor: palette.bg,
          boxShadow: '0 4px 16px rgba(30,25,20,0.10)',
        }}
      >
        <PerforationNotch side="left" />
        <PerforationNotch side="right" />
        <StatusBadge status={retreat.status} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill={palette.accent}>
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <span
              className="uppercase tracking-widest"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '10px',
                color: palette.accent,
              }}
            >
              SALTY Retreats
            </span>
          </div>

          {/* Destination */}
          <h3
            className="uppercase mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: palette.text,
              lineHeight: 0.95,
            }}
          >
            {retreat.name}
          </h3>

          {/* Details row */}
          <div className="flex items-baseline gap-4 mb-4">
            <div>
              <p
                className="uppercase text-xs tracking-wider opacity-60"
                style={{ fontFamily: 'var(--font-display)', color: palette.text, fontSize: '10px' }}
              >
                Duration
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: palette.text,
                }}
              >
                {retreat.totalDays} Days
              </p>
            </div>
            <div>
              <p
                className="uppercase text-xs tracking-wider opacity-60"
                style={{ fontFamily: 'var(--font-display)', color: palette.text, fontSize: '10px' }}
              >
                From
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  color: palette.accent,
                }}
              >
                ${retreat.lowestPrice?.toLocaleString() || '1,899'}
              </p>
            </div>
            {retreat.startDate && (
              <div>
                <p
                  className="uppercase text-xs tracking-wider opacity-60"
                  style={{ fontFamily: 'var(--font-display)', color: palette.text, fontSize: '10px' }}
                >
                  Dates
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: palette.text,
                    opacity: 0.8,
                  }}
                >
                  {formatDate(retreat.startDate)}
                </p>
              </div>
            )}
          </div>

          {/* Barcode */}
          <BarcodeSVG color={palette.text} />

          {/* Tagline */}
          <p
            className="mt-3 italic"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: palette.text,
              opacity: 0.6,
            }}
          >
            Life&rsquo;s too short not to take the trip.
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ─── Fallback Retreats ──────────────────────────────────────────────── */

const FALLBACK_RETREATS: RetreatCard[] = [
  { _id: 'f1', name: 'Panama', officialName: 'City to Sea', slug: 'panama', status: 'active', startDate: '2026-03-14', endDate: '2026-03-22', totalDays: 9, location: 'Panama City & Playa Venao', country: 'Panama', lowestPrice: 2249, heroImage: {} as RetreatCard['heroImage'], colorTheme: {} as RetreatCard['colorTheme'], saltyMeter: { adventure: 8, culture: 7, party: 8, sweat: 7, rest: 5 }, groupSize: { min: 20, max: 35 }, soloTravelerPercent: 65 },
  { _id: 'f2', name: 'Sri Lanka', officialName: 'Island Tides', slug: 'sri-lanka', status: 'active', startDate: '2026-02-12', endDate: '2026-02-21', totalDays: 10, location: 'South Coast', country: 'Sri Lanka', lowestPrice: 2399, heroImage: {} as RetreatCard['heroImage'], colorTheme: {} as RetreatCard['colorTheme'], saltyMeter: { adventure: 9, culture: 9, party: 6, sweat: 7, rest: 6 }, groupSize: { min: 20, max: 30 }, soloTravelerPercent: 70 },
  { _id: 'f3', name: 'Morocco', officialName: 'Beyond the Dunes', slug: 'morocco', status: 'active', startDate: '2026-05-16', endDate: '2026-05-23', totalDays: 8, location: 'Taghazout & Marrakech', country: 'Morocco', lowestPrice: 1899, heroImage: {} as RetreatCard['heroImage'], colorTheme: {} as RetreatCard['colorTheme'], saltyMeter: { adventure: 8, culture: 10, party: 6, sweat: 7, rest: 5 }, groupSize: { min: 15, max: 25 }, soloTravelerPercent: 60 },
  { _id: 'f4', name: 'Sicily', officialName: 'Endless Summer', slug: 'sicily', status: 'active', startDate: '2026-08-09', endDate: '2026-08-16', totalDays: 8, location: 'Cefalù & Palermo', country: 'Sicily', lowestPrice: 2499, heroImage: {} as RetreatCard['heroImage'], colorTheme: {} as RetreatCard['colorTheme'], saltyMeter: { adventure: 7, culture: 9, party: 9, sweat: 6, rest: 6 }, groupSize: { min: 20, max: 35 }, soloTravelerPercent: 55 },
  { _id: 'f5', name: 'El Salvador', officialName: 'Wave Rider', slug: 'el-salvador', status: 'coming-soon', startDate: '2026-11-01', endDate: '2026-11-08', totalDays: 8, location: 'El Tunco', country: 'El Salvador', lowestPrice: 1899, heroImage: {} as RetreatCard['heroImage'], colorTheme: {} as RetreatCard['colorTheme'], saltyMeter: { adventure: 9, culture: 7, party: 8, sweat: 8, rest: 4 }, groupSize: { min: 20, max: 30 }, soloTravelerPercent: 65 },
  { _id: 'f6', name: 'Costa Rica', officialName: 'Surf Sweat Flow', slug: 'costa-rica', status: 'active', startDate: '2026-01-03', endDate: '2026-01-10', totalDays: 8, location: 'Santa Teresa', country: 'Costa Rica', lowestPrice: 2199, heroImage: {} as RetreatCard['heroImage'], colorTheme: {} as RetreatCard['colorTheme'], saltyMeter: { adventure: 8, culture: 6, party: 7, sweat: 8, rest: 6 }, groupSize: { min: 20, max: 35 }, soloTravelerPercent: 65 },
];

/* ─── Main Component ─────────────────────────────────────────────────── */

interface RetreatsDestinationsProps {
  retreats: RetreatCard[];
}

export default function RetreatsDestinations({ retreats }: RetreatsDestinationsProps) {
  const displayRetreats = retreats.length > 0 ? retreats : FALLBACK_RETREATS;

  return (
    <section
      id="retreats-grid"
      style={{
        backgroundColor: 'var(--color-sand)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-4 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            Where We Go
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <p
            className="text-center mb-12 max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              color: 'var(--color-slate-grey)',
              lineHeight: 1.7,
            }}
          >
            Every trip has its own personality, but they&rsquo;re all SALTY. Pick
            based on destinations, itinerary, or just which dates work.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayRetreats.map((retreat, i) => (
            <ScrollReveal key={retreat._id} delay={i * 0.06}>
              <BoardingPassCard retreat={retreat} colorIndex={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
