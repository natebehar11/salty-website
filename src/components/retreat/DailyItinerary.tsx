'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Modal from '../shared/Modal';

type ItineraryDay = {
  dayNumber: number;
  title: string;
  description: string;
  photoUrl?: string;
  mealsIncluded?: string[];
  accommodation?: string;
};

interface DailyItineraryProps {
  days: ItineraryDay[];
  accentColor?: string;
  className?: string;
}

function MealIcon({ meal }: { meal: string }) {
  const icons: Record<string, string> = {
    breakfast: '☕',
    lunch: '🥗',
    dinner: '🍽️',
  };
  return <span title={meal}>{icons[meal] || '🍴'}</span>;
}

export default function DailyItinerary({
  days,
  accentColor = 'var(--color-coral)',
  className = '',
}: DailyItineraryProps) {
  const [selectedDay, setSelectedDay] = useState<ItineraryDay | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Horizontal scroll container — free scroll, no snap per spec */}
      <div
        className={`overflow-x-auto flex gap-4 pb-4 scrollbar-hide ${className}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {days.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setSelectedDay(day)}
            className="shrink-0 rounded-2xl overflow-hidden text-left cursor-pointer transition-shadow duration-250"
            style={{
              width: 240,
              boxShadow: 'var(--shadow-sm)',
              backgroundColor: 'var(--color-paper-white)',
            }}
          >
            {/* Thumbnail */}
            <div className="relative" style={{ aspectRatio: '4/3' }}>
              {day.photoUrl ? (
                <img
                  src={day.photoUrl}
                  alt={`Day ${day.dayNumber}: ${day.title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: accentColor, opacity: 0.15 }}
                >
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '40px',
                      color: accentColor,
                      opacity: 0.5,
                    }}
                  >
                    {day.dayNumber}
                  </span>
                </div>
              )}
              {/* Day badge */}
              <div
                className="absolute top-3 left-3 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: accentColor,
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  color: 'var(--color-teal)',
                }}
              >
                DAY {day.dayNumber}
              </div>
            </div>

            {/* Title */}
            <div className="p-4">
              <p
                className="uppercase leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  color: 'var(--color-teal)',
                }}
              >
                {day.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Day detail modal */}
      <Modal
        isOpen={!!selectedDay}
        onClose={() => setSelectedDay(null)}
        mobileDrawer
      >
        {selectedDay && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Photo */}
            {selectedDay.photoUrl && (
              <div className="lg:w-1/2 shrink-0">
                <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={selectedDay.photoUrl}
                    alt={`Day ${selectedDay.dayNumber}: ${selectedDay.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              <h3
                className="uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  color: 'var(--color-teal)',
                }}
              >
                Day {selectedDay.dayNumber} — {selectedDay.title}
              </h3>

              <p
                className="leading-relaxed"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--color-teal)',
                }}
              >
                {selectedDay.description}
              </p>

              {/* Meals & accommodation */}
              <div className="flex flex-wrap gap-4 mt-6">
                {selectedDay.mealsIncluded && selectedDay.mealsIncluded.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span
                      className="uppercase tracking-wider"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '12px',
                        color: 'var(--color-slate-grey)',
                      }}
                    >
                      Meals:
                    </span>
                    <div className="flex gap-1">
                      {selectedDay.mealsIncluded.map((meal) => (
                        <MealIcon key={meal} meal={meal} />
                      ))}
                    </div>
                  </div>
                )}
                {selectedDay.accommodation && (
                  <div className="flex items-center gap-2">
                    <span
                      className="uppercase tracking-wider"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '12px',
                        color: 'var(--color-slate-grey)',
                      }}
                    >
                      Stay:
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--color-teal)',
                      }}
                    >
                      {selectedDay.accommodation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
