'use client';

import { motion, useReducedMotion } from 'framer-motion';
import VideoOnScroll from './VideoOnScroll';

interface ExperienceItem {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  accent?: string;
}

interface ExperienceGridProps {
  items: ExperienceItem[];
  className?: string;
}

export default function ExperienceGrid({ items, className = '' }: ExperienceGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      style={{ gap: 'var(--space-grid-gap)' }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          className="group relative flex flex-col overflow-hidden"
          style={{
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card-resting)',
          }}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 18, scale: 0.97 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={shouldReduceMotion ? {} : { y: -3, boxShadow: 'var(--shadow-card-hover)' }}
        >
          {/* Media */}
          <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
            {item.videoUrl ? (
              <VideoOnScroll
                src={item.videoUrl}
                poster={item.imageUrl}
                className="w-full h-full"
                rounded={false}
              />
            ) : item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{ backgroundColor: item.accent || 'var(--color-sand)' }}
              />
            )}

            {/* Gradient overlay at bottom for text readability */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background: 'linear-gradient(to top, rgba(14,58,45,0.7) 0%, transparent 100%)',
              }}
            />

            {/* Title overlaid on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--type-h4)',
                  color: '#F7F4ED',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h4>
            </div>
          </div>

          {/* Description */}
          <div
            className="flex-1 p-5"
            style={{ backgroundColor: 'var(--color-surface-base)' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-base)',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.6,
              }}
            >
              {item.description}
            </p>
          </div>

          {/* Accent bar at bottom */}
          <div
            className="h-1.5 w-full"
            style={{ backgroundColor: item.accent || 'var(--color-coral)' }}
          />
        </motion.div>
      ))}
    </div>
  );
}
