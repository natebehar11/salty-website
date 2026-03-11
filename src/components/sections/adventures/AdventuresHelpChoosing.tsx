'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import ScrollReveal from '@/components/shared/ScrollReveal';

/* ─── Help Tiles ─────────────────────────────────────────────────────── */

const HELP_TILES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="var(--color-golden)" strokeWidth="2" />
        <path d="M12 14l4 4 4-4" stroke="var(--color-golden)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'First Timer?',
    body: 'Our most popular trips for newbies are Panama and Costa Rica — surfing, sunshine, and instant community.',
    cta: 'See Beginner-Friendly Trips',
    href: '/fitness-retreats',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3.09 6.26L26 11.27l-5 4.87 1.18 6.88L16 19.77l-6.18 3.25L11 16.14l-5-4.87 6.91-1.01L16 4z" stroke="var(--color-golden)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Going Solo?',
    body: 'Over 60% of our guests come alone. You\'ll arrive solo and leave with lifelong friends.',
    cta: 'Read Solo Travel Stories',
    href: '/reviews',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="3" stroke="var(--color-golden)" strokeWidth="2" />
        <path d="M4 14h24" stroke="var(--color-golden)" strokeWidth="2" />
        <circle cx="10" cy="20" r="2" fill="var(--color-golden)" />
      </svg>
    ),
    title: 'Budget Questions?',
    body: 'Every retreat is all-inclusive: accommodation, meals, activities, coaching, and airport transfers.',
    cta: 'See What\'s Included',
    href: '/fitness-retreats#inclusions',
  },
];

/* ─── Section ────────────────────────────────────────────────────────── */

export default function AdventuresHelpChoosing() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--color-teal)',
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
              fontSize: 'var(--type-h2)',
              color: 'var(--color-golden)',
              lineHeight: 1,
            }}
          >
            NEED HELP CHOOSING?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            className="text-center max-w-2xl mx-auto mb-12"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-lg)',
              color: 'var(--color-paper-white)',
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            Everyone&apos;s ideal trip looks different. Here are a few starting points.
          </p>
        </ScrollReveal>

        {/* Help Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HELP_TILES.map((tile, i) => (
            <ScrollReveal key={tile.title} delay={i * 0.1}>
              <div
                className="flex flex-col p-6 lg:p-8 h-full"
                style={{
                  backgroundColor: 'var(--color-surface-dark-raised)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid rgba(247, 244, 237, 0.08)',
                }}
              >
                {/* Icon */}
                <div className="mb-4">{tile.icon}</div>

                {/* Title */}
                <h3
                  className="uppercase mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h4)',
                    color: 'var(--color-paper-white)',
                    lineHeight: 1.1,
                  }}
                >
                  {tile.title}
                </h3>

                {/* Body */}
                <p
                  className="flex-1 mb-5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-base)',
                    color: 'var(--color-paper-white)',
                    opacity: 0.75,
                    lineHeight: 1.6,
                  }}
                >
                  {tile.body}
                </p>

                {/* CTA Link */}
                <Link
                  href={tile.href}
                  className="inline-flex items-center gap-1.5 group"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-sm)',
                    fontWeight: 700,
                    color: 'var(--color-golden)',
                    textDecoration: 'none',
                  }}
                >
                  <span className="group-hover:underline">{tile.cta}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="translate-y-px">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <ScrollReveal delay={0.35}>
          <div className="flex flex-col items-center mt-12 gap-3">
            <p
              className="text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-base)',
                color: 'var(--color-paper-white)',
                opacity: 0.7,
              }}
            >
              Still not sure? Chat with us — we&apos;ll help you find the perfect trip.
            </p>
            <Link href="https://wa.me/14318291135" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="md">
                Chat With Us
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
