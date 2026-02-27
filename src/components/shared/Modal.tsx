'use client';

import { useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  mobileDrawer?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
  mobileDrawer = true,
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

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
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer z-10"
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
