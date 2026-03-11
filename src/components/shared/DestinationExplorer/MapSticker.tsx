'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { SaltyLandmark } from './types';
import LandmarkIcon from './landmark-icons';
import LandmarkPreview from './LandmarkPreview';

interface MapStickerProps {
  landmark: SaltyLandmark;
  onSelect: (landmark: SaltyLandmark) => void;
  isDragging: boolean;
}

const HOVER_SHOW_DELAY = 200;
const HOVER_GRACE_PERIOD = 150;

export default function MapSticker({ landmark, onSelect, isDragging }: MapStickerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [showPreview, setShowPreview] = useState(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Preview position: show above by default, below if sticker is near top
  const previewPosition = landmark.coordinates.y < 20 ? 'below' : 'above';

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isDragging) return;
    clearTimers();
    showTimerRef.current = setTimeout(() => setShowPreview(true), HOVER_SHOW_DELAY);
  }, [isDragging, clearTimers]);

  const handleMouseLeave = useCallback(() => {
    clearTimers();
    hideTimerRef.current = setTimeout(() => setShowPreview(false), HOVER_GRACE_PERIOD);
  }, [clearTimers]);

  const handleClick = useCallback(() => {
    setShowPreview(false);
    clearTimers();
    onSelect(landmark);
  }, [landmark, onSelect, clearTimers]);

  return (
    <div
      className="absolute"
      style={{
        left: `${landmark.coordinates.x}%`,
        top: `${landmark.coordinates.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: showPreview ? 10 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {showPreview && !isDragging && (
          <LandmarkPreview landmark={landmark} position={previewPosition} />
        )}
      </AnimatePresence>

      <motion.button
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: 'var(--color-paper-white)',
          border: '2px solid var(--retreat-accent)',
          boxShadow: 'var(--shadow-md)',
        }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? {} : { scale: 1.12 }}
        onClick={handleClick}
        aria-label={`${landmark.name}, ${landmark.category}`}
        role="button"
      >
        <LandmarkIcon category={landmark.category} size={20} color="var(--retreat-accent)" />
      </motion.button>
    </div>
  );
}
