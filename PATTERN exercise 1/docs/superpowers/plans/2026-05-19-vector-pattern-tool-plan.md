# Vector Pattern Design Tool — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing `index.html` to replace the 3 shape generators (organic blob, pacman sector, irregular triangle) with new shapes (bezier squircle, reflex-notch ellipse, irregular triangle), add per-shape size controls, and implement bounding-box-aware tiling for overlap prevention.

**Architecture:** Single `index.html` with inline CSS and JS. SVG `<path>` elements rendered directly in the DOM. Sliders update SVG attributes in real-time. Overlap prevention via computed bounding radii at render time.

**Tech Stack:** HTML5, CSS3, Vanilla JS (ES6), SVG (DOM), Canvas API

---

### Task 1: Replace Shape 1 — Bezier Squircle

**Files:**
- Modify: `index.html` (the `organicBlob` function and its call in `buildShapePath`)

- [ ] **Step 1: Replace `organicBlob` with `bezierSquircle`**

Find the `organicBlob` function (lines 52-86) and replace it with:

```js
function bezierSquircle(size, roundness) {
  const s = size / 2;
  const r = roundness / 100;
  const bow = 0.15 * r;        // side bow factor (0 = straight, max = bowed out)
  const cornerR = s * r * 0.5; // corner rounding radius
  const k = 0.55228;           // bezier ellipse constant

  // Side midpoints
  const L = { x: -s - bow * s, y: 0 };
  const T = { x: 0, y: -s - bow * s };
  const R = { x: s + bow * s, y: 0 };
  const B = { x: 0, y: s + bow * s };

  // Corner control points — use bezier approximation of rounded corner
  // For each corner, approach from one side, round, depart to next
  const tl = { x: -s, y: -s }; // top-left corner center (sharp)
  const tr = { x: s, y: -s };  // top-right
  const br = { x: s, y: s };   // bottom-right
  const bl = { x: -s, y: s };  // bottom-left

  const cr = Math.min(cornerR, s * 0.49);

  // Build rounded-corner rectangle using arc joins
  // Start at left-midpoint, go clockwise
  let d = `M${L.x},${L.y}`;
  // Left side up to top-left corner
  d += `L${tl.x},${tl.y + cr}`;
  // Top-left corner arc
  d += `A${cr},${cr} 0 0,1 ${tl.x + cr},${tl.y}`;
  // Top side to top-right corner
  d += `L${tr.x - cr},${tr.y}`;
  // Top-right corner arc
  d += `A${cr},${cr} 0 0,1 ${tr.x},${tr.y + cr}`;
  // Right side to bottom-right corner
  d += `L${br.x},${br.y - cr}`;
  // Bottom-right corner arc
  d += `A${cr},${cr} 0 0,1 ${br.x - cr},${br.y}`;
  // Bottom side to bottom-left corner
  d += `L${bl.x + cr},${bl.y}`;
  // Bottom-left corner arc
  d += `A${cr},${cr} 0 0,1 ${bl.x},${bl.y - cr}`;
  // Close to left side
  d += `Z`;
  return d;
}
```

- [ ] **Step 2: Update the type switch in `buildShapePath`**

Change line 142 from `case 'square': d = organicBlob(size, roundness); break;` to:

```js
case 'square':    d = bezierSquircle(size, roundness); break;
```

- [ ] **Step 3: Open in browser and verify**

