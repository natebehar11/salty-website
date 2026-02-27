'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SaltyMeter from './SaltyMeter';

const RETREAT_META: Record<string, { name: string; officialName: string }> = {
  'sri-lanka': { name: 'SRI LANKA', officialName: 'Island Tides' },
  panama: { name: 'PANAMA', officialName: 'City to Sea' },
  morocco: { name: 'MOROCCO', officialName: 'Beyond the Dunes' },
  sicily: { name: 'SICILY', officialName: 'Endless Summer' },
  'el-salvador': { name: 'EL SALVADOR', officialName: 'SALT & HUSTL' },
  'costa-rica': { name: 'COSTA RICA', officialName: 'Surf Sweat Flow v4' },
  nicaragua: { name: 'NICARAGUA', officialName: 'TBD' },
};

export type RetreatSlug = keyof typeof RETREAT_META;

type SaltyMeterScores = {
  sweat?: number;
  adventure?: number;
  culture?: number;
  party?: number;
  rest?: number;
  sweatLevel?: number;
  groupSize?: number;
};

type RetreatCardProps = {
  size?: 'large' | 'medium' | 'small';
  retreat: RetreatSlug;
  dates: string;
  price: number;
  totalDays: number;
  imageSrc?: string;
  discountPrice?: number;
  badge?: 'selling-fast' | 'sold-out' | 'new-trip' | 'early-bird';
  showMeter?: boolean;
  saltyMeterScores?: SaltyMeterScores;
  onMeterToggle?: () => void;
  className?: string;
};

function TicketBadge({ officialName }: { officialName: string }) {
  const words = officialName.toUpperCase().split(' ');
  return (
    <div className="absolute top-3 left-[-1px] z-10">
      <svg width="220" height="75" viewBox="0 0 220 75" fill="none">
        <path d="M0 8C0 3.58 3.58 0 8 0H200C210 0 218 6 220 16L215 75H0V8Z" fill="var(--retreat-primary)" />
      </svg>
      <div
        className="absolute top-1 left-2.5 flex flex-col leading-none"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--retreat-ticket-text)', fontSize: '28px' }}
      >
        {words.map((word, i) => (
          <span key={i} className={i > 0 ? 'mt-0.5' : ''}>{word}</span>
        ))}
      </div>
    </div>
  );
}

function EarlyBirdSticker() {
  return (
    <div className="absolute -top-6 -right-4 z-20 rotate-12">
      <div
        className="w-[110px] h-[105px] rounded-full flex items-center justify-center"
        style={{
          backgroundColor: 'var(--retreat-accent)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <span
          className="text-center uppercase leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            color: 'var(--color-teal)',
          }}
        >
          EARLY
          <br />
          BIRD
        </span>
      </div>
    </div>
  );
}

