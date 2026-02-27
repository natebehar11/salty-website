'use client';

interface TestimonialCardProps {
  guestName: string;
  quote: string;
  rating?: number;
  retreatLabel?: string;
  /** @deprecated Use retreatLabel instead */
  retreatAttended?: string;
  /** @deprecated Use retreatLabel instead */
  city?: string;
  avatarUrl?: string;
  surface?: 'base' | 'warm-light' | 'dark-raised';
  className?: string;
}

const SURFACE_CONFIG = {
  base: {
    bg: 'var(--color-surface-base)',
    border: 'var(--color-teal)',
    nameColor: 'var(--color-teal)',
    quoteColor: 'var(--color-teal)',
    retreatColor: 'var(--color-coral)',
  },
  'warm-light': {
    bg: 'var(--color-surface-warm-light)',
    border: 'var(--color-teal)',
    nameColor: 'var(--color-teal)',
    quoteColor: 'var(--color-teal)',
    retreatColor: 'var(--color-coral)',
  },
  'dark-raised': {
    bg: 'var(--color-surface-dark-raised)',
    border: 'var(--color-paper-white)',
    nameColor: 'var(--color-paper-white)',
    quoteColor: 'var(--color-paper-white)',
    retreatColor: 'var(--color-golden)',
  },
} as const;

function StarRow({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;

        return (
          <svg key={i} width="28" height="27" viewBox="0 0 28 27" fill="none">
            {filled && (
              <path
                d="M14 1L17.7 9.1L26.6 10.4L20.3 16.5L21.8 25.3L14 21.2L6.2 25.3L7.7 16.5L1.4 10.4L10.3 9.1L14 1Z"
                fill="var(--color-golden)"
              />
            )}
            {half && (
              <>
                <path
                  d="M14 1L17.7 9.1L26.6 10.4L20.3 16.5L21.8 25.3L14 21.2L6.2 25.3L7.7 16.5L1.4 10.4L10.3 9.1L14 1Z"
                  fill="var(--color-golden)"
                  clipPath="inset(0 50% 0 0)"
                />
                <path
                  d="M14 1L17.7 9.1L26.6 10.4L20.3 16.5L21.8 25.3L14 21.2L6.2 25.3L7.7 16.5L1.4 10.4L10.3 9.1L14 1Z"
                  fill="none"
                  stroke="var(--color-golden)"
                  strokeWidth="1.5"
                />
              </>
            )}
            {!filled && !half && (
              <path
                d="M14 1L17.7 9.1L26.6 10.4L20.3 16.5L21.8 25.3L14 21.2L6.2 25.3L7.7 16.5L1.4 10.4L10.3 9.1L14 1Z"
                fill="none"
                stroke="var(--color-golden)"
                strokeWidth="1.5"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

function AvatarCircle({ url, name }: { url?: string; name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: 80, height: 80 }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: 80,
        height: 80,
        backgroundColor: 'var(--color-sand)',
        fontFamily: 'var(--font-body)',
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--color-teal)',
      }}
    >
      {initials}
    </div>
  );
}

export default function TestimonialCard({
  guestName,
  quote,
  rating = 5,
  retreatLabel,
  retreatAttended,
  city,
  avatarUrl,
  surface = 'base',
  className = '',
}: TestimonialCardProps) {
  const config = SURFACE_CONFIG[surface];
  const hasAvatar = !!avatarUrl;

  const displayLabel =
    retreatLabel ||
    [retreatAttended, city].filter(Boolean).join(', ') ||
    undefined;

  return (
    <div
      className={`flex flex-col items-center gap-2.5 overflow-hidden p-6 w-full max-w-[376px] ${className}`}
      style={{
        borderRadius: 'var(--radius-card)',
        backgroundColor: config.bg,
        border: `4px solid ${config.border}`,
        boxShadow: 'var(--shadow-topcard-resting)',
      }}
    >
      <p
        className="text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '30px',
          fontWeight: 700,
          color: config.nameColor,
          lineHeight: 1,
        }}
      >
        {guestName}
      </p>

      {hasAvatar && <AvatarCircle url={avatarUrl} name={guestName} />}

      {displayLabel && (
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 700,
            color: config.retreatColor,
            lineHeight: 1,
          }}
        >
          {displayLabel}
        </p>
      )}

      <p
        className="text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 400,
          color: config.quoteColor,
          lineHeight: 1,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      <StarRow rating={rating} />
    </div>
  );
}
