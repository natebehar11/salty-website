'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Dimension = 'sweatLevel' | 'rest' | 'culture' | 'adventure' | 'party' | 'groupSize';

type LegacyScores = { sweat?: number; adventure?: number; culture?: number; party?: number; rest?: number };
type NewScores = Partial<Record<Dimension, number>>;

interface SaltyMeterProps {
  scores: LegacyScores & NewScores;
  fillColor?: string;
  /** @deprecated Use fillColor instead */
  accentColor?: string;
  onClose?: () => void;
  className?: string;
  onDark?: boolean;
}

const DIMENSIONS: { key: Dimension; label: string; legacyKey?: string }[] = [
  { key: 'sweatLevel', label: 'SWEAT LEVEL', legacyKey: 'sweat' },
  { key: 'rest', label: 'REST' },
  { key: 'culture', label: 'CULTURE' },
  { key: 'adventure', label: 'ADVENTURE' },
  { key: 'party', label: 'PARTY' },
  { key: 'groupSize', label: 'GROUP SIZE' },
];

const MAX_SCORE = 10;
const GRID_STEPS = [2, 4, 6, 8, 10];
const CX = 160;
const CY = 160;
const RADIUS = 130;

function getHexPoint(index: number, scale: number): [number, number] {
  const angle = (Math.PI / 2) + (index * (2 * Math.PI) / 6);
  const r = RADIUS * (scale / MAX_SCORE);
  return [CX - r * Math.cos(angle), CY - r * Math.sin(angle)];
}

function hexagonPath(scale: number): string {
  const points = Array.from({ length: 6 }, (_, i) => getHexPoint(i, scale));
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ') + ' Z';
}

function resolveScore(scores: LegacyScores & NewScores, dim: typeof DIMENSIONS[number]): number {
  const val = (scores as Record<string, number | undefined>)[dim.key]
    ?? (dim.legacyKey ? (scores as Record<string, number | undefined>)[dim.legacyKey] : undefined)
    ?? 0;
  return Math.min(Math.max(val, 0), MAX_SCORE);
}

function dataPath(scores: LegacyScores & NewScores): string {
  const points = DIMENSIONS.map((dim, i) => {
    const score = resolveScore(scores, dim);
    return getHexPoint(i, score);
  });
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ') + ' Z';
}

function labelPosition(index: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } {
  const [px, py] = getHexPoint(index, MAX_SCORE + 1.8);
  const anchors: ('start' | 'middle' | 'end')[] = ['middle', 'start', 'start', 'middle', 'end', 'end'];
  return { x: px, y: py, anchor: anchors[index] ?? 'middle' };
}

export default function SaltyMeter({
  scores,
  fillColor,
  accentColor,
  onClose,
  className = '',
}: SaltyMeterProps) {
  const shouldReduceMotion = useReducedMotion();
  const color = fillColor || accentColor || 'var(--color-coral)';
  const scaleLabels = GRID_STEPS.slice().reverse().concat([0]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center justify-between w-full mb-1">
        <div />
        <p
          className="uppercase text-center"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--color-teal)',
            lineHeight: 1,
          }}
        >
          SALTY METER
        </p>
        {onClose ? (
          <button
            onClick={onClose}
            className="cursor-pointer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--color-teal)',
              opacity: 0.6,
              background: 'none',
              border: 'none',
            }}
            aria-label="Close SALTY Meter"
          >
            x
          </button>
        ) : (
          <div />
        )}
      </div>

      <svg
        viewBox="-10 -10 340 340"
        width="335"
        height="280"
        style={{ overflow: 'visible' }}
      >
        {GRID_STEPS.map((step) => (
          <path
            key={step}
            d={hexagonPath(step)}
            fill="none"
            stroke="var(--color-paper-white)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
        ))}

        {DIMENSIONS.map((_, i) => {
          const [x, y] = getHexPoint(i, MAX_SCORE);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="var(--color-paper-white)"
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
          );
        })}

        <motion.path
          d={dataPath(scores)}
          fill={color}
          fillOpacity="0.6"
          stroke={color}
          strokeWidth="2"
          strokeOpacity="0.8"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
        />

        {scaleLabels.map((val) => {
          const [, y] = getHexPoint(0, val);
          return (
            <text
              key={val}
              x={CX}
              y={y + 4}
              textAnchor="middle"
              fill="var(--color-paper-white)"
              fillOpacity="0.5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              {val}
            </text>
          );
        })}

        {DIMENSIONS.map((dim, i) => {
          const { x, y, anchor } = labelPosition(i);
          return (
            <text
              key={dim.key}
              x={x}
              y={y + 4}
              textAnchor={anchor}
              fill="var(--color-teal)"
              fillOpacity="0.6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                letterSpacing: '0.5px',
              }}
            >
              {dim.label}
            </text>
          );
        })}

        {DIMENSIONS.map((dim, i) => {
          const score = resolveScore(scores, dim);
          const [x, y] = getHexPoint(i, score);
          return (
            <motion.circle
              key={dim.key}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              stroke="var(--color-paper-white)"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.3 + i * 0.05,
                duration: shouldReduceMotion ? 0 : 0.3,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export type { Dimension, SaltyMeterProps };
