'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';

/* ─── Layout constants ───────────────────────────────────────────── */
const PEEK           = 32;
const TRIM_W         = 24;
const SIDE_GAP       = 16;
const VERT_GAP       = 44;
const VERT_STACK_PEEK = 24;  // px of each card that peeks when stacked vertically (mobile)

/* ─── Data ───────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    title: 'Pick Your Adventure',
    body: 'We run trips to Sri Lanka, Costa Rica, Nicaragua, Morocco, Panama, Sicily, and El Salvador. Each one\u2019s different \u2014 some lean heavier on the fitness scale, others are more focused on local culture, some make it quite easy to party. All of them get you moving.',
    accent: 'var(--color-coral)',
    bg: 'var(--color-teal)',
    text: 'var(--color-paper-white)',
  },
  {
    num: '02',
    title: 'Book Your Spot',
    body: '$350 USD deposit holds your place. Payment plans are available. We\u2019ll send you everything you need \u2014 packing lists, what to expect, connect you with your roommates. You just get yourself to the airport.',
    accent: 'var(--color-golden)',
    bg: 'var(--color-coral)',
    text: 'var(--color-teal)',
  },
  {
    num: '03',
    title: 'Show Up',
    body: 'Once you land, we handle the rest. Airport transfers, accommodation, meals, activities. Your only job is to enjoy yourself.',
    accent: 'var(--color-aquamarine)',
    bg: 'var(--color-palm-green)',
    text: 'var(--color-paper-white)',
  },
  {
    num: '04',
    title: 'Do As Much (Or As Little) As You Want',
    body: 'Every day has options. Morning yoga, afternoon group sweats, surf lessons, cultural excursions \u2014 or just a hammock and a book. Nothing\u2019s mandatory.',
    accent: 'var(--color-coral)',
    bg: 'var(--color-surface-dark-deep)',
    text: 'var(--color-paper-white)',
  },
];

/* ─── Scroll timing constants ────────────────────────────────────── */
const NUM_ENTRANCES = STEPS.length - 1;
const HOLD_FRACTION = 0.2;
const TRANSITION_FRACTION = (1 - HOLD_FRACTION) / NUM_ENTRANCES;

/* ─── Helpers ────────────────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return width;
}

function useViewportHeight() {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return height;
}

/* ─── Card inner content ─────────────────────────────────────────── */
function StepContent({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div
      className="relative flex flex-col justify-center h-full"
      style={{
        padding: 'clamp(32px, 5vw, 64px)',
        paddingLeft: `calc(${TRIM_W}px + clamp(24px, 4vw, 40px))`,
      }}
    >
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(180px, 22vw, 300px)',
          color: step.accent,
          opacity: 0.07,
          lineHeight: 0.85,
          right: -16,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        {step.num}
      </span>

      <div className="relative z-10" style={{ maxWidth: 560 }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 7vw, 80px)',
            color: step.accent,
            lineHeight: 1,
          }}
        >
          {step.num}
        </span>
        <h3
          className="mt-3 uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.8vw, 34px)',
            color: step.text,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
          }}
        >
          {step.title}
        </h3>
        <p
          className="mt-5"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.5vw, 17px)',
            color: step.text,
            opacity: 0.85,
            lineHeight: 1.7,
            maxWidth: 480,
          }}
        >
          {step.body}
        </p>
      </div>
    </div>
  );
}

