'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { SaltyLandmark } from './types';
import { CATEGORY_LABELS } from './types';
import LandmarkIcon from './landmark-icons';

interface LandmarkPreviewProps {
  landmark: SaltyLandmark;
  /** Position relative to the sticker (adjusts arrow direction) */
  position?: 'above' | 'below';
}

export default function LandmarkPreview({ landmark, position = 'above' }: LandmarkPreviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        [position === 'above' ? 'bottom' : 'top']: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: position === 'above' ? 8 : 0,
        marginTop: position === 'below' ? 8 : 0,
      }}
      initial={{ opacity: 0, y: position === 'above' ? 6 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: position === 'above' ? 6 : -6 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
    >
      <div
        className="rounded-xl px-3 py-2.5 min-w-[180px] max-w-[220px]"
        style={{
          backgroundColor: 'var(--color-surface-dark-raised)',
          color: 'var(--color-paper-white)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div className="flex items-start gap-2">
          <div
            className="shrink-0 mt-0.5 w-7 h-7 rounded-md flex items-center justify-center"
            style={{ backgroundColor: 'rgba(247,244,237,0.15)' }}
          >
            <LandmarkIcon category={landmark.category} size={16} color="var(--color-paper-white)" />
          </div>
          <div className="min-w-0">
            <p
              className="text-sm font-bold leading-tight truncate"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {landmark.name}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ fontFamily: 'var(--font-body)', opacity: 0.7 }}
            >
              {CATEGORY_LABELS[landmark.category]}
            </p>
          </div>
        </div>
        <p
          className="text-xs mt-1.5 line-clamp-2 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', opacity: 0.85 }}
        >
          {landmark.saltyNote}
        </p>
      </div>

      {/* Arrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          [position === 'above' ? 'bottom' : 'top']: -6,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          [position === 'above' ? 'borderTop' : 'borderBottom']: '6px solid var(--color-surface-dark-raised)',
        }}
      />
    </motion.div>
  );
}
