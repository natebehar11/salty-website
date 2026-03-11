'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import CoachCard from '@/components/shared/CoachCard';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';

function CoachWithReveal({ coach, delay }: { coach: RetreatData['coaches'][0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      style={{
        filter: isInView || shouldReduceMotion ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.9)',
        transition: 'filter 1.2s ease',
      }}
    >
      <CoachCard
        name={coach.name}
        bio={coach.bio}
        photoUrl={coach.photoUrl}
        specialties={coach.specialties}
        personality={coach.personality}
        cardColor={coach.cardColor}
        starColor={coach.starColor}
        textColor={coach.textColor}
        size="large"
      />
    </motion.div>
  );
}

export default function CoachesReveal({ coaches }: { coaches: RetreatData['coaches'] }) {
  const topRow = coaches.slice(0, 3);
  const bottomRow = coaches.slice(3);

  return (
    <section style={{ padding: 'var(--space-section-y) var(--space-section-x)', backgroundColor: 'var(--color-surface-base)' }}>
      <div style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-h2)',
            textTransform: 'uppercase',
            color: theme.primary,
            marginBottom: 40,
          }}
        >
          Your Coaches
        </h2>

        {/* Top row — up to 3 coaches */}
        <div
          style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(topRow.length, 3)}, 1fr)`, gap: 32 }}
          className="max-md:!grid-cols-1"
        >
          {topRow.map((coach, i) => (
            <CoachWithReveal key={i} coach={coach} delay={i * 0.15} />
          ))}
        </div>

        {/* Bottom row — remaining coaches, centered */}
        {bottomRow.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 32,
              marginTop: 32,
              flexWrap: 'wrap',
            }}
          >
            {bottomRow.map((coach, i) => (
              <div
                key={topRow.length + i}
                style={{
                  width: `calc(${100 / Math.min(topRow.length, 3)}% - ${32 * (Math.min(topRow.length, 3) - 1) / Math.min(topRow.length, 3)}px)`,
                  minWidth: 260,
                  maxWidth: 380,
                }}
                className="max-md:!w-full max-md:!max-w-none"
              >
                <CoachWithReveal coach={coach} delay={(topRow.length + i) * 0.15} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
