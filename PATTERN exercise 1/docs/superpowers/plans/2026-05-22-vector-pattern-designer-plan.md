# Vector Pattern Designer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file HTML tool with 3 parametric organic SVG shapes using C1-continuous cubic Bézier curves, style guide UI, animation, and export.

**Architecture:** Single `index.html` with inline CSS and JS. Left sidebar with sliders, right SVG canvas (800x800). Shape engine generates anchor points procedurally from lobe count, builds paths with C/S Bézier commands for tangent continuity.

**Tech Stack:** Vanilla JS, SVG, CSS. Google Fonts (Zalando Sans Expanded + VT323).

---

### Task 1: HTML skeleton + CSS (style guide)

**Files:**
- Create: `index.html` (full skeleton with inline CSS)

- [ ] **Step 1: Write the HTML structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1024">
<title>Vector Pattern Designer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&family=Zalando+Sans+Expanded:wght@300;400;500&display=swap" rel="stylesheet">
<style>
/* full CSS in next step */
</style>
</head>
<body>
<div id="controls">
  <!-- sliders populated in Task 4, just skeleton groups here -->
</div>
<div id="canvas-wrap">
  <svg id="canvas" width="800" height="800" xmlns="http://www.w3.org/2000/svg">
    <g id="patternLayer"></g>
  </svg>
</div>
<script>
// all JS in Tasks 2-6
</script>
</body>
</html>
```

- [ ] **Step 2: Write the CSS**

```css
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
```

- [ ] **Step 3: Verify the page renders with correct colors/fonts**

Open the file in a browser. Confirm: sidebar `#f0eded`, canvas background `#f0eded`, outer `#1a1a1a`, text `#1f0001`, fonts load.

---

### Task 2: Shape generation engine

**Files:**
- Modify: `index.html` (add JS section before closing `</script>`)

- [ ] **Step 1: Write `generateAnchors(lobes, seed)`**

```js
function generateAnchors(lobeCount, seed) {
  const pts = [];
  const step = (Math.PI * 2) / lobeCount;
  for (let i = 0; i < lobeCount; i++) {
    const baseAngle = i * step;
    const angleJitter = (Math.random() - 0.5) * step * 0.3;
    const radiusJitter = 0.8 + Math.random() * 0.4;
    pts.push({
      a: baseAngle + angleJitter,
      d: radiusJitter
    });
  }
  return pts;
}
```

Seed the RNG to make shapes stable between renders. Or use a simple LCG seeded by shapeIndex + lobeCount:

```js
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0x100000000;
  };
}
```

Then `generateAnchors` takes a `rng` function instead of seed.

- [ ] **Step 2: Write `buildBezierPath(anchors, size, roundness)`**

```js
function buildBezierPath(anchors, size, roundness) {
  const s = size / 2;
  const t = 0.2 + (roundness / 100) * 0.3;
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

    if (i === 0) {
      const c1x = p0.x + (p1.x - prev.x) * t;
      const c1y = p0.y + (p1.y - prev.y) * t;
      d += `M${p0.x},${p0.y} C${c1x},${c1y}`;
    }

    const c2x = p1.x - (next.x - p0.x) * t;
    const c2y = p1.y - (next.y - p0.y) * t;
    d += ` ${c2x},${c2y} ${p1.x},${p1.y}`;

    if (i < n - 1) {
      const p2 = pts[(i + 2) % n];
      const c1next_x = pts[(i + 1)].x + (p2.x - p0.x) * t;
      const c1next_y = pts[(i + 1)].y + (p2.y - p0.y) * t;
      d += ` S${c1next_x},${c1next_y}`;
    }
  }
  return d + 'Z';
}
```

Wait — the `S` command approach needs rethinking for the closure. Let me think through the math:

For a closed shape with N points, each segment i→i+1 needs two control handles:
- Outgoing from pi: computed from (p_{i+1} - p_{i-1})
- Incoming to p_{i+1}: computed from (p_{i+2} - p_i)

For C1 continuity at p_{i+1}: the outgoing handle from p_{i+1} (for segment i+1→i+2) must equal the reflection of the incoming handle to p_{i+1} (from segment i→i+1).

This is naturally true with the tension-based formula. So the current approach works.

Simpler: just use `C` commands for all segments — the tension formula already guarantees C1 continuity because:

For segment i→i+1:
  c1 = pi + (p_{i+1} - p_{i-1}) * t
  c2 = p_{i+1} - (p_{i+2} - p_i) * t

For segment i+1→i+2:
  c1' = p_{i+1} + (p_{i+2} - p_i) * t
  c2' = p_{i+2} - (p_{i+3} - p_{i+1}) * t

