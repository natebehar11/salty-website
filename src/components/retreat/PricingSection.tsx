'use client';

import { Retreat } from '@/types/retreat';
import { formatCurrency } from '@/lib/utils';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function PricingSection({ retreat }: { retreat: Retreat }) {
  const hasEarlyBird = retreat.earlyBirdDeadline && new Date(retreat.earlyBirdDeadline) > new Date();

  return (
    <section className="py-20 lg:py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-4">Pricing</h2>
          <p className="font-body text-lg text-salty-teal/60 mb-12 max-w-2xl">
            All prices per person. Secure your spot with a {formatCurrency(retreat.deposit)} deposit.
            {hasEarlyBird && ' Early Bird pricing available for a limited time.'}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {retreat.roomTiers.map((tier, i) => (
            <ScrollReveal key={tier.id} delay={i * 0.1}>
              <div className={`rounded-2xl border-2 p-6 h-full flex flex-col ${
                tier.available
                  ? 'border-salty-sand-dark bg-white hover:border-salty-coral transition-colors'
                  : 'border-salty-sand-dark bg-salty-sand/50 opacity-60'
              }`}>
                <h3 className="font-display text-xl text-salty-teal mb-1">{tier.name}</h3>
                <p className="font-body text-xs text-salty-teal/50 uppercase tracking-wide mb-4">
                  {tier.bedType} &middot; Sleeps {tier.occupancy}
                </p>

                <div className="mb-4">
                  {hasEarlyBird && (
                    <div className="mb-1">
                      <span className="font-display text-2xl text-salty-coral">
                        {formatCurrency(tier.priceEarlyBird)}
                      </span>
                      <span className="font-body text-xs text-salty-teal/50 ml-1">Early Bird</span>
                    </div>
                  )}
                  <div>
                    <span className={`font-display text-salty-teal ${hasEarlyBird ? 'text-lg line-through opacity-50' : 'text-2xl'}`}>
                      {formatCurrency(tier.priceRegular)}
                    </span>
                    {!hasEarlyBird && (
                      <span className="font-body text-xs text-salty-teal/50 ml-1">per person</span>
                    )}
                  </div>
                </div>

                <p className="font-body text-sm text-salty-teal/70 leading-relaxed mb-6 flex-1">
                  {tier.description}
                </p>

                {tier.available ? (
                  <Link href={`/retreats/${retreat.slug}/book`}>
                    <Button variant="primary" size="md" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                ) : (
                  <Button variant="ghost" size="md" className="w-full" disabled>
                    Sold Out
                  </Button>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 text-center">
            <p className="font-body text-sm text-salty-teal/50">
              {formatCurrency(retreat.deposit)} deposit to reserve. Balance due{' '}
              {retreat.balanceDueDate
                ? new Date(retreat.balanceDueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : '60 days before departure'}
              . Payment plans available.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
