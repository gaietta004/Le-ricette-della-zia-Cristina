# Handpose "CIAO" Animation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single HTML file that uses MediaPipe Hands to animate the word "CIAO" — container follows hand position, hand movement speed drives per-letter pendulum oscillation along a -45° to +45° diagonal, hand closure controls per-letter vertical stretch.

**Architecture:** Single vanilla HTML file with embedded CSS and JS. MediaPipe Hands runs in a camera loop, landmarks drive DOM element transforms.

**Tech Stack:** Vanilla HTML/CSS/JS, MediaPipe Hands CDN, `@mediapipe/camera_utils`, `@mediapipe/drawing_utils`

---

## File Structure

- `C:/Users/gaiap/Desktop/WS_abadir/HANDTRACKING/index.html` — entire application

---

### Task 1: HTML Skeleton and CSS Layout

**Files:**
- Create: `C:/Users/gaiap/Desktop/WS_abadir/HANDTRACKING/index.html`

- [ ] **Step 1: Write the initial HTML structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CIAO Hand Animation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0d0d0d;
      color: #fff;
      font-family: 'Arial Black', 'Helvetica Neue', sans-serif;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      user-select: none;
    }
    .camera-container {
      position: fixed;
      top: 16px;
      right: 16px;
      width: 320px;
      height: 240px;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid rgba(255,255,255,0.15);
      z-index: 10;
    }
    .camera-container video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scaleX(-1);
    }
    .camera-container canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: scaleX(-1);
    }
    .word {
      display: flex;
      gap: 0.15em;
      transition: none;
    }
    .letter {
      display: inline-block;
      font-size: 8rem;
      line-height: 1;
      transform-origin: bottom center;
    }
    .status {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      font-family: monospace;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.4);
    }
  </style>
</head>
<body>
  <div class="camera-container">
    <video id="video" playsinline></video>
    <canvas id="overlay"></canvas>
  </div>

  <div class="word" id="word">
    <span class="letter" data-i="0">C</span>
    <span class="letter" data-i="1">I</span>
    <span class="letter" data-i="2">A</span>
    <span class="letter" data-i="3">O</span>
  </div>

  <div class="status" id="status">Loading camera...</div>

  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
          crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
          crossorigin="anonymous"></script>

  <script>
    // JS goes here in subsequent tasks
  </script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify layout**

Open the file in a browser. Verify the word "CIAO" is centered on a dark background and an empty camera container is in the top-right corner.

---

### Task 2: MediaPipe Hands Pipeline

**Files:**
- Modify: `C:/Users/gaiap/Desktop/WS_abadir/HANDTRACKING/index.html` — add JS inside the `<script>` block

- [ ] **Step 1: Wire up camera and MediaPipe Hands**

Replace the empty `<script>` block with:

```javascript
(async function() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('overlay');
  const ctx = canvas.getContext('2d');
  const status = document.getElementById('status');
  const word = document.getElementById('word');
  const letters = document.querySelectorAll('.letter');

  const WORD_STATE = {
    hands: null,
    smoothOffset: 0,
    smoothStretch: 1,
  };

  function onResults(results) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const lm = results.multiHandLandmarks[0];
      drawConnectors(ctx, lm, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 1 });
      drawLandmarks(ctx, lm, { color: '#FF0000', lineWidth: 1 });
      WORD_STATE.hands = lm;
    } else {
      WORD_STATE.hands = null;
    }
  }

  const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5,
  });

  hands.onResults(onResults);

  const camera = new Camera(video, {
    onFrame: async () => {
      await hands.send({ image: video });
    },
    width: 640,
    height: 480,
  });

  try {
    await camera.start();
    status.textContent = 'Camera ready — show your hand';
  } catch (err) {
    status.textContent = 'Camera permission denied';
  }
})();
```

- [ ] **Step 2: Verify MediaPipe works**

Open in browser. Grant camera permission. Verify the camera feed appears with hand landmarks drawn over the detected hand. Status text should say "Camera ready — show your hand".

---

### Task 3: Container Follows Hand + Sinusoidal Rotation Oscillation

