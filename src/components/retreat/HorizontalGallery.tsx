'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface GalleryItem {
  type: 'image' | 'video';
  src: string; // image URL or YouTube video ID
  alt: string;
  caption?: string;
}

interface HorizontalGalleryProps {
  items: GalleryItem[];
  className?: string;
}

// ─────────────────────────────────────────────
// Individual cards
// ─────────────────────────────────────────────

function ImageCard({ item }: { item: GalleryItem }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(247,244,237,0.9)',
            }}
          >
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );
}

function VideoCard({ item }: { item: GalleryItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {!loaded ? (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Play video: ${item.alt}`}
        >
          <img
            src={`https://img.youtube.com/vi/${item.src}/maxresdefault.jpg`}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
              <svg width="22" height="26" viewBox="0 0 28 32" fill="none">
                <path d="M28 16L0 32V0L28 16Z" fill="var(--color-coral)" />
              </svg>
            </div>
          </div>
          {item.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(247,244,237,0.9)',
                }}
              >
                {item.caption}
              </p>
            </div>
          )}
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${item.src}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Arrow button
// ─────────────────────────────────────────────

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="hidden md:flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      style={{
        backgroundColor: 'var(--color-paper-white)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-sand)',
      }}
      aria-label={`Scroll ${direction}`}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d={
            direction === 'left'
              ? 'M12.5 5L7.5 10L12.5 15'
              : 'M7.5 5L12.5 10L7.5 15'
          }
          stroke="var(--color-teal)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function HorizontalGallery({
  items,
  className = '',
}: HorizontalGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate drag constraints based on track width vs container
  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      const scrollWidth = track.scrollWidth;
      const clientWidth = track.parentElement?.clientWidth || track.clientWidth;
      setDragConstraint(Math.min(0, -(scrollWidth - clientWidth)));
    }

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items.length]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clamped);
      const track = trackRef.current;
      if (!track) return;
      const children = track.children;
      if (children[clamped]) {
        (children[clamped] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    },
    [items.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      }
    },
    [activeIndex, scrollToIndex]
  );

  // ─── Reduced motion: native horizontal scroll ───
  if (shouldReduceMotion) {
    return (
      <div className={className}>
        <div
          className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-16"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
          role="region"
          aria-label="Photo and video gallery"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{
                width: 'clamp(280px, 70vw, 500px)',
                aspectRatio: '16/9',
                scrollSnapAlign: 'start',
              }}
            >
              {item.type === 'image' ? (
                <ImageCard item={item} />
              ) : (
                <VideoCard item={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Framer Motion drag carousel ───
  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-label="Photo and video gallery"
      onKeyDown={handleKeyDown}
    >
      {/* Track container */}
      <div className="overflow-hidden px-6 md:px-16">
        <motion.div
          ref={trackRef}
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.15}
          dragTransition={{
            bounceStiffness: 300,
            bounceDamping: 30,
          }}
          style={{ touchAction: 'pan-y' }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="shrink-0"
              style={{
                width: 'clamp(280px, 70vw, 500px)',
                aspectRatio: '16/9',
              }}
            >
              {item.type === 'image' ? (
                <ImageCard item={item} />
              ) : (
                <VideoCard item={item} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Arrow navigation (desktop) */}
      <div className="hidden md:flex justify-center gap-3 mt-6">
        <ArrowButton
          direction="left"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
        />
        <ArrowButton
          direction="right"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex >= items.length - 1}
        />
      </div>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-2 mt-4"
        role="tablist"
        aria-label="Gallery navigation"
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className="rounded-full transition-all duration-200 cursor-pointer"
            style={{
              width: i === activeIndex ? 24 : 8,
              height: 8,
              backgroundColor:
                i === activeIndex
                  ? 'var(--color-coral)'
                  : 'var(--color-sand)',
            }}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
