# SITO Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a single-file landing homepage at the root of SITO that links to 5 project subdirectories via interactive, shaped stickers.

**Architecture:** Single `index.html` with embedded CSS and inline SVG. No frameworks. All styles and interactivity in one file. Google Fonts loaded via `@import`. Sticker shapes use CSS `clip-path` and inline SVG `<textPath>`. Stickers positioned absolutely for overlapping multi-layer layout.

**Tech Stack:** HTML5, CSS3, inline SVG, Google Fonts (Zalando Sans Expanded, VT323)

---

### Task 1: HTML Skeleton & Global Styles

**Files:**
- Create: `C:\Users\gaiap\Desktop\WS_abadir\SITO\index.html`

- [ ] **Step 1: Create index.html with head, fonts, and base styles**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GAIA PATTI — SITO</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=VT323&family=Zalando+Sans+Expanded:wght@300;400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      background: #f0eded;
      color: #1f0001;
      font-family: 'Zalando Sans Expanded', sans-serif;
      font-weight: 400;
      font-size: 16px;
      overflow-x: hidden;
    }
    a { text-decoration: none; color: inherit; }
    h1 {
      font-family: 'Zalando Sans Expanded', sans-serif;
      font-weight: 400;
      font-size: 30px;
    }
    h2 {
      font-family: 'Zalando Sans Expanded', sans-serif;
      font-weight: 300;
      font-size: 22px;
    }
    .caption {
      font-family: 'VT323', monospace;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <!-- content added in subsequent tasks -->
</body>
</html>
```

- [ ] **Step 2: Verify the file structure**

Run: `Test-Path -LiteralPath "C:\Users\gaiap\Desktop\WS_abadir\SITO\index.html"`
Expected: True

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add SITO landing page skeleton with global styles"
```

---

### Task 2: Fixed Header Nav

- [ ] **Step 1: Add header HTML inside `<body>`**

```html
<header class="site-header">
  <div class="header-inner">
    <h1><a href="#sticker-canvas">GAIA PATTI</a></h1>
    <nav class="site-nav">
      <a href="#about">about</a>
      <div class="dropdown">
        <a href="#" class="dropdown-trigger" id="projects-trigger">projects</a>
        <div class="dropdown-menu" id="projects-menu">
          <a href="ciambella yougurt_ricetta 1/index.html" target="_blank">YOU HUNGRY?</a>
          <a href="HANDTRACKING 1/index.html" target="_blank">HELLO HANDS</a>
          <a href="TIPOGRAFIA CINETICA 1/index.html" target="_blank">SAY HI</a>
          <a href="MASCHERA SONORA 1/index.html" target="_blank">LET PALLINO SPEAK UP</a>
          <a href="PATTERN exercise 1/index.html" target="_blank">MORPH YOUR PATTERN</a>
        </div>
      </div>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Add header CSS inside `<style>`**

```css
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: #f0eded;
  padding: 20px 40px;
  border-bottom: 1px solid rgba(31,0,1,0.1);
}
.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.site-nav {
  display: flex;
  gap: 30px;
  align-items: center;
}
.site-nav > a, .dropdown-trigger {
  font-size: 16px;
  font-weight: 400;
}
.site-nav > a:hover, .dropdown-trigger:hover {
  text-decoration: underline;
}
.dropdown {
  position: relative;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: #f0eded;
  border: 1px solid rgba(31,0,1,0.1);
  min-width: 220px;
  padding: 8px 0;
  z-index: 200;
}
.dropdown-menu.open {
  display: block;
}
.dropdown-menu a {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
}
.dropdown-menu a:hover {
  background: rgba(31,0,1,0.05);
  text-decoration: underline;
}
```

- [ ] **Step 3: Add dropdown toggle JavaScript before `</body>`**

```html
<script>
  const trigger = document.getElementById('projects-trigger');
  const menu = document.getElementById('projects-menu');
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
</script>
```

- [ ] **Step 4: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add fixed header nav with projects dropdown"
```

---

### Task 3: Sticker Canvas Container & Layout Styles

- [ ] **Step 1: Add sticker canvas HTML after header, before About section**