**Files:**
- Modify: `C:/Users/gaiap/Desktop/WS_abadir/HANDTRACKING/index.html`

- [ ] **Step 1: Add container tracking, hand-driven speed, and sinusoidal letter rotation**

Replace the JS block with:

```javascript
(async function() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('overlay');
  const ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 480;
  const status = document.getElementById('status');
  const word = document.getElementById('word');
  const letters = document.querySelectorAll('.letter');

  const STATE = {
    hands: null,
    containerX: 0,
    containerY: 0,
    smoothSpeed: 0.5,
    smoothStretch: 1,
    lastWrist: null,
  };

  const MARGIN = 100;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function mapSin(t, a, b) {
    return a + (t + 1) * 0.5 * (b - a);
  }

  function dist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  }

  function onResults(results) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const lm = results.multiHandLandmarks[0];
      drawConnectors(ctx, lm, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 1 });
      drawLandmarks(ctx, lm, { color: '#FF0000', lineWidth: 1 });
      STATE.hands = lm;

      const tx = (lm[0].x - 0.5) * (window.innerWidth - MARGIN * 2);
      const ty = (lm[0].y - 0.5) * (window.innerHeight - MARGIN * 2);
      STATE.containerX = lerp(STATE.containerX, tx, 0.08);
      STATE.containerY = lerp(STATE.containerY, ty, 0.08);

      if (STATE.lastWrist) {
        const dx = lm[0].x - STATE.lastWrist.x;
        const dy = lm[0].y - STATE.lastWrist.y;
        const speed = Math.sqrt(dx*dx + dy*dy) * 30;
        const target = Math.max(0.5, Math.min(5, speed));
        STATE.smoothSpeed = lerp(STATE.smoothSpeed, target, 0.1);
      }
      STATE.lastWrist = { x: lm[0].x, y: lm[0].y };

      const d1 = dist(lm[4], lm[6]);
      const d2 = dist(lm[8], lm[9]);
      const d3 = dist(lm[12], lm[13]);
      const d4 = dist(lm[16], lm[17]);
      const d5 = dist(lm[20], lm[17]);
      const avg = (d1 + d2 + d3 + d4 + d5) / 5;

      const MIN_DIST = 0.02;
      const MAX_DIST = 0.14;
      const clamped = Math.max(0, Math.min(1, (avg - MIN_DIST) / (MAX_DIST - MIN_DIST)));
      const openness = 1 - clamped;
      const targetStretch = 1 + openness * 2;
      STATE.smoothStretch = lerp(STATE.smoothStretch, targetStretch, 0.7);
      status.textContent = 'Hand detected';
    } else {
      STATE.containerX = lerp(STATE.containerX, 0, 0.08);
      STATE.containerY = lerp(STATE.containerY, 0, 0.08);
      STATE.smoothSpeed = lerp(STATE.smoothSpeed, 0.5, 0.05);
      STATE.smoothStretch = lerp(STATE.smoothStretch, 1, 0.7);
      STATE.lastWrist = null;
      status.textContent = 'No hand detected';
    }
  }

  const startTime = performance.now();

  function animate(time) {
    const elapsed = (time - startTime) / 1000;

    word.style.transform = `translate(${STATE.containerX}px, ${STATE.containerY}px)`;

    letters.forEach((letter, i) => {
      const phase = elapsed * STATE.smoothSpeed + i * 0.5;
      const normalized = Math.sin(phase);
      const angle = mapSin(normalized, -45, 45);
      letter.style.transform = `rotate(${angle}deg) scaleY(${STATE.smoothStretch})`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // ... MediaPipe setup unchanged
```

- [ ] **Step 2: Verify oscillation**

Open in browser. Move hand fast → letters oscillate fast between -45° and +45°. Move hand slow → slow oscillation. Still hand → slowest oscillation (~0.5). Close fist → letters stretch. Container follows hand position.

### Task 4: Polish and Edge Cases

- [ ] **Step 1: Verify edge cases**

Open in browser and verify:
- No hand → container returns to center, speed decays to 0.5, stretch returns to 1.0
- Deny camera → error message
- Fast hand gesture → responsive speed change
- Letters rotate independently with phase offsets (C→I→A→O ripple)
