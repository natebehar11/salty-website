'use client';

import Modal from '@/components/shared/Modal';
import type { SaltyLandmark } from './types';
import { CATEGORY_LABELS } from './types';
import LandmarkIcon from './landmark-icons';
import PlacesRating from './PlacesRating';
import DiscoveryTags from './DiscoveryTags';
import VideoCarousel from './VideoCarousel';
import useModalData from './useModalData';

interface LandmarkModalProps {
  landmark: SaltyLandmark | null;
  onClose: () => void;
}

export default function LandmarkModal({ landmark, onClose }: LandmarkModalProps) {
  const { embedsData, placesData, isLoading } = useModalData(landmark);

  const hasEmbeds = landmark && landmark.socialEmbeds.length > 0;
  const hasPhoto = placesData?.photoUrl;

  return (
    <Modal
      isOpen={!!landmark}
      onClose={onClose}
      mobileDrawer
      ariaLabel={landmark ? `${landmark.name} details` : undefined}
    >
      {landmark && (
        <div className="overflow-hidden">
          {/* Video / Photo hero area */}
          {hasEmbeds ? (
            <div className="w-full overflow-hidden" style={{ borderRadius: '24px 24px 0 0' }}>
              <VideoCarousel embeds={embedsData} isLoading={isLoading} />
            </div>
          ) : hasPhoto ? (
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '16 / 9',
                borderRadius: '24px 24px 0 0',
              }}
            >
              <img
                src={placesData.photoUrl!}
                alt={landmark.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-full flex items-center justify-center"
              style={{
                aspectRatio: '16 / 9',
                backgroundColor: 'var(--color-sand)',
                borderRadius: '24px 24px 0 0',
              }}
            >
              <LandmarkIcon
                category={landmark.category}
                size={48}
                color="var(--color-teal)"
              />
            </div>
          )}

          {/* Content */}
          <div className="px-5 pb-6 pt-5">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3
                  className="text-xl font-bold leading-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}
                >
                  {landmark.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--retreat-accent)',
                      color: '#fff',
                    }}
                  >
                    <LandmarkIcon category={landmark.category} size={12} color="#fff" />
                    {CATEGORY_LABELS[landmark.category]}
                  </span>
                </div>
              </div>

              {/* Star rating */}
              {placesData && placesData.rating > 0 && (
                <div className="shrink-0">
                  <PlacesRating rating={placesData.rating} reviewCount={placesData.reviewCount} />
                </div>
              )}
            </div>

            {/* Discovery tags */}
            {landmark.tags.length > 0 && (
              <div className="mt-3">
                <DiscoveryTags tags={landmark.tags} />
              </div>
            )}

            {/* SALTY Note */}
            <div
              className="mt-4 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--color-surface-warm-light)' }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-teal)',
                }}
              >
                &ldquo;{landmark.saltyNote}&rdquo;
              </p>
              <p
                className="text-xs mt-2 font-medium"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-slate-grey)',
                }}
              >
                &mdash; {landmark.saltyNoteAuthor === 'erin' ? 'Erin' : 'Nate'}, SALTY Team
              </p>
            </div>

            {/* Google photo (if video was the hero) */}
            {hasEmbeds && hasPhoto && (
              <div className="mt-4 rounded-xl overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                <img
                  src={placesData!.photoUrl!}
                  alt={`${landmark.name} photo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
