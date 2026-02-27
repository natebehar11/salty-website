import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

const DEFAULT_DESCRIPTION =
  'Join group fitness retreats that blend surf, yoga, and adventure across 7 countries. Trips for 20-35 guests who want to sweat, explore, and actually have fun.';

export const metadata: Metadata = {
  title: {
    default: 'SALTY Retreats | Fitness Retreats for Fun-Loving People',
    template: '%s | SALTY Retreats',
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL('https://getsaltyretreats.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SALTY Retreats',
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const STATIC_RETREATS = [
  { name: 'Panama', officialName: 'City to Sea', slug: 'panama-fitness-retreat' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/TanHeadline/TANHEADLINE-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roca/Roca Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roca/Roca Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: 'var(--font-body)',
          backgroundColor: 'var(--color-surface-base)',
          color: 'var(--color-teal)',
        }}
      >
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Navbar retreats={STATIC_RETREATS} />
        <main className="min-h-screen">{children}</main>
        <Footer
          retreats={STATIC_RETREATS.map((r) => ({ name: r.name, slug: r.slug }))}
          instagram="https://www.instagram.com/getsaltyretreats"
          tiktok="https://www.tiktok.com/@getsaltyretreats"
        />
        <WhatsAppButton />
      </body>
    </html>
  );
}
