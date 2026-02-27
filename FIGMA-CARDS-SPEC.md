# CARDS Page — Complete Figma Specification

**3 card components to build:** RetreatCard, CoachCard, TestimonialCard.
Every variant, every state, and exactly how to build each one.

---

## Figma Page Setup

**Page name:** `Components / Cards`

**Frames (sections) on the page:**

1. `RetreatCard` — all variants and states
2. `CoachCard` — all variants and states
3. `TestimonialCard` — all variants and states

**Within each section, use this layout:**

```
[Component Name]
├── Anatomy (exploded view showing layers)
├── Variants (all retreat/coach color versions)
├── States (default, hover, focus, sold-out, etc.)
├── Responsive (desktop, tablet, mobile)
└── Specs (spacing, type, colors annotated)
```

---

## 1. RetreatCard

Retreat cards are ALWAYS vertical (portrait). Same base dimensions as Coach Cards.

### Dimensions

| Breakpoint | Card Width | Image Aspect | Cards Per Row |
|---|---|---|---|
| Desktop (lg+) | ~376px (3-column grid, 24px gap within 1200px container) | 3:4 portrait | 3 |
| Tablet (md) | ~50% viewport minus gaps | 3:4 portrait | 2 |
| Mobile (<md) | Full width minus 32px padding | 3:4 portrait | 1 |

### Anatomy (layers, top to bottom)

```
RetreatCard (Auto Layout: Vertical)
├── ImageContainer (3:4 aspect, position: relative)
│   ├── Photo (fill, object-fit: cover)
│   ├── StatusBadge (absolute, top-left, 12px inset)
│   └── ImageHoverOverlay (opacity 0 → visible on hover, for Phase 2 video)
├── ContentArea (Auto Layout: Vertical, padding: 16px desktop / 16px mobile)
│   ├── OfficialName (TAN Headline, type/h4: 18px mobile / 22px desktop, uppercase)
│   ├── DestinationDates (Roca, type/body-sm: 12px/14px, Slate Grey)
│   ├── Spacer (8px)
│   └── PriceRow (Roca, type/body-base, bold)
│       └── "From $XXX/day"
└── BottomBorder (0px default → 3-4px on hover, retreat accent color)
```

### Figma Build Tips

**Auto Layout:** Set the top-level frame to vertical auto layout, fill container width. The card stretches to fit whatever grid it sits in.

**Image container:** Use a frame with fixed aspect ratio. In Figma, set constraints to "Scale" and clip content. Set fill to your placeholder image. The 3:4 portrait ratio means if the card is 376px wide, the image is 501px tall.

**Corner radius:** `16px` on the entire card frame. The image frame gets `16px` top-left and top-right, `0px` bottom. Click the individual corner radius icon in Figma to set per-corner values.

**Shadow (resting):** Two drop shadows stacked on the card frame:
- `X: 0, Y: 1, Blur: 3, rgba(30,25,20,0.06)`
- `X: 0, Y: 1, Blur: 2, rgba(30,25,20,0.04)`

**No border by default.** Cards use shadow only for resting depth.

### Variants (7 retreat colors)

Create a component property `retreat` with these values. The retreat color only affects the hover bottom border — everything else stays consistent.

| Variant | Bottom Border Hover Color | Accent Hex |
|---|---|---|
| Sri Lanka | Warm Coral | `#F75A3D` |
| Panama | Rust Red | `#C74235` |
| Morocco | Warm Coral | `#F75A3D` |
| Sicily | Rust Red | `#C74235` |
| El Salvador | Aquamarine | `#A4E5D9` |
| Costa Rica | Sky Blue | `#B6D4EA` |
| Nicaragua | Golden Sun | `#FED260` |

### States (4)

Create a variant property `state` with these values. Each state is a different cell in your component set.

#### Default

The base component. Shadow/sm applied, no bottom border, image at rest.

#### Hover

How to achieve in Figma:

1. Duplicate the default variant
2. Move the entire card frame UP 3px (adjust Y position by -3) to simulate `translateY(-3px)`
3. Change shadow to `shadow/md` values: `0, 4, 12, rgba(30,25,20,0.08)` and `0, 2, 4, rgba(30,25,20,0.04)`
4. Add a 3-4px bottom border — either use a bottom stroke on the card frame or add a thin rectangle at the bottom, filled with the retreat accent color
5. Scale the image frame to 103% to simulate `scale(1.03)` — select the photo layer, set width/height to 103% and make sure the parent clips overflow
6. Wire the prototype interaction: select default variant → While Hovering → Change To → hover variant → Smart Animate, 250ms, Ease Out

