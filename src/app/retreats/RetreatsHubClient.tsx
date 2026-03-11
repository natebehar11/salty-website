'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { RetreatCard, FAQCategory, SiteSettings, SanityImage } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import VideoBackground from '@/components/shared/VideoBackground';
import SaltyMeter from '@/components/shared/SaltyMeter';
import FAQAccordion from '@/components/shared/FAQAccordion';
import Button from '@/components/shared/Button';
import Carousel from '@/components/shared/Carousel';
import SwoopDivider from '@/components/layout/SwoopDivider';
import MarqueeTicker from '@/components/retreat/MarqueeTicker';
import AnchorStarBadge from '@/components/shared/AnchorStarBadge';
import { RETREATS_HUB_FAQS } from '@/lib/faq-data';

// ── Types ──

type PastRetreat = {
  _id: string;
  name: string;
  officialName: string;
  slug: string;
  startDate: string;
  heroImage: SanityImage;
};

interface RetreatsHubClientProps {
  retreats: RetreatCard[];
  pastRetreats: PastRetreat[];
  faqCategories: FAQCategory[];
  settings: SiteSettings | null;
}

// ── Helpers ──

const WHATSAPP_NUMBER = '14318291135';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hey SALTY! I need help picking a retreat.')}`;
const QUIZ_URL = 'https://explore.getsaltyretreats.com/quiz';

const PAST_RETREAT_VIDEO_IDS = ['WHQUq4Pu4Hg', 'uJ6YccG892U', 'Gmxnh9tZrHs'];

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const yearOpts: Intl.DateTimeFormatOptions = { ...opts, year: 'numeric' };
  if (s.getFullYear() === e.getFullYear()) {
    return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
  }
  return `${s.toLocaleDateString('en-US', yearOpts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
}

function getStatusBadge(status: RetreatCard['status']): { label: string; bg: string; color: string } | null {
  switch (status) {
    case 'selling-fast':
      return { label: 'Selling Fast', bg: '#F75A3D', color: '#FFFFFF' };
    case 'sold-out':
      return { label: 'Sold Out', bg: '#4A4E58', color: '#FFFFFF' };
    case 'early-bird':
      return { label: 'Early Bird', bg: '#FED260', color: '#0E3A2D' };
    case 'new-trip':
      return { label: 'New Trip', bg: '#B6D4EA', color: '#0E3A2D' };
    case 'coming-soon':
      return { label: 'Coming Soon', bg: '#E7D7C0', color: '#0E3A2D' };
    default:
      return null;
  }
}

// ── Hover Video Card (for retreat grid) ──

function HoverVideoCard({ retreat, index }: { retreat: RetreatCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videoId = PAST_RETREAT_VIDEO_IDS[index % PAST_RETREAT_VIDEO_IDS.length];

  useEffect(() => {
    if (hovered && !iframeReady) {
      timerRef.current = setTimeout(() => setIframeReady(true), 400);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [hovered, iframeReady]);

  const badge = getStatusBadge(retreat.status);
  const isSoldOut = retreat.status === 'sold-out';

  const youtubeParams = [
    'autoplay=1', 'mute=1', 'loop=1', `playlist=${videoId}`,
    'controls=0', 'showinfo=0', 'rel=0', 'modestbranding=1', 'playsinline=1',
  ].join('&');

  return (
    <Link
      href={`/retreats/${retreat.slug}`}
      className="block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(30,25,20,0.06), 0 1px 3px rgba(30,25,20,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIframeReady(false); }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
        {retreat.heroImage ? (
          <img
            src={urlFor(retreat.heroImage).width(600).height(375).url()}
            alt={retreat.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: retreat.colorTheme.dark }}
          >
            <span
              className="uppercase tracking-wider opacity-40"
              style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#F7F4ED' }}
            >
              {retreat.name}
            </span>
          </div>
        )}

        {/* Video overlay on hover */}
        <AnimatePresence>
          {hovered && iframeReady && (
            <motion.div
              className="absolute inset-0 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ pointerEvents: 'none' }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?${youtubeParams}`}
                title=""
                allow="autoplay; encrypted-media"
                className="absolute w-full h-full"
                style={{
                  border: 'none',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  minWidth: '177.78vh', minHeight: '56.25vw',
                  pointerEvents: 'none',
                }}
                tabIndex={-1}
                aria-hidden="true"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {badge && (
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10"
            style={{ backgroundColor: badge.bg, color: badge.color, fontFamily: 'var(--font-display)', fontSize: '11px' }}
          >
            {badge.label}
          </span>
        )}

        {retreat.spotsRemaining && retreat.spotsRemaining <= 10 && !isSoldOut && (
          <span
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold z-10"
            style={{ backgroundColor: 'rgba(14,58,45,0.85)', color: '#FED260', fontFamily: 'var(--font-body)', fontSize: '11px' }}
          >
            {retreat.spotsRemaining} spots left
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3
              className="uppercase"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 3vw, 20px)', color: '#0E3A2D', lineHeight: 1.2 }}
            >
              {retreat.officialName}
            </h3>
            <p className="mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A4E58' }}>
              {retreat.location}
            </p>
          </div>
          <span
            className="shrink-0"
            style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 700, color: retreat.colorTheme.accent }}
          >
            ${retreat.lowestPrice.toLocaleString()}
          </span>
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A4E58' }}>
          {formatDateRange(retreat.startDate, retreat.endDate)} · {retreat.totalDays} Days
        </p>

        {retreat.saltyMeter && (
          <div className="flex gap-1 mt-3">
            {(['adventure', 'culture', 'party', 'sweat', 'rest'] as const).map((dim) => (
              <div key={dim} className="flex-1">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E7D7C0' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(retreat.saltyMeter[dim] / 10) * 100}%`, backgroundColor: retreat.colorTheme.accent }}
                  />
                </div>
                <p className="text-center mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#4A4E58', textTransform: 'capitalize' }}>
                  {dim}
                </p>
              </div>
            ))}
          </div>
        )}

        <p
          className="mt-4 uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: retreat.colorTheme.accent }}
        >
          {isSoldOut ? 'Join Waitlist' : 'View Trip'} →
        </p>
      </div>
    </Link>
  );
}

