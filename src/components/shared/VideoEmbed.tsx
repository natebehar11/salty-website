'use client';

import { useState } from 'react';

interface VideoEmbedProps {
  videoId: string;
  title?: string;
  thumbnailUrl?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3';
}

export default function VideoEmbed({
  videoId,
  title = 'Video',
  thumbnailUrl,
  className = '',
  aspectRatio = '16/9',
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div className={`relative w-full rounded-2xl overflow-hidden ${className}`} style={{ aspectRatio }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`relative w-full rounded-2xl overflow-hidden group cursor-pointer ${className}`}
      style={{ aspectRatio }}
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnail}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: 'rgba(247,244,237,0.95)', boxShadow: 'var(--shadow-md)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0E3A2D">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
