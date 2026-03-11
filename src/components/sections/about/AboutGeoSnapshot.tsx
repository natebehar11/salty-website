'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import Image from 'next/image';

export default function AboutGeoSnapshot() {
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
        {/* ── Left: Photo bleed (58%) ── */}
        <div className="relative lg:w-[58%] flex-shrink-0">
          <ScrollReveal>
            <div
              className="overflow-hidden rounded-[20px] border-[6px] border-[var(--color-coral)] lg:rounded-l-none lg:rounded-r-[20px] lg:border-l-0"
            >
              <Image
                src="/images/retreat/guys-laughing.png"
                alt="SALTY founders and guests laughing together"
                width={840}
                height={560}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '3/2' }}
                priority
              />
            </div>
          </ScrollReveal>
        </div>

        {/* ── Right: GEO Snapshot body ── */}
        <div
          className="lg:w-[42%] flex flex-col justify-center px-6 lg:pl-12 lg:pr-16 py-10 lg:py-0"
        >
          <ScrollReveal delay={0.1}>
            <h2
              className="uppercase mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              SALTY Snapshot
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 2vw, 17px)',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.7,
              }}
            >
              SALTY Retreats was founded by Erin Harris and Nate Behar &mdash; a
              yoga studio owner and former pro athlete who burned out on the
              hustle and needed a rude reminder that fun is the point of this
              life. Since 2023, we&apos;ve hosted 200+ guests across seven
              countries on fitness retreats that blend workouts, yoga, surf,
              adventure, and community. We believe fun isn&apos;t a reward for
              being healthy &mdash; fun IS what makes you healthy.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
