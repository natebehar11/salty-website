'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Modal from '@/components/shared/Modal';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';

type Day = RetreatData['itinerary'][0];

/* ─── DayCard ────────────────────────────────────────────────────────────── */

function DayCard({ day, onOpen }: { day: Day; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`View details for Day ${day.day}: ${day.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen();
      }}
      style={{
        width: 'min(360px, 100%)',
        minWidth: 280,
        flexShrink: 0,
        backgroundColor: 'var(--color-surface-base)',
        borderRadius: 20,
        padding: 24,
        boxShadow: 'var(--shadow-lg)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: 'fit-content',
        alignSelf: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: theme.accent,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {String(day.day).padStart(2, '0')}
        </span>
        <span
          style={{
            backgroundColor: theme.secondary,
            color: theme.primary,
            borderRadius: 20,
            padding: '3px 10px',
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {day.location}
        </span>
      </div>
      {day.photoUrl && (
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3' }}>
          <Image
            src={day.photoUrl}
            alt={day.title}
            fill
            sizes="360px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--type-h4)',
          textTransform: 'uppercase',
          color: theme.primary,
        }}
      >
        {day.title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--type-body-sm)',
          color: 'var(--color-slate-grey)',
          lineHeight: 1.6,
        }}
      >
        {day.summary}
      </p>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: theme.accent,
          fontWeight: 600,
        }}
      >
        Read more &rarr;
      </span>
    </div>
  );
}

/* ─── DayModalContent ────────────────────────────────────────────────────── */

function DayModalContent({ day }: { day: Day }) {
  return (
    <div>
      {day.photoUrl && (
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
          <Image
            src={day.photoUrl}
            alt={day.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ padding: '24px 28px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              color: theme.accent,
              lineHeight: 0.85,
            }}
          >
            {String(day.day).padStart(2, '0')}
          </span>
          <span
            style={{
              backgroundColor: theme.secondary,
              color: theme.primary,
              borderRadius: 20,
              padding: '3px 10px',
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {day.location}
          </span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-h3)',
            textTransform: 'uppercase',
            color: theme.primary,
            marginBottom: 16,
          }}
        >
          {day.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-body-lg)',
            color: 'var(--color-slate-grey)',
            lineHeight: 1.75,
          }}
        >
          {day.details}
        </p>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export default function ItineraryScroll({
  itinerary,
}: {
  itinerary: RetreatData['itinerary'];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [openDay, setOpenDay] = useState<Day | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Measure how far the track needs to scroll */
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      const viewW = window.innerWidth;
      setMaxTranslate(Math.max(0, trackW - viewW));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* Scroll-up bypass: when scrolling UP into the sticky zone from
     below, jump to just above the section so the user passes through
     completely — as if the section doesn't exist in the upward
     direction. No stop, no reverse animation.
     behavior:'instant' is required because globals.css sets
     scroll-behavior:smooth, which would animate the jump and create
     an visible pause. */
  useEffect(() => {
    if (isMobile || shouldReduceMotion) return;
    let lastY = window.scrollY;
    let bypassing = false;
    const handle = () => {
      const y = window.scrollY;
      const scrollingUp = y < lastY;
      if (scrollingUp && !bypassing && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const top = rect.top + y;
        const height = containerRef.current.offsetHeight;
        const vh = window.innerHeight;
        if (y >= top && y < top + height - vh) {
          bypassing = true;
          window.scrollTo({ top: Math.max(0, top - 1), behavior: 'instant' as ScrollBehavior });
          setTimeout(() => {
            bypassing = false;
          }, 400);
        }
      }
      lastY = y;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [isMobile, shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  /* ── Mobile: horizontal snap-scroll ── */
  if (isMobile || shouldReduceMotion) {
    return (
      <section
        style={{
          padding: 'var(--space-section-y) var(--space-section-x)',
          backgroundColor: theme.surface,
        }}
      >
        <div style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              textTransform: 'uppercase',
              color: theme.primary,
              marginBottom: 24,
            }}
          >
            Day by Day
          </h2>
          <div
            className="scrollbar-hide"
            style={{
              display: 'flex',
              gap: 16,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: 16,
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {itinerary.map((day) => (
              <div key={day.day} style={{ scrollSnapAlign: 'start', minWidth: '85vw' }}>
                <DayCard day={day} onOpen={() => setOpenDay(day)} />
              </div>
            ))}
          </div>
        </div>
        <Modal isOpen={!!openDay} onClose={() => setOpenDay(null)}>
          {openDay && <DayModalContent day={openDay} />}
        </Modal>
      </section>
    );
  }

  /* ── Desktop: scroll-driven horizontal scroll — height scales with card count ── */
  const scrollHeight = `${Math.max(itinerary.length * 50, 300)}vh`;

  return (
    <div ref={containerRef} style={{ height: scrollHeight, position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          backgroundColor: theme.surface,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '40px var(--space-section-x) 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              textTransform: 'uppercase',
              color: theme.primary,
            }}
          >
            Day by Day
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: theme.primary,
              opacity: 0.4,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Scroll to explore
          </p>
        </div>

        {/* Cards track */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'var(--space-section-x)',
          }}
        >
          <motion.div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 24,
              width: 'max-content',
              x,
            }}
          >
            {itinerary.map((day) => (
              <DayCard key={day.day} day={day} onOpen={() => setOpenDay(day)} />
            ))}
          </motion.div>
        </div>

        {/* Continue — jumps to the next section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 16,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('retreat-accommodation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else if (containerRef.current) {
                window.scrollTo({
                  top:
                    containerRef.current.offsetTop + containerRef.current.offsetHeight,
                  behavior: 'smooth',
                });
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 44,
              padding: '10px 24px',
              borderRadius: 24,
              border: '1px solid rgba(14,58,45,0.18)',
              backgroundColor: 'var(--color-paper-white)',
              color: theme.primary,
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(14,58,45,0.1)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(14,58,45,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(14,58,45,0.1)';
            }}
            aria-label="Continue to next section"
          >
            Continue
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 2,
            backgroundColor: 'rgba(14,58,45,0.12)',
            flexShrink: 0,
          }}
        >
          <motion.div
            style={{
              height: '100%',
              backgroundColor: theme.accent,
              transformOrigin: 'left',
              scaleX: scrollYProgress,
            }}
          />
        </div>
      </div>

      {/* Day modal */}
      <Modal isOpen={!!openDay} onClose={() => setOpenDay(null)}>
        {openDay && <DayModalContent day={openDay} />}
      </Modal>
    </div>
  );
}
