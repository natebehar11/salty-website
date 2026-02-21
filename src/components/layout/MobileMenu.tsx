'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Button from '../shared/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  retreatDark?: string;
}

const NAV_LINKS = [
  { href: '/retreats', label: 'Retreats' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://explore.getsaltyretreats.com/quiz', label: 'Find Your Trip', external: true },
];

export default function MobileMenu({ isOpen, onClose, retreatDark }: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();
  const bgColor = retreatDark || '#0E3A2D';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed top-0 right-0 bottom-0 z-[200] w-[300px] max-w-[85vw] flex flex-col"
            style={{ backgroundColor: bgColor }}
            initial={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: 'rgba(247,244,237,0.1)' }}
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#F7F4ED" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 2L14 14M14 2L2 14" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-1 px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block py-4 text-xl font-bold uppercase border-b transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#F7F4ED',
                    borderColor: 'rgba(247,244,237,0.1)',
                  }}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-6">
              <Button variant="primary" fullWidth onClick={onClose}>
                Book Now
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
