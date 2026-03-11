# SALTY Retreats — Brand Website

Sanity-driven marketing site for SALTY Retreats. Built with Next.js 15, React 19, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 15.1.0 (App Router)
- **CMS:** Sanity v3 (embedded studio at `/studio`)
- **Styling:** Tailwind CSS 4.0 + styled-components
- **Animation:** Framer Motion 12.0
- **TypeScript:** 5.7 (strict mode)
- **Node:** >=22.0.0 <23.0.0

## Getting Started

```bash
npm install
cp .env.example .env.local   # Fill in required values
npm run dev                   # http://localhost:3000
```

## Environment Variables

See `.env.example` for the full list. Required:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — Sanity CMS connection
- `SANITY_API_READ_TOKEN` — Server-side Sanity reads
- `GHL_API_KEY` / `GHL_LOCATION_ID` — GoHighLevel CRM integration

Optional: `NEXT_PUBLIC_GTM_ID` (Google Tag Manager), `NEXT_PUBLIC_META_PIXEL_ID` (Meta Pixel)

## Page Routes

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/retreats` / `/retreats/[slug]` | Retreat listings + detail pages |
| `/destinations` / `/destinations/[slug]` | Destination guides |
| `/blog` / `/blog/[slug]` | Blog index + posts |
| `/about` | About SALTY |
| `/adventures` | Adventure activities |
| `/fitness-retreats` | Fitness retreat landing |
| `/reviews` | Guest testimonials |
| `/book` | Booking page |
| `/faq` | FAQ |
| `/studio/[[...tool]]` | Sanity Studio (CMS admin) |
| `/design-system` | Internal design system reference |

## API Routes

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/contact` | Contact form submission |
| POST | `/api/subscribe` | Newsletter signup |
| GET | `/api/places/[placeId]` | Google Places data proxy |
| GET | `/api/places/photo` | Google Photos proxy |

## Sanity Content Types

`siteSettings` (singleton), `retreat`, `coach`, `testimonial`, `blogPost`, `destination`, `saltyLandmark`, `faqCategory`, `saltyPhoto`

## Design System

This codebase has two companion docs that define the visual system:

- `COMPONENT-LIBRARY.md` — Tier 1/2 component specs, typography (TAN Headline + Roca), surface tokens, motion rules
- `DESIGN-SYSTEM-RULES.md` — Art direction ("Analog Maximalism"), color tokens, layout patterns

See also: `context/salty/SALTY_STYLE_GUIDE.md` and `context/salty/SALTY_INFORMATION_ARCHITECTURE.md` in the project root for brand-level specs.

## Project Structure

```
src/
├── app/              Page routes + API routes
│   ├── retreats/     Retreat detail pages (Sanity-driven)
│   ├── blog/         Blog (Sanity-driven)
│   ├── api/          Contact, subscribe, Places
│   └── studio/       Sanity Studio
├── components/       React components
│   ├── sections/     Homepage sections
│   ├── retreat/      Retreat detail components
│   └── ui/           Shared UI primitives
├── sanity/           CMS schemas + config
└── types/            TypeScript definitions
```
