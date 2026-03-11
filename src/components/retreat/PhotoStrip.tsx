'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface PhotoStripProps {
  photos: string[];
  videoId?: string;
}

const ROTATIONS = [-5, 3.5, -3, 4.5];
const FRAME_COLORS = [
  'var(--color-coral)',
  'var(--color-golden)',
  'var(--color-teal)',
  'var(--color-coral)',
];

export default function PhotoStrip({ photos, videoId }: PhotoStripProps) {
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  return (
    <section style={{ padding: 'var(--space-section-y) var(--space-section-x)' }}>
      <div
        className="mx-auto grid grid-cols-2 md:grid-cols-4"
        style={{ maxWidth: 'var(--space-container-max)', gap: 'clamp(12px, 2vw, 24px)' }}
      >
        {photos.map((src, i) => {
          const frameColor = FRAME_COLORS[i] || 'var(--color-coral)';
          const rotation = ROTATIONS[i] || 0;
          const displaySrc = videoId && i === 2 ? (videoThumbnail || src) : src;

          return (
            <ScrollReveal key={i} delay={i * 0.08}>
              <motion.div
                className="relative overflow-hidden rounded-xl"
                style={{
                  aspectRatio: '1',
                  border: `5px solid ${frameColor}`,
                }}
                initial={{ rotate: 0 }}
                whileInView={{ rotate: rotation }}
                whileHover={{ scale: 1.06, rotate: 0, boxShadow: '0 12px 40px rgba(14,58,45,0.25)' }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Image
                  src={displaySrc}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
