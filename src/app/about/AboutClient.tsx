'use client';

import type { Coach, SiteSettings } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StatBar from '@/components/shared/StatBar';
import Button from '@/components/shared/Button';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface AboutClientProps {
  coaches: Coach[];
  founders: Coach[];
  settings: SiteSettings | null;
}

const WHATSAPP_URL = `https://wa.me/14318291135?text=${encodeURIComponent('Hey SALTY! Tell me more about your retreats.')}`;

// ── The SALTY origin story ──

const STORY_SECTIONS = [
  {
    heading: 'Fun Wasn\u2019t a Priority',
    body: 'We spent our twenties chasing the "right" way to be healthy. Strict diets, 5 AM alarms, no-fun fitness camps that made wellness feel like punishment. We traveled to retreats that promised transformation but delivered silence and celery juice. Something was missing.',
  },
  {
    heading: 'Then We Remembered',
    body: 'The best shape of our lives? It wasn\u2019t from a program. It was from surfing until our arms gave out, hiking with friends until we got lost, and dancing until the sun came up. The fitness was a side effect of living fully.',
  },
  {
    heading: 'We Tried It With Friends',
    body: 'In 2022, we threw together a scrappy group trip to Costa Rica. 20 people, half of them strangers. We surfed, trained, ate ridiculous food, and explored together. Nobody wanted to leave. Everyone asked: "When\u2019s the next one?"',
  },
  {
    heading: 'The Fun Is the Wellness',
    body: 'That\u2019s when SALTY was born. Not from a business plan, but from a WhatsApp group that kept growing. We realized the secret to sustainable wellness isn\u2019t discipline \u2014 it\u2019s doing things you love with people you like.',
  },
  {
    heading: 'Our Recipe',
    body: 'Take a stunning destination. Add world-class coaches who don\u2019t take themselves too seriously. Mix in 20\u201335 fun-loving travelers (mostly solo). Throw in surfing, strength training, yoga, local food, and a sunset or ten. Serve generous. That\u2019s SALTY.',
  },
];

// Placeholder founders when Sanity data isn't available
const PLACEHOLDER_FOUNDERS = [
  {
    name: 'Erin Harris',
    role: 'Co-Founder',
    bio: 'Former CrossFit coach turned adventure travel obsessive. Erin designs every SALTY retreat to hit the perfect balance of sweat, fun, and exploration. She\u2019s surfed on four continents and still can\u2019t cook.',
    specialties: ['Fitness Programming', 'Retreat Design', 'Community Building'],
  },
  {
    name: 'Nate Behar',
    role: 'Co-Founder',
    bio: 'Operations brain, travel nerd, and the guy who makes sure everything actually works. Nate handles the logistics so guests can focus on having the time of their lives. He\u2019s been to 35+ countries and counting.',
    specialties: ['Operations', 'Travel Planning', 'Digital Strategy'],
  },
];

