# Top-Up Platform — Design System

A dark, gaming-focused UI theme built around a deep charcoal base with teal/emerald
accents for primary actions and success states, and violet as a secondary accent
for identity/profile elements.

---

## 1. Color Palette

### Base / Surfaces
| Token | Hex | Usage |
|---|---|---|
| `--bg-app` | `#0B0F14` | Page background (outermost) |
| `--bg-sidebar` | `#0D1218` | Left sidebar background |
| `--bg-navbar` | `#11161D` | Top navbar background |
| `--bg-surface` | `#141A22` | Default card background |
| `--bg-surface-alt` | `#171D26` | Table rows, list items, inputs |
| `--bg-surface-raised` | `#1B222C` | Hover / raised card state |
| `--border-subtle` | `#232B36` | Card borders, dividers |
| `--border-strong` | `#2E3844` | Input borders, focus outlines (inactive) |

### Brand / Accent
| Token | Hex | Usage |
|---|---|---|
| `--accent-teal` | `#14B8A6` | Primary accent (headings, links, active nav, progress) |
| `--accent-teal-dark` | `#0D9488` | Gradient end, pressed states |
| `--accent-teal-bg` | `#0F2E2A` | Stat card / badge background tint |
| `--accent-violet` | `#7C3AED` | Avatar badge, profile card gradient accent |
| `--accent-violet-soft` | `#3B2A5C` | Profile card background gradient |

### Status
| Token | Hex | Usage |
|---|---|---|
| `--status-success` | `#10B981` | Success banner, "Success" badge |
| `--status-success-bg` | `#0E3B2E` | Success badge background |
| `--status-fail` | `#F43F5E` | "Failed" badge, destructive actions |
| `--status-fail-bg` | `#3A1220` | Failed badge background |
| `--status-pending` | `#F59E0B` | Pending / processing indicators |

### Text
| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#F5F7FA` | Headings, primary values (₱10.00, "2") |
| `--text-secondary` | `#9AA5B1` | Labels, muted copy ("Total Order", "Member") |
| `--text-tertiary` | `#6B7684` | Placeholder text, timestamps, footer copy |
| `--text-on-accent` | `#FFFFFF` | Text on teal/violet fills |
| `--text-danger` | `#F43F5E` | Logout link, destructive text |

---

## 2. Typography

Font family: **Inter** (or system-ui fallback: `-apple-system, "Segoe UI", Roboto, sans-serif`)

| Style | Size | Weight | Line-height | Usage |
|---|---|---|---|---|
| Display | 28px | 700 | 1.2 | Balance amount ("₱10.00") |
| H1 | 22px | 700 | 1.3 | Section titles ("Info Profile", "Transaction Overview") |
| H2 | 17px | 600 | 1.4 | Card titles ("Hello, Flappy") |
| Stat Number | 32px | 700 | 1.1 | Stat card figures ("2", "0", "1") |
| Body | 14px | 400 | 1.5 | Table content, descriptions |
| Label | 12px | 500 | 1.4 | Uppercase micro-labels ("MAIN MENU", "HISTORY", table headers) — letter-spacing 0.06em |
| Caption | 12px | 400 | 1.4 | Timestamps, secondary meta ("Sep 15, 2025") |

---

## 3. Spacing & Layout

- **Base unit:** 4px grid (4 / 8 / 12 / 16 / 24 / 32)
- **Page padding:** 24px
- **Card padding:** 20–24px
- **Card border-radius:** 16px (large cards), 12px (stat cards/badges), 8px (buttons, inputs)
- **Sidebar width:** 240px, fixed
- **Navbar height:** 64px
- **Grid gap between cards:** 16px

### Structure
```
┌─────────────────────────────────────────────┐
│ Navbar (logo, search, nav links, wallet)     │
├───────────┬───────────────────────────────────┤
│ Sidebar   │ Success banner (dismissible)       │
│ - User    │ Info Profile                       │
│   summary │  ┌─────────────────┐ ┌──────────┐ │
│ - Main    │  │ Profile card    │ │ Balance  │ │
│   Menu    │  └─────────────────┘ └──────────┘ │
│ - History │ Transaction Overview                │
│ - Top Up  │  [Total][Pending][Processing][OK]  │
│ - Logout  │ Recent Transactions (table)          │
├───────────┴───────────────────────────────────┤
│ Footer (brand, links, copyright)               │
└─────────────────────────────────────────────┘
```

---

## 4. Components

### 4.1 Navbar
- Background `--bg-navbar`, bottom border `--border-subtle`.
- Left: wordmark/logo, bold, `--text-primary`.
- Center: pill-shaped search input, `--bg-surface-alt` fill, `--border-subtle` outline, magnifier icon in `--text-tertiary`.
- Nav links (Popular, New Games, Gift Cards): `--text-secondary`, hover → `--text-primary`.
- Right: notification bell icon, circular avatar with teal ring, username + wallet balance stacked (12px), small teal wallet icon.

### 4.2 Sidebar
- Background `--bg-sidebar`.
- User block at top: name (`--text-primary`, 15px/600), role tag below in `--text-secondary` (11px).
- Section labels ("MAIN MENU", "HISTORY"): `--text-tertiary`, 11px, uppercase, letter-spacing 0.08em, margin-top 24px.
- Nav item (default): 40px height, `--text-secondary`, icon + label, 10px border-radius.
- Nav item (active, e.g. "Dashboard"): filled background `--accent-teal-bg` → actually a solid violet/teal tinted pill per screenshot (`#1D2733` with teal left accent) with `--accent-teal` icon + `--text-primary` label, subtle left border-radius pill.
- "Logout": `--text-danger`, separated at bottom, no fill.

