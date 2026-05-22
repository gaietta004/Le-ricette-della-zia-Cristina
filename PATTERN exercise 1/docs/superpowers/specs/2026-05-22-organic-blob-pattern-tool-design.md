# Organic Blob Pattern Tool — Design Spec

## Overview
A single-page web tool that generates an 800×800 repeating pattern from 3 organic closed bezier shapes. Shapes are plain black (`#1f0001`), no stroke, rendered on a `#f0eded` background. The UI follows Style guide 1.

## Style Guide Applied

| Element | Rule |
|---------|------|
| Background | `#f0eded` |
| Text | `#1f0001` |
| Headings (H1) | Zalando Sans Expanded, Regular 400, 30px |
| Labels (H2) | Zalando Sans Expanded, Light 300, 60px |
| Body/labels | Zalando Sans Expanded, Regular 500, 22px |
| Numeric values | VT323, Regular 200, 16px |
| Hover (labels/buttons) | text-decoration: underline |
| Hover (export buttons) | transform: scale |
| Accent sticker colors | #f2f26b, #f58a3d, #ff5ec1, #50e664 (UI accents) |

## Shape Generation

All 3 shapes are closed cubic bezier curves (no cusp vertices, smooth C1-continuous joins at every anchor point).

**Bezier engine:** Given N anchor points in polar coords `{angle, distance}`, convert to Cartesian, then compute cubic bezier control points from neighboring anchors such that the curve passes through each anchor smoothly. The control point formula:

```
c1[i] = p[i] + (p[i+1] - p[i-1]) * t
c2[i] = p[i+1] - (p[i+2] - p[i]) * t
```

where `t = 0.2 + roundness * 0.3` — higher roundness = more pronounced curvature.

**Roundness slider (per shape):** Controls `t` value (0 → near-linear segments, 1 → maximum curvature). At 0%, shape approaches a regular polygon. At 100%, shape is maximally bulbous/organic.

**Shape definitions** — each with 4–8 anchor points at distinct angles with varying radial distances to ensure irregular, organic silhouettes:

- **Shape 1:** ~5-6 anchors, wide/rounded profile
- **Shape 2:** ~6-7 anchors, asymmetrical/lopsided profile
- **Shape 3:** ~4-5 anchors, compact/angular-but-rounded profile

## Controls

| Control | Range | Default |
|---------|-------|---------|
| Roundness 1 | 0–100 | 40 |
| Roundness 2 | 0–100 | 40 |
| Roundness 3 | 0–100 | 40 |
| Size 1 | 50–150 | 100 |
| Size 2 | 50–150 | 100 |
| Size 3 | 50–150 | 100 |
| Rotation 1 | 0–360 | 0 |
| Rotation 2 | 0–360 | 0 |
| Rotation 3 | 0–360 | 0 |
| Spacing | 0–100 | 30 |
| Scale | 25–200 | 100 |

All controls update the SVG in real-time via `input`/`change` events.

## Tiling & Layout

- The 3 shapes sit at vertices of an equilateral reference triangle
- Triangle tiles across 800×800 canvas using offset-row tiling
- **Overlap prevention:** compute per-shape bounding radius = `baseSize × size/100 × scale/100`. Minimum triangle side = `max(r0+r1, r1+r2, r2+r0) + spacing`. Shapes never touch.
- Pattern centered on canvas, tiles outward with buffer rows/cols for full coverage

## Tech Stack

- **Single file:** `index.html` with inline CSS and JS
- SVG rendered in DOM via `<svg>` and `<path>` elements
- Vanilla JS, no frameworks or build step

## Export

- **SVG:** Serialize `<svg>` outerHTML, download as `pattern.svg`
- **PNG:** Render SVG onto hidden 800×800 `<canvas>`, `toBlob()`, download as `pattern.png`

## File Structure

```
index.html
docs/superpowers/specs/2026-05-22-organic-blob-pattern-tool-design.md
Style guide 1.md
```

## Success Criteria

- Page loads and renders pattern immediately
- All 10 sliders update pattern in real-time
- SVG export → valid `.svg` file
- PNG export → valid 800×800 `.png` file
- Pattern tiles infinitely without visible seams
- Shapes do not overlap at any control setting
- Default: black fill, no stroke, roundness 40, sizes 100, rotations 0, spacing 30, scale 100
- UI follows Style guide 1 colors and typography
