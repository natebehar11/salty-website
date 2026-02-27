'use client';

import { useEffect } from 'react';

/**
 * Initializes Theatre.js Studio in development only.
 * The studio provides a browser-based timeline editor for animation experimentation.
 * Zero bundle impact in production — dynamically imported only when NODE_ENV is development.
 */
export default function TheatreStudioInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    // Theatre.js Studio — visual timeline editor for animation experimentation
    // Only loads in development; zero production bundle impact
    import('@theatre/studio')
      .then((studio) => studio.default.initialize())
      .catch(() => { /* Optional: studio not installed */ });
  }, []);

  return null;
}
