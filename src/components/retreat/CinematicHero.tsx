'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import Button from '@/components/shared/Button';

/* ─── Types ───────────────────────────────────────────────────────────── */

interface StatBadge {
  label: string;
  value: string;
}

interface CoBrand {
  name: string;
  logoUrl?: string;
}

interface CinematicHeroProps {
  destination: string;
  officialName: string;
  videoId: string;
  fallbackImageUrl?: string;
  stats: StatBadge[];
  priceFrom?: number;
  coBrand?: CoBrand;
  onBookNow?: () => void;
  onAskQuestion?: () => void;
}

/* ─── Component ───────────────────────────────────────────────────────── */

export default function CinematicHero({
  destination,
  officialName,
  videoId,
  fallbackImageUrl,
  stats,
  priceFrom,
  coBrand,
  onBookNow,
  onAskQuestion,
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [iframeReady, setIframeReady] = useState(false);

  // Track scroll progress for dynamic padding values
  const [progress, setProgress] = useState(0);

  // Defer iframe to avoid stalling initial paint
  useEffect(() => {
    const timer = setTimeout(() => setIframeReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress through the sticky container (0 → 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Track progress value for CSS-driven sizing
  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v));

  /* ── Scroll-driven transforms ── */

  // Card border radius: 0 → 24px
  const cardBorderRadius = useTransform(scrollYProgress, [0, 0.4], [0, 24]);

  // "PANAMA" title — fades in and slides up as card shrinks
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);

  // Trip details — fade in below the card
  const detailsOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.3, 0.6], [30, 0]);

  // CTA buttons
  const ctaOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  // Initial hero overlay text — fades OUT
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Overlay gradient intensity
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  const youtubeParams = [
    'autoplay=1',
    'mute=1',
    'loop=1',
    `playlist=${videoId}`,
    'controls=0',
    'showinfo=0',
    'rel=0',
    'modestbranding=1',
    'playsinline=1',
    'vq=hd1080',
  ].join('&');

  const thumbnailUrl =
    fallbackImageUrl ||
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Compute padding/sizing from progress — card shrinks by adding padding around it
  // At progress 0: full bleed (0 padding). At progress 0.5+: card with generous padding.
  const padX = Math.min(progress / 0.4, 1) * 5; // 0 → 5vw
  const padTop = Math.min(progress / 0.4, 1) * 22; // 0 → 22vh (room for title)
  const padBot = Math.min(Math.max((progress - 0.2) / 0.3, 0), 1) * 22; // 0 → 22vh (room for details)

  /* ── Reduced motion fallback ── */
  if (shouldReduceMotion) {
    return (
      <section className="relative w-full" style={{ minHeight: '100vh' }}>
        <div className="flex flex-col items-center justify-center px-6 py-24 gap-8" style={{ backgroundColor: 'var(--color-surface-base)', minHeight: '100vh' }}>
          <h1
            className="uppercase text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 12vw, 101px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
            }}
          >
            {destination}
          </h1>
          <div className="w-full max-w-5xl overflow-hidden" style={{ borderRadius: '20px', aspectRatio: '16/9' }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${thumbnailUrl})` }} />
          </div>
          <div className="text-center">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '22px', color: 'var(--color-teal)', fontWeight: 300 }}>
              {officialName}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-3">
              {stats.map((s) => (
                <span key={s.label} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-slate-grey)' }}>
                  {s.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Full cinematic version ── */
  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '250vh' }}
    >
      {/* Sticky frame — stays pinned for the full 250vh scroll */}
      <div
        className="sticky top-0 w-full"
        style={{
          height: '100vh',
          backgroundColor: 'var(--color-surface-base)',
          overflow: 'hidden',
        }}
      >
        {/* ── "PANAMA" title — positioned at top, revealed as card shrinks ── */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center pointer-events-none"
          style={{
            top: 'clamp(16px, 4vh, 48px)',
            zIndex: 10,
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          <h1
            className="uppercase text-center select-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 12vw, 101px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
              maxWidth: 'min(740px, 95vw)',
            }}
          >
            {destination}
          </h1>
        </motion.div>

        {/* ── Video/Image card — physically shrinks via padding ── */}
        <div
          className="absolute inset-0 transition-none"
          style={{
            paddingLeft: `${padX}vw`,
            paddingRight: `${padX}vw`,
            paddingTop: `${padTop}vh`,
            paddingBottom: `${padBot}vh`,
            zIndex: 5,
          }}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden"
            style={{ borderRadius: cardBorderRadius }}
          >
            {/* Poster thumbnail — always present */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            />

            {/* YouTube video background — deferred load */}
            {iframeReady && (
              <motion.div
                className="absolute inset-0"
                style={{ pointerEvents: 'none' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?${youtubeParams}`}
                  title=""
                  allow="autoplay; encrypted-media"
                  className="absolute w-full h-full"
                  style={{
                    border: 'none',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '177.78vh',
                    minHeight: '56.25vw',
                    pointerEvents: 'none',
                  }}
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </motion.div>
            )}

            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(14,58,45,0.9) 0%, rgba(14,58,45,0.3) 40%, transparent 65%)',
                opacity: overlayOpacity,
              }}
            />

            {/* Initial hero content — fades out on scroll */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16"
              style={{ opacity: heroContentOpacity, y: heroContentY }}
            >
              <div className="max-w-6xl mx-auto w-full">
                {/* Co-brand badge — above the fold */}
                {coBrand && (
                  <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {coBrand.logoUrl && (
                      <img
                        src={coBrand.logoUrl}
                        alt={coBrand.name}
                        className="h-8 md:h-10 w-auto object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(14px, 2vw, 18px)',
                        color: '#F7F4ED',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        opacity: 0.9,
                      }}
                    >
                      SALTY × {coBrand.name}
                    </span>
                  </motion.div>
                )}

                <motion.h2
                  className="uppercase leading-[0.85]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(5rem, 18vw, 14rem)',
                    color: '#F7F4ED',
                    letterSpacing: '-0.04em',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  {destination}
                </motion.h2>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Trip details — below the card ── */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center pointer-events-auto"
          style={{
            bottom: 'clamp(8px, 2vh, 24px)',
            zIndex: 10,
            opacity: detailsOpacity,
            y: detailsY,
          }}
        >
          {/* Subtitle */}
          <p
            className="mb-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '19px',
              color: 'var(--color-teal)',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {officialName}
          </p>

          {/* Stat badges */}
          <div className="flex flex-wrap justify-center items-center gap-x-2 mb-4">
            {stats.map((s, i) => (
              <span key={s.label} className="flex items-center gap-2">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-slate-grey)' }}>
                  {s.value}
                </span>
                {i < stats.length - 1 && (
                  <span style={{ color: 'var(--color-sand)', fontSize: '10px' }}>·</span>
                )}
              </span>
            ))}
            {priceFrom && (
              <>
                <span style={{ color: 'var(--color-sand)', fontSize: '10px' }}>·</span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-slate-grey)',
                  }}
                >
                  From ${priceFrom.toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* CTA buttons */}
          <motion.div className="flex gap-3" style={{ opacity: ctaOpacity }}>
            <Button variant="primary" size="lg" onClick={onBookNow}>
              Book Now
            </Button>
            <Button variant="secondary" size="lg" onClick={onAskQuestion}>
              Ask a Question
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
