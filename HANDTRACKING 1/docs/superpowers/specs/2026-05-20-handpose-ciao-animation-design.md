# Handpose "CIAO" Animation — Design Spec

## Overview

A single-page web tool that uses MediaPipe Hands to animate the word "CIAO" in real time. The word container follows the hand position on screen. Hand movement speed drives per-letter pendulum oscillation along a diagonal axis (ranging from -45° to +45° based on hand x-position). Hand closure controls per-letter vertical stretching.

## Tech Stack

- **Vanilla HTML/CSS/JS** — single `index.html` file, no frameworks
- **MediaPipe Hands** — hand landmark tracking via `@mediapipe/hands` and `@mediapipe/camera_utils`
- **DOM + CSS transforms** — word container translates to follow hand; each letter is a `<span>` animated via pendulum offset and `scaleY`

## Layout

```
┌──────────────────────────────────┐
│        Camera feed (small,       │
│        mirrored, top-right)      │
│                                  │
│   ┌──┬──┬──┬──┐                  │
│   │ C│ I│ A│ O│  (follows hand)  │
│   └──┴──┴──┴──┘                  │
│                                  │
│   Hand skeleton overlay          │
└──────────────────────────────────┘
```

- Full-page dark background
- Camera feed: 320x240, mirrored via `scaleX(-1)`, positioned top-right
- Word container tracks hand position via `translate(containerX, containerY)`
- Each letter: `<span class="letter">` with `transform-origin: bottom center`
- Skeleton overlay: `<canvas>` over camera feed

## Data Flow

```
MediaPipe Hands → onResults(landmarks)
    │
    ├── wrist(0).x,y → map to viewport → container transform
    │
    ├── wrist(0).x → map to -45°..+45° → diagonal angle
    │
    ├── wrist velocity (per-frame delta) → pendulum impulse → damped oscillation
    │   └── per-letter: sin(angle + phase[i]) * amplitude → offset along diagonal
    │
    └── 5 fingertip→MCP/PIP distances:
          (4→6)  thumb_tip → index_pip
          (8→9)  index_tip → middle_mcp
          (12→13) middle_tip → ring_mcp
          (16→17) ring_tip → pinky_mcp
          (20→17) pinky_tip → pinky_mcp
          │
          └── average distance → openness ratio → per-letter scaleY
```

## Animation Details

### Container Follows Hand
- Wrist landmark (0) normalized x,y coordinates mapped to viewport space
- `translateX = (wrist.x - 0.5) * (viewportWidth - margin)`
- `translateY = (wrist.y - 0.5) * (viewportHeight - margin)`
- Smooth follow via lerp at 0.08 factor

### Per-Letter Rotation Oscillation
- Each letter rotates sinusoidally between -45° and +45°
- Phase per letter: `elapsed * speed + i * 0.5` (matching the reference file)
- Hand movement speed drives oscillation speed: fast hand → fast oscillation (0.5–5.0 range)
- `angle = mapSin(sin(phase), -45, 45)` — maps normalized sine to degree range
- Each letter has `transform-origin: bottom center`
- Separate `requestAnimationFrame` loop for smooth 60fps animation

### Per-Letter Vertical Stretch
- Compute 5 Euclidean distances between fingertip and corresponding MCP/PIP
- Average to get hand openness value
- Map openness to `scaleY`: open hand = 1.0, fully closed = 3.0
- Applied per letter simultaneously alongside rotation

### Smoothing
- Lerp on container position (0.08), oscillation speed (0.1), stretch (0.7)

### Per-Letter Vertical Stretch
- Compute 5 Euclidean distances between fingertip and corresponding MCP/PIP
- Average to get hand openness value
- Map openness to `scaleY`: open hand = 1.0, fully closed = 3.0
- Applied per letter simultaneously

### Smoothing
- Lerp on container position (0.08), diagonal angle (0.7), and stretch (0.7)
- Pendulum naturally smooth via physics integration + damping

## Edge Cases

- **No hand detected**: container returns to center, pendulum decays, stretch returns to 1.0
- **Multiple hands**: only the first detected hand is tracked
- **Camera permission denied**: show error message, word stays neutral
- **Performance**: MediaPipe runs at ~30fps on GPU; physics integration is frame-rate independent enough for this use case

## Implementation Order

1. Set up MediaPipe Hands pipeline (camera + detector)
2. Render camera feed + skeleton overlay
3. Layout "CIAO" with per-letter spans
4. Implement container following hand position
5. Implement diagonal pendulum oscillation per letter
6. Implement per-letter vertical stretch from fingertip distances
7. Polish: styling, error states, tweak physics constants
