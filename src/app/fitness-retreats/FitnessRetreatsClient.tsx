'use client';

import type { RetreatCard, Testimonial, SiteSettings } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StatBar from '@/components/shared/StatBar';
import TestimonialCard from '@/components/shared/TestimonialCard';
import FAQAccordion from '@/components/shared/FAQAccordion';
import Button from '@/components/shared/Button';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface FitnessRetreatsClientProps {
  retreats: RetreatCard[];
  testimonials: Testimonial[];
  settings: SiteSettings | null;
}

const WHATSAPP_URL = `https://wa.me/14318291135?text=${encodeURIComponent('Hey SALTY! Tell me about your fitness retreats.')}`;

// ── Content sections per IA doc ──

const ACTIVITIES = [
  {
    emoji: '💪',
    name: 'Sweat',
    description:
      'Daily group workouts led by expert coaches — functional fitness, HIIT, strength training, and more. Every session scales to your level.',
  },
  {
    emoji: '🏄',
    name: 'Surf',
    description:
      'Learn to surf or level up your skills with local instructors. Most of our destinations have world-class waves for all abilities.',
  },
  {
    emoji: '🧘',
    name: 'Yoga',
    description:
      'Stretch, breathe, and recover with sunrise or sunset yoga sessions. Perfect balance to the high-energy activities.',
  },
  {
    emoji: '🌍',
    name: 'Explore',
    description:
      'Guided hikes, cultural excursions, local food tours, and hidden gems. Every destination has unique adventures waiting.',
  },
  {
    emoji: '🤝',
    name: 'Connect',
    description:
      'Group dinners, sunset hangouts, and shared adventures. The community you build is what makes SALTY unforgettable.',
  },
];

const QUALIFYING = [
  {
    heading: 'This is for you if...',
    items: [
      'You like to move your body but hate boring gym routines',
      'You want to travel but don\'t want to do it alone',
      'You think wellness should include cocktails at sunset',
      'You\'re a solo traveler looking for your people',
      'You want adventure, not just a beach chair',
    ],
  },
  {
    heading: 'Maybe skip this if...',
    items: [
      'You want a silent, meditative retreat',
      'You need a strict meal plan and calorie tracking',
      'You don\'t like meeting new people',
      'You prefer five-star luxury with no surprises',
      'You think fun and fitness can\'t coexist',
    ],
  },
];

const DESTINATIONS = [
  { name: 'Costa Rica', slug: 'costa-rica', vibe: 'Surf, jungle, pura vida', color: '#0E3A2D' },
  { name: 'Panama', slug: 'panama', vibe: 'Island hopping, Caribbean energy', color: '#1A4D3E' },
  { name: 'Morocco', slug: 'morocco', vibe: 'Desert, culture, adventure', color: '#8B3A1D' },
  { name: 'Sicily', slug: 'sicily', vibe: 'Mediterranean food, history, coast', color: '#1A3D5C' },
  { name: 'El Salvador', slug: 'el-salvador', vibe: 'Surf, volcanoes, raw adventure', color: '#0F3B2F' },
  { name: 'Sri Lanka', slug: 'sri-lanka', vibe: 'Temples, tea, wildlife', color: '#2D5A27' },
  { name: 'Nicaragua', slug: 'nicaragua', vibe: 'Coming soon...', color: '#4A4E58' },
];

const INCLUSIONS = {
  included: [
    'Accommodation (7 nights)',
    'Daily group workouts with coaches',
    'Adventure activities & excursions',
    'Most meals (breakfast + dinner daily)',
    'Airport transfers',
    'Expert coaching & guides',
    'Welcome pack & SALTY merch',
    'WhatsApp community access',
  ],
  notIncluded: [
    'Flights',
    'Travel insurance',
    'Some lunches (free time to explore)',
    'Personal spending & souvenirs',
    'Visa fees (if applicable)',
    'Optional spa/massage treatments',
  ],
};

