'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import Image from 'next/image';

export default function RetreatsGeoDefinition() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* ── The Direct Truth ── */}
        <div className="flex flex-col lg:flex-row items-center" style={{ gap: 'clamp(24px, 4vw, 48px)' }}>
          {/* Text side */}
          <div className="w-full lg:w-[55%]">
            <ScrollReveal>
              <h2
                className="uppercase mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  color: 'var(--color-teal)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                The Direct Truth
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <p
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.5vw, 17px)',
                  color: 'var(--color-slate-grey)',
                  lineHeight: 1.7,
                }}
              >
                If you&rsquo;re looking for silent meditation retreats, juice
                cleanses, or seven days of whispering in white linen — we&rsquo;re
                not it. No shade. That world exists for a reason. But it&rsquo;s not
                this world.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.5vw, 17px)',
                  color: 'var(--color-slate-grey)',
                  lineHeight: 1.7,
                }}
              >
                SALTY retreats are for people who want to move their bodies,
                explore new places, eat real food, have a drink if they want one,
                stay up too late with new friends, and come home feeling genuinely
                alive.
              </p>
            </ScrollReveal>

            {/* Pull quote */}
            <ScrollReveal delay={0.14}>
              <blockquote
                className="my-8"
                style={{
                  borderLeft: '4px solid var(--color-coral)',
                  paddingLeft: 'clamp(16px, 3vw, 28px)',
                }}
              >
                <p
                  className="uppercase italic"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 3vw, 32px)',
                    color: 'var(--color-teal)',
                    lineHeight: 1.2,
                  }}
                >
                  &ldquo;Fun is the point. Not a side effect.&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          </div>

          {/* Photo side */}
          <div className="w-full lg:w-[45%]">
            <ScrollReveal delay={0.1}>
              <div
                className="relative overflow-hidden rounded-lg"
                style={{
                  border: '5px solid var(--color-coral)',
                  borderRight: 'none',
                }}
              >
                <Image
                  src="/images/retreat/erin-pool.png"
                  alt="Fun wellness retreat moment"
                  width={560}
                  height={420}
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── This Is Wellness, SALTY Style ── */}
        <div className="mt-16 max-w-3xl">
          <ScrollReveal>
            <h3
              className="uppercase mb-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: 'var(--color-teal)',
                lineHeight: 1.1,
              }}
            >
              This Is Wellness, SALTY Style
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p
              className="mb-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.7,
              }}
            >
              Every SALTY retreat blends movement, adventure, culture, and
              community into something that feels less like a &ldquo;wellness
              program&rdquo; and more like the best week of your year.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.7,
              }}
            >
              You&rsquo;ll sweat. You&rsquo;ll explore. You&rsquo;ll try things
              you&rsquo;ve never tried. You&rsquo;ll eat incredible food without
              counting a single macro. You&rsquo;ll meet people who feel like old
              friends by day two. And you&rsquo;ll come home stronger, clearer,
              and wondering why every vacation isn&rsquo;t like this.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
