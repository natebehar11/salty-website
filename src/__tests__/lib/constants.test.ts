import { describe, it, expect } from 'vitest';
import {
  CURRENCIES,
  EXCHANGE_RATES,
  convertPrice,
  formatPrice,
  getCurrencySymbol,
  type Currency,
} from '@/lib/constants';

describe('CURRENCIES', () => {
  it('contains 5 currencies', () => {
    expect(CURRENCIES).toHaveLength(5);
  });

  it('has USD as first currency', () => {
    expect(CURRENCIES[0].code).toBe('USD');
  });

  it('each currency has code, symbol, and label', () => {
    CURRENCIES.forEach((c) => {
      expect(c).toHaveProperty('code');
      expect(c).toHaveProperty('symbol');
      expect(c).toHaveProperty('label');
      expect(c.code.length).toBe(3);
      expect(c.symbol.length).toBeGreaterThan(0);
      expect(c.label.length).toBeGreaterThan(0);
    });
  });
});

describe('EXCHANGE_RATES', () => {
  it('USD rate is 1', () => {
    expect(EXCHANGE_RATES.USD).toBe(1);
  });

  it('has rates for all currencies', () => {
    const codes: Currency[] = ['USD', 'GBP', 'CAD', 'AUD', 'EUR'];
    codes.forEach((code) => {
      expect(EXCHANGE_RATES[code]).toBeGreaterThan(0);
    });
  });

  it('GBP rate is less than 1 (USD buys less GBP)', () => {
    expect(EXCHANGE_RATES.GBP).toBeLessThan(1);
  });

  it('EUR rate is less than 1', () => {
    expect(EXCHANGE_RATES.EUR).toBeLessThan(1);
  });
});

describe('convertPrice', () => {
  it('returns the same price for USD', () => {
    expect(convertPrice(1000, 'USD')).toBe(1000);
  });

  it('converts to GBP correctly', () => {
    expect(convertPrice(1000, 'GBP')).toBe(Math.round(1000 * EXCHANGE_RATES.GBP));
  });

  it('converts to CAD correctly', () => {
    expect(convertPrice(1000, 'CAD')).toBe(Math.round(1000 * EXCHANGE_RATES.CAD));
  });

  it('rounds to nearest integer', () => {
    const result = convertPrice(999, 'GBP');
    expect(Number.isInteger(result)).toBe(true);
  });

  it('handles zero', () => {
    expect(convertPrice(0, 'EUR')).toBe(0);
  });
});

describe('formatPrice', () => {
  it('formats USD with $ symbol', () => {
    expect(formatPrice(1000, 'USD')).toBe('$1,000');
  });

  it('formats GBP with £ symbol', () => {
    const result = formatPrice(1000, 'GBP');
    expect(result).toMatch(/^£/);
  });

  it('formats CAD with C$ symbol', () => {
    const result = formatPrice(1000, 'CAD');
    expect(result).toMatch(/^C\$/);
  });

  it('formats AUD with A$ symbol', () => {
    const result = formatPrice(1000, 'AUD');
    expect(result).toMatch(/^A\$/);
  });

  it('formats EUR with € symbol', () => {
    const result = formatPrice(1000, 'EUR');
    expect(result).toMatch(/^€/);
  });

  it('includes thousands separator', () => {
    expect(formatPrice(10000, 'USD')).toBe('$10,000');
  });
});

describe('getCurrencySymbol', () => {
  it('returns $ for USD', () => {
    expect(getCurrencySymbol('USD')).toBe('$');
  });

  it('returns £ for GBP', () => {
    expect(getCurrencySymbol('GBP')).toBe('£');
  });

  it('returns € for EUR', () => {
    expect(getCurrencySymbol('EUR')).toBe('€');
  });

  it('returns $ as fallback for unknown currency', () => {
    // TypeScript wouldn't normally allow this, but testing the fallback
    expect(getCurrencySymbol('XYZ' as Currency)).toBe('$');
  });
});
