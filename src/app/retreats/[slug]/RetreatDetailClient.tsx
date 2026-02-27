'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import FAQAccordion from '@/components/shared/FAQAccordion';
import CoachCard from '@/components/shared/CoachCard';
import SaltyMeter from '@/components/shared/SaltyMeter';
import SwoopDivider from '@/components/layout/SwoopDivider';
import VideoHero from '@/components/retreat/VideoHero';
import MarqueeTicker from '@/components/retreat/MarqueeTicker';
import HorizontalGallery from '@/components/retreat/HorizontalGallery';
import type { GalleryItem } from '@/components/retreat/HorizontalGallery';
import ParallaxVideoBreak from '@/components/retreat/ParallaxVideoBreak';
import FloatingDecorations from '@/components/retreat/FloatingDecorations';
import CounterStats from '@/components/retreat/CounterStats';

// ─────────────────────────────────────────────
// Images
// ─────────────────────────────────────────────
const IMG = {
  hero: '/images/retreat/hero-champagne.png',
  workoutBeach: '/images/retreat/erin-workout.png',
  guyWater: '/images/retreat/nate-water.png',
  sandDune: '/images/retreat/sand-dune-run.png',
  palapaLaugh: '/images/retreat/palapa-laughing.png',
  beachGroup: '/images/retreat/beach-squats.png',
  erinDancing: '/images/retreat/erin-pool.png',
  yogaCliffs: '/images/retreat/beach-core.png',
  palapaWorkout: '/images/retreat/palapa-workout.png',
  yogaWarrior: '/images/retreat/surf-lesson.png',
  shower: '/images/retreat/surfboard-walk.png',
  groupLaugh: '/images/retreat/guys-laughing.png',
  surfing: '/images/retreat/girl-surfing.png',
  poolEnergy: '/images/retreat/erin-pool.png',
  danceParty: '/images/retreat/night-party.png',
  jungleRest: '/images/retreat/palapa-workout.png',
};

const VIDEOS = {
  v1: 'Gmxnh9tZrHs',
  v2: '007ynDElL1Q',
  v3: 'WHQUq4Pu4Hg',
  v4: 'tWB61Oq4NoY',
  v5: 'uJ6YccG892U',
};

