'use client';

import type { SiteSettings } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

interface AboutStatsProps {
  settings: SiteSettings | null;
}

export default function AboutStats({ settings }: AboutStatsProps) {
  const stats = [
    { target: settings?.totalGuests || 200, suffix: '+', label: 'guests hosted' },
    { target: settings?.countriesCount || 7, suffix: '', label: 'countries explored' },
    { target: settings?.averageRating || 4.9, suffix: '', label: 'average rating', decimals: 1 },
    { target: 1, suffix: '', label: 'extremely active WhatsApp community' },
  ];

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
            The Numbers
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="text-center">
                <p
                  className="uppercase"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(40px, 6vw, 72px)',
                    color: 'var(--color-golden)',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={1.8}
                    decimals={stat.decimals || 0}
                  />
                </p>
                <p
                  className="mt-2 uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--color-sand)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
