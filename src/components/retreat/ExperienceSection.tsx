'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface ExperienceSectionProps {
  destination: string;
  duration: number;
  narrative: string[];
  narrativeImages?: string[];
  forYouIf: string[];
  bestFor: string[];
  maybeNotFor: string[];
  accentColor?: string;
  className?: string;
}

function EditorialBlock({
  text,
  imageUrl,
  imageAlt,
  reverse = false,
}: {
  text: string;
  imageUrl?: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imgRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  if (!imageUrl) {
    return (
      <ScrollReveal>
        <p
          className="leading-relaxed max-w-2xl"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-body-lg)',
            color: 'var(--color-slate-grey)',
            lineHeight: 1.8,
          }}
        >
          {text}
        </p>
      </ScrollReveal>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className={`${reverse ? 'lg:order-2' : 'lg:order-1'} order-2`}>
        <ScrollReveal delay={reverse ? 0.12 : 0}>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-lg)',
              color: 'var(--color-slate-grey)',
              lineHeight: 1.8,
            }}
          >
            {text}
          </p>
        </ScrollReveal>
      </div>

      <div
        ref={imgRef}
        className={`${reverse ? 'lg:order-1' : 'lg:order-2'} order-1`}
      >
        <div
          className="overflow-hidden rounded-2xl"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <motion.img
            src={imageUrl}
            alt={imageAlt}
            className="w-full object-cover"
            style={{ aspectRatio: '4/3' }}
            initial={shouldReduceMotion ? undefined : { scale: 1.08, opacity: 0.7 }}
            animate={isInView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function PullQuote({
  text,
  accentColor,
}: {
  text: string;
  accentColor: string;
}) {
  return (
    <ScrollReveal>
      <div
        className="relative rounded-2xl py-12 lg:py-16 px-8 lg:px-16 my-12 lg:my-20 text-center"
        style={{
          backgroundColor: 'var(--color-surface-warm-light)',
        }}
      >
        {/* Accent bar at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 64,
            height: 4,
            backgroundColor: accentColor,
            opacity: 0.6,
          }}
        />

        <span
          className="block mb-4 select-none"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            lineHeight: 0.6,
            color: accentColor,
            opacity: 0.35,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <p
          className="italic max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            lineHeight: 1.7,
            color: 'var(--color-teal)',
            fontWeight: 400,
          }}
        >
          {text}
        </p>

        <span
          className="block mt-4 select-none"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            lineHeight: 0.4,
            color: accentColor,
            opacity: 0.35,
          }}
          aria-hidden="true"
        >
          &rdquo;
        </span>
      </div>
    </ScrollReveal>
  );
}

function StaggeredCheckList({
  items,
  accentColor,
}: {
  items: string[];
  accentColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item}
          className="flex items-start gap-4 rounded-xl p-4"
          style={{ backgroundColor: 'var(--color-surface-warm-light)' }}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
          transition={{
            delay: i * 0.07,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="shrink-0 mt-0.5 relative" style={{ width: 28, height: 28 }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="14" fill="var(--color-aquamarine)" opacity="0.25" />
              <path
                d="M9 14.5L12 17.5L19 10.5"
                stroke="var(--color-teal)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-base)',
              color: 'var(--color-teal)',
              lineHeight: 1.5,
            }}
          >
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ComparisonCards({
  bestFor,
  maybeNotFor,
}: {
  bestFor: string[];
  maybeNotFor: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <ScrollReveal delay={0}>
        <div
          className="rounded-2xl p-6 lg:p-8 h-full"
          style={{
            backgroundColor: 'var(--color-surface-warm-light)',
            borderBottom: '4px solid var(--color-aquamarine)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 36,
                height: 36,
                backgroundColor: 'var(--color-aquamarine)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9.5L7 12.5L14 5.5" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h4)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              Best For
            </h4>
          </div>
          <ul className="space-y-3">
            {bestFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span
                  className="shrink-0 mt-1"
                  style={{ color: 'var(--color-aquamarine)', fontSize: '1.1em', fontWeight: 700 }}
                >
                  &#10003;
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-base)',
                    color: 'var(--color-teal)',
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div
          className="rounded-2xl p-6 lg:p-8 h-full"
          style={{
            backgroundColor: 'var(--color-surface-warm-light)',
            borderBottom: '4px solid var(--color-rose-stone)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 36,
                height: 36,
                backgroundColor: 'var(--color-rose-stone)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M5 5L13 13M13 5L5 13" stroke="var(--color-paper-white)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <h4
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h4)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              Maybe Not For You
            </h4>
          </div>
          <ul className="space-y-3">
            {maybeNotFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span
                  className="shrink-0 mt-1"
                  style={{ color: 'var(--color-rose-stone)', fontSize: '1.1em', fontWeight: 700 }}
                >
                  &#10007;
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-base)',
                    color: 'var(--color-slate-grey)',
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function ExperienceSection({
  destination,
  duration,
  narrative,
  narrativeImages = [],
  forYouIf,
  bestFor,
  maybeNotFor,
  accentColor = 'var(--retreat-accent, var(--color-coral))',
  className = '',
}: ExperienceSectionProps) {
  const hasThreeOrMoreParagraphs = narrative.length >= 3;
  const editorialParagraphs = hasThreeOrMoreParagraphs
    ? narrative.slice(0, 2)
    : narrative.slice(0, 1);
  const pullQuoteText = hasThreeOrMoreParagraphs
    ? narrative[2]
    : null;
  const remainingParagraphs = hasThreeOrMoreParagraphs
    ? narrative.slice(3)
    : narrative.slice(editorialParagraphs.length);

  return (
    <div className={className}>
      <div className="mx-auto" style={{ maxWidth: 'var(--space-container-max)' }}>
        {/* ────────── Section Header ────────── */}
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-20">
            <span
              className="uppercase tracking-widest block mb-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-label)',
                color: accentColor,
                fontWeight: 500,
                letterSpacing: '0.15em',
              }}
            >
              The Experience
            </span>
            <h2
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              {duration} Days in {destination}
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-lg)',
                color: 'var(--color-slate-grey)',
              }}
            >
              What to expect when the ordinary stops applying
            </p>
          </div>
        </ScrollReveal>

        {/* ────────── Editorial Narrative Blocks ────────── */}
        <div className="space-y-12 lg:space-y-24">
          {editorialParagraphs.map((para, i) => (
            <EditorialBlock
              key={i}
              text={para}
              imageUrl={narrativeImages[i]}
              imageAlt={`${destination} retreat experience — ${i === 0 ? 'culture and city life' : 'surf and coastline'}`}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        {/* ────────── Pull Quote ────────── */}
        {pullQuoteText && (
          <PullQuote text={pullQuoteText} accentColor={accentColor} />
        )}

        {/* ────────── Remaining Paragraphs (if any beyond 3) ────────── */}
        {remainingParagraphs.length > 0 && (
          <div className="max-w-3xl mx-auto mt-8 lg:mt-12">
            {remainingParagraphs.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <p
                  className="leading-relaxed mb-5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-lg)',
                    color: 'var(--color-slate-grey)',
                    lineHeight: 1.8,
                  }}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* ────────── "This Retreat is For You If..." ────────── */}
        <div className="mt-16 lg:mt-24">
          <ScrollReveal>
            <div className="text-center mb-8 lg:mb-12">
              <h3
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--type-h3)',
                  color: 'var(--color-teal)',
                  letterSpacing: '-0.03em',
                }}
              >
                This Retreat is For You If&hellip;
              </h3>
              <div
                className="mx-auto mt-4"
                style={{
                  width: 48,
                  height: 3,
                  backgroundColor: accentColor,
                  borderRadius: 'var(--radius-badge)',
                }}
              />
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <StaggeredCheckList items={forYouIf} accentColor={accentColor} />
          </div>
        </div>

        {/* ────────── Best For / Maybe Not For ────────── */}
        <div className="mt-16 lg:mt-24 max-w-4xl mx-auto">
          <ComparisonCards bestFor={bestFor} maybeNotFor={maybeNotFor} />
        </div>
      </div>
    </div>
  );
}
