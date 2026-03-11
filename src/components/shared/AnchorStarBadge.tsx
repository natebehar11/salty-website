'use client';

/**
 * Visual anchor star from design system (assets/salty-design/Visual Anchors/Stars/).
 * Replaces clip-path starbursts site-wide for consistent branding.
 */

const ANCHOR_STAR_VIEWBOX = '0 0 209.892 199.669';
const ANCHOR_STAR_POINTS =
  '209.892 99.835 188.041 126.838 189.851 161.53 156.284 170.51 137.384 199.669 104.946 187.181 72.507 199.669 53.607 170.509 20.041 161.529 21.851 126.837 0 99.835 21.851 72.831 20.042 38.139 53.608 29.159 72.509 0 104.946 12.488 137.385 0 156.285 29.16 189.852 38.141 188.042 72.833 209.892 99.835';
const STAR_CX = 104.946;
const STAR_CY = 99.835;

export interface AnchorStarBadgeProps {
  text: string;
  size?: number;
  starColor?: string;
  textColor?: string;
  className?: string;
}

export default function AnchorStarBadge({
  text,
  size = 110,
  starColor = 'var(--color-coral)',
  textColor = 'var(--color-golden)',
  className = '',
}: AnchorStarBadgeProps) {
  const fontSize = Math.round((size / 110) * 22);
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={ANCHOR_STAR_VIEWBOX}
        fill="none"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label={text}
      >
        <polygon points={ANCHOR_STAR_POINTS} fill={starColor} />
        <text
          x={STAR_CX}
          y={STAR_CY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textColor}
          fontSize={fontSize}
          style={{
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
