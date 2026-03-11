'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Testimonial } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Data ────────────────────────────────────────────────────────────── */

const FALLBACK_QUOTES = [
  {
    name: 'Naomi Tecle',
    quote:
      "If you're on the fence about booking a SALTY retreat, my answer will always be to just do it!",
    retreat: '',
  },
  {
    name: 'Ashley O\u2019Neill',
    quote:
      "Ain't no party like a SALTY party, cause a SALTY party won't stop... being the best time of your life!",
    retreat: '',
  },
  {
    name: 'Justin Y',
    quote:
      'The hosts were warm, welcoming, and made everyone feel like family. The yoga classes were definitely challenging, but in the best way possible.',
    retreat: 'Sicily \u201925',
  },
];

const VIDEO_TESTIMONIALS = [
  { name: 'Connor', trip: 'El Salvador \u201925', videoId: 'MtuxUwGmBC0' },
  { name: 'Keara', trip: '', videoId: 'T_2LVHSVIeU' },
  { name: 'Cindy', trip: 'El Salvador \u201925', videoId: 'sdQQdR6gFc0' },
  { name: 'Shane', trip: '', videoId: '2-wfCL1dAXM' },
];

/* ─── Highlight Effect ────────────────────────────────────────────────── */

function HighlightedQuote({
  quote,
  name,
  retreat,
  accentColor,
}: {
  quote: string;
  name: string;
  retreat?: string;
  accentColor: string;
}) {
  return (
    <blockquote className="relative">
      <motion.div
        className="absolute -left-2 top-0 pointer-events-none origin-left"
        style={{
          width: '90%',
          height: '2em',
          backgroundColor: accentColor,
          opacity: 0.15,
          borderRadius: '4px 12px 8px 2px',
          rotate: '-0.5deg',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.15 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
      <p
        className="relative italic"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(17px, 2vw, 22px)',
          color: 'var(--color-paper-white)',
          lineHeight: 1.55,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-4">
        <span
          className="uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: accentColor,
          }}
        >
          {name}
        </span>
        {retreat && (
          <span
            className="ml-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-sand)',
              opacity: 0.6,
            }}
          >
            — {retreat}
          </span>
        )}
      </footer>
    </blockquote>
  );
}

/* ─── Video Modal ─────────────────────────────────────────────────────── */

function VideoModal({
  videoId,
  name,
  onClose,
}: {
  videoId: string;
  name: string;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Video testimonial from ${name}`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 51,
        }}
        aria-label="Close video"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        style={{
          width: 'min(380px, 85vw)',
          aspectRatio: '9/16',
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`}
          title={`${name} testimonial`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}

/* ─── Video Testimonial Card ──────────────────────────────────────────── */

function VideoTestimonialCard({
  name,
  trip,
  videoId,
}: {
  name: string;
  trip: string;
  videoId: string;
}) {
  const [hovering, setHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = useCallback(() => setModalOpen(false), []);

  const thumbUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <>
      <button
        type="button"
        className="relative overflow-hidden w-full text-left group"
        style={{
          borderRadius: 16,
          aspectRatio: '9/16',
          border: '3px solid var(--color-coral)',
          cursor: 'pointer',
          background: 'var(--color-surface-dark-raised)',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => setModalOpen(true)}
        aria-label={`Play video testimonial from ${name}`}
      >
        {/* Thumbnail — always rendered underneath */}
        <Image
          src={thumbUrl}
          alt={`${name} testimonial thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized
        />

        {/* Muted preview iframe — loaded on hover */}
        {hovering && (
          <div className="absolute inset-0 z-10">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              title=""
              allow="autoplay; encrypted-media"
              className="w-full h-full"
              style={{
                border: 'none',
                pointerEvents: 'none',
              }}
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Gradient scrim at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-20"
          style={{
            height: '50%',
            background: 'linear-gradient(to top, rgba(14,58,45,0.9) 0%, transparent 100%)',
          }}
        />

        {/* "Click to hear" prompt */}
        <div
          className="absolute z-30 flex items-center gap-1.5 transition-opacity duration-200"
          style={{
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(14,58,45,0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: 20,
            padding: '6px 14px',
            opacity: hovering ? 1 : 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-coral)">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--color-paper-white)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Click to hear
          </span>
        </div>

        {/* Name + trip at bottom */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-4">
          <p
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              color: 'var(--color-paper-white)',
              lineHeight: 1.1,
            }}
          >
            {name}
          </p>
          {trip && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-sand)',
                opacity: 0.7,
                marginTop: 2,
              }}
            >
              {trip}
            </p>
          )}
        </div>
      </button>

      {modalOpen && (
        <VideoModal videoId={videoId} name={name} onClose={handleClose} />
      )}
    </>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const quotes =
    testimonials.length > 0
      ? testimonials.slice(0, 3).map((t) => ({
          name: t.guestName,
          quote: t.quote,
          retreat: t.retreatName || '',
        }))
      : FALLBACK_QUOTES;

  const accentColors = ['var(--color-golden)', 'var(--color-coral)', 'var(--color-aquamarine)'];

  return (
    <section
      className="relative"
      style={{
        backgroundColor: 'var(--color-teal)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* Header */}
        <ScrollReveal>
          <h2
            className="uppercase text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            What People Say
          </h2>
        </ScrollReveal>

        {/* ── Written quotes — asymmetric staggered layout ── */}
        <div className="mt-12 flex flex-col gap-10 lg:gap-14">
          {quotes.map((q, i) => {
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={q.name} delay={i * 0.08}>
                <div
                  className={`${isEven ? 'lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'}`}
                  style={{ maxWidth: 600 }}
                >
                  <HighlightedQuote
                    quote={q.quote}
                    name={q.name}
                    retreat={q.retreat}
                    accentColor={accentColors[i % accentColors.length]}
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Video testimonials — horizontal row ── */}
        <div className="mt-16">
          <ScrollReveal>
            <h3
              className="uppercase text-center mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                color: 'var(--color-sand)',
              }}
            >
              Hear From Them
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto w-full md:w-fit max-w-4xl">
              {VIDEO_TESTIMONIALS.map((v) => (
                <VideoTestimonialCard
                  key={v.videoId}
                  name={v.name}
                  trip={v.trip}
                  videoId={v.videoId}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.15}>
          <div className="mt-10 text-center">
            <Link href="/reviews">
              <Button variant="secondary" size="md">
                See All Reviews
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
