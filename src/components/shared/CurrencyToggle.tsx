'use client';

import { useState, useEffect } from 'react';
import { CURRENCIES, type Currency } from '@/lib/constants';

// Re-export for convenience
export { convertPrice, formatPrice } from '@/lib/constants';

interface CurrencyToggleProps {
  onCurrencyChange?: (currency: Currency) => void;
  className?: string;
}

function safeGetStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private browsing or storage full — silently fail
  }
}

export default function CurrencyToggle({
  onCurrencyChange,
  className = '',
}: CurrencyToggleProps) {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const saved = safeGetStorage('salty-currency') as Currency | null;
    if (saved && CURRENCIES.some((c) => c.code === saved)) {
      setCurrency(saved);
    }
  }, []);

  function handleChange(newCurrency: Currency) {
    setCurrency(newCurrency);
    safeSetStorage('salty-currency', newCurrency);
    onCurrencyChange?.(newCurrency);
  }

  return (
    <div className={`inline-flex flex-col gap-1.5 ${className}`}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--color-slate-grey)',
        }}
      >
        See in your currency
      </p>
      <div className="inline-flex rounded-full overflow-hidden" style={{ border: 'var(--border-thin) solid var(--color-sand)' }}>
        {CURRENCIES.map((c) => (
          <button
            key={c.code}
            onClick={() => handleChange(c.code)}
            className="px-3 py-1.5 text-xs font-bold transition-colors duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: currency === c.code ? 'var(--color-teal)' : 'transparent',
              color: currency === c.code ? 'var(--color-paper-white)' : 'var(--color-teal)',
            }}
            aria-label={c.label}
            title={c.label}
          >
            {c.code}
          </button>
        ))}
      </div>
      {currency !== 'USD' && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: 'var(--color-slate-grey)',
            opacity: 0.7,
          }}
        >
          Prices shown in USD. Approximate conversions for reference only.
        </p>
      )}
    </div>
  );
}