```html
<section id="sticker-canvas" class="sticker-canvas">
  <!-- stickers added in Tasks 4-8 -->
</section>
```

- [ ] **Step 2: Add canvas CSS**

```css
.sticker-canvas {
  position: relative;
  width: 100%;
  height: 100vh;
  margin-top: 80px; /* header height */
  overflow: hidden;
}
.sticker {
  position: absolute;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;
}
.sticker:hover {
  transform: scale(1.05);
}
.sticker .label {
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 8px;
}
.sticker .caption {
  font-family: 'VT323', monospace;
  font-size: 16px;
}
.sticker .caption:hover {
  text-decoration: underline;
}
```

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add sticker canvas container with base sticker styles"
```

---

### Task 4: Sticker 1 — "YOU HUNGRY?" (Wavy Orange Rectangle)

- [ ] **Step 1: Add Sticker 1 HTML inside `.sticker-canvas`**

```html
<a href="ciambella yougurt_ricetta 1/index.html" target="_blank" class="sticker sticker-1">
  <span class="label">YOU HUNGRY?</span>
  <span class="caption">click here</span>
</a>
```

- [ ] **Step 2: Add Sticker 1 CSS**

```css
.sticker-1 {
  width: 260px;
  height: 180px;
  background: #f58a3d;
  color: #f2f26b;
  top: 12%;
  left: 8%;
  transform: rotate(-5deg);
  clip-path: polygon(
    2% 2%, 5% 8%, 10% 3%, 14% 10%, 19% 4%, 24% 11%, 29% 5%,
    34% 12%, 39% 4%, 44% 10%, 49% 5%, 54% 12%, 59% 4%,
    64% 11%, 69% 5%, 74% 12%, 79% 4%, 84% 10%, 89% 5%,
    94% 10%, 98% 5%, 98% 15%, 95% 20%, 98% 25%, 95% 30%,
    98% 35%, 95% 40%, 98% 45%, 95% 50%, 98% 55%, 95% 60%,
    98% 65%, 95% 70%, 98% 75%, 95% 80%, 98% 85%, 95% 90%,
    98% 95%, 94% 98%, 89% 94%, 84% 98%, 79% 94%, 74% 98%,
    69% 94%, 64% 98%, 59% 94%, 54% 98%, 49% 94%, 44% 98%,
    39% 94%, 34% 98%, 29% 94%, 24% 98%, 19% 94%, 14% 98%,
    9% 94%, 5% 98%, 2% 94%, 5% 90%, 2% 85%, 5% 80%,
    2% 75%, 5% 70%, 2% 65%, 5% 60%, 2% 55%, 5% 50%,
    2% 45%, 5% 40%, 2% 35%, 5% 30%, 2% 25%, 5% 20%,
    2% 15%, 5% 10%
  );
  border-radius: 10px;
}
.sticker-1:hover {
  transform: rotate(-5deg) scale(1.05);
}
```

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add sticker 1 - wavy orange rectangle 'YOU HUNGRY?'"
```

---

### Task 5: Sticker 2 — "HELLO HANDS" (Yellow Cloud)

- [ ] **Step 1: Add Sticker 2 HTML inside `.sticker-canvas`**

```html
<a href="HANDTRACKING 1/index.html" target="_blank" class="sticker sticker-2">
  <span class="label">HELLO HANDS</span>
  <span class="caption">click here</span>
</a>
```

- [ ] **Step 2: Add Sticker 2 CSS**

```css
.sticker-2 {
  width: 240px;
  height: 200px;
  background: #f2f26b;
  color: #f58a3d;
  top: 8%;
  right: 10%;
  clip-path: path('M120,0 C140,0 160,20 160,40 C180,30 200,40 210,60 C220,80 210,100 200,110 C220,120 230,140 220,160 C210,180 190,190 170,195 C160,200 140,200 120,200 C100,200 80,200 70,195 C50,190 30,180 20,160 C10,140 20,120 40,110 C30,100 20,80 30,60 C40,40 60,30 80,40 C80,20 100,0 120,0 Z');
}
```

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add sticker 2 - yellow cloud 'HELLO HANDS'"
```

---

### Task 6: Sticker 3 — "SAY HI" (Magenta Starburst) — Hero Center

- [ ] **Step 1: Add Sticker 3 HTML inside `.sticker-canvas`**

```html
<a href="TIPOGRAFIA CINETICA 1/index.html" target="_blank" class="sticker sticker-3">
  <span class="label">SAY HI</span>
  <span class="caption">click here</span>