// ─────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────
const RETREAT = {
  name: 'PANAMA',
  officialName: 'City to Sea',
  dates: 'March 8–16, 2026',
  duration: '9 Days',
  location: 'Panama City + Santa Catalina',
  groupSize: '35–45',
  lowestPrice: 2399,
  geoDescription:
    'A Panama fitness retreat combines surf lessons, daily group workouts, and coastal exploration across Panama City and Santa Catalina. Wake up to jungle sounds, train on the beach before the heat sets in, and spend your afternoons learning to surf Pacific swells or exploring hidden waterfalls.',
  experienceNarrative: [
    "Panama isn't a resort. It's a country that doesn't quite know it's a travel destination yet — and that's exactly why we love it.",
    "You'll split your time between Panama City's Casco Viejo (think rooftop bars, street art, ceviche from a cart) and Santa Catalina, a sleepy surf town that hasn't been \"found\" yet.",
    "Every morning starts with movement. Some days it's a beach workout with Joe pushing you harder than you'd push yourself. Other days it's sunrise yoga with Riley on a clifftop.",
    "The evenings bring the group together. Shared dinners, sunset beers, and the kind of conversations that happen when 35 strangers decide to show up for themselves.",
  ],
  forYouIf: [
    'You want real surf instruction, not just "stand on a board for Instagram"',
    'You like your fitness served with a side of adventure',
    "You're comfortable being uncomfortable — new country, new people, new things",
    'You want a group trip without the group tour energy',
    "You're a solo traveller looking for instant community",
  ],
  activities: [
    { title: 'Surf', subtitle: 'Learn to ride Pacific swells', image: IMG.surfing, duration: 'Daily sessions', accent: '#B6D4EA' },
    { title: 'Sweat', subtitle: 'Beach HIIT & functional training', image: IMG.sandDune, duration: 'Every morning', accent: '#F75A3D' },
    { title: 'Flow', subtitle: 'Sunrise yoga & breathwork', image: IMG.yogaCliffs, duration: 'Daily practice', accent: '#A4E5D9' },
    { title: 'Explore', subtitle: 'Jungle hikes & hidden waterfalls', image: IMG.jungleRest, duration: 'Guided excursions', accent: '#3A6B35' },
    { title: 'Connect', subtitle: 'Group dinners & sunset beers', image: IMG.groupLaugh, duration: 'Every evening', accent: '#FED260' },
    { title: 'Dance', subtitle: 'Let loose — this is SALTY', image: IMG.danceParty, duration: 'Theme nights', accent: '#FF7E70' },
  ],
  dailyRhythm: [
    { time: 'Morning', activity: 'Sunrise yoga or beach workout', icon: '🌅' },
    { time: 'Midday', activity: 'Brunch, free time, cultural excursions', icon: '☀️' },
    { time: 'Afternoon', activity: 'Surf lessons, jungle hike, or rest', icon: '🏄' },
    { time: 'Evening', activity: 'Group dinner, sunset beers, bonfire', icon: '🔥' },
  ],
  itinerary: [
    { day: 1, title: 'Arrival in Panama City', summary: 'Check in at Casco Viejo. Welcome dinner on a rooftop overlooking the old town.', location: 'Panama City', image: IMG.palapaLaugh },
    { day: 2, title: 'City Sweat & Culture', summary: 'Morning beach workout on the Causeway. Afternoon walking tour — street art, empanadas, salsa lesson.', location: 'Panama City', image: IMG.beachGroup },
    { day: 3, title: 'The Road to Santa Catalina', summary: 'Morning yoga, scenic drive to the coast. Settle in at the surf lodge. Sunset on the beach.', location: 'Transit', image: IMG.yogaWarrior },
    { day: 4, title: 'First Waves', summary: 'Morning workout, afternoon surf lessons. Groups split by level. Evening bonfire dinner.', location: 'Santa Catalina', image: IMG.surfing },
    { day: 5, title: 'Into the Jungle', summary: 'Sunrise yoga, full-day jungle hike to waterfalls. Swimming, wildlife, exhaustion.', location: 'Santa Catalina', image: IMG.jungleRest },
    { day: 6, title: 'Surf & Restore', summary: 'Morning surf. Afternoon free — massage, snorkeling, or hammock. Restorative yoga at sunset.', location: 'Santa Catalina', image: IMG.yogaCliffs },
    { day: 7, title: 'Full Send', summary: 'Beach HIIT, advanced surf, sunset SUP. This is the day you came for.', location: 'Santa Catalina', image: IMG.sandDune },
    { day: 8, title: 'Last Ride', summary: 'Final sunrise yoga on the clifftop. Last surf. Farewell dinner with awards and speeches.', location: 'Santa Catalina', image: IMG.erinDancing },
    { day: 9, title: 'Departure', summary: 'Breakfast together, shuttle to the airport. Hugs, tears, WhatsApp group forever.', location: 'Panama City', image: IMG.guyWater },
  ],
  roomTiers: [
    { name: 'Standard Double', price: 2399, description: 'Shared room (2 guests), private bathroom, A/C, pool access', perDay: '$267/day' },
    { name: 'Premium Double', price: 2699, description: 'Ocean view, shared room (2 guests), A/C, pool', perDay: '$300/day' },
    { name: 'Premium Single', price: 3099, description: 'Private room, ocean view, A/C, pool access', perDay: '$344/day' },
    { name: 'Suite', price: 3499, description: 'Private suite, panoramic view, private terrace', perDay: '$389/day' },
  ],
  paymentPolicy: 'A $500 deposit secures your spot. Full balance due 60 days before the retreat.',
  cancellationPolicy: 'Full refund (minus deposit) 60+ days out. 50% refund 30–60 days. No refund under 30 days.',
  accommodation: {
    name: 'Santa Catalina Surf Lodge',
    description: 'A boutique surf lodge steps from the beach. Open-air common areas, a saltwater pool, and hammocks everywhere.',
    features: ['Saltwater pool', 'Steps to the beach', 'Open-air restaurant', 'Surf board storage', 'A/C in all rooms', 'Wi-Fi'],
  },
  coaches: [
    { name: 'Erin Harris', bio: 'Co-founder of SALTY. CPT, RYT-200. Believes fitness should make you laugh at least once.', specialties: ['CPT', 'RYT-200'], personality: 'The Heart', cardColor: '#B6D4EA' },
    { name: 'Nate Behar', bio: "Co-founder. Former CFL athlete. Will convince you to try things you didn't think you could do.", specialties: ['Former CFL', 'Fitness'], personality: 'The Hype', cardColor: '#3A6B35' },
    { name: 'Riley', bio: 'Yoga instructor and movement coach. Her flows are challenging but never intimidating.', specialties: ['RYT-500', 'Movement'], personality: 'The Flow', cardColor: '#A4E5D9' },
    { name: 'Joe', bio: 'Strength and conditioning coach. Scales every workout so everyone finishes feeling strong.', specialties: ['CSCS', 'S&C'], personality: 'The Push', cardColor: '#C74235' },
  ],
  saltyMeter: {
    scores: { sweatLevel: 7, adventure: 7, culture: 8, party: 7, rest: 6, groupSize: 8 },
    bestFor: ['First-time solo travellers', 'Surf + fitness seekers', 'Social butterflies', 'Central America curious'],
    maybeNotFor: ['Luxury seekers', 'Silent retreat types', 'Small group only'],
  },
  testimonials: [
    { name: 'Sarah M.', quote: 'I went alone and left with 35 new friends. Learning to surf was the highlight of my year.', retreat: 'Panama 2025', featured: true },
    { name: 'Mike R.', quote: "Best fitness trip I've ever been on. Not too structured, not too chill. Just right.", retreat: 'Panama 2025' },
    { name: 'Jess K.', quote: 'The coaches are incredible. Every workout felt personalized even in a big group.', retreat: 'Panama 2025' },
    { name: 'Dan T.', quote: 'I came for the surf and stayed for the people. Already booked Morocco.', retreat: 'Panama 2025' },
    { name: 'Lauren B.', quote: "The jungle hike was magical. I've never felt so alive and so tired at the same time.", retreat: 'Panama 2025' },
  ],
  faqs: [
    { question: 'Do I need surf experience?', answer: "Nope. Our instructors work with complete beginners every trip. You'll be standing up by day two (probably)." },
    { question: 'What fitness level do I need?', answer: "All levels. Every workout is scalable. Our coaches meet you where you are." },
    { question: 'Is this good for solo travellers?', answer: "It's practically designed for solos. About 65% come alone. You'll have friends before the welcome dinner ends." },
    { question: "What's the food situation?", answer: 'Breakfast and dinner included daily. Lunch is on your own at great local spots. Dietary restrictions accommodated.' },
    { question: 'What should I pack?', answer: "Workout clothes, swimsuit (or three), sunscreen, sense of adventure. Full packing list sent after booking." },
    { question: 'Is the deposit refundable?', answer: 'The deposit is non-refundable but transferable to another retreat.' },
    { question: 'Can I extend my trip?', answer: "Absolutely. Many guests add days in Panama City or Bocas del Toro. We'll help with recs." },
  ],
  included: [
    '8 nights accommodation', 'All daily workouts', 'Daily yoga sessions', 'Surf lessons (boards included)',
    'Jungle hike with guide', 'Airport transfers', 'Welcome + farewell dinners',
    'Daily breakfast + dinner', 'All in-country transport', 'SALTY swag bag',
  ],
  notIncluded: [
    'Flights to/from Panama City', 'Travel insurance (required)',
    'Lunches', 'Alcoholic beverages', 'Optional excursions', 'Spa treatments',
  ],
};

