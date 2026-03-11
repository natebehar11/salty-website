'use client';

import { useRef, useEffect } from 'react';
import type { OEmbedData } from './types';

interface SocialEmbedProps {
  data: OEmbedData;
}

/**
 * Renders sanitized oEmbed HTML and re-initializes platform embed scripts.
 * The oEmbed proxy already strips malicious scripts and re-adds only the
 * platform's own embed script, so dangerouslySetInnerHTML is safe here.
 */
export default function SocialEmbed({ data }: SocialEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data.html) return;

    // After HTML is in the DOM, trigger platform script processing
    const timer = setTimeout(() => {
      if (data.platform === 'instagram') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const instgrm = (window as any).instgrm;
        if (instgrm?.Embeds?.process) {
          instgrm.Embeds.process();
        }
      } else if (data.platform === 'tiktok') {
        // TikTok's embed.js auto-processes on load; re-trigger by re-appending
        const existing = document.querySelector('script[src*="tiktok.com/embed.js"]');
        if (existing) {
          const script = document.createElement('script');
          script.src = 'https://www.tiktok.com/embed.js';
          script.async = true;
          document.body.appendChild(script);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [data.html, data.platform]);

  return (
    <div className="w-full" style={{ aspectRatio: '9 / 16', maxHeight: '70vh' }}>
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </div>
  );
}

/** Loading skeleton for social embeds */
export function SocialEmbedSkeleton() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        aspectRatio: '9 / 16',
        maxHeight: '70vh',
        backgroundColor: 'var(--color-surface-warm-light)',
        borderRadius: 'var(--radius-card)',
      }}
    >
      <div className="flex flex-col items-center gap-3" style={{ color: 'var(--color-slate-grey)' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
          <circle cx="16" cy="16" r="12" />
          <polygon points="14,11 22,16 14,21" fill="currentColor" opacity="0.4" />
        </svg>
        <span className="text-xs" style={{ fontFamily: 'var(--font-body)', opacity: 0.5 }}>
          Loading video...
        </span>
      </div>
    </div>
  );
}