/* ─── Single sliding card ────────────────────────────────────────── */
function HorizontalCard({
  step,
  index,
  scrollProgress,
  windowWidth,
  activeStep,
  onNavigate,
}: {
  step: (typeof STEPS)[number];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  windowWidth: number;
  activeStep: number;
  onNavigate: (index: number) => void;
}) {
  const enterStart = index === 0 ? 0 : (index - 1) * TRANSITION_FRACTION;
  const enterEnd   = index === 0 ? 0.0001 : index * TRANSITION_FRACTION;

  const startX  = index === 0 ? 0 : windowWidth;
  const settleX = index * PEEK;

  const x = useTransform(
    scrollProgress,
    [enterStart, enterEnd],
    [startX, settleX]
  );

  const isBehind = index < activeStep;

  return (
    <motion.div
      style={{
        x,
        position: 'absolute',
        left: SIDE_GAP,
        right: SIDE_GAP,
        top: VERT_GAP,
        bottom: VERT_GAP,
        zIndex: index + 1,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: step.bg,
        boxShadow: '0 16px 64px rgba(14,58,45,0.22)',
        cursor: isBehind ? 'pointer' : undefined,
      }}
      onClick={isBehind ? () => onNavigate(index) : undefined}
      role={isBehind ? 'button' : undefined}
      tabIndex={isBehind ? 0 : undefined}
      aria-label={isBehind ? `Go back to step ${step.num}: ${step.title}` : undefined}
      onKeyDown={isBehind ? (e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate(index); } : undefined}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: TRIM_W,
          backgroundColor: step.accent,
          zIndex: 2,
        }}
      />
      <StepContent step={step} />
    </motion.div>
  );
}

