'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/shared/Button';

interface HomepageHeroProps {
  /** Optional video URL for background (16:9). When provided, plays muted/loop. */
  videoSrc?: string;
  /** Primary headline */
  headline?: string;
  /** Subhead / tagline */
  subhead?: string;
  /** WhatsApp number for Chat With Us (digits only) */
  whatsapp?: string;
}

const DEFAULT_HEADLINE = 'Fitness Retreats for Fun-Loving People';
const DEFAULT_SUBHEAD =
  'Surf, sweat, explore, repeat. Group trips across 7 countries for people who want adventure without the wellness fluff';

export default function HomepageHero({
  videoSrc,
  headline = DEFAULT_HEADLINE,
  subhead = DEFAULT_SUBHEAD,
  whatsapp = '14318291135',
}: HomepageHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-teal)',
      }}
    >
      {/* Video or gradient overlay */}
      {videoSrc ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(14,58,45,0.7) 100%)',
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        <motion.h1
          className="uppercase tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 7vw, 4.5rem)',
            color: 'var(--color-paper-white)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {headline}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-lg"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--color-sand)',
            lineHeight: 1.6,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {subhead}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="/retreats">
            <Button variant="primary" size="lg">
              Upcoming Trips
            </Button>
          </Link>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hey SALTY! I'm interested in learning more about your retreats.")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg">
              Chat With Us
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
