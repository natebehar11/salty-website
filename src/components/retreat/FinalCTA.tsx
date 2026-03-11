'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import VideoBackground from '@/components/shared/VideoBackground';
import Button from '@/components/shared/Button';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';

interface FinalCTAProps {
  retreat: RetreatData;
  onBookNow: () => void;
}

export default function FinalCTA({ retreat, onBookNow }: FinalCTAProps) {
  const videoId = retreat.youtubeVideoIds?.[0];

  return (
    <section
      id="retreat-final-cta"
      className="relative overflow-hidden"
      style={{
        padding: 'var(--space-section-y) var(--space-section-x)',
        backgroundColor: theme.dark,
        textAlign: 'center',
      }}
    >
      {/* Video background with heavy overlay */}
      {videoId && (
        <VideoBackground
          videoId={videoId}
          fallbackImageUrl={retreat.heroImageUrl}
          overlayGradient={`linear-gradient(to bottom, rgba(11,49,38,0.88) 0%, rgba(11,49,38,0.92) 50%, rgba(11,49,38,0.95) 100%)`}
          deferMs={2500}
        />
      )}

      <div className="relative z-10" style={{ maxWidth: 600, margin: '0 auto' }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: theme.accent,
              marginBottom: 12,
            }}
          >
            {retreat.spotsRemaining} Spots Remaining
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-display)',
              textTransform: 'uppercase',
              color: 'var(--color-paper-white)',
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Ready for {retreat.destination}?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-lg)',
              color: 'var(--color-sand)',
              lineHeight: 1.65,
              marginBottom: 32,
              opacity: 0.85,
            }}
          >
            Reserve with a ${retreat.depositAmount} deposit. {retreat.soloTravelerPercent}% of guests travel solo.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
            <Button
              variant="retreat"
              size="lg"
              retreatAccent={theme.accent}
              retreatSecondary={theme.secondary}
              onClick={onBookNow}
            >
              Claim My Spot &mdash; ${retreat.depositAmount} Deposit
            </Button>
            <WhatsAppButton message={`Hi! I'm interested in the SALTY ${retreat.destination} retreat.`} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'var(--color-sand)',
              opacity: 0.45,
            }}
          >
            Full refund 90+ days before departure.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
