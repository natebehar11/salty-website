// ── Currency ──

export type Currency = 'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR';

export const CURRENCIES: { code: Currency; symbol: string; label: string }[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
];

// Approximate exchange rates — update manually or connect to API
export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
  EUR: 0.92,
};

export function convertPrice(priceUSD: number, currency: Currency): number {
  return Math.round(priceUSD * EXCHANGE_RATES[currency]);
}

export function formatPrice(priceUSD: number, currency: Currency): string {
  const converted = convertPrice(priceUSD, currency);
  const { symbol } = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  return `${symbol}${converted.toLocaleString()}`;
}

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES.find((c) => c.code === currency)?.symbol || '$';
}
