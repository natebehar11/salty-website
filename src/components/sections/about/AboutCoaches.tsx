'use client';

import { useState, useEffect } from 'react';
import type { Coach } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import AnchorStarBadge from '@/components/shared/AnchorStarBadge';

/* ─── Default accent colors if coach has no cardColor ───────────────── */

const FALLBACK_COLORS = [
  '#F75A3D', // coral
  '#0E3A2D', // teal
  '#FED260', // golden
  '#3A6B35', // palm green
  '#B6D4EA', // sky
  '#C74235', // rust
];

/* ─── Coach Card ─────────────────────────────────────────────────────── */

function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const accentColor = coach.cardColor || FALLBACK_COLORS[index % FALLBACK_COLORS.length];

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const showBio = isLg ? hovered : tapped;

  return (
    <div
      className="relative rounded-2xl overflow-visible cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (!isLg) setTapped((t) => !t); }}
      role={!isLg ? 'button' : undefined}
      tabIndex={!isLg ? 0 : undefined}
      aria-label={!isLg ? `Tap to read ${coach.name}'s bio` : undefined}
      style={{
        boxShadow: '0 4px 16px rgba(30,25,20,0.06)',
      }}
    >
      <div className="absolute z-10" style={{ top: -8, left: -8 }}>
        <AnchorStarBadge
          text={coach.name.split(' ')[0]}
          size={72}
          starColor={accentColor}
          textColor="#fff"
        />
      </div>

      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{
          borderTop: `5px solid ${accentColor}`,
          borderLeft: `5px solid ${accentColor}`,
          borderRight: `5px solid ${accentColor}`,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        {coach.photo ? (
          <img
            src={urlFor(coach.photo).width(400).height(530).url()}
            alt={coach.name}
            className="w-full object-cover"
            style={{ aspectRatio: '3/4' }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full flex items-center justify-center"
            style={{
              aspectRatio: '3/4',
              backgroundColor: accentColor,
            }}
          >
            <span
              className="uppercase opacity-40"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '42px',
                color: '#fff',
              }}
            >
              {coach.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
        )}

        {/* Bio overlay — hover on desktop, tap on mobile */}
        <AnimatePresence>
          {showBio && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-6"
              style={{ backgroundColor: 'var(--color-sand)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  color: 'var(--color-teal)',
                  lineHeight: 1.6,
                  textAlign: 'center',
                }}
              >
                {coach.bio}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* "Tap to read" hint — mobile only */}
        {!tapped && !isLg && (
          <div
            className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(14,58,45,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                color: 'var(--color-paper-white)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Tap for bio
            </span>
          </div>
        )}
      </div>

      {/* Specialty bar */}
      <div
        className="px-4 py-2"
        style={{
          backgroundColor: accentColor,
        }}
      >
        <p
          className="uppercase tracking-wider text-center truncate"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            color: accentColor === '#FED260' ? 'var(--color-teal)' : '#fff',
          }}
        >
          {coach.specialties?.join(' · ') || coach.role}
          {coach.personality ? ` — ${coach.personality}` : ''}
        </p>
      </div>

      {/* Name and role */}
      <div
        className="p-5"
        style={{
          backgroundColor: 'var(--color-surface-base)',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <h3
          className="uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(16px, 3vw, 18px)',
            color: 'var(--color-teal)',
          }}
        >
          {coach.name}
        </h3>
        <p
          className="mt-0.5"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: accentColor,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {coach.role}
        </p>
      </div>
    </div>
  );
}

/* ─── About Coaches Section ──────────────────────────────────────────── */

interface AboutCoachesProps {
  coaches: Coach[];
}

export default function AboutCoaches({ coaches }: AboutCoachesProps) {
  const displayCoaches = coaches.filter((c) => !c.isFounder);

  if (displayCoaches.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: 'var(--color-sand)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-12 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            Our Coaches
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCoaches.map((coach, i) => (
            <ScrollReveal key={coach._id || coach.name} delay={i * 0.06}>
              <CoachCard coach={coach} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
