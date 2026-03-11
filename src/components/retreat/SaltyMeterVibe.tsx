'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SaltyMeter from '@/components/shared/SaltyMeter';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';

const DIMENSION_KEY = [
  { label: 'Group Size',  desc: 'How many people you\'ll share the experience with. 1 = ~6 guests, 10 = 60+.' },
  { label: 'Sweat Level', desc: 'How intense and frequent the workouts will be.' },
  { label: 'Adventure',   desc: 'The dose of excursions, exploration, and off-the-beaten-path moments.' },
  { label: 'Culture',     desc: 'How immersed you\'ll be in local traditions, food, and community.' },
  { label: 'Party',       desc: 'The level of nightlife, dancing, and evening social energy.' },
  { label: 'Rest',        desc: 'The amount of downtime, relaxation, and quiet moments built in.' },
];

export default function SaltyMeterVibe({ retreat }: { retreat: RetreatData }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="retreat-salty-meter"
      ref={ref}
      style={{ backgroundColor: '#0B3126' }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 'var(--space-container-max)',
          margin: '0 auto',
          padding: 'var(--space-section-y) var(--space-section-x)',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}
      >
        {/* Heading — single line, shrinks to fit, never clips */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            textTransform: 'uppercase',
            color: 'var(--color-paper-white)',
            lineHeight: 1.05,
          }}
        >
          {retreat.destination} SALTY Meter
        </motion.h2>

        {/* Chart left · blurb right */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 52, alignItems: 'start' }}
          className="max-md:grid-cols-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SaltyMeter
              scores={{
                sweat: retreat.saltyMeter.sweat,
                adventure: retreat.saltyMeter.adventure,
                culture: retreat.saltyMeter.culture,
                party: retreat.saltyMeter.party,
                rest: retreat.saltyMeter.rest,
                groupSize: retreat.saltyMeter.groupSize,
              }}
              fillColor={theme.accent}
              hideTitle
              onDark
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-lg)',
              color: 'var(--color-sand)',
              lineHeight: 1.75,
              paddingTop: 24,
            }}
          >
            {retreat.saltyMeterBlurb}
          </motion.p>
        </div>

        {/* Dimension key — below, 3-col, slightly larger than before */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.45 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px 40px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 28,
          }}
          className="max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          {DIMENSION_KEY.map(({ label, desc }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: theme.accent,
                  marginBottom: 4,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--color-sand)',
                  lineHeight: 1.55,
                  opacity: 0.75,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