#### Focus

For keyboard accessibility:

1. Duplicate default
2. Add an outer stroke: 2px `#0E3A2D` Dark Teal, outside alignment, with 2px offset gap

#### Sold Out

The card stays full-color — NO greyscale, NO dark overlay:

1. Duplicate default
2. Make StatusBadge visible with `sold-out` variant (Rust Red pill)
3. CTA text (if shown) changes to "Join Waitlist"
4. Card serves as social proof even when sold out

### StatusBadge Overlay

Sits inside `ImageContainer`, positioned absolute top-left with 12px inset. Build StatusBadge as its own component first, then instance it inside RetreatCard. Toggle visibility via a boolean property `showBadge`.

| Badge | Background | Text Color | Extra |
|---|---|---|---|
| Selling Fast | `#F75A3D` Coral | `#F7F4ED` Paper White | — |
| Sold Out | `#C74235` Rust Red | `#F7F4ED` Paper White | — |
| New Trip | `#B6D4EA` Sky Blue | `#0E3A2D` Dark Teal | — |
| Early Bird | `#FED260` Golden Sun | `#0E3A2D` Dark Teal | Strikethrough original price |

**Badge shape:** Pill (border-radius 9999px). Padding: 6px horizontal, 16px vertical. Font: Roca, `type/label` (12px/14px), weight 700.

### Typography

| Element | Font | Token | Size (mobile/desktop) | Weight | Color | Transform |
|---|---|---|---|---|---|---|
| Official Name | TAN Headline | type/h4 | 18px / 22px | 700 | `#0E3A2D` Dark Teal | UPPERCASE |
| Destination + Dates | Roca | type/body-sm | 12px / 14px | 400 | `#4A4E58` Slate Grey | None |
| Price | Roca | type/body-base | 14px / 16px | 700 | `#0E3A2D` Dark Teal | None |

**Text alignment:** Always left-aligned on retreat cards (design system rule 4.3).

---

## 2. CoachCard

### Dimensions

Same grid as RetreatCard: 3 per row desktop (~376px), 2 tablet, 1 mobile. Portrait orientation (3:4 photo).

### Anatomy (layers, top to bottom)

```
CoachCard (Auto Layout: Vertical)
├── PhotoFrame (frame with thick colored border)
│   ├── Photo (3:4, fill, object-fit: cover)
│   ├── NameOverlay (absolute, bottom area of photo)
│   │   ├── BrandIllustration (starburst/stamp SVG, behind text)
│   │   └── CoachName (TAN Headline, Paper White, type/h3)
│   └── HoverState (opacity 0 default)
│       ├── SandBackground (#E7D7C0, full fill)
│       ├── CoachName (TAN Headline, Dark Teal, type/h3)
│       └── BioParagraph (Roca, type/body-base, Dark Teal)
└── SpecialtyBar (same color as frame border)
    └── Disciplines + Personality (TAN Headline, type/label, uppercase)
```

### Figma Build Tips

**Photo frame border:** Create the outer frame at card width, set padding to 6-8px (this creates the "border" effect), then place the photo frame inside with fill. Set the outer frame's fill to the coach's assigned color. This gives you a thick colored frame around the photo without using strokes.

**Name overlay on photo:** Position a text layer at the bottom of the photo area. Use TAN Headline in Paper White. Behind the text, place a brand illustration element (starburst, stamp, or other SALTY graphic) as an SVG. This illustration should be semi-transparent or blend subtly — it's decorative, not a solid background.

**Specialty bar:** A full-width strip below the photo frame, same color as the frame border. Contains the coach's discipline list (e.g., "HIIT / YOGA / HYPE MAN") in TAN Headline, `type/label` size, uppercase.

**Hover flip (photo → Sand + bio):** Create two variants in the component set. In the `hover` variant, the photo layer's visibility is turned off and the Sand fill + bio text layers are visible. Wire the prototype: `While Hovering → Change To (hover variant)` with Smart Animate (250ms). Test in Present mode.

