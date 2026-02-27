'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface RoomTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  imageUrl?: string;
}

interface AccommodationTabsProps {
  propertyName: string;
  propertyDescription: string;
  propertyFeatures: string[];
  roomTiers: RoomTier[];
  retreatAccent?: string;
  bookingUrl?: string;
}

export default function AccommodationTabs({
  propertyName,
  propertyDescription,
  propertyFeatures,
  roomTiers,
  retreatAccent = 'var(--retreat-accent, var(--color-coral))',
}: AccommodationTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeRoom = roomTiers[activeTab];

  return (
    <div className="flex flex-col gap-8">
      {/* Property info */}
      <div>
        <h3
          className="uppercase mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-h3)',
            color: 'var(--color-teal)',
          }}
        >
          {propertyName}
        </h3>
        <p
          className="leading-relaxed mb-5"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-body-lg)',
            color: 'var(--color-slate-grey)',
          }}
        >
          {propertyDescription}
        </p>
        <ul className="flex flex-wrap gap-2">
          {propertyFeatures.map((feat) => (
            <li
              key={feat}
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: 'var(--color-surface-warm)',
                color: 'var(--color-teal)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Room tabs */}
      <div>
        <p
          className="uppercase text-xs tracking-wider mb-4"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
        >
          Room Options
        </p>
        <div className="flex gap-2 flex-wrap mb-6">
          {roomTiers.map((tier, i) => (
            <button
              key={tier.name}
              onClick={() => setActiveTab(i)}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: activeTab === i ? retreatAccent : 'var(--color-surface-warm)',
                color: activeTab === i ? 'var(--color-paper-white)' : 'var(--color-teal)',
                borderWidth: 1.5,
                borderStyle: 'solid',
                borderColor: activeTab === i ? retreatAccent : 'var(--color-sand)',
              }}
              aria-selected={activeTab === i}
            >
              {tier.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeRoom && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'var(--color-paper-white)', boxShadow: 'var(--shadow-md)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <h4
                  className="uppercase"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h4)',
                    color: 'var(--color-teal)',
                  }}
                >
                  {activeRoom.name}
                </h4>
                <span
                  className="font-bold shrink-0"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-h3)',
                    color: retreatAccent,
                  }}
                >
                  ${activeRoom.price.toLocaleString()}{' '}
                  <span className="text-sm font-normal" style={{ opacity: 0.6 }}>
                    USD
                  </span>
                </span>
              </div>

              <p
                className="leading-relaxed mb-5"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--type-body-base)',
                  color: 'var(--color-slate-grey)',
                }}
              >
                {activeRoom.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {activeRoom.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: 'var(--color-slate-grey)', fontFamily: 'var(--font-body)' }}
                  >
                    <span style={{ color: retreatAccent, flexShrink: 0 }}>&#10003;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
