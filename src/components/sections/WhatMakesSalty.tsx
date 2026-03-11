'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Image from 'next/image';

const PHOTOS = [
  { src: '/images/retreat/night-party.png',   alt: 'SALTY guests celebrating together at a rooftop party' },
  { src: '/images/retreat/surf-lesson.png',   alt: 'SALTY guests learning to surf together' },
  { src: '/images/retreat/guys-laughing.png', alt: 'SALTY guests laughing together on retreat' },
];

function RotatingPhotoStack() {
  const stepRef = useRef(0); // tracks which "step" we're on (0, 1, 2, ...)

  const photoAtStep = (offset: number) => PHOTOS[(stepRef.current + offset) % PHOTOS.length];

  const [mainPhoto, setMainPhoto] = useState(photoAtStep(0));
  const [smallPhoto, setSmallPhoto] = useState(photoAtStep(1));

  const firedRef = useRef(false);

  const handleMouseEnter = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    stepRef.current = (stepRef.current + 1) % PHOTOS.length;
    setMainPhoto(photoAtStep(0));
    setSmallPhoto(photoAtStep(1));
  };

  const handleMouseLeave = () => {
    firedRef.current = false;
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main large frame */}
      <div
        className="overflow-hidden relative"
        style={{ borderRadius: 16, border: '5px solid var(--color-teal)', backgroundColor: 'var(--color-sand-60)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mainPhoto.src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <Image
              src={mainPhoto.src}
              alt={mainPhoto.alt}
              width={600}
              height={440}
              className="w-full h-auto object-cover block"
              style={{ aspectRatio: '4/3' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Small overlapping frame — cycles through photos */}
      <div
        className="absolute -bottom-6 -left-6 z-10 hidden lg:block"
        style={{
          width: '55%',
          borderRadius: 12,
          border: '4px solid var(--color-golden)',
          overflow: 'hidden',
          boxShadow: '4px 4px 20px rgba(14,58,45,0.15)',
          backgroundColor: 'var(--color-sand-60)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={smallPhoto.src}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <Image
              src={smallPhoto.src}
              alt={smallPhoto.alt}
              width={320}
              height={220}
              className="w-full h-auto object-cover block"
              style={{ aspectRatio: '3/2' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────────── */

export default function WhatMakesSalty() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* ── Header — left-aligned, large ── */}
        <ScrollReveal>
          <h2
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(13px, 5vw, 60px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              whiteSpace: 'nowrap',
            }}
          >
            What Makes SALTY, SALTY
          </h2>
        </ScrollReveal>

        {/* ── First block: Text left, photo right ── */}
        <div className="mt-12 flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div className="lg:w-[55%]">
            <ScrollReveal delay={0.1}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(16px, 1.5vw, 18px)',
                  color: 'var(--color-slate-grey)',
                  lineHeight: 1.7,
                }}
              >
                We&apos;re not a silent meditation retreat. We&apos;re not a
                bootcamp that guilts you.{' '}
                <br className="hidden md:block" />
                And we&apos;re definitely not that bender in Miami you went on
                where you told yourself you&apos;d get up in time for that one
                yoga class every night.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p
                className="mt-6"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(16px, 1.5vw, 18px)',
                  color: 'var(--color-slate-grey)',
                  lineHeight: 1.7,
                }}
              >
                SALTY sits in the middle. We believe pushing yourself in the
                morning makes your sunset drink(s) even sweeter. That fitness
                works better when it&apos;s fun. That the people you travel with
                matter as much as the place you&apos;re going. And that life is
                meant to be fun, and you should be having as much of it as
                possible.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="mt-10"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(16px, 1.5vw, 18px)',
                  color: 'var(--color-slate-grey)',
                  lineHeight: 1.7,
                }}
              >
                This is why our slogan is simply,
              </p>
              <p
                className="uppercase italic md:whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  color: 'var(--color-coral)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  marginTop: '48px',
                }}
              >
                Make fun of wellness.
              </p>
            </ScrollReveal>
          </div>

          {/* Photo stack — hover to cycle through 3 photos */}
          <div className="lg:w-[45%]">
            <ScrollReveal delay={0.2}>
              <RotatingPhotoStack />
            </ScrollReveal>
          </div>
        </div>

        {/* ── Closing paragraph ── */}
        <ScrollReveal delay={0.1}>
          <p
            className="mt-9 max-w-2xl"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              color: 'var(--color-slate-grey)',
              lineHeight: 1.7,
            }}
          >
            Whether you come solo or with people you know, you&apos;ll leave
            with new friends, sore muscles, and a few stories worth retelling.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
