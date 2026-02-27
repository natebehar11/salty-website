'use client';

import { urlFor } from '@/lib/sanity/image';
import type { SanityImage } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

type DestinationSummary = {
  _id: string;
  country: string;
  slug: string;
  heroImage: SanityImage;
  vibeSummary: string;
  retreats: { _id: string; name: string; status: string }[];
};

interface DestinationsIndexClientProps {
  destinations: DestinationSummary[];
}

// Placeholders when Sanity is empty
const PLACEHOLDER_DESTINATIONS = [
  { country: 'Costa Rica', slug: 'costa-rica', vibe: 'Surf, jungle, pura vida energy', color: '#0E3A2D' },
  { country: 'Panama', slug: 'panama', vibe: 'Island hopping, Caribbean warmth', color: '#1A4D3E' },
  { country: 'Morocco', slug: 'morocco', vibe: 'Desert, souks, Atlas Mountains', color: '#8B3A1D' },
  { country: 'Sicily', slug: 'sicily', vibe: 'Mediterranean coast, history, food', color: '#1A3D5C' },
  { country: 'El Salvador', slug: 'el-salvador', vibe: 'Surf, volcanoes, raw adventure', color: '#0F3B2F' },
  { country: 'Sri Lanka', slug: 'sri-lanka', vibe: 'Temples, tea country, wildlife', color: '#2D5A27' },
];

export default function DestinationsIndexClient({ destinations }: DestinationsIndexClientProps) {
  const hasData = destinations.length > 0;

  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{ minHeight: '50vh', backgroundColor: '#0E3A2D' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-16">
          <ScrollReveal>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 7vw, 64px)',
                color: '#F7F4ED',
                lineHeight: 1.1,
              }}
            >
              Destinations
            </h1>
            <p
              className="mt-4 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              Every SALTY destination is hand-picked for adventure, culture, and
              incredible fitness experiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── DESTINATION GRID ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          {hasData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, i) => (
                <ScrollReveal key={dest._id} delay={i * 0.05}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(30,25,20,0.06)',
                    }}
                  >
                    {dest.heroImage ? (
                      <img
                        src={urlFor(dest.heroImage).width(600).height(400).url()}
                        alt={dest.country}
                        className="w-full object-cover"
                        style={{ aspectRatio: '3/2' }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center"
                        style={{ aspectRatio: '3/2', backgroundColor: '#0E3A2D' }}
                      >
                        <span style={{ color: '#F7F4ED', opacity: 0.3, fontFamily: 'var(--font-display)', fontSize: '28px' }}>
                          {dest.country}
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <h2
                        className="uppercase mb-1"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '22px',
                          color: '#0E3A2D',
                        }}
                      >
                        {dest.country}
                      </h2>
                      <p
                        className="mb-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: '#4A4E58',
                        }}
                      >
                        {dest.vibeSummary}
                      </p>
                      {dest.retreats?.length > 0 && (
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            color: '#F75A3D',
                          }}
                        >
                          {dest.retreats.filter((r) => r.status !== 'past').length} active retreat{dest.retreats.filter((r) => r.status !== 'past').length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Placeholders */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLACEHOLDER_DESTINATIONS.map((dest, i) => (
                <ScrollReveal key={dest.slug} delay={i * 0.05}>
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(30,25,20,0.06)',
                    }}
                  >
                    <div
                      className="w-full flex items-center justify-center"
                      style={{ aspectRatio: '3/2', backgroundColor: dest.color }}
                    >
                      <span
                        className="uppercase opacity-30"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '28px',
                          color: '#F7F4ED',
                        }}
                      >
                        {dest.country}
                      </span>
                    </div>
                    <div className="p-5">
                      <h2
                        className="uppercase mb-1"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '22px',
                          color: '#0E3A2D',
                        }}
                      >
                        {dest.country}
                      </h2>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: '#4A4E58',
                        }}
                      >
                        {dest.vibe}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
