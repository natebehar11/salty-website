'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import Modal from '@/components/shared/Modal';
import { theme } from './retreat-theme';
import type { RetreatData } from './retreat-data';


/* ─── VideoTestCard ──────────────────────────────────────────────────────── */

function VideoTestCard({
  video,
  index,
  sectionInView,
  onPlay,
}: {
  video: { id: string; name: string; label: string };
  index: number;
  sectionInView: boolean;
  onPlay: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
    >
      <div
        onClick={() => onPlay(video.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`Play ${video.name} testimonial video`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onPlay(video.id);
        }}
        style={{
          position: 'relative',
          aspectRatio: '9/16',
          borderRadius: 20,
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundColor: theme.dark,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'scale(1.04)' : 'scale(1)',
          boxShadow: isHovered
            ? '0 28px 64px rgba(14,58,45,0.38)'
            : '0 8px 28px rgba(14,58,45,0.16)',
        }}
      >
        <Image
          src={thumbUrl}
          alt={`${video.name} testimonial`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(11,49,38,0.92) 0%, rgba(11,49,38,0.25) 45%, transparent 68%)',
          }}
        />

        {/* Play button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: isHovered ? 'scale(1.16)' : 'scale(1)',
              opacity: isHovered ? 1 : 0.78,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 4.5L17.5 10L7 15.5V4.5Z" fill={theme.primary} />
            </svg>
          </div>
        </div>

        {/* Name + retreat label */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              textTransform: 'uppercase',
              color: 'var(--color-paper-white)',
              lineHeight: 1.1,
              marginBottom: 3,
            }}
          >
            {video.name}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              color: theme.secondary,
              letterSpacing: '0.08em',
            }}
          >
            {video.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

interface TestimonialsVerdictProps {
  retreat: RetreatData;
}

export default function TestimonialsVerdict({
  retreat,
}: TestimonialsVerdictProps) {
  const videoTestimonials = retreat.videoTestimonials;
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'var(--space-section-y) var(--space-section-x)',
        backgroundColor: 'var(--color-surface-base)',
      }}
    >
      {/* Full-screen video overlay */}
      <Modal isOpen={!!activeVideoId} onClose={() => setActiveVideoId(null)} ariaLabel="Testimonial video" mobileDrawer>
        <div
          style={{
            position: 'relative',
            width: 'min(92vw, 380px)',
            aspectRatio: '9/16',
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#000',
            margin: '0 auto',
          }}
        >
          {activeVideoId && (
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&playsinline=1&controls=1&mute=0`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title="Testimonial video"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          )}
        </div>
      </Modal>

      <div style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: theme.accent,
              marginBottom: 10,
            }}
          >
            Real People. Real Retreats. No Script.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              textTransform: 'uppercase',
              color: theme.primary,
              lineHeight: 0.95,
            }}
          >
            The Verdict
          </motion.h2>
        </div>

        {/* 4 video shorts cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
            marginBottom: 64,
          }}
          className="max-md:grid-cols-2"
        >
          {videoTestimonials.map((v, i) => (
            <VideoTestCard
              key={v.id}
              video={v}
              index={i}
              sectionInView={sectionInView}
              onPlay={setActiveVideoId}
            />
          ))}
        </div>

        {/* Written testimonials — editorial */}
        <div style={{ borderTop: '1px solid rgba(14,58,45,0.1)' }}>
          {retreat.testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.15 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-8"
              style={{
                padding: '32px 0',
                borderBottom: '1px solid rgba(14,58,45,0.08)',
              }}
            >
              <blockquote
                className="sm:max-w-[72%]"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
                  fontStyle: 'italic',
                  color: theme.primary,
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="sm:text-right" style={{ flexShrink: 0, paddingTop: 4 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: theme.primary,
                    marginBottom: 2,
                  }}
                >
                  {t.guestName}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: theme.accent }}>
                  {t.retreatLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
