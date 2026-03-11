'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxVideoBreakProps {
  videoId: string;
  caption?: string;
  overlayOpacity?: number;
  className?: string;
  thumbnailUrl?: string;
}

export default function ParallaxVideoBreak({
  videoId,
  caption,
  overlayOpacity = 0.15,
  className = '',
  thumbnailUrl,
}: ParallaxVideoBreakProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const thumb =
    thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

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
      <motion.div
        className="absolute inset-0"
        style={{
          y: shouldReduceMotion ? 0 : mediaY,
          top: '-10%',
          bottom: '-10%',
          pointerEvents: isPlaying ? 'none' : undefined,
        }}
      >
        {isPlaying ? (
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
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </motion.div>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(14, 58, 45, ${overlayOpacity})` }}
      />

      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '20%',
          background: 'linear-gradient(to bottom, rgba(14,58,45,0.6), transparent)',
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '20%',
          background: 'linear-gradient(to top, rgba(14,58,45,0.6), transparent)',
        }}
      />

      {/* Play button — loads video on click */}
      {!isPlaying && (
        <button
          onClick={() => setIsPlaying(true)}
          aria-label="Play background video"
          className="absolute z-10"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M7 4L19 11L7 18V4Z" fill="rgba(247,244,237,0.9)" />
          </svg>
        </button>
      )}

      {/* Spacer */}
      <div style={{ paddingBottom: '42%' }} />

      {/* Caption */}
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
