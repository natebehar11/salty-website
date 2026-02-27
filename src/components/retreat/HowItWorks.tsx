'use client';

import Button from '@/components/shared/Button';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface HowItWorksProps {
  depositAmount: number;
  paymentPolicy: string;
  cancellationPolicy: string;
  soloPercent: number;
  accentColor?: string;
  onBookNow: () => void;
}

const STEPS = (depositAmount: number) => [
  {
    number: '01',
    title: 'Pick Your Room',
    description: 'Choose the accommodation tier that fits your budget and style. Every tier comes with all retreat activities.',
  },
  {
    number: '02',
    title: `Deposit $${depositAmount}`,
    description: 'A small deposit holds your spot. Fully transferable to any future SALTY trip if your plans change.',
  },
  {
    number: '03',
    title: 'Pay the Balance',
    description: 'Remaining balance due 60 days before departure. Payment plans available — just ask.',
  },
  {
    number: '04',
    title: 'Show Up',
    description: "We handle flights, logistics, and planning. You pack your bags, we handle everything else.",
  },
];

export default function HowItWorks({
  depositAmount,
  paymentPolicy,
  cancellationPolicy,
  soloPercent,
  accentColor = 'var(--retreat-accent, var(--color-coral))',
  onBookNow,
}: HowItWorksProps) {
  const steps = STEPS(depositAmount);

  return (
    <section
      id="retreat-how-it-works"
      style={{ backgroundColor: 'var(--color-surface-dark)', padding: 'var(--space-section-y) var(--space-section-x)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-12 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.03em',
            }}
          >
            How It Works
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.08}>
              <div
                className="flex flex-col gap-3 p-6 rounded-2xl h-full"
                style={{ backgroundColor: 'var(--color-surface-dark-raised)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    color: accentColor,
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
                <h4
                  className="uppercase"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h5)',
                    color: 'var(--color-paper-white)',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-sm)',
                    color: 'var(--color-sand)',
                    opacity: 0.8,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Policy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { title: 'Payment', body: paymentPolicy },
            { title: 'Cancellation', body: cancellationPolicy },
            {
              title: 'Solo Travelers',
              body: `${soloPercent}% of SALTY guests travel solo. You show up alone — you leave with a crew. The group dynamic clicks fast because everyone came for the same reasons.`,
            },
          ].map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.06}>
              <div
                className="rounded-xl p-5 h-full"
                style={{ backgroundColor: 'var(--color-surface-dark-raised)' }}
              >
                <h5
                  className="uppercase mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h5)',
                    color: accentColor,
                  }}
                >
                  {card.title}
                </h5>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-body-sm)',
                    color: 'var(--color-sand)',
                    opacity: 0.8,
                  }}
                >
                  {card.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="flex justify-center">
            <Button variant="primary" size="lg" onClick={onBookNow}>
              Reserve My Spot
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
