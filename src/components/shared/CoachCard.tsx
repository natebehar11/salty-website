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
  size?: 'large' | 'small';
  className?: string;
}

function isDarkSurface(hex: string): boolean {
  const darkColors = ['#C74235', '#3A6B35', '#0E3A2D', '#4A4E58', '#0B3126', '#1F4638', '#A7372C'];
  return darkColors.some(c => c.toLowerCase() === hex.toLowerCase());
}

function StarburstSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <path
        d="M100 8c6 18 12 28 22 32s24 2 42 4c-14 12-22 22-22 34s6 24 12 40c-16-6-28-8-38-4s-18 14-28 26c-4-16-10-28-20-32s-22-4-38-8c12-10 20-20 22-32s-2-24-6-40c14 6 26 10 36 6s14-12 18-26z"
        fill={color}
      />
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
  size = 'large',
  className = '',
}: CoachCardProps) {
  const [showBio, setShowBio] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const textOnColor = isDarkSurface(cardColor) ? 'var(--color-sand)' : 'var(--color-teal)';
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
      className={`flex flex-col gap-3 items-center overflow-visible cursor-pointer ${className}`}
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
              {/* Starburst positioned top-left */}
              <div
                className="absolute"
                style={{
                  top: '2%',
                  left: '3%',
                  width: '47%',
                  height: '36%',
                }}
              >
                <StarburstSvg color={cardColor} />
              </div>

              {/* Name positioned over starburst */}
              <div
                className="absolute uppercase text-center whitespace-nowrap"
                style={{
                  top: '8%',
                  left: '3%',
                  width: '47%',
                  fontFamily: 'var(--font-display)',
                  color: textOnColor,
                }}
              >
                <p style={{ fontSize: '34px', lineHeight: 1, margin: 0 }}>
                  {firstName}
                </p>
                {lastName && (
                  <p style={{ fontSize: '22px', lineHeight: 1, margin: 0 }}>
                    {lastName}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover overlay with bio */}
        <AnimatePresence>
          {showBio && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-5 py-4"
              style={{ backgroundColor: cardColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <div
                className="uppercase text-center"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: textOnColor,
                }}
              >
                <p style={{ fontSize: '48px', lineHeight: 1, margin: 0 }}>
                  {firstName}
                </p>
                {lastName && (
                  <p style={{ fontSize: '32px', lineHeight: 1, margin: 0 }}>
                    {lastName}
                  </p>
                )}
              </div>
              <p
                className="text-center leading-normal"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
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
        className="w-full px-5 py-3 text-center overflow-hidden"
        style={{ backgroundColor: cardColor, borderRadius: 'var(--radius-card)' }}
      >
        <div
          className="uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            color: textOnColor,
          }}
        >
          {specialties.length > 0 && (
            <p style={{ fontSize: '17px', lineHeight: 1.2, margin: 0 }}>
              {specialties.join(' | ')}
            </p>
          )}
          {personality && (
            <p style={{ fontSize: '22px', lineHeight: 1.2, margin: 0 }}>
              {personality}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