Open `index.html`. Shape 1 should now appear as a rounded-corner rectangle with slightly bowed sides. Move the roundness slider — at 0 it should be a sharp rectangle, at 100 it should approach a circle.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: replace organic blob with bezier squircle shape"
```

---

### Task 2: Replace Shape 2 — Reflex-Notch Ellipse

**Files:**
- Modify: `index.html` (replace `pacmanSector` function)

- [ ] **Step 1: Replace `pacmanSector` with `reflexEllipse`**

Find the `pacmanSector` function (lines 88-104) and replace it with:

```js
function reflexEllipse(size, roundness) {
  const rx = size * 0.48;
  const ry = size * 0.44;
  const k = 0.55228;
  const dent = 0.32;           // notch depth factor (30-35%)
  const smooth = roundness / 100;
  const notchDepth = dent * rx * (0.8 + smooth * 0.2);
  const notchW = rx * (0.55 + smooth * 0.15);  // how far right the notch extends before curving in

  // Build 4 bezier segments for the full shape
  // TL quadrant: normal ellipse
  // TR quadrant: curves inward
  // BR quadrant: curves back outward
  // BL quadrant: normal ellipse

  return [
    // Start at left edge
    `M${-rx},0`,
    // TL quadrant: left → top (normal ellipse)
    `C${-rx},${-ry * k} ${-rx * k},${-ry} 0,${-ry}`,
    // TR quadrant: top → right (curves inward toward center)
    // Control points shift inward to create the reflex notch
    `C${rx * k * 0.7},${-ry * 0.9} ${notchW},${-notchDepth * 0.6} ${rx * 0.35},0`,
    // BR quadrant: right → bottom (curves back outward)
    `C${notchW},${notchDepth * 0.6} ${rx * k * 0.7},${ry * 0.9} 0,${ry}`,
    // BL quadrant: bottom → left (normal ellipse)
    `C${-rx * k},${ry} ${-rx},${ry * k} ${-rx},0Z`
  ].join('');
}
```

- [ ] **Step 2: Update the type switch in `buildShapePath`**

Change line 143 from `case 'ellipse': d = pacmanSector(size, roundness); break;` to:

```js
case 'ellipse':   d = reflexEllipse(size, roundness); break;
```

- [ ] **Step 3: Open in browser and verify**

Open `index.html`. Shape 2 should now appear as an ellipse-like shape with a smooth inward notch on the right side. The notch should be moderate (not too deep, not too shallow).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: replace pacman sector with reflex-notch ellipse"
```

---

### Task 3: Refine Shape 3 — Irregular Triangle

**Files:**
- Modify: `index.html` (update `irregularTriangle` for more distinct side lengths)

- [ ] **Step 1: Update `irregularTriangle` with more distinct sides**

Find the `irregularTriangle` function (lines 106-137) and replace the `pts` array distances to make the triangle more clearly scalene:

```js
function irregularTriangle(size, roundness) {
  const r = size / 2;
  const smooth = (roundness / 100) * r * 0.4;
  // 3 vertices at distinctly different distances for scalene triangle
  const pts = [
    { a: -Math.PI/2,     d: r * 0.95 },  // top vertex (longest)
    { a: Math.PI/5,      d: r * 0.65 },  // bottom-right (shortest)
    { a: 5*Math.PI/6,    d: r * 0.80 }   // bottom-left (medium)
  ];
  const corners = pts.map(p => ({ x: Math.cos(p.a)*p.d, y: Math.sin(p.a)*p.d }));
  function roundCorner(p, c, n, rad) {
    const dx1 = p.x - c.x, dy1 = p.y - c.y;
    const dx2 = n.x - c.x, dy2 = n.y - c.y;
    const len1 = Math.sqrt(dx1*dx1+dy1*dy1), len2 = Math.sqrt(dx2*dx2+dy2*dy2);
    const ux1 = dx1/len1, uy1 = dy1/len1;
    const ux2 = dx2/len2, uy2 = dy2/len2;
    const radUse = Math.min(rad, len1*0.4, len2*0.4);
    const p1x = c.x + ux1*radUse, p1y = c.y + uy1*radUse;
    const p2x = c.x + ux2*radUse, p2y = c.y + uy2*radUse;
    const cross = ux1*uy2 - uy1*ux2;
    const sweep = cross > 0 ? 0 : 1;
    return { p1: {x:p1x, y:p1y}, p2: {x:p2x, y:p2y}, sweep, rad: radUse };
  }
  const c = corners.map((pt, i) => roundCorner(
    corners[(i+2)%3], pt, corners[(i+1)%3], smooth
  ));
  let d = `M${c[0].p1.x},${c[0].p1.y}`;
  for (let i = 0; i < 3; i++) {
    const n = (i+1)%3;
    d += `L${c[i].p2.x},${c[i].p2.y}A${c[i].rad},${c[i].rad} 0 0,${c[i].sweep} ${c[n].p1.x},${c[n].p1.y}`;
  }
  return d + 'Z';
}
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html`. Shape 3 should be a scalene triangle with 3 clearly different side lengths and rounded corners.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: refine irregular triangle for more distinct scalene sides"
```

---

### Task 4: Add Per-Shape Size Sliders

**Files:**
- Modify: `index.html` (HTML controls panel + JS)

- [ ] **Step 1: Add 3 size slider controls to the HTML**

After the roundness slider (around line 24-25), add:

```html
<label>Size 1 <input type="range" id="size1" min="50" max="150" value="100"></label>
<label>Size 2 <input type="range" id="size2" min="50" max="150" value="100"></label>
<label>Size 3 <input type="range" id="size3" min="50" max="150" value="100"></label>
```

- [ ] **Step 2: Add size params to `getParams`**

Add these lines to the `getParams` function:

```js
size1: +document.getElementById('size1').value,
size2: +document.getElementById('size2').value,
size3: +document.getElementById('size3').value,
```

- [ ] **Step 3: Open in browser and verify**

Open `index.html`. Three new sliders should appear under "Roundness" in the Shape section. Moving them should... not yet change anything (we update `generatePattern` in Task 5). Verify the sliders exist and range 50-150.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add per-shape size slider controls"
```