// ─────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────

// YouTubeEmbed removed — replaced by ParallaxVideoBreak and HorizontalGallery

// HeroSection removed — replaced by VideoHero component

// ─────────────────────────────────────────────
// 2. PHOTO MOSAIC — "Feel it before you read it"
// ─────────────────────────────────────────────

function PhotoMosaic() {
  const shouldReduceMotion = useReducedMotion();
  const images = [
    { src: IMG.surfing, alt: 'Surfing in Santa Catalina', span: 'col-span-2 row-span-2' },
    { src: IMG.erinDancing, alt: 'Dancing under the palapa', span: '' },
    { src: IMG.guyWater, alt: 'Pure energy in the ocean', span: '' },
    { src: IMG.yogaCliffs, alt: 'Yoga with ocean views', span: 'col-span-2' },
    { src: IMG.danceParty, alt: 'Dance party night', span: '' },
    { src: IMG.palapaLaugh, alt: 'Laughing together', span: '' },
  ];

  return (
    <section className="w-full px-3 md:px-6 py-3 md:py-6" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-7xl mx-auto" style={{ gridAutoRows: 'clamp(140px, 22vw, 260px)' }}>
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            className={`overflow-hidden ${img.span}`}
            style={{ borderRadius: '12px' }}
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 3. ABOUT — Editorial split with giant pull quote
// ─────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="w-full relative" style={{ backgroundColor: 'var(--color-surface-base)', padding: 'var(--space-section-y) 0' }}>
      <FloatingDecorations
        decorations={[
          { type: 'palm-leaf', position: { top: '10%', right: '-2%' }, size: 80, color: 'var(--color-palm-green)', opacity: 0.08, animationDuration: 5 },
          { type: 'sun-ray', position: { bottom: '15%', left: '-1%' }, size: 60, color: 'var(--color-gold)', opacity: 0.06, animationDuration: 4, animationDelay: 1.5 },
        ]}
      />
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-7">
            <ScrollReveal>
              <h2
                className="uppercase mb-6"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}
              >
                Nine days of movement, community, and one of Central America&apos;s most underrated coastlines.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: 'var(--color-slate-grey)', lineHeight: 1.8 }}>
                {RETREAT.geoDescription}
              </p>
            </ScrollReveal>

            {/* Animated counter stats */}
            <ScrollReveal delay={0.15}>
              <CounterStats
                stats={[
                  { value: 9, suffix: '', label: 'Days' },
                  { value: 65, suffix: '%', label: 'Solo Travelers' },
                  { value: 5, label: 'Group Dinners' },
                  { value: 2, label: 'Surf Lessons' },
                ]}
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} className="md:col-span-5">
            <div className="relative">
              <img src={IMG.workoutBeach} alt="Beach workout led by Erin" className="w-full object-cover" style={{ borderRadius: '16px', aspectRatio: '3/4' }} loading="lazy" />
              <div
                className="absolute -bottom-4 -left-4 md:-left-8 px-6 py-4"
                style={{ backgroundColor: 'var(--color-coral)', borderRadius: '12px', maxWidth: '85%' }}
              >
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'white', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.4 }}>
                  &ldquo;Make fun of wellness.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// VideoMoment removed — replaced by ParallaxVideoBreak component

