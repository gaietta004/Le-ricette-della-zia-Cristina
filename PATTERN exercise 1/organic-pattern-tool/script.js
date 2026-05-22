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

document.querySelectorAll('#controls input').forEach(el => {
  el.addEventListener('input', render);
});

render();

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
