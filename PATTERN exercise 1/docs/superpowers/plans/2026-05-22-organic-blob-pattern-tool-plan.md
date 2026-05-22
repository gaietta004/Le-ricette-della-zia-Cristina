# Organic Blob Pattern Tool — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new single-file HTML tool that generates a repeating tile pattern of 3 smooth organic closed-bezier shapes, following Style guide 1.

**Architecture:** Single `index.html` with inline CSS and JS. SVG `<path>` elements rendered in the DOM. 3 shapes defined by anchor points in polar coords, rendered as smooth closed cubic beziers. Shape parameters controlled by sliders. Pattern tiled using equilateral-triangle hexagonal tiling with bounding-radius overlap prevention.

**Tech Stack:** HTML5, CSS3 (style guide 1), Vanilla JS (ES6), SVG (DOM)

---

### Task 1: Create HTML Shell with Style Guide CSS

**Files:**
- Create: `organic-pattern-tool.html`

- [ ] **Step 1: Create the file with HTML structure and style guide CSS**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1024">
<title>Organic Pattern Tool</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&family=Zalando+Sans+Expanded:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  display: flex;
  height: 100vh;
  background: #1a1a1a;
  font-family: 'Zalando Sans Expanded', system-ui, sans-serif;
  color: #1f0001;
}

#controls {
  width: 280px;
  padding: 24px 20px;
  overflow-y: auto;
  background: #f0eded;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

#controls .group-label {
  font-family: 'Zalando Sans Expanded', sans-serif;
  font-weight: 400;
  font-size: 30px;
  margin-top: 8px;
  letter-spacing: 0;
}

#controls label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Zalando Sans Expanded', sans-serif;
  font-weight: 500;
  font-size: 22px;
  cursor: pointer;
}

#controls label:hover {
  text-decoration: underline;
}

#controls label .val {
  font-family: 'VT323', monospace;
  font-weight: 200;
  font-size: 16px;
  min-width: 32px;
  text-align: right;
}

#controls input[type="range"] {
  width: 120px;
  accent-color: #1f0001;
}

.export-btns {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.export-btns button {
  flex: 1;
  padding: 10px;
  border: 2px solid #1f0001;
  border-radius: 0;
  cursor: pointer;
  font-family: 'Zalando Sans Expanded', sans-serif;
  font-weight: 500;
  font-size: 22px;
  background: #f0eded;
  color: #1f0001;
  transition: transform 0.15s;
}

.export-btns button:hover {
  transform: scale(1.05);
  text-decoration: underline;
}

#canvas-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
}

#canvas-wrap svg {
  background: #f0eded;
  box-shadow: 0 0 30px rgba(0,0,0,0.4);
}
</style>
</head>
<body>
<div id="controls">
  <div class="group-label">Shape 1</div>
  <label>Roundness <span class="val" id="val-roundness1">40</span></label>
  <input type="range" id="roundness1" min="0" max="100" value="40">
  <label>Size <span class="val" id="val-size1">100</span></label>
  <input type="range" id="size1" min="50" max="150" value="100">
  <label>Rotation <span class="val" id="val-rot1">0</span></label>
  <input type="range" id="rot1" min="0" max="360" value="0">

  <div class="group-label">Shape 2</div>
  <label>Roundness <span class="val" id="val-roundness2">40</span></label>
  <input type="range" id="roundness2" min="0" max="100" value="40">
  <label>Size <span class="val" id="val-size2">100</span></label>
  <input type="range" id="size2" min="50" max="150" value="100">
  <label>Rotation <span class="val" id="val-rot2">0</span></label>
  <input type="range" id="rot2" min="0" max="360" value="0">

  <div class="group-label">Shape 3</div>
  <label>Roundness <span class="val" id="val-roundness3">40</span></label>
  <input type="range" id="roundness3" min="0" max="100" value="40">
  <label>Size <span class="val" id="val-size3">100</span></label>
  <input type="range" id="size3" min="50" max="150" value="100">
  <label>Rotation <span class="val" id="val-rot3">0</span></label>
  <input type="range" id="rot3" min="0" max="360" value="0">

  <div class="group-label">Layout</div>
  <label>Spacing <span class="val" id="val-spacing">30</span></label>
  <input type="range" id="spacing" min="0" max="100" value="30">
  <label>Scale <span class="val" id="val-scale">100</span></label>
  <input type="range" id="scale" min="25" max="200" value="100">

  <div class="group-label">Export</div>
  <div class="export-btns">
    <button id="exportSvg">SVG</button>
    <button id="exportPng">PNG</button>
  </div>
