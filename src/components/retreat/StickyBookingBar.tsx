'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './retreat-theme';

interface StickyBookingBarProps {
  priceFrom: number;
  depositAmount: number;
  destination: string;
  dates: string;
  onBookNow: () => void;
}

export default function StickyBookingBar({
  priceFrom,
  depositAmount,
  destination,
  dates,
  onBookNow,
}: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 2.5;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const footer = document.getElementById('retreat-final-cta');
        const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
        const show = window.scrollY > threshold && footerTop > window.innerHeight;
        setVisible(show);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 90,
            backgroundColor: theme.dark,
            borderTop: `1px solid rgba(255,255,255,0.08)`,
            backdropFilter: 'blur(16px)',
            padding: '12px var(--space-section-x)',
          }}
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ maxWidth: 'var(--space-container-max)' }}
          >
            <div className="hidden sm:flex flex-col gap-0.5">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  textTransform: 'uppercase',
                  color: 'var(--color-paper-white)',
                  letterSpacing: '-0.01em',
                }}
              >
                {destination}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'var(--color-sand)',
                  opacity: 0.7,
                }}
              >
                {dates}
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 ml-auto">
              <div className="flex flex-col items-end gap-0">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    color: 'var(--color-paper-white)',
                  }}
                >
                  From ${priceFrom.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    color: theme.accent,
                    opacity: 0.8,
                  }}
                >
                  ${depositAmount} deposit
                </span>
              </div>

              <button
                onClick={onBookNow}
                style={{
                  minHeight: 44,
                  padding: '10px 28px',
                  borderRadius: 28,
                  border: 'none',
                  backgroundColor: theme.accent,
                  color: 'var(--color-paper-white)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(247,90,61,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
