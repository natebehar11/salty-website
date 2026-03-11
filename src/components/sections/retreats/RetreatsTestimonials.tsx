'use client';

import type { Testimonial } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Link from 'next/link';

/* ─── Fallback Testimonials ──────────────────────────────────────────── */

const FALLBACK_QUOTES: Testimonial[] = [
  {
    _id: 'ft1',
    guestName: 'Sarah M.',
    city: 'Toronto',
    year: 2024,
    quote:
      'I went solo and came home with 20 new friends. The workouts were tough but fun, and the vibe was electric.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Costa Rica',
  },
  {
    _id: 'ft2',
    guestName: 'James K.',
    city: 'London',
    year: 2024,
    quote:
      'Best trip I\'ve ever taken. The coaches are amazing, the group was incredible, and Panama is paradise.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Panama',
  },
  {
    _id: 'ft3',
    guestName: 'Megan L.',
    city: 'Austin',
    year: 2024,
    quote:
      'The balance of fitness and fun is perfect. Not too intense, not too chill. Just right.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Sicily',
  },
];

/* ─── Highlight Marker ───────────────────────────────────────────────── */

const ACCENT_COLORS = ['var(--color-golden)', 'var(--color-coral)', 'var(--color-aquamarine)'];

function HighlightedQuote({
  quote,
  accentColor,
}: {
  quote: string;
  accentColor: string;
}) {
  const words = quote.split(' ');
  const highlightEnd = Math.min(6, words.length);
  const highlighted = words.slice(0, highlightEnd).join(' ');
  const rest = words.slice(highlightEnd).join(' ');

  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(17px, 2vw, 22px)',
        color: 'var(--color-paper-white)',
        lineHeight: 1.5,
      }}
    >
      <span className="relative inline">
        <span
          className="absolute inset-0 -skew-x-1"
          style={{
            backgroundColor: accentColor,
            opacity: 0.3,
            borderRadius: '3px',
            top: '2px',
            bottom: '2px',
            left: '-3px',
            right: '-3px',
          }}
        />
        <span className="relative">&ldquo;{highlighted}</span>
      </span>{' '}
      {rest}&rdquo;
    </p>
  );
}

/* ─── Component ──────────────────────────────────────────────────────── */

interface RetreatsTestimonialsProps {
  testimonials: Testimonial[];
}

export default function RetreatsTestimonials({ testimonials }: RetreatsTestimonialsProps) {
  const displayQuotes = testimonials.length > 0 ? testimonials.slice(0, 3) : FALLBACK_QUOTES;

  return (
    <section
      style={{
        backgroundColor: 'var(--color-teal)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1100 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-14 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            What People Say
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-12">
          {displayQuotes.map((testimonial, i) => {
            const isEven = i % 2 === 0;
            const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];

            return (
              <ScrollReveal key={testimonial._id} delay={i * 0.08}>
                <div
                  className={`max-w-2xl ${isEven ? '' : 'ml-auto'}`}
                >
                  <HighlightedQuote quote={testimonial.quote} accentColor={accent} />
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className="w-1 rounded-full"
                      style={{ height: 32, backgroundColor: accent }}
                    />
                    <div>
                      <p
                        className="uppercase tracking-wider"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '13px',
                          color: 'var(--color-paper-white)',
                        }}
                      >
                        {testimonial.guestName}
                      </p>
                      {testimonial.retreatName && (
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            color: 'var(--color-sand)',
                            opacity: 0.7,
                          }}
                        >
                          {testimonial.retreatName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/reviews"
              className="uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-coral)',
              }}
            >
              Read More Reviews →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
