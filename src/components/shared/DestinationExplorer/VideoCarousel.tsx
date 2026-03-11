'use client';

import Carousel from '@/components/shared/Carousel';
import SocialEmbed, { SocialEmbedSkeleton } from './SocialEmbed';
import type { OEmbedData } from './types';

interface VideoCarouselProps {
  embeds: (OEmbedData | null)[];
  isLoading: boolean;
}

export default function VideoCarousel({ embeds, isLoading }: VideoCarouselProps) {
  if (isLoading) {
    return <SocialEmbedSkeleton />;
  }

  const validEmbeds = embeds.filter((e): e is OEmbedData => e !== null && !!e.html);

  if (validEmbeds.length === 0) {
    return null;
  }

  if (validEmbeds.length === 1) {
    return <SocialEmbed data={validEmbeds[0]} />;
  }

  return (
    <Carousel
      fullWidthSlides
      showDots
      showArrows={false}
      dotsOnDesktop
      ariaLabel="Landmark videos"
    >
      {validEmbeds.map((embed, i) => (
        <SocialEmbed key={i} data={embed} />
      ))}
    </Carousel>
  );
}
