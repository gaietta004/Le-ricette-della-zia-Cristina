# Recipe Portfolio Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bold, colorful multi-recipe portfolio site starting with the Ciambella allo Yogurt recipe.

**Architecture:** Pure static site (HTML/CSS/JS) with a shared stylesheet and a template system for adding new recipes. The gallery page (`index.html`) lists all recipes as colorful cards. Each recipe is a standalone HTML page under `recipes/`. No frameworks, no build step.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Google Fonts (Poppins + Inter)

---

## File Structure

```
ciambella yougurt_ricetta/
├── index.html                  ← gallery page
├── css/
│   └── style.css               ← shared styles (colors, typography, cards, recipe layout, responsive)
├── js/
│   └── script.js               ← scroll reveal animations, interactive effects
├── recipes/
│   ├── template.html           ← reusable template for new recipes
│   └── ciambella-allo-yogurt.html  ← first recipe
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-05-18-...-design.md
        └── plans/
            └── 2026-05-18-...-plan.md       ← this file
```

---

### Task 1: Create shared stylesheet (`css/style.css`)

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Write the complete CSS**

```css
/* ===== CSS Variables & Theme ===== */
:root {
  --coral: #FF6B6B;
  --yellow: #FFE66D;
  --teal: #4ECDC4;
  --purple: #9B59B6;
  --bg: #FFF8F0;
  --text: #2D3436;
  --text-light: #636E72;
  --white: #FFFFFF;
  --shadow: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-hover: 0 8px 30px rgba(0,0,0,0.15);
  --radius: 16px;
  --radius-sm: 8px;
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

/* ===== Reset & Base ===== */
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
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

/* ===== Typography ===== */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.2;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

/* ===== Header ===== */
.site-header {
  background: linear-gradient(135deg, var(--coral), var(--purple));
  padding: 2rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.site-header::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 40px;
  background: var(--bg);
  border-radius: 50% 50% 0 0;
}

.site-title {
  font-size: 2.8rem;
  color: var(--white);
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
}

.site-subtitle {
  color: var(--yellow);
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 0.3rem;
}

/* ===== Container ===== */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ===== Gallery Grid ===== */
.gallery {
  padding: 3rem 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.recipe-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-bottom: 4px solid var(--coral);
}

.recipe-card:nth-child(2n) {
  border-bottom-color: var(--teal);
}

.recipe-card:nth-child(3n) {
  border-bottom-color: var(--yellow);
}

.recipe-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.recipe-card-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--coral), var(--yellow));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 3rem;
}

.recipe-card-body {
  padding: 1.5rem;
}

.recipe-card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.recipe-card-chef {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
}

.recipe-card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.recipe-card-tag {
  background: var(--yellow);
  color: var(--text);
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.recipe-card-tag.teal {
  background: var(--teal);
  color: var(--white);
}

.recipe-card-tag.coral {
  background: var(--coral);
  color: var(--white);
}

/* ===== Breadcrumb ===== */
.breadcrumb {
  padding: 1rem 0;
  font-size: 0.9rem;
  color: var(--text-light);
}

.breadcrumb a {
  color: var(--purple);
  font-weight: 500;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

/* ===== Recipe Hero ===== */
.recipe-hero {
  text-align: center;
  padding: 2.5rem 0 1.5rem;
}

.recipe-hero h1 {
  font-size: 2.5rem;
  color: var(--text);
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.recipe-hero h1::after {
  content: '';
  display: block;
  width: 60%;
  height: 4px;
  background: linear-gradient(90deg, var(--coral), var(--yellow));
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.recipe-chef {
  color: var(--text-light);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.recipe-chef span {
  color: var(--purple);
  font-weight: 600;
}

/* ===== Recipe Meta ===== */
.recipe-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem 0;
  flex-wrap: wrap;
}

.recipe-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--white);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  box-shadow: var(--shadow);
  font-size: 0.9rem;
  font-weight: 500;
}

.recipe-meta-item .icon {
  font-size: 1.2rem;
}

/* ===== Content Sections ===== */
.recipe-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 0;
}

.section-divider {
  height: 3px;
  background: linear-gradient(90deg, var(--teal), var(--coral), var(--yellow));
  border: none;
  margin: 0 auto;
  width: 80%;
  max-width: 700px;
  border-radius: 2px;
}

.recipe-section h2 {
  font-size: 1.6rem;
  color: var(--purple);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== Ingredients ===== */
.ingredients-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.ingredients-list li {
  background: var(--white);
  border: 2px solid var(--teal);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: var(--shadow);
}

.ingredients-list li.optional {
  border-color: var(--yellow);
  color: var(--text-light);
  font-style: italic;
}

.ingredients-list li.accent {
  border-color: var(--coral);
}

/* ===== Steps ===== */
.steps-list {
  list-style: none;
  counter-reset: step;
}

.steps-list li {
  counter-increment: step;
  padding: 1rem 1rem 1rem 3.5rem;
  position: relative;
  margin-bottom: 1rem;
  background: var(--white);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  line-height: 1.7;
}

.steps-list li::before {
  content: counter(step);
  position: absolute;
  left: 0.8rem;
  top: 1rem;
  width: 30px;
  height: 30px;
  background: var(--coral);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  font-family: var(--font-display);
}

.steps-list li:nth-child(2n)::before {
  background: var(--teal);
}

.steps-list li:nth-child(3n)::before {
  background: var(--purple);
}

/* ===== Back Link ===== */
.back-link {
  text-align: center;
  padding: 2rem 0 3rem;
}

.back-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--coral);
  color: var(--white);
  padding: 0.7rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: var(--shadow);
}

.back-link a:hover {
  background: var(--purple);
  transform: translateY(-2px);
}

/* ===== Footer ===== */
.site-footer {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-size: 0.85rem;
  border-top: 2px solid rgba(0,0,0,0.05);
  margin-top: 2rem;
}

/* ===== Scroll Reveal Animation ===== */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .site-title {
    font-size: 2rem;
  }

  .recipe-hero h1 {
    font-size: 1.8rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .recipe-meta {
    gap: 0.8rem;
  }

  .container {
    padding: 0 1rem;
  }

  .recipe-section {
    padding: 1.5rem 0;
  }
}

@media (max-width: 480px) {
  .site-title {
    font-size: 1.6rem;
  }

  .recipe-hero h1 {
    font-size: 1.4rem;
  }

  .ingredients-list li {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }
}
```

