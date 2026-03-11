'use client';

import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { theme } from './retreat-theme';

interface RocaFAQProps {
  faqs: { question: string; answer: string }[];
}

export default function RocaFAQ({ faqs }: RocaFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      style={{
        padding: '48px var(--space-section-x)',
        backgroundColor: 'var(--color-surface-warm-light)',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-h3)',
            textTransform: 'uppercase',
            color: theme.primary,
            marginBottom: 6,
          }}
        >
          Questions? Answers.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-body-sm)',
            color: 'var(--color-slate-grey)',
            marginBottom: 24,
          }}
        >
          Everything you need to plan your trip.
        </p>
        <div>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderTop: '1px solid rgba(14,58,45,0.12)' }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: theme.primary,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <path d="M4 6.5L9 11.5L14 6.5" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transition: shouldReduceMotion
                      ? 'none'
                      : 'grid-template-rows 0.28s ease-out, opacity 0.18s ease-out',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--type-body-sm)',
                        color: 'var(--color-slate-grey)',
                        lineHeight: 1.7,
                        paddingBottom: 16,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid rgba(14,58,45,0.12)' }} />
        </div>
      </div>
    </section>
  );
}
