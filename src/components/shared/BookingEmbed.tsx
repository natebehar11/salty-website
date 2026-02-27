interface BookingEmbedProps {
  checkoutUrl: string;
  retreatName?: string;
  className?: string;
  height?: string;
}

export default function BookingEmbed({
  checkoutUrl,
  retreatName = 'retreat',
  className = '',
  height = '800px',
}: BookingEmbedProps) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden ${className}`} style={{ boxShadow: 'var(--shadow-sm)' }}>
      <iframe
        src={checkoutUrl}
        title={`Book ${retreatName}`}
        className="w-full border-0"
        style={{ height, minHeight: '600px' }}
        loading="lazy"
        allow="payment"
      />
    </div>
  );
}
