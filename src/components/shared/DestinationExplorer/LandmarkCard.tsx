'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { SaltyLandmark } from './types';
import { CATEGORY_LABELS } from './types';
import LandmarkIcon from './landmark-icons';
import DiscoveryTags from './DiscoveryTags';

interface LandmarkCardProps {
  landmark: SaltyLandmark;
  accentColor: string;
  onSelect: (landmark: SaltyLandmark) => void;
}

export default function LandmarkCard({ landmark, accentColor, onSelect }: LandmarkCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      className="w-full text-left rounded-2xl overflow-hidden transition-shadow duration-200 cursor-pointer group"
      style={{
        backgroundColor: 'var(--color-paper-white)',
        boxShadow: 'var(--shadow-card-resting)',
        borderBottom: `3px solid transparent`,
      }}
      whileHover={shouldReduceMotion ? {} : {
        y: -2,
        boxShadow: 'var(--shadow-card-hover)',
        borderBottomColor: accentColor,
      }}
      onClick={() => onSelect(landmark)}
      aria-label={`View ${landmark.name}`}
    >
      <div className="p-4 flex gap-3">
        {/* Category icon */}
        <div
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <LandmarkIcon category={landmark.category} size={22} color={accentColor} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4
              className="text-base font-bold leading-tight truncate"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}
            >
              {landmark.name}
            </h4>
            <span
              className="shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              {CATEGORY_LABELS[landmark.category]}
            </span>
          </div>

          <p
            className="text-sm mt-1 line-clamp-2 leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-slate-grey)',
            }}
          >
            {landmark.saltyNote}
          </p>

          {landmark.tags.length > 0 && (
            <div className="mt-2">
              <DiscoveryTags tags={landmark.tags} />
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
