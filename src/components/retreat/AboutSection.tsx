'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';

/* ─── Quick Facts Bar — sits above the narrative ─────────────────────────── */

function QuickFactsBar({ facts }: { facts: RetreatData['quickFacts'] }) {
  return (
    <ScrollReveal>
      <div
        className="mx-auto"
        style={{
          maxWidth: 'var(--space-container-max)',
          paddingLeft: 'var(--space-section-x)',
          paddingRight: 'var(--space-section-x)',
          paddingBottom: 'clamp(32px, 5vw, 56px)',
        }}
      >
        <div
          className="flex flex-wrap justify-center gap-x-0 gap-y-0"
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(14,58,45,0.08)',
          }}
        >
          {facts.map((fact, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center"
              style={{
                flex: '1 1 0',
                minWidth: 140,
                padding: '20px 12px',
                backgroundColor: 'var(--color-surface-warm-light)',
                borderRight: i < facts.length - 1 ? '1px solid rgba(14,58,45,0.06)' : 'none',
              }}
            >
              <span
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: theme.primary,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  marginBottom: 4,
                  opacity: 0.5,
                }}
              >
                {fact.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  color: theme.primary,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ─── SaltySnapshot-style layout: photo bleed left, content right ───────── */

export default function AboutSection({ retreat }: { retreat: RetreatData }) {
  const experienceImage = retreat.experienceImageUrl || retreat.heroImageUrl;

  return (
    <section
      id="retreat-about"
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      {/* Quick facts — above the narrative for scanability */}
      <QuickFactsBar facts={retreat.quickFacts} />

      <div
        className="mx-auto flex flex-col lg:flex-row items-stretch gap-0"
        style={{ maxWidth: 1400 }}
      >
        {/* Left: Photo bleed (58%) */}
        <div className="relative lg:w-[58%] flex-shrink-0">
          <ScrollReveal>
            <div
              className="overflow-hidden rounded-[20px] border-[6px] lg:rounded-l-none lg:rounded-r-[20px] lg:border-l-0"
              style={{ borderColor: theme.accent }}
            >
              <Image
                src={experienceImage}
                alt={`${retreat.destination} fitness retreat experience`}
                width={840}
                height={560}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '3/2' }}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Narrative only (42%) */}
        <div className="lg:w-[42%] flex flex-col justify-center px-6 lg:pl-12 lg:pr-16 py-10 lg:py-0">
          <ScrollReveal delay={0.1}>
            <h2
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: theme.primary,
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              About the Retreat
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-6 space-y-4">
              {retreat.experienceNarrative.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'var(--color-slate-grey)',
                    lineHeight: 1.7,
                  }}
                >
                  {para}
                </p>
              ))}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--color-slate-grey)',
                  lineHeight: 1.7,
                }}
              >
                <em>
                  Want the full vibe check?{' '}
                  <a
                    href="#retreat-salty-meter"
                    style={{ color: theme.accent, textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    See {retreat.destination}&apos;s SALTY Meter
                  </a>
                </em>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
