'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeTickerProps {
  items: string[];
  separator?: string;
  backgroundColor?: string;
  textColor?: string;
  speed?: number;
  className?: string;
}

export default function MarqueeTicker({
  items,
  separator = '◆',
  backgroundColor = 'var(--color-palm-green)',
  textColor = 'var(--color-paper-white)',
  speed = 30,
  className = '',
}: MarqueeTickerProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = items.join(` ${separator} `) + ` ${separator} `;

  if (shouldReduceMotion) {
    return (
      <div
        className={`w-full overflow-hidden ${className}`}
        style={{ backgroundColor }}
        role="presentation"
      >
        <div
          className="flex items-center justify-center py-3 md:py-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            color: textColor,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0.8,
          }}
        >
          {items.join(` ${separator} `)}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ backgroundColor }}
      role="presentation"
      aria-hidden="true"
    >
      <div className="py-3 md:py-4">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear',
            },
          }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            color: textColor,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0.8,
          }}
        >
          {/* Two copies for seamless loop */}
          <span className="inline-block pr-4">{content}</span>
          <span className="inline-block pr-4">{content}</span>
        </motion.div>
      </div>
    </div>
  );
}
