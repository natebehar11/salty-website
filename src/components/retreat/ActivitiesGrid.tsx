'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Modal from '@/components/shared/Modal';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';


/* ─── ActivityCard ───────────────────────────────────────────────────────── */

function ActivityCard({
  activity,
  index,
}: {
  activity: RetreatData['activities'][0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setShowModal(true)}
          role="button"
          tabIndex={0}
          aria-label={`View ${activity.name} details`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setShowModal(true);
          }}
          style={{
            position: 'relative',
            aspectRatio: '3/4',
            borderRadius: 20,
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: theme.dark,
            transition: 'transform 0.35s ease, box-shadow 0.35s ease',
            transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
            boxShadow: isHovered
              ? '0 24px 48px rgba(14,58,45,0.28)'
              : '0 4px 16px rgba(14,58,45,0.08)',
          }}
        >
          {activity.imageUrl && (
            <Image
              src={activity.imageUrl}
              alt={activity.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          )}

          {/* Bottom gradient — deepens on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isHovered
                ? 'linear-gradient(to top, rgba(11,49,38,0.97) 0%, rgba(11,49,38,0.5) 55%, rgba(11,49,38,0.15) 75%)'
                : 'linear-gradient(to top, rgba(11,49,38,0.95) 0%, rgba(11,49,38,0.35) 50%, transparent 70%)',
              transition: 'background 0.35s ease',
            }}
          />

          {/* Text overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
            {activity.frequency && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: theme.accent,
                  marginBottom: 6,
                }}
              >
                {activity.frequency}
              </p>
            )}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                textTransform: 'uppercase',
                color: 'var(--color-paper-white)',
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {activity.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-sm)',
                color: 'var(--color-sand)',
                opacity: 0.8,
                lineHeight: 1.45,
                display: '-webkit-box',
                WebkitLineClamp: isHovered ? 4 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                transition: 'opacity 0.3s ease',
              }}
            >
              {activity.description}
            </p>

            {/* Tap to learn more hint */}
            <span
              style={{
                display: 'inline-block',
                marginTop: 8,
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 600,
                color: theme.accent,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              Tap to learn more &rarr;
            </span>
          </div>
        </div>
      </motion.div>

      {/* Activity detail modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} ariaLabel={activity.name} mobileDrawer>
        {activity.imageUrl && (
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
            <Image
              src={activity.imageUrl}
              alt={activity.name}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div style={{ padding: '28px 32px 32px' }}>
          {activity.frequency && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: theme.accent,
                marginBottom: 8,
              }}
            >
              {activity.frequency}
            </p>
          )}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h3)',
              textTransform: 'uppercase',
              color: theme.primary,
              marginBottom: 14,
            }}
          >
            {activity.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-base)',
              color: 'var(--color-slate-grey)',
              lineHeight: 1.75,
              marginBottom: activity.modalDetails ? 16 : 0,
            }}
          >
            {activity.description}
          </p>
          {activity.modalDetails && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-sm)',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.7,
                opacity: 0.8,
              }}
            >
              {activity.modalDetails}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}

/* ─── SampleDay ──────────────────────────────────────────────────────────── */

function SampleDay({ blocks }: { blocks: { time: string; label: string }[] }) {
  return (
    <div style={{ marginTop: 48 }}>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--type-h4)',
          textTransform: 'uppercase',
          color: theme.primary,
          marginBottom: 16,
        }}
      >
        A Sample Day
      </h3>
      <div
        className="scrollbar-hide"
        style={{
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          borderRadius: 16,
          border: '1px solid rgba(14,58,45,0.08)',
        }}
      >
        {blocks.map((block, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 auto',
              width: 'clamp(110px, 14vw, 140px)',
              padding: '24px 12px',
              scrollSnapAlign: 'start',
              textAlign: 'center',
              borderRight:
                i < blocks.length - 1 ? '1px solid rgba(14,58,45,0.06)' : 'none',
              backgroundColor: i % 2 === 0 ? 'rgba(14,58,45,0.02)' : 'transparent',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: theme.accent,
                marginBottom: 4,
              }}
            >
              {block.time}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-sm)',
                color: theme.primary,
                fontWeight: 500,
              }}
            >
              {block.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export default function ActivitiesGrid({ retreat }: { retreat: RetreatData }) {
  return (
    <section
      id="retreat-activities"
      style={{
        padding: 'var(--space-section-y) var(--space-section-x)',
        backgroundColor: 'var(--color-surface-base)',
      }}
    >
      <div style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-h2)',
            textTransform: 'uppercase',
            color: theme.primary,
            marginBottom: 16,
          }}
        >
          What You&apos;ll Do
        </h2>

        {/* Pull quote */}
        <blockquote
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
            fontStyle: 'italic',
            color: 'var(--color-slate-grey)',
            lineHeight: 1.5,
            maxWidth: 680,
            marginBottom: 32,
          }}
        >
          &ldquo;Every day is a choose-your-own-adventure. Surf at dawn, train at noon, hike
          through the jungle, or just&hellip; float.&rdquo;
        </blockquote>

        {/* For You If */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px 40px',
            marginBottom: 48,
          }}
          className="max-md:grid-cols-1"
        >
          {retreat.forYouIf.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0, marginTop: 3 }}
              >
                <path
                  d="M3 8L7.5 12.5L13 3"
                  stroke={theme.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--type-body-sm)',
                  color: theme.primary,
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Activity cards */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          className="max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          {retreat.activities.map((activity, i) => (
            <ActivityCard key={i} activity={activity} index={i} />
          ))}
        </div>

        <SampleDay blocks={retreat.sampleDay} />
      </div>
    </section>
  );
}
