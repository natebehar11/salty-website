'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CounterStat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface CounterStatsProps {
  stats: CounterStat[];
  backgroundColor?: string;
  accentColor?: string;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  animate,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  animate: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const duration = 1500; // ms

  const tick = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(easedProgress * value);

      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [value]
  );

  useEffect(() => {
    if (shouldReduceMotion || !animate) {
      setDisplay(value);
      return;
    }

    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, value, shouldReduceMotion, tick]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function CounterStats({
  stats,
  backgroundColor = 'var(--color-surface-warm-light)',
  accentColor = 'var(--color-coral)',
  className = '',
}: CounterStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${className}`}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl p-5 md:p-6 text-center"
          style={{ backgroundColor }}
        >
          <p
            className="uppercase leading-none mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: accentColor,
              letterSpacing: '-0.03em',
            }}
          >
            <AnimatedNumber
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              animate={isInView}
            />
          </p>
          <p
            className="uppercase tracking-wider text-xs font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-teal)',
              letterSpacing: '0.1em',
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
