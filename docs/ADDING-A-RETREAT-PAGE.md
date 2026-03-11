# Adding a New Retreat Page (Morocco, Sicily, El Salvador, Costa Rica)

The retreat detail **structure is locked**. Every retreat uses the same layout and section order as Panama. You only add **data**; no changes to `RetreatDetailClient.tsx` are required.

---

## 1. Section order (fixed — same for all retreats)

1. CinematicHero  
2. About  
3. Double line divider → Marquee ticker  
4. Inclusions  
5. Activities  
6. Parallax video break  
7. Itinerary  
8. Wave dividers  
9. **Where You'll Stay** (AccommodationBrowser)  
10. **Explore [Destination]** (interactive map — only if landmarks exist)  
11. How It Works (FilingCabinet)  
12. Coaches  
13. SALTY Meter  
14. Parallax video break  
15. Testimonials  
16. Marquee ticker  
17. Photo strip  
18. FAQ  
19. Final CTA  
+ Sticky booking bar  

---

## 2. Where to add a new retreat

| What | File |
|------|------|
| **Retreat content (copy, dates, itinerary, etc.)** | `src/components/retreat/retreat-data.ts` |
| **SEO title/description (optional)** | `src/app/retreats/[slug]/page.tsx` → `titles` / `descriptions` |

**No other code changes** are needed. The page is `app/retreats/[slug]/page.tsx`; the URL slug (e.g. `morocco-fitness-retreat`) is passed to the client, which looks up `RETREATS[slug]`.

---

## 3. Steps in Claude Code (or any editor)

### A. Add the retreat data object

In **`src/components/retreat/retreat-data.ts`**:

1. **Duplicate `PANAMA_RETREAT`** (or the full `RetreatData` object) and rename to e.g. `MOROCCO_RETREAT`, `SICILY_RETREAT`, `COSTA_RICA_RETREAT`, `EL_SALVADOR_RETREAT`.
2. **Set `slug`** to the URL path you want, e.g.:
   - `slug: 'morocco-fitness-retreat'` → `/retreats/morocco-fitness-retreat`
   - `slug: 'sicily-fitness-retreat'` → `/retreats/sicily-fitness-retreat`
   - `slug: 'costa-rica-fitness-retreat'` → `/retreats/costa-rica-fitness-retreat`
   - `slug: 'el-salvador-fitness-retreat'` → `/retreats/el-salvador-fitness-retreat`
3. **Fill every field** with that retreat’s copy, dates, itinerary, room tiers, coaches, FAQs, video IDs, image paths, etc. The **TypeScript type `RetreatData`** at the top of the file is the checklist (all required fields).

### B. Register in `RETREATS`

In the same file, add the new retreat to the **`RETREATS`** object:

```ts
export const RETREATS: Record<string, RetreatData> = {
  'panama-fitness-retreat': PANAMA_RETREAT,
  'morocco-fitness-retreat': MOROCCO_RETREAT,
  'sicily-fitness-retreat': SICILY_RETREAT,
  'costa-rica-fitness-retreat': COSTA_RICA_RETREAT,
  'el-salvador-fitness-retreat': EL_SALVADOR_RETREAT,
};
```

The **key must match `slug`** exactly (and the URL segment).

### C. (Optional) Custom SEO per retreat

In **`src/app/retreats/[slug]/page.tsx`**, extend the `titles` and `descriptions` objects so each retreat has its own meta title and description:

```ts
const titles: Record<string, string> = {
  'panama-fitness-retreat': 'Panama Fitness Retreat 2026 | ...',
  'morocco-fitness-retreat': 'Morocco Fitness Retreat 2026 | ...',
  // etc.
};
const descriptions: Record<string, string> = {
  'panama-fitness-retreat': '...',
  'morocco-fitness-retreat': '...',
  // etc.
};
```

If a slug is missing, the fallback is used (`"Fitness Retreat | SALTY Retreats"` and the generic description).

---

## 4. Retreat-specific details (already wired)

- **Colors:** `src/app/globals.css` already has `[data-retreat="morocco"]`, `[data-retreat="sicily"]`, `[data-retreat="costa-rica"]`, `[data-retreat="el-salvador"]`. The page sets `data-retreat` from `retreat.destination` (e.g. `"Morocco"` → `morocco`), so colors apply automatically.
- **Map:** If the retreat has an Explore section, the map image is loaded from `public/maps/<destination-slug>.svg` (e.g. `morocco.svg`, `sicily.svg`). Add the SVG and (in Sanity) landmarks for that retreat so the section appears.
- **Landmarks:** Fetched by retreat slug in `page.tsx`. In Sanity, create SALTY Landmarks and set **Retreat** to the matching retreat document (slug must align with the page slug you use in `RETREATS`).

---

## 5. Quick checklist per new retreat

- [ ] New `*_RETREAT` object in `retreat-data.ts` (copy Panama, then replace all content).
- [ ] Add entry to `RETREATS` with key = `slug` (e.g. `'morocco-fitness-retreat': MOROCCO_RETREAT`).
- [ ] (Optional) Add `titles[slug]` and `descriptions[slug]` in `page.tsx`.
- [ ] (If using map) Add `public/maps/<destination-slug>.svg` and landmarks in Sanity for that retreat.

Panama is the single source of truth for **structure and data shape**; the other retreats are new data objects following the same pattern.
