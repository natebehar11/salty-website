'use client';

import type { SiteSettings } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface RetreatsStatsProps {
  settings: SiteSettings | null;
}

export default function RetreatsStats({ settings }: RetreatsStatsProps) {
  const stats = [
    { value: settings?.totalGuests ? `${settings.totalGuests}+` : '200+', label: 'Happy Guests' },
    { value: settings?.countriesCount?.toString() || '7', label: 'Countries' },
    { value: settings?.soloTravelerPercent ? `${settings.soloTravelerPercent}%` : '65%', label: 'Solo Travelers' },
    { value: settings?.averageRating?.toString() || '4.9', label: 'Avg Rating' },
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
            By the Numbers
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
                  {stat.value}
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

        {/* Solo traveler callout */}
        <ScrollReveal delay={0.3}>
          <div className="mt-14 max-w-2xl mx-auto text-center">
            <h3
              className="uppercase mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 3vw, 28px)',
                color: 'var(--color-paper-white)',
              }}
            >
              Most Guests Come Solo
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.5vw, 16px)',
                color: 'var(--color-sand)',
                lineHeight: 1.7,
              }}
            >
              By day one, you&rsquo;ll be in a WhatsApp group with your crew. By
              day two, you&rsquo;ll have inside jokes. By the end of the week,
              you&rsquo;ll be planning reunions. The group chat doesn&rsquo;t end
              when the trip does.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
