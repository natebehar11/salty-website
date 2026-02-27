'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface StatBadge {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface HeroStatsBadgesProps {
  badges: StatBadge[];
  className?: string;
  onDark?: boolean;
}

const defaultBadgeIcons = {
  duration: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.5V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  dates: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="3.5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8H17.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 2V5M13.5 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  price: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5V15M7 8.5C7 7.12 8.34 6 10 6C11.66 6 13 7.12 13 8.5C13 9.88 11.66 11 10 11C8.34 11 7 12.12 7 13.5C7 14.88 8.34 16 10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  group: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 17C1 14.24 3.69 12 7 12C8.2 12 9.3 12.3 10.2 12.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 16.5C11 14.57 12.34 13 14 13C15.66 13 17 14.57 17 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export { defaultBadgeIcons };

export default function HeroStatsBadges({ badges, className = '', onDark = false }: HeroStatsBadgesProps) {
  const shouldReduceMotion = useReducedMotion();

  const bgColor = onDark ? 'rgba(247,244,237,0.1)' : 'rgba(14,58,45,0.06)';
  const borderColor = onDark ? 'rgba(247,244,237,0.15)' : 'rgba(14,58,45,0.1)';
  const labelColor = onDark ? 'rgba(231,215,192,0.7)' : 'var(--color-slate-grey)';
  const valueColor = onDark ? 'var(--color-paper-white)' : 'var(--color-teal)';
  const iconColor = onDark ? 'var(--color-golden)' : 'var(--color-coral)';

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
          style={{
            backgroundColor: bgColor,
            border: `1.5px solid ${borderColor}`,
            backdropFilter: onDark ? 'blur(8px)' : undefined,
          }}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.35,
            delay: shouldReduceMotion ? 0 : i * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <span style={{ color: iconColor }} className="shrink-0">
            {badge.icon}
          </span>
          <div className="flex flex-col">
            <span
              className="text-xs uppercase leading-none"
              style={{ fontFamily: 'var(--font-display)', color: labelColor, letterSpacing: '0.05em' }}
            >
              {badge.label}
            </span>
            <span
              className="text-sm font-bold leading-tight mt-0.5"
              style={{ fontFamily: 'var(--font-body)', color: valueColor }}
            >
              {badge.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
