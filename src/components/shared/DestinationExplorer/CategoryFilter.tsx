'use client';

import { useRef, useCallback } from 'react';
import { CATEGORY_FILTERS } from './types';

interface CategoryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CategoryFilter({ activeFilter, onFilterChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((value: string) => {
    onFilterChange(value);
  }, [onFilterChange]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide"
      style={{ WebkitOverflowScrolling: 'touch' }}
      role="tablist"
      aria-label="Filter landmarks by category"
    >
      {CATEGORY_FILTERS.map(({ value, label }) => {
        const isActive = activeFilter === value;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            className="shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: isActive ? 'var(--retreat-accent)' : 'var(--color-surface-warm-light)',
              color: isActive ? '#fff' : 'var(--color-teal)',
              minHeight: 44,
            }}
            onClick={() => handleClick(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
