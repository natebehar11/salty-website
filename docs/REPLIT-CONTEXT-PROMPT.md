# SALTY Retreats — Replit Context Prompt

You are building a page for **SALTY Retreats**, a group fitness retreat brand.
The full codebase is available at: **https://github.com/natebehar11/salty-website** (main branch).
Import it directly — all fonts, components, styles, and tokens are already in place.

---

## Stack

- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS v4** (utility classes + CSS variables)
- **Framer Motion** for animations
- **No component library** — everything is custom-built

---

## Fonts

Fonts are loaded via `@font-face` in `src/app/globals.css` and served from `public/fonts/`.
Do NOT use `next/font`. Reference them only via CSS variables.

| Variable | Font | Use for |
|---|---|---|
| `var(--font-display)` | TAN Headline | All headings (h1–h5), labels, badges |
| `var(--font-body)` | Roca | All body text, buttons, UI copy |

Font files live at:
```
public/fonts/
  Roca/
    Roca Regular.ttf   → weight 400
    Roca Bold.ttf      → weight 700
    Roca Italic.ttf    → weight 400, italic
    Roca Light.ttf     → weight 300
  TanHeadline/
    TANHEADLINE-Regular.ttf
    TANHEADLINE-Regular.otf
```

---

## Color Tokens (CSS variables from `globals.css`)

```css
/* Primary brand palette */
--color-teal: #0E3A2D          /* main text, dark surfaces */
--color-sand: #E7D7C0          /* warm neutral, borders */
--color-paper-white: #F7F4ED   /* page background, light surfaces */
--color-sky: #B6D4EA           /* secondary accent */
--color-coral: #F75A3D         /* primary CTA, highlights */
--color-golden: #FED260        /* early bird, warm accent */

/* Surfaces */
--color-surface-base: #F7F4ED
--color-surface-warm-light: #F0E8DB
--color-surface-warm: #E7D7C0
--color-surface-dark: #0E3A2D
--color-surface-dark-raised: #1F4638

/* Other */
--color-slate-grey: #4A4E58
--color-palm-green: #3A6B35
--color-aquamarine: #A4E5D9
--color-coral: #F75A3D
--color-bright-coral: #FF7E70
--color-rust-red: #C74235
```

---

## Typography Scale

```css
--type-display: clamp(2.5rem, 6vw, 4.5rem)
--type-h1: clamp(2.25rem, 5vw, 3.75rem)
--type-h2: clamp(1.75rem, 4vw, 3rem)
--type-h3: clamp(1.375rem, 2.5vw, 2rem)
--type-h4: clamp(1.125rem, 1.5vw, 1.375rem)
--type-body-lg: clamp(1rem, 1.2vw, 1.125rem)
--type-body-base: clamp(0.875rem, 1vw, 1rem)
--type-body-sm: clamp(0.75rem, 0.9vw, 0.875rem)
```

---

## Available Components

All components live in `src/components/shared/` and `src/components/layout/`.

### `Button`
```tsx
import Button from '@/components/shared/Button';

<Button variant="primary" size="md">Book Now</Button>
<Button variant="secondary" size="lg">Learn More</Button>
<Button variant="retreat" retreatAccent="#F75A3D" retreatSecondary="#FF7E70">Reserve Spot</Button>
```
- `variant`: `'primary'` | `'secondary'` | `'retreat'`
- `size`: `'sm'` | `'md'` | `'lg'`
- Primary = coral bg → teal on hover
- Secondary = paper-white bg → sky on hover
- Retreat = uses per-retreat accent colors

### `StatusBadge` (Early Bird / Limited Spots)
```tsx
import StatusBadge from '@/components/shared/StatusBadge';

<StatusBadge variant="early-bird" originalPrice="$4,200" />
<StatusBadge variant="selling-fast" />
<StatusBadge variant="sold-out" />
<StatusBadge variant="new-trip" />
```
- `variant`: `'early-bird'` | `'selling-fast'` | `'sold-out'` | `'new-trip'`
- Animates in with a spring on mount

