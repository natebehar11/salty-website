'use client';

import type { RetreatCard } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface BookClientProps {
  retreats: RetreatCard[];
}

const WHATSAPP_URL = `https://wa.me/14318291135?text=${encodeURIComponent('Hey SALTY! I want to book a retreat.')}`;

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const yearOpts: Intl.DateTimeFormatOptions = { ...opts, year: 'numeric' };
  if (s.getFullYear() === e.getFullYear()) {
    return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
  }
  return `${s.toLocaleDateString('en-US', yearOpts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
}

// Placeholder retreats when Sanity is empty
const PLACEHOLDER_RETREATS: RetreatCard[] = [
  {
    _id: 'b1', name: 'Panama', officialName: 'SALTY Panama', slug: 'panama-fitness-retreat',
    status: 'active', startDate: '2025-11-15', endDate: '2025-11-22', totalDays: 7,
    location: 'Bocas del Toro', country: 'Panama', lowestPrice: 2200,
    groupSize: { min: 20, max: 35 }, soloTravelerPercent: 65, spotsRemaining: 12,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#2A6B5A', secondary: '#E8C4A0', accent: '#FF6B35', surface: '#F5EEE6', dark: '#1A4D3E', textOnAccent: '#FFFFFF', ticketTextColor: '#1A4D3E' },
    saltyMeter: { adventure: 9, culture: 7, party: 8, sweat: 7, rest: 6 },
  },
  {
    _id: 'b2', name: 'Morocco', officialName: 'SALTY Morocco', slug: 'morocco-fitness-retreat',
    status: 'selling-fast', startDate: '2026-03-08', endDate: '2026-03-15', totalDays: 7,
    location: 'Marrakech & Atlas Mountains', country: 'Morocco', lowestPrice: 2400,
    groupSize: { min: 20, max: 30 }, soloTravelerPercent: 70, spotsRemaining: 6,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#C1562C', secondary: '#F2D8A8', accent: '#E8A838', surface: '#FDF5EB', dark: '#8B3A1D', textOnAccent: '#FFFFFF', ticketTextColor: '#8B3A1D' },
    saltyMeter: { adventure: 8, culture: 10, party: 6, sweat: 7, rest: 7 },
  },
  {
    _id: 'b3', name: 'Sicily', officialName: 'SALTY Sicily', slug: 'sicily-fitness-retreat',
    status: 'early-bird', startDate: '2026-05-10', endDate: '2026-05-17', totalDays: 7,
    location: 'Taormina', country: 'Italy', lowestPrice: 2600,
    groupSize: { min: 20, max: 30 }, soloTravelerPercent: 60, spotsRemaining: 18,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#2B5F8A', secondary: '#F5D5B5', accent: '#E65C3A', surface: '#FFF8F0', dark: '#1A3D5C', textOnAccent: '#FFFFFF', ticketTextColor: '#1A3D5C' },
    saltyMeter: { adventure: 7, culture: 9, party: 8, sweat: 6, rest: 8 },
  },
  {
    _id: 'b4', name: 'El Salvador', officialName: 'SALTY El Salvador', slug: 'el-salvador-fitness-retreat',
    status: 'new-trip', startDate: '2026-01-18', endDate: '2026-01-25', totalDays: 7,
    location: 'El Zonte & El Tunco', country: 'El Salvador', lowestPrice: 1900,
    groupSize: { min: 20, max: 35 }, soloTravelerPercent: 72, spotsRemaining: 22,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#1B5E4B', secondary: '#F0DCC0', accent: '#F7941D', surface: '#F7F2EB', dark: '#0F3B2F', textOnAccent: '#FFFFFF', ticketTextColor: '#0F3B2F' },
    saltyMeter: { adventure: 10, culture: 7, party: 9, sweat: 8, rest: 5 },
  },
];

export default function BookClient({ retreats }: BookClientProps) {
  const displayRetreats = retreats.length > 0 ? retreats : PLACEHOLDER_RETREATS;
  const bookableRetreats = displayRetreats.filter((r) => r.status !== 'sold-out');

  return (
    <main>
      {/* ── 1. HERO ── */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{ minHeight: '45vh', backgroundColor: '#0E3A2D' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-12">
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
              Book Your Retreat
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
              Pick a trip, choose your room, and lock in your spot with a deposit.
              Flexible payment plans on all retreats.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 2. RETREAT BOOKING CARDS ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="flex flex-col gap-6">
            {bookableRetreats.map((retreat, i) => {
              const isSoldOut = retreat.status === 'sold-out';
              const isComingSoon = retreat.status === 'coming-soon';
              const dates = formatDateRange(retreat.startDate, retreat.endDate);

              return (
                <ScrollReveal key={retreat._id} delay={i * 0.05}>
                  <div
                    className="rounded-2xl overflow-hidden flex flex-col md:flex-row"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 16px rgba(30,25,20,0.06), 0 1px 4px rgba(30,25,20,0.04)',
                    }}
                  >
                    {/* Image */}
                    <div className="md:w-2/5 shrink-0">
                      {retreat.heroImage ? (
                        <img
                          src={urlFor(retreat.heroImage).width(500).height(350).url()}
                          alt={retreat.name}
                          className="w-full h-full object-cover"
                          style={{ minHeight: 200 }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            minHeight: 200,
                            backgroundColor: retreat.colorTheme.dark,
                          }}
                        >
                          <span
                            className="uppercase tracking-wider opacity-30"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '28px',
                              color: '#F7F4ED',
                            }}
                          >
                            {retreat.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h2
                            className="uppercase"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(20px, 3vw, 28px)',
                              color: '#0E3A2D',
                              lineHeight: 1.2,
                            }}
                          >
                            {retreat.officialName}
                          </h2>
                          {retreat.spotsRemaining && retreat.spotsRemaining <= 10 && (
                            <span
                              className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: '#FED260',
                                color: '#0E3A2D',
                                fontFamily: 'var(--font-body)',
                                fontSize: '11px',
                              }}
                            >
                              {retreat.spotsRemaining} spots left
                            </span>
                          )}
                        </div>

                        <p
                          className="mb-1"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: '#4A4E58',
                          }}
                        >
                          {retreat.location} · {dates}
                        </p>
                        <p
                          className="mb-4"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: '#4A4E58',
                          }}
                        >
                          {retreat.totalDays} days · Group of {retreat.groupSize.min}–{retreat.groupSize.max}
                        </p>

                        <p
                          className="mb-4"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#0E3A2D',
                          }}
                        >
                          From ${retreat.lowestPrice.toLocaleString()}
                          <span className="text-sm font-normal ml-1" style={{ color: '#4A4E58' }}>
                            USD
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        {isComingSoon ? (
                          <Link href={`/retreats/${retreat.slug}`}>
                            <Button variant="secondary">
                              View Trip Details
                            </Button>
                          </Link>
                        ) : (
                          <>
                            <Link href={`/retreats/${retreat.slug}`}>
                              <Button
                                variant="retreat"
                                retreatAccent={retreat.colorTheme.accent}
                              >
                                {isSoldOut ? 'Join Waitlist' : 'Book Now'}
                              </Button>
                            </Link>
                            <Link href={`/retreats/${retreat.slug}`}>
                              <Button variant="secondary">
                                View Details
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="right" />

      {/* ── 3. NEED HELP? ── */}
      <section className="py-16 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 40px)',
                color: '#F7F4ED',
              }}
            >
              Not Sure Yet?
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              No pressure. Send us a message and we&apos;ll help you figure out
              which retreat is the best fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Chat With Us
                </Button>
              </a>
              <Link href="/retreats">
                <Button variant="secondary" size="lg">
                  Compare Retreats
                </Button>
              </Link>
            </div>
            <p
              className="mt-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'rgba(231,215,192,0.5)',
              }}
            >
              All trips booked through Movement Travel, TICO Reg. #50026098
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
