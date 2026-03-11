'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/shared/Button';

/* ─── Props ───────────────────────────────────────────────────────────── */

interface HomepageCinematicHeroProps {
  whatsapp?: string;
}

/* ─── Component ───────────────────────────────────────────────────────── */

export default function HomepageCinematicHero({
  whatsapp = '14318291135',
}: HomepageCinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Defer video load
  useEffect(() => {
    const timer = setTimeout(() => setVideoReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v));

  /* ── Scroll-driven transforms ── */
  const cardBorderRadius = useTransform(scrollYProgress, [0, 0.4], [0, 24]);
  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.12, 0.4], [50, 0]);
  const detailsOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.35, 0.6], [30, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  // Dynamic padding as card shrinks
  const padX = Math.min(progress / 0.4, 1) * 5;
  const padTop = Math.min(progress / 0.4, 1) * 20;
  const padBot = Math.min(Math.max((progress - 0.2) / 0.3, 0), 1) * 22;

  /* ── Reduced motion fallback ── */
  if (shouldReduceMotion) {
    return (
      <section className="relative w-full" style={{ minHeight: '100vh' }}>
        <div
          className="flex flex-col items-center justify-center px-6 py-24 gap-8"
          style={{
            backgroundColor: 'var(--color-teal)',
            minHeight: '100vh',
          }}
        >
          <h1
            className="uppercase text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              maxWidth: '14ch',
            }}
          >
            Fitness Retreats for Fun-Loving People
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--color-sand)',
              lineHeight: 1.6,
              textAlign: 'center',
              maxWidth: 520,
            }}
          >
            Seven countries. Daily workouts. Surf lessons. Sunrise yoga.
            Sunset drinks. Friends you haven&apos;t met yet.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/retreats">
              <Button variant="primary" size="lg">
                Upcoming Trips
              </Button>
            </Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hey SALTY! I'm interested in learning more about your retreats.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Chat With Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    );
  }

  /* ── Full cinematic version ── */
  return (
    <section ref={containerRef} className="relative w-full" style={{ height: '220vh' }}>
      {/* Sticky frame — stays pinned */}
      <div
        className="sticky top-0 w-full"
        style={{
          height: '100vh',
          backgroundColor: 'var(--color-surface-base)',
          overflow: 'hidden',
        }}
      >
        {/* ── H1 Title — revealed as card shrinks ── */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center pointer-events-none"
          style={{
            top: 'clamp(12px, 3vh, 40px)',
            zIndex: 10,
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          <h1
            className="uppercase text-center select-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              whiteSpace: 'nowrap',
            }}
          >
            Fitness Retreats
            <br />
            for Fun-Loving People
          </h1>
        </motion.div>

        {/* ── Video/Image card — shrinks via padding ── */}
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
            {/* Poster image — always present */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/retreat/hero-champagne.png)',
              }}
            />

            {/* Background video — deferred */}
            {videoReady && (
              <motion.div
                className="absolute inset-0"
                style={{ pointerEvents: 'none' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/Gmxnh9tZrHs?autoplay=1&mute=1&loop=1&playlist=Gmxnh9tZrHs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080`}
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
                  loading="lazy"
                />
              </motion.div>
            )}

            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(14,58,45,0.85) 0%, rgba(14,58,45,0.25) 40%, transparent 65%)',
                opacity: overlayOpacity,
              }}
            />

            {/* ── Initial hero content — fades out on scroll ── */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16"
              style={{ opacity: heroContentOpacity, y: heroContentY }}
            >
              <div className="max-w-5xl mx-auto w-full">
                <motion.h2
                  className="uppercase"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 12vw, 101px)',
                    lineHeight: '1.02',
                    color: 'var(--color-paper-white)',
                    letterSpacing: '-0.04em',
                    maxWidth: 'min(740px, 95vw)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  Fitness Retreats
                  <br />
                  <span style={{ color: 'var(--color-coral)' }}>for Fun-Loving</span>
                  <br />
                  People
                </motion.h2>

                <motion.p
                  className="mt-5 max-w-md"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    color: 'var(--color-sand)',
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Seven countries. Daily workouts. Surf lessons. Sunrise yoga.
                  Sunset drinks. Friends you haven&apos;t met yet.
                </motion.p>
              </div>
            </motion.div>


          </motion.div>
        </div>

        {/* ── Details below card — tagline + stats + CTA ── */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center pointer-events-auto"
          style={{
            bottom: 'clamp(8px, 2vh, 28px)',
            zIndex: 10,
            opacity: detailsOpacity,
            y: detailsY,
          }}
        >
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
            Sweat &middot; Explore &middot; Have Fun &middot; Repeat
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-4">
            {[
              '200+ Guests',
              '4.9 Rating',
              '7 Countries',
            ].map((stat, i) => (
              <span key={stat} className="flex items-center gap-3">
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-slate-grey)',
                  }}
                >
                  {stat}
                </span>
                {i < 2 && (
                  <span style={{ color: 'var(--color-sand)', fontSize: '10px' }}>
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div className="flex gap-3" style={{ opacity: ctaOpacity }}>
            <Link href="/retreats">
              <Button variant="primary" size="lg">
                Upcoming Trips
              </Button>
            </Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hey SALTY! I'm interested in learning more about your retreats.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Chat With Us
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
