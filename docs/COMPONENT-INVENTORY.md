# SALTY Component Inventory — 50 Components

> Cross-reference of Component Gallery + SALTY 38-component handover vs. implemented status.
> **Last updated:** March 1, 2026

---

## Summary

| Status | Tier 1 | Tier 2 | Total |
|--------|--------|--------|-------|
| **Built & showcased** | 14 | 9 | 23 |
| **Built, needs showcase** | 6 | 2 | 8 |
| **Spec'd (Figma/DESIGN-SYSTEM-RULES)** | 5 | 1 | 6 |
| **Pending design/spec** | 2 | 11 | 13 |

---

## TIER 1 — Art-Directed Components (27 total)

Full visual specs required. AI will hallucinate without detailed creative direction.

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 1 | **Hero — Video** | Built | `VideoHero`, `CinematicHero`, `HomepageHero` in sections/ + retreat/ |
| 2 | **Hero — Image (Retreat)** | Built | `RetreatHero` — full-bleed, retreat ticket overlay |
| 3 | **Navigation / Header** | Built | `Navbar` + `MobileMenu` (transparent→solid, retreat-aware) |
| 4 | **Footer** | Built | `Footer` — retreat-aware dark surface |
| 5 | **Retreat Card — Large** | Built | `RetreatCard` size="large", boarding pass treatment, FIGMA-CARDS-SPEC |
| 6 | **Retreat Card — Medium** | Built | `RetreatCard` size="medium", carousel variant |
| 7 | **Retreat Card — Small** | Built | `RetreatCard` size="small", modal SALTY Meter trigger |
| 8 | **Coach Card** | Built | `CoachCard` — starburst badge, hover bio overlay, FIGMA-CARDS-SPEC |
| 9 | **Testimonial Card / Quote** | Built | `TestimonialCard` — full-bleed photo, organic blobs, FIGMA-CARDS-SPEC |
| 10 | **Accommodation Card (Tabbed)** | Built | `AccommodationTabs`, `AccommodationBrowser` |
| 11 | **Interactive Daily Itinerary** | Built | `ItineraryScroll`, `ScrollOverItinerary` |
| 12 | **SALTY Meter** | Built | `SaltyMeter` — radar chart, full/overlay/modal modes |
| 13 | **Button** | Built | `Button` — pill, 3+ variants, DESIGN-SYSTEM-RULES |
| 14 | **Badge / Status Tag** | Built | `StatusBadge` — Early Bird, Selling Fast, Sold Out, New Trip |
| 15 | **Divider — Swoop** | Built | `SwoopDivider` — full-width organic SVG, left/right |
| 16 | **Divider — Wave** | Built | `WaveDivider` — undulating arc |
| 17 | **Divider — Double Lines** | Built | `DoubleLineDivider` — inversion principle |
| 18 | **Divider — Angle** | Pending | Full-width linear diagonal. Sharper variant of swoop. |
| 19 | **Carousel** | Built | `Carousel` — swipe, arrows, dots, snap |
| 20 | **Inclusions Section** | Built | `InclusionsSection` — icon grid, alternating cards |
| 21 | **Section Wrapper** | Partial | Layout pattern in use; no dedicated component |
| 22 | **Photo Frame / Bordered Image** | Partial | Bordered treatment in cards; no standalone component |
| 23 | **FAQ / Accordion** | Built | `FAQAccordion` — global + retreat variants |
| 24 | **Stat / Counter Block** | Built | `StatBar`, `CounterStats` |
| 25 | **Marquee Ticker** | Built | `MarqueeTicker` |
| 26 | **Starburst Badge** | Partial | In CoachCard, Early Bird; needs standalone code spec |
| 27 | **Boarding Pass / Ticket Card** | Built | `RetreatTicket` — per-retreat SVG, barcode strip, punch holes |

---

## TIER 2 — Brand-Tinted Components (23 total)

Token application rules. Few lines each — not full visual specs.

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 28 | **Icon / Activity Tag Pill** | Pending | Pill + icon + label, brand accent per activity |
| 29 | **Avatar** | Pending | Circle crop, 3 sizes, Sand fallback + initials |
| 30 | **Input Field** | Pending | All states (default, focus, filled, error, disabled) |
| 31 | **Tooltip** | Built | `Tooltip` — dark-raised, Paper White text |
| 32 | **Modal / Dialog** | Built | `Modal` — dark backdrop, radius/xl, X + click-outside |
| 33 | **Toast Notification** | Pending | Bottom-center mobile, bottom-right desktop, 4 variants |
| 34 | **Drawer / Tray** | Built | `MobileMenu` — right-side slide-out |
| 35 | **Empty State** | Pending | Warm illustration, headline, recovery CTA |
| 36 | **Error State** | Pending | Inline + full-page, Warm Coral fill |
| 37 | **Success State** | Pending | Aquamarine indicator |
| 38 | **Loading / Skeleton** | Built | `LoadingSkeleton` — Sand shimmer |
| 39 | **Sold Out State** | Built | `StatusBadge` variant "sold-out" on RetreatCard |
| 40 | **Spinner / Loader** | Built | `LoadingSpinner` — emoji-based; consider brand-colored |
| 41 | **Inclusions / Exclusions Accordion** | Built | `InclusionsSection` — two-panel expandable |
| 42 | **Price Comparison Row** | Built | `CostOfStayingHome`, `CostPerDay` in lead magnet |
| 43 | **Iconography Library** | Partial | Icons in InclusionsSection; no full SVG set |
| 44 | **Separator / Horizontal Rule** | Pending | Thin rule, brand colors (distinct from Tier 1 dividers) |
| 45 | **Link** | Partial | Text link styles in use; no dedicated component |
| 46 | **Heading** | Partial | TAN Headline wrappers; needs component wrapper |
| 47 | **Popover** | Pending | Extends tooltip for richer content |
| 48 | **Tabs** | Built | `AccommodationTabs` uses pill row / full tabs |
| 49 | **Search Input** | Pending | Retreat filter, flight finder |
| 50 | **Pagination** | Pending | Brand-styled if retreat listings/blog paginate |

---

## Files Reference

| Component | salty-website | salty-lead-magnet |
|-----------|---------------|-------------------|
| Button | `components/shared/Button.tsx` | `components/shared/Button.tsx` |
| RetreatCard | `components/shared/RetreatCard.tsx` | `components/planner/RetreatCard.tsx` (different) |
| SaltyMeter | `components/shared/SaltyMeter.tsx` | `components/quiz/CompactSaltyMeter.tsx` |
| WaveDivider | `components/layout/WaveDivider.tsx` | `components/shared/WaveDivider.tsx` |
| PriceDisplay | `components/shared/PriceDisplay.tsx` | `components/shared/PriceDisplay.tsx` |
| ScrollReveal | `components/shared/ScrollReveal.tsx` | `components/shared/ScrollReveal.tsx` |
| WhatsAppButton | `components/shared/WhatsAppButton.tsx` | `components/shared/WhatsAppButton.tsx` |

---

## Next Steps

1. **Showcase gaps:** Add RetreatCard, CoachCard, TestimonialCard, SaltyMeter, Navbar/Footer previews to design-system page.
2. **Create pending Tier 1:** AngleDivider, Section Wrapper, Photo Frame, standalone Starburst Badge.
3. **Create pending Tier 2:** Avatar, Input Field, Toast, Empty/Error/Success states, Separator, Popover, Search Input, Pagination, Activity Tag Pill.
4. **Refine existing:** LoadingSpinner → brand-colored variant; Link + Heading → dedicated components.
