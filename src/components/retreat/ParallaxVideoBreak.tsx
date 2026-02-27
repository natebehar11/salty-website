'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxVideoBreakProps {
  videoId: string;
  caption?: string;
  overlayOpacity?: number;
  className?: string;
}

export default function ParallaxVideoBreak({
  videoId,
  caption,
  overlayOpacity = 0.15,
  className = '',
}: ParallaxVideoBreakProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

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
  ].join('&');

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ minHeight: '50vh' }}
    >
      {/* Video container — parallax-offset */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: shouldReduceMotion ? 0 : videoY,
          // Oversize by 20% to allow parallax room without showing gaps
          top: '-10%',
          bottom: '-10%',
          pointerEvents: 'none',
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${youtubeParams}`}
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
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
        />
      </motion.div>

      {/* Subtle overlay for blending */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(14, 58, 45, ${overlayOpacity})` }}
      />

      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '20%',
          background:
            'linear-gradient(to bottom, rgba(14,58,45,0.6), transparent)',
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '20%',
          background:
            'linear-gradient(to top, rgba(14,58,45,0.6), transparent)',
        }}
      />

      {/* Spacer to maintain section height */}
      <div style={{ paddingBottom: '42%' }} />

      {/* Optional caption */}
      {caption && (
        <div
          className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'rgba(247,244,237,0.7)',
              fontStyle: 'italic',
            }}
          >
            {caption}
          </p>
        </div>
      )}
    </section>
  );
}
