'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Image from 'next/image';

/* ─── Story Sections ─────────────────────────────────────────────────── */

const STORY_SECTIONS = [
  {
    heading: 'Fun Wasn\u2019t a Priority',
    body: 'We spent years building careers \u2014 owning fitness studios, doing everything right. Somewhere along the way, we forgot how to actually enjoy ourselves, and burned the hell out.',
    images: [
      '/images/retreat/beach-squats.png',
      '/images/retreat/palapa-workout.png',
      '/images/retreat/beach-core.png',
    ],
    frameColor: 'var(--color-teal)',
  },
  {
    heading: 'Then We Remembered',
    body: 'A few days of beach workouts, sunset yoga, and surfing, and it clicked. Not as simple as \u201csun + beach = happy people\u201d, but because we were intentionally seeking out the things that made us happy, in a healthy way. Sweating our butts off during the day in workouts, then dancing during the nights, meeting great people and smiling ear to ear.',
    images: ['/images/retreat/surf-lesson.png'],
    frameColor: 'var(--color-coral)',
  },
  {
    heading: 'We Tried It With Friends',
    body: 'So we planned a trip to Costa Rica. Brought some friends, welcomed a few brave strangers. 30 smiling guests later, it was clear: this feeling wasn\u2019t just ours to keep. SALTY was born.',
    images: ['/images/retreat/night-party.png'],
    frameColor: 'var(--color-golden)',
  },
  {
    heading: 'The Fun Is the Wellness',
    body: 'Here\u2019s what we know: fun isn\u2019t a reward for working hard enough. It\u2019s not something you earn. Fun is what actually makes you healthy. When you enjoy the things that are good for you, when you\u2019re happy, every health metric goes up. The rest is just details.',
    images: ['/images/retreat/hero-champagne.png'],
    frameColor: 'var(--color-coral)',
  },
  {
    heading: 'Our Recipe',
    body: 'We plan it all, so you don\u2019t have to. Just show up, sweat (as much as feels good), swim, maybe surf, eat, laugh, and (please) dance. This isn\u2019t about pressing pause on life back home, it\u2019s about returning lighter, recharged, with a vacation glow that lasts.',
    images: ['/images/retreat/palapa-laughing.png'],
    frameColor: 'var(--color-teal)',
  },
];

/* ─── Hover-cycling photo (for multi-image story blocks) ──────────── */

function CyclingPhoto({
  images,
  alt,
  frameColor,
  flushSide,
}: {
  images: string[];
  alt: string;
  frameColor: string;
  flushSide: 'left' | 'right';
}) {
  const stepRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const firedRef = useRef(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseEnter = () => {
    if (firedRef.current || images.length <= 1) return;
    firedRef.current = true;
    stepRef.current = (stepRef.current + 1) % images.length;
    setCurrent(stepRef.current);
  };
  const handleMouseLeave = () => {
    firedRef.current = false;
  };
  const handleClick = () => {
    if (images.length <= 1) return;
    stepRef.current = (stepRef.current + 1) % images.length;
    setCurrent(stepRef.current);
  };

  const borderStyle = isLg
    ? {
        border: `5px solid ${frameColor}`,
        borderLeft: flushSide === 'right' ? `5px solid ${frameColor}` : 'none',
        borderRight: flushSide === 'left' ? `5px solid ${frameColor}` : 'none',
      }
    : { border: `5px solid ${frameColor}` };

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={borderStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role={images.length > 1 ? 'button' : undefined}
      tabIndex={images.length > 1 ? 0 : undefined}
      aria-label={images.length > 1 ? 'Tap to see next photo' : undefined}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={images[current]}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Image
            src={images[current]}
            alt={alt}
            width={560}
            height={400}
            className="w-full object-cover"
            style={{ aspectRatio: '7/5' }}
          />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
            {images.map((_, j) => (
              <div
                key={j}
                className="rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: j === current ? '#fff' : 'rgba(255,255,255,0.4)',
                  transition: 'background-color 0.3s',
                }}
              />
            ))}
          </div>
          <div
            className="absolute bottom-3 left-3 z-10 flex lg:hidden items-center gap-1.5 px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(14,58,45,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                color: 'var(--color-paper-white)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Tap for more
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function AboutStory() {
  return (
    <section
      className="overflow-x-hidden"
      style={{
        backgroundColor: 'var(--color-surface-warm)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* Story blocks — alternating asymmetric layout */}
        <div className="flex flex-col" style={{ gap: 'clamp(48px, 6vw, 80px)' }}>
          {STORY_SECTIONS.map((section, i) => {
            const isEven = i % 2 === 0;

            return (
              <div key={i}>
                <ScrollReveal delay={0.06}>
                  <div
                    className="flex flex-col lg:flex-row items-center"
                    style={{ gap: 'clamp(24px, 4vw, 48px)' }}
                  >
                    {/* Text side */}
                    <div
                      className={`w-full lg:w-[55%] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                      <h2
                        className="uppercase mb-4"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(22px, 3vw, 32px)',
                          color: 'var(--color-teal)',
                          lineHeight: 1.1,
                        }}
                      >
                        {section.heading}
                      </h2>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(15px, 1.5vw, 17px)',
                          color: 'var(--color-slate-grey)',
                          lineHeight: 1.7,
                        }}
                      >
                        {section.body}
                      </p>
                    </div>

                    {/* Photo side — hover-cycling if multiple images */}
                    <div
                      className={`w-full lg:w-[45%] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <CyclingPhoto
                        images={section.images}
                        alt={section.heading}
                        frameColor={section.frameColor}
                        flushSide={isEven ? 'right' : 'left'}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
