'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import VideoBackground from '@/components/shared/VideoBackground';
import Button from '@/components/shared/Button';
import Link from 'next/link';

const WHATSAPP_URL = `https://wa.me/14318291135?text=${encodeURIComponent('Hey SALTY! Tell me more about your retreats.')}`;

export default function AboutCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface-dark-deep)',
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      {/* Video background — subtle, heavy overlay keeps text readable */}
      <VideoBackground
        videoId="uJ6YccG892U"
        overlayGradient="linear-gradient(to bottom, rgba(11,49,38,0.88) 0%, rgba(11,49,38,0.92) 50%, rgba(11,49,38,0.95) 100%)"
        deferMs={2000}
      />

      <div className="relative z-10 mx-auto text-center px-6" style={{ maxWidth: 640 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 6vw, 56px)',
              color: 'var(--color-paper-white)',
              lineHeight: 0.95,
            }}
          >
            Ready to Join Us?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/retreats">
              <Button variant="primary" size="lg">
                See Upcoming Trips
              </Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Chat With Us
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