</a>
```

- [ ] **Step 2: Add Sticker 3 CSS**

```css
.sticker-3 {
  width: 220px;
  height: 220px;
  background: #ff5ec1;
  color: #50e664;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  clip-path: polygon(
    50% 0%, 56% 18%, 75% 5%, 68% 24%, 88% 15%,
    78% 33%, 98% 30%, 85% 45%, 100% 50%, 85% 55%,
    98% 70%, 78% 67%, 88% 85%, 68% 76%, 75% 95%,
    56% 82%, 50% 100%, 44% 82%, 25% 95%, 32% 76%,
    12% 85%, 22% 67%, 2% 70%, 15% 55%, 0% 50%,
    15% 45%, 2% 30%, 22% 33%, 12% 15%, 32% 24%,
    25% 5%, 44% 18%
  );
}
.sticker-3:hover {
  transform: translate(-50%, -50%) scale(1.05);
}
```

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add sticker 3 - magenta starburst 'SAY HI'"
```

---

### Task 7: Sticker 4 — "LET PALLINO SPEAK UP" (Green Circle with SVG textPath)

- [ ] **Step 1: Add Sticker 4 HTML inside `.sticker-canvas`**

```html
<a href="MASCHERA SONORA 1/index.html" target="_blank" class="sticker sticker-4">
  <svg viewBox="0 0 200 200" width="200" height="200">
    <defs>
      <path id="text-circle" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
    </defs>
    <circle cx="100" cy="100" r="90" fill="#50e664" />
    <text fill="#ff5ec1" font-family="'Zalando Sans Expanded', sans-serif" font-size="18" font-weight="400" letter-spacing="2">
      <textPath href="#text-circle" startOffset="50%" text-anchor="middle">LET PALLINO SPEAK UP</textPath>
    </text>
  </svg>
  <span class="caption" style="position:absolute;bottom:30px;">click here</span>
</a>
```

- [ ] **Step 2: Add Sticker 4 CSS**

```css
.sticker-4 {
  width: 220px;
  height: 220px;
  bottom: 10%;
  left: 8%;
  border-radius: 50%;
  overflow: hidden;
  padding: 0;
}
.sticker-4 svg {
  display: block;
}
```

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add sticker 4 - green circle with SVG textPath 'LET PALLINO SPEAK UP'"
```

---

### Task 8: Sticker 5 — "MORPH YOUR PATTERN" (Wavy Orange Rectangle, tilted)

- [ ] **Step 1: Add Sticker 5 HTML inside `.sticker-canvas`**

```html
<a href="PATTERN exercise 1/index.html" target="_blank" class="sticker sticker-5">
  <span class="label">MORPH YOUR PATTERN</span>
  <span class="caption">click here</span>
</a>
```

- [ ] **Step 2: Add Sticker 5 CSS**

```css
.sticker-5 {
  width: 260px;
  height: 180px;
  background: #f58a3d;
  color: #f2f26b;
  bottom: 8%;
  right: 8%;
  transform: rotate(4deg);
  clip-path: polygon(
    2% 2%, 5% 8%, 10% 3%, 14% 10%, 19% 4%, 24% 11%, 29% 5%,
    34% 12%, 39% 4%, 44% 10%, 49% 5%, 54% 12%, 59% 4%,
    64% 11%, 69% 5%, 74% 12%, 79% 4%, 84% 10%, 89% 5%,
    94% 10%, 98% 5%, 98% 15%, 95% 20%, 98% 25%, 95% 30%,
    98% 35%, 95% 40%, 98% 45%, 95% 50%, 98% 55%, 95% 60%,
    98% 65%, 95% 70%, 98% 75%, 95% 80%, 98% 85%, 95% 90%,
    98% 95%, 94% 98%, 89% 94%, 84% 98%, 79% 94%, 74% 98%,
    69% 94%, 64% 98%, 59% 94%, 54% 98%, 49% 94%, 44% 98%,
    39% 94%, 34% 98%, 29% 94%, 24% 98%, 19% 94%, 14% 98%,
    9% 94%, 5% 98%, 2% 94%, 5% 90%, 2% 85%, 5% 80%,
    2% 75%, 5% 70%, 2% 65%, 5% 60%, 2% 55%, 5% 50%,
    2% 45%, 5% 40%, 2% 35%, 5% 30%, 2% 25%, 5% 20%,
    2% 15%, 5% 10%
  );
  border-radius: 10px;
}
.sticker-5:hover {
  transform: rotate(4deg) scale(1.05);
}
```

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add sticker 5 - wavy orange rectangle 'MORPH YOUR PATTERN'"
```