### Variants (per-coach colors)

Each coach gets a fixed color for their frame and specialty bar. Create a variant property `coachColor`.

| Coach Color | Frame/Bar Fill | Text on Bar | Notes |
|---|---|---|---|
| Coral | `#F75A3D` | `#0E3A2D` Dark Teal | Light surface |
| Sky Blue | `#B6D4EA` | `#0E3A2D` Dark Teal | Light surface |
| Golden Sun | `#FED260` | `#0E3A2D` Dark Teal | Light surface |
| Aquamarine | `#A4E5D9` | `#0E3A2D` Dark Teal | Light surface |
| Rust Red | `#C74235` | `#F7F4ED` Paper White | Dark surface |
| Palm Green | `#3A6B35` | `#F7F4ED` Paper White | Dark surface |

**Text color rule:** Check the surface classification (Section 2.4 of DESIGN-SYSTEM-RULES.md). If the coach color is a LIGHT surface, use Dark Teal text. If DARK surface, use Paper White text.

### States (3)

| State | What Changes | How to Build in Figma |
|---|---|---|
| **Default** | Photo visible, name overlay at bottom, specialty bar visible | Base component |
| **Hover** (desktop) | Photo fades to Sand (`#E7D7C0`) background, coach name stays (now Dark Teal), bio paragraph appears | Create variant `state=hover`. Turn off photo layer, turn on Sand fill + bio layers. Prototype: While Hovering → Change To → Smart Animate, 250ms, Ease Out |
| **Tap/Focus** (mobile) | Opens modal with full bio | Show as separate frame: modal overlay with coach bio. Prototype: On Tap → Open Overlay |

### Typography

| Element | Font | Token | Size (mobile/desktop) | Weight | Color | Transform |
|---|---|---|---|---|---|---|
| Coach Name (on photo) | TAN Headline | type/h3 | 22px / 32px | 700 | `#F7F4ED` Paper White | UPPERCASE |
| Coach Name (hover state) | TAN Headline | type/h3 | 22px / 32px | 700 | `#0E3A2D` Dark Teal | UPPERCASE |
| Bio Paragraph | Roca | type/body-base | 14px / 16px | 400 | `#0E3A2D` Dark Teal | None |
| Specialty Bar | TAN Headline | type/label | 12px / 14px | 500 | Per surface classification | UPPERCASE |

---

## 3. TestimonialCard

### Dimensions

Flexible width — used in carousels and grids. Typical: ~376px in 3-column grid, or wider in 2-column layouts.

### Anatomy

```
TestimonialCard (Auto Layout: Vertical, padding: 24px)
├── StarRow (5 star icons, 16px each, Golden Sun #FED260 fill)
├── Spacer (12px)
├── QuoteText (Roca, type/body-base, Dark Teal, italic)
│   └── Optional: decorative quotation marks in TAN Headline at 10-15% opacity
├── Spacer (16px)
└── Attribution (Auto Layout: Horizontal)
    ├── Avatar (40px circle, 1:1, optional)
    ├── Spacer (12px)
    └── NameBlock (Auto Layout: Vertical)
        ├── GuestName (Roca, type/body-base, bold, Dark Teal)
        └── RetreatAttended (Roca, type/body-sm, Slate Grey)
```

### Figma Build Tips

**Background:** Paper White `#F7F4ED` or Warm Light `#F0E8DB` depending on the section. Set as variant property.

**Stars:** Create a small star component (16x16px SVG). Fill with `#FED260` Golden Sun. Instance 5 in horizontal auto-layout with 4px gap. For partial ratings (e.g., 4.5), create a half-filled variant (left half Golden Sun, right half transparent with stroke).

**Quotation marks:** Optional decorative flourish — large TAN Headline quotation marks at 10-15% opacity, positioned behind the quote text using absolute constraints (not auto-layout). Adds brand character.

**Avatar fallback:** If no photo available, show initials (first letter of first and last name) on a Sand `#E7D7C0` circle background in Dark Teal, Roca bold.

**Corner radius:** `16px`. Shadow: `shadow/sm` at rest. No borders.

### Variants

| Property | Values | Notes |
|---|---|---|
| `surface` | `base`, `warm-light`, `dark` | Controls background and text colors |
| `hasAvatar` | `true`, `false` | Toggles avatar visibility |

