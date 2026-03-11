'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AnchorStarBadge from '@/components/shared/AnchorStarBadge';

/* ─── Hero Section ───────────────────────────────────────────────────── */

export default function AdventuresHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.65]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        minHeight: '70vh',
        backgroundColor: 'var(--color-sky)',
      }}
    >
      {/* Parallax Photo Background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%]"
        style={{ y: shouldReduceMotion ? 0 : imgY }}
      >
        <img
          src="/images/retreat/hero-champagne.png"
          alt="SALTY Retreats group celebrating on the beach at sunset"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: shouldReduceMotion ? 0.4 : overlayOpacity,
          background: 'linear-gradient(180deg, rgba(183,213,234,0.6) 0%, rgba(247,244,237,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 md:py-32 max-w-4xl mx-auto">
        {/* Anchor star */}
        <ScrollReveal delay={0.1}>
          <AnchorStarBadge
            text="7 COUNTRIES"
            size={120}
            starColor="var(--color-golden)"
            textColor="var(--color-teal)"
            className="mb-6"
          />
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.2}>
          <h1
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 0.95,
              color: 'var(--color-coral)',
              letterSpacing: '-0.01em',
            }}
          >
            WHERE WE&apos;RE{' '}
            <span style={{ color: 'var(--color-teal)' }}>HEADED</span>
          </h1>
        </ScrollReveal>

        {/* Subhead */}
        <ScrollReveal delay={0.35}>
          <p
            className="mt-6 max-w-2xl"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--color-teal)',
            }}
          >
            We&apos;ve thought of everything: where to surf, when to sweat, what to eat
            — so you can relax and be present in every grin-bringing, fun-having,
            and people-meeting moment.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <p
            className="mt-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              fontWeight: 700,
              color: 'var(--color-teal)',
            }}
          >
            Ready? Pick your trip, pack your bags, and let&apos;s go.
          </p>
        </ScrollReveal>

        {/* Scroll hint */}
        <ScrollReveal delay={0.55}>
          <a
            href="#retreat-grid"
            className="mt-8 inline-flex items-center gap-2 group"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--color-teal)',
              textDecoration: 'none',
            }}
          >
            <span className="group-hover:underline">Browse Retreats</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="translate-y-px">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
