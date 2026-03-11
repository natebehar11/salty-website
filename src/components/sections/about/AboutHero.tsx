'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import VideoBackground from '@/components/shared/VideoBackground';
import AnchorStarBadge from '@/components/shared/AnchorStarBadge';

/* ─── About Hero ─────────────────────────────────────────────────────── */

export default function AboutHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{ minHeight: '80vh', backgroundColor: 'var(--color-teal)' }}
    >
      {/* Video background — deferred YouTube loop */}
      <VideoBackground
        videoId="Gmxnh9tZrHs"
        fallbackImageUrl="/images/retreat/guys-laughing.png"
        overlayGradient="linear-gradient(to bottom, rgba(14,58,45,0.60) 0%, rgba(14,58,45,0.75) 50%, rgba(14,58,45,0.92) 100%)"
        deferMs={1200}
      />

      {/* Anchor star badge — hidden on mobile to prevent headline overlap */}
      <motion.div
        className="absolute z-20 hidden md:flex"
        style={{ top: '14%', right: '6%' }}
        initial={shouldReduceMotion ? undefined : { scale: 0, rotate: -30 }}
        animate={shouldReduceMotion ? undefined : { scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        <AnchorStarBadge text="Est 2023" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-20">
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
            Our Story
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h1
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 12vw, 101px)',
              color: 'var(--color-paper-white)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              maxWidth: 'min(740px, 95vw)',
            }}
          >
            How We Made{' '}
            <span style={{ color: 'var(--color-coral)' }}>Fun</span> of
            Wellness
          </h1>
        </ScrollReveal>

      </div>
    </section>
  );
}
