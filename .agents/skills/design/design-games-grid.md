# DGC — Games Grid Page (Design Spec)

Extends the base `design.md` theme. Same tokens (colors, radius, font) apply —
this file only documents the new sections: **filter pills** and **game card grid**.
Reference `design.md` section 8 for all CSS variables used below.

---

## 1. Filter Pill Row

Horizontal scrollable row below the navbar, above the section title.

| Property | Value |
|---|---|
| Container | flex row, gap 10px, overflow-x auto, no scrollbar visible |
| Pill (default) | bg `--bg-surface-alt`, text `--text-secondary`, border `--border-subtle` |
| Pill (active) | bg `--bg-surface-raised`, text `--text-primary`, border `--border-strong` |
| Dot prefix | 6px circle, `--accent-teal`, left of label, margin-right 6px |
| Height | 32px |
| Padding | 8px 14px |
| Border-radius | `--radius-pill` (999px) |
| Font | 13px / 500 |

Labels (example set): Popular, New games, Gacha games, Other games, Gift Cards,
Other Regions, Entertainment.

---

## 2. Section Header

- Title ("Popular"): H1 style from base spec (22px/700, `--text-primary`).
- Margin: 24px top (from pill row), 16px bottom (to grid).

---

## 3. Game Card — Template

This card is the **reusable template**. The artwork area is a fixed-ratio image
slot meant for imported assets (game key art, box art, gift card art, etc.) —
not a generated graphic. Treat it like a product-image component.

### Structure
```
┌───────────────────────────┐
│                     [-8%]  │ ← image slot, 4:5 ratio, discount badge top-right
│         <IMPORTED          │
│           IMAGE>            │
│                             │
├───────────────────────────┤
│ Game Title                 │ ← 14px/600, --text-primary, 1 line, ellipsis
│ ★ 0  ()                    │ ← 12px, --text-tertiary, rating + review count
└───────────────────────────┘
```

### Card Spec
| Property | Value |
|---|---|
| Card container | bg `--bg-surface`, border `--border-subtle`, radius `--radius-md` (12px), overflow hidden |
| Image slot | aspect-ratio 4/5, `object-fit: cover`, full card width, no padding |
| Image placeholder (no asset yet) | bg `--bg-surface-alt`, centered game name text, `--text-tertiary`, 13px |
| Discount badge | top-right, 8px inset, bg `--accent-teal`, text white, 11px/700, padding 2px 8px, radius `--radius-pill` |
| Content padding | 10px 12px |
| Title | `--text-primary`, 14px/600, single line + `text-overflow: ellipsis` |
| Rating row | icon (filled star, `#F59E0B`) + "0" (`--text-secondary`) + "()" review count (`--text-tertiary`), 12px, gap 4px |
| Hover state | border → `--border-strong`, slight `transform: translateY(-2px)`, transition 150ms ease |
| Click target | entire card is a link/button |

### Import Slot Notes (for integration)
- Expected asset path pattern: `/assets/games/{slug}.jpg` (or `.png`/`.webp`).
- Recommended source resolution: **480×600px** minimum (4:5), compressed to web (<150KB).
- If no image is provided, render the **placeholder variant** (bg fill + name text) so layout never breaks.
- Badge (`-8%`, `-38%`, etc.) is optional per card — omit the badge element entirely when a game has no discount, don't render an empty badge.
- Some cards use a full-bleed **promo banner style** instead of product art (e.g. "MLBB Verified Squad Rental") — same slot, same ratio, just a different imported image; no separate component needed.

---

## 4. Grid Layout

| Breakpoint | Columns | Gap |
|---|---|---|
| Desktop (≥1200px) | 7 | 16px |
| Laptop (900–1199px) | 5 | 14px |
| Tablet (600–899px) | 3 | 12px |
| Mobile (<600px) | 2 | 10px |

- Grid container max-width matches page content width (aligned with navbar/footer padding, 24px side margins).
- Cards are equal width, height auto (determined by 4:5 image + content block).

---

## 5. Component Checklist (for build)

- [ ] Filter pill row (scrollable, active state)
- [ ] Section title ("Popular")
- [ ] Game card component with image **prop/slot** (not hardcoded per game)
- [ ] Placeholder fallback when image prop is empty
- [ ] Discount badge (conditional render)
- [ ] Responsive grid per breakpoints above
- [ ] Card hover/focus state
- [ ] Card acts as full clickable link to game/top-up page

---

## 6. Data Shape (suggested)

```json
{
  "slug": "valorant",
  "title": "Valorant",
  "image": "/assets/games/valorant.jpg",
  "discountPercent": 8,
  "rating": 0,
  "reviewCount": 0,
  "category": "popular"
}
```

Card component should render purely from this shape — swapping `image` is the
only step needed to bring in real art per game.
