# Vector Pattern Designer — Design Spec

## Overview

A single-file HTML tool for designing vector compositions made of 3 organically-shaped SVG `<path>` elements on a canvas. Users control each shape's lobe count, roundness, size, rotation, and position via sliders. The tool applies C1-continuous cubic Bézier curves (smooth tangent transitions at every anchor point), plain black fill (`#1f0001`) with no stroke, and follows the project style guide for colors, typography, and interactive states. Includes animation (wobble/float) and SVG/PNG export.

## Architecture

Single `index.html` with inline `<style>` and `<script>`. No external dependencies beyond Google Fonts. Two layout regions:

- **Left sidebar** — controls panel (`#controls`, 280px wide, `#f0eded` background)
- **Right area** — SVG canvas (800x800, `#f0eded` background, dark outer background `#1a1a1a`)

Data flow: slider inputs → `getParams()` → `generatePattern()` → renders `d` attributes on SVG `<path>` elements. Animation runs independently via `requestAnimationFrame`, updating `transform` per frame.

## Shape Generation

3 shapes, each controlled by:

| Control | Range | Description |
|---------|-------|-------------|
| Lobes | 3–5 | Number of anchor points / lobes |
| Roundness | 0–100 | Tension factor for control handles |
| Size | 50–150% | Scale relative to base size |
| Rotation | 0–360° | Degrees |
| Offset X | -300–300 | Horizontal position from center |
| Offset Y | -300–300 | Vertical position from center |

### Anchor point generation

For N lobes, generate N anchor points at roughly `2π/N` angular spacing with per-point random offsets:
- **Angle offset**: ±15% of the lobe spacing
- **Radius offset**: ±20% of base radius

Offsets use a deterministic seed (based on shape index and lobe count) so values are stable between renders.

### C1-continuous Bézier path

1. Convert polar anchors to Cartesian coordinates, scaled by size
2. For each segment, compute control handles using a tension factor `t = 0.2 + roundness * 0.003`
3. First segment: explicit `C` command with control point 1 computed to mirror the closing tangent (wrapping last → first)
4. Remaining segments: `S` (smooth cubic Bézier) commands — SVG automatically reflects the previous control point around the current anchor, guaranteeing C1 continuity
5. Close with `Z`

Result: tangent vectors at every anchor point are perfectly collinear — no sharp corners, seamless organic curves.

## Style Guide

### Colors
- Background (canvas, sidebar): `#f0eded`
- Text / shape fill: `#1f0001`
- Canvas outer background: `#1a1a1a`

### Typography
- Group labels (Shape 1, Layout, etc.): Zalando Sans Expanded 400 at 30px
- Control labels: Zalando Sans Expanded 500 at 22px
- Value readouts: VT323 200 at 16px
- Export buttons: Zalando Sans Expanded 500 at 22px

### Interactive states
- Labels: `text-decoration: underline` on hover
- Export buttons: `transform: scale(1.05)` on hover, `#1f0001` border
- Range sliders: `accent-color: #1f0001`

## Layout

Free-form placement — each shape has X and Y offset sliders centered on the 800x800 canvas. No tiling or repeating pattern grid.

## Animation

Two global sliders:

| Control | Range | Effect |
|---------|-------|--------|
| Intensity | 0–100 | Rotation oscillation magnitude (±80° at max) and scale wobble |
| Float | 0–100 | Position oscillation magnitude (±80px at max) |

Each shape gets randomized oscillation frequencies and phases on generation. The `requestAnimationFrame` loop computes per-frame `transform: translate() rotate() scale()` values. Animation auto-starts when either slider > 0 and auto-stops when both are 0.

## Export

**SVG**: Clone the canvas SVG, set `xmlns`, serialize, download as `.svg` file.

**PNG**: Clone SVG → serialize → `Blob` → `Image` → draw onto `<canvas>` (800x800) → `canvas.toBlob()` → download as `.png`. Canvas fill uses `#f0eded` before drawing.
