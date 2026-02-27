'use client';

import { useReducedMotion } from 'framer-motion';
import Button from '@/components/shared/Button';

interface RoomTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  imageUrl?: string;
}

interface ScrollOverRoomsProps {
  propertyName: string;
  propertyDescription: string;
  propertyFeatures: string[];
  rooms: RoomTier[];
  className?: string;
}

const CARD_TOP_BASE = 80;
const CARD_TOP_INCREMENT = 32;

export default function ScrollOverRooms({
  propertyName,
  propertyDescription,
  propertyFeatures,
  rooms,
  className = '',
}: ScrollOverRoomsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={className}>
      {/* Property header */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h3
          className="uppercase mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-h3)',
            color: 'var(--color-teal)',
            letterSpacing: '-0.03em',
          }}
        >
          {propertyName}
        </h3>
        <p
          className="leading-relaxed mb-6"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-body-lg)',
            color: 'var(--color-slate-grey)',
          }}
        >
          {propertyDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {propertyFeatures.map((feat) => (
            <span
              key={feat}
              className="px-3 py-1.5 rounded-full text-sm font-bold"
              style={{
                backgroundColor: 'var(--color-sand)',
                color: 'var(--color-teal)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll-over room cards */}
      {rooms.map((room, i) => {
        const topValue = CARD_TOP_BASE + i * CARD_TOP_INCREMENT;
        const zIndex = 10 + i * 5;

        return (
          <div
            key={room.name}
            className={shouldReduceMotion ? '' : 'sticky'}
            style={{
              top: shouldReduceMotion ? undefined : topValue,
              zIndex: shouldReduceMotion ? undefined : zIndex,
              marginBottom: shouldReduceMotion ? 16 : 0,
            }}
          >
            <div
              className="rounded-2xl overflow-hidden mx-auto max-w-4xl"
              style={{
                backgroundColor: 'var(--color-paper-white)',
                boxShadow: '0 -4px 20px rgba(30, 25, 20, 0.08), 0 8px 24px rgba(30, 25, 20, 0.12)',
                border: '1px solid var(--color-sand)',
              }}
            >
              <div className="grid md:grid-cols-2">
                <div
                  className="aspect-[4/3] md:aspect-auto overflow-hidden"
                  style={{ backgroundColor: 'var(--color-sand)' }}
                >
                  {room.imageUrl ? (
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full p-8">
                      <span
                        className="uppercase text-sm tracking-wider"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)', opacity: 0.4 }}
                      >
                        Room Photo
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4
                      className="uppercase mb-2"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--type-h4)',
                        color: 'var(--color-teal)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {room.name}
                    </h4>
                    <p
                      className="leading-relaxed mb-4"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--type-body-base)',
                        color: 'var(--color-slate-grey)',
                      }}
                    >
                      {room.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {room.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="var(--color-aquamarine)" />
                            <path d="M5 8.5L7 10.5L11 6" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span
                            className="text-sm"
                            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-teal)' }}
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span
                        className="text-xs uppercase tracking-wider block mb-1"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                      >
                        From
                      </span>
                      <span
                        className="text-2xl font-bold"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}
                      >
                        ${room.price.toLocaleString()}
                      </span>
                      <span
                        className="text-sm ml-1"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                      >
                        USD / person
                      </span>
                    </div>
                    <Button variant="primary" size="sm">
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {!shouldReduceMotion && <div className="h-48" />}
          </div>
        );
      })}
    </div>
  );
}
