'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SaltyLandmark, PlacesData, OEmbedData } from './types';

interface ModalData {
  embedsData: (OEmbedData | null)[];
  placesData: PlacesData | null;
  isLoading: boolean;
}

/**
 * Lazily fetches oEmbed and Places data when a landmark modal opens.
 * Caches results in-memory so re-opening the same landmark is instant.
 */
export default function useModalData(landmark: SaltyLandmark | null): ModalData {
  const [embedsData, setEmbedsData] = useState<(OEmbedData | null)[]>([]);
  const [placesData, setPlacesData] = useState<PlacesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // In-memory cache keyed by landmark ID
  const cacheRef = useRef<Map<string, { embeds: (OEmbedData | null)[]; places: PlacesData | null }>>(new Map());

  const fetchData = useCallback(async (lm: SaltyLandmark) => {
    // Check cache first
    const cached = cacheRef.current.get(lm._id);
    if (cached) {
      setEmbedsData(cached.embeds);
      setPlacesData(cached.places);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Fetch oEmbed data for all social embeds in parallel
    const embedPromises = lm.socialEmbeds.map(async (embed) => {
      try {
        const res = await fetch(`/api/oembed?url=${encodeURIComponent(embed.url)}`);
        if (!res.ok) return null;
        return (await res.json()) as OEmbedData;
      } catch {
        return null;
      }
    });

    // Fetch Places data if googlePlaceId exists
    const placesPromise = lm.googlePlaceId
      ? fetch(`/api/places/${lm.googlePlaceId}`)
          .then(async (res) => {
            if (!res.ok) return null;
            return (await res.json()) as PlacesData;
          })
          .catch(() => null)
      : Promise.resolve(null);

    const [embeds, places] = await Promise.all([
      Promise.all(embedPromises),
      placesPromise,
    ]);

    // Cache the results
    cacheRef.current.set(lm._id, { embeds, places });

    setEmbedsData(embeds);
    setPlacesData(places);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!landmark) {
      setEmbedsData([]);
      setPlacesData(null);
      setIsLoading(false);
      return;
    }

    fetchData(landmark);
  }, [landmark, fetchData]);

  return { embedsData, placesData, isLoading };
}
