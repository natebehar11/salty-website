'use client';

import { useRef, useEffect, useState } from 'react';
import type { RetreatCard } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Ticket → retreat page mapping ───────────────────────────────────── */

const TICKETS = [
  { src: '/images/tickets/costa-rica.svg', alt: 'SALTY Costa Rica Retreat Ticket', href: '/destinations/costa-rica' },
  { src: '/images/tickets/nicaragua.svg', alt: 'SALTY Nicaragua Retreat Ticket', href: '/destinations/nicaragua' },
  { src: '/images/tickets/morocco.svg', alt: 'SALTY Morocco Retreat Ticket', href: '/destinations/morocco' },
  { src: '/images/tickets/el-salvador.svg', alt: 'SALTY El Salvador Retreat Ticket', href: '/destinations/el-salvador' },
  { src: '/images/tickets/sicily.svg', alt: 'SALTY Sicily Retreat Ticket', href: '/destinations/sicily' },
];

/* ─── Ticker ──────────────────────────────────────────────────────────── */

const TICKET_GAP = 24;

function TicketTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [ticketWidth, setTicketWidth] = useState(320);

  useEffect(() => {
    const update = () => setTicketWidth(Math.min(400, Math.max(260, window.innerWidth - 48)));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalSets = 3;
  const singleSetWidth = TICKETS.length * (ticketWidth + TICKET_GAP);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf: number;
    let pos = 0;
    const speed = 0.5;

    function tick() {
      if (!pausedRef.current) {
        pos -= speed;
        if (pos <= -singleSetWidth) pos += singleSetWidth;
        track!.style.transform = `translate3d(${pos}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [singleSetWidth]);

  const allTickets = Array.from({ length: totalSets }, () => TICKETS).flat();

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      role="region"
      aria-label="Upcoming retreat destinations"
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: TICKET_GAP }}
      >
        {allTickets.map((ticket, i) => (
          <Link
            key={`${ticket.src}-${i}`}
            href={ticket.href}
            className="flex-shrink-0 block transition-transform duration-200 hover:scale-[1.03]"
            style={{ width: ticketWidth }}
          >
            <Image
              src={ticket.src}
              alt={ticket.alt}
              width={1022}
              height={377}
              className="w-full h-auto rounded-lg"
              style={{
                filter: 'drop-shadow(2px 4px 12px rgba(14,58,45,0.12))',
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function UpcomingRetreats({
  retreats: _retreats,
}: {
  retreats: RetreatCard[];
}) {
  return (
    <section
      id="retreats"
      className="relative"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <ScrollReveal>
          <h2
            className="uppercase text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            Upcoming Retreats
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p
            className="mt-4 text-center mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-slate-grey)',
              lineHeight: 1.6,
              maxWidth: 720,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            Every trip has its own personality, but they&apos;re all SALTY.
            Pick based on destinations, itinerary, or just which dates work —
            you won&apos;t be disappointed.
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-12">
        <TicketTicker />
      </div>

      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <ScrollReveal delay={0.15}>
          <div className="mt-10 text-center">
            <Link href="/retreats">
              <Button variant="primary" size="lg">
                See All Trips
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
