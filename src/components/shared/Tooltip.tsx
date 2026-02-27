'use client';

import { useState, useRef, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom';
}

export default function Tooltip({
  content,
  children,
  className = '',
  position = 'top',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 200);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const toggleTouch = () => setVisible((v) => !v);

  const positionClasses = position === 'top'
    ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
    : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onTouchStart={toggleTouch}
    >
      {children}
      {visible && (
        <span
          className={`absolute ${positionClasses} z-50 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none`}
          style={{
            backgroundColor: '#1F4638',
            color: '#F7F4ED',
            boxShadow: '0 4px 12px rgba(30,25,20,0.08), 0 2px 4px rgba(30,25,20,0.04)',
          }}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}
