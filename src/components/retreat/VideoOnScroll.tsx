'use client';

import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface VideoOnScrollProps {
  src: string;
  poster?: string;
  className?: string;
  aspectRatio?: string;
  rounded?: boolean;
}

export default function VideoOnScroll({
  src,
  poster,
  className = '',
  aspectRatio = '16 / 9',
  rounded = true,
}: VideoOnScrollProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && !shouldReduceMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{
        aspectRatio,
        borderRadius: rounded ? 'var(--radius-card)' : undefined,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