/* ─── Desktop: horizontal filing-cabinet scroll ──────────────────── */
function DesktopHorizontalStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowWidth  = useWindowWidth();
  const [activeStep, setActiveStep] = useState(0);
  const navigatingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(
      Math.floor(latest / TRANSITION_FRACTION) + 1,
      STEPS.length - 1,
    );
    setActiveStep(Math.max(0, step));
  });

  // Scroll-up bypass — matches ItineraryScroll pattern.
  // behavior:'instant' is required because globals.css sets
  // scroll-behavior:smooth, which would animate the jump.
  useEffect(() => {
    let lastY = window.scrollY;
    let bypassing = false;

    const handle = () => {
      const y = window.scrollY;
      const scrollingUp = y < lastY;

      if (scrollingUp && !bypassing && !navigatingRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const top = rect.top + y;
        const height = containerRef.current.offsetHeight;
        const vh = window.innerHeight;

        if (y >= top && y < top + height - vh) {
          bypassing = true;
          window.scrollTo({ top: Math.max(0, top - 1), behavior: 'instant' as ScrollBehavior });
          setTimeout(() => { bypassing = false; }, 400);
        }
      }

      lastY = y;
    };

    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Click a peeking card edge → smooth-scroll to that card's step
  const scrollToCard = useCallback((cardIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    navigatingRef.current = true;

    const rect = container.getBoundingClientRect();
    const containerDocTop = rect.top + window.scrollY;
    const targetProgress = cardIndex === 0 ? 0 : cardIndex * TRANSITION_FRACTION;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetScroll = containerDocTop + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });

    setTimeout(() => { navigatingRef.current = false; }, 1500);
  }, []);

  const scrollHeight = STEPS.length * 100;

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}vh` }}>
      <div
        className="sticky top-0"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        {STEPS.map((step, i) => (
          <HorizontalCard
            key={step.num}
            step={step}
            index={i}
            scrollProgress={scrollYProgress}
            windowWidth={windowWidth}
            activeStep={activeStep}
            onNavigate={scrollToCard}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile step content (compact) ───────────────────────────────── */
function MobileStepContent({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div
      className="relative flex flex-col justify-center h-full"
      style={{
        padding: 'clamp(24px, 5vw, 40px)',
        paddingTop: `calc(${TRIM_W}px + clamp(20px, 4vw, 32px))`,
      }}
    >
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(100px, 25vw, 180px)',
          color: step.accent,
          opacity: 0.07,
          lineHeight: 0.85,
          right: -8,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        {step.num}
      </span>

      <div className="relative z-10">
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 10vw, 56px)',
            color: step.accent,
            lineHeight: 1,
          }}
        >
          {step.num}
        </span>
        <h3
          className="mt-2 uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 4.5vw, 24px)',
            color: step.text,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}
        >
          {step.title}
        </h3>
        <p
          className="mt-3"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: step.text,
            opacity: 0.85,
            lineHeight: 1.6,
          }}
        >
          {step.body}
        </p>
      </div>
    </div>
  );
}

/* ─── Vertical card (mobile scroll-driven stack) ──────────────────── */
function VerticalCard({
  step,
  index,
  scrollProgress,
  viewportHeight,
}: {
  step: (typeof STEPS)[number];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  viewportHeight: number;
}) {
  const enterStart = index === 0 ? 0 : (index - 1) * TRANSITION_FRACTION;
  const enterEnd   = index === 0 ? 0.0001 : index * TRANSITION_FRACTION;

  const startY = index === 0 ? 0 : viewportHeight;
  const settleY = index * VERT_STACK_PEEK;

  const y = useTransform(
    scrollProgress,
    [enterStart, enterEnd],
    [startY, settleY]
  );

  return (
    <motion.div
      style={{
        y,
        position: 'absolute',
        left: SIDE_GAP,
        right: SIDE_GAP,
        top: VERT_GAP,
        bottom: VERT_GAP,
        zIndex: index + 1,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: step.bg,
        boxShadow: '0 8px 32px rgba(14,58,45,0.15)',
      }}
    >
      {/* Top accent bar — visible when next card stacks on top */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: TRIM_W,
          backgroundColor: step.accent,
          zIndex: 2,
        }}
      />
      <MobileStepContent step={step} />
    </motion.div>
  );
}

/* ─── Mobile: scroll-driven vertical stack ───────────────────────── */
function MobileVerticalStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportHeight = useViewportHeight();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
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
          setTimeout(() => { bypassing = false; }, 400);
        }
      }

      lastY = y;
    };

    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const scrollHeight = STEPS.length * 100;

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}vh` }}>
      <div
        className="sticky top-0"
        style={{ height: '100dvh', overflow: 'hidden' }}
      >
        {STEPS.map((step, i) => (
          <VerticalCard
            key={step.num}
            step={step}
            index={i}
            scrollProgress={scrollYProgress}
            viewportHeight={viewportHeight}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile fallback: static list (reduced motion) ───────────────── */
function MobileStaticStack() {
  return (
    <div className="flex flex-col gap-5 px-4 pb-12">
      {STEPS.map((step, i) => (
        <ScrollReveal key={step.num} delay={i * 0.08}>
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: step.bg,
              borderRadius: 16,
              padding: 'clamp(24px, 5vw, 36px)',
              paddingLeft: `${TRIM_W + 24}px`,
              minHeight: 200,
              boxShadow: '0 8px 32px rgba(14,58,45,0.12)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: TRIM_W,
                backgroundColor: step.accent,
              }}
            />
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 40,
                color: step.accent,
                lineHeight: 1,
              }}
            >
              {step.num}
            </span>
            <h3
              className="mt-3 uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px, 4vw, 22px)',
                color: step.text,
                lineHeight: 1.05,
              }}
            >
              {step.title}
            </h3>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: step.text,
                opacity: 0.85,
                lineHeight: 1.65,
              }}
            >
              {step.body}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────────── */
export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative"
      style={{ backgroundColor: 'var(--color-surface-warm)' }}
    >
      <div
        className="px-6"
        style={{
          paddingTop: 'clamp(48px, 8vw, 96px)',
          paddingBottom: 'clamp(24px, 4vw, 48px)',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <ScrollReveal>
            <h2
              className="uppercase text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 60px)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              How It Works
            </h2>
          </ScrollReveal>
        </div>
      </div>

      <div className="hidden md:block">
        {shouldReduceMotion ? <MobileStaticStack /> : <DesktopHorizontalStack />}
      </div>
      <div className="md:hidden">
        {shouldReduceMotion ? <MobileStaticStack /> : <MobileVerticalStack />}
      </div>
    </section>
  );
}
