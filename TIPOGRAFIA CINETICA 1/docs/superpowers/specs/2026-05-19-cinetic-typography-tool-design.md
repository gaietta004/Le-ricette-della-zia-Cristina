# Kinetic Typography Tool — "CIAO"

## Overview

A single-page web tool that displays the word "CIAO" with each letter oscillating in rotation. Users can adjust the animation speed and angle range via sliders.

## Approach

**HTML DOM + requestAnimationFrame** — each letter is a `<span>` element animated in a JS render loop. No external dependencies, no build step.

## Style Guide Application (v2)

**Colors (dark theme kept):**
- Background: `#1a1a1a`, text: `#fff`
- Buttons use sticker colors: Restart = `#50e664` (green), Goodbye = `#ff5ec1` (magenta), Say Hi = `#f2f26b` (yellow)
- Button text: `#1f0001` for contrast
- Slider value displays and thumbs match per-slider accent colors

**Typography:**
- Slider labels: Inter (body substitute for Zalando Sans Expanded)
- Button text + value displays: VT323 (caption style, 16px Regular 200)
- Main "CIAO" letters: keep Arial Black (unchanged)

**Interactive:**
- Buttons: scale transform on hover (sticker interactive status)
- Smooth `transition: transform 0.2s`

## Architecture

Single file: `index.html` with embedded CSS and JS.

### HTML Structure

```
<div id="app">
  <div id="word">
    <span>C</span>
    <span>I</span>
    <span>A</span>
    <span>O</span>
  </div>
  <div id="controls">
    <label>Speed <input type="range" id="speed" ...></label>
    <label>Min Angle <input type="range" id="minAngle" ...></label>
    <label>Max Angle <input type="range" id="maxAngle" ...></label>
  </div>
</div>
```

### CSS

- Dark background, white text
- Large, bold font for letters with generous letter-spacing
- Controls styled below the word, horizontally centered
- Each letter has `display: inline-block` and `transform-origin: center center`

### JavaScript

**State object:**
```js
const state = { speed: 2, minAngle: -45, maxAngle: 45 };
```

**Animation loop (requestAnimationFrame):**
- Each frame, compute `elapsed` time
- For each letter at index `i`:
  - `phase = elapsed * state.speed + i * 0.5`
  - `normalized = Math.sin(phase)`  →  range [-1, 1]
  - `angle = lerp(normalized, state.minAngle, state.maxAngle)`
  - Apply `transform: rotate(angle deg)`
- Letter stagger (`i * 0.5`) creates a wave ripple effect

**Slider binding:**
- Each slider's `input` event updates the corresponding state property
- No debounce needed (simple values, immediate update)

## Parameters

| Parameter  | Default | Range     | Description                        |
|-----------|---------|-----------|------------------------------------|
| Speed     | 2       | 0.5 – 5.0 | Oscillation frequency (rad/s)      |
| Min Angle | -45     | -90 – 0   | Minimum rotation angle (degrees)   |
| Max Angle | 45      | 0 – 90    | Maximum rotation angle (degrees)   |

## Files

- `index.html` — the complete application
