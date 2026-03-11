# Interactive Map — Workflow

The **Explore [Destination]** section is the interactive map on retreat detail pages. It appears **after "Where You'll Stay"** (Accommodation) and shows a pannable/zoomable map with pins that open landmark details (SALTY notes, videos, Google Place info).

---

## 1. Where the section lives in code

- **Page:** Retreat detail (`/retreats/[slug]`, e.g. `/retreats/panama-fitness-retreat`).
- **Component:** `DestinationExplorer` in `src/components/shared/DestinationExplorer/`.
- **Placement:** `RetreatDetailClient.tsx` — section **9**, right after **AccommodationBrowser** (Where You'll Stay). The section only renders when there are published landmarks for that retreat.

---

## 2. Where to put the map image (SVG)

| What | Where |
|------|--------|
| **Map SVG file** | `public/maps/<destination>.svg` |

**Naming:** Use the **destination slug** derived from the retreat’s `destination` field (lowercase, spaces → hyphens).

| Retreat destination | Map filename |
|--------------------|-------------|
| Panama | `public/maps/panama.svg` |
| Costa Rica | `public/maps/costa-rica.svg` |
| Sri Lanka | `public/maps/sri-lanka.svg` |
| El Salvador | `public/maps/el-salvador.svg` |
| Morocco | `public/maps/morocco.svg` |
| Sicily | `public/maps/sicily.svg` |
| Nicaragua | `public/maps/nicaragua.svg` |

The app loads the map with:

```ts
src={`/maps/${destination}.svg`}
```

So for Panama, `destination` is `"panama"` → `/maps/panama.svg`. If the file is missing, the image fails gracefully and pins still show on a sand-colored background.

**Current state:** `public/maps/` contains `placeholder.svg`, `template.svg` (copy to create new retreat maps), and `el-salvador.svg`. For other retreats, copy `template.svg` to e.g. `panama.svg` and customize.

---

## 3. Where pin/landmark content lives (Sanity)

Pins and their content are **not** in the repo. They come from **Sanity**:

- **Schema:** `saltyLandmark` (see `src/sanity/schemas/saltyLandmark.ts`).
- **Query:** `landmarksByRetreatSlugQuery` in `src/lib/sanity/queries.ts` — fetches published landmarks for the retreat slug (e.g. `panama-fitness-retreat`).
- **Data flow:** `app/retreats/[slug]/page.tsx` fetches landmarks server-side and passes them to `RetreatDetailClient` as `landmarks`. The map uses that array for pins and list view.

**In Sanity Studio:**

1. Create a **SALTY Landmark** document.
2. Set **Retreat** to the retreat (e.g. Panama Fitness Retreat).
3. Fill **Map Position**: `x` and `y` as **percent of map width/height** (0–100). These position the pin on the SVG.
4. Add name, category, SALTY note, (optional) hero image, Google Place ID, social embeds.
5. Set **Published** to true when ready (publish rules require SALTY note + at least one video or Place ID).

Landmarks are ordered by `sortOrder` in list view.

---

## 4. Summary workflow

**To add the interactive map for a retreat:**

1. **Map image**  
   Create or export your map as SVG. Put it in:
   ```text
   public/maps/<destination-slug>.svg
   ```
   e.g. `public/maps/panama.svg`.

2. **Pins/content**  
   In Sanity Studio, create SALTY Landmark documents for that retreat. For each:
   - Set **Retreat** to the retreat.
   - Set **Map Position** (`x`, `y`) to 0–100 for pin placement.
   - Add SALTY note, category, and (if desired) videos/Place ID.
   - Publish when ready.

3. **Section on the site**  
   No extra code needed. The retreat page already:
   - Fetches landmarks by retreat slug.
   - Renders **Explore [Destination]** after **Where You'll Stay** when `landmarks.length > 0`.
   - Loads `/maps/<destination>.svg` and overlays pins using the landmark coordinates.

**To change section order:** Edit the block order in `src/app/retreats/[slug]/RetreatDetailClient.tsx` (the comments there match the section numbers).

---

## 5. Optional: heading and subheading

The section title and subheading are set in `RetreatDetailClient.tsx`:

```tsx
<DestinationExplorer
  destination={retreat.destination.toLowerCase().replace(/\s+/g, '-')}
  landmarks={landmarks}
  heading={`Explore ${retreat.destination}`}
  subheading="Our favourite spots, tested by sweat and sunsets."
/>
```

Change `heading` or `subheading` there if you want different copy per page or globally.
