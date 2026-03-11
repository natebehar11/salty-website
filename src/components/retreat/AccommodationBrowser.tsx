'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Carousel from '@/components/shared/Carousel';
import RetreatTicket from '@/components/retreat/RetreatTicket';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';


interface AccommodationBrowserProps {
  retreat: RetreatData;
  onBookNow: () => void;
}

export default function AccommodationBrowser({ retreat, onBookNow }: AccommodationBrowserProps) {
  const [activeTab, setActiveTab] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = useMemo(
    () => [
      ...retreat.roomTiers.map((r, idx) => ({
        label: r.name,
        type: 'room' as const,
        room: r,
        roomIndex: idx + 1,
      })),
      {
        label: 'Home for the Week',
        type: 'overview' as const,
        room: undefined,
        roomIndex: undefined,
      },
    ],
    [retreat.roomTiers]
  );

  const safeActiveTab = Math.min(activeTab, Math.max(tabs.length - 1, 0));
  const activeEntry = tabs[safeActiveTab];

  useEffect(() => {
    if (activeTab !== safeActiveTab) {
      setActiveTab(safeActiveTab);
    }
  }, [activeTab, safeActiveTab]);

  useEffect(() => {
    const target = tabRefs.current[safeActiveTab];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [safeActiveTab]);

  return (
    <section
      id="retreat-accommodation"
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
            marginBottom: 32,
          }}
        >
          Where You&apos;ll Stay
        </h2>

        {/* Browser tab strip */}
        <div
          className="scrollbar-hide"
          role="tablist"
          aria-label="Accommodation options"
          style={{
            display: 'flex',
            gap: 4,
            backgroundColor: 'var(--color-surface-warm-light)',
            padding: '8px 8px 0',
            borderRadius: '16px 16px 0 0',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`accommodation-tab-${i}`}
              aria-selected={safeActiveTab === i}
              aria-controls={`accommodation-panel-${i}`}
              style={{
                flexShrink: 0,
                minHeight: 52,
                padding: '12px 18px',
                borderRadius: '12px 12px 0 0',
                border: 'none',
                backgroundColor: safeActiveTab === i ? 'var(--color-surface-base)' : 'transparent',
                color: safeActiveTab === i ? theme.primary : 'rgba(14,58,45,0.45)',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: safeActiveTab === i ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                borderBottom: safeActiveTab === i ? 'none' : '1px solid rgba(14,58,45,0.08)',
                letterSpacing: '0.01em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: 2,
                textAlign: 'left',
              }}
            >
              <span>{tab.label}</span>
              {tab.type === 'room' && tab.room && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: safeActiveTab === i ? theme.accent : 'rgba(14,58,45,0.45)',
                    letterSpacing: '0.02em',
                  }}
                >
                  ${tab.room.price.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          role="tabpanel"
          id={`accommodation-panel-${safeActiveTab}`}
          aria-labelledby={`accommodation-tab-${safeActiveTab}`}
          style={{
            backgroundColor: 'var(--color-surface-base)',
            border: '1px solid rgba(14,58,45,0.08)',
            borderRadius: '0 0 16px 16px',
            padding: 'clamp(16px, 3vw, 28px)',
          }}
        >
          <AnimatePresence mode="wait">
            {activeEntry.type === 'room' && activeEntry.room && (
              <motion.div
                key={`room-${safeActiveTab}`}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
                    gap: '48px 56px',
                    alignItems: 'start',
                    padding: '40px 12px 24px',
                  }}
                  className="max-md:grid-cols-1"
                >
                  {/* LEFT — text */}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: theme.accent,
                        marginBottom: 10,
                      }}
                    >
                      Room Option {activeEntry.roomIndex}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                        textTransform: 'uppercase',
                        color: theme.primary,
                        lineHeight: 0.95,
                        marginBottom: 14,
                      }}
                    >
                      {activeEntry.room.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                        color: theme.primary,
                        lineHeight: 1,
                        marginBottom: 24,
                      }}
                    >
                      ${activeEntry.room.price.toLocaleString()}
                    </p>
                    <div
                      style={{
                        backgroundColor: 'var(--color-surface-warm-light)',
                        border: '1px solid rgba(14,58,45,0.1)',
                        borderRadius: 12,
                        padding: '12px 14px',
                        marginBottom: 20,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 12,
                          fontWeight: 700,
                          color: theme.primary,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          marginBottom: 4,
                        }}
                      >
                        {retreat.dates.display}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 13,
                          color: 'var(--color-slate-grey)',
                        }}
                      >
                        {retreat.duration} days · ${retreat.depositAmount} deposit to secure
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--type-body-base)',
                        color: 'var(--color-slate-grey)',
                        lineHeight: 1.75,
                        marginBottom: 24,
                        maxWidth: 420,
                      }}
                    >
                      {activeEntry.room.description}
                    </p>
                    {activeEntry.room.features.length > 0 && (
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                        {activeEntry.room.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--type-body-base)',
                            color: theme.primary,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            style={{ flexShrink: 0 }}
                          >
                            <path
                              d="M3 8.5L6.5 12L13 5"
                              stroke={theme.accent}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {f}
                        </li>
                        ))}
                      </ul>
                    )}
                    <button
                      className="w-full sm:w-auto"
                      onClick={onBookNow}
                      style={{
                        minHeight: 44,
                        padding: '14px 32px',
                        borderRadius: 32,
                        border: `1.5px solid ${theme.primary}`,
                        backgroundColor: 'transparent',
                        color: theme.primary,
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        letterSpacing: '0.02em',
                        transition: 'background 0.2s ease, color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        const b = e.currentTarget;
                        b.style.backgroundColor = theme.primary;
                        b.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        const b = e.currentTarget;
                        b.style.backgroundColor = 'transparent';
                        b.style.color = theme.primary;
                      }}
                    >
                      {retreat.bookingUrl ? `Select ${activeEntry.room.name}` : 'Continue to Booking Details'}
                    </button>
                  </div>

                  {/* RIGHT — photo */}
                  {activeEntry.room.imageUrl && (
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: 20,
                        overflow: 'hidden',
                        aspectRatio: '4/3',
                        boxShadow: '0 8px 40px rgba(14,58,45,0.12)',
                      }}
                    >
                      <Image
                        src={activeEntry.room.imageUrl}
                        alt={activeEntry.room.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {tabs[activeTab].type === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) 320px',
                    gap: 32,
                    alignItems: 'start',
                  }}
                  className="max-md:grid-cols-1"
                >
                  {/* Left: content — minWidth:0 so text wraps */}
                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--type-h3)',
                        textTransform: 'uppercase',
                        color: theme.primary,
                        marginBottom: 12,
                        overflowWrap: 'break-word',
                      }}
                    >
                      {retreat.accommodation.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--type-body-lg)',
                        color: 'var(--color-slate-grey)',
                        lineHeight: 1.75,
                        marginBottom: 20,
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                      }}
                    >
                      {retreat.accommodation.description}
                    </p>
                    {/* Feature pills — horizontal scroll, stays in container */}
                    <div
                      className="scrollbar-hide"
                      style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        gap: 8,
                        marginBottom: 28,
                        overflowX: 'auto',
                        paddingBottom: 4,
                        WebkitOverflowScrolling: 'touch',
                      }}
                    >
                      {retreat.accommodation.features.map((f) => (
                        <span
                          key={f}
                          style={{
                            flexShrink: 0,
                            backgroundColor: theme.surface,
                            color: theme.primary,
                            borderRadius: 20,
                            padding: '5px 12px',
                            fontFamily: 'var(--font-body)',
                            fontSize: 12,
                            fontWeight: 500,
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <Carousel showDots showArrows gap={0} fullWidthSlides dotsOnDesktop>
                      {retreat.villaPhotos.map((src, j) => (
                        <div
                          key={j}
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16/9',
                            borderRadius: 16,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(14,58,45,0.12)',
                          }}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 60vw"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>

                  {/* Right: booking container — dates, cost, deposit, strong CTA */}
                  <div style={{ position: 'sticky', top: 80, minWidth: 0 }}>
                    <RetreatTicket
                      name={retreat.officialName}
                      dates={retreat.dates.display}
                      startingPrice={retreat.priceFrom}
                      depositAmount={retreat.depositAmount}
                      totalDays={retreat.duration}
                      bookingUrl={retreat.bookingUrl}
                      onBookNow={onBookNow}
                      accentColor={theme.accent}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
