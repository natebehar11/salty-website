'use client';

import { useRef, useState, useCallback, ReactNode, useEffect } from 'react';

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  snap?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  gap?: number;
}

export default function Carousel({
  children,
  className = '',
  snap = true,
  showDots = true,
  showArrows = true,
  gap = 24,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    if (snap && el.children.length > 0) {
      const childWidth = (el.children[0] as HTMLElement).offsetWidth + gap;
      const index = Math.round(el.scrollLeft / childWidth);
      setActiveIndex(Math.min(index, children.length - 1));
    }
  }, [children.length, gap, snap]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el || !el.children.length) return;
    const childWidth = (el.children[0] as HTMLElement).offsetWidth + gap;
    el.scrollBy({ left: direction === 'left' ? -childWidth : childWidth, behavior: 'smooth' });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto ${snap ? 'snap-x snap-mandatory' : ''}`}
        style={{ gap, scrollbarWidth: 'none' }}
      >
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 ${snap ? 'snap-start' : ''}`}>
            {child}
          </div>
        ))}
      </div>

      {showArrows && children.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
            style={{ backgroundColor: '#F7F4ED', color: '#0E3A2D', boxShadow: '0 4px 12px rgba(30,25,20,0.08)' }}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2L4 7l5 5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
            style={{ backgroundColor: '#F7F4ED', color: '#0E3A2D', boxShadow: '0 4px 12px rgba(30,25,20,0.08)' }}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 2l5 5-5 5" />
            </svg>
          </button>
        </>
      )}

      {showDots && children.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {children.map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: i === activeIndex ? '#F75A3D' : '#0E3A2D',
                opacity: i === activeIndex ? 1 : 0.3,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <style>{`:where(.snap-x)::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
