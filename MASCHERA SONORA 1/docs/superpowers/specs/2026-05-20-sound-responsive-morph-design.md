# Sound-Responsive SVG Morph — Design Spec

## Overview
Single HTML page that animates a character ("Pallino") morphing between a quiet state and a speaking state based on real-time microphone input. The character's body, eyes, and mouth smoothly interpolate between two SVG poses as sound level varies from 0 to 100.

## Architecture
Single-file HTML app (no bundler). Libraries loaded via CDN:

- **Flubber.js** — polygon-to-polygon morphing for the body
- **Web Audio API** — microphone input → RMS volume

### Components
1. **AudioEngine** — `getUserMedia` → `AudioContext` → `AnalyserNode` (FFT size 256) → RMS computed from `getByteTimeDomainData` each animation frame
2. **MorphEngine** — stores both SVG states; exposes `getMorphState(t)` returning interpolated attributes for each SVG element
3. **Renderer** — updates inline SVG DOM attributes each frame in `requestAnimationFrame` loop

### Data Flow
```
Microphone → AnalyserNode → RMS (0–100, normalized) → MorphEngine.getMorphState(t)
    ↓
Renderer → updates #corpo points, #occhio_dx/sx cx/cy, #bocca cx/cy/rx/ry
```

## Morphing Strategy

| Element | Quiet state | Speaking state | Interpolation |
|---|---|---|---|
| **Corpo** (polygon) | Different point counts | Flubber.interpolate() — automatic resampling |
| **Occhio dx** | cx=369.4, cy=387.4 | cx=425, cy=427.2 | Linear lerp (rx, ry constant at 23, 33.7) |
| **Occhio sx** | cx=168.2, cy=410.1 | cx=223.8, cy=449.9 | Linear lerp (rx, ry constant at 23, 33.7) |
| **Bocca** (ellipse) | cx=276.6, cy=435.5, rx=44.9, ry=2.9 | cx=332.8, cy=480.8, rx=41.9, ry=36 | Linear lerp on all 4 params |

Sound level mapping: `t = clamp(level / 100, 0, 1)` where `t=0` = quiet, `t=1` = speaking.

## UI / Interaction
- Full-screen dark background
- Inline SVG centered and scaled to fit viewport (preserveAspectRatio)
- "Start microphone" button triggers `getUserMedia`
- Small optional sound-level indicator (0–100)
- Permission denied handled gracefully with retry message

## Audio Processing
- FFT size: 256 (low latency)
- RMS = sqrt(mean of squared normalized samples)
- Sensitivity floor: RMS below 0.02 treated as silence (t=0)
- Smoothing: exponential moving average on RMS (α=0.3) to reduce jitter

## Technical Implementation
- SVG embedded inline in HTML for direct DOM access
- Flubber loaded from CDN (`https://unpkg.com/flubber@0.3.0`)
- No build step, no framework
- All logic in `<script>` tag or single JS file
