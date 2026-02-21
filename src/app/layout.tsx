import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'SALTY Retreats | Fitness & Adventure Retreats for Fun-Loving People',
    template: '%s | SALTY Retreats',
  },
  description:
    'Wellness retreats for fun-loving people. Surf, sweat, and explore with SALTY across Costa Rica, Sri Lanka, Panama, Morocco, Sicily, and beyond. 65% of guests come solo.',
  metadataBase: new URL('https://getsaltyretreats.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getsaltyretreats.com',
    siteName: 'SALTY Retreats',
    title: 'SALTY Retreats | Fitness & Adventure Retreats for Fun-Loving People',
    description:
      'Wellness retreats for fun-loving people. Surf, sweat, and explore with SALTY.',
    images: [{ url: '/images/link-previews/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/images/logos/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