- [ ] **Step 2: Create the file**

Run the Write tool to create `css/style.css` with the content above.

---

### Task 2: Create JavaScript (`js/script.js`)

**Files:**
- Create: `js/script.js`

- [ ] **Step 1: Write the complete JS**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
```

- [ ] **Step 2: Create the file**

Run the Write tool to create `js/script.js` with the content above.

---

### Task 3: Create recipe template (`recipes/template.html`)

**Files:**
- Create: `recipes/template.html`

- [ ] **Step 1: Write the complete template HTML**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NOME RICETTA — Le Ricette di Jennifer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <div class="container">
    <nav class="breadcrumb">
      <a href="../index.html">← Tutte le ricette</a>
    </nav>
  </div>

  <article class="recipe-hero reveal">
    <div class="container">
      <h1>NOME RICETTA</h1>
      <p class="recipe-chef">Chef: <span>NOME CHEF</span></p>
    </div>
  </article>

  <div class="container">
    <div class="recipe-meta reveal">
      <div class="recipe-meta-item">
        <span class="icon">🔥</span>
        TEMPERATURA
      </div>
      <div class="recipe-meta-item">
        <span class="icon">⏱️</span>
        DURATA
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>INGREDIENTE 1</li>
        <li>INGREDIENTE 2</li>
        <li class="optional">OPZIONALE</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <ol class="steps-list">
        <li>PASSO 1</li>
        <li>PASSO 2</li>
      </ol>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Le Ricette di Jennifer &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the file**

Run the Write tool to create `recipes/template.html` with the content above.

---

### Task 4: Create the first recipe page (`recipes/ciambella-allo-yogurt.html`)

**Files:**
- Create: `recipes/ciambella-allo-yogurt.html`

- [ ] **Step 1: Write the complete recipe HTML**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ciambella allo Yogurt — Le Ricette di Jennifer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <div class="container">
    <nav class="breadcrumb">
      <a href="../index.html">← Tutte le ricette</a>
    </nav>
  </div>

  <article class="recipe-hero reveal">
    <div class="container">
      <h1>Ciambella allo Yogurt</h1>
      <p class="recipe-chef">Chef: <span>Jennifer</span></p>
    </div>
  </article>

  <div class="container">
    <div class="recipe-meta reveal">
      <div class="recipe-meta-item">
        <span class="icon">🔥</span>
        180° C
      </div>
      <div class="recipe-meta-item">
        <span class="icon">⏱️</span>
        30 min
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>80 g olio di semi di girasole</li>
        <li>100 g zucchero</li>
        <li>3 uova</li>
        <li>100 g farina 00</li>
        <li>15 g lievito</li>
        <li>120 g yogurt</li>
        <li>1 pizzico di sale</li>
        <li class="optional">Gocce di cioccolato (q.b.)</li>
        <li class="optional">Cacao amaro in polvere (q.b.)</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
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

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Le Ricette di Jennifer &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the file**

Run the Write tool to create `recipes/ciambella-allo-yogurt.html` with the content above.

---

### Task 5: Create the gallery page (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the complete index HTML**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Le Ricette di Jennifer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="site-header">
    <div class="container">
      <h1 class="site-title">Le Ricette di Jennifer</h1>
      <p class="site-subtitle">Dolci fatti in casa con amore 🍰</p>
    </div>
  </header>

  <main class="gallery">
    <div class="container">
      <div class="gallery-grid">

        <a href="recipes/ciambella-allo-yogurt.html" class="recipe-card reveal">
          <div class="recipe-card-image">🍩</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Ciambella allo Yogurt</h2>
            <p class="recipe-card-chef">Chef: Jennifer</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag">Dolce</span>
              <span class="recipe-card-tag teal">Facile</span>
              <span class="recipe-card-tag coral">30 min</span>
            </div>
          </div>
        </a>

        <!-- Add new recipe cards here -->

      </div>
    </div>
  </main>

  <footer class="site-footer">
    <p>Le Ricette di Jennifer &copy; 2026</p>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the file**

Run the Write tool to create `index.html` with the content above.

---

### Task 6: Verify everything works

- [ ] **Step 1: Open the site in a browser**

Open `index.html` directly in a browser. Verify:
- Gallery page renders with the card
- Card shows the emoji placeholder, title, chef, and tags
- Click the card → navigates to recipe page
- Recipe page shows breadcrumb, hero, meta badges, ingredients as pills, numbered steps
- Scroll reveal animations work (elements fade in as you scroll)
- Page is responsive (resize browser, check mobile layout)
