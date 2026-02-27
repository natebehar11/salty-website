'use client';

import Button from '@/components/shared/Button';
import PriceDisplay from '@/components/shared/PriceDisplay';

interface RetreatTicketProps {
  name: string;
  dates: string;
  startingPrice: number;
  totalDays: number;
  bookingUrl?: string | null;
  onBookNow: () => void;
  /** Retreat accent for CTA (hex or CSS var) */
  accentColor?: string;
  className?: string;
}

/**
 * Sticky booking summary card.
 * Desktop: sidebar-style card. Mobile: bottom bar or inline.
 */
export default function RetreatTicket({
  name,
  dates,
  startingPrice,
  totalDays,
  bookingUrl,
  onBookNow,
  accentColor,
  className = '',
}: RetreatTicketProps) {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col gap-4 ${className}`}
      style={{
        backgroundColor: 'var(--color-paper-white)',
        boxShadow: 'var(--shadow-lg)',
        borderRadius: 'var(--radius-card)',
        border: 'var(--border-thin) solid var(--color-sand)',
      }}
    >
      <h3
        className="uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          color: 'var(--color-teal)',
          lineHeight: 1.2,
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-slate-grey)',
        }}
      >
        {dates} · {totalDays} days
      </p>
      <div className="flex items-baseline gap-2">
        <PriceDisplay
          priceUSD={startingPrice}
          totalDays={totalDays}
          format="card"
          showCurrencyToggle={false}
          className="text-xl"
        />
      </div>
      <Button
        variant="retreat"
        retreatAccent={accentColor}
        fullWidth
        size="lg"
        onClick={onBookNow}
      >
        {bookingUrl ? 'Book Now' : 'Get Details'}
      </Button>
    </div>
  );
}