// ─────────────────────────────────────────────
// 5. EXPERIENCE GRID — The Paris-by-Emily signature
// ─────────────────────────────────────────────

function ExperienceGridSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const tabs = ['All', 'Surf', 'Sweat', 'Flow', 'Explore', 'Connect', 'Dance'];
  const filtered = activeTab && activeTab !== 'All'
    ? RETREAT.activities.filter((a) => a.title === activeTab)
    : RETREAT.activities;

  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-teal)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <ScrollReveal>
          <p className="uppercase tracking-[0.25em] mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#A4E5D9', fontWeight: 700 }}>
            Experiences
          </p>
          <h2 className="uppercase mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F7F4ED', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {"What You'll Do"}
          </h2>
          <p className="mb-10" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: '#E7D7C0', maxWidth: '540px' }}>
            Six ways to move, explore, and connect. Every day is different. Every moment is yours.
          </p>
        </ScrollReveal>

        {/* Category tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab === 'All' ? null : tab)}
                className="px-5 py-2 rounded-full transition-all duration-200 cursor-pointer uppercase text-xs font-bold tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  backgroundColor: (activeTab === tab || (!activeTab && tab === 'All')) ? '#F7F4ED' : 'rgba(247,244,237,0.1)',
                  color: (activeTab === tab || (!activeTab && tab === 'All')) ? '#0E3A2D' : '#E7D7C0',
                  border: '1px solid rgba(247,244,237,0.2)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative overflow-hidden cursor-pointer"
              style={{ borderRadius: '16px', aspectRatio: '4/5' }}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              layout
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,58,45,0.9) 0%, rgba(14,58,45,0.2) 50%, transparent 100%)' }} />

              {/* Duration pill */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase"
                  style={{ backgroundColor: 'rgba(247,244,237,0.15)', backdropFilter: 'blur(8px)', color: '#F7F4ED', border: '1px solid rgba(247,244,237,0.2)' }}
                >
                  {item.duration}
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: item.accent }} />
                <h3 className="uppercase" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#F7F4ED', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  {item.title}
                </h3>
                <p className="mt-2" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#E7D7C0', lineHeight: 1.4 }}>
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Rhythm */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {RETREAT.dailyRhythm.map((slot) => (
              <div key={slot.time} className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(247,244,237,0.06)', border: '1px solid rgba(247,244,237,0.1)' }}>
                <span className="text-2xl block mb-2">{slot.icon}</span>
                <p className="uppercase text-xs tracking-wider mb-1" style={{ fontFamily: 'var(--font-display)', color: '#FED260' }}>{slot.time}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#E7D7C0', lineHeight: 1.4 }}>{slot.activity}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 6. EXPERIENCE NARRATIVE + "FOR YOU IF"
// ─────────────────────────────────────────────

function ExperienceNarrative() {
  return (
    <section className="w-full relative" style={{ backgroundColor: 'var(--color-surface-base)', padding: 'var(--space-section-y) 0' }}>
      <FloatingDecorations
        decorations={[
          { type: 'wave-curl', position: { top: '20%', left: '-3%' }, size: 100, color: 'var(--color-sky-blue)', opacity: 0.08, animationDuration: 4.5 },
          { type: 'tropical-flower', position: { bottom: '10%', right: '-1%' }, size: 50, color: 'var(--color-coral)', opacity: 0.07, animationDuration: 3.5, animationDelay: 2 },
        ]}
      />
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <ScrollReveal>
              <img src={IMG.poolEnergy} alt="Erin by the pool" className="w-full object-cover sticky top-24" style={{ borderRadius: '16px', aspectRatio: '3/4' }} loading="lazy" />
            </ScrollReveal>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal>
              <h2 className="uppercase mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>
                What to Expect
              </h2>
            </ScrollReveal>

            {RETREAT.experienceNarrative.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p className="mb-6" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', color: 'var(--color-slate-grey)', lineHeight: 1.8 }}>
                  {p}
                </p>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.3}>
              <div className="mt-8 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'var(--color-teal)' }}>
                <h3 className="uppercase mb-5" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h4)', color: '#FED260', letterSpacing: '-0.03em' }}>
                  This Is For You If...
                </h3>
                <ul className="space-y-3">
                  {RETREAT.forYouIf.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#A4E5D9' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5L4 7.5L8 3.5" stroke="#0E3A2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#E7D7C0', lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 7. INCLUSIONS — Clean, confident
// ─────────────────────────────────────────────

function InclusionsSection() {
  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-sand)', padding: 'var(--space-section-y) 0' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <ScrollReveal>
          <h2 className="uppercase mb-10" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>
            {"What's Included"}
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="uppercase text-xs tracking-[0.15em] mb-5 font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-palm-green)' }}>Included</h4>
              <ul className="space-y-3">
                {RETREAT.included.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#A4E5D9' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6.5L5 8.5L9 4.5" stroke="#0E3A2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-base)', color: 'var(--color-teal)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="uppercase text-xs tracking-[0.15em] mb-5 font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-grey)' }}>Not Included</h4>
              <ul className="space-y-3">
                {RETREAT.notIncluded.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(74,78,88,0.1)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="#4A4E58" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-base)', color: 'var(--color-slate-grey)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 8. ITINERARY — Visual, day-by-day
// ─────────────────────────────────────────────

function ItinerarySection() {
  const [openDay, setOpenDay] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-surface-base)', padding: 'var(--space-section-y) 0' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <ScrollReveal>
          <h2 className="uppercase mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>
            Your 9 Days
          </h2>
          <p className="mb-10" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: 'var(--color-slate-grey)' }}>
            Every day is an adventure. Here&apos;s the shape of it.
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {RETREAT.itinerary.map((day, idx) => {
            const isOpen = openDay === day.day;
            return (
              <ScrollReveal key={day.day} delay={idx * 0.04}>
                <div className="overflow-hidden rounded-xl" style={{ backgroundColor: 'var(--color-surface-warm-light)', border: `2px solid ${isOpen ? 'var(--color-coral)' : 'transparent'}`, transition: 'border-color 200ms' }}>
                  <button onClick={() => setOpenDay(isOpen ? null : day.day)} className="w-full flex items-center gap-4 p-4 md:p-5 text-left cursor-pointer" aria-expanded={isOpen}>
                    <span className="uppercase w-14 text-center py-1 rounded-full text-xs font-bold shrink-0" style={{ fontFamily: 'var(--font-display)', backgroundColor: isOpen ? 'var(--color-coral)' : 'var(--color-palm-green)', color: '#F7F4ED' }}>
                      Day {day.day}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="uppercase block truncate" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h5)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>{day.title}</span>
                      <span className="text-xs" style={{ color: 'var(--color-slate-grey)' }}>{day.location}</span>
                    </div>
                    <motion.svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}>
                      <path d="M5 8L10 13L15 8" stroke="var(--color-coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="overflow-hidden">
                        <div className="px-5 pb-5 flex gap-4">
                          <img src={day.image} alt={day.title} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shrink-0 hidden sm:block" loading="lazy" />
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-base)', color: 'var(--color-slate-grey)', lineHeight: 1.6 }}>{day.summary}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 9. PRICING — Premium, dark
// ─────────────────────────────────────────────

function PricingSection() {
  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-teal)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <ScrollReveal>
          <p className="uppercase tracking-[0.25em] mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#A4E5D9', fontWeight: 700 }}>
            {RETREAT.dates} &middot; {RETREAT.duration}
          </p>
          <h2 className="uppercase mb-10" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F7F4ED', letterSpacing: '-0.03em' }}>
            Dates & Pricing
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RETREAT.roomTiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.1}>
              <div className="flex flex-col p-6 h-full rounded-2xl" style={{ backgroundColor: i === 0 ? 'rgba(247,244,237,0.08)' : 'rgba(247,244,237,0.03)', border: i === 0 ? '2px solid var(--color-coral)' : '1px solid rgba(247,244,237,0.1)' }}>
                {i === 0 && <span className="self-start px-3 py-1 rounded-full mb-3 uppercase text-xs font-bold" style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-coral)', color: '#F7F4ED' }}>Most Popular</span>}
                <h4 className="uppercase mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h5)', color: '#F7F4ED', letterSpacing: '-0.03em' }}>{tier.name}</h4>
                <p className="mb-6 flex-1" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#E7D7C0', lineHeight: 1.5, opacity: 0.8 }}>{tier.description}</p>
                <p className="uppercase" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#FED260', letterSpacing: '-0.03em', lineHeight: 1 }}>${tier.price.toLocaleString()}</p>
                <p className="text-xs mb-5" style={{ color: '#E7D7C0', opacity: 0.5 }}>{tier.perDay} &middot; per person</p>
                <Button variant="primary" size="sm" fullWidth>Book Now</Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {[
              { title: 'Payment', text: RETREAT.paymentPolicy },
              { title: 'Cancellation', text: RETREAT.cancellationPolicy },
            ].map((p) => (
              <div key={p.title} className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(247,244,237,0.04)', border: '1px solid rgba(247,244,237,0.08)' }}>
                <h4 className="uppercase mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: '#FED260', letterSpacing: '0.05em' }}>{p.title}</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#E7D7C0', lineHeight: 1.5 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 10. ACCOMMODATION — Full-bleed photo
// ─────────────────────────────────────────────

function AccommodationSection() {
  return (
    <section className="w-full relative overflow-hidden" style={{ minHeight: '70vh' }}>
      <img src={IMG.shower} alt="Outdoor vibes at the surf lodge" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(14,58,45,0.92) 0%, rgba(14,58,45,0.7) 50%, rgba(14,58,45,0.3) 100%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-lg">
          <ScrollReveal>
            <p className="uppercase tracking-[0.25em] mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#A4E5D9', fontWeight: 700 }}>Where You&apos;ll Stay</p>
            <h2 className="uppercase mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: '#F7F4ED', letterSpacing: '-0.03em' }}>
              {RETREAT.accommodation.name}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: '#E7D7C0', lineHeight: 1.7 }}>{RETREAT.accommodation.description}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {RETREAT.accommodation.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#A4E5D9' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#E7D7C0' }}>{f}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 11. COACHES
// ─────────────────────────────────────────────

function CoachesSection() {
  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-surface-base)', padding: 'var(--space-section-y) 0' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <ScrollReveal>
          <h2 className="uppercase mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>Your Coaches</h2>
          <p className="mb-10" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: 'var(--color-slate-grey)' }}>The humans behind the sweat, flow, and fun.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-grid-gap)' }}>
          {RETREAT.coaches.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 0.1}>
              <CoachCard name={c.name} bio={c.bio} specialties={c.specialties} personality={c.personality} cardColor={c.cardColor} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 12. SALTY METER
// ─────────────────────────────────────────────

function SaltyMeterSection() {
  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-surface-warm-light)', padding: 'var(--space-section-y) 0' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <ScrollReveal className="shrink-0">
            <SaltyMeter scores={RETREAT.saltyMeter.scores} fillColor="var(--color-palm-green)" />
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="flex-1">
            <h2 className="uppercase mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h3)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>
              The Vibe Check
            </h2>
            <div className="space-y-8">
              <div>
                <h4 className="uppercase text-xs tracking-[0.15em] mb-3 font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-palm-green)' }}>Best For</h4>
                <ul className="space-y-2">
                  {RETREAT.saltyMeter.bestFor.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#A4E5D9' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5L4 7.5L8 3.5" stroke="#0E3A2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span style={{ fontSize: 'var(--type-body-base)', color: 'var(--color-slate-grey)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="uppercase text-xs tracking-[0.15em] mb-3 font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bright-coral)' }}>Maybe Not For</h4>
                <ul className="space-y-2">
                  {RETREAT.saltyMeter.maybeNotFor.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,126,112,0.15)' }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#FF7E70" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </div>
                      <span style={{ fontSize: 'var(--type-body-base)', color: 'var(--color-slate-grey)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 13. WALL OF LOVE — Editorial testimonials
// ─────────────────────────────────────────────

function WallOfLoveSection() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-surface-base)', padding: 'var(--space-section-y) 0' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <ScrollReveal>
          <h2 className="uppercase mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>
            Wall of Love
          </h2>
          <p className="mb-12" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: 'var(--color-slate-grey)' }}>
            Don&apos;t take our word for it.
          </p>
        </ScrollReveal>

        <div className="space-y-0">
          {RETREAT.testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="py-8 md:py-10"
              style={{ borderBottom: i < RETREAT.testimonials.length - 1 ? '1px solid var(--color-sand)' : undefined }}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <p
                  className="flex-1"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: t.featured ? 'clamp(1.25rem, 2.5vw, 1.75rem)' : 'clamp(1rem, 1.5vw, 1.25rem)',
                    color: 'var(--color-teal)',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="shrink-0 md:text-right md:w-36">
                  <p className="font-bold" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-teal)' }}>{t.name}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-coral)', fontWeight: 700 }}>{t.retreat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 14. FAQ
// ─────────────────────────────────────────────

function FAQSection() {
  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-sand)', padding: 'var(--space-section-y) 0' }}>
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        <ScrollReveal>
          <h2 className="uppercase mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}>
            Questions?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <FAQAccordion items={RETREAT.faqs} />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 15. FINAL CTA — Full-bleed photo
// ─────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '60vh' }}>
      <img src={IMG.beachGroup} alt="SALTY group working out on the beach" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,58,45,0.9) 0%, rgba(14,58,45,0.5) 50%, rgba(14,58,45,0.3) 100%)' }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32" style={{ minHeight: '60vh' }}>
        <ScrollReveal>
          <h2 className="uppercase mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: '#F7F4ED', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Ready for<br />Panama?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mb-8 max-w-md" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: '#E7D7C0', lineHeight: 1.6 }}>
            Nine days. Surf, sweat, jungle, and new friends. Spots limited to {RETREAT.groupSize} guests.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg">Book Now</Button>
            <Button variant="secondary" size="lg">Ask a Question</Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-10 text-xs" style={{ color: 'rgba(247,244,237,0.4)' }}>
            SALTY partners with Movement Travel, a TICO-licensed travel agency.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Multi-layer wave divider
