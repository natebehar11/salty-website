'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[SALTY] Page error:', error);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center px-6 text-center"
      style={{ minHeight: '60vh' }}
    >
      <p
        className="uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '48px',
          color: '#F75A3D',
          lineHeight: 1,
        }}
      >
        Oops
      </p>
      <h1
        className="mt-4 uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: '#0E3A2D',
        }}
      >
        Something Went Wrong
      </h1>
      <p
        className="mt-3 max-w-md"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: '#4A4E58',
          lineHeight: 1.6,
        }}
      >
        We hit a snag. Try refreshing, or head back to the homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: '#F75A3D',
            color: '#0E3A2D',
            padding: '12px 32px',
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
          }}
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full font-bold transition-all duration-200"
          style={{
            backgroundColor: '#F7F4ED',
            color: '#0E3A2D',
            border: '1px solid #E7D7C0',
            padding: '12px 32px',
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
