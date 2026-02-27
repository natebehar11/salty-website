'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';

interface RoomTier {
  name: string;
  price: number;
  description: string;
  features: string[];
}

interface PricingSectionProps {
  roomTiers: RoomTier[];
  dates: string;
  depositAmount?: number;
  spotsRemaining?: number;
  onBookNow?: () => void;
  paymentPolicy?: string;
  cancellationPolicy?: string;
  className?: string;
}

export default function PricingSection({
  roomTiers,
  dates,
  depositAmount,
  spotsRemaining,
  onBookNow,
  paymentPolicy,
  cancellationPolicy,
  className = '',
}: PricingSectionProps) {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div id="retreat-pricing" className={className}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2
            className="uppercase mb-3 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.03em',
            }}
          >
            Dates & Pricing
          </h2>
          <p
            className="text-center mb-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-lg)',
              color: 'var(--color-slate-grey)',
            }}
          >
            {dates}
          </p>
          {(spotsRemaining !== undefined || depositAmount) && (
            <p
              className="text-center mb-10 text-sm"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
            >
              {spotsRemaining !== undefined && (
                <span style={{ color: 'var(--color-coral)', fontWeight: 600 }}>
                  {spotsRemaining} spots remaining
                </span>
              )}
              {spotsRemaining !== undefined && depositAmount && ' · '}
              {depositAmount && `$${depositAmount} deposit to reserve`}
            </p>
          )}
        </ScrollReveal>

        {/* Room tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roomTiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.08}>
              <div
                className="rounded-2xl p-6 h-full flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-surface-warm-light)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div>
                  <h4
                    className="uppercase mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--type-h4)',
                      color: 'var(--color-teal)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {tier.name}
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                  >
                    {tier.description}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-teal)' }}>
                        <span style={{ color: 'var(--color-coral)' }}>&#10003;</span>
                        <span style={{ fontFamily: 'var(--font-body)' }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-4">
                    <span
                      className="text-xs uppercase tracking-wider block"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                    >
                      From
                    </span>
                    <span
                      className="text-3xl font-bold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}
                    >
                      ${tier.price.toLocaleString()}
                    </span>
                    <span className="text-sm ml-1" style={{ color: 'var(--color-slate-grey)' }}>
                      USD / person
                    </span>
                  </div>
                  <Button variant="primary" size="md" fullWidth onClick={onBookNow}>
                    Book Now
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Policies */}
        {(paymentPolicy || cancellationPolicy) && (
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl mx-auto space-y-0 divide-y" style={{ borderColor: 'var(--color-sand)' }}>
              {paymentPolicy && (
                <div style={{ borderColor: 'var(--color-sand)' }}>
                  <button
                    onClick={() => setExpandedPolicy(expandedPolicy === 'payment' ? null : 'payment')}
                    className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
                  >
                    <span
                      className="text-sm font-bold uppercase tracking-wide"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}
                    >
                      Payment Policy
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="transition-transform duration-300"
                      style={{ transform: expandedPolicy === 'payment' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path d="M4 6L8 10L12 6" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedPolicy === 'payment' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-4 text-sm leading-relaxed"
                          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                        >
                          {paymentPolicy}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {cancellationPolicy && (
                <div style={{ borderColor: 'var(--color-sand)' }}>
                  <button
                    onClick={() => setExpandedPolicy(expandedPolicy === 'cancellation' ? null : 'cancellation')}
                    className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
                  >
                    <span
                      className="text-sm font-bold uppercase tracking-wide"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}
                    >
                      Cancellation Policy
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="transition-transform duration-300"
                      style={{ transform: expandedPolicy === 'cancellation' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path d="M4 6L8 10L12 6" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedPolicy === 'cancellation' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-4 text-sm leading-relaxed"
                          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                        >
                          {cancellationPolicy}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
