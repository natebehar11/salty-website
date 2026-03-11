'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';

/* ─── Layout constants (matches canonical HowItWorks.tsx) ─────────────────── */
const PEEK     = 32;
const TRIM_W   = 24;
const SIDE_GAP = 16;
const VERT_GAP = 44;

const HOLD_FRACTION = 0.2;

/* ─── Step data ───────────────────────────────────────────────────────────── */
const BASE_STEPS = [
  {
    num: '01',
    title: 'Pick Your Room',
    body: 'Choose the accommodation tier that fits your budget and style. Standard double, premium double, or private — all in the same properties, same programme.',
    accent: 'var(--color-coral)',
    bg: 'var(--color-surface-dark-deep)',
    text: 'var(--color-paper-white)',
  },
  {
    num: '02',
    title: 'Deposit $350',
    body: 'A small deposit holds your spot. Fully transferable to any future SALTY trip if your plans change.',
    accent: 'var(--color-golden)',
    bg: 'var(--color-teal)',
    text: 'var(--color-paper-white)',
  },
  {
    num: '03',
    title: 'Select Your Payment Plan',
    body: 'Pay in full or spread the balance into monthly instalments. The remaining balance is due 60 days before departure.',
    accent: 'var(--color-aquamarine)',
    bg: 'var(--color-palm-green)',
    text: 'var(--color-paper-white)',
  },
  {
    num: '04',
    title: 'Pack Your Bags',
    body: 'We send you a full packing list and pre-trip briefing. You get connected with your group on WhatsApp. You just show up.',
    accent: 'var(--color-golden)',
    bg: 'var(--color-coral)',
    text: 'var(--color-teal)',
  },
  {
    num: '05',
    title: 'Land & Have Some Damn Fun',
    body: 'From airport transfer to farewell dinner — we handle everything in between. Your only job is to enjoy yourself.',
    accent: 'var(--color-bright-coral)',
    bg: 'var(--color-surface-dark-raised)',
    text: 'var(--color-paper-white)',
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
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

/* ─── Card inner content ──────────────────────────────────────────────────── */
function StepContent({ step }: { step: (typeof BASE_STEPS)[number] }) {
  return (
    <div
      className="relative flex flex-col justify-center h-full"
      style={{
        padding: 'clamp(32px, 5vw, 64px)',
        paddingLeft: `calc(${TRIM_W}px + clamp(24px, 4vw, 40px))`,
      }}
    >
      {/* Large watermark number */}
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

/* ─── Single sliding card ─────────────────────────────────────────────────── */
function HorizontalCard({
  step,
  index,
  scrollProgress,
  windowWidth,
  totalSteps,
  activeStep,
  onNavigate,
}: {
  step: (typeof BASE_STEPS)[number];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  windowWidth: number;
  totalSteps: number;
  activeStep: number;
  onNavigate: (index: number) => void;
}) {
  const numEntrances       = totalSteps - 1;
  const transitionFraction = (1 - HOLD_FRACTION) / numEntrances;

  const enterStart = index === 0 ? 0 : (index - 1) * transitionFraction;
  const enterEnd   = index === 0 ? 0.0001 : index * transitionFraction;

  const startX  = index === 0 ? 0 : windowWidth;
  const settleX = index * PEEK;

  const x = useTransform(scrollProgress, [enterStart, enterEnd], [startX, settleX]);

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
      {/* Left accent trim — visible as the filing tab when card is stacked */}
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

/* ─── Desktop: horizontal filing-cabinet scroll ───────────────────────────── */
function DesktopHorizontalStack({ steps }: { steps: typeof BASE_STEPS }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowWidth  = useWindowWidth();
  const [activeStep, setActiveStep] = useState(0);
  const navigatingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const numEntrances = steps.length - 1;
  const transitionFraction = (1 - HOLD_FRACTION) / numEntrances;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(
      Math.floor(latest / transitionFraction) + 1,
      steps.length - 1,
    );
    setActiveStep(Math.max(0, step));
  });

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

  const scrollToCard = useCallback((cardIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    navigatingRef.current = true;

    const rect = container.getBoundingClientRect();
    const containerDocTop = rect.top + window.scrollY;
    const tf = (1 - HOLD_FRACTION) / (steps.length - 1);
    const targetProgress = cardIndex === 0 ? 0 : cardIndex * tf;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetScroll = containerDocTop + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });

    setTimeout(() => { navigatingRef.current = false; }, 1500);
  }, [steps.length]);

  return (
    <div ref={containerRef} style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0" style={{ height: '100vh', overflow: 'hidden' }}>
        {steps.map((step, i) => (
          <HorizontalCard
            key={step.num}
            step={step}
            index={i}
            scrollProgress={scrollYProgress}
            windowWidth={windowWidth}
            totalSteps={steps.length}
            activeStep={activeStep}
            onNavigate={scrollToCard}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile: stacked list with ScrollReveal ──────────────────────────────── */
function MobileStack({ steps }: { steps: typeof BASE_STEPS }) {
  return (
    <div
      className="flex flex-col gap-5 pb-12"
      style={{ paddingLeft: 'var(--space-section-x)', paddingRight: 'var(--space-section-x)' }}
    >
      {steps.map((step, i) => (
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

/* ─── Main export ─────────────────────────────────────────────────────────── */
interface FilingCabinetProps {
  depositAmount?: number;
}

export default function FilingCabinet({ depositAmount }: FilingCabinetProps) {
  const shouldReduceMotion = useReducedMotion();

  const steps = depositAmount
    ? BASE_STEPS.map((s, i) =>
        i === 1 ? { ...s, title: `Deposit $${depositAmount}` } : s
      )
    : BASE_STEPS;

  return (
    <section className="relative" style={{ backgroundColor: 'var(--color-surface-warm)' }}>
      {/* Header — above the scroll runner, scrolls away as cards take over */}
      <div
        style={{
          paddingTop: 'clamp(48px, 8vw, 96px)',
          paddingBottom: 'clamp(24px, 4vw, 48px)',
          paddingLeft: 'var(--space-section-x)',
          paddingRight: 'var(--space-section-x)',
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

      {/* Cards — md+ gets scroll-driven horizontal stack; below md gets stacked */}
      <div className="hidden md:block">
        {shouldReduceMotion ? <MobileStack steps={steps} /> : <DesktopHorizontalStack steps={steps} />}
      </div>
      <div className="md:hidden">
        <MobileStack steps={steps} />
      </div>
    </section>
  );
}
