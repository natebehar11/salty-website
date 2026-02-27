'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface InclusionsSectionProps {
  included: string[];
  notIncluded: string[];
  className?: string;
}

export default function InclusionsSection({ included, notIncluded, className = '' }: InclusionsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const visibleIncluded = expanded ? included : included.slice(0, 5);
  const visibleNotIncluded = expanded ? notIncluded : notIncluded.slice(0, 3);
  const hasMore = included.length > 5 || notIncluded.length > 3;

  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4
            className="text-lg font-bold uppercase mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#0E3A2D' }}
          >
            {"What's Included"}
          </h4>
          <ul className="space-y-3">
            {visibleIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="#A4E5D9" />
                  <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#0E3A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm" style={{ color: '#0E3A2D' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4
            className="text-lg font-bold uppercase mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#0E3A2D' }}
          >
            Not Included
          </h4>
          <ul className="space-y-3">
            {visibleNotIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="#F0E8DB" />
                  <path d="M6 6L12 12M12 6L6 12" stroke="#4A4E58" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-sm" style={{ color: '#4A4E58' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {hasMore && (
        <AnimatePresence>
          {!expanded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
              className="mt-6 text-center"
            >
              <button
                onClick={() => setExpanded(true)}
                className="text-sm font-bold underline transition-colors duration-200 cursor-pointer"
                style={{ color: '#0E3A2D' }}
              >
                See full list
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
