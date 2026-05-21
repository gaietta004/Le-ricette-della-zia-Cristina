# Vector Pattern Design Tool — Design Spec

## Overview
A single-page web tool that generates an 800×800 vector pattern from 3 irregular shapes (bezier squircle, reflex-notch ellipse, irregular triangle) arranged in a triangular tile repeating infinitely across the canvas. Shapes are plain black, no stroke, with per-shape size controls and overlap prevention.

## Shape Definitions

### Shape 1 — Bezier Squircle
A 4-corner shape where each side is a cubic bezier curve that bows slightly outward, with rounded corner transitions. Implemented as a single `<path>` with 4 bezier segments looping through left/top/right/bottom midpoints.

- At 0% roundness: sharp rectangle with straight sides
- At 100% roundness: approaches a circle
- Roundness controls both corner radius and side curvature

### Shape 2 — Reflex-Notch Ellipse
A cubic bezier `<path>` where 3 quadrants follow a standard elliptical arc (bezier approximation with k ≈ 0.55228), while the 4th quadrant (right side) curves inward then back outward creating a reflex notch.

- Left half (Q2 + Q3): standard elliptical bezier
- Top-right → right → bottom-right (Q1 + Q4): control points pulled inward to ~30-35% of radius
- Roundness slider affects the smoothness/sharpness of the reflex transitions
- Moderate notch depth (30-35% of radius)

### Shape 3 — Irregular Triangle
A scalene triangle with 3 vertices at different distances from center (all 3 sides different lengths). Each corner rounded using SVG arc joins.

- 3 vertices at distinct radial distances (e.g. 0.9r, 0.7r, 0.8r)
- Corner rounding via arc transitions with sweep flag determined by cross product
- Roundness slider controls corner radius (capped at 40% of edge length)

## Controls Layout

| Control | Type | Range | Default | Location |
|---------|------|-------|---------|----------|
| Corner Roundness | Slider | 0–100% | 40% | Shape group |
| Size Shape 1 | Slider | 50–150% | 100% | Shape group |
| Size Shape 2 | Slider | 50–150% | 100% | Shape group |
| Size Shape 3 | Slider | 50–150% | 100% | Shape group |
| Rotation Shape 1 | Slider | 0–360° | 0° | Rotation group |
| Rotation Shape 2 | Slider | 0–360° | 0° | Rotation group |
| Rotation Shape 3 | Slider | 0–360° | 0° | Rotation group |
| Spacing | Slider | 0–100% | 30% | Layout group |
| Scale | Slider | 25–200% | 100% | Layout group |
| Fill | Color picker | — | `#000000` | Color group |
| Stroke | Checkbox | on/off | off | Color group |
| Stroke Color | Color picker | — | `#000000` | Color group |

All controls update the SVG in real-time.

## Tiling & Layout

- The 3 shapes are placed at vertices of an equilateral reference triangle
- This triangle unit tiles infinitely using offset-row (hexagonal) tiling across the 800×800 canvas
- **Overlap prevention**: At render time, compute `minTileRadius = max(boundingRadius₁, boundingRadius₂, boundingRadius₃) + padding`. Triangle side length = `minTileRadius × 2`. This guarantees shapes never touch.
- Per-shape bounding radius = `baseSize × sizeSlider/100 × scale/100`
- Spacing slider adds extra gap beyond the minimum computed tile radius
- Pattern is centered on the canvas, tiling outward

## Tech Stack

- **Single file**: `index.html` with inline CSS and JS
- **No frameworks or build step**
- SVG rendered directly in the DOM using `<svg>` and `<path>` elements
- Sliders use vanilla JS event listeners to update SVG attributes

## Export

- **SVG**: Serialize the active `<svg>` element's outerHTML, download as `pattern.svg` with `image/svg+xml` MIME type
- **PNG**: Render SVG onto a hidden 800×800 `<canvas>` via `drawImage`, then `canvas.toBlob()` to download as `pattern.png`

## File Structure

```
index.html          — single file with everything
docs/superpowers/specs/2026-05-19-vector-pattern-tool-design.md — this spec
```

## Success Criteria

- Page loads and immediately renders the pattern
- All 12 controls (roundness, size×3, rotation×3, spacing, scale, fill, stroke, strokeColor) update the pattern in real-time
- SVG export downloads a valid `.svg` file
- PNG export downloads a valid 800×800 `.png` file
- Pattern tiles infinitely without visible seams
- Shapes do not overlap at any control setting
- Default state: black fill, no stroke, roundness 40%, all sizes 100%, all rotations 0°, spacing 30%, scale 100%