</div>
<div id="canvas-wrap">
  <svg id="canvas" width="800" height="800" xmlns="http://www.w3.org/2000/svg">
    <g id="patternLayer"></g>
  </svg>
</div>
<script>
// JS will be added in subsequent tasks
</script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `organic-pattern-tool.html`. Verify the layout renders: control panel on left with style guide fonts/colors, empty SVG canvas on the right. Controls panel is scrollable, labels show current values.

- [ ] **Step 3: Commit**

```bash
git add organic-pattern-tool.html
git commit -m "feat: create HTML shell with style guide 1 CSS"
```

---

### Task 2: Bezier Shape Engine

**Files:**
- Modify: `organic-pattern-tool.html` (add JS functions before the closing `</script>` tag)

- [ ] **Step 1: Add the `organicBlob` bezier engine**

Replace the empty `<script>` block with:

```js
function organicBlob(anchors, size, roundness) {
  const s = size / 2;
  const r = roundness / 100;
  const t = 0.2 + r * 0.3;
  const pts = anchors.map(p => ({
    x: s * p.d * Math.cos(p.a),
    y: s * p.d * Math.sin(p.a)
  }));
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % n];
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 2) % n];
    const c1x = p0.x + (p1.x - prev.x) * t;
    const c1y = p0.y + (p1.y - prev.y) * t;
    const c2x = p1.x - (next.x - p0.x) * t;
    const c2y = p1.y - (next.y - p0.y) * t;
    if (i === 0) d += `M${p0.x},${p0.y}`;
    d += `C${c1x},${c1y} ${c2x},${c2y} ${p1.x},${p1.y}`;
  }
  return d + 'Z';
}
```

This takes an array of `{a, d}` (angle in radians, distance as fraction of radius), a `size` (pixel diameter), and `roundness` (0-100). It computes cubic bezier control points from neighboring anchors to ensure smooth C1-continuous joins at every vertex — no cusps.

- [ ] **Step 2: Open browser and test via console**

Open the file, open devtools console, type:
```js
organicBlob([{a:0,d:1},{a:1,d:0.8},{a:2,d:1},{a:3,d:0.7}], 100, 50)
```
Expected: returns an SVG path string like `M...,...C...,... ...,... ...,...Z`

- [ ] **Step 3: Commit**

```bash
git add organic-pattern-tool.html
git commit -m "feat: add organicBlob bezier engine"
```

---

### Task 3: Define 3 Distinct Shape Anchor Sets

**Files:**
- Modify: `organic-pattern-tool.html` (add shape definitions after `organicBlob`)

- [ ] **Step 1: Add anchor constants and `buildShapePath` function**

After `organicBlob`, add:

```js
const SHAPE1 = [
  { a: -Math.PI * 0.45, d: 0.85 },
  { a: Math.PI * 0.10,  d: 0.70 },
  { a: Math.PI * 0.55,  d: 0.90 },
  { a: Math.PI * 0.85,  d: 0.65 },
  { a: Math.PI * 1.35,  d: 0.80 },
];

const SHAPE2 = [
  { a: -Math.PI * 0.40, d: 0.78 },
  { a: Math.PI * 0.05,  d: 0.40 },
  { a: Math.PI * 0.50,  d: 0.75 },
  { a: Math.PI * 0.85,  d: 0.88 },
  { a: Math.PI * 1.10,  d: 0.68 },
  { a: Math.PI * 1.40,  d: 0.62 },
];

const SHAPE3 = [
  { a: -Math.PI * 0.52, d: 0.88 },
  { a: Math.PI * 0.00,  d: 0.50 },
  { a: Math.PI * 0.30,  d: 0.82 },
  { a: Math.PI * 0.70,  d: 0.48 },
  { a: Math.PI * 1.00,  d: 0.76 },
  { a: Math.PI * 1.35,  d: 0.58 },
];

function buildShapePath(shapeIdx, size, roundness, rotation) {
  const anchors = [SHAPE1, SHAPE2, SHAPE3][shapeIdx];
  const d = organicBlob(anchors, size, roundness);
  return { d, rot: rotation };
}
```

