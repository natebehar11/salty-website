'use client';

import { Retreat, SaltyMeter as SaltyMeterType } from '@/types/retreat';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = [
  { key: 'adventure', label: 'Adventure', color: 'bg-salty-coral' },
  { key: 'culture', label: 'Culture', color: 'bg-salty-gold' },
  { key: 'party', label: 'Party', color: 'bg-salty-coral' },
  { key: 'sweat', label: 'Sweat', color: 'bg-salty-teal' },
  { key: 'rest', label: 'Rest', color: 'bg-salty-sky' },
] as const;

export default function SaltyMeter({ retreat }: { retreat: Retreat }) {
  const meter = retreat.saltyMeter;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-salty-teal py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-white mb-4">The SALTY Meter</h2>
          <p className="font-body text-lg text-white/60 mb-12 max-w-2xl">
            Every retreat has its own personality. Here&apos;s what to expect.
          </p>
        </ScrollReveal>

        <div ref={ref} className="max-w-xl space-y-6">
          {categories.map((cat, i) => {
            const value = meter[cat.key];
            return (
              <div key={cat.key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm font-bold text-white uppercase tracking-wide">
                    {cat.label}
                  </span>
                  <span className="font-display text-lg text-white">{value}/10</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${cat.color}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${value * 10}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex items-center gap-6">
            <div className="bg-white/10 rounded-xl px-6 py-4">
              <p className="font-body text-xs text-white/50 uppercase tracking-wide font-bold">
                Group Size
              </p>
              <p className="font-display text-2xl text-white mt-1">
                {meter.groupSize.min}-{meter.groupSize.max}
              </p>
              <p className="font-body text-xs text-white/50">guests per trip</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
