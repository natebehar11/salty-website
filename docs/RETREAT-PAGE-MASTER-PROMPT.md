# SALTY Retreat Page — Dev Master Prompt

Use this when building, editing, or extending any retreat page component.
Codebase: `github.com/natebehar11/salty-website` (Next.js 15, Tailwind v4, Framer Motion)

---

## Section Order (canonical — do not reorder)

| # | Section | Component | Notes |
|---|---------|-----------|-------|
| 1 | Shrinking Hero | `ShrinkingHero` | Full-bleed, parallax, stats bar |
| 2 | About / GEO | inline JSX | GEO definition block + quick facts grid |
| 3 | Intro video | inline `<iframe>` | YouTube embed, autoplay/muted |
| 4 | What's Included | `InclusionsSection` | Included ✓ / Not included ✗ lists |
| 5 | The Experience | `ExperienceSection` | Narrative + For You If + Best For |
| 6 | What You'll Do | `ActivitiesSection` | Activity cards + daily rhythm |
| 7 | Day-by-Day Itinerary | `ScrollOverItinerary` | Scroll-driven day cards |
| **8** | **Where You'll Stay** | `AccommodationTabs` + `RetreatTicket` | **Two-column: tabs left, sticky ticket right** |
| **9** | **How It Works** | `HowItWorks` | **Steps + payment/cancellation/solo policies** |
| **10** | **Your Coaches** | `CoachesGrid` | Coach cards grid |
| 11 | SALTY Meter | `SaltyMeter` | Bar chart: sweat/adventure/culture/party/rest |
| 12 | Testimonials | `TestimonialsSection` | Guest quotes |
| 13 | Photo strip | inline grid | 4 images, aspect-square |
| 14 | FAQ | `FAQAccordion` | Accordion with chevron |
| 15 | Final CTA | `FinalCTA` | Dark section, large CTA |

**Rule: Never add a separate room pricing grid. Room options live exclusively in `AccommodationTabs` tabs.**

---

## Data Shape (`RetreatData` from `src/components/retreat/retreat-data.ts`)

```ts
interface RetreatData {
  slug: string;
  destination: string;
  officialName: string;
  heroImageUrl: string;
  status: 'active' | 'selling-fast' | 'sold-out' | 'coming-soon' | 'complete';
  dates: { start: string; end: string; display: string };
  duration: number;           // days
  priceFrom: number;          // lowest room price in USD
  groupSize: string;
  country: string;
  location: string;
  soloTravelerPercent: number;
  spotsRemaining?: number;
  depositAmount: number;
  bookingUrl?: string;
  geoDescription: string;
  quickFacts: { label: string; value: string }[];
  included: string[];
  notIncluded: string[];
  experienceNarrative: string[];
  forYouIf: string[];
  bestFor: string[];
  maybeNotFor: string[];
  activities: { name: string; description: string; imageUrl?: string }[];
  dailyRhythm: { period: string; description: string }[];
  itinerary: { day: number; title: string; location: string; summary: string; details: string }[];
  roomTiers: { name: string; price: number; description: string; features: string[]; imageUrl?: string }[];
  accommodation: { name: string; description: string; features: string[] };
  coaches: { name: string; bio: string; specialties: string[]; personality: string; cardColor: string; photoUrl?: string }[];
  saltyMeter: { sweat: number; adventure: number; party: number; rest: number; culture: number };
  testimonials: { guestName: string; quote: string; rating: number; retreatLabel: string }[];
  faqs: { question: string; answer: string }[];
  youtubeVideoIds: string[];
  paymentPolicy: string;
  cancellationPolicy: string;
}
```

**Key field names to memorise:**
- Accommodation: `retreat.accommodation.name / .description / .features` (nested object, NOT flat `accommodationName`)
- Price: `retreat.priceFrom` (NOT `lowestPrice`)
- Duration: `retreat.duration` (NOT `totalDays`)
- Dates: `retreat.dates.display` (NOT `retreat.dates` directly)
- Meter scores: `retreat.saltyMeter.sweat` etc. (NOT `retreat.meter`)
- Room price: `tier.price` (NOT `tier.priceUSD`)
- Room name: `tier.name` (NOT `tier.type`)
- Room features: `tier.features` (NOT `tier.highlights`)

---

## Theme System

The retreat slug drives all color theming via a CSS `data-retreat` attribute set in `retreat-page-client.tsx`:

```tsx
<div data-retreat={retreat.slug.replace(/-fitness-retreat|-surf-retreat/g, '')}>
```

This activates CSS variable overrides from `globals.css`:

| Variable | Usage |
|---|---|
| `var(--retreat-accent)` | Primary CTA color, tab active state, price highlights |
| `var(--retreat-secondary)` | Secondary UI elements |
| `var(--retreat-primary)` | Ticket badge background, primary surfaces |
| `var(--retreat-dark)` | Dark section backgrounds |
| `var(--retreat-text-on-primary)` | Text on primary-colored surfaces |
| `var(--retreat-ticket-text)` | Ticket badge label color |

**In JS components**, reference these via:
```tsx
const theme = {
  accent: 'var(--retreat-accent, var(--color-coral))',
  secondary: 'var(--retreat-secondary, var(--color-sky))',
};
```
Pass `theme.accent` as the `accentColor` / `retreatAccent` prop to components that need it.