export default function RetreatCard({
  size = 'large',
  retreat,
  dates,
  price,
  totalDays,
  imageSrc,
  discountPrice,
  badge,
  showMeter = false,
  saltyMeterScores,
  onMeterToggle,
  className = '',
}: RetreatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const meta = RETREAT_META[retreat] ?? RETREAT_META['sri-lanka'];
  const isDiscount = !!discountPrice || badge === 'early-bird';
  const perDay = Math.ceil(price / totalDays);

  if (size === 'small') {
    return (
      <motion.div
        data-retreat={retreat}
        className={`overflow-hidden cursor-pointer ${className}`}
        style={{
          width: 364,
          height: 120,
          borderRadius: 'var(--radius-card)',
          backgroundColor: 'var(--retreat-accent)',
          boxShadow: 'var(--shadow-sm)',
        }}
        whileHover={{
          y: -2,
          boxShadow: 'var(--shadow-card-hover)',
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <div className="flex h-full">
          <div
            className="shrink-0 w-[120px] h-[120px] overflow-hidden"
            style={{ border: `var(--border-coach-frame) solid var(--retreat-accent)`, borderRight: 0, borderRadius: 'var(--radius-card) 0 0 var(--radius-card)' }}
          >
            {imageSrc ? (
              <img src={imageSrc} alt={meta.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full" style={{ backgroundColor: 'var(--retreat-primary)' }} />
            )}
          </div>
          <div
            className="flex-1 flex flex-col gap-1 px-3 py-3 overflow-hidden"
            style={{ backgroundColor: 'var(--retreat-accent)', borderRadius: '0 var(--radius-card) var(--radius-card) 0' }}
          >
            <p
              className="leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                color: 'var(--retreat-text-on-primary)',
              }}
            >
              {meta.name}
            </p>
            <p
              className="leading-normal"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--retreat-text-on-primary)',
              }}
            >
              {dates}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--color-paper-white)',
              }}
            >
              From ${perDay} USD/day
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const cardWidth = size === 'large' ? 376 : 320;
  const borderWidth = isHovered ? 13 : 12;
  const gap = size === 'large' ? 12 : 10;

  return (
    <motion.div
      data-retreat={retreat}
      className={`cursor-pointer ${className}`}
      style={{
        width: cardWidth,
        overflow: 'visible',
        background: 'transparent',
        borderRadius: 'var(--radius-card)',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -3 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="flex flex-col items-center" style={{ gap, background: 'transparent' }}>
        {/* Image Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: '242 / 322',
            borderRadius: 'var(--radius-card)',
            border: `${borderWidth}px solid var(--retreat-accent)`,
            boxShadow: isHovered ? 'var(--shadow-topcard-hover)' : 'var(--shadow-topcard-resting)',
            transition: 'box-shadow 0.25s ease, border-width 0.25s ease',
          }}
        >
          {imageSrc ? (
            <motion.img
              src={imageSrc}
              alt={meta.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            />
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--retreat-primary)' }}
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <span
                className="opacity-20"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '48px',
                  color: 'var(--color-paper-white)',
                }}
              >
                SALTY
              </span>
            </motion.div>
          )}

          <TicketBadge officialName={meta.officialName} />

          {isDiscount && <EarlyBirdSticker />}

          {badge && badge !== 'early-bird' && (
            <div className="absolute top-3 right-3 z-10">
              <BadgePill variant={badge} />
            </div>
          )}

          {/* SALTY Meter Overlay */}
          <AnimatePresence>
            {showMeter && saltyMeterScores && (
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center"
                style={{ backgroundColor: 'var(--retreat-surface)', borderRadius: 'var(--radius-card)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              >
                <SaltyMeter
                  scores={saltyMeterScores}
                  fillColor="var(--retreat-accent)"
                  onClose={onMeterToggle}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <div
          className="w-full p-5 flex flex-col gap-2"
          style={{
            borderRadius: 'var(--radius-card)',
            backgroundColor: 'var(--retreat-accent)',
            boxShadow: isHovered ? 'var(--shadow-bottomcard-hover)' : 'var(--shadow-bottomcard-resting)',
            transition: 'box-shadow 0.25s ease',
          }}
        >
          <div className="flex items-center justify-between">
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                color: 'var(--retreat-text-on-primary)',
                lineHeight: 1,
              }}
            >
              {meta.name}
            </p>
            <div
              className="w-[43px] h-[43px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--retreat-text-on-primary)', opacity: 0.15 }}
            >
              <span style={{ fontSize: '20px' }}>🧂</span>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--retreat-text-on-primary)',
            }}
          >
            {dates}
          </p>

          <div className="flex items-center justify-between" style={{ fontSize: '14px', color: 'var(--retreat-text-on-primary)' }}>
            {isDiscount ? (
              <p style={{ fontFamily: 'var(--font-body)' }}>
                <span>Starting at </span>
                <span className="line-through">${price.toLocaleString()}</span>
                <span> </span>
                <span className="font-bold">${(discountPrice ?? price).toLocaleString()}</span>
              </p>
            ) : (
              <p className="underline" style={{ fontFamily: 'var(--font-body)' }}>
                Starting at ${price.toLocaleString()}
              </p>
            )}
            <button
              className="italic font-bold cursor-pointer bg-transparent border-none p-0"
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'inherit' }}
              onClick={(e) => { e.stopPropagation(); onMeterToggle?.(); }}
              aria-label="Toggle SALTY Meter"
            >
              Vibe Check ⓘ
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BadgePill({ variant }: { variant: 'selling-fast' | 'sold-out' | 'new-trip' }) {
  const config = {
    'selling-fast': { bg: 'var(--color-coral)', text: 'var(--color-paper-white)', label: 'Selling Fast' },
    'sold-out': { bg: 'var(--color-rust-red)', text: 'var(--color-paper-white)', label: 'Sold Out' },
    'new-trip': { bg: 'var(--color-sky)', text: 'var(--color-teal)', label: 'New Trip' },
  };
  const { bg, text, label } = config[variant];

  return (
    <span
      className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-body)' }}
    >
      {label}
    </span>
  );
}

export { RETREAT_META };
export type { RetreatCardProps };