export default function AboutClient({ coaches, founders, settings }: AboutClientProps) {
  const displayFounders = founders.length > 0 ? founders : PLACEHOLDER_FOUNDERS;
  const displayCoaches = coaches.filter((c) => !c.isFounder);

  const stats = settings
    ? [
        { value: `${settings.totalGuests}+`, label: 'Guests' },
        { value: `${settings.countriesCount}`, label: 'Countries' },
        { value: `${settings.averageRating}`, label: 'Avg Rating' },
        { value: '1', label: 'WhatsApp Group' },
      ]
    : [
        { value: '200+', label: 'Guests' },
        { value: '7', label: 'Countries' },
        { value: '4.9', label: 'Avg Rating' },
        { value: '1', label: 'WhatsApp Group' },
      ];

  return (
    <main>
      {/* ── 1. HERO ── */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{ minHeight: '55vh', backgroundColor: '#0E3A2D' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-16">
          <ScrollReveal>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 7vw, 64px)',
                color: '#F7F4ED',
                lineHeight: 1.1,
              }}
            >
              How We Made Fun of Wellness
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
              SALTY Retreats is a fitness travel company for people who believe
              the best workout is the one you actually enjoy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 2. GEO SNAPSHOT ── */}
      <section className="py-12 md:py-20 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p
              className="text-lg leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: '#0E3A2D',
              }}
            >
              <strong>SALTY Retreats</strong> is a fitness travel company founded
              in 2022. We organize all-inclusive group fitness retreats in
              destinations around the world — from Costa Rica to Morocco, Panama
              to Sicily. Our trips combine daily workouts, adventure activities,
              local culture, and community for 20–35 travelers per trip. Over 65%
              of our guests travel solo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#E7D7C0" direction="right" />

      {/* ── 3. THE STORY ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#E7D7C0' }}>
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2
              className="uppercase mb-12 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#0E3A2D',
              }}
            >
              The Story
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-12">
            {STORY_SECTIONS.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <h3
                  className="uppercase mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    color: '#0E3A2D',
                  }}
                >
                  {section.heading}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: '#4A4E58',
                    lineHeight: 1.7,
                  }}
                >
                  {section.body}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="left" />

      {/* ── 4. MEET THE FOUNDERS ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-12 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#F7F4ED',
              }}
            >
              Meet the Founders
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayFounders.map((founder, i) => (
              <ScrollReveal key={founder.name} delay={i * 0.08}>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#1F4638' }}>
                  {/* Photo */}
                  {'photo' in founder && founder.photo ? (
                    <img
                      src={urlFor(founder.photo as Coach['photo']).width(500).height(500).url()}
                      alt={founder.name}
                      className="w-full object-cover"
                      style={{ aspectRatio: '1/1' }}
                    />
                  ) : (
                    <div
                      className="w-full flex items-center justify-center"
                      style={{ aspectRatio: '1/1', backgroundColor: '#163A2E' }}
                    >
                      <span
                        className="uppercase opacity-30"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '48px',
                          color: '#F7F4ED',
                        }}
                      >
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-6">
                    <h3
                      className="uppercase mb-1"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '24px',
                        color: '#F7F4ED',
                      }}
                    >
                      {founder.name}
                    </h3>
                    <p
                      className="mb-3"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '13px',
                        color: '#F75A3D',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {founder.role}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: '#E7D7C0',
                        lineHeight: 1.6,
                      }}
                    >
                      {founder.bio}
                    </p>
                    {founder.specialties && founder.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {founder.specialties.map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                              backgroundColor: 'rgba(247,244,237,0.1)',
                              color: '#E7D7C0',
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OUR COACHES (if available) ── */}
      {displayCoaches.length > 0 && (
        <>
          <SwoopDivider color="#F7F4ED" direction="right" />
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
                  Our Coaches
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCoaches.map((coach, i) => (
                  <ScrollReveal key={coach._id || coach.name} delay={i * 0.04}>
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 4px 12px rgba(30,25,20,0.06)',
                      }}
                    >
                      {coach.photo ? (
                        <img
                          src={urlFor(coach.photo).width(400).height(400).url()}
                          alt={coach.name}
                          className="w-full object-cover"
                          style={{ aspectRatio: '1/1' }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full flex items-center justify-center"
                          style={{ aspectRatio: '1/1', backgroundColor: coach.cardColor || '#0E3A2D' }}
                        >
                          <span
                            className="uppercase opacity-40"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '36px',
                              color: '#F7F4ED',
                            }}
                          >
                            {coach.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div className="p-5">
                        <h3
                          className="uppercase"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '18px',
                            color: '#0E3A2D',
                          }}
                        >
                          {coach.name}
                        </h3>
                        <p
                          className="mt-0.5 mb-2"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            color: '#F75A3D',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {coach.role}
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: '#4A4E58',
                            lineHeight: 1.6,
                          }}
                        >
                          {coach.bio}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 6. THE NUMBERS ── */}
      <section className="py-12 md:py-20 px-6" style={{ backgroundColor: '#F7F4ED' }}>
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
              The Numbers
            </h2>
            <StatBar stats={stats} />
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="right" />

      {/* ── 7. FINAL CTA ── */}
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
              Check out our upcoming retreats or shoot us a message. We love
              chatting about trips.
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
