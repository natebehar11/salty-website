'use client';

import { useEffect, useState } from 'react';

interface SocialProofBarProps {
  totalGuests?: number;
  averageRating?: number;
  countriesCount?: number;
  quotes?: { quote: string; author: string }[];
  className?: string;
}

const STATS_DEFAULTS = {
  totalGuests: 200,
  averageRating: 4.9,
  countriesCount: 7,
};

export default function SocialProofBar({
  totalGuests = STATS_DEFAULTS.totalGuests,
  averageRating = STATS_DEFAULTS.averageRating,
  countriesCount = STATS_DEFAULTS.countriesCount,
  quotes = [],
  className = '',
}: SocialProofBarProps) {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div
      className={`w-full py-6 ${className}`}
      style={{ backgroundColor: 'var(--color-teal)' }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Stats */}
          <div className="flex items-center gap-8 md:gap-12">
            <div className="text-center">
              <p
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--color-golden)',
                  lineHeight: 1,
                }}
              >
                {totalGuests}+
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-sand)',
                  marginTop: '2px',
                }}
              >
                Happy Guests
              </p>
            </div>

            <div
              className="h-8 w-px"
              style={{ backgroundColor: 'rgba(247,244,237,0.15)' }}
            />

            <div className="text-center">
              <p
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--color-golden)',
                  lineHeight: 1,
                }}
              >
                {averageRating}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-sand)',
                  marginTop: '2px',
                }}
              >
                Avg Rating
              </p>
            </div>

            <div
              className="h-8 w-px"
              style={{ backgroundColor: 'rgba(247,244,237,0.15)' }}
            />

            <div className="text-center">
              <p
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--color-golden)',
                  lineHeight: 1,
                }}
              >
                {countriesCount}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-sand)',
                  marginTop: '2px',
                }}
              >
                Countries
              </p>
            </div>
          </div>

          {/* Rotating quotes */}
          {quotes.length > 0 && (
            <div className="text-center md:text-right max-w-md">
              <p
                className="italic"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--color-paper-white)',
                }}
              >
                &ldquo;{quotes[activeQuote]?.quote}&rdquo;
              </p>
              <p
                className="mt-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-sand)',
                }}
              >
                — {quotes[activeQuote]?.author}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
