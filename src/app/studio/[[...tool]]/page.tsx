'use client';

import dynamic from 'next/dynamic';

const StudioPage = dynamic(() => import('./studio-client'), { ssr: false });

export default function Page() {
  return <StudioPage />;
}
