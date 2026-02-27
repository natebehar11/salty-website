'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Modal from '@/components/shared/Modal';

interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  summary: string;
  details: string;
}

interface ScrollOverItineraryProps {
  days: ItineraryDay[];
  className?: string;
}

const CARD_TOP_BASE = 80;
const CARD_TOP_INCREMENT = 32;

function DayFlag({ day }: { day: number }) {
  return (
    <div
      className="inline-flex items-center px-4 py-1"
      style={{
        backgroundColor: 'var(--color-coral)',
        clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)',
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        color: 'var(--color-paper-white)',
        letterSpacing: '0.05em',
      }}
    >
      DAY {day}
    </div>
  );
}

export default function ScrollOverItinerary({ days, className = '' }: ScrollOverItineraryProps) {
  const [modalDay, setModalDay] = useState<ItineraryDay | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <div className={className}>
        {days.map((day, i) => {
          const topValue = CARD_TOP_BASE + i * CARD_TOP_INCREMENT;
          const zIndex = 10 + i * 5;

          return (
            <div
              key={day.day}
              className={shouldReduceMotion ? '' : 'sticky'}
              style={{
                top: shouldReduceMotion ? undefined : topValue,
                zIndex: shouldReduceMotion ? undefined : zIndex,
                marginBottom: shouldReduceMotion ? 16 : 0,
              }}
            >
              <div
                className="rounded-2xl p-6 md:p-8 mx-auto max-w-4xl"
                style={{
                  backgroundColor: 'var(--color-paper-white)',
                  boxShadow: '0 -4px 20px rgba(30, 25, 20, 0.08), 0 8px 24px rgba(30, 25, 20, 0.12)',
                  border: '1px solid var(--color-sand)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <DayFlag day={day.day} />
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                    >
                      {day.location}
                    </span>
                  </div>
                </div>

                <h4
                  className="uppercase mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h4)',
                    color: 'var(--color-teal)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {day.title}
                </h4>

                <p
                  className="leading-relaxed mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-base)',
                    color: 'var(--color-slate-grey)',
                  }}
                >
                  {day.summary}
                </p>

                <button
                  onClick={() => setModalDay(day)}
                  className="text-sm font-bold underline transition-colors duration-200 cursor-pointer uppercase tracking-wide"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-coral)',
                  }}
                >
                  More Information
                </button>
              </div>

              {/* Spacer between sticky cards for scroll room */}
              {!shouldReduceMotion && <div className="h-40" />}
            </div>
          );
        })}
      </div>

      <Modal isOpen={!!modalDay} onClose={() => setModalDay(null)}>
        {modalDay && (
          <div className="p-8">
            <DayFlag day={modalDay.day} />
            <h3
              className="uppercase mt-4 mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h3)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              {modalDay.title}
            </h3>
            <p
              className="text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
            >
              {modalDay.location}
            </p>
            <p
              className="leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-lg)',
                color: 'var(--color-teal)',
              }}
            >
              {modalDay.details}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
