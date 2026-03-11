'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import type { SaltyLandmark } from './types';
import LandmarkCard from './LandmarkCard';

interface ExplorerListViewProps {
  landmarks: SaltyLandmark[];
  onSelectLandmark: (landmark: SaltyLandmark) => void;
}

/** Accent colors for card border cycling — never adjacent same color */
const ACCENT_CYCLE = [
  'var(--retreat-accent)',
  'var(--color-coral)',
  'var(--color-sky)',
  'var(--color-golden)',
  'var(--color-aquamarine)',
];

function getCardAccent(index: number): string {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length];
}

function AnimatedCard({
  landmark,
  index,
  onSelect,
}: {
  landmark: SaltyLandmark;
  index: number;
  onSelect: (landmark: SaltyLandmark) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        delay: shouldReduceMotion ? 0 : index * 0.03,
      }}
    >
      <LandmarkCard
        landmark={landmark}
        accentColor={getCardAccent(index)}
        onSelect={onSelect}
      />
    </motion.div>
  );
}

export default function ExplorerListView({ landmarks, onSelectLandmark }: ExplorerListViewProps) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}
    >
      <style>{`
        @media (min-width: 640px) { .explorer-list-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .explorer-list-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
      <div className="grid gap-4 explorer-list-grid" style={{ gridTemplateColumns: '1fr' }}>
        <AnimatePresence mode="popLayout">
          {landmarks.map((landmark, i) => (
            <AnimatedCard
              key={landmark._id}
              landmark={landmark}
              index={i}
              onSelect={onSelectLandmark}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
