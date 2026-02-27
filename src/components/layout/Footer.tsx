'use client';

import Link from 'next/link';

type FooterRetreat = {
  name: string;
  slug: string;
};

interface FooterProps {
  retreats?: FooterRetreat[];
  instagram?: string;
  tiktok?: string;
}

const EXPLORE_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/reviews', label: 'Reviews' },
];

const TOOL_LINKS = [
  { href: 'https://explore.getsaltyretreats.com/quiz', label: 'Find Your Trip', external: true },
  { href: 'https://explore.getsaltyretreats.com/flights', label: 'Flight Finder', external: true },
  { href: 'https://explore.getsaltyretreats.com/compare', label: 'Price Compare', external: true },
  { href: 'https://explore.getsaltyretreats.com/planner', label: 'Trip Planner', external: true },
];

export default function Footer({ retreats = [], instagram, tiktok }: FooterProps) {
  return (
    <footer
      className="w-full"
      style={{ backgroundColor: 'var(--color-surface-dark-deep)' }}
    >
      <div className="mx-auto px-6 pt-16 pb-8" style={{ maxWidth: 'var(--space-container-max)' }}>
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" aria-label="SALTY Retreats home">
              <span
                className="uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--color-paper-white)',
                }}
              >
                SALTY
              </span>
            </Link>
            <p
              className="mt-3 leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--color-sand)',
                maxWidth: '260px',
              }}
            >
              Fitness retreats for fun-loving people. Sweat, surf, explore, and actually have fun.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-4">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: 'var(--color-sand)' }}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: 'var(--color-sand)' }}
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.88a8.28 8.28 0 004.76 1.5v-3.45a4.84 4.84 0 01-1-.24z" />
                  </svg>
                </a>
              )}
              <a
                href="mailto:hello@getsaltyretreats.com"
                className="transition-colors duration-200"
                style={{ color: 'var(--color-sand)' }}
                aria-label="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7L12 13L2 7" />
                </svg>
              </a>
              <a
                href="https://wa.me/14318291135"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'var(--color-sand)' }}
                aria-label="WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Retreats */}
          <div>
            <h3
              className="uppercase tracking-wider mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-paper-white)',
              }}
            >
              Retreats
            </h3>
            <ul className="flex flex-col gap-2.5">
              {retreats.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/retreats/${r.slug}`}
                    className="transition-colors duration-200 underline hover:no-underline"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--color-sand)',
                    }}
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/retreats"
                  className="transition-colors duration-200 underline hover:no-underline"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-sand)',
                  }}
                >
                  All Retreats
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3
              className="uppercase tracking-wider mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-paper-white)',
              }}
            >
              Explore
            </h3>
            <ul className="flex flex-col gap-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 underline hover:no-underline"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--color-sand)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3
              className="uppercase tracking-wider mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-paper-white)',
              }}
            >
              Tools
            </h3>
            <ul className="flex flex-col gap-2.5">
              {TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 underline hover:no-underline"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--color-sand)',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Book */}
          <div>
            <h3
              className="uppercase tracking-wider mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-paper-white)',
              }}
            >
              Book
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/book"
                  className="transition-colors duration-200 underline hover:no-underline"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-sand)',
                  }}
                >
                  Book Now
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/14318291135?text=Hey%20SALTY!%20I%20have%20a%20question%20about%20your%20retreats."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 underline hover:no-underline"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-sand)',
                  }}
                >
                  Chat With Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-paper-white-10)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-sand-60)',
            }}
          >
            &copy; {new Date().getFullYear()} SALTY Retreats. All rights reserved.
          </p>

          {/* TICO trust badge */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-sand-60)',
            }}
          >
            Trips booked through Movement Travel, TICO Reg. #50026098
          </p>

          <div className="flex gap-4">
            <Link
              href="/privacy"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-sand-60)',
              }}
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-sand-60)',
              }}
              className="transition-colors duration-200 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
