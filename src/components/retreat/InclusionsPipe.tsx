'use client';

import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { theme } from './retreat-theme';

interface InclusionsPipeProps {
  included: string[];
  notIncluded: string[];
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function InclusionsPipe({ included, notIncluded }: InclusionsPipeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative"
      style={{
        padding: '32px var(--space-section-x)',
        backgroundColor: 'var(--color-surface-warm-light)',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 4, background: `linear-gradient(90deg, ${theme.accent}, ${theme.secondary || theme.accent})` }}
      />

      <ScrollReveal>
        <div className="relative" style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}>
          {/* Accordion trigger row */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="inclusions-content"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              gap: 12,
              padding: '8px 0',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--type-h3)',
                  textTransform: 'uppercase',
                  color: theme.primary,
                  lineHeight: 1,
                }}
              >
                What&apos;s Included
              </h2>
              <span
                style={{
                  backgroundColor: theme.surface,
                  color: theme.primary,
                  borderRadius: 24,
                  padding: '2px 10px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {included.length} items
              </span>
            </div>

            <div
              style={{
                minWidth: 44,
                minHeight: 44,
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1.5px solid ${theme.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  width: 14,
                  height: 1.5,
                  backgroundColor: theme.primary,
                  borderRadius: 1,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  width: 14,
                  height: 1.5,
                  backgroundColor: theme.primary,
                  borderRadius: 1,
                  transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
          </button>

          <div
            id="inclusions-content"
            role="region"
            style={{
              display: 'grid',
              gridTemplateRows: isOpen ? '1fr' : '0fr',
              opacity: isOpen ? 1 : 0,
              transition: shouldReduceMotion
                ? 'none'
                : 'grid-template-rows 0.35s ease-out, opacity 0.2s ease-out',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px 56px',
                  paddingTop: 20,
                  paddingBottom: 8,
                }}
                className="max-md:grid-cols-1"
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: theme.accent,
                      marginBottom: 12,
                    }}
                  >
                    Included
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {included.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--type-body-sm)',
                          color: theme.primary,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          lineHeight: 1.5,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                          <path d="M2.5 7.5L5.5 10.5L11.5 4.5" stroke={theme.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(14,58,45,0.4)',
                      marginBottom: 12,
                    }}
                  >
                    Not Included
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {notIncluded.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--type-body-sm)',
                          color: 'rgba(14,58,45,0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          lineHeight: 1.5,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                          <path d="M3 3L11 11M11 3L3 11" stroke="rgba(14,58,45,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
