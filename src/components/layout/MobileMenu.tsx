'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Button from '../shared/Button';

type RetreatNavItem = {
  name: string;
  slug: string;
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  retreatDark?: string;
  retreats?: RetreatNavItem[];
}

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://explore.getsaltyretreats.com/quiz', label: 'Find Your Trip', external: true },
];

export default function MobileMenu({ isOpen, onClose, retreatDark, retreats = [] }: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();
  const bgColor = retreatDark || 'var(--color-teal)';

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
            className="fixed top-0 right-0 bottom-0 z-[200] w-[300px] max-w-[85vw] flex flex-col overflow-y-auto"
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-paper-white)" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 2L14 14M14 2L2 14" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-1 px-6">
              {/* Retreats section */}
              <Link
                href="/retreats"
                onClick={onClose}
                className="block py-4 text-xl font-bold uppercase border-b transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-paper-white)',
                  borderColor: 'rgba(247,244,237,0.1)',
                }}
              >
                Retreats
              </Link>

              {/* Individual retreat destinations */}
              {retreats.length > 0 && (
                <div className="flex flex-col gap-0 pl-4">
                  {retreats.map((retreat) => (
                    <Link
                      key={retreat.slug}
                      href={`/retreats/${retreat.slug}`}
                      onClick={onClose}
                      className="block py-2.5 text-sm font-bold transition-colors duration-200"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'rgba(247,244,237,0.7)',
                      }}
                    >
                      {retreat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Standard nav links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block py-4 text-xl font-bold uppercase border-b transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-paper-white)',
                    borderColor: 'rgba(247,244,237,0.1)',
                  }}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-6">
              <Link href="/book" onClick={onClose}>
                <Button variant="primary" fullWidth>
                  Book Now
                </Button>
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
