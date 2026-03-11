'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import Image from 'next/image';

/* ─── Stats Row ──────────────────────────────────────────────────────── */

const STATS = [
  { value: '7', label: 'Countries' },
  { value: '7–10', label: 'Day Trips' },
  { value: '20–35', label: 'Guests' },
  { value: '$1,899+', label: 'Per Person' },
];

/* ─── Component ───────────────────────────────────────────────────────── */

export default function SaltySnapshot() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row items-stretch gap-0"
        style={{ maxWidth: 1400 }}
      >
        {/* ── Left: Photo bleed (60%) ── */}
        <div className="relative lg:w-[58%] flex-shrink-0">
          <ScrollReveal>
            <div className="relative">
              <div
                className="overflow-hidden rounded-[20px] border-[6px] border-[var(--color-coral)] lg:rounded-l-none lg:rounded-r-[20px] lg:border-l-0"
              >
                <Image
                  src="/images/retreat/palapa-laughing.png"
                  alt="SALTY retreat guests laughing together under a palapa"
                  width={840}
                  height={560}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '3/2' }}
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Right: Content (40%) ── */}
        <div
          className="lg:w-[42%] flex flex-col justify-center px-6 lg:pl-12 lg:pr-16 py-10 lg:py-0"
        >
          <ScrollReveal delay={0.1}>
            <h2
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              The SALTY
              <br />
              Snapshot
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p
              className="mt-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.7,
              }}
            >
              SALTY runs group fitness retreats across seven countries and
              counting. Each day includes 2–3 activities — workouts, yoga, surf
              lessons, excursions, and expert-led workshops — for groups of
              20–35 guests over 7–10 days.
            </p>
            <p
              className="mt-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.7,
              }}
            >
              We get a great mix of solo travellers, couples, and friend groups,
              all looking for the same thing: wellness travel for people who
              haven&apos;t forgotten how to have fun.
            </p>
          </ScrollReveal>

          {/* Quick-stat grid */}
          <ScrollReveal delay={0.2}>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      color: 'var(--color-coral)',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="mt-1 uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'var(--color-teal)',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
