'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { SaltyLandmark, ExplorerView } from './types';
import { FILTER_TO_CATEGORIES } from './types';
import ViewToggle from './ViewToggle';
import CategoryFilter from './CategoryFilter';
import ExplorerMap from './ExplorerMap';
import ExplorerListView from './ExplorerListView';
import LandmarkModal from './LandmarkModal';

interface DestinationExplorerProps {
  /** Retreat slug — used to load the correct SVG map */
  destination: string;
  /** Landmarks from Sanity (server-fetched) */
  landmarks: SaltyLandmark[];
  /** Section heading override */
  heading?: string;
  /** Section subheading override */
  subheading?: string;
  /** Default view mode */
  defaultView?: ExplorerView;
}

export default function DestinationExplorer({
  destination,
  landmarks,
  heading = 'Explore the Area',
  subheading = 'Our favourite spots, tested by sweat and sunsets.',
  defaultView = 'map',
}: DestinationExplorerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeView, setActiveView] = useState<ExplorerView>(defaultView);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalLandmark, setModalLandmark] = useState<SaltyLandmark | null>(null);

  // Don't render the section if there are no landmarks
  if (landmarks.length === 0) return null;

  const filteredLandmarks = useMemo(() => {
    if (activeFilter === 'all') return landmarks;
    const categories = FILTER_TO_CATEGORIES[activeFilter] ?? [];
    if (categories.length === 0) return landmarks;
    return landmarks.filter((lm) => categories.includes(lm.category));
  }, [landmarks, activeFilter]);

  const handleSelectLandmark = useCallback((landmark: SaltyLandmark) => {
    setModalLandmark(landmark);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalLandmark(null);
  }, []);

  // If no SVG map exists, default to list view
  const effectiveView = activeView;

  return (
    <section
      id="destination-explorer"
      style={{
        padding: 'var(--space-section-y) var(--space-section-x)',
        backgroundColor: 'var(--color-surface-dark)',
      }}
    >
      <div style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2
              className="text-section"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-paper-white)',
              }}
            >
              {heading}
            </h2>
            <p
              className="mt-1 text-base"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-paper-white)',
                opacity: 0.7,
              }}
            >
              {subheading}
            </p>
          </div>
          <ViewToggle activeView={activeView} onToggle={setActiveView} />
        </div>

        {/* Category filters */}
        <div className="mb-6">
          <CategoryFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* Map / List view */}
        <AnimatePresence mode="wait">
          {effectiveView === 'map' ? (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              <ExplorerMap
                destination={destination}
                landmarks={filteredLandmarks}
                onSelectLandmark={handleSelectLandmark}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              <ExplorerListView
                landmarks={filteredLandmarks}
                onSelectLandmark={handleSelectLandmark}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Landmark count */}
        <p
          className="mt-4 text-xs text-center"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-paper-white)',
            opacity: 0.4,
          }}
        >
          {filteredLandmarks.length} of {landmarks.length} spots
        </p>
      </div>

      {/* Detail modal */}
      <LandmarkModal landmark={modalLandmark} onClose={handleCloseModal} />
    </section>
  );
}
