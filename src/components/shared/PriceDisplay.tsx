'use client';

import { useState } from 'react';
import Tooltip from './Tooltip';

type Currency = 'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR';

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
  EUR: 0.92,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  EUR: '€',
};

interface PriceDisplayProps {
  priceUSD: number;
  totalDays?: number;
  format?: 'card' | 'detail';
  roomType?: string;
  showCurrencyToggle?: boolean;
  className?: string;
}

export default function PriceDisplay({
  priceUSD,
  totalDays,
  format = 'detail',
  roomType,
  showCurrencyToggle = false,
  className = '',
}: PriceDisplayProps) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const converted = Math.round(priceUSD * EXCHANGE_RATES[currency]);
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = converted.toLocaleString();

  if (format === 'card' && totalDays) {
    const perDay = Math.ceil(priceUSD / totalDays);
    return (
      <span className={`text-sm font-bold ${className}`} style={{ color: '#0E3A2D' }}>
        From ${perDay}/day
      </span>
    );
  }

  const priceContent = (
    <span className={`font-bold ${className}`} style={{ color: '#0E3A2D' }}>
      From {symbol}{formatted} {currency}
    </span>
  );

  return (
    <div className="inline-flex flex-col gap-2">
      {roomType ? (
        <Tooltip content={`Price for 1 guest in a ${roomType}`}>
          {priceContent}
        </Tooltip>
      ) : (
        priceContent
      )}

      {currency !== 'USD' && (
        <span className="text-xs" style={{ color: '#4A4E58' }}>
          Prices shown in USD. Approximate conversions for reference only.
        </span>
      )}

      {showCurrencyToggle && (
        <div className="flex gap-1 mt-1">
          {(Object.keys(EXCHANGE_RATES) as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className="px-2 py-1 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer"
              style={{
                backgroundColor: currency === c ? '#0E3A2D' : '#F0E8DB',
                color: currency === c ? '#F7F4ED' : '#0E3A2D',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