At p_{i+1}:
  - Incoming tangent (p_{i+1} - c2) = (p_{i+2} - p_i) * t
  - Outgoing tangent (c1' - p_{i+1}) = (p_{i+2} - p_i) * t
  - Match!

So the C commands already work. However, we can simplify by using `S` for segments 2..N to reduce file size. The `S` command reflects the previous control point.

Let me use a simpler, cleaner approach:

```
M p0
C c1_0, c2_0 p1
S c2_1 p2     (S reflects c2_0 around p1 as its first control point)
...
```

Wait, actually for `S`, the reflected point is the second control point of the previous curve, reflected around the current point. Let me think...

In SVG, `S x2 y2, x y`:
- First control point = reflection of previous curve's second control point around current point
- Second control point = (x2, y2)
- End point = (x, y)

So for segment 1→2 after segment 0→1:
- S's implicit first CP = reflect(c2_0 around p1) = 2*p1 - c2_0
- For C1 continuity, we need this to equal our computed c1_1 = p1 + (p2 - p0) * t
- And c2_0 = p1 - (p2 - p0) * t
- So 2*p1 - c2_0 = 2*p1 - (p1 - (p2 - p0) * t) = p1 + (p2 - p0) * t = c1_1 ✓

So `S` works! Let me write the cleaner version.

```js
function buildBezierPath(anchors, size, roundness) {
  const s = size / 2;
  const t = 0.2 + (roundness / 100) * 0.3;
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

    if (i === 0) {
      // First segment: explicit C to establish tangents
      const c1x = p0.x + (p1.x - prev.x) * t;
      const c1y = p0.y + (p1.y - prev.y) * t;
      const c2x = p1.x - (next.x - p0.x) * t;
      const c2y = p1.y - (next.y - p0.y) * t;
      d += `M${p0.x},${p0.y} C${c1x},${c1y} ${c2x},${c2y} ${p1.x},${p1.y}`;
    } else {
      // Remaining segments: S reflects previous control point = automatic C1
      const c2x = p1.x - (next.x - p0.x) * t;
      const c2y = p1.y - (next.y - p0.y) * t;
      d += ` S${c2x},${c2y} ${p1.x},${p1.y}`;
    }
  }
  return d + 'Z';
}
```

This is cleaner and enforces C1 continuity by construction.

- [ ] **Step 3: Test the path generation**

Open the page, open DevTools console:
```js
const anchors = generateAnchors(5, seededRandom(42));
const path = buildBezierPath(anchors, 100, 50);
console.log(path);
```

Verify it starts with `M`, contains `C` and `S` commands, ends with `Z`. No error.

---

### Task 3: Core rendering

**Files:**
- Modify: `index.html` (add generatePattern and render functions)

- [ ] **Step 1: Write `generatePattern(params)`**

```js
function generatePattern(params) {
  const { lobes1, lobes2, lobes3, roundness1, roundness2, roundness3,
          size1, size2, size3, rot1, rot2, rot3, offX1, offX2, offX3,
          offY1, offY2, offY3 } = params;

  const baseSize = 100;
  const centerX = 400, centerY = 400;

  const lobeCounts = [lobes1, lobes2, lobes3];
  const roundnesses = [roundness1, roundness2, roundness3];
  const sizes = [size1, size2, size3];
  const rots = [rot1, rot2, rot3];
  const offX = [offX1, offX2, offX3];
  const offY = [offY1, offY2, offY3];

  const svg = document.getElementById('patternLayer');
  svg.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const rng = seededRandom(i * 100 + lobeCounts[i]);
    const anchors = generateAnchors(lobeCounts[i], rng);
    const d = buildBezierPath(anchors, baseSize * sizes[i] / 100, roundnesses[i]);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', '#1f0001');
    path.setAttribute('stroke', 'none');
    const x = centerX + offX[i];
    const y = centerY + offY[i];
    path.setAttribute('transform', `translate(${x},${y}) rotate(${rots[i]})`);
    path.setAttribute('data-shape', i);
    svg.appendChild(path);
  }

  // Store shape data for animation
  animData = [];
  for (let i = 0; i < 3; i++) {
    animData.push({
      el: svg.children[i],
      x: centerX + offX[i],
      y: centerY + offY[i],
      baseRot: rots[i],
      freqR: Math.random() * 2 + 0.5,
      phaseR: Math.random() * Math.PI * 2,
      freqS: Math.random() * 1.5 + 0.3,
      phaseS: Math.random() * Math.PI * 2,
      freqFX: Math.random() * 0.8 + 0.2,
      phaseFX: Math.random() * Math.PI * 2,
      freqFY: Math.random() * 0.8 + 0.2,
      phaseFY: Math.random() * Math.PI * 2
    });
  }
}
```

Wait, `shapes` is not defined. I need to rework this. Let me store shape data consistently without `shapes` reference.

Actually, let me also think about the `generateAnchors` function. The spec says:
- Angle offset: ±15% of lobe spacing → `(Math.random() - 0.5) * step * 0.3`
- Radius offset: ±20% of base radius → `0.8 + Math.random() * 0.4`

That's what I had. And the rng function uses seededRandom.

Let me also be careful with the `_shapeData` — I need to generate the data before setting innerHTML = '', or read children after populating.

Let me rewrite Step 1 more carefully.

- [ ] **Step 2: Write `render()` and `getParams()`**

```js
function getParams() {
  return {
    lobes1: +document.getElementById('lobes1').value,
    lobes2: +document.getElementById('lobes2').value,
    lobes3: +document.getElementById('lobes3').value,
    roundness1: +document.getElementById('roundness1').value,
    roundness2: +document.getElementById('roundness2').value,
    roundness3: +document.getElementById('roundness3').value,
    size1: +document.getElementById('size1').value,
    size2: +document.getElementById('size2').value,
    size3: +document.getElementById('size3').value,
    rot1: +document.getElementById('rot1').value,
    rot2: +document.getElementById('rot2').value,
    rot3: +document.getElementById('rot3').value,
    offX1: +document.getElementById('offX1').value,
    offX2: +document.getElementById('offX2').value,
    offX3: +document.getElementById('offX3').value,
    offY1: +document.getElementById('offY1').value,
    offY2: +document.getElementById('offY2').value,
    offY3: +document.getElementById('offY3').value
  };
}

function render() {
  const params = getParams();
  generatePattern(params);

  // Update value readouts
  const ids = ['lobes1','lobes2','lobes3','roundness1','roundness2','roundness3',
               'size1','size2','size3','rot1','rot2','rot3',
               'offX1','offX2','offX3','offY1','offY2','offY3',
               'spacing','scale','animation','float'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    const val = document.getElementById('val-' + id);
    if (val) val.textContent = el.value;
  });
}

// Wire all inputs
document.querySelectorAll('#controls input').forEach(el => {
  el.addEventListener('input', render);
});
```

- [ ] **Step 3: Verify shapes appear**

Open page in browser. Confirm 3 black organic shapes appear on the canvas at default positions. Adjust sliders — shapes update immediately.

---

### Task 4: Sliders HTML

**Files:**
- Modify: `index.html` (populate the controls div with all slider groups)

- [ ] **Step 1: Write the controls HTML inside #controls**

```html
<div class="group-label">Shape 1</div>
<label>Lobes <span class="val" id="val-lobes1">4</span></label>
<input type="range" id="lobes1" min="3" max="5" value="4">
<label>Roundness <span class="val" id="val-roundness1">40</span></label>
<input type="range" id="roundness1" min="0" max="100" value="40">
<label>Size <span class="val" id="val-size1">100</span></label>
<input type="range" id="size1" min="50" max="150" value="100">
<label>Rotation <span class="val" id="val-rot1">0</span></label>
<input type="range" id="rot1" min="0" max="360" value="0">
<label>Offset X <span class="val" id="val-offX1">0</span></label>
<input type="range" id="offX1" min="-300" max="300" value="0">
<label>Offset Y <span class="val" id="val-offY1">0</span></label>
<input type="range" id="offY1" min="-300" max="300" value="-120">

<div class="group-label">Shape 2</div>
<label>Lobes <span class="val" id="val-lobes2">4</span></label>
<input type="range" id="lobes2" min="3" max="5" value="4">
<label>Roundness <span class="val" id="val-roundness2">40</span></label>
<input type="range" id="roundness2" min="0" max="100" value="40">
<label>Size <span class="val" id="val-size2">100</span></label>
<input type="range" id="size2" min="50" max="150" value="100">
<label>Rotation <span class="val" id="val-rot2">0</span></label>
<input type="range" id="rot2" min="0" max="360" value="0">
<label>Offset X <span class="val" id="val-offX2">0</span></label>
<input type="range" id="offX2" min="-300" max="300" value="0">
<label>Offset Y <span class="val" id="val-offY2">0</span></label>
<input type="range" id="offY2" min="-300" max="300" value="120">

<div class="group-label">Shape 3</div>
<label>Lobes <span class="val" id="val-lobes3">4</span></label>
<input type="range" id="lobes3" min="3" max="5" value="4">
<label>Roundness <span class="val" id="val-roundness3">40</span></label>
<input type="range" id="roundness3" min="0" max="100" value="40">
<label>Size <span class="val" id="val-size3">100</span></label>
<input type="range" id="size3" min="50" max="150" value="100">
<label>Rotation <span class="val" id="val-rot3">0</span></label>
<input type="range" id="rot3" min="0" max="360" value="0">
<label>Offset X <span class="val" id="val-offX3">0</span></label>
<input type="range" id="offX3" min="-300" max="300" value="180">
<label>Offset Y <span class="val" id="val-offY3">0</span></label>
<input type="range" id="offY3" min="-300" max="300" value="0">

<div class="group-label">Animation</div>
<label>Intensity <span class="val" id="val-animation">0</span></label>
<input type="range" id="animation" min="0" max="100" value="0">
<label>Float <span class="val" id="val-float">0</span></label>
<input type="range" id="float" min="0" max="100" value="0">

<div class="group-label">Export</div>
<div class="export-btns">
  <button id="exportSvg">SVG</button>
  <button id="exportPng">PNG</button>
</div>
```

- [ ] **Step 2: Verify all controls are present and readable**

Open page, check all 3 shape groups + animation + export appear with correct fonts. Labels underline on hover.

---

### Task 5: Animation

**Files:**
- Modify: `index.html` (add animation loop and start/stop logic)

- [ ] **Step 1: Write the animation loop**

```js
let animRunning = false;
let animData = [];

function animLoop(t) {
  if (!animRunning) return;
  const intensity = +document.getElementById('animation').value;
  const floatAmt = +document.getElementById('float').value;
  const time = t / 1000;
  for (const d of animData) {
    const rotOff = Math.sin(time * d.freqR + d.phaseR) * 80 * (intensity / 100);
    const sc = 1 + Math.sin(time * d.freqS + d.phaseS) * 0.50 * (intensity / 100);
    const fx = Math.sin(time * d.freqFX + d.phaseFX) * 80 * (floatAmt / 100);
    const fy = Math.sin(time * d.freqFY + d.phaseFY) * 80 * (floatAmt / 100);
    d.el.setAttribute('transform',
      `translate(${d.x + fx},${d.y + fy}) rotate(${d.baseRot + rotOff}) scale(${sc})`);
  }
  requestAnimationFrame(animLoop);
}

function startAnim() {
  if (!animRunning) {
    animRunning = true;
    requestAnimationFrame(animLoop);
  }
}

function stopAnim() {
  animRunning = false;
}
```

- [ ] **Step 2: Wire animation sliders**

```js
document.getElementById('animation').addEventListener('input', function() {
  if (+this.value > 0) { startAnim(); }
  else if (+document.getElementById('float').value === 0) { stopAnim(); }
});

document.getElementById('float').addEventListener('input', function() {
  if (+this.value > 0) { startAnim(); }
  else if (+document.getElementById('animation').value === 0) { stopAnim(); }
});
```

- [ ] **Step 3: Test animation**

Set Intensity to 50. Shapes should wobble. Set Float to 50. Shapes should drift. Set both back to 0. Animation should stop.

---

### Task 6: Export (SVG + PNG)

**Files:**
- Modify: `index.html` (add export handlers)

- [ ] **Step 1: Write SVG export**

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
  a.download = 'vector-pattern.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
```

- [ ] **Step 2: Write PNG export**

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
      a.download = 'vector-pattern.png';
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

- [ ] **Step 3: Test export**

Click SVG export — download a .svg file. Open it in a browser — should show the composition. Click PNG export — download a .png file. Should render correctly with #f0eded background.

---

### Task 7: Self-review and final polish

- [ ] **Step 1: Check all spec requirements against implementation**

Verify: 3 shapes, lobe sliders (3-5), procedural anchors with organic irregularity, C1 Bézier (S commands), no stroke, `#1f0001` fill, style guide fonts/colors/hover, free-form X/Y sliders, animation, SVG/PNG export.

- [ ] **Step 2: Manual visual QA**

Open the file. Check:
- Default layout shows 3 organic black shapes on #f0eded canvas
- Adjust each slider — shapes respond in real time
- Change lobe count — shape regenerates with different anchor count
- Set all sliders to extremes — no crashes
- Export SVG — valid SVG file
- Export PNG — valid PNG image with correct background
- Animation at 100 intensity — smooth wobble
- Animation at 100 float — smooth drift
- Labels underline on hover
- Buttons scale(1.05) on hover
