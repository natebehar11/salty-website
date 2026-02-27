'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface WallOfLoveItem {
  guestName: string;
  quote: string;
  retreatLabel?: string;
  avatarUrl?: string;
  rating?: number;
  featured?: boolean;
}

interface WallOfLoveProps {
  items: WallOfLoveItem[];
  className?: string;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="19" viewBox="0 0 28 27" fill="none">
      <path
        d="M14 1L17.7 9.1L26.6 10.4L20.3 16.5L21.8 25.3L14 21.2L6.2 25.3L7.7 16.5L1.4 10.4L10.3 9.1L14 1Z"
        fill={filled ? 'var(--color-golden)' : 'none'}
        stroke={filled ? undefined : 'var(--color-golden)'}
        strokeWidth={filled ? undefined : '1.5'}
      />
    </svg>
  );
}

function QuoteCard({ item, index }: { item: WallOfLoveItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const isFeatured = item.featured;

  const initials = item.guestName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const bgColors = [
    'var(--color-surface-base)',
    'var(--color-surface-warm-light)',
    'var(--color-sky)',
    'var(--color-sand)',
    'var(--color-aquamarine)',
  ];
  const bgColor = isFeatured ? 'var(--color-surface-dark)' : bgColors[index % bgColors.length];
  const textColor = isFeatured ? 'var(--color-paper-white)' : 'var(--color-teal)';
  const quoteColor = isFeatured ? 'var(--color-sand)' : 'var(--color-slate-grey)';
  const labelColor = isFeatured ? 'var(--color-golden)' : 'var(--color-coral)';

  return (
    <motion.div
      className={`flex flex-col p-6 ${isFeatured ? 'sm:col-span-2' : ''}`}
      style={{
        borderRadius: 'var(--radius-card)',
        backgroundColor: bgColor,
        boxShadow: 'var(--shadow-card-resting)',
      }}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.97 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Large opening quote mark */}
      <svg
        width="40"
        height="32"
        viewBox="0 0 40 32"
        fill="none"
        className="mb-3"
        aria-hidden="true"
      >
        <path
          d="M0 32V19.2C0 13.87 1.33 9.6 4 6.4C6.67 3.2 10.27 1.07 14.8 0L17.2 5.6C14.13 6.4 11.8 7.87 10.2 10C8.6 12.13 7.8 14.67 7.8 17.6H16V32H0ZM24 32V19.2C24 13.87 25.33 9.6 28 6.4C30.67 3.2 34.27 1.07 38.8 0L41.2 5.6C38.13 6.4 35.8 7.87 34.2 10C32.6 12.13 31.8 14.67 31.8 17.6H40V32H24Z"
          fill={labelColor}
          opacity="0.3"
        />
      </svg>

      {/* Quote */}
      <p
        className="flex-1 mb-5"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: isFeatured ? 'var(--type-h4)' : 'var(--type-body-lg)',
          fontWeight: isFeatured ? 400 : 400,
          color: quoteColor,
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Guest info */}
      <div className="flex items-center gap-3">
        {item.avatarUrl ? (
          <img
            src={item.avatarUrl}
            alt={item.guestName}
            className="rounded-full object-cover shrink-0"
            style={{ width: 48, height: 48 }}
          />
        ) : (
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{
              width: 48,
              height: 48,
              backgroundColor: isFeatured ? 'var(--color-surface-dark-raised)' : 'var(--color-sand)',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
            }}
          >
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p
            className="font-bold truncate"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-base)',
              color: textColor,
            }}
          >
            {item.guestName}
          </p>
          {item.retreatLabel && (
            <p
              className="text-sm truncate"
              style={{ color: labelColor, fontWeight: 700 }}
            >
              {item.retreatLabel}
            </p>
          )}
        </div>
        <div className="flex gap-0.5 shrink-0">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < (item.rating ?? 5)} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function WallOfLove({ items, className = '' }: WallOfLoveProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${className}`}
      style={{ gap: 'var(--space-grid-gap)' }}
    >
      {items.map((item, index) => (
        <QuoteCard key={item.guestName} item={item} index={index} />
      ))}
    </div>
  );
}