- **Shape 1:** 5 anchors — wide rounded profile
- **Shape 2:** 6 anchors — asymmetrical, one side indented
- **Shape 3:** 6 anchors — compact, irregular at top/right

- [ ] **Step 2: Commit**

```bash
git add organic-pattern-tool.html
git commit -m "feat: add 3 distinct shape anchor sets and buildShapePath"
```

---

### Task 4: Pattern Generation with Tiling & Overlap Prevention

**Files:**
- Modify: `organic-pattern-tool.html` (add `generatePattern` function after `buildShapePath`)

- [ ] **Step 1: Add the `generatePattern` function**

After `buildShapePath`, add:

```js
function generatePattern(params) {
  const { roundness1, roundness2, roundness3, size1, size2, size3, rot1, rot2, rot3, spacing, scale } = params;

  const baseSize = 110 * (scale / 100);
  const roundnesses = [roundness1, roundness2, roundness3];
  const sizes = [size1, size2, size3];
  const rots = [rot1, rot2, rot3];

  const shapes = [0,1,2].map(i =>
    buildShapePath(i, baseSize * sizes[i] / 100, roundnesses[i], rots[i])
  );

  const radii = sizes.map(s => (baseSize * s / 100) / 2);
  const minSide = Math.max(
    radii[0] + radii[1],
    radii[1] + radii[2],
    radii[2] + radii[0]
  );
  const gap = spacing * 0.8;
  const triRadius = (minSide + gap) / Math.sqrt(3);

  const cos30 = Math.cos(Math.PI / 6), sin30 = Math.sin(Math.PI / 6);
  const tileW = triRadius * cos30 * 2;
  const tileH = triRadius * (1 + sin30);

  const svg = document.getElementById('patternLayer');
  svg.innerHTML = '';
  const viewW = 800, viewH = 800;
  const cols = Math.ceil(viewW / tileW) + 2;
  const rows = Math.ceil(viewH / tileH) + 2;
  const offX = (viewW - tileW * Math.floor(viewW / tileW)) / 2;
  const offY = (viewH - tileH * Math.floor(viewH / tileH)) / 2;

  for (let row = 0; row < rows; row++) {
    const yOff = offY + row * tileH;
    for (let col = 0; col < cols; col++) {
      const xOff = offX + (row % 2 === 0 ? 0 : tileW / 2) + col * tileW;
      const vx = [0, triRadius * cos30, -triRadius * cos30];
      const vy = [-triRadius, triRadius * sin30, triRadius * sin30];
      const cx = xOff + triRadius;
      const cy = yOff + tileH / 2;
      if (cx - triRadius * 2 > viewW || cx + triRadius * 2 < 0 || cy - triRadius * 2 > viewH || cy + triRadius * 2 < 0) continue;
      for (let s = 0; s < 3; s++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', shapes[s].d);
        path.setAttribute('fill', '#1f0001');
        path.setAttribute('stroke', 'none');
        path.setAttribute('transform', `translate(${cx+vx[s]},${cy+vy[s]}) rotate(${shapes[s].rot})`);
        svg.appendChild(path);
      }
    }
  }
}
```

- [ ] **Step 2: Add the `getParams` and `render` functions**

After `generatePattern`, add:

