type BadgeVariant = 'selling-fast' | 'sold-out' | 'new-trip' | 'early-bird';

interface StatusBadgeProps {
  variant: BadgeVariant;
  originalPrice?: string;
  className?: string;
}

const BADGE_STYLES: Record<BadgeVariant, { bg: string; text: string; label: string }> = {
  'selling-fast': { bg: '#F75A3D', text: '#F7F4ED', label: 'Selling Fast' },
  'sold-out': { bg: '#C74235', text: '#F7F4ED', label: 'Sold Out' },
  'new-trip': { bg: '#B6D4EA', text: '#0E3A2D', label: 'New Trip' },
  'early-bird': { bg: '#FED260', text: '#0E3A2D', label: 'Early Bird' },
};

export default function StatusBadge({ variant, originalPrice, className = '' }: StatusBadgeProps) {
  const { bg, text, label } = BADGE_STYLES[variant];

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
      {variant === 'early-bird' && originalPrice && (
        <span className="line-through opacity-70 text-xs">{originalPrice}</span>
      )}
    </span>
  );
}
