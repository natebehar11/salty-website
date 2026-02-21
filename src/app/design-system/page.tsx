'use client';

import { useState } from 'react';
import Button from '@/components/shared/Button';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StatusBadge from '@/components/shared/StatusBadge';
import LoadingSkeleton from '@/components/shared/LoadingSkeleton';
import Modal from '@/components/shared/Modal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import StatBar from '@/components/shared/StatBar';
import Tooltip from '@/components/shared/Tooltip';
import PriceDisplay from '@/components/shared/PriceDisplay';
import EmailSignup from '@/components/shared/EmailSignup';
import Carousel from '@/components/shared/Carousel';
import VideoEmbed from '@/components/shared/VideoEmbed';
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';
import DoubleLineDivider from '@/components/layout/DoubleLineDivider';
import InclusionsSection from '@/components/retreat/InclusionsSection';

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const NAV_SECTIONS = [
  { id: 'colors', label: 'Colors' },
  { id: 'surfaces', label: 'Surfaces' },
  { id: 'retreats', label: 'Retreat Palettes' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'components', label: 'Components' },
  { id: 'dividers', label: 'Dividers' },
  { id: 'dark', label: 'Dark Sections' },
  { id: 'motion', label: 'Motion' },
  { id: 'zindex', label: 'Z-Index' },
  { id: 'figma', label: 'Figma-First' },
];

const PRIMARY_COLORS = [
  { name: 'Dark Teal', hex: '#0E3A2D', token: 'primitive/teal', dark: true },
  { name: 'Sand', hex: '#E7D7C0', token: 'primitive/sand', dark: false },
  { name: 'Paper White', hex: '#F7F4ED', token: 'primitive/white', dark: false },
  { name: 'Sky Blue', hex: '#B6D4EA', token: 'primitive/sky', dark: false },
  { name: 'Warm Coral', hex: '#F75A3D', token: 'primitive/coral', dark: false },
  { name: 'Golden Sun', hex: '#FED260', token: 'primitive/golden', dark: false },
];

const SECONDARY_COLORS = [
  { name: 'Palm Green', hex: '#3A6B35', token: 'secondary/palm-green', dark: true },
  { name: 'Aquamarine', hex: '#A4E5D9', token: 'secondary/aquamarine', dark: false },
  { name: 'Rust Red', hex: '#C74235', token: 'secondary/rust-red', dark: true },
  { name: 'Rose Stone', hex: '#CCB4B3', token: 'secondary/rose-stone', dark: false },
  { name: 'Bright Coral', hex: '#FF7E70', token: 'secondary/bright-coral', dark: false },
  { name: 'Slate Grey', hex: '#4A4E58', token: 'secondary/slate-grey', dark: true },
];

const SURFACE_TOKENS = [
  { name: 'Base', hex: '#F7F4ED', token: 'surface/base', dark: false, use: 'Primary page background' },
  { name: 'Warm Light', hex: '#F0E8DB', token: 'surface/warm-light', dark: false, use: 'Subtle warm alternation' },
  { name: 'Warm', hex: '#E7D7C0', token: 'surface/warm', dark: false, use: 'Warm section backgrounds' },
  { name: 'Dark', hex: '#0E3A2D', token: 'surface/dark', dark: true, use: 'Primary dark sections, nav' },
  { name: 'Dark Raised', hex: '#1F4638', token: 'surface/dark-raised', dark: true, use: 'Cards on dark, tooltips' },
  { name: 'Dark Deep', hex: '#0B3126', token: 'surface/dark-deep', dark: true, use: 'Footer, deepest backgrounds' },
];

