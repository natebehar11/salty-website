'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const links = [
    { href: '/retreats', label: 'Retreats' },
    { href: '/about', label: 'About' },
    { href: '/retreats/sri-lanka-surf-yoga-retreat', label: 'Sri Lanka 2026' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-salty-teal"
        >
          <div className="flex min-h-screen flex-col items-center justify-center gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-3xl text-salty-sand hover:text-salty-coral transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-4"
            >
              <Link
                href="/retreats/sri-lanka-surf-yoga-retreat/book"
                onClick={onClose}
                className="bg-salty-coral text-white px-10 py-4 rounded-full font-body font-bold text-lg tracking-wide uppercase transition-all hover:bg-salty-coral-dark"
              >
                Book Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="font-body text-salty-sand/60 text-sm">
                connect@saltyretreats.com
              </p>
              <p className="font-body text-salty-sand/60 text-sm mt-1">
                @saltyretreats
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