const SEO_FAQ = [
  {
    question: 'What is a fitness retreat?',
    answer:
      'A fitness retreat is a group travel experience that combines structured workouts, adventure activities, and cultural exploration in a destination setting. Unlike traditional vacations, fitness retreats include daily exercise, coached sessions, and wellness activities alongside sightseeing and social experiences.',
  },
  {
    question: 'How much does a fitness retreat cost?',
    answer:
      'SALTY fitness retreats range from $1,900 to $2,600 USD depending on the destination and room type. This includes accommodation, daily workouts, most meals, activities, and airport transfers. Flights and travel insurance are not included.',
  },
  {
    question: 'Are fitness retreats good for beginners?',
    answer:
      'Absolutely. SALTY retreats welcome all fitness levels. Every workout and activity offers scaled options so you can participate at your own pace. Most of our guests aren\'t professional athletes — they\'re regular people who enjoy being active.',
  },
  {
    question: 'Can you go on a fitness retreat alone?',
    answer:
      'Yes — over 65% of SALTY guests travel solo. Our retreats are specifically designed to bring people together, so solo travelers quickly become part of the group. It\'s one of the best ways to travel solo while still having a social experience.',
  },
  {
    question: 'What\'s the difference between a fitness retreat and a boot camp?',
    answer:
      'Boot camps are typically intense, regimented programs focused purely on physical training. Fitness retreats like SALTY combine workouts with travel, culture, adventure, and social experiences. Nothing is mandatory, and the goal is to enjoy yourself while staying active.',
  },
];

// Placeholder testimonials
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    _id: 'seo1', guestName: 'Sarah M.', city: 'Toronto', year: 2024,
    quote: 'I went solo and came home with 20 new friends. The workouts were tough but fun, and the vibe was electric.',
    rating: 5, isVideo: false, tags: ['featured'], retreatName: 'SALTY Costa Rica',
  },
  {
    _id: 'seo2', guestName: 'James K.', city: 'London', year: 2024,
    quote: 'Best trip I\'ve ever taken. The coaches are amazing, the group was incredible, and Panama is paradise.',
    rating: 5, isVideo: false, tags: ['featured'], retreatName: 'SALTY Panama',
  },
  {
    _id: 'seo3', guestName: 'Megan L.', city: 'Austin', year: 2024,
    quote: 'The balance of fitness and fun is perfect. Not too intense, not too chill. Just right.',
    rating: 5, isVideo: false, tags: ['featured'], retreatName: 'SALTY Sicily',
  },
];