const RETREAT_PALETTES = [
  { name: 'Sri Lanka', slug: 'Island Tides', primary: '#0E3A2D', secondary: '#FF7E70', accent: '#F75A3D', surface: '#E4E5DD', dark: '#0E3A2D', textOnPrimary: '#F7F4ED' },
  { name: 'Panama', slug: 'City to Sea', primary: '#3A6B35', secondary: '#B6D4EA', accent: '#C74235', surface: '#E7E9DE', dark: '#3A6B35', textOnPrimary: '#F7F4ED' },
  { name: 'Morocco', slug: 'Beyond the Dunes', primary: '#C74235', secondary: '#E7D7C0', accent: '#F75A3D', surface: '#F3E5DE', dark: '#A7372C', textOnPrimary: '#F7F4ED' },
  { name: 'Sicily', slug: 'Endless Summer', primary: '#FED260', secondary: '#B6D4EA', accent: '#C74235', surface: '#F7F1E1', dark: '#A7372C', textOnPrimary: '#0E3A2D' },
  { name: 'El Salvador', slug: 'SALT & HUSTL', primary: '#4A4E58', secondary: '#CCB4B3', accent: '#A4E5D9', surface: '#E9E6E1', dark: '#4A4E58', textOnPrimary: '#F7F4ED' },
  { name: 'Costa Rica', slug: 'Surf Sweat Flow v4', primary: '#3A6B35', secondary: '#0E3A2D', accent: '#B6D4EA', surface: '#E7E9DE', dark: '#0E3A2D', textOnPrimary: '#F7F4ED' },
  { name: 'Nicaragua', slug: 'TBD', primary: '#B6D4EA', secondary: '#3A6B35', accent: '#FED260', surface: '#F1F1EC', dark: '#3A6B35', textOnPrimary: '#0E3A2D' },
];

const TYPE_SCALE = [
  { token: 'type/display', mobile: '48px', desktop: '72px', font: 'TAN Headline', weight: 700, leading: '1.1', sample: 'MAKE FUN OF WELLNESS' },
  { token: 'type/h1', mobile: '36px', desktop: '60px', font: 'TAN Headline', weight: 700, leading: '1.1', sample: 'FITNESS RETREATS' },
  { token: 'type/h2', mobile: '28px', desktop: '48px', font: 'TAN Headline', weight: 700, leading: '1.25', sample: 'UPCOMING RETREATS' },
  { token: 'type/h3', mobile: '22px', desktop: '32px', font: 'TAN Headline', weight: 700, leading: '1.25', sample: 'WHAT MAKES SALTY, SALTY' },
  { token: 'type/h4', mobile: '18px', desktop: '22px', font: 'TAN Headline', weight: 700, leading: '1.25', sample: 'YOUR COACHES' },
  { token: 'type/h5', mobile: '16px', desktop: '18px', font: 'TAN Headline', weight: 700, leading: '1.25', sample: 'QUICK FACTS' },
  { token: 'type/body-lg', mobile: '16px', desktop: '18px', font: 'Roca', weight: 400, leading: '1.625', sample: 'Experience 9 days of surf, sweat, and exploration across two stunning regions of Panama.' },
  { token: 'type/body-base', mobile: '14px', desktop: '16px', font: 'Roca', weight: 400, leading: '1.5', sample: 'Each morning begins with an optional sunrise yoga session overlooking the Pacific.' },
  { token: 'type/body-sm', mobile: '12px', desktop: '14px', font: 'Roca', weight: 400, leading: '1.5', sample: 'Prices shown in USD. Approximate conversions for reference only.' },
  { token: 'type/label', mobile: '12px', desktop: '14px', font: 'Roca', weight: 500, leading: '1.5', sample: 'SELLING FAST' },
  { token: 'type/button', mobile: '16px', desktop: '18px', font: 'Roca', weight: 700, leading: '1.5', sample: 'Book Now' },
  { token: 'type/caption', mobile: '11px', desktop: '12px', font: 'Roca', weight: 400, leading: '1.5', sample: 'SALTY partners with Movement Travel, a TICO-licensed travel agency.' },
];

const SPACING_PRIMITIVES = [
  { token: 'space/1', value: '4px' }, { token: 'space/2', value: '8px' },
  { token: 'space/3', value: '12px' }, { token: 'space/4', value: '16px' },
  { token: 'space/6', value: '24px' }, { token: 'space/8', value: '32px' },
  { token: 'space/12', value: '48px' }, { token: 'space/16', value: '64px' },
  { token: 'space/20', value: '80px' }, { token: 'space/24', value: '96px' },
  { token: 'space/32', value: '128px' },
];