### `RetreatCard`
```tsx
import RetreatCard from '@/components/shared/RetreatCard';

<RetreatCard
  retreat="sri-lanka"         // slug — drives all theme colors
  dates="Mar 15–22, 2025"
  price={3800}
  totalDays={8}
  imageSrc="/images/retreat/hero.jpg"
  badge="early-bird"
  size="large"                // 'large' | 'medium' | 'small'
  showMeter={true}
  saltyMeterScores={{ sweat: 8, adventure: 7, culture: 6, party: 5, rest: 4 }}
/>
```
Available retreat slugs: `sri-lanka` | `panama` | `morocco` | `sicily` | `el-salvador` | `costa-rica` | `nicaragua`

### `CoachCard`
```tsx
import CoachCard from '@/components/shared/CoachCard';

<CoachCard
  name="Erin Walsh"
  bio="NASM-certified trainer, yoga instructor, and professional beach chaos agent."
  photoUrl="/images/coaches/erin.jpg"
  specialties={["Strength", "Yoga", "Surf"]}
  personality="High energy, no-BS motivation"
  cardColor="#0E3A2D"         // hex — drives card bg and text contrast
  size="large"                // 'large' | 'small'
/>
```

### `FAQAccordion`
```tsx
import FAQAccordion from '@/components/shared/FAQAccordion';

<FAQAccordion
  onDark={false}   // true = renders on dark bg using paper-white + sand tokens
  items={[
    { question: "What's included?", answer: "Accommodation, meals, all activities." }
  ]}
/>
```

### `SaltyMeter`
```tsx
import SaltyMeter from '@/components/shared/SaltyMeter';

<SaltyMeter
  scores={{ sweat: 8, adventure: 7, culture: 5, party: 6, rest: 4 }}
  onDark={false}
/>
```
Horizontal bar chart showing retreat intensity across 5 dimensions.

### `CurrencyToggle`
```tsx
import CurrencyToggle from '@/components/shared/CurrencyToggle';

<CurrencyToggle
  value="USD"
  onChange={(currency) => setCurrency(currency)}
/>
```

### Layout
```tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
```
Wrap your page with these. Navbar is sticky, handles mobile menu automatically.

---

## Retreat Theme System

Each retreat has a color palette applied via a `data-retreat` attribute on any wrapper element.
Setting this drives all the `--retreat-*` CSS variables automatically.

```tsx
<div data-retreat="sri-lanka">
  {/* All child components automatically use Sri Lanka's palette */}
  <RetreatCard retreat="sri-lanka" ... />
  <Button variant="retreat" retreatAccent="var(--retreat-accent)" />
</div>
```

Available themes: `sri-lanka` | `panama` | `morocco` | `sicily` | `el-salvador` | `costa-rica` | `nicaragua`

---

## Spacing & Layout Conventions

```css
--space-section-y: clamp(48px, 8vw, 96px)   /* vertical padding between sections */
--space-section-x: clamp(16px, 5vw, 80px)   /* horizontal page padding */
--space-container-max: 1200px                /* max page width */
--radius-card: 16px
--radius-button: 9999px                      /* pill */
--radius-badge: 9999px
```

Use a max-width container pattern:
```tsx
<section style={{ padding: 'var(--space-section-y) var(--space-section-x)' }}>
  <div style={{ maxWidth: 'var(--space-container-max)', margin: '0 auto' }}>
    {/* content */}
  </div>
</section>
```

---

## Brand Voice

- **Energetic, direct, community-driven.** Not corporate, not preachy.
- CTAs: "Claim Your Spot" / "Reserve My Seat" / "I'm In" — not "Submit" or "Click Here"
- Headlines: all-caps TAN Headline, punchy and short
- Body: Roca, warm and conversational

---

## Rules

1. Use CSS variables for ALL colors, fonts, spacing — never hardcode hex values
2. `var(--font-display)` on headings, `var(--font-body)` on everything else
3. Framer Motion for any animated element — always respect `useReducedMotion()`
4. All interactive components need `'use client'` at the top
5. Import components with `@/components/...` path alias
