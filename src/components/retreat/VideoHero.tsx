'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Button from '@/components/shared/Button';

interface StatBadge {
  label: string;
  value: string;
}

interface VideoHeroProps {
  destination: string;
  officialName: string;
  videoId: string;
  fallbackImageUrl?: string;
  stats: StatBadge[];
  priceFrom?: number;
  onBookNow?: () => void;
  onAskQuestion?: () => void;
  className?: string;
}

export default function VideoHero({
  destination,
  officialName,
  videoId,
  fallbackImageUrl,
  stats,
  priceFrom,
  onBookNow,
  onAskQuestion,
  className = '',
}: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, 80]);
  const badgeOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const ctaOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIframeReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  // ─── Reduced motion: static poster ───
  if (shouldReduceMotion) {
    return (
      <section
        ref={containerRef}
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height: '100vh' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(14,58,45,0.85) 0%, rgba(14,58,45,0.3) 40%, transparent 70%)',
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16">
          <div className="max-w-6xl mx-auto w-full">
            <p
              className="uppercase tracking-[0.3em] mb-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#A4E5D9',
                fontWeight: 700,
              }}
            >
              SALTY Retreats
            </p>
            <h1
              className="uppercase leading-[0.85]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 18vw, 14rem)',
                color: '#F7F4ED',
                letterSpacing: '-0.04em',
              }}
            >
              {destination}
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: '#E7D7C0',
                    fontWeight: 300,
                  }}
                >
                  {officialName}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                  {stats.map((s) => (
                    <span
                      key={s.label}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: 'rgba(247,244,237,0.7)',
                      }}
                    >
                      {s.value}
                    </span>
                  ))}
                  {priceFrom && (
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        color: '#FED260',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      FROM ${priceFrom.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button variant="primary" size="lg" onClick={onBookNow}>
                  Book Now
                </Button>
                <Button variant="secondary" size="lg" onClick={onAskQuestion}>
                  Ask a Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── Full cinematic hero with video background ───
  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: '100vh' }}
    >
      {/* Poster thumbnail — shown immediately */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      />

      {/* YouTube video background — fades in after initial paint */}
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
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(14,58,45,0.85) 0%, rgba(14,58,45,0.3) 40%, transparent 70%)',
        }}
      />

      {/* Content overlay — fades on scroll */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Sub-brand label */}
          <motion.p
            className="uppercase tracking-[0.3em] mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#A4E5D9',
              fontWeight: 700,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SALTY Retreats
          </motion.p>

          {/* Destination name — massive */}
          <motion.h1
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
          </motion.h1>

          {/* Info row + CTAs */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: '#E7D7C0',
                  fontWeight: 300,
                }}
              >
                {officialName}
              </p>
              <motion.div
                className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3"
                style={{ opacity: badgeOpacity }}
              >
                {stats.map((s) => (
                  <span
                    key={s.label}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'rgba(247,244,237,0.7)',
                    }}
                  >
                    {s.value}
                  </span>
                ))}
                {priceFrom && (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      color: '#FED260',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    FROM ${priceFrom.toLocaleString()}
                  </span>
                )}
              </motion.div>
            </div>

            <motion.div
              className="flex gap-3 shrink-0"
              style={{ opacity: ctaOpacity }}
            >
              <Button variant="primary" size="lg" onClick={onBookNow}>
                Book Now
              </Button>
              <Button variant="secondary" size="lg" onClick={onAskQuestion}>
                Ask a Question
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
