'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ExplorerView } from './types';

interface ViewToggleProps {
  activeView: ExplorerView;
  onToggle: (view: ExplorerView) => void;
}

export default function ViewToggle({ activeView, onToggle }: ViewToggleProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="inline-flex rounded-full p-1 relative"
      style={{ backgroundColor: 'var(--color-surface-warm-light)' }}
      role="tablist"
      aria-label="View mode"
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-full"
        style={{ backgroundColor: 'var(--retreat-primary)', width: 'calc(50% - 4px)' }}
        animate={{ x: activeView === 'map' ? 0 : '100%' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
        layout
      />
      <button
        role="tab"
        aria-selected={activeView === 'map'}
        className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
        style={{
          fontFamily: 'var(--font-body)',
          color: activeView === 'map' ? 'var(--retreat-text-on-primary)' : 'var(--color-teal)',
        }}
        onClick={() => onToggle('map')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 3.5l4.5-2 5 2 4.5-2v11l-4.5 2-5-2-4.5 2V3.5z" />
          <path d="M5.5 1.5v11M10.5 3.5v11" />
        </svg>
        Map
      </button>
      <button
        role="tab"
        aria-selected={activeView === 'list'}
        className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
        style={{
          fontFamily: 'var(--font-body)',
          color: activeView === 'list' ? 'var(--retreat-text-on-primary)' : 'var(--color-teal)',
        }}
        onClick={() => onToggle('list')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 4h12M2 8h12M2 12h12" />
        </svg>
        List
      </button>
    </div>
  );
}
