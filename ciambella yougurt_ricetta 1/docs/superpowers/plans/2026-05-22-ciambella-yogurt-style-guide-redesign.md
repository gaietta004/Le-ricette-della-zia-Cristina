# Style Guide Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the single-recipe page to strictly follow Style guide.md (colors, typography, sticker interactions).

**Architecture:** Single `index.html` with inline recipe content, standalone `css/style.css` with style-guide-driven theme, and `js/script.js` for scroll-reveal animations.

**Tech Stack:** Vanilla HTML/CSS/JS. Google Fonts: Zalando Sans Expanded (H1, H2, Body) + VT323 (Caption).

---

### Task 1: Rewrite CSS with Style Guide Theme

**Files:**
- Modify: `css/style.css` (complete rewrite)

- [ ] **Step 1: Write the new CSS with style guide variables, fonts, and layout**

```css
@import url('https://fonts.googleapis.com/css2?family=Zalando+Sans+Expanded:wght@300;400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

:root {
  --bg: #f0eded;
  --text: #1f0001;
  --yellow: #f2f26b;
  --orange: #f58a3d;
  --magenta: #ff5ec1;
  --green: #50e664;
  --font-heading: 'Zalando Sans Expanded', sans-serif;
  --font-body: 'Zalando Sans Expanded', sans-serif;
  --font-caption: 'VT323', monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 22px;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.site-header {
  padding: 2.5rem 0 1rem;
  text-align: center;
}

.site-title {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 30px;
  color: var(--text);
  letter-spacing: -0.5px;
}

.header-divider {
  border: none;
  height: 2px;
  background: var(--text);
  margin: 0.5rem auto 0;
  width: 60px;
}

/* Recipe Hero */
.recipe-hero {
  text-align: center;
  padding: 2.5rem 0 1rem;
}

.recipe-name {
  font-family: var(--font-heading);
  font-weight: 300;
  font-size: 60px;
  color: var(--text);
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.recipe-chef {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 22px;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.recipe-meta {
  font-family: var(--font-caption);
  font-weight: 200;
  font-size: 16px;
  color: var(--text);
  cursor: pointer;
  display: inline-block;
  transition: text-decoration 0.2s ease;
}

.recipe-meta:hover {
  text-decoration: underline;
}

/* Section Headers */
.section-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 22px;
  color: var(--text);
  margin-bottom: 1rem;
  padding-top: 2rem;
}

/* Sticker Ingredients Grid */
.ingredients-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.sticker {
  display: inline-block;
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 18px;
  color: var(--text);
  cursor: default;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  user-select: none;
}

.sticker:hover {
  transform: scale(1.1);
}

/* Sticker colors */
.sticker-yellow {
  background: var(--yellow);
}

.sticker-yellow:hover {
  background: var(--magenta);
  color: #fff;
}

.sticker-orange {
  background: var(--orange);
}

.sticker-orange:hover {
  background: var(--green);
  color: #fff;
}

.sticker-magenta {
  background: var(--magenta);
}

.sticker-magenta:hover {
  background: var(--green);
  color: #fff;
}

.sticker-green {
  background: var(--green);
}

.sticker-green:hover {
  background: var(--magenta);
  color: #fff;
}

/* Disabled (optional) stickers */
.sticker-yellow.sticker-disabled:hover {
  background: var(--yellow);
  color: var(--text);
  transform: scale(1);
}

.sticker-orange.sticker-disabled:hover {
  background: var(--orange);
  color: var(--text);
  transform: scale(1);
}

/* Steps List */
.steps-list {
  list-style: none;
  counter-reset: step;
  margin-bottom: 2rem;
}

.steps-list li {
  counter-increment: step;
  padding: 0.8rem 0 0.8rem 2.8rem;
  position: relative;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 22px;
  color: var(--text);
  line-height: 1.7;
}

.steps-list li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0.8rem;
  width: 28px;
  height: 28px;
  border: 2px solid var(--text);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
}

/* Footer */
.site-footer {
  text-align: center;
  padding: 2rem 0;
  font-family: var(--font-caption);
  font-weight: 200;
  font-size: 16px;
  color: var(--text);
  cursor: pointer;
}

.site-footer:hover {
  text-decoration: underline;
}

/* Scroll Reveal */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .recipe-name {
    font-size: 36px;
  }

  body {
    font-size: 18px;
  }

  .sticker {
    font-size: 15px;
    padding: 0.3rem 1rem;
  }

  .steps-list li {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .recipe-name {
    font-size: 28px;
  }

  .site-title {
    font-size: 24px;
  }
}
```