---

### Task 5: Update Tiling Engine with Bounds Checking

**Files:**
- Modify: `index.html` (the `generatePattern` function)

- [ ] **Step 1: Rewrite `generatePattern` with per-shape sizing and overlap prevention**

Replace the entire `generatePattern` function (lines 149-196) with:

```js
function generatePattern(params) {
  const { roundness, rot1, rot2, rot3, spacing, scale, fillColor, useStroke, strokeColor, size1, size2, size3 } = params;
  const baseSize = 110 * (scale / 100);

  // Build shapes with per-shape size multipliers
  const shapes = [
    buildShapePath('square', baseSize * size1 / 100, roundness, rot1),
    buildShapePath('ellipse', baseSize * size2 / 100, roundness, rot2),
    buildShapePath('triangle', baseSize * size3 / 100, roundness, rot3),
  ];

  // Compute bounding radius for each shape (all centered at origin, max extent = size/2)
  const sizes = [size1, size2, size3];
  const radii = sizes.map(s => (baseSize * s / 100) / 2);

  // Minimum triangle side length to prevent pairwise overlap
  const minSide = Math.max(
    radii[0] + radii[1],
    radii[1] + radii[2],
    radii[2] + radii[0]
  );
  const gap = spacing * 0.8;
  const triRadius = (minSide + gap) / Math.sqrt(3); // circumradius of equilateral triangle

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
  const fill = useStroke ? 'transparent' : fillColor;
  const stroke = useStroke ? strokeColor : 'none';
  const strokeW = useStroke ? 1.5 * (scale/100) : 0;

  for (let row = 0; row < rows; row++) {
    const yOff = offY + row * tileH;
    for (let col = 0; col < cols; col++) {
      const xOff = offX + (row % 2 === 0 ? 0 : tileW / 2) + col * tileW;
      // Vertices of the equilateral triangle tile (clockwise from top)
      const vx = [0, triRadius * cos30, -triRadius * cos30];
      const vy = [-triRadius, triRadius * sin30, triRadius * sin30];
      const cx = xOff + triRadius;
      const cy = yOff + tileH / 2;
      if (cx - triRadius * 2 > viewW || cx + triRadius * 2 < 0 || cy - triRadius * 2 > viewH || cy + triRadius * 2 < 0) continue;
      for (let s = 0; s < 3; s++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', shapes[s].d);
        path.setAttribute('fill', fill);
        path.setAttribute('stroke', stroke);
        path.setAttribute('stroke-width', strokeW);
        path.setAttribute('transform', `translate(${cx+vx[s]},${cy+vy[s]}) rotate(${shapes[s].rot})`);
        svg.appendChild(path);
      }
    }
  }
}
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html`. Pattern should render with all 3 new shapes. Move each size slider — that shape should grow/shrink independently. Move spacing — tiles should separate further. Move scale — everything scales proportionally. Verify shapes do not overlap at any combination of size/spacing/scale settings.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: update tiling engine with per-shape sizing and overlap prevention"
```

---

### Task 6: Polish and Edge Cases

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Ensure stroke defaults to off**

In the HTML, verify the stroke checkbox has no `checked` attribute:

```html
<label><input type="checkbox" id="useStroke"> Stroke</label>
```

If `checked` is present, remove it. The user wants "no stroke, just plain black shapes" as default.

- [ ] **Step 2: Verify defaults are correct**

Initial render defaults should be:
- Roundness: 40
- All sizes: 100
- All rotations: 0
- Spacing: 30
- Scale: 100
- Fill: #000000
- Stroke: unchecked

- [ ] **Step 3: Test all edge cases**

Open `index.html` and manually test:
- Roundness 0 → all shapes sharp
- Roundness 100 → all shapes maximally rounded
- Size 50% for one shape, 150% for another → tile adapts, no overlap
- All sizes 150%, spacing 0 → shapes close but not touching
- Scale 25% → small dense pattern
- Scale 200% → large shapes, fewer tiles
- SVG export → valid `.svg` file
- PNG export → valid 800×800 `.png` file

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "chore: set default no-stroke state and verify edge cases"
```