### 4.3 Success / Status Banner
- Full-width, `border-radius: 12px`, background gradient `--status-success` → `--accent-teal-dark` at low opacity over `--status-success-bg`, left icon (check circle), text `--text-on-accent`/`#E9FFF7`, dismiss "×" on the right in muted white.

### 4.4 Profile Card
- Background: subtle diagonal gradient from `--accent-violet-soft` to `--bg-surface` (dark plum → charcoal).
- Avatar: 48px circle, flat `--accent-teal` fill, white bold initials.
- Name: H2 style, `--text-primary`.
- "Member" tag: small pill, `--accent-violet` background at 20% opacity, `--accent-violet` text, 11px, border-radius 999px.
- Phone/ID row: `--text-secondary`, icon prefixed.
- Settings gear icon: top-right, circular ghost button, `--bg-surface-alt` fill on hover.

### 4.5 Balance Card
- Background `--bg-surface`, border `--border-subtle`.
- Label "Your Balance": `--text-secondary`, 12px.
- Amount: Display style, `--text-primary`.
- Bottom accent: thin horizontal progress/divider bar in `--accent-teal`, rounded, ~40% width (decorative brand accent).

### 4.6 Stat Cards (Transaction Overview)
- 4-column grid, equal width, gap 16px.
- Background `--accent-teal-bg` (dark teal tint) for all four, uniform styling regardless of value.
- Number: Stat Number style, `--text-primary`, bold.
- Label below: `--text-secondary`, 12px, e.g. "Total Order", "Pending", "Processing", "Success".
- Border-radius 12px, padding 20px.

### 4.7 Recent Transactions Table
- Container: `--bg-surface`, radius 16px, padding 0 (header row + rows inset).
- "View All →" link top-right: `--accent-teal`, 13px/500.
- Header row: `--text-tertiary`, 12px uppercase, letter-spacing, bottom border `--border-subtle`.
- Row: 56–64px height, hover → `--bg-surface-raised`.
  - Game icon: 32px rounded-square thumbnail.
  - Game name: `--text-primary`, 14px/500; sub-line (item/date): `--text-tertiary`, 12px.
  - Amount: `--text-primary`, 14px/500, right-aligned column.
  - Status badge (right): pill, radius 999px, padding 4px 10px, 11px/600.
    - Success → bg `--status-success-bg`, text `--status-success`, small dot prefix.
    - Failed → bg `--status-fail-bg`, text `--status-fail`.

### 4.8 Footer
- Background: near-black `#080B0F`, top border `--border-subtle`.
- Left: "Top-Up" wordmark/button style logo on teal chip.
- Center links: Terms of Service / Privacy Policy / Refund Policy / Contact Us — `--text-secondary`, 13px, hover `--text-primary`.
- Right: copyright, `--text-tertiary`, 12px.

---

## 5. Buttons

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--accent-teal` → `--accent-teal-dark` gradient | white | none | Top Up, Confirm, Submit |
| Secondary | transparent | `--text-primary` | `--border-strong` | Cancel, secondary actions |
| Ghost/Icon | transparent | `--text-secondary` | none | Settings gear, bell, close (×) |
| Danger | transparent | `--status-fail` | `--status-fail` (on hover fill 10%) | Delete, Logout confirm |

- Height: 40px (default), 36px (compact/table actions).
- Border-radius: 8px (rectangular buttons), 999px (pill badges/tags).
- Font: 14px/600.

---

## 6. Iconography
- Line-style icons, 18–20px, stroke width 1.5–2px.
- Default color `--text-secondary`; active/accent state uses `--accent-teal`.
- Suggested set: Lucide / Feather icons (dashboard, settings, credit-card, history, arrow-up-circle, log-out, search, bell, chevron-right, check-circle, x, phone).

---

## 7. Elevation & Effects
- Cards: no heavy shadows (dark UI); rely on subtle border `--border-subtle` + slight background contrast.
- Optional soft glow on primary CTA: `box-shadow: 0 0 24px rgba(20,184,166,0.25)`.
- Transitions: `150ms ease` for hover/background changes, `200ms ease` for panel/menu open.

---

## 8. Design Tokens (CSS Variables)

```css
:root {
  /* Surfaces */
  --bg-app: #0B0F14;
  --bg-sidebar: #0D1218;
  --bg-navbar: #11161D;
  --bg-surface: #141A22;
  --bg-surface-alt: #171D26;
  --bg-surface-raised: #1B222C;
  --border-subtle: #232B36;
  --border-strong: #2E3844;

  /* Accent */
  --accent-teal: #14B8A6;
  --accent-teal-dark: #0D9488;
  --accent-teal-bg: #0F2E2A;
  --accent-violet: #7C3AED;
  --accent-violet-soft: #3B2A5C;

  /* Status */
  --status-success: #10B981;
  --status-success-bg: #0E3B2E;
  --status-fail: #F43F5E;
  --status-fail-bg: #3A1220;
  --status-pending: #F59E0B;

  /* Text */
  --text-primary: #F5F7FA;
  --text-secondary: #9AA5B1;
  --text-tertiary: #6B7684;
  --text-on-accent: #FFFFFF;
  --text-danger: #F43F5E;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Font */
  --font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif;
}
```

---

## 9. Usage Notes
- Reserve teal for primary brand actions, active states, and positive/success indicators.
- Use violet sparingly — only for identity/profile accents (avatar fill alternative, "Member" tag) to avoid competing with teal as the primary accent.
- Keep contrast high: body text should stay at or above `--text-secondary` on any surface for accessibility.
- All interactive rows/cards should have a visible hover state (`--bg-surface-raised`) since the base theme is very dark.
