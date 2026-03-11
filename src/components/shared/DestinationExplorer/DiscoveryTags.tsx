'use client';

import type { LandmarkTag } from './types';
import { TAG_LABELS } from './types';

interface DiscoveryTagsProps {
  tags: LandmarkTag[];
}

export default function DiscoveryTags({ tags }: DiscoveryTagsProps) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Discovery tags">
      {tags.map((tag) => (
        <span
          key={tag}
          role="listitem"
          className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: 'var(--color-surface-warm-light)',
            color: 'var(--color-teal)',
          }}
        >
          {TAG_LABELS[tag] ?? tag}
        </span>
      ))}
    </div>
  );
}
