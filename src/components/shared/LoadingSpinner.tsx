'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function LoadingSpinner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.span
        className="text-4xl block"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, -12, 12, -8, 8, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🧂
      </motion.span>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-slate-grey)',
        }}
      >
        Loading...
      </p>
    </div>
  );
}
