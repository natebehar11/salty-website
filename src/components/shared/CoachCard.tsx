'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface CoachCardProps {
  name: string;
  bio: string;
  photoUrl?: string;
  specialties?: string[];
  personality?: string;
  cardColor: string;
  starColor?: string; // tertiary accent; defaults to cardColor if omitted
  textColor?: string; // explicit override; falls back to isDarkSurface(cardColor) logic
  size?: 'large' | 'small';
  className?: string;
}

function isDarkSurface(hex: string): boolean {
  const darkColors = ['#C74235', '#3A6B35', '#0E3A2D', '#4A4E58', '#0B3126', '#1F4638', '#A7372C'];
  // Light surfaces (#FF7E70 coral, #FED260 golden, #B6D4EA sky, #A4E5D9 aqua) use dark text — not listed here
  return darkColors.some(c => c.toLowerCase() === hex.toLowerCase());
}

// Exact polygon from assets/salty-design/Visual Anchors/Stars/
// Name is embedded as SVG <text> elements, centered in the viewBox.
// Font size scales with character count so short names stay natural (no stretch/warp).
// The star fill (starColor) is independent of the card background (cardColor).
const STAR_CX = 104.946;
const STAR_CY = 99.835;
const STAR_MAX_FONT_SIZE = 52;  // SVG units — cap for very short names (3–4 chars)
const STAR_TARGET_WIDTH = 148;  // SVG units — the width each name ideally approaches
const STAR_CHAR_WIDTH_RATIO = 0.62; // approx ratio of char width to font-size for this display font
const STAR_LINE_HALF_GAP = 26;  // half the distance between the two line centers

// Returns the largest font size where the name fits within STAR_TARGET_WIDTH.
// Short names get a large (but not warped) size; long names scale down to fit.
function starFontSize(name: string): number {
  return Math.min(STAR_MAX_FONT_SIZE, STAR_TARGET_WIDTH / (name.length * STAR_CHAR_WIDTH_RATIO));
}

function StarburstSvg({
  starColor,
  firstName,
  lastName,
  textColor,
}: {
  starColor: string;
  firstName: string;
  lastName: string;
  textColor: string;
}) {
  const y1 = lastName ? STAR_CY - STAR_LINE_HALF_GAP : STAR_CY;
  const y2 = STAR_CY + STAR_LINE_HALF_GAP;
  const fs1 = starFontSize(firstName);
  const fs2 = starFontSize(lastName);

  return (
    <svg viewBox="0 0 209.892 199.669" fill="none" className="w-full h-full">
      <polygon
        points="209.892 99.835 188.041 126.838 189.851 161.53 156.284 170.51 137.384 199.669 104.946 187.181 72.507 199.669 53.607 170.509 20.041 161.529 21.851 126.837 0 99.835 21.851 72.831 20.042 38.139 53.608 29.159 72.509 0 104.946 12.488 137.385 0 156.285 29.16 189.852 38.141 188.042 72.833 209.892 99.835"
        fill={starColor}
      />
      <text
        x={STAR_CX}
        y={y1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={fs1}
        style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}
      >
        {firstName}
      </text>
      {lastName && (
        <text
          x={STAR_CX}
          y={y2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textColor}
          fontSize={fs2}
          style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}
        >
          {lastName}
        </text>
      )}
    </svg>
  );
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

export default function CoachCard({
  name,
  bio,
  photoUrl,
  specialties = [],
  personality,
  cardColor,
  starColor,
  textColor,
  size = 'large',
  className = '',
}: CoachCardProps) {
  const [showBio, setShowBio] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const textOnColor = textColor ?? (isDarkSurface(cardColor) ? 'var(--color-sand)' : 'var(--color-teal)');
  const resolvedStarColor = starColor ?? cardColor;
  const { firstName, lastName } = splitName(name);

  if (size === 'small') {
    return (
      <div
        className={`overflow-hidden cursor-pointer ${className}`}
        style={{
          width: 364,
          height: 120,
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="flex h-full">
          <div
            className="shrink-0 w-[120px] h-[120px] overflow-hidden"
            style={{ border: `var(--border-coach-frame) solid ${cardColor}` }}
          >
            {photoUrl ? (
              <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full" style={{ backgroundColor: 'var(--color-sand)' }} />
            )}
          </div>
          <div
            className="flex-1 flex flex-col justify-center px-3 py-2 overflow-hidden"
            style={{ backgroundColor: cardColor }}
          >
            <p
              className="uppercase leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                color: textOnColor,
              }}
            >
              {firstName}
            </p>
            {lastName && (
              <p
                className="uppercase leading-none mt-0.5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  color: textOnColor,
                }}
              >
                {lastName}
              </p>
            )}
            {specialties.length > 0 && (
              <p
                className="mt-1.5 uppercase leading-tight truncate"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '10px',
                  color: textOnColor,
                  opacity: 0.8,
                }}
              >
                {specialties.join(' | ')}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-3 items-center overflow-visible cursor-pointer min-w-0 w-full max-w-full ${className}`}
      style={{
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={() => setShowBio(true)}
      onMouseLeave={() => setShowBio(false)}
    >
      {/* Image Container — 3:4 portrait with thick colored border */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '504 / 670',
          borderRadius: 'var(--radius-card)',
          border: `var(--border-coach-frame) solid ${cardColor}`,
        }}
      >
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: 'var(--color-sand)' }} />
        )}

        {/* Starburst + Name overlay (default state) */}
        <AnimatePresence>
          {!showBio && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              {/* Starburst with name embedded — centered inside SVG viewBox */}
              <div
                className="absolute"
                style={{
                  top: '2%',
                  left: '3%',
                  width: '47%',
                  height: '36%',
                }}
              >
                <StarburstSvg
                  starColor={resolvedStarColor}
                  firstName={firstName}
                  lastName={lastName}
                  textColor={textOnColor}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover overlay with bio */}
        <AnimatePresence>
          {showBio && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-8 px-4 md:px-5 py-3 md:py-4 overflow-y-auto min-h-0"
              style={{ backgroundColor: cardColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <div
                className="uppercase text-center shrink-0"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: textOnColor,
                }}
              >
                <p style={{ fontSize: 'clamp(24px, 8vw, 48px)', lineHeight: 1, margin: 0 }}>
                  {firstName}
                </p>
                {lastName && (
                  <p style={{ fontSize: 'clamp(16px, 5vw, 32px)', lineHeight: 1, margin: 0 }}>
                    {lastName}
                  </p>
                )}
              </div>
              <p
                className="text-center leading-normal min-w-0 w-full whitespace-pre-line"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(12px, 2.5vw, 18px)',
                  color: textOnColor,
                }}
              >
                {bio}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Specialty Bar */}
      <div
        className="w-full min-w-0 px-3 md:px-5 py-2 md:py-3 text-center overflow-hidden"
        style={{ backgroundColor: cardColor, borderRadius: 'var(--radius-card)' }}
      >
        <div
          className="uppercase break-words"
          style={{
            fontFamily: 'var(--font-display)',
            color: textOnColor,
          }}
        >
          {specialties.length > 0 && (
            <p style={{ fontSize: 'clamp(10px, 2.5vw, 17px)', lineHeight: 1.2, margin: 0 }}>
              {specialties.join(' | ')}
            </p>
          )}
          {personality && (
            <p style={{ fontSize: 'clamp(11px, 3vw, 22px)', lineHeight: 1.2, margin: 0 }}>
              {personality}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
