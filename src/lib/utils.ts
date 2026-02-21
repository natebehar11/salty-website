export function formatCurrency(amount: number): string {
  if (amount === 0) return 'TBD';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const startMonth = start.toLocaleString('en-US', { month: 'long' });
  const endMonth = end.toLocaleString('en-US', { month: 'long' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = start.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