// ── Past Adventure Video Card ──

function PastAdventureCard({
  name,
  year,
  videoId,
  heroImage,
}: {
  name: string;
  year: string;
  videoId?: string;
  heroImage?: SanityImage | null;
}) {
  const [hovered, setHovered] = useState(false);

  const youtubeParams = videoId
    ? ['autoplay=1', 'mute=1', 'loop=1', `playlist=${videoId}`, 'controls=0', 'showinfo=0', 'rel=0', 'modestbranding=1', 'playsinline=1'].join('&')
    : '';

  return (
    <div
      className="rounded-2xl overflow-hidden group cursor-pointer"
      style={{ backgroundColor: '#1F4638' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/2' }}>
        {heroImage ? (
          <img
            src={urlFor(heroImage).width(600).height(400).url()}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500"
            style={{ filter: hovered ? 'brightness(1.15)' : 'brightness(0.85)' }}
            loading="lazy"
          />
        ) : videoId ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={name}
              className="w-full h-full object-cover transition-all duration-500"
              style={{ filter: hovered ? 'brightness(1.15)' : 'brightness(0.85)' }}
            />
            {hovered && (
              <motion.div
                className="absolute inset-0 hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{ pointerEvents: 'none' }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?${youtubeParams}`}
                  title=""
                  allow="autoplay; encrypted-media"
                  className="absolute w-full h-full"
                  style={{
                    border: 'none',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '177.78vh', minHeight: '56.25vw',
                    pointerEvents: 'none',
                  }}
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#163A2E' }}>
            <span style={{ color: '#F7F4ED', opacity: 0.3, fontFamily: 'var(--font-display)', fontSize: '28px' }}>
              {name}
            </span>
          </div>
        )}

        {/* Play indicator for video cards */}
        {videoId && (
          <div
            className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(14,58,45,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1.5 0.5L6.5 4L1.5 7.5V0.5Z" fill="var(--color-paper-white)" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#F7F4ED', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Watch
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="uppercase" style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#F7F4ED' }}>
          SALTY {name}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#E7D7C0', opacity: 0.7 }}>
          {year}
        </p>
      </div>
    </div>
  );
}

// ── Placeholder retreat data when Sanity is empty ──

const PLACEHOLDER_RETREATS: RetreatCard[] = [
  {
    _id: 'p1',
    name: 'Panama',
    officialName: 'SALTY Panama',
    slug: 'panama-fitness-retreat',
    status: 'active',
    startDate: '2025-11-15',
    endDate: '2025-11-22',
    totalDays: 7,
    location: 'Bocas del Toro',
    country: 'Panama',
    lowestPrice: 2200,
    groupSize: { min: 20, max: 35 },
    soloTravelerPercent: 65,
    spotsRemaining: 12,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#2A6B5A', secondary: '#E8C4A0', accent: '#FF6B35', surface: '#F5EEE6', dark: '#1A4D3E', textOnAccent: '#FFFFFF', ticketTextColor: '#1A4D3E' },
    saltyMeter: { adventure: 9, culture: 7, party: 8, sweat: 7, rest: 6 },
  },
  {
    _id: 'p2',
    name: 'Morocco',
    officialName: 'SALTY Morocco',
    slug: 'morocco-fitness-retreat',
    status: 'selling-fast',
    startDate: '2026-03-08',
    endDate: '2026-03-15',
    totalDays: 7,
    location: 'Marrakech & Atlas Mountains',
    country: 'Morocco',
    lowestPrice: 2400,
    groupSize: { min: 20, max: 30 },
    soloTravelerPercent: 70,
    spotsRemaining: 6,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#C1562C', secondary: '#F2D8A8', accent: '#E8A838', surface: '#FDF5EB', dark: '#8B3A1D', textOnAccent: '#FFFFFF', ticketTextColor: '#8B3A1D' },
    saltyMeter: { adventure: 8, culture: 10, party: 6, sweat: 7, rest: 7 },
  },
  {
    _id: 'p3',
    name: 'Sicily',
    officialName: 'SALTY Sicily',
    slug: 'sicily-fitness-retreat',
    status: 'early-bird',
    startDate: '2026-05-10',
    endDate: '2026-05-17',
    totalDays: 7,
    location: 'Taormina',
    country: 'Italy',
    lowestPrice: 2600,
    groupSize: { min: 20, max: 30 },
    soloTravelerPercent: 60,
    spotsRemaining: 18,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#2B5F8A', secondary: '#F5D5B5', accent: '#E65C3A', surface: '#FFF8F0', dark: '#1A3D5C', textOnAccent: '#FFFFFF', ticketTextColor: '#1A3D5C' },
    saltyMeter: { adventure: 7, culture: 9, party: 8, sweat: 6, rest: 8 },
  },
  {
    _id: 'p4',
    name: 'El Salvador',
    officialName: 'SALTY El Salvador',
    slug: 'el-salvador-fitness-retreat',
    status: 'new-trip',
    startDate: '2026-01-18',
    endDate: '2026-01-25',
    totalDays: 7,
    location: 'El Zonte & El Tunco',
    country: 'El Salvador',
    lowestPrice: 1900,
    groupSize: { min: 20, max: 35 },
    soloTravelerPercent: 72,
    spotsRemaining: 22,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#1B5E4B', secondary: '#F0DCC0', accent: '#F7941D', surface: '#F7F2EB', dark: '#0F3B2F', textOnAccent: '#FFFFFF', ticketTextColor: '#0F3B2F' },
    saltyMeter: { adventure: 10, culture: 7, party: 9, sweat: 8, rest: 5 },
  },
  {
    _id: 'p5',
    name: 'Costa Rica',
    officialName: 'SALTY Costa Rica v4',
    slug: 'costa-rica-v4-fitness-retreat',
    status: 'coming-soon',
    startDate: '2026-07-11',
    endDate: '2026-07-18',
    totalDays: 7,
    location: 'Nosara',
    country: 'Costa Rica',
    lowestPrice: 2300,
    groupSize: { min: 20, max: 35 },
    soloTravelerPercent: 68,
    spotsRemaining: 30,
    heroImage: null as unknown as RetreatCard['heroImage'],
    colorTheme: { primary: '#1E6B52', secondary: '#E8D5B8', accent: '#F75A3D', surface: '#F5F0E8', dark: '#0E3A2D', textOnAccent: '#FFFFFF', ticketTextColor: '#0E3A2D' },
    saltyMeter: { adventure: 9, culture: 6, party: 8, sweat: 9, rest: 7 },
  },
];

// ── Component ──

export default function RetreatsHubClient({
  retreats,
  pastRetreats,
  faqCategories,
  settings,
}: RetreatsHubClientProps) {
  const [selectedMeterIndex, setSelectedMeterIndex] = useState(0);

  const displayRetreats = retreats.length > 0 ? retreats : PLACEHOLDER_RETREATS;

  const faqItems =
    faqCategories.length > 0
      ? faqCategories.flatMap((cat) => cat.questions || [])
      : RETREATS_HUB_FAQS;

  return (
    <main>
      {/* ── 1. HERO — Video background + larger typography + starburst ── */}
      <section
        className="relative flex items-center justify-center text-center px-6 overflow-hidden"
        style={{ minHeight: '80vh', backgroundColor: '#0E3A2D' }}
      >
        <VideoBackground
          videoId="Gmxnh9tZrHs"
          overlayGradient="linear-gradient(to bottom, rgba(14,58,45,0.60) 0%, rgba(14,58,45,0.72) 50%, rgba(14,58,45,0.90) 100%)"
          deferMs={1200}
        />

        {/* Starburst badge — hidden on mobile to prevent overlap */}
        <motion.div
          className="absolute z-20 hidden md:flex"
          style={{ top: '12%', right: '5%' }}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.7, duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <AnchorStarBadge text="2026 TRIPS" size={100} />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-16">
          <ScrollReveal>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 12vw, 101px)',
                color: '#F7F4ED',
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
              }}
            >
              Upcoming Fitness Retreats
            </h1>
            <p
              className="mt-4 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              Surf, sweat, explore, and connect with a crew of fun-loving travelers.
              Pick a destination and let&apos;s go.
            </p>
            {settings && (
              <p
                className="mt-3"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#B6D4EA' }}
              >
                {settings.totalGuests}+ guests · {settings.averageRating} avg rating · {settings.countriesCount} countries
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 2. OUR RETREATS — Card Grid with hover video preview ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-10 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#0E3A2D',
              }}
            >
              Our Retreats
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRetreats.map((retreat, i) => (
              <ScrollReveal key={retreat._id} delay={i * 0.05}>
                <HoverVideoCard retreat={retreat} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ↓ MarqueeTicker energy break — between retreats and "Not Sure" */}
      <MarqueeTicker
        items={['SURF', 'SWEAT', 'EXPLORE', 'CONNECT', 'REPEAT']}
        separator="◆"
        backgroundColor="var(--color-palm-green)"
        textColor="var(--color-paper-white)"
      />

      <SwoopDivider color="#E7D7C0" direction="right" />

      {/* ── 3. NOT SURE WHICH TRIP? — SALTY Meter Carousel ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#E7D7C0' }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-3 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#0E3A2D',
              }}
            >
              Not Sure Which Trip?
            </h2>
            <p
              className="text-center mb-10 max-w-lg mx-auto"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 2vw, 16px)', color: '#4A4E58' }}
            >
              Every SALTY retreat has its own vibe. Compare them side by side.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {displayRetreats.map((retreat, i) => (
                <button
                  key={retreat._id}
                  onClick={() => setSelectedMeterIndex(i)}
                  className="px-4 py-2 min-h-[44px] rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '12px',
                    backgroundColor: i === selectedMeterIndex ? retreat.colorTheme.dark : 'transparent',
                    color: i === selectedMeterIndex ? '#F7F4ED' : '#0E3A2D',
                    border: i === selectedMeterIndex ? 'none' : '1.5px solid #0E3A2D',
                  }}
                >
                  {retreat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {displayRetreats[selectedMeterIndex] && (
            <ScrollReveal>
              <div
                className="max-w-md mx-auto rounded-2xl p-8"
                style={{ backgroundColor: '#F7F4ED', boxShadow: '0 4px 12px rgba(30,25,20,0.06)' }}
              >
                <h3
                  className="uppercase text-center mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#0E3A2D' }}
                >
                  {displayRetreats[selectedMeterIndex].officialName}
                </h3>
                <p
                  className="text-center mb-6"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4A4E58' }}
                >
                  {displayRetreats[selectedMeterIndex].location}
                </p>
                <SaltyMeter
                  scores={displayRetreats[selectedMeterIndex].saltyMeter}
                  accentColor={displayRetreats[selectedMeterIndex].colorTheme.accent}
                />
                <div className="mt-6 text-center">
                  <Link
                    href={`/retreats/${displayRetreats[selectedMeterIndex].slug}`}
                    className="uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '14px',
                      color: displayRetreats[selectedMeterIndex].colorTheme.accent,
                    }}
                  >
                    View This Trip →
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )}

          <div className="md:hidden mt-8">
            <Carousel ariaLabel="SALTY Meter comparison" showArrows={false} gap={16}>
              {displayRetreats.map((retreat) => (
                <div
                  key={retreat._id}
                  className="rounded-2xl p-6"
                  style={{ width: 'min(280px, calc(100vw - 48px))', backgroundColor: '#F7F4ED', boxShadow: '0 4px 12px rgba(30,25,20,0.06)' }}
                >
                  <h4
                    className="uppercase text-center mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#0E3A2D' }}
                  >
                    {retreat.name}
                  </h4>
                  <p
                    className="text-center mb-4"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A4E58' }}
                  >
                    {retreat.location}
                  </p>
                  <SaltyMeter scores={retreat.saltyMeter} accentColor={retreat.colorTheme.accent} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="left" />

      {/* ── 4. PAST RETREATS — Video cards ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-3 text-center"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F7F4ED' }}
            >
              Past Adventures
            </h2>
            <p
              className="text-center mb-10"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 2vw, 16px)', color: '#E7D7C0' }}
            >
              A taste of what SALTY trips look like.
            </p>
          </ScrollReveal>

          {pastRetreats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastRetreats.map((pr, i) => {
                const year = new Date(pr.startDate).getFullYear().toString();
                return (
                  <ScrollReveal key={pr._id}>
                    <PastAdventureCard
                      name={pr.officialName || pr.name}
                      year={year}
                      videoId={PAST_RETREAT_VIDEO_IDS[i % PAST_RETREAT_VIDEO_IDS.length]}
                      heroImage={pr.heroImage}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Sicily', year: '2024' },
                { name: 'Troncones', year: '2024' },
                { name: 'El Salvador', year: '2024' },
              ].map((pr, i) => (
                <ScrollReveal key={pr.name}>
                  <PastAdventureCard
                    name={pr.name}
                    year={pr.year}
                    videoId={PAST_RETREAT_VIDEO_IDS[i]}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="right" />

      {/* ── 5. NEED HELP CHOOSING? ── */}
      <section className="py-16 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-4"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#0E3A2D' }}
            >
              Need Help Choosing?
            </h2>
            <p
              className="mb-8"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2.5vw, 18px)', color: '#4A4E58', lineHeight: 1.6 }}
            >
              Take our 2-minute quiz and we&apos;ll match you with the perfect retreat.
              Or just message us — we love chatting about trips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={QUIZ_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Take the Quiz
                </Button>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  Chat With Us
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ↓ MarqueeTicker energy break — between "Help Choosing" and FAQs */}
      <MarqueeTicker
        items={['CITY', 'COAST', 'JUNGLE', 'OCEAN', 'COMMUNITY']}
        separator="◆"
        backgroundColor="var(--color-coral)"
        textColor="var(--color-teal)"
      />

      <SwoopDivider color="#E7D7C0" direction="left" />

      {/* ── 6. FAQs ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#E7D7C0' }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-8 text-center"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#0E3A2D' }}
            >
              Retreat FAQs
            </h2>
            <FAQAccordion items={faqItems} withSchema />
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
                style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#F75A3D' }}
              >
                See All FAQs →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