export default function FitnessRetreatsClient({
  retreats,
  testimonials,
  settings,
}: FitnessRetreatsClientProps) {
  const displayTestimonials = testimonials.length > 0 ? testimonials.slice(0, 3) : PLACEHOLDER_TESTIMONIALS;

  const stats = settings
    ? [
        { value: `${settings.totalGuests}+`, label: 'Happy Guests' },
        { value: `${settings.countriesCount}`, label: 'Countries' },
        { value: `${settings.soloTravelerPercent}%`, label: 'Solo Travelers' },
        { value: `${settings.averageRating}`, label: 'Avg Rating' },
      ]
    : [
        { value: '200+', label: 'Happy Guests' },
        { value: '7', label: 'Countries' },
        { value: '65%', label: 'Solo Travelers' },
        { value: '5.0', label: 'Avg Rating' },
      ];

  return (
    <main>
      {/* Schema.org — Organization + Product + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SALTY Retreats',
            url: 'https://getsaltyretreats.com',
            description: 'All-inclusive group fitness retreats combining daily workouts, adventure activities, and cultural exploration.',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: settings?.averageRating?.toString() || '4.9',
              bestRating: '5',
              ratingCount: settings?.totalGuests?.toString() || '200',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: SEO_FAQ.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          }),
        }}
      />

      {/* ── 1. HERO ── */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{ minHeight: '60vh', backgroundColor: '#0E3A2D' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-16">
          <ScrollReveal>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 6vw, 56px)',
                color: '#F7F4ED',
                lineHeight: 1.1,
              }}
            >
              Fitness Retreats for People Who Still Know How to Have Fun
            </h1>
            <p
              className="mt-5 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              All-inclusive group fitness travel. Surf, sweat, explore, connect —
              in stunning destinations around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 2. GEO DEFINITION BLOCK ── */}
      <section className="py-12 md:py-20 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p
              className="text-lg leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: '#0E3A2D',
                lineHeight: 1.8,
              }}
            >
              A <strong>fitness retreat</strong> is a group travel experience that
              combines daily workouts, adventure activities, and cultural
              exploration in a destination setting. <strong>SALTY Retreats</strong>{' '}
              organizes all-inclusive fitness retreats for 20–35 travelers per trip
              in destinations like Costa Rica, Panama, Morocco, Sicily, El
              Salvador, and Sri Lanka. Over 65% of guests travel solo. Each
              retreat includes coached workouts, surfing, hiking, yoga, local food
              experiences, and community-building activities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#E7D7C0" direction="right" />

      {/* ── 3. WHAT YOU'LL ACTUALLY DO ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#E7D7C0' }}>
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
              {"What You'll Actually Do"}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ACTIVITIES.map((act, i) => (
              <ScrollReveal key={act.name} delay={i * 0.05}>
                <div
                  className="rounded-2xl p-6 text-center h-full"
                  style={{
                    backgroundColor: '#F7F4ED',
                    boxShadow: '0 4px 12px rgba(30,25,20,0.04)',
                  }}
                >
                  <span className="text-3xl mb-3 block">{act.emoji}</span>
                  <h3
                    className="uppercase mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      color: '#0E3A2D',
                    }}
                  >
                    {act.name}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: '#4A4E58',
                    }}
                  >
                    {act.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="left" />

      {/* ── 4. WE MIGHT NOT BE FOR YOU ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-10 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#F7F4ED',
              }}
            >
              Real Talk
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {QUALIFYING.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl p-6" style={{ backgroundColor: '#1F4638' }}>
                  <h3
                    className="uppercase mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      color: i === 0 ? '#FED260' : '#F75A3D',
                    }}
                  >
                    {section.heading}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          color: '#E7D7C0',
                        }}
                      >
                        <span style={{ color: i === 0 ? '#FED260' : '#F75A3D' }}>
                          {i === 0 ? '✓' : '✗'}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="right" />

      {/* ── 5. WHERE WE GO ── */}
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
              Where We Go
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {DESTINATIONS.map((dest, i) => (
              <ScrollReveal key={dest.slug} delay={i * 0.04}>
                <div
                  className="rounded-2xl p-5 text-center"
                  style={{ backgroundColor: dest.color }}
                >
                  <h3
                    className="uppercase mb-1"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      color: '#F7F4ED',
                    }}
                  >
                    {dest.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: '#E7D7C0',
                      opacity: 0.8,
                    }}
                  >
                    {dest.vibe}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/retreats">
              <Button variant="primary">
                See All Trips
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SwoopDivider color="#E7D7C0" direction="left" />

      {/* ── 6. BY THE NUMBERS ── */}
      <section className="py-12 md:py-20 px-6" style={{ backgroundColor: '#E7D7C0' }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-10 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#0E3A2D',
              }}
            >
              By the Numbers
            </h2>
            <StatBar stats={stats} />
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="right" />

      {/* ── 7. WHAT'S INCLUDED ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-10 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#0E3A2D',
              }}
            >
              {"What's Included"}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#E7F5EF' }}>
                <h3
                  className="uppercase mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    color: '#0E3A2D',
                  }}
                >
                  Included
                </h3>
                <ul className="flex flex-col gap-2">
                  {INCLUSIONS.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: '#0E3A2D',
                      }}
                    >
                      <span style={{ color: '#3A6B35' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFF5F3' }}>
                <h3
                  className="uppercase mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    color: '#0E3A2D',
                  }}
                >
                  Not Included
                </h3>
                <ul className="flex flex-col gap-2">
                  {INCLUSIONS.notIncluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: '#0E3A2D',
                      }}
                    >
                      <span style={{ color: '#C74235' }}>✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SwoopDivider color="#E7D7C0" direction="left" />

      {/* ── 8. WHAT PEOPLE SAY ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#E7D7C0' }}>
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
              What People Say
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.map((t, i) => (
              <ScrollReveal key={t._id} delay={i * 0.05}>
                <TestimonialCard
                  guestName={t.guestName}
                  quote={t.quote}
                  rating={t.rating}
                  city={t.city}
                  retreatAttended={t.retreatName}
                  avatarUrl={t.avatar ? urlFor(t.avatar).width(80).height(80).url() : undefined}
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reviews"
              className="uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: '#F75A3D',
              }}
            >
              Read More Reviews →
            </Link>
          </div>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="right" />

      {/* ── 9. FAQ ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-8 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#0E3A2D',
              }}
            >
              Fitness Retreat FAQ
            </h2>
            <FAQAccordion items={SEO_FAQ} withSchema={false} />
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  color: '#F75A3D',
                }}
              >
                See All FAQs →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="left" />

      {/* ── 10. FINAL CTA ── */}
      <section className="py-16 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                color: '#F7F4ED',
              }}
            >
              Ready to Get SALTY?
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              Check out our upcoming retreats or shoot us a message.
            </p>
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
    </main>
  );
}
