'use client';

import { motion, useReducedMotion } from 'framer-motion';

// ─────────────────────────────────────────────
// Inline SVG paths — tropical, lightweight (<1KB each)
// ─────────────────────────────────────────────

function PalmLeafSVG({ size, color }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 110C60 110 20 80 15 45C12 25 30 10 60 20C90 10 108 25 105 45C100 80 60 110 60 110Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M60 110V20"
        stroke={color || 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M60 40C45 30 30 32 25 40M60 55C42 45 28 50 22 58M60 70C44 62 32 66 28 74M60 85C46 78 36 82 33 88"
        stroke={color || 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M60 40C75 30 90 32 95 40M60 55C78 45 92 50 98 58M60 70C76 62 88 66 92 74M60 85C74 78 84 82 87 88"
        stroke={color || 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

function WaveCurlSVG({ size, color }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 120 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 40C20 40 20 20 40 20C60 20 60 40 80 40C100 40 100 20 120 20"
        stroke={color || 'currentColor'}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M0 50C20 50 20 30 40 30C60 30 60 50 80 50C100 50 100 30 120 30"
        stroke={color || 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function SunRaySVG({ size, color }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="18" fill={color || 'currentColor'} opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = Math.round((50 + Math.cos(rad) * 26) * 100) / 100;
        const y1 = Math.round((50 + Math.sin(rad) * 26) * 100) / 100;
        const x2 = Math.round((50 + Math.cos(rad) * 40) * 100) / 100;
        const y2 = Math.round((50 + Math.sin(rad) * 40) * 100) / 100;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color || 'currentColor'}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

function TropicalFlowerSVG({ size, color }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = Math.round((50 + Math.cos(rad) * 18) * 100) / 100;
        const cy = Math.round((50 + Math.sin(rad) * 18) * 100) / 100;
        return (
          <ellipse
            key={angle}
            cx={cx}
            cy={cy}
            rx="14"
            ry="8"
            transform={`rotate(${angle} ${cx} ${cy})`}
            fill={color || 'currentColor'}
            opacity="0.5"
          />
        );
      })}
      <circle cx="50" cy="50" r="8" fill={color || 'currentColor'} opacity="0.8" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type DecorationType = 'palm-leaf' | 'wave-curl' | 'sun-ray' | 'tropical-flower';

export interface Decoration {
  type: DecorationType;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  size: number;
  color?: string;
  opacity?: number;
  animationDuration?: number;
  animationDelay?: number;
  yOffset?: number;
  rotate?: number;
}

interface FloatingDecorationsProps {
  decorations: Decoration[];
  className?: string;
}

const SVG_MAP: Record<DecorationType, React.FC<{ size: number; color?: string }>> = {
  'palm-leaf': PalmLeafSVG,
  'wave-curl': WaveCurlSVG,
  'sun-ray': SunRaySVG,
  'tropical-flower': TropicalFlowerSVG,
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function FloatingDecorations({
  decorations,
  className = '',
}: FloatingDecorationsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {decorations.map((dec, i) => {
        const SvgComponent = SVG_MAP[dec.type];
        const yOffset = dec.yOffset ?? dec.size * 0.15;
        const rotateDeg = dec.rotate ?? 5;
        const duration = dec.animationDuration ?? 4;
        const delay = dec.animationDelay ?? i * 0.8;
        const opacity = dec.opacity ?? 0.1;

        return (
          <motion.div
            key={`${dec.type}-${i}`}
            className="absolute"
            style={{
              ...dec.position,
              opacity,
              willChange: 'transform',
            }}
            animate={{
              y: [0, -yOffset, 0],
              rotate: [0, rotateDeg, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            <SvgComponent size={dec.size} color={dec.color} />
          </motion.div>
        );
      })}
    </div>
  );
}