const SAMPLE_FAQ = [
  { question: 'What fitness level do I need?', answer: 'All levels welcome! Our coaches adapt every workout. Whether you train 5x/week or haven\'t moved in months, you\'ll have an incredible time. About 40% of guests describe themselves as "casual" exercisers.' },
  { question: 'Can I come solo?', answer: '65% of our guests come solo. You\'ll meet your new best friends within 24 hours — we guarantee it. Our retreats are specifically designed to make solo travelers feel welcome.' },
  { question: 'What\'s the cancellation policy?', answer: 'Full refund up to 60 days before departure. 50% refund 30-60 days. No refund within 30 days. We strongly recommend travel insurance.' },
];

const Z_INDEX_SCALE = [
  { token: 'z/base', value: 1, use: 'Default content' },
  { token: 'z/card-overlay', value: 50, use: 'SALTY Meter on cards' },
  { token: 'z/sticky', value: 100, use: 'Nav bar' },
  { token: 'z/drawer', value: 200, use: 'Mobile nav tray' },
  { token: 'z/modal', value: 300, use: 'Modals' },
  { token: 'z/toast', value: 400, use: 'Toast notifications' },
];

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function SectionHeader({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div id={id} className="pt-20 pb-8 scroll-mt-16">
      <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
      {subtitle && <p className="mt-2 text-base opacity-70">{subtitle}</p>}
      <div className="mt-4 flex gap-1">
        <div className="h-[6px] w-16 rounded-full" style={{ backgroundColor: '#F75A3D' }} />
        <div className="h-[6px] w-16 rounded-full" style={{ backgroundColor: '#FED260' }} />
      </div>
    </div>
  );
}

function ColorSwatch({ name, hex, token, dark, use }: { name: string; hex: string; token: string; dark: boolean; use?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="text-left group cursor-pointer">
      <div className="h-28 rounded-2xl flex items-end p-4 transition-transform duration-200 group-hover:scale-[1.02]" style={{ backgroundColor: hex, border: hex === '#F7F4ED' || hex === '#F0E8DB' ? '1px solid #E7D7C0' : 'none' }}>
        <span className="font-mono text-xs" style={{ color: dark ? '#F7F4ED' : '#0E3A2D', opacity: 0.8 }}>{copied ? 'Copied!' : hex}</span>
      </div>
      <div className="mt-2.5">
        <p className="font-bold text-sm" style={{ color: '#0E3A2D' }}>{name}</p>
        <p className="font-mono text-xs" style={{ color: '#4A4E58' }}>{token}</p>
        {use && <p className="text-xs mt-0.5" style={{ color: '#4A4E58' }}>{use}</p>}
      </div>
    </button>
  );
}

function TokenBadge({ children }: { children: React.ReactNode }) {
  return <code className="inline-block px-2 py-0.5 rounded-md text-xs font-mono" style={{ backgroundColor: '#F0E8DB', color: '#0E3A2D' }}>{children}</code>;
}

function ComponentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 lg:p-8 rounded-2xl" style={{ backgroundColor: '#F0E8DB' }}>
      <p className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: '#4A4E58' }}>{title}</p>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F4ED' }}>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-20" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#FED260' }}>Design System v1.0 — February 2026</p>
          <h1 className="text-5xl lg:text-7xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)', color: '#F7F4ED' }}>SALTY<br />Design System</h1>
          <p className="mt-6 text-lg max-w-2xl" style={{ color: '#E7D7C0' }}>Tokens, typography, components, and patterns for getsaltyretreats.com + explore.getsaltyretreats.com.</p>
          <div className="mt-6 flex gap-3 text-sm font-mono" style={{ color: '#A4E5D9' }}>
            <span>19 code-first components</span><span style={{ color: '#4A4E58' }}>/</span>
            <span>12 Figma-first (pending)</span><span style={{ color: '#4A4E58' }}>/</span>
            <span>30 total</span>
          </div>
        </div>
      </section>

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b overflow-x-auto" style={{ backgroundColor: '#F7F4EDf0', borderColor: '#E7D7C0', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 flex gap-1 py-3">
          {NAV_SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-200" style={{ color: '#0E3A2D' }}>{s.label}</a>
          ))}
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-20 pb-32">

        {/* ════════ COLORS ════════ */}
        <SectionHeader id="colors" title="Color System" subtitle="12 brand colors: 6 primary + 6 secondary. Click any swatch to copy hex." />
        <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>Primary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {PRIMARY_COLORS.map((c) => <ColorSwatch key={c.token} {...c} />)}
        </div>
        <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>Secondary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {SECONDARY_COLORS.map((c) => <ColorSwatch key={c.token} {...c} />)}
        </div>

        {/* ════════ SURFACES ════════ */}
        <SectionHeader id="surfaces" title="Surface Tokens" subtitle="6 approved backgrounds. No secondary colors as page backgrounds." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {SURFACE_TOKENS.map((s) => <ColorSwatch key={s.token} {...s} />)}
        </div>

        {/* ════════ RETREATS ════════ */}
        <SectionHeader id="retreats" title="Retreat Color System" subtitle="Each retreat has 6 tokens. Surface = primary at 8% opacity over Paper White." />
        <div className="space-y-4 mb-12">
          {RETREAT_PALETTES.map((r) => (
            <div key={r.name} className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <div className="flex items-center gap-4 p-4" style={{ backgroundColor: '#F0E8DB' }}>
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: r.primary }} />
                <div><p className="font-bold text-sm">{r.name}</p><p className="text-xs" style={{ color: '#4A4E58' }}>{r.slug}</p></div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6">
                {[{ label: 'Primary', color: r.primary }, { label: 'Secondary', color: r.secondary }, { label: 'Accent', color: r.accent }, { label: 'Surface', color: r.surface }, { label: 'Dark', color: r.dark }, { label: 'Text', color: r.textOnPrimary }].map((t) => (
                  <div key={t.label} className="p-3 flex flex-col items-center gap-1.5" style={{ backgroundColor: '#F7F4ED' }}>
                    <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: t.color, border: t.color.toLowerCase() > '#e' ? '1px solid #E7D7C0' : 'none' }} />
                    <p className="text-[10px] text-center" style={{ color: '#4A4E58' }}>{t.label}</p>
                    <p className="text-[10px] font-mono">{t.color}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ════════ TYPOGRAPHY ════════ */}
        <SectionHeader id="typography" title="Typography" subtitle="TAN Headline for ALL headings (uppercase). Roca for ALL body/UI. No exceptions." />
        <div className="space-y-0 mb-12">
          {TYPE_SCALE.map((t) => (
            <div key={t.token} className="flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-8 py-5 border-b" style={{ borderColor: '#E7D7C0' }}>
              <div className="shrink-0 w-48">
                <TokenBadge>{t.token}</TokenBadge>
                <p className="text-xs mt-1" style={{ color: '#4A4E58' }}>{t.mobile} / {t.desktop}</p>
              </div>
              <p className="flex-1" style={{ fontFamily: t.font === 'TAN Headline' ? 'var(--font-display)' : 'var(--font-body)', fontSize: t.desktop, fontWeight: t.weight, lineHeight: t.leading, textTransform: t.font === 'TAN Headline' ? 'uppercase' : 'none' }}>{t.sample}</p>
            </div>
          ))}
        </div>

        {/* ════════ SPACING ════════ */}
        <SectionHeader id="spacing" title="Spacing" subtitle="4px base unit. Mobile-first responsive." />
        <div className="space-y-2 mb-12">
          {SPACING_PRIMITIVES.map((s) => (
            <div key={s.token} className="flex items-center gap-4">
              <div className="w-24 shrink-0"><TokenBadge>{s.token}</TokenBadge></div>
              <div className="h-6 rounded" style={{ width: s.value, backgroundColor: '#F75A3D', minWidth: '2px' }} />
              <span className="text-xs font-mono" style={{ color: '#4A4E58' }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* ════════ COMPONENTS ════════ */}
        <SectionHeader id="components" title="Components" subtitle="19 code-first components built. 12 Figma-first components pending design." />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ComponentCard title="Button — 3 Variants">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Book Now</Button>
                <Button variant="secondary">Ask a Question</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="retreat" retreatAccent="#C74235" invertText>Retreat (Rust Red)</Button>
                <Button variant="retreat" retreatAccent="#B6D4EA">Retreat (Sky)</Button>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="StatusBadge — 4 Variants">
            <div className="flex flex-wrap gap-3">
              <StatusBadge variant="selling-fast" />
              <StatusBadge variant="sold-out" />
              <StatusBadge variant="new-trip" />
              <StatusBadge variant="early-bird" originalPrice="$2,499" />
            </div>
          </ComponentCard>

          <ComponentCard title="LoadingSkeleton">
            <div className="space-y-3">
              <LoadingSkeleton height="160px" rounded="lg" />
              <LoadingSkeleton height="20px" width="60%" rounded="md" />
              <LoadingSkeleton height="14px" width="40%" rounded="md" />
            </div>
          </ComponentCard>

          <ComponentCard title="Tooltip">
            <div className="flex gap-6 items-center">
              <Tooltip content="Price for 1 guest in a Standard Double">
                <span className="text-lg font-bold underline decoration-dotted cursor-help" style={{ color: '#0E3A2D' }}>$2,399 USD</span>
              </Tooltip>
              <Tooltip content="Includes breakfast and dinner" position="bottom">
                <span className="text-sm underline decoration-dotted cursor-help" style={{ color: '#4A4E58' }}>Meals info</span>
              </Tooltip>
            </div>
          </ComponentCard>

          <ComponentCard title="PriceDisplay — Card + Detail + Currency Toggle">
            <div className="space-y-4">
              <div>
                <p className="text-xs mb-1" style={{ color: '#4A4E58' }}>Card format:</p>
                <PriceDisplay priceUSD={2399} totalDays={9} format="card" />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: '#4A4E58' }}>Detail format with currency toggle:</p>
                <PriceDisplay priceUSD={2399} format="detail" roomType="Standard Double" showCurrencyToggle />
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="StatBar">
            <StatBar stats={[
              { value: '200+', label: 'Happy Guests' },
              { value: '4.9', label: 'Average Rating' },
              { value: '7', label: 'Countries' },
              { value: '65%', label: 'Come Solo' },
            ]} />
          </ComponentCard>
        </div>

        <ComponentCard title="ScrollReveal — Scroll down to trigger">
          <div className="space-y-4">
            <ScrollReveal><p className="text-lg font-bold" style={{ color: '#0E3A2D' }}>This text fades in on viewport entry.</p></ScrollReveal>
            <ScrollReveal delay={0.1}><p className="text-sm" style={{ color: '#4A4E58' }}>Staggered with 100ms delay. translateY(18px) + opacity. Fires once.</p></ScrollReveal>
            <ScrollReveal delay={0.2}><p className="text-sm" style={{ color: '#4A4E58' }}>Third item with 200ms delay. Respects prefers-reduced-motion.</p></ScrollReveal>
          </div>
        </ComponentCard>

        <div className="mt-6">
          <ComponentCard title="Modal">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <p className="text-xs mt-2" style={{ color: '#4A4E58' }}>Dark backdrop, X close, click-outside dismiss, mobile drawer animation.</p>
          </ComponentCard>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="p-8">
              <h3 className="text-2xl font-bold uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>Day 3 — Surf Day</h3>
              <p className="text-sm mb-4" style={{ color: '#4A4E58' }}>
                Start with sunrise yoga overlooking the Pacific, then hit the waves with our surf instructors.
                Afternoon free time for exploring the town or relaxing by the pool.
              </p>
              <div className="flex gap-4 text-xs" style={{ color: '#4A4E58' }}>
                <span>Accommodation: Selina Santa Catalina</span>
                <span>Meals: Breakfast, Dinner</span>
              </div>
            </div>
          </Modal>
        </div>

        <div className="mt-6">
          <ComponentCard title="FAQAccordion — with FAQPage schema">
            <FAQAccordion items={SAMPLE_FAQ} />
          </ComponentCard>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <ComponentCard title="EmailSignup — Light Surface">
            <EmailSignup />
          </ComponentCard>
          <div className="p-6 lg:p-8 rounded-2xl" style={{ backgroundColor: '#0E3A2D' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: '#A4E5D9' }}>EmailSignup — Dark Surface</p>
            <EmailSignup onDark />
          </div>
        </div>

        <div className="mt-6">
          <ComponentCard title="Carousel — Arrows + Dots + Snap">
            <Carousel>
              {['Panama', 'Morocco', 'Sicily', 'El Salvador', 'Costa Rica'].map((dest) => (
                <div key={dest} className="w-64 h-40 rounded-xl flex items-center justify-center text-lg font-bold uppercase" style={{ fontFamily: 'var(--font-display)', backgroundColor: '#E7D7C0', color: '#0E3A2D' }}>
                  {dest}
                </div>
              ))}
            </Carousel>
          </ComponentCard>
        </div>

        <div className="mt-6">
          <ComponentCard title="VideoEmbed — Click-to-play (lazy loaded)">
            <div className="max-w-md">
              <VideoEmbed videoId="dQw4w9WgXcQ" title="SALTY Retreats Highlight" />
            </div>
            <p className="text-xs mt-2" style={{ color: '#4A4E58' }}>No iframe until user clicks. Uses youtube-nocookie.com for privacy.</p>
          </ComponentCard>
        </div>

        <div className="mt-6">
          <ComponentCard title="InclusionsSection — Expandable two-column">
            <InclusionsSection
              included={['All accommodation (8 nights)', 'Daily group workouts', 'Surf lessons (2x)', 'Yoga sessions', 'All group activities', 'Airport transfers', 'Welcome dinner + farewell dinner', 'SALTY welcome pack']}
              notIncluded={['International flights', 'Travel insurance', 'Personal expenses', 'Lunch and some dinners', 'Alcohol']}
            />
          </ComponentCard>
        </div>

        {/* ════════ DIVIDERS ════════ */}
        <SectionHeader id="dividers" title="Dividers" subtitle="Swoop (major transitions), Wave (subtle shifts), Double Lines (accent punctuation)." />

        <div className="space-y-8 mb-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#4A4E58' }}>SwoopDivider — Left</p>
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F0E8DB' }}>
              <div className="h-16" style={{ backgroundColor: '#0E3A2D' }} />
              <SwoopDivider color="#0E3A2D" direction="left" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#4A4E58' }}>SwoopDivider — Right (Retreat color)</p>
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F0E8DB' }}>
              <div className="h-16" style={{ backgroundColor: '#3A6B35' }} />
              <SwoopDivider color="#3A6B35" direction="right" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#4A4E58' }}>WaveDivider</p>
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F7F4ED' }}>
              <WaveDivider color="#E7D7C0" />
              <div className="h-16" style={{ backgroundColor: '#E7D7C0' }} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#4A4E58' }}>DoubleLineDivider</p>
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#F0E8DB' }}>
              <DoubleLineDivider topColor="#F75A3D" bottomColor="#FED260" />
              <DoubleLineDivider topColor="#B6D4EA" bottomColor="#0E3A2D" />
            </div>
          </div>
        </div>

        {/* ════════ DARK SECTIONS ════════ */}
        <SectionHeader id="dark" title="Dark Sections" subtitle="Light-first brand. Dark sections for deliberate emphasis." />
        <div className="rounded-2xl overflow-hidden mb-12">
          <div className="p-8 lg:p-12" style={{ backgroundColor: '#0E3A2D' }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#FED260' }}>surface/dark</p>
            <h3 className="text-3xl uppercase mb-4" style={{ fontFamily: 'var(--font-display)', color: '#F7F4ED' }}>WHAT PEOPLE SAY</h3>
            <p className="text-base mb-6" style={{ color: '#E7D7C0' }}>&ldquo;Best week of my life. I came solo, left with 30 new friends.&rdquo;</p>
            <Button>See All Reviews</Button>
          </div>
          <div className="p-6" style={{ backgroundColor: '#1F4638' }}>
            <p className="text-xs font-mono" style={{ color: '#A4E5D9' }}>surface/dark-raised — cards on dark, tooltips</p>
          </div>
          <div className="p-6" style={{ backgroundColor: '#0B3126' }}>
            <p className="text-xs font-mono" style={{ color: '#A4E5D9' }}>surface/dark-deep — footer, deepest bg</p>
          </div>
        </div>

        {/* ════════ MOTION ════════ */}
        <SectionHeader id="motion" title="Motion" subtitle="No bounce. No overshoot. prefers-reduced-motion fallback on all." />
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <ComponentCard title="Duration Tokens">
            {[['instant', '100ms'], ['fast', '200ms'], ['base', '250ms'], ['moderate', '300ms'], ['slow', '400ms']].map(([name, val]) => (
              <div key={name} className="flex items-center gap-4 mb-2">
                <TokenBadge>{name}</TokenBadge>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E7D7C0' }}>
                  <div className="h-full rounded-full" style={{ backgroundColor: '#F75A3D', width: `${(parseInt(val) / 400) * 100}%` }} />
                </div>
                <span className="text-xs font-mono w-12 text-right" style={{ color: '#4A4E58' }}>{val}</span>
              </div>
            ))}
          </ComponentCard>
          <ComponentCard title="Easing Curves">
            {[['Default', 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'], ['Enter', 'cubic-bezier(0.0, 0.0, 0.2, 1.0)'], ['Exit', 'cubic-bezier(0.4, 0.0, 1.0, 1.0)']].map(([name, val]) => (
              <div key={name} className="p-3 rounded-xl mb-2" style={{ backgroundColor: '#F7F4ED' }}>
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs font-mono" style={{ color: '#4A4E58' }}>{val}</p>
              </div>
            ))}
          </ComponentCard>
        </div>

        {/* ════════ Z-INDEX ════════ */}
        <SectionHeader id="zindex" title="Z-Index Scale" />
        <div className="relative h-80 mb-12 rounded-2xl overflow-hidden" style={{ backgroundColor: '#F0E8DB' }}>
          {Z_INDEX_SCALE.map((z, i) => (
            <div key={z.token} className="absolute left-0 right-0 flex items-center justify-between px-6" style={{ bottom: `${i * 48 + 16}px`, height: '40px', backgroundColor: `rgba(14,58,45,${0.15 + i * 0.15})`, borderRadius: '8px', marginLeft: `${i * 16}px`, marginRight: `${i * 16}px` }}>
              <span className="text-xs font-bold" style={{ color: i > 2 ? '#F7F4ED' : '#0E3A2D' }}>{z.use}</span>
              <span className="text-xs font-mono" style={{ color: i > 2 ? '#A4E5D9' : '#4A4E58' }}>z-{z.value}</span>
            </div>
          ))}
        </div>

        {/* ════════ FIGMA-FIRST ════════ */}
        <SectionHeader id="figma" title="Figma-First Components" subtitle="12 components pending design. Design one template in Figma, share the URL, and it gets built + all variants generated." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[
            { name: 'RetreatCard', tier: 2, status: 'Design needed' },
            { name: 'CoachCard', tier: 2, status: 'Design needed' },
            { name: 'TestimonialCard', tier: 2, status: 'Design needed' },
            { name: 'Navbar', tier: 1, status: 'Design needed' },
            { name: 'Footer', tier: 1, status: 'Design needed' },
            { name: 'RetreatHero', tier: 3, status: 'Design needed' },
            { name: 'RetreatTicket', tier: 3, status: 'Design needed (per-retreat SVG)' },
            { name: 'HomepageHero', tier: 3, status: 'Design needed' },
            { name: 'AccommodationSection', tier: 3, status: 'Design needed' },
            { name: 'ItineraryCard', tier: 3, status: 'Design needed' },
            { name: 'SaltyMeter', tier: 3, status: 'Design needed' },
          ].map((c) => (
            <div key={c.name} className="p-4 rounded-xl border-2 border-dashed flex flex-col gap-2" style={{ borderColor: '#E7D7C0' }}>
              <p className="font-bold text-sm" style={{ color: '#0E3A2D' }}>{c.name}</p>
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: '#FED260', color: '#0E3A2D' }}>Tier {c.tier}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: '#B6D4EA', color: '#0E3A2D' }}>Figma-first</span>
              </div>
              <p className="text-xs" style={{ color: '#4A4E58' }}>{c.status}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t text-center" style={{ borderColor: '#E7D7C0' }}>
          <p className="text-sm" style={{ color: '#4A4E58' }}>Source: DESIGN-SYSTEM-RULES.md + SALTY-INFORMATION-ARCHITECTURE.md</p>
          <p className="text-xs mt-1" style={{ color: '#4A4E58' }}>This is a living reference. Components are added as they are built.</p>
        </div>
      </div>
    </div>
  );
}
