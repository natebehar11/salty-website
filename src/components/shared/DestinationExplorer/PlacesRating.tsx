'use client';

interface PlacesRatingProps {
  rating: number;
  reviewCount: number;
}

function StarIcon({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  if (fill === 'empty') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-teal)" strokeWidth="1" strokeLinejoin="round" style={{ opacity: 0.3 }}>
        <path d="M8 1l2.2 4.6L15 6.3l-3.5 3.4.8 4.9L8 12.3 3.7 14.6l.8-4.9L1 6.3l4.8-.7L8 1z" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      {fill === 'half' ? (
        <>
          <defs>
            <linearGradient id="half-star">
              <stop offset="50%" stopColor="var(--color-golden)" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M8 1l2.2 4.6L15 6.3l-3.5 3.4.8 4.9L8 12.3 3.7 14.6l.8-4.9L1 6.3l4.8-.7L8 1z"
            fill="url(#half-star)"
            stroke="var(--color-golden)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path
          d="M8 1l2.2 4.6L15 6.3l-3.5 3.4.8 4.9L8 12.3 3.7 14.6l.8-4.9L1 6.3l4.8-.7L8 1z"
          fill="var(--color-golden)"
          stroke="var(--color-golden)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function PlacesRating({ rating, reviewCount }: PlacesRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const extraFull = rating - fullStars >= 0.75;

  const stars: ('full' | 'half' | 'empty')[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars + (extraFull ? 1 : 0)) {
      stars.push('full');
    } else if (i === fullStars && hasHalf) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {stars.map((fill, i) => (
          <StarIcon key={i} fill={fill} />
        ))}
      </div>
      <span
        className="text-xs"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
      >
        ({reviewCount.toLocaleString()})
      </span>
    </div>
  );
}
