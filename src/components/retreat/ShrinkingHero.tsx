'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Button from '@/components/shared/Button';

interface StatBadge {
  label: string;
  value: string;
}

interface ShrinkingHeroProps {
  destination: string;
  officialName: string;
  heroImageUrl?: string;
  stats: StatBadge[];
  onBookNow?: () => void;
  onAskQuestion?: () => void;
  className?: string;
}

export default function ShrinkingHero({
  destination,
  officialName,
  heroImageUrl,
  stats,
  onBookNow,
  onAskQuestion,
  className = '',
}: ShrinkingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const heroHeight = useTransform(scrollY, [0, 500], ['100vh', '40vh']);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textScale = useTransform(scrollY, [0, 400], [1, 0.7]);
  const badgeOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const ctaOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height: '70vh' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: heroImageUrl
              ? `url(${heroImageUrl})`
              : undefined,
            backgroundColor: heroImageUrl ? undefined : 'var(--color-teal)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-6">
          <div>
            <h1
              className="uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-display)',
                color: 'var(--color-paper-white)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {destination}
            </h1>
            <p
              className="mt-2 uppercase tracking-wide"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h3)',
                color: 'var(--color-sand)',
                letterSpacing: '-0.03em',
              }}
            >
              {officialName}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-2 rounded-full backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(14, 58, 45, 0.7)' }}
              >
                <span
                  className="text-xs uppercase tracking-wider block"
                  style={{ color: 'var(--color-sand)', fontFamily: 'var(--font-body)' }}
                >
                  {stat.label}
                </span>
                <span
                  className="text-sm font-bold block"
                  style={{ color: 'var(--color-paper-white)', fontFamily: 'var(--font-body)' }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <Button variant="primary" size="lg" onClick={onBookNow}>
              Book Now
            </Button>
            <Button variant="secondary" size="lg" onClick={onAskQuestion}>
              Ask a Question
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: heroHeight }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: heroImageUrl
              ? `url(${heroImageUrl})`
              : undefined,
            backgroundColor: heroImageUrl ? undefined : 'var(--color-teal)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-6">
          <motion.div style={{ opacity: textOpacity, scale: textScale }}>
            <h1
              className="uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-display)',
                color: 'var(--color-paper-white)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {destination}
            </h1>
            <p
              className="mt-2 uppercase tracking-wide"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h3)',
                color: 'var(--color-sand)',
                letterSpacing: '-0.03em',
              }}
            >
              {officialName}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            style={{ opacity: badgeOpacity }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-2 rounded-full backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(14, 58, 45, 0.7)' }}
              >
                <span
                  className="text-xs uppercase tracking-wider block"
                  style={{ color: 'var(--color-sand)', fontFamily: 'var(--font-body)' }}
                >
                  {stat.label}
                </span>
                <span
                  className="text-sm font-bold block"
                  style={{ color: 'var(--color-paper-white)', fontFamily: 'var(--font-body)' }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-2"
            style={{ opacity: ctaOpacity }}
          >
            <Button variant="primary" size="lg" onClick={onBookNow}>
              Book Now
            </Button>
            <Button variant="secondary" size="lg" onClick={onAskQuestion}>
              Ask a Question
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Spacer — gives scroll room for the hero to shrink before content begins */}
      <div className="h-[60vh]" />
    </div>
  );
}
