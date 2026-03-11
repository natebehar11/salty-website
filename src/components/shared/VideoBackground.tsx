'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface VideoBackgroundProps {
  videoId: string;
  fallbackImageUrl?: string;
  overlayGradient?: string;
  deferMs?: number;
}

const DEFAULT_GRADIENT =
  'linear-gradient(to bottom, rgba(14,58,45,0.65) 0%, rgba(14,58,45,0.80) 60%, rgba(14,58,45,0.92) 100%)';

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

export default function VideoBackground({
  videoId,
  fallbackImageUrl,
  overlayGradient = DEFAULT_GRADIENT,
  deferMs = 1200,
}: VideoBackgroundProps) {
  const [ready, setReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;
    const t = setTimeout(() => setReady(true), deferMs);
    return () => clearTimeout(t);
  }, [deferMs, shouldReduceMotion, isMobile]);

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

  const thumbnail =
    fallbackImageUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      {/* Poster image — always present, sole visual on mobile */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />

      {/* YouTube iframe — desktop only, deferred */}
      {ready && (
        <motion.div
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
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
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: overlayGradient }} />
    </>
  );
}