// ─────────────────────────────────────────────

function MultiWave({ to, variant = 'warm' }: { to: string; variant?: 'warm' | 'cool' | 'sunset' }) {
  const palettes = {
    warm: ['#F75A3D', '#FED260', '#B6D4EA', to],
    cool: ['#A4E5D9', '#B6D4EA', '#E7D7C0', to],
    sunset: ['#FF7E70', '#FED260', '#A4E5D9', to],
  };
  const c = palettes[variant];
  return (
    <div className="w-full overflow-hidden leading-none" style={{ height: 80 }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full block">
        <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z" fill={c[0]} opacity="0.9" />
        <path d="M0,55 C320,10 640,90 960,40 C1200,0 1360,70 1440,45 L1440,120 L0,120 Z" fill={c[1]} opacity="0.9" />
        <path d="M0,70 C280,110 560,30 840,80 C1120,120 1300,50 1440,70 L1440,120 L0,120 Z" fill={c[2]} opacity="0.9" />
        <path d="M0,90 C360,60 720,110 1080,80 C1260,65 1380,95 1440,85 L1440,120 L0,120 Z" fill={c[3]} />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Gallery items for HorizontalGallery
// ─────────────────────────────────────────────

const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'image', src: IMG.surfing, alt: 'Surfing Pacific swells in Santa Catalina' },
  { type: 'image', src: IMG.erinDancing, alt: 'Dancing under the palapa' },
  { type: 'video', src: VIDEOS.v3, alt: 'SALTY retreat highlights', caption: 'A taste of the SALTY experience' },
  { type: 'image', src: IMG.yogaCliffs, alt: 'Sunrise yoga on the cliffs' },
  { type: 'image', src: IMG.danceParty, alt: 'Dance party night' },
  { type: 'image', src: IMG.palapaLaugh, alt: 'Laughing together' },
  { type: 'image', src: IMG.poolEnergy, alt: 'Pool energy' },
  { type: 'image', src: IMG.guyWater, alt: 'Pure ocean energy' },
];

export default function RetreatDetailClient({ slug }: { slug: string }) {
  return (
    <main data-retreat="panama" className="w-full overflow-x-hidden">
      {/* 1. VideoHero — full-viewport autoplay YouTube background */}
      <VideoHero
        videoId={VIDEOS.v1}
        destination={RETREAT.name}
        officialName={RETREAT.officialName}
        stats={[
          { label: 'Duration', value: RETREAT.duration },
          { label: 'Dates', value: RETREAT.dates },
          { label: 'Location', value: RETREAT.location },
        ]}
        priceFrom={RETREAT.lowestPrice}
        fallbackImageUrl={IMG.hero}
      />

      {/* 2. Photo mosaic — feel it before you read it */}
      <PhotoMosaic />

      {/* ★ Marquee ticker — energy strip */}
      <MarqueeTicker
        items={['SURF', 'SWEAT', 'EXPLORE', 'CONNECT', 'REPEAT']}
        backgroundColor="var(--color-palm-green)"
        textColor="var(--color-paper-white)"
        speed={30}
      />

      {/* 3. About — editorial split + animated counters + floating decorations */}
      <AboutSection />

      {/* 4. Parallax video break — cinematic autoplay */}
      <ParallaxVideoBreak
        videoId={VIDEOS.v2}
        caption="This is what a SALTY morning looks like."
      />

      {/* Divider → dark */}
      <MultiWave to="#0E3A2D" variant="warm" />

      {/* 5. Experience grid — THE centerpiece */}
      <ExperienceGridSection />

      {/* 6. Experience narrative + floating decorations */}
      <ExperienceNarrative />

      {/* ★ Horizontal gallery — swipe/drag carousel with photos + video */}
      <section className="w-full py-12 md:py-16" style={{ backgroundColor: 'var(--color-surface-base)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 mb-8">
          <ScrollReveal>
            <p
              className="uppercase tracking-[0.25em] mb-2"
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-coral)', fontWeight: 700 }}
            >
              Gallery
            </p>
            <h2
              className="uppercase"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h3)', color: 'var(--color-teal)', letterSpacing: '-0.03em' }}
            >
              Moments That Matter
            </h2>
          </ScrollReveal>
        </div>
        <HorizontalGallery items={GALLERY_ITEMS} />
      </section>

      {/* 7. Parallax video break — surf sessions */}
      <ParallaxVideoBreak
        videoId={VIDEOS.v4}
        caption="Santa Catalina surf sessions."
      />

      {/* ★ Second marquee ticker — location strip */}
      <MarqueeTicker
        items={['CITY', 'COAST', 'JUNGLE', 'OCEAN', 'COMMUNITY']}
        backgroundColor="var(--color-bright-coral)"
        textColor="var(--color-paper-white)"
        speed={35}
      />

      {/* Divider → sand */}
      <SwoopDivider color="var(--color-sand)" height={48} />

      {/* 8. Inclusions */}
      <InclusionsSection />

      {/* Divider → base */}
      <SwoopDivider color="var(--color-surface-base)" height={48} direction="right" />

      {/* 9. Itinerary */}
      <ItinerarySection />

      {/* Divider → pricing */}
      <MultiWave to="#0E3A2D" variant="sunset" />

      {/* 10. Pricing */}
      <PricingSection />

      {/* 11. Accommodation — full-bleed */}
      <AccommodationSection />

      {/* 12. Coaches */}
      <CoachesSection />

      {/* 13. SALTY Meter */}
      <SaltyMeterSection />

      {/* 14. Parallax video break — final cinematic moment */}
      <ParallaxVideoBreak videoId={VIDEOS.v5} />

      {/* 15. Wall of Love */}
      <WallOfLoveSection />

      {/* Divider → sand */}
      <SwoopDivider color="var(--color-sand)" height={48} />

      {/* 16. FAQ */}
      <FAQSection />

      {/* 17. Final CTA — full-bleed */}
      <FinalCTASection />
    </main>
  );
}