```js
function getParams() {
  return {
    roundness1: +document.getElementById('roundness1').value,
    roundness2: +document.getElementById('roundness2').value,
    roundness3: +document.getElementById('roundness3').value,
    size1: +document.getElementById('size1').value,
    size2: +document.getElementById('size2').value,
    size3: +document.getElementById('size3').value,
    rot1: +document.getElementById('rot1').value,
    rot2: +document.getElementById('rot2').value,
    rot3: +document.getElementById('rot3').value,
    spacing: +document.getElementById('spacing').value,
    scale: +document.getElementById('scale').value,
  };
}

function render() {
  const params = getParams();
  generatePattern(params);
  // Update value displays
  document.getElementById('val-roundness1').textContent = params.roundness1;
  document.getElementById('val-roundness2').textContent = params.roundness2;
  document.getElementById('val-roundness3').textContent = params.roundness3;
  document.getElementById('val-size1').textContent = params.size1;
  document.getElementById('val-size2').textContent = params.size2;
  document.getElementById('val-size3').textContent = params.size3;
  document.getElementById('val-rot1').textContent = params.rot1;
  document.getElementById('val-rot2').textContent = params.rot2;
  document.getElementById('val-rot3').textContent = params.rot3;
  document.getElementById('val-spacing').textContent = params.spacing;
  document.getElementById('val-scale').textContent = params.scale;
}
```

- [ ] **Step 3: Wire up event listeners and call initial render**

After `render`, add:

```js
document.querySelectorAll('#controls input').forEach(el => {
  el.addEventListener('input', render);
});

render();
```

- [ ] **Step 4: Open in browser and verify**

Open `organic-pattern-tool.html`. Pattern should render immediately with 3 organic shapes tiled across the canvas in black on a #f0eded background. Move sliders — shape sizes, roundness, rotations, spacing, and overall scale should all update in real-time. No shapes should overlap at any setting.

- [ ] **Step 5: Commit**

```bash
git add organic-pattern-tool.html
git commit -m "feat: add pattern generation engine with tiling and overlap prevention"
```

---

### Task 5: SVG and PNG Export

**Files:**
- Modify: `organic-pattern-tool.html` (add export handlers after event listeners)

- [ ] **Step 1: Add SVG export handler**

After the event listener wiring, add:

```js
document.getElementById('exportSvg').addEventListener('click', function() {
  const svgEl = document.getElementById('canvas');
  const clone = svgEl.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(clone);
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'organic-pattern.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
```

- [ ] **Step 2: Add PNG export handler**

After SVG export handler, add:

```js
document.getElementById('exportPng').addEventListener('click', function() {
  const svgEl = document.getElementById('canvas');
  const clone = svgEl.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(clone);
  const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f0eded';
    ctx.fillRect(0, 0, 800, 800);
    ctx.drawImage(img, 0, 0, 800, 800);
    canvas.toBlob(function(blob) {
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = 'organic-pattern.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(dlUrl);
    }, 'image/png');
    URL.revokeObjectURL(url);
  };
  img.src = url;
});
```

- [ ] **Step 3: Open in browser and test export**

Open `organic-pattern-tool.html`. Click "SVG" — should download an `organic-pattern.svg` file. Open it in a browser/editor — should show the pattern. Click "PNG" — should download an 800×800 `organic-pattern.png`.

- [ ] **Step 4: Commit**

```bash
git add organic-pattern-tool.html
git commit -m "feat: add SVG and PNG export handlers"
```

---

### Task 6: Style Guide Interaction States

**Files:**
- Modify: `organic-pattern-tool.html` (verify CSS interaction states are correct)

- [ ] **Step 1: Verify hover states in CSS**

In the `<style>` block, confirm these rules exist:

1. `#controls label:hover` has `text-decoration: underline`
2. `.export-btns button:hover` has `transform: scale(1.05)` and `text-decoration: underline`

Open the file in browser. Hover over any label — underline appears. Hover over SVG/PNG buttons — buttons scale up and underline appears.

- [ ] **Step 2: Verify VT323 value displays work**

Check that all `<span class="val">` elements use VT323 font and update correctly when sliders move.

- [ ] **Step 3: Commit**

```bash
git add organic-pattern-tool.html
git commit -m "feat: add style guide hover interaction states"
```
