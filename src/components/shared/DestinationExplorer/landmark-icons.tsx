import type { ReactNode } from 'react';
import type { LandmarkCategory } from './types';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

function SurfIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 17c2-2.5 5-4 9-4s7 1.5 9 4" />
      <path d="M5 20c1.5-1.5 4-3 7-3s5.5 1.5 7 3" />
      <path d="M14 4c-.5 3-1 6-1 9" />
      <path d="M14 4l-1 1" />
    </svg>
  );
}

function CafeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 8h1a4 4 0 010 8h-1" />
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
      <path d="M6 2v3M10 2v3M14 2v3" />
    </svg>
  );
}

function BarIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 22h8M12 18v4M4 2h16l-4 8h-8L4 2z" />
      <circle cx="12" cy="14" r="4" />
    </svg>
  );
}

function RestaurantIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2v20M14 2v6a4 4 0 004 4" />
      <path d="M6 2v6M6 8a2 2 0 002 2h0a2 2 0 002-2V2" />
      <path d="M8 10v12" />
    </svg>
  );
}

function GymIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5" />
      <path d="M2 12h4M18 12h4" />
      <path d="M12 2v4M12 18v4" />
    </svg>
  );
}

function HikeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20l5-12 4 6 3-4 4 10H4z" />
      <circle cx="17" cy="5" r="2" />
    </svg>
  );
}

function WaterfallIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 2v5c0 2 2 3 2 5v10" />
      <path d="M12 2v5c0 2 2 3 2 5v10" />
      <path d="M17 2v5c0 2 2 3 2 5v10" />
    </svg>
  );
}

function BeachIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v9" />
      <path d="M12 3c3 2 5 5 5 9M12 3c-3 2-5 5-5 9" />
      <path d="M3 18c2-2 4-3 6-3h6c2 0 4 1 6 3" />
      <path d="M2 21c3-2 6-3 10-3s7 1 10 3" />
    </svg>
  );
}

function MarketIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 7h16l-1 12H5L4 7z" />
      <path d="M8 7V5a4 4 0 018 0v2" />
      <path d="M2 7h20" />
    </svg>
  );
}

function CulturalIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01M15 10h.01" />
    </svg>
  );
}

const ICON_MAP: Record<LandmarkCategory, (props: IconProps) => ReactNode> = {
  surf: SurfIcon,
  cafe: CafeIcon,
  bar: BarIcon,
  restaurant: RestaurantIcon,
  gym: GymIcon,
  hike: HikeIcon,
  waterfall: WaterfallIcon,
  beach: BeachIcon,
  market: MarketIcon,
  cultural: CulturalIcon,
};

export default function LandmarkIcon({
  category,
  ...props
}: IconProps & { category: LandmarkCategory }) {
  const Icon = ICON_MAP[category];
  return <Icon {...props} />;
}
