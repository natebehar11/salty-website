import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center px-6 text-center"
      style={{ minHeight: '60vh' }}
    >
      <p
        className="uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '80px',
          color: '#F75A3D',
          lineHeight: 1,
        }}
      >
        404
      </p>
      <h1
        className="mt-4 uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: '#0E3A2D',
        }}
      >
        Page Not Found
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
        Looks like this page went on a retreat of its own. Let&apos;s get you
        back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full font-bold transition-all duration-200"
        style={{
          backgroundColor: '#F75A3D',
          color: '#0E3A2D',
          padding: '12px 32px',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
