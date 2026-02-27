'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import Button from '../shared/Button';

type RetreatNavItem = {
  name: string;
  officialName: string;
  slug: string;
};

interface NavbarProps {
  /** Retreat color overrides for retreat detail pages */
  retreatDark?: string;
  retreatAccent?: string;
  /** Active retreats to populate the dropdown */
  retreats?: RetreatNavItem[];
}

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://explore.getsaltyretreats.com/quiz', label: 'Find Your Trip', external: true },
];

export default function Navbar({ retreatDark, retreatAccent, retreats = [] }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const shouldReduceMotion = useReducedMotion();

  const solidBg = retreatDark || 'var(--color-teal)';
  const accentColor = retreatAccent || 'var(--color-coral)';

  // Scroll behavior: transparent → solid + hide on scroll-down / show on scroll-up
  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > lastScrollY.current && currentY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function openDropdown() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  }

  function closeDropdown() {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] transition-colors"
        style={{
          backgroundColor: scrolled ? solidBg : 'transparent',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
          transitionDuration: shouldReduceMotion ? '0ms' : '250ms',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
        animate={{
          y: hidden ? (shouldReduceMotion ? 0 : -100) : 0,
          opacity: hidden && shouldReduceMotion ? 0 : 1,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <nav className="mx-auto flex items-center justify-between px-6 py-4" style={{ maxWidth: 'var(--space-container-max)' }}>
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="SALTY Retreats home">
            <span
              className="uppercase tracking-wider"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                color: 'var(--color-paper-white)',
              }}
            >
              SALTY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Retreats Dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <Link
                href="/retreats"
                className="uppercase tracking-wider transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  color: 'var(--color-paper-white)',
                }}
              >
                Retreats
                <svg
                  className="inline-block ml-1 transition-transform duration-200"
                  style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                >
                  <path d="M1 1L5 5L9 1" stroke="var(--color-paper-white)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <div
                    className="rounded-xl py-2 min-w-[220px]"
                    style={{
                      backgroundColor: solidBg,
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {retreats.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/retreats/${r.slug}`}
                        className="block px-4 py-2.5 transition-colors duration-200 hover:bg-white/10"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: 'var(--color-paper-white)',
                        }}
                      >
                        <span className="font-bold">{r.officialName}</span>
                        <span className="ml-2 opacity-60">{r.name}</span>
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-1 pt-1">
                      <Link
                        href="/retreats"
                        className="block px-4 py-2.5 transition-colors duration-200 hover:bg-white/10"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: 'var(--color-sand)',
                        }}
                      >
                        View All Retreats
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="uppercase tracking-wider transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  color: 'var(--color-paper-white)',
                }}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA — gentle text-style per spec */}
            <Link
              href="/book"
              className="uppercase tracking-wider transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: accentColor,
              }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
              <path d="M0 1H24M0 8H24M0 15H24" stroke="var(--color-paper-white)" strokeWidth="2" />
            </svg>
          </button>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        retreatDark={retreatDark}
        retreats={retreats.map((r) => ({ name: r.name, slug: r.slug }))}
      />
    </>
  );
}
