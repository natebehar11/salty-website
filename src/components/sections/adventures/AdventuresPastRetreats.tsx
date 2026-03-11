'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';

/* ─── Past Retreat Video Frame Colors ────────────────────────────────── */

const FRAME_COLORS = [
  'var(--color-palm-green)',
  'var(--color-coral)',
  'var(--color-golden)',
  'var(--color-sky)',
  'var(--color-rust-red)',
  'var(--color-teal)',
];

/* ─── Fallback Past Retreats ─────────────────────────────────────────── */

const FALLBACK_PAST: {
  name: string;
  year: number;
  videoId?: string;
  imageSrc?: string;
}[] = [
  {
    name: 'Sicily',
    year: 2024,
    videoId: 'dQw4w9WgXcQ', // placeholder — replace with real YT IDs
    imageSrc: '/images/retreat/nate-water.png',
  },
  {
    name: 'Troncones',
    year: 2024,
    videoId: 'dQw4w9WgXcQ',
    imageSrc: '/images/retreat/hero-champagne.png',
  },
  {
    name: 'Costa Rica',
    year: 2025,
    videoId: 'dQw4w9WgXcQ',
    imageSrc: '/images/retreat/surf-lesson.png',
  },
];

/* ─── Section ────────────────────────────────────────────────────────── */

export default function AdventuresPastRetreats() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--color-slate-grey)',
        padding: 'var(--space-section-y) var(--space-section-x)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--space-container-max)' }}>
        {/* Section Heading */}
        <ScrollReveal>
          <h2
            className="text-center uppercase mb-12"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-paper-white)',
              lineHeight: 1,
            }}
          >
            PAST RETREATS
          </h2>
        </ScrollReveal>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {FALLBACK_PAST.map((retreat, i) => {
            const frameColor = FRAME_COLORS[i % FRAME_COLORS.length];

            return (
              <ScrollReveal key={retreat.name} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-4">
                  {/* Retreat Name + Year */}
                  <h3
                    className="uppercase text-center"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      color: frameColor,
                      lineHeight: 1.1,
                    }}
                  >
                    {retreat.name}, {retreat.year}
                  </h3>

                  {/* Video / Image Frame */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: '16 / 9',
                      borderRadius: 'var(--radius-card)',
                      border: `6px solid ${frameColor}`,
                    }}
                  >
                    {retreat.imageSrc ? (
                      <img
                        src={retreat.imageSrc}
                        alt={`${retreat.name} ${retreat.year} retreat highlights`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-surface-dark-raised)' }}
                      >
                        <span
                          className="opacity-30"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '24px',
                            color: 'var(--color-paper-white)',
                          }}
                        >
                          SALTY
                        </span>
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    {retreat.videoId && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                          style={{
                            backgroundColor: 'rgba(14, 58, 45, 0.75)',
                            backdropFilter: 'blur(4px)',
                            transition: 'transform 200ms ease, background-color 200ms ease',
                          }}
                          role="button"
                          aria-label={`Play ${retreat.name} ${retreat.year} highlight video`}
                          tabIndex={0}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5v14l11-7L8 5z" fill="var(--color-paper-white)" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
