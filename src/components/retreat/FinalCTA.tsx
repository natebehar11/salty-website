'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';

interface FinalCTAProps {
  destination: string;
  dates?: string;
  priceFrom?: number;
  spotsRemaining?: number;
  onBookNow?: () => void;
  onAskQuestion?: () => void;
  className?: string;
}

export default function FinalCTA({
  destination,
  dates,
  priceFrom,
  spotsRemaining,
  onBookNow,
  onAskQuestion,
  className = '',
}: FinalCTAProps) {
  return (
    <div className={className}>
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2
            className="uppercase mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.03em',
            }}
          >
            Ready for {destination}?
          </h2>

          {(dates || priceFrom) && (
            <p
              className="mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-lg)',
                color: 'var(--color-sand)',
              }}
            >
              {dates && <span>{dates}</span>}
              {dates && priceFrom && <span> · </span>}
              {priceFrom && <span>From ${priceFrom.toLocaleString()} USD</span>}
            </p>
          )}

          {spotsRemaining !== undefined && (
            <p
              className="mb-6 text-sm font-semibold"
              style={{ color: 'var(--color-bright-coral)' }}
            >
              {spotsRemaining} spots remaining
            </p>
          )}

          <p
            className="mb-8 leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body)',
              color: 'var(--color-sand)',
            }}
          >
            Secure yours now or reach out with questions — we&apos;re always happy to chat.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" onClick={onBookNow}>
              Book Now
            </Button>
            <Button
              variant="retreat"
              size="lg"
              retreatAccent="var(--color-sky)"
              retreatSecondary="transparent"
              invertText
              onClick={onAskQuestion}
              style={{ border: '2px solid var(--color-paper-white)' }}
            >
              Ask a Question
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p
            className="mt-10 text-xs"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-sand)',
              opacity: 0.7,
            }}
          >
            SALTY partners with Movement Travel, a TICO-licensed travel agency.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
