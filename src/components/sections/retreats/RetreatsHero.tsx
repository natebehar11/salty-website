'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import AnchorStarBadge from '@/components/shared/AnchorStarBadge';

/* ─── Component ──────────────────────────────────────────────────────── */

export default function RetreatsHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{ minHeight: '70vh', backgroundColor: 'var(--color-teal)' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/retreat/surfboard-walk.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14,58,45,0.6) 0%, rgba(14,58,45,0.78) 55%, rgba(14,58,45,0.92) 100%)',
        }}
      />

      {/* Anchor star */}
      <motion.div
        className="absolute z-20"
        style={{ top: '12%', right: '5%' }}
        initial={shouldReduceMotion ? undefined : { scale: 0, rotate: -30 }}
        animate={shouldReduceMotion ? undefined : { scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        <AnchorStarBadge text="7 Countries & Counting" size={120} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
        <ScrollReveal>
          <p
            className="uppercase tracking-widest mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              color: 'var(--color-coral)',
              letterSpacing: '0.12em',
            }}
          >
            SALTY Retreats
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h1
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 7vw, 72px)',
              color: 'var(--color-paper-white)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Wellness Retreats{' '}
            <span style={{ color: 'var(--color-coral)' }}>for People</span> Who
            Actually Want to Have Fun
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p
            className="mt-6 max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--color-sand)',
              lineHeight: 1.6,
            }}
          >
            Sweat, surf, explore, laugh, connect. This is fitness and wellness
            travel without the boring parts.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.22}>
          <div className="mt-8">
            <a href="#retreats-grid">
              <Button variant="primary" size="lg">
                See Upcoming Retreats
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
