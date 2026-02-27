'use client';

import type { RetreatData } from '@/components/retreat/retreat-data';
import ShrinkingHero from '@/components/retreat/ShrinkingHero';
import InclusionsSection from '@/components/retreat/InclusionsSection';
import ExperienceSection from '@/components/retreat/ExperienceSection';
import ActivitiesSection from '@/components/retreat/ActivitiesSection';
import ScrollOverItinerary from '@/components/retreat/ScrollOverItinerary';
import AccommodationTabs from '@/components/retreat/AccommodationTabs';
import RetreatTicket from '@/components/retreat/RetreatTicket';
import HowItWorks from '@/components/retreat/HowItWorks';
import CoachesGrid from '@/components/retreat/CoachesGrid';
import TestimonialsSection from '@/components/retreat/TestimonialsSection';
import FinalCTA from '@/components/retreat/FinalCTA';
import FAQAccordion from '@/components/shared/FAQAccordion';
import SaltyMeter from '@/components/shared/SaltyMeter';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';

const WHATSAPP_NUMBER = '14318291135';

function buildWhatsAppUrl(retreatName: string): string {
  const message = encodeURIComponent(
    `Hey SALTY! I have a question about the ${retreatName} retreat.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

function scrollToAccommodation() {
  const el = document.getElementById('retreat-accommodation');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

interface RetreatPageClientProps {
  retreat: RetreatData;
}

export default function RetreatPageClient({ retreat }: RetreatPageClientProps) {
  const whatsAppUrl = buildWhatsAppUrl(retreat.destination);

  const handleBookNow = () => {
    if (retreat.bookingUrl) {
      window.open(retreat.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      scrollToAccommodation();
    }
  };

  const handleAskQuestion = () => {
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  const theme = {
    accent: 'var(--retreat-accent, var(--color-coral))',
    secondary: 'var(--retreat-secondary, var(--color-sky))',
  };

  const heroStats = [
    { label: 'Duration', value: `${retreat.duration} Days` },
    { label: 'Dates', value: retreat.dates.display },
    { label: 'From', value: `$${retreat.priceFrom.toLocaleString()}` },
    { label: 'Group Size', value: retreat.groupSize },
  ];

  return (
    <div data-retreat={retreat.slug.replace(/-fitness-retreat|-surf-retreat/g, '')}>
      {/* ═══════ 1. SHRINKING HERO ═══════ */}
      <ShrinkingHero
        destination={retreat.destination}
        officialName={retreat.officialName}
        heroImageUrl={retreat.heroImageUrl}
        stats={heroStats}
        onBookNow={handleBookNow}
        onAskQuestion={handleAskQuestion}
      />

      {/* Hero → Paper White */}
      <SwoopDivider color="var(--color-paper-white)" height={64} />

      {/* ═══════ 2. ABOUT / GEO ═══════ */}
      <section
        className="relative"
        style={{
          backgroundColor: 'var(--color-paper-white)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2
              className="uppercase mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              About This Retreat
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p
              className="leading-relaxed mb-10"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-lg)',
                color: 'var(--color-slate-grey)',
              }}
            >
              {retreat.geoDescription}
            </p>
          </ScrollReveal>

          {/* Quick Facts */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {retreat.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: 'var(--color-surface-warm-light)' }}
                >
                  <span
                    className="block text-xs uppercase tracking-wider mb-1"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-grey)' }}
                  >
                    {fact.label}
                  </span>
                  <span
                    className="block font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--type-h5)',
                      color: 'var(--color-teal)',
                    }}
                  >
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ 3. INTRO VIDEO ═══════ */}
      {retreat.youtubeVideoIds[0] && (
        <section
          style={{
            backgroundColor: 'var(--color-paper-white)',
            padding: '0 var(--space-section-x) var(--space-section-y)',
          }}
        >
          <ScrollReveal>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${retreat.youtubeVideoIds[0]}?autoplay=1&mute=1&loop=1&playlist=${retreat.youtubeVideoIds[0]}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                  title="SALTY Retreats"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Paper White → Warm Light */}
      <WaveDivider color="var(--color-surface-warm-light)" height={32} />

      {/* ═══════ 4. WHAT'S INCLUDED ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-surface-warm-light)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2
              className="uppercase mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              {"What's Included"}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <InclusionsSection
              included={retreat.included}
              notIncluded={retreat.notIncluded}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Warm Light → Paper White */}
      <WaveDivider color="var(--color-paper-white)" height={32} />

      {/* ═══════ 5. THE EXPERIENCE ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-paper-white)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <ExperienceSection
          destination={retreat.destination}
          duration={retreat.duration}
          narrative={retreat.experienceNarrative}
          narrativeImages={[
            retreat.activities[4]?.imageUrl || '/images/retreat/palapa-laughing.png',
            retreat.experienceImageUrl || '/images/retreat/girl-surfing.png',
          ]}
          forYouIf={retreat.forYouIf}
          bestFor={retreat.bestFor}
          maybeNotFor={retreat.maybeNotFor}
          accentColor={theme.accent}
        />
      </section>

      {/* Experience video 2 */}
      {retreat.youtubeVideoIds[1] && (
        <section
          style={{
            backgroundColor: 'var(--color-paper-white)',
            padding: '0 var(--space-section-x) var(--space-section-y)',
          }}
        >
          <ScrollReveal>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-md)' }}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${retreat.youtubeVideoIds[1]}?autoplay=1&mute=1&loop=1&playlist=${retreat.youtubeVideoIds[1]}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                  title="SALTY Retreats highlights"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Paper White → Dark */}
      <SwoopDivider color="var(--color-surface-dark)" height={64} />

      {/* ═══════ 6. WHAT YOU'LL DO ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-surface-dark)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <ActivitiesSection
          activities={retreat.activities}
          dailyRhythm={retreat.dailyRhythm}
        />
      </section>

      {/* Dark → Sand */}
      <SwoopDivider color="var(--color-sand)" direction="right" height={64} />

      {/* ═══════ 7. DAY-BY-DAY ITINERARY ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-sand)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2
              className="uppercase mb-10 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              Day-by-Day Itinerary
            </h2>
          </ScrollReveal>
        </div>
        <ScrollOverItinerary days={retreat.itinerary} />
      </section>

      {/* Sand → Paper White */}
      <WaveDivider color="var(--color-paper-white)" height={32} />

      {/* ═══════ 8. WHERE YOU'LL STAY ═══════ */}
      <section
        id="retreat-accommodation"
        style={{
          backgroundColor: 'var(--color-paper-white)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              {"Where You'll Stay"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
              <AccommodationTabs
                propertyName={retreat.accommodation.name}
                propertyDescription={retreat.accommodation.description}
                propertyFeatures={retreat.accommodation.features}
                roomTiers={retreat.roomTiers}
                retreatAccent={theme.accent}
                bookingUrl={retreat.bookingUrl}
              />
              <div className="lg:sticky lg:top-24">
                <RetreatTicket
                  name={retreat.officialName}
                  dates={retreat.dates.display}
                  startingPrice={retreat.priceFrom}
                  totalDays={retreat.duration}
                  bookingUrl={retreat.bookingUrl}
                  onBookNow={handleBookNow}
                  accentColor={theme.accent}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Paper White → Dark */}
      <SwoopDivider color="var(--color-surface-dark)" height={64} />

      {/* ═══════ 9. HOW IT WORKS ═══════ */}
      <HowItWorks
        depositAmount={retreat.depositAmount}
        paymentPolicy={retreat.paymentPolicy}
        cancellationPolicy={retreat.cancellationPolicy}
        soloPercent={retreat.soloTravelerPercent}
        accentColor={theme.accent}
        onBookNow={handleBookNow}
      />

      {/* Dark → Paper White */}
      <WaveDivider color="var(--color-paper-white)" height={32} />

      {/* ═══════ 10. YOUR COACHES ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-paper-white)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <CoachesGrid coaches={retreat.coaches} />
      </section>

      {/* Paper White → Dark */}
      <SwoopDivider color="var(--color-surface-dark)" height={64} />

      {/* ═══════ 11. SALTY METER ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-surface-dark)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2
              className="uppercase mb-10 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                color: 'var(--color-paper-white)',
                letterSpacing: '-0.03em',
              }}
            >
              SALTY Meter
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <SaltyMeter scores={retreat.saltyMeter} onDark />
          </ScrollReveal>

          {/* Best For / Maybe Not For on dark surface */}
          <ScrollReveal delay={0.15}>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'var(--color-surface-dark-raised)' }}
              >
                <h4
                  className="uppercase mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h4)',
                    color: 'var(--color-golden)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Best For
                </h4>
                <ul className="space-y-2">
                  {retreat.bestFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-sand)' }}>
                      <span style={{ color: 'var(--color-aquamarine)' }}>&#10003;</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'var(--color-surface-dark-raised)' }}
              >
                <h4
                  className="uppercase mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h4)',
                    color: 'var(--color-golden)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Maybe Not For
                </h4>
                <ul className="space-y-2">
                  {retreat.maybeNotFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-sand)' }}>
                      <span style={{ color: 'var(--color-bright-coral)' }}>&#10007;</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dark → Sand */}
      <WaveDivider color="var(--color-sand)" height={32} />

      {/* ═══════ 12. TESTIMONIALS ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-sand)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <TestimonialsSection testimonials={retreat.testimonials} />
      </section>

      {/* ═══════ 13. PHOTO STRIP ═══════ */}
      <section style={{ backgroundColor: 'var(--color-sand)' }}>
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              '/images/retreat/hero-champagne.png',
              '/images/retreat/night-party.png',
              '/images/retreat/guys-laughing.png',
              '/images/retreat/palapa-laughing.png',
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img src={src} alt="SALTY retreat moments" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Sand → Paper White */}
      <WaveDivider color="var(--color-paper-white)" height={32} />

      {/* ═══════ 14. FAQ ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-paper-white)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2
              className="uppercase mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                color: 'var(--color-teal)',
                letterSpacing: '-0.03em',
              }}
            >
              Retreat FAQ
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <FAQAccordion items={retreat.faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* Paper White → Dark */}
      <SwoopDivider color="var(--color-surface-dark)" height={64} />

      {/* ═══════ 15. FINAL CTA ═══════ */}
      <section
        style={{
          backgroundColor: 'var(--color-surface-dark)',
          padding: 'var(--space-section-y) var(--space-section-x)',
        }}
      >
        {/* Video 3 — cinematic closer above CTA */}
        {retreat.youtubeVideoIds[2] && (
          <ScrollReveal>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden mb-16" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${retreat.youtubeVideoIds[2]}?autoplay=1&mute=1&loop=1&playlist=${retreat.youtubeVideoIds[2]}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                  title="SALTY Retreats energy"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        )}
        <FinalCTA
          destination={retreat.destination}
          dates={retreat.dates.display}
          priceFrom={retreat.priceFrom}
          spotsRemaining={retreat.spotsRemaining}
          onBookNow={handleBookNow}
          onAskQuestion={handleAskQuestion}
        />
      </section>
    </div>
  );
}