---

## Section 8 — Where You'll Stay (layout spec)

```tsx
<section id="retreat-accommodation" style={{ backgroundColor: 'var(--color-paper-white)', padding: 'var(--space-section-y) var(--space-section-x)' }}>
  <div className="mx-auto" style={{ maxWidth: 1200 }}>
    <h2 className="uppercase mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)', color: 'var(--color-teal)' }}>
      Where You'll Stay
    </h2>

    {/* Two-column grid: tabs fill left, ticket is sticky on right */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
      <AccommodationTabs
        propertyName={retreat.accommodation.name}
        propertyDescription={retreat.accommodation.description}
        propertyFeatures={retreat.accommodation.features}
        roomTiers={retreat.roomTiers}
        retreatAccent={theme.accent}
        bookingUrl={retreat.bookingUrl}
      />
      <div className="lg:sticky lg:top-24">
        <RetreatTicket
          name={retreat.officialName}
          dates={retreat.dates.display}
          startingPrice={retreat.priceFrom}
          totalDays={retreat.duration}
          bookingUrl={retreat.bookingUrl}
          onBookNow={handleBookNow}
          accentColor={theme.accent}
        />
      </div>
    </div>
  </div>
</section>
```

**Rules:**
- Room options tabs only — no separate room grid anywhere on the page
- Ticket sidebar sticky at `top: 24` (96px)
- `lg:grid-cols-[1fr_320px]` — ticket column is always 320px wide

---

## Section 9 — How It Works (layout spec)

```tsx
<HowItWorks
  depositAmount={retreat.depositAmount}
  paymentPolicy={retreat.paymentPolicy}
  cancellationPolicy={retreat.cancellationPolicy}
  soloPercent={retreat.soloTravelerPercent}
  accentColor={theme.accent}
  onBookNow={handleBookNow}
/>
```

Dark background (`var(--color-surface-dark)`). Four numbered step cards + three policy cards (payment, cancellation, solo traveler %). Book CTA at bottom.

---

## Component Props Reference

### `AccommodationTabs`
```tsx
interface AccommodationTabsProps {
  propertyName: string;
  propertyDescription: string;
  propertyFeatures: string[];
  roomTiers: { name: string; price: number; description: string; features: string[]; imageUrl?: string }[];
  retreatAccent?: string;  // CSS var or hex
  bookingUrl?: string;
}
```

### `RetreatTicket`
```tsx
interface RetreatTicketProps {
  name: string;           // retreat.officialName
  dates: string;          // retreat.dates.display
  startingPrice: number;  // retreat.priceFrom
  totalDays: number;      // retreat.duration
  bookingUrl?: string;
  onBookNow: () => void;
  accentColor?: string;
}
```

### `HowItWorks`
```tsx
interface HowItWorksProps {
  depositAmount: number;
  paymentPolicy: string;
  cancellationPolicy: string;
  soloPercent: number;      // retreat.soloTravelerPercent
  accentColor?: string;
  onBookNow: () => void;
}
```

---

## Design Tokens — Most Used

```css
/* Colors */
--color-teal: #0E3A2D          /* headings, dark text */
--color-sand: #E7D7C0          /* warm borders, warm-light bg */
--color-paper-white: #F7F4ED   /* default page bg */
--color-coral: #F75A3D         /* primary CTA default */
--color-surface-dark: #0E3A2D  /* dark sections */
--color-surface-dark-raised: #1F4638  /* cards on dark */
--color-slate-grey: #4A4E58    /* body text */

/* Typography */
--font-display: 'TAN Headline'   /* all headings, labels, uppercase text */
--font-body: 'Roca'              /* all body, buttons, UI copy */
--type-h2: clamp(1.75rem, 4vw, 3rem)
--type-h3: clamp(1.375rem, 2.5vw, 2rem)
--type-body-base: clamp(0.875rem, 1vw, 1rem)

/* Spacing */
--space-section-y: clamp(48px, 8vw, 96px)
--space-section-x: clamp(16px, 5vw, 80px)
--space-container-max: 1200px

/* Borders */
--radius-card: 16px
--radius-button: 9999px

/* Shadows */
--shadow-md: 0 4px 12px rgba(30,25,20,0.08)
--shadow-lg: 0 12px 32px rgba(30,25,20,0.12)
```

---

## Rules

1. **Section order is fixed** — see table above. Do not add new sections between existing ones without updating this doc.
2. **Room options tabs only** — never add a separate room pricing grid.
3. **CSS variables always** — never hardcode hex colors, font names, or spacing values.
4. **`var(--font-display)` on headings**, `var(--font-body)` on everything else.
5. **All headings uppercase** — use `className="uppercase"` + `fontFamily: 'var(--font-display)'`.
6. **Framer Motion for animations** — always check `useReducedMotion()` and set `duration: 0` when true.
7. **`'use client'`** on every interactive component.
8. **Import paths** — use `@/components/retreat/` for retreat-specific, `@/components/shared/` for shared.
9. **Data from `src/components/retreat/retreat-data.ts`** — `RETREATS[slug]` is the lookup map.
10. **Dividers between sections** — use `<SwoopDivider>` for dark-to-light transitions, `<WaveDivider>` for light-to-light.
