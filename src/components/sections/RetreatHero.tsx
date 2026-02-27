'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { SanityImage } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import Button from '@/components/shared/Button';

interface RetreatHeroProps {
  name: string;
  officialName?: string;
  heroHeadline?: string;
  dates: string;
  totalDays: number;
  location: string;
  heroImage?: SanityImage | null;
  /** Retreat theme colors from Sanity colorTheme */
  accentColor: string;
  surfaceColor: string;
  darkColor: string;
  onBookNow: () => void;
  onAskQuestion: () => void;
}

export default function RetreatHero({
  name,
  officialName,
  heroHeadline,
  dates,
  totalDays,
  location,
  heroImage,
  accentColor,
  surfaceColor,
  darkColor,
  onBookNow,
  onAskQuestion,
}: RetreatHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full flex items-end overflow-hidden"
      style={{ minHeight: '75vh' }}
    >
      {/* Background image */}
      {heroImage ? (
        <img
          src={urlFor(heroImage).width(1920).height(1080).url()}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: darkColor }}
        />
      )}

      {/* Retreat-themed gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, transparent 40%, ${darkColor}CC 100%)`,
        }}
      />

      {/* Content overlay */}
      <div
        className="relative z-10 w-full px-6 pb-12 pt-32"
        style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.h1
              className="uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 7vw, 3.75rem)',
                color: 'var(--color-paper-white)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {name}
            </motion.h1>
            {officialName && (
              <motion.p
                className="mt-2 uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
                  color: accentColor,
                }}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {officialName}
              </motion.p>
            )}
            {heroHeadline && (
              <motion.p
                className="mt-3 max-w-lg"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--color-paper-white)',
                }}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {heroHeadline}
              </motion.p>
            )}
            <motion.p
              className="mt-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--color-sand)',
              }}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {dates} · {totalDays} Days · {location}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button variant="retreat" retreatAccent={accentColor} onClick={onBookNow}>
              Book Now
            </Button>
            <Button variant="secondary" onClick={onAskQuestion}>
              Ask a Question
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
