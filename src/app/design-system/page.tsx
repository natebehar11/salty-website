'use client';

import { useState } from 'react';

/* ═══════════════════════════════════════════
   DATA — All design tokens as structured data
   ═══════════════════════════════════════════ */

const NAV_SECTIONS = [
  { id: 'colors', label: 'Colors' },
  { id: 'surfaces', label: 'Surfaces' },
  { id: 'retreats', label: 'Retreat Palettes' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'radius', label: 'Radius' },
  { id: 'shadows', label: 'Shadows' },
  { id: 'forms', label: 'Forms' },
  { id: 'badges', label: 'Badges' },
  { id: 'dark', label: 'Dark Sections' },
  { id: 'dividers', label: 'Dividers' },
  { id: 'motion', label: 'Motion' },
  { id: 'zindex', label: 'Z-Index' },
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

const SEMANTIC_TOKENS = [
  { group: 'Text', tokens: [
    { name: 'Primary', hex: '#0E3A2D', token: 'text/primary', note: 'Dark Teal — body text on light' },
    { name: 'Inverse', hex: '#F7F4ED', token: 'text/inverse', note: 'Paper White — text on dark' },
    { name: 'Secondary', hex: '#4A4E58', token: 'text/secondary', note: 'Slate Grey — supporting text' },
    { name: 'Warm', hex: '#FED260', token: 'text/warm', note: 'Golden Sun — ONLY on dark surfaces' },
  ]},
  { group: 'Brand', tokens: [
    { name: 'Primary', hex: '#0E3A2D', token: 'brand/primary', note: 'Dark Teal' },
    { name: 'Accent', hex: '#F75A3D', token: 'brand/accent', note: 'Warm Coral' },
    { name: 'Warm', hex: '#FED260', token: 'brand/warm', note: 'Golden Sun' },
    { name: 'Cool', hex: '#B6D4EA', token: 'brand/cool', note: 'Sky Blue' },
  ]},
  { group: 'State', tokens: [
    { name: 'Success', hex: '#A4E5D9', token: 'state/success', note: 'Aquamarine' },
    { name: 'Error', hex: '#F75A3D', token: 'state/error', note: 'Warm Coral (fill, not text)' },
    { name: 'Warning', hex: '#FED260', token: 'state/warning', note: 'Golden Sun' },
    { name: 'Info', hex: '#B6D4EA', token: 'state/info', note: 'Sky Blue' },
  ]},
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
  { token: 'type/body-base', mobile: '14px', desktop: '16px', font: 'Roca', weight: 400, leading: '1.5', sample: 'Each morning begins with an optional sunrise yoga session overlooking the Pacific, followed by a group workout that blends strength training with functional movement.' },
  { token: 'type/body-sm', mobile: '12px', desktop: '14px', font: 'Roca', weight: 400, leading: '1.5', sample: 'Prices shown in USD. Approximate conversions for reference only.' },
  { token: 'type/label', mobile: '12px', desktop: '14px', font: 'Roca', weight: 500, leading: '1.5', sample: 'SELLING FAST' },
  { token: 'type/label-sm', mobile: '10px', desktop: '12px', font: 'Roca', weight: 500, leading: '1.5', sample: 'MAR 14–22, 2026' },
  { token: 'type/button', mobile: '16px', desktop: '18px', font: 'Roca', weight: 700, leading: '1.5', sample: 'Book Now' },
  { token: 'type/caption', mobile: '11px', desktop: '12px', font: 'Roca', weight: 400, leading: '1.5', sample: 'SALTY partners with Movement Travel, a TICO-licensed travel agency.' },
];

const SPACING_PRIMITIVES = [
  { token: 'space/px', value: '1px' },
  { token: 'space/0.5', value: '2px' },
  { token: 'space/1', value: '4px' },
  { token: 'space/2', value: '8px' },
  { token: 'space/3', value: '12px' },
  { token: 'space/4', value: '16px' },
  { token: 'space/5', value: '20px' },
  { token: 'space/6', value: '24px' },
  { token: 'space/8', value: '32px' },
  { token: 'space/10', value: '40px' },
  { token: 'space/12', value: '48px' },
  { token: 'space/16', value: '64px' },
  { token: 'space/20', value: '80px' },
  { token: 'space/24', value: '96px' },
  { token: 'space/32', value: '128px' },
];

const SPACING_SEMANTIC = [
  { token: 'spacing/section-y', mobile: '48px', desktop: '96px', use: 'Between page sections' },
  { token: 'spacing/section-x', mobile: '16px', desktop: '80px', use: 'Horizontal page padding' },
  { token: 'spacing/container-max', mobile: '100%', desktop: '1200px', use: 'Max content width' },
  { token: 'spacing/component-y', mobile: '16px', desktop: '32px', use: 'Internal vertical padding' },
  { token: 'spacing/component-x', mobile: '16px', desktop: '32px', use: 'Internal horizontal padding' },
  { token: 'spacing/card-padding', mobile: '16px', desktop: '24px', use: 'Card internal padding' },
  { token: 'spacing/stack-sm', mobile: '8px', desktop: '12px', use: 'Tight vertical stack' },
  { token: 'spacing/stack-md', mobile: '16px', desktop: '24px', use: 'Medium stack' },
  { token: 'spacing/stack-lg', mobile: '24px', desktop: '48px', use: 'Large stack within component' },
  { token: 'spacing/grid-gap', mobile: '16px', desktop: '24px', use: 'Grid column gaps' },
];

const RADIUS_TOKENS = [
  { token: 'radius/button', value: '9999px', label: 'Button (pill)' },
  { token: 'radius/card', value: '16px', label: 'Card' },
  { token: 'radius/input', value: '8px', label: 'Input' },
  { token: 'radius/badge', value: '9999px', label: 'Badge' },
  { token: 'radius/modal', value: '24px', label: 'Modal' },
  { token: 'radius/tag', value: '9999px', label: 'Tag' },
];

const SHADOWS = [
  { token: 'shadow/sm', value: '0 1px 3px rgba(30,25,20,0.06), 0 1px 2px rgba(30,25,20,0.04)', use: 'Card resting state' },
  { token: 'shadow/md', value: '0 4px 12px rgba(30,25,20,0.08), 0 2px 4px rgba(30,25,20,0.04)', use: 'Card hover, active' },
  { token: 'shadow/lg', value: '0 12px 32px rgba(30,25,20,0.12), 0 4px 8px rgba(30,25,20,0.06)', use: 'Modals, overlays, nav' },
];

const MOTION_TOKENS = [
  { token: 'motion/duration/instant', value: '100ms' },
  { token: 'motion/duration/fast', value: '200ms' },
  { token: 'motion/duration/base', value: '250ms' },
  { token: 'motion/duration/moderate', value: '300ms' },
  { token: 'motion/duration/slow', value: '400ms' },
];

const EASING_TOKENS = [
  { token: 'motion/easing/default', value: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)', label: 'Default' },
  { token: 'motion/easing/enter', value: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)', label: 'Enter' },
  { token: 'motion/easing/exit', value: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)', label: 'Exit' },
];

const Z_INDEX_SCALE = [
  { token: 'z/base', value: 1, use: 'Default content' },
  { token: 'z/card-overlay', value: 50, use: 'SALTY Meter on cards, coach info' },
  { token: 'z/sticky', value: 100, use: 'Nav bar' },
  { token: 'z/drawer', value: 200, use: 'Mobile nav tray' },
  { token: 'z/modal', value: 300, use: 'Modals' },
  { token: 'z/toast', value: 400, use: 'Toast notifications' },
];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function SectionHeader({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div id={id} className="pt-20 pb-8 scroll-mt-28">
      <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h2>
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
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="text-left group cursor-pointer">
      <div
        className="h-28 rounded-2xl flex items-end p-4 transition-transform duration-200 group-hover:scale-[1.02]"
        style={{ backgroundColor: hex, border: hex === '#F7F4ED' || hex === '#F0E8DB' ? '1px solid #E7D7C0' : 'none' }}
      >
        <span className="font-mono text-xs" style={{ color: dark ? '#F7F4ED' : '#0E3A2D', opacity: 0.8 }}>
          {copied ? 'Copied!' : hex}
        </span>
      </div>
      <div className="mt-2.5">
        <p className="font-bold text-sm text-teal">{name}</p>
        <p className="font-mono text-xs text-slate-grey">{token}</p>
        {use && <p className="text-xs text-slate-grey mt-0.5">{use}</p>}
      </div>
    </button>
  );
}

function TokenBadge({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block px-2 py-0.5 rounded-md text-xs font-mono" style={{ backgroundColor: '#F0E8DB', color: '#0E3A2D' }}>
      {children}
    </code>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F4ED' }}>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-6 lg:px-20" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#FED260' }}>
            Design System v1.0 — February 2026
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)', color: '#F7F4ED' }}>
            SALTY<br />Design System
          </h1>
          <p className="mt-6 text-lg max-w-2xl" style={{ color: '#E7D7C0' }}>
            The canonical reference for colors, typography, spacing, components, and interaction patterns across getsaltyretreats.com and explore.getsaltyretreats.com.
          </p>
          <div className="mt-8 flex gap-3 text-sm font-mono" style={{ color: '#A4E5D9' }}>
            <span>Next.js 15</span>
            <span style={{ color: '#4A4E58' }}>/</span>
            <span>Tailwind v4</span>
            <span style={{ color: '#4A4E58' }}>/</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </section>

      {/* ── Sticky Section Nav ── */}
      <nav className="sticky top-0 z-40 border-b overflow-x-auto" style={{ backgroundColor: '#F7F4EDf0', borderColor: '#E7D7C0', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 flex gap-1 py-3">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-200 hover:text-paper-white"
              style={{ color: '#0E3A2D', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0E3A2D'; e.currentTarget.style.color = '#F7F4ED'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0E3A2D'; }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Main Content ── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-20 pb-32">

        {/* ════════ COLORS ════════ */}
        <SectionHeader id="colors" title="Color System" subtitle="12 brand colors: 6 primary primitives + 6 secondary. Source: Brand Guidelines 2025, page 4-5." />

        <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>Primary Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {PRIMARY_COLORS.map((c) => <ColorSwatch key={c.token} {...c} />)}
        </div>

        <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>Secondary Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {SECONDARY_COLORS.map((c) => <ColorSwatch key={c.token} {...c} />)}
        </div>

        <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>Semantic Tokens</h3>
        <div className="space-y-8 mb-12">
          {SEMANTIC_TOKENS.map((group) => (
            <div key={group.group}>
              <p className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-grey">{group.group}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {group.tokens.map((t) => (
                  <div key={t.token} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#F0E8DB' }}>
                    <div className="w-10 h-10 rounded-lg shrink-0" style={{ backgroundColor: t.hex, border: t.hex === '#F7F4ED' ? '1px solid #E7D7C0' : 'none' }} />
                    <div>
                      <p className="text-xs font-bold">{t.name}</p>
                      <p className="text-[10px] font-mono text-slate-grey">{t.token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: '#FED260', color: '#0E3A2D' }}>
          <p className="text-sm font-bold uppercase tracking-wider mb-2">60 / 30 / 10 Rule</p>
          <p className="text-sm">Every section follows: 60% dominant background, 30% secondary supporting elements, 10% accent (CTAs, highlights).</p>
        </div>

        {/* ════════ SURFACES ════════ */}
        <SectionHeader id="surfaces" title="Surface Tokens" subtitle="6 approved surface backgrounds. No secondary colors as page backgrounds." />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {SURFACE_TOKENS.map((s) => <ColorSwatch key={s.token} {...s} />)}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F0E8DB' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3">Light Surfaces</p>
            <p className="text-sm mb-2">Use <TokenBadge>text/primary</TokenBadge> (Dark Teal #0E3A2D)</p>
            <p className="text-xs text-slate-grey">surface/base, surface/warm-light, surface/warm, sky, golden, aquamarine, rose-stone, bright-coral, all retreat/surface values</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#0E3A2D', color: '#F7F4ED' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3">Dark Surfaces</p>
            <p className="text-sm mb-2">Use <span className="inline-block px-2 py-0.5 rounded-md text-xs font-mono" style={{ backgroundColor: '#1F4638' }}>text/inverse</span> (Paper White #F7F4ED)</p>
            <p className="text-xs" style={{ color: '#A4E5D9' }}>surface/dark, surface/dark-raised, surface/dark-deep, palm-green, slate-grey, rust-red</p>
          </div>
        </div>

        {/* ════════ RETREAT PALETTES ════════ */}
        <SectionHeader id="retreats" title="Retreat Color System" subtitle="Each retreat has 6 tokens. retreat/surface = primary at 8% opacity over Paper White. All retreat surfaces are LIGHT." />

        <div className="space-y-4 mb-8">
          {RETREAT_PALETTES.map((r) => (
            <div key={r.name} className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <div className="flex items-center gap-4 p-4" style={{ backgroundColor: '#F0E8DB' }}>
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: r.primary }} />
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-slate-grey">{r.slug}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6">
                {[
                  { label: 'Primary', color: r.primary },
                  { label: 'Secondary', color: r.secondary },
                  { label: 'Accent', color: r.accent },
                  { label: 'Surface', color: r.surface },
                  { label: 'Dark', color: r.dark },
                  { label: 'Text on Primary', color: r.textOnPrimary },
                ].map((tok) => (
                  <div key={tok.label} className="p-3 flex flex-col items-center gap-1.5" style={{ backgroundColor: '#F7F4ED' }}>
                    <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: tok.color, border: tok.color === '#F7F4ED' || tok.color === '#F7F1E1' || tok.color === '#F1F1EC' || tok.color === '#F3E5DE' || tok.color === '#E4E5DD' || tok.color === '#E7E9DE' || tok.color === '#E9E6E1' ? '1px solid #E7D7C0' : 'none' }} />
                    <p className="text-[10px] text-center text-slate-grey">{tok.label}</p>
                    <p className="text-[10px] font-mono">{tok.color}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ════════ TYPOGRAPHY ════════ */}
        <SectionHeader id="typography" title="Typography" subtitle="TAN Headline for ALL headings. Roca One Light for ALL body, labels, UI, buttons. No exceptions." />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F0E8DB' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-grey">Display / Headings</p>
            <p className="text-3xl uppercase" style={{ fontFamily: 'var(--font-display)' }}>TAN Headline</p>
            <p className="text-xs text-slate-grey mt-2">H1-H5, hero display, section titles. Always UPPERCASE.</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F0E8DB' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-grey">Body / UI</p>
            <p className="text-2xl" style={{ fontFamily: 'var(--font-body)' }}>Roca One Light</p>
            <p className="text-xs text-slate-grey mt-2">Body, labels, UI, captions, buttons, inputs. Sentence case.</p>
          </div>
        </div>

        <div className="space-y-0 mb-12">
          {TYPE_SCALE.map((t) => (
            <div key={t.token} className="flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-8 py-5 border-b" style={{ borderColor: '#E7D7C0' }}>
              <div className="shrink-0 w-48">
                <TokenBadge>{t.token}</TokenBadge>
                <p className="text-xs text-slate-grey mt-1">{t.mobile} / {t.desktop} &middot; {t.weight} &middot; {t.leading}</p>
              </div>
              <p
                className="flex-1 leading-tight"
                style={{
                  fontFamily: t.font === 'TAN Headline' ? 'var(--font-display)' : 'var(--font-body)',
                  fontSize: t.desktop,
                  fontWeight: t.weight,
                  lineHeight: t.leading,
                  textTransform: t.font === 'TAN Headline' ? 'uppercase' : 'none',
                }}
              >
                {t.sample}
              </p>
            </div>
          ))}
        </div>

        {/* ════════ SPACING ════════ */}
        <SectionHeader id="spacing" title="Spacing" subtitle="4px base unit. Mobile-first with responsive semantic tokens." />

        <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>Primitive Scale</h3>
        <div className="space-y-2 mb-12">
          {SPACING_PRIMITIVES.map((s) => (
            <div key={s.token} className="flex items-center gap-4">
              <div className="w-28 shrink-0">
                <TokenBadge>{s.token}</TokenBadge>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="h-6 rounded"
                  style={{ width: s.value, backgroundColor: '#F75A3D', minWidth: '2px' }}
                />
                <span className="text-xs font-mono text-slate-grey">{s.value}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>Semantic Spacing</h3>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid #0E3A2D' }}>
                <th className="text-left py-3 pr-4 font-bold">Token</th>
                <th className="text-left py-3 pr-4 font-bold">Mobile</th>
                <th className="text-left py-3 pr-4 font-bold">Desktop</th>
                <th className="text-left py-3 font-bold">Use</th>
              </tr>
            </thead>
            <tbody>
              {SPACING_SEMANTIC.map((s) => (
                <tr key={s.token} style={{ borderBottom: '1px solid #E7D7C0' }}>
                  <td className="py-3 pr-4"><TokenBadge>{s.token}</TokenBadge></td>
                  <td className="py-3 pr-4 font-mono text-xs">{s.mobile}</td>
                  <td className="py-3 pr-4 font-mono text-xs">{s.desktop}</td>
                  <td className="py-3 text-slate-grey text-xs">{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ════════ BUTTONS ════════ */}
        <SectionHeader id="buttons" title="Buttons & CTAs" subtitle="Pill shape (radius/full). 16px mobile / 18px desktop, weight 700. Color inversion on hover (200ms ease)." />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: '#F7F4ED', border: '1px solid #E7D7C0' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-6 text-slate-grey">Global Pages — Light Surface</p>
            <div className="space-y-4">
              <button
                className="px-8 py-3 rounded-full text-base font-bold transition-all duration-200"
                style={{ backgroundColor: '#F75A3D', color: '#0E3A2D' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0E3A2D'; e.currentTarget.style.color = '#F7F4ED'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F75A3D'; e.currentTarget.style.color = '#0E3A2D'; }}
              >
                Book Now
              </button>
              <br />
              <button
                className="px-8 py-3 rounded-full text-base font-bold transition-all duration-200"
                style={{ backgroundColor: '#F7F4ED', color: '#0E3A2D', border: '1px solid #E7D7C0' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0E3A2D'; e.currentTarget.style.color = '#F7F4ED'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F7F4ED'; e.currentTarget.style.color = '#0E3A2D'; }}
              >
                Ask a Question
              </button>
            </div>
            <p className="text-xs text-slate-grey mt-4">Primary: Coral bg + Teal text &rarr; Hover inverts</p>
            <p className="text-xs text-slate-grey">Secondary: White bg + Teal text &rarr; Hover inverts</p>
          </div>

          <div className="p-8 rounded-2xl" style={{ backgroundColor: '#0E3A2D' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: '#A4E5D9' }}>Global Pages — Dark Surface</p>
            <div className="space-y-4">
              <button
                className="px-8 py-3 rounded-full text-base font-bold transition-all duration-200"
                style={{ backgroundColor: '#F75A3D', color: '#0E3A2D' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F7F4ED'; e.currentTarget.style.color = '#0E3A2D'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F75A3D'; e.currentTarget.style.color = '#0E3A2D'; }}
              >
                See Upcoming Trips
              </button>
              <br />
              <button
                className="px-8 py-3 rounded-full text-base font-bold transition-all duration-200"
                style={{ backgroundColor: '#F7F4ED', color: '#0E3A2D' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FED260'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F7F4ED'; }}
              >
                Chat With Us
              </button>
            </div>
            <p className="text-xs mt-4" style={{ color: '#E7D7C0' }}>Same Coral pill on dark surfaces, Teal text</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl mb-12" style={{ backgroundColor: '#3A6B35' }}>
          <p className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: '#A4E5D9' }}>Retreat Pages — Panama Example (Rust Red accent)</p>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-3 rounded-full text-base font-bold transition-all duration-200"
              style={{ backgroundColor: '#C74235', color: '#F7F4ED' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F7F4ED'; e.currentTarget.style.color = '#C74235'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C74235'; e.currentTarget.style.color = '#F7F4ED'; }}
            >
              Book Now
            </button>
            <button
              className="px-8 py-3 rounded-full text-base font-bold transition-all duration-200"
              style={{ backgroundColor: '#F7F4ED', color: '#3A6B35' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3A6B35'; e.currentTarget.style.color = '#F7F4ED'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F7F4ED'; e.currentTarget.style.color = '#3A6B35'; }}
            >
              Ask a Question
            </button>
          </div>
          <p className="text-xs mt-4" style={{ color: '#B6D4EA' }}>Exception: Rust Red accent buttons use Paper White text (not Teal) for contrast</p>
        </div>

        {/* ════════ RADIUS ════════ */}
        <SectionHeader id="radius" title="Borders & Radius" subtitle="Cards use shadow only for resting depth. No card borders. Hover adds 3-4px bottom border in retreat/coral color." />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {RADIUS_TOKENS.map((r) => (
            <div key={r.token} className="text-center">
              <div
                className="h-24 w-full flex items-center justify-center"
                style={{
                  backgroundColor: '#E7D7C0',
                  borderRadius: r.value,
                }}
              >
                <span className="font-mono text-xs text-teal">{r.value}</span>
              </div>
              <p className="text-sm font-bold mt-2">{r.label}</p>
              <p className="text-xs font-mono text-slate-grey">{r.token}</p>
            </div>
          ))}
        </div>

        {/* ════════ SHADOWS ════════ */}
        <SectionHeader id="shadows" title="Shadows" subtitle="Warm neutral shadows (rgba 30,25,20). Never grey/black, never retreat-tinted." />

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {SHADOWS.map((s) => (
            <div key={s.token} className="text-center">
              <div
                className="h-32 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: '#F7F4ED', boxShadow: s.value }}
              >
                <TokenBadge>{s.token}</TokenBadge>
              </div>
              <p className="text-sm font-bold mt-3">{s.use}</p>
            </div>
          ))}
        </div>

        {/* ════════ FORMS ════════ */}
        <SectionHeader id="forms" title="Form Elements" subtitle="Always visible labels. 44x44px touch targets on mobile. All inputs connect to GoHighLevel API." />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Default', borderColor: '#E7D7C0', borderWidth: '1px', bg: '#F7F4ED' },
            { label: 'Focus', borderColor: '#0E3A2D', borderWidth: '2px', bg: '#F7F4ED' },
            { label: 'Error', borderColor: '#F75A3D', borderWidth: '2px', bg: '#F7F4ED' },
            { label: 'Disabled', borderColor: '#E7D7C0', borderWidth: '1px', bg: '#F0E8DB' },
          ].map((state) => (
            <div key={state.label}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-grey">{state.label}</p>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-3 text-sm outline-none"
                disabled={state.label === 'Disabled'}
                style={{
                  borderRadius: '8px',
                  border: `${state.borderWidth} solid ${state.borderColor}`,
                  backgroundColor: state.bg,
                  opacity: state.label === 'Disabled' ? 0.6 : 1,
                }}
              />
              {state.label === 'Error' && (
                <p className="text-xs mt-1.5" style={{ color: '#F75A3D' }}>Please enter a valid email</p>
              )}
            </div>
          ))}
        </div>

        {/* ════════ BADGES ════════ */}
        <SectionHeader id="badges" title="Status Badges" subtitle="Availability and status indicators for retreat cards." />

        <div className="flex flex-wrap gap-3 mb-12">
          {[
            { label: 'Selling Fast', bg: '#F75A3D', text: '#F7F4ED' },
            { label: 'Sold Out', bg: '#C74235', text: '#F7F4ED' },
            { label: 'New Trip', bg: '#B6D4EA', text: '#0E3A2D' },
            { label: 'Early Bird', bg: '#FED260', text: '#0E3A2D' },
          ].map((badge) => (
            <span
              key={badge.label}
              className="px-4 py-1.5 rounded-full text-sm font-bold"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {badge.label}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Success', bg: '#A4E5D9', text: '#0E3A2D' },
            { label: 'Error', bg: '#F75A3D', text: '#F7F4ED' },
            { label: 'Warning', bg: '#FED260', text: '#0E3A2D' },
            { label: 'Info', bg: '#B6D4EA', text: '#0E3A2D' },
          ].map((state) => (
            <div key={state.label} className="p-4 rounded-xl text-center" style={{ backgroundColor: state.bg, color: state.text }}>
              <p className="text-sm font-bold">{state.label} State</p>
              <p className="text-xs mt-1 opacity-80">state/{state.label.toLowerCase()}</p>
            </div>
          ))}
        </div>

        {/* ════════ DARK SECTIONS ════════ */}
        <SectionHeader id="dark" title="Dark Sections" subtitle="SALTY is light-first. No system-wide dark mode. Dark sections are deliberate emphasis." />

        <div className="rounded-2xl overflow-hidden mb-12">
          <div className="p-8 lg:p-12" style={{ backgroundColor: '#0E3A2D' }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#FED260' }}>surface/dark</p>
            <h3 className="text-3xl uppercase mb-4" style={{ fontFamily: 'var(--font-display)', color: '#F7F4ED' }}>
              WHAT PEOPLE SAY
            </h3>
            <p className="text-base mb-6" style={{ color: '#E7D7C0' }}>
              &ldquo;Best week of my life. I came solo, left with 30 new friends and a six-pack.&rdquo;
            </p>
            <div className="flex gap-4 mb-6">
              <button className="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200" style={{ backgroundColor: '#F75A3D', color: '#0E3A2D' }}>
                See All Reviews
              </button>
              <a href="#" className="text-sm underline transition-colors duration-200" style={{ color: '#E7D7C0' }}>
                Read more testimonials
              </a>
            </div>
            <div className="flex gap-4 text-xs" style={{ color: '#A4E5D9' }}>
              <span>Headings: Paper White</span>
              <span>&middot;</span>
              <span>Body: Sand</span>
              <span>&middot;</span>
              <span>Accent text: Golden Sun</span>
              <span>&middot;</span>
              <span>Links: Sand + underline, Golden Sun on hover</span>
            </div>
          </div>
          <div className="p-8 lg:p-12" style={{ backgroundColor: '#1F4638' }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#A4E5D9' }}>surface/dark-raised</p>
            <p className="text-sm" style={{ color: '#F7F4ED' }}>Used for cards on dark backgrounds, tooltips, and raised elements.</p>
          </div>
          <div className="p-8 lg:p-12" style={{ backgroundColor: '#0B3126' }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#A4E5D9' }}>surface/dark-deep</p>
            <p className="text-sm" style={{ color: '#F7F4ED' }}>Footer and deepest backgrounds.</p>
          </div>
        </div>

        {/* ════════ DIVIDERS ════════ */}
        <SectionHeader id="dividers" title="Dividers" subtitle="Three variants: Swoop (major transitions), Wave (subtle shifts), Double Lines (accent punctuation)." />

        <div className="space-y-8 mb-12">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F0E8DB' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3">Swoop</p>
            <svg viewBox="0 0 1200 64" className="w-full" preserveAspectRatio="none" style={{ height: '64px' }}>
              <path d="M0,0 C300,64 900,64 1200,0 L1200,64 L0,64 Z" fill="#0E3A2D" />
            </svg>
            <p className="text-xs text-slate-grey mt-3">Full-width SVG curve. Major dark/light transitions. ALWAYS after hero. Props: color, direction (left/right), height (48-64px).</p>
          </div>

          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F0E8DB' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3">Wave</p>
            <svg viewBox="0 0 1200 32" className="w-full" preserveAspectRatio="none" style={{ height: '32px' }}>
              <path d="M0,16 Q300,0 600,16 T1200,16 L1200,32 L0,32 Z" fill="#E7D7C0" />
            </svg>
            <p className="text-xs text-slate-grey mt-3">Gentle arc. Subtle same-tone shifts (Paper White to Sand). Height: 24-32px.</p>
          </div>

          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F0E8DB' }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3">Double Lines</p>
            <div className="flex flex-col items-center gap-1.5 py-4">
              <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#F75A3D' }} />
              <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#FED260' }} />
            </div>
            <p className="text-xs text-slate-grey mt-3">Two 6px parallel lines. Max 2x per page. Inversion principle: top line from section below, bottom from section above.</p>
          </div>
        </div>

        {/* ════════ MOTION ════════ */}
        <SectionHeader id="motion" title="Motion & Animation" subtitle="No bounce. No overshoot. Clean, warm, functional. All require prefers-reduced-motion fallback." />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>Duration</h3>
            <div className="space-y-3">
              {MOTION_TOKENS.map((m) => (
                <div key={m.token} className="flex items-center gap-4">
                  <div className="w-40 shrink-0"><TokenBadge>{m.token.replace('motion/duration/', '')}</TokenBadge></div>
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E7D7C0' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: '#F75A3D',
                        width: `${(parseInt(m.value) / 400) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-grey w-12 text-right">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>Easing</h3>
            <div className="space-y-3">
              {EASING_TOKENS.map((e) => (
                <div key={e.token} className="p-4 rounded-xl" style={{ backgroundColor: '#F0E8DB' }}>
                  <p className="text-sm font-bold">{e.label}</p>
                  <p className="text-xs font-mono text-slate-grey mt-1">{e.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid #0E3A2D' }}>
                <th className="text-left py-3 pr-4 font-bold">Element</th>
                <th className="text-left py-3 pr-4 font-bold">Animation</th>
                <th className="text-left py-3 pr-4 font-bold">Duration</th>
                <th className="text-left py-3 font-bold">Trigger</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Scroll reveal', 'translateY(15-20px) + opacity', '300-400ms', 'Viewport entry (once)'],
                ['Hero fade-out', 'opacity 1 to 0', 'Scroll-driven', 'Hero section only'],
                ['Image hover', 'scale(1.02-1.03), overflow hidden', '300ms', 'Hover'],
                ['Card hover', 'translateY(-3px) + shadow + border', '250ms', 'Hover'],
                ['Button hover', 'Color inversion (bg/text swap)', '200ms', 'Hover'],
                ['Nav transition', 'transparent to solid bg', '250ms', 'Scroll position'],
                ['Accordion', 'Height + opacity', '200ms', 'Click'],
                ['Lazy images', 'Sand shimmer skeleton to fade in', '—', 'Load complete'],
              ].map(([el, anim, dur, trigger]) => (
                <tr key={el} style={{ borderBottom: '1px solid #E7D7C0' }}>
                  <td className="py-3 pr-4 font-bold">{el}</td>
                  <td className="py-3 pr-4 text-xs text-slate-grey">{anim}</td>
                  <td className="py-3 pr-4 text-xs font-mono">{dur}</td>
                  <td className="py-3 text-xs text-slate-grey">{trigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ════════ Z-INDEX ════════ */}
        <SectionHeader id="zindex" title="Z-Index Scale" subtitle="Layered hierarchy for stacking context." />

        <div className="relative h-80 mb-12 rounded-2xl overflow-hidden" style={{ backgroundColor: '#F0E8DB' }}>
          {Z_INDEX_SCALE.map((z, i) => (
            <div
              key={z.token}
              className="absolute left-0 right-0 flex items-center justify-between px-6"
              style={{
                bottom: `${i * 48 + 16}px`,
                height: '40px',
                backgroundColor: `rgba(14,58,45,${0.15 + i * 0.15})`,
                borderRadius: '8px',
                marginLeft: `${i * 16}px`,
                marginRight: `${i * 16}px`,
              }}
            >
              <span className="text-xs font-bold" style={{ color: i > 2 ? '#F7F4ED' : '#0E3A2D' }}>{z.use}</span>
              <span className="text-xs font-mono" style={{ color: i > 2 ? '#A4E5D9' : '#4A4E58' }}>z-{z.value} &middot; {z.token}</span>
            </div>
          ))}
        </div>

        {/* ── Footer Reference ── */}
        <div className="mt-20 pt-8 border-t text-center" style={{ borderColor: '#E7D7C0' }}>
          <p className="text-sm text-slate-grey">
            Source: DESIGN-SYSTEM-RULES.md + SALTY-INFORMATION-ARCHITECTURE.md
          </p>
          <p className="text-xs text-slate-grey mt-1">
            This is a living reference. Update it when design decisions change.
          </p>
        </div>
      </div>
    </div>
  );
}
