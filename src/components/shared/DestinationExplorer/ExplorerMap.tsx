'use client';

import { useState, useCallback, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { SaltyLandmark } from './types';
import MapSticker from './MapSticker';

interface ExplorerMapProps {
  destination: string;
  landmarks: SaltyLandmark[];
  onSelectLandmark: (landmark: SaltyLandmark) => void;
}

export default function ExplorerMap({ destination, landmarks, onSelectLandmark }: ExplorerMapProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Show pinch hint once per session
  useEffect(() => {
    const key = `salty-explorer-hint-${destination}`;
    if (!sessionStorage.getItem(key)) {
      setShowHint(true);
      sessionStorage.setItem(key, '1');
      const timer = setTimeout(() => setShowHint(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [destination]);

  const handlePanStart = useCallback(() => setIsDragging(true), []);
  const handlePanStop = useCallback(() => {
    // Small delay to prevent sticker hover triggering during pan release
    setTimeout(() => setIsDragging(false), 50);
  }, []);

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--color-sand)',
        aspectRatio: '3 / 2',
      }}
    >
      <TransformWrapper
        minScale={1}
        maxScale={2.5}
        initialScale={1}
        wheel={{ step: 0.1 }}
        panning={{
          velocityDisabled: true,
        }}
        doubleClick={{ mode: 'reset' }}
        onPanningStart={handlePanStart}
        onPanningStop={handlePanStop}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {/* SVG Map background */}
          <img
            src={`/maps/${destination}.svg`}
            alt={`Map of ${destination}`}
            className="w-full h-full object-cover"
            draggable={false}
            onError={(e) => {
              // Fallback: hide broken image, stickers still render on sand bg
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />

          {/* Landmark stickers overlay */}
          <div className="absolute inset-0">
            {landmarks.map((landmark) => (
              <MapSticker
                key={landmark._id}
                landmark={landmark}
                onSelect={onSelectLandmark}
                isDragging={isDragging}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Pinch-to-explore hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none"
            style={{
              backgroundColor: 'var(--color-surface-dark)',
              color: 'var(--color-paper-white)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: shouldReduceMotion ? 1 : [0, 1, 1, 0], y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 2.5,
              times: shouldReduceMotion ? undefined : [0, 0.15, 0.85, 1],
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="6" cy="10" r="2" />
              <circle cx="12" cy="10" r="2" />
              <path d="M6 8V5M12 8V5" />
              <path d="M4 10l-2 2M14 10l2 2" />
            </svg>
            <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-body)' }}>
              Pinch to explore the map
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
