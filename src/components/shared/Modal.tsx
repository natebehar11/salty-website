'use client';

import { useEffect, useCallback, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  mobileDrawer?: boolean;
  ariaLabel?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
  mobileDrawer = true,
  ariaLabel,
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    // Focus trap: cycle Tab within the dialog
    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Save the element that had focus before opening
      triggerRef.current = document.activeElement as HTMLElement;

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Set initial focus inside the dialog
      requestAnimationFrame(() => {
        const closeBtn = dialogRef.current?.querySelector<HTMLElement>('button[aria-label="Close modal"]');
        closeBtn?.focus();
      });
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Restore focus to trigger on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={`relative z-10 w-full max-h-[90vh] overflow-y-auto
              ${mobileDrawer
                ? 'fixed bottom-0 md:relative md:bottom-auto md:max-w-2xl md:mx-4 rounded-t-3xl md:rounded-3xl'
                : 'max-w-2xl mx-4 rounded-3xl'
              } ${className}`}
            style={{
              backgroundColor: '#F7F4ED',
              boxShadow: '0 12px 32px rgba(30,25,20,0.12), 0 4px 8px rgba(30,25,20,0.06)',
            }}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : mobileDrawer
                  ? { opacity: 0, y: 100 }
                  : { opacity: 0, scale: 0.95 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : mobileDrawer
                  ? { opacity: 0, y: 100 }
                  : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 min-w-11 min-h-11 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer z-10"
              style={{ backgroundColor: '#F0E8DB', color: '#0E3A2D' }}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 2L14 14M14 2L2 14" />
              </svg>
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
