# Ciambella Yogurt — Style Guide Redesign

## Overview

Redesign the existing recipe site to strictly follow the project's `Style guide.md`. Single-page layout: the recipe opens directly on `index.html` with no gallery/index page.

## Site Structure

```
ciambella yougurt_ricetta/
├── index.html              ← single recipe page (Ciambella allo Yogurt)
├── css/
│   └── style.css           ← fully redesigned stylesheet
└── js/
    └── script.js           ← scroll animations, hover effects
```

## Visual Design

### Palette
- Background: `#f0eded`
- Text: `#1f0001`
- No additional colors for backgrounds, borders, or layout elements — the page is monochrome except for ingredient stickers.

### Sticker Colors (ingredients only)
- `#f2f26b` (yellow)
- `#f58a3d` (orange)
- `#ff5ec1` (magenta)
- `#50e664` (green)

These 4 colors cycle across active ingredients. Optional ingredients use yellow/orange (disabled style).

### Typography
- **H1** (site title): Zalando Sans Expanded, Regular 400, 30px — `#1f0001`
- **H2** (recipe name): Zalando Sans Expanded, Light 300, 60px — `#1f0001`
- **Body** (chef, steps, descriptions): Zalando Sans Expanded, Regular 500, 22px — `#1f0001`
- **Caption** (meta info like temp/time, footer): VT323, Regular 200, 16px — `#1f0001`

### Interactive States
- Caption text: hover underline
- Sticker chips: `transform: scale(1.1)` on hover
- Sticker chips: default color → accent (magenta/green) on hover

## Page Layout

### Header
- Site title "Le Ricette di Jennifer" (H1)
- Thin decorative divider below (solid line, `#1f0001`)

### Recipe Hero
- Recipe name "Ciambella allo Yogurt" (H2)
- Chef byline "Chef: Jennifer" (Body)
- Meta row: "180° C · 30 min" (Caption) with hover underline

### Ingredients Section
- Label "Ingredienti" (Body, bold)
- Chips grid: each ingredient is a rounded chip with a sticker color background and white/black text
- 7 active ingredients cycle through the 4 sticker colors
- 2 optional ingredients use yellow/orange (disabled aesthetic)
- On hover: scale(1.1), color shifts toward magenta/green accent

### Preparation Section
- Label "Preparazione" (Body, bold)
- Numbered list of 10 steps (Body, 22px)
- Numbers styled as circled indicators in `#1f0001`

### Footer
- "Le Ricette di Jennifer © 2026" (Caption, 16px, hover underline)

## Implementation Order

1. Rewrite `css/style.css` with new color variables, font imports, and layout
2. Update `js/script.js` for scroll-triggered reveal animations
3. Rewrite `index.html` with single-recipe layout
4. Verify all styles match the style guide