- [ ] **Step 2: Verify CSS compiles/loads**

No build step — verify by opening `index.html` in a browser after Task 2.

---

### Task 2: Rewrite index.html as Single Recipe Page

**Files:**
- Modify: `index.html` (complete rewrite)

- [ ] **Step 1: Write the new single-recipe index.html**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ciambella allo Yogurt — Le Ricette di Jennifer</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="site-header reveal">
    <div class="container">
      <h1 class="site-title">Le Ricette di Jennifer</h1>
      <hr class="header-divider">
    </div>
  </header>

  <main>
    <article class="recipe-hero reveal">
      <div class="container">
        <h2 class="recipe-name">Ciambella allo Yogurt</h2>
        <p class="recipe-chef">Chef: Jennifer</p>
        <span class="recipe-meta">180° C · 30 min</span>
      </div>
    </article>

    <section class="reveal">
      <div class="container">
        <h3 class="section-title">Ingredienti</h3>
        <div class="ingredients-grid">
          <span class="sticker sticker-yellow">80 g olio di semi</span>
          <span class="sticker sticker-orange">100 g zucchero</span>
          <span class="sticker sticker-magenta">3 uova</span>
          <span class="sticker sticker-green">100 g farina 00</span>
          <span class="sticker sticker-yellow">15 g lievito</span>
          <span class="sticker sticker-orange">120 g yogurt</span>
          <span class="sticker sticker-magenta">1 pizzico sale</span>
          <span class="sticker sticker-yellow sticker-disabled">Gocce cioccolato (q.b.)</span>
          <span class="sticker sticker-orange sticker-disabled">Cacao amaro (q.b.)</span>
        </div>
      </div>
    </section>

    <section class="reveal">
      <div class="container">
        <h3 class="section-title">Preparazione</h3>
        <ol class="steps-list">
          <li>Pre-riscaldare il forno a 180° C.</li>
          <li>In una ciotola inserire 100 g di zucchero e, con le fruste elettriche, tritare fino a ottenere un composto simile allo zucchero a velo.</li>
          <li>Aggiungere 100 g di farina 00 e 80 g di olio di semi di girasole.</li>
          <li>Prendere 3 uova, aprirle a metà una alla volta e versare il composto nella ciotola. Buttare il guscio dell'uovo nella spazzatura umida.</li>
          <li>Prendere le fruste elettriche e mescolare gli ingredienti fino a ottenere un composto liquido.</li>
          <li>Aggiungere 15 g di lievito, 120 g di yogurt e 1 pizzico di sale. Mescolare con le fruste elettriche fino a ottenere un composto liquido omogeneo senza grumi.</li>
          <li>Prendere una teglia per dolci, versare un filo d'olio di semi di girasole e, con un pennello da cucina, spennellare il fondo e i lati interni.</li>
          <li>Trasferire il composto nella teglia imburrata.</li>
          <li>Infornare e cuocere a 180° C per 30 minuti.</li>
          <li>Dopo 30 minuti, estrarre la teglia dal forno e lasciare raffreddare.</li>
        </ol>
      </div>
    </section>
  </main>

  <footer class="site-footer reveal">
    Le Ricette di Jennifer &copy; 2026
  </footer>

  <script src="js/script.js"></script>
</body>
</html>
```

---

### Task 3: Update JS for Scroll Reveal

**Files:**
- Modify: `js/script.js`

- [ ] **Step 1: Write the JS with scroll-triggered reveal**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
```

---

### Task 4: Verify Everything Renders Correctly

- [ ] **Step 1: Check all files exist and HTML references are correct**

Run: `Get-ChildItem -Recurse -File | Select-Object FullName`
Expected: `index.html`, `css/style.css`, `js/script.js` all present.

- [ ] **Step 2: Open index.html in browser**

Open `index.html` in any browser. Verify:
- Background is `#f0eded` (light beige)
- Text color is `#1f0001` (near-black)
- Site title "Le Ricette di Jennifer" uses Zalando Sans Expanded
- Recipe name "Ciambella allo Yogurt" uses Zalando Sans Expanded Light 300
- Ingredient chips show the 4 sticker colors (yellow, orange, magenta, green)
- Optional ingredients look muted (disabled)
- Hovering any sticker chip scales it up
- Hovering the meta or footer text underlines it
- Steps are numbered with circled indicators
- Page is responsive (resize to mobile width)
