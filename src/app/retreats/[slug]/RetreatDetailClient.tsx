'use client';

import { RETREATS } from '@/components/retreat/retreat-data';
import CinematicHero from '@/components/retreat/CinematicHero';
import MarqueeTicker from '@/components/retreat/MarqueeTicker';
import ParallaxVideoBreak from '@/components/retreat/ParallaxVideoBreak';
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';
import DoubleLineDivider from '@/components/layout/DoubleLineDivider';
import AboutSection from '@/components/retreat/AboutSection';
import InclusionsPipe from '@/components/retreat/InclusionsPipe';
import ActivitiesGrid from '@/components/retreat/ActivitiesGrid';
import ItineraryScroll from '@/components/retreat/ItineraryScroll';
import AccommodationBrowser from '@/components/retreat/AccommodationBrowser';
import FilingCabinet from '@/components/retreat/FilingCabinet';
import CoachesReveal from '@/components/retreat/CoachesReveal';
import SaltyMeterVibe from '@/components/retreat/SaltyMeterVibe';
import TestimonialsVerdict from '@/components/retreat/TestimonialsVerdict';
import PhotoStrip from '@/components/retreat/PhotoStrip';
import RocaFAQ from '@/components/retreat/RocaFAQ';
import FinalCTA from '@/components/retreat/FinalCTA';
import StickyBookingBar from '@/components/retreat/StickyBookingBar';
import { DestinationExplorer } from '@/components/shared/DestinationExplorer';
import type { SaltyLandmark } from '@/types/landmark';

interface RetreatDetailProps {
  slug: string;
  landmarks?: SaltyLandmark[];
}

export default function RetreatDetailClient({ slug, landmarks = [] }: RetreatDetailProps) {
  const retreat = RETREATS[slug];

  if (!retreat) {
    return (
      <main className="flex items-center justify-center" style={{ minHeight: '60vh', backgroundColor: 'var(--color-surface-base)' }}>
        <div className="text-center px-6">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)', textTransform: 'uppercase' }}>
            Retreat Not Found
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-body-lg)', color: 'var(--color-slate-grey)', marginTop: 12 }}>
            We couldn&apos;t find a retreat with that URL. Check out our{' '}
            <a href="/retreats" style={{ color: 'var(--color-coral)', textDecoration: 'underline', textUnderlineOffset: 3 }}>upcoming retreats</a>.
          </p>
        </div>
      </main>
    );
  }

  const handleBookNow = () => {
    if (retreat.bookingUrl) {
      window.open(retreat.bookingUrl, '_blank');
      return;
    }
    const finalCta = document.getElementById('retreat-final-cta');
    if (finalCta) finalCta.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAskQuestion = () => {
    const whatsappUrl = `https://wa.me/14318291135?text=${encodeURIComponent(
      `Hey SALTY! I have a question about the ${retreat.destination} retreat.`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main data-retreat={retreat.destination.toLowerCase().replace(/\s+/g, '-')} className="w-full">
      {/* 1. CinematicHero */}
      <CinematicHero
        videoId={retreat.youtubeVideoIds[0]}
        destination={retreat.destination}
        officialName={retreat.officialName}
        stats={[
          { label: 'Duration', value: `${retreat.duration} Days` },
          { label: 'Dates', value: retreat.dates.display },
          { label: 'Location', value: retreat.location },
        ]}
        priceFrom={retreat.priceFrom}
        fallbackImageUrl={retreat.heroImageUrl}
        coBrand={retreat.coBrand}
        onBookNow={handleBookNow}
        onAskQuestion={handleAskQuestion}
      />

      <SwoopDivider color="var(--color-surface-base)" direction="left" />

      {/* 2. About — SaltySnapshot-style */}
      <AboutSection retreat={retreat} />

      {/* ↓ DOUBLE LINES — retreat palette (e.g. Panama: palm green, rust red) */}
      <DoubleLineDivider topColor="var(--retreat-primary)" bottomColor="var(--retreat-accent)" />

      {/* 3. Marquee ticker */}
      <MarqueeTicker
        items={['SURF', 'SWEAT', 'EXPLORE', 'CONNECT', 'REPEAT']}
        separator="◆"
        backgroundColor="var(--color-palm-green)"
        textColor="var(--color-paper-white)"
        speed={30}
      />

      {/* 4. Inclusions */}
      <InclusionsPipe included={retreat.included} notIncluded={retreat.notIncluded} />

      <SwoopDivider color="var(--color-surface-base)" direction="right" />

      {/* 5. Activities */}
      <ActivitiesGrid retreat={retreat} />

      {/* 6. Parallax video break */}
      <ParallaxVideoBreak
        videoId="007ynDElL1Q"
        caption="This is what a SALTY morning looks like."
      />

      {/* 7. Itinerary */}
      <ItineraryScroll itinerary={retreat.itinerary} />

      {/* ↓ WAVE paired */}
      <WaveDivider color="var(--color-surface-base)" height={36} />
      <WaveDivider color="var(--color-surface-base)" height={36} flip />

      {/* 8. Accommodation */}
      <AccommodationBrowser retreat={retreat} onBookNow={handleBookNow} />

      {/* 9. Explore the map — interactive map + list of local spots */}
      {landmarks.length > 0 && (
        <DestinationExplorer
          destination={retreat.destination.toLowerCase().replace(/\s+/g, '-')}
          landmarks={landmarks}
          heading={`Explore ${retreat.destination}`}
          subheading="Our favourite spots, tested by sweat and sunsets."
        />
      )}

      <SwoopDivider color="var(--color-surface-warm)" direction="left" />

      {/* 10. How It Works — filing cabinet */}
      <FilingCabinet depositAmount={retreat.depositAmount} />

      {/* ↓ DOUBLE LINES — retreat palette (e.g. Panama: palm green, rust red) */}
      <DoubleLineDivider topColor="var(--retreat-primary)" bottomColor="var(--retreat-accent)" />

      {/* 11. Coaches */}
      <CoachesReveal coaches={retreat.coaches} />

      <SwoopDivider color="var(--color-surface-dark-deep)" direction="right" />

      {/* 12. SALTY Meter */}
      <SaltyMeterVibe retreat={retreat} />

      {/* 13. Parallax video break */}
      <ParallaxVideoBreak videoId="uJ6YccG892U" />

      {/* 14. Testimonials */}
      <TestimonialsVerdict retreat={retreat} />

      {/* 15. Marquee ticker */}
      <MarqueeTicker
        items={['CITY', 'COAST', 'JUNGLE', 'OCEAN', 'COMMUNITY']}
        separator="◆"
        backgroundColor="var(--color-bright-coral)"
        textColor="var(--color-paper-white)"
        speed={35}
      />

      {/* 16. Photo strip */}
      <PhotoStrip photos={retreat.photoStripImages} videoId={retreat.youtubeVideoIds[1]} />

      <SwoopDivider color="var(--color-surface-warm-light)" direction="left" />

      {/* 17. FAQ */}
      <RocaFAQ faqs={retreat.faqs} />

      <SwoopDivider color="var(--color-surface-dark-deep)" direction="right" />

      {/* 18. Final CTA */}
      <FinalCTA retreat={retreat} onBookNow={handleBookNow} />

      {/* Sticky booking bar — appears after scrolling past hero */}
      <StickyBookingBar
        priceFrom={retreat.priceFrom}
        depositAmount={retreat.depositAmount}
        destination={retreat.destination}
        dates={retreat.dates.display}
        onBookNow={handleBookNow}
      />
    </main>
  );
}