---

### Task 9: About Section

- [ ] **Step 1: Add About section HTML after `.sticker-canvas`**

```html
<section id="about" class="about-section">
  <div class="about-inner">
    <h2>LLM, coding explorations of a curious graphic designer</h2>
    <p>This website collects a series of experimental projects exploring the intersection of graphic design, creative coding, and artificial intelligence. Each project investigates a different interaction modality — from hand tracking to typography, sound visualization to pattern generation — using code as a design material.</p>
    <p>Click on any sticker or use the projects menu to explore each experiment.</p>
  </div>
</section>
```

- [ ] **Step 2: Add About section CSS**

```css
.about-section {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  background: #f0eded;
}
.about-inner {
  max-width: 600px;
  text-align: center;
}
.about-inner h2 {
  margin-bottom: 24px;
}
.about-inner p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 16px;
}
```

- [ ] **Step 3: Commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: add about section with description"
```

---

### Task 10: Self-Review & Polish

- [ ] **Step 1: Review the HTML in a browser**

Open `C:\Users\gaiap\Desktop\WS_abadir\SITO\index.html` in a browser and verify:
- Header shows "GAIA PATTI" (left), "about" and "projects" (right)
- Clicking "projects" opens dropdown with 5 project names
- Each dropdown link opens in a new tab
- 5 visible stickers with correct shapes, colors, and text
- Stickers scale on hover
- "click here" captions underline on hover
- Sticker links open project pages in new tabs
- Clicking "about" scrolls to the about section
- Stickers overlap in a multi-layered composition

- [ ] **Step 2: Verify all links work**

Run the following in PowerShell:
```powershell
$sito = "C:\Users\gaiap\Desktop\WS_abadir\SITO"
$links = @(
  "ciambella yougurt_ricetta 1/index.html",
  "HANDTRACKING 1/index.html",
  "TIPOGRAFIA CINETICA 1/index.html",
  "MASCHERA SONORA 1/index.html",
  "PATTERN exercise 1/index.html"
)
$allExist = $true
foreach ($link in $links) {
  $exists = Test-Path -LiteralPath "$sito\$link"
  Write-Host "$link : $exists"
  if (-not $exists) { $allExist = $false }
}
Write-Host "All links valid: $allExist"
```
Expected: All return True

- [ ] **Step 3: Final commit**

```bash
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" add index.html
git -C "C:\Users\gaiap\Desktop\WS_abadir\SITO" commit -m "feat: complete SITO landing page with all stickers and navigation"
```

---

### Task 11: Spec Self-Review Against Plan

- [ ] **Step 1: Verify spec coverage**

Check each spec requirement against plan tasks:
- Style guide colors/typography applied → Tasks 1, 3
- Fixed header with GAIA PATTI, about, projects → Task 2
- Projects dropdown listing 5 projects → Task 2
- Sticker 1 (wavy orange, "YOU HUNGRY?") → Task 4
- Sticker 2 (yellow cloud, "HELLO HANDS") → Task 5
- Sticker 3 (magenta starburst, "SAY HI") → Task 6
- Sticker 4 (green circle, textPath, "LET PALLINO SPEAK UP") → Task 7
- Sticker 5 (wavy orange, "MORPH YOUR PATTERN") → Task 8
- About section → Task 9
- All links target="_blank" → covered in all sticker and dropdown tasks
- Hover effects (underline, scale) → Tasks 2, 3
- ricette zia omitted → confirmed

No gaps found.
