import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SALTY Retreats | Fitness Retreats for Fun-Loving People",
  description:
    "Join group fitness retreats that blend surf, yoga, and adventure across 7 countries. Trips for 20-35 guests who want to sweat, explore, and actually have fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