The `dark` surface variant (`#1F4638` Dark Raised background) is for testimonials in dark sections like the homepage "What People Say." Text colors swap to Paper White / Sand.

### States (2)

| State | What Changes | How to Build |
|---|---|---|
| **Default** | As designed | Base component |
| **Focus** | 2px outline — Dark Teal (light) or Paper White (dark) | Add outer stroke |

Testimonial cards are read-only content cards. No hover state needed.

### Typography

| Element | Font | Token | Size (mobile/desktop) | Weight | Color (light surface) | Color (dark surface) |
|---|---|---|---|---|---|---|
| Stars | SVG icon | — | 16px | — | `#FED260` fill | `#FED260` fill |
| Quote | Roca | type/body-base | 14px / 16px | 400, italic | `#0E3A2D` | `#F7F4ED` |
| Guest Name | Roca | type/body-base | 14px / 16px | 700 | `#0E3A2D` | `#F7F4ED` |
| Retreat Attended | Roca | type/body-sm | 12px / 14px | 400 | `#4A4E58` | `#E7D7C0` |

---

## General Figma Best Practices for All Cards

### Layer Naming Convention

Use this pattern consistently:

```
ComponentName / variant=value, state=value
```

Examples:
- `RetreatCard / retreat=Panama, state=default`
- `RetreatCard / retreat=Panama, state=hover`
- `CoachCard / coach=CoachA, state=default`
- `CoachCard / coach=CoachA, state=hover`
- `TestimonialCard / surface=dark, hasAvatar=true`

Inside each component, name layers descriptively:
- `ImageContainer`, `Photo`, `StatusBadge`, `ContentArea`, `OfficialName`, `DestinationDates`, `PriceRow`, `BottomBorder`
- **Never** leave layers as `Frame 1`, `Rectangle 5`, etc.

### Component Properties to Set Up

**RetreatCard:**
- `retreat` (variant): Sri Lanka, Panama, Morocco, Sicily, El Salvador, Costa Rica, Nicaragua
- `state` (variant): default, hover, focus, sold-out
- `status` (variant): none, selling-fast, sold-out, new-trip, early-bird
- `showBadge` (boolean): true / false

**CoachCard:**
- `coachColor` (variant): coral, sky-blue, golden-sun, aquamarine, rust-red, palm-green
- `state` (variant): default, hover

**TestimonialCard:**
- `surface` (variant): base, warm-light, dark
- `hasAvatar` (boolean): true, false

### How to Build Hover States in Figma

1. **Create the component set** — select all variants, right-click → "Combine as Variants"
2. **Add a variant property** called `state` with values `default` and `hover`
3. **In the `hover` variant**, make the visual changes (shadow, position, border, etc.)
4. **In the Prototype panel**, select the `default` variant, add interaction: While Hovering → Change To → hover variant. Animation: Smart Animate, 250ms, Ease Out
5. **Test in Present mode** — hover your mouse and it will swap between variants

### Spacing Reference

| Token | Value (mobile / desktop) |
|---|---|
| Card internal padding | 16px / 24px |
| Grid gap between cards | 16px / 24px |
| Space between image and content | 0px (flush, auto-layout) |
| Stack between text elements | 8px / 12px |
| Badge inset from image edge | 12px |
| Photo frame border (CoachCard) | 6-8px |

### Checklist Before Sharing with Cursor

- [ ] All variants are in a single component set
- [ ] Layer names are descriptive (no "Frame 1")
- [ ] Auto layout is used (not absolute positioning for main structure)
- [ ] Colors use the exact hex values from DESIGN-SYSTEM-RULES.md
- [ ] Typography uses TAN Headline for headings, Roca for body
- [ ] All heading text is UPPERCASE
- [ ] Shadow values match the design system tokens exactly
- [ ] Corner radius is 16px on all cards
- [ ] StatusBadge is pill-shaped (radius 9999px)
- [ ] Hover prototypes are wired with Smart Animate
- [ ] A dark-surface variant exists for TestimonialCard
- [ ] RetreatCard image aspect ratio is 3:4 (portrait, always)
- [ ] CoachCard photo frame border is 6-8px thick

When each card is finished, share the Figma URL here and it will be extracted, built in code, and all retreat/coach variants generated programmatically.
