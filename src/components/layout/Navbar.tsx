'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-salty-teal/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src="/images/logos/coral-logo.png"
              alt="SALTY Retreats"
              width={48}
              height={48}
              className="h-10 w-10 lg:h-12 lg:w-12 transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/retreats"
              className={`font-body text-sm font-bold tracking-wide uppercase transition-colors ${
                scrolled ? 'text-salty-sand hover:text-salty-coral' : 'text-white hover:text-salty-coral'
              }`}
            >
              Retreats
            </Link>
            <Link
              href="/about"
              className={`font-body text-sm font-bold tracking-wide uppercase transition-colors ${
                scrolled ? 'text-salty-sand hover:text-salty-coral' : 'text-white hover:text-salty-coral'
              }`}
            >
              About
            </Link>
            <Link
              href="/retreats/sri-lanka-surf-yoga-retreat"
              className="bg-salty-coral text-white px-6 py-2.5 rounded-full font-body font-bold text-sm tracking-wide uppercase transition-all hover:bg-salty-coral-dark hover:scale-103 active:scale-98"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? 'rotate-45 translate-y-2 bg-salty-sand'
                    : scrolled
                    ? 'bg-salty-sand'
                    : 'bg-white'
                }`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? 'opacity-0'
                    : scrolled
                    ? 'bg-salty-sand'
                    : 'bg-white'
                }`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? '-rotate-45 -translate-y-2 bg-salty-sand'
                    : scrolled
                    ? 'bg-salty-sand'
                    : 'bg-white'
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
