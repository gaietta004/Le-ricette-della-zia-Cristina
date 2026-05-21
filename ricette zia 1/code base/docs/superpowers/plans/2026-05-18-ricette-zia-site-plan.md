# Ricette della Zia Cristina — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static HTML recipe website for 9 recipes from Chef Cristina.

**Architecture:** Pure static site (HTML/CSS/JS) with a gallery index page and individual recipe pages. No frameworks, no build step.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Google Fonts (Spicy Rice + Inter)

---

## File Structure

```
code base/
├── index.html                  ← gallery page with 9 recipe cards
├── css/
│   └── style.css               ← all styles
├── js/
│   └── script.js               ← scroll reveal animations
└── recipes/
    ├── biscotti-maddalena.html
    ├── bil-bol-bul.html
    ├── baguette-farcite.html
    ├── biscotti-ai-pinoli.html
    ├── biscotti-alle-mandorle.html
    ├── bucatini-allamatriciana.html
    ├── chiacchiere.html
    ├── crostata-di-pere.html
    └── crocchette-di-pesce.html
```

---

### Task 1: Create CSS (`css/style.css`)

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Write the complete CSS**

```css
:root {
  --primary: #1906db;
  --secondary: #c32349;
  --accent: #750d1c;
  --bg: #ffc7d7;
  --text: #2D3436;
  --text-light: #636E72;
  --white: #FFFFFF;
  --shadow: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-hover: 0 8px 30px rgba(0,0,0,0.15);
  --radius: 16px;
  --radius-sm: 8px;
  --font-display: 'Spicy Rice', cursive;
  --font-body: 'Inter', system-ui, sans-serif;
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
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

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

.site-header {
  background: linear-gradient(135deg, var(--secondary), var(--accent));
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
  font-weight: 400;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.15);
}

.site-subtitle {
  color: var(--bg);
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 0.3rem;
  opacity: 0.9;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

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
  border-bottom: 4px solid var(--primary);
}

.recipe-card:nth-child(2n) {
  border-bottom-color: var(--secondary);
}

.recipe-card:nth-child(3n) {
  border-bottom-color: var(--accent);
}

.recipe-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.recipe-card-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
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
  background: var(--primary);
  color: var(--white);
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.recipe-card-tag.secondary {
  background: var(--secondary);
}

.recipe-card-tag.accent {
  background: var(--accent);
}

.breadcrumb {
  padding: 1rem 0;
  font-size: 0.9rem;
  color: var(--text-light);
}

.breadcrumb a {
  color: var(--primary);
  font-weight: 500;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

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
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.recipe-chef {
  color: var(--text-light);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.recipe-chef span {
  color: var(--primary);
  font-weight: 600;
}

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

.recipe-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 0;
}

.section-divider {
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
  border: none;
  margin: 0 auto;
  width: 80%;
  max-width: 700px;
  border-radius: 2px;
}

.recipe-section h2 {
  font-size: 1.6rem;
  color: var(--secondary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ingredients-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.ingredients-list li {
  background: var(--white);
  border: 2px solid var(--primary);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: var(--shadow);
}

.ingredients-list li.optional {
  border-color: var(--secondary);
  color: var(--text-light);
  font-style: italic;
}

.ingredients-list li.accent {
  border-color: var(--accent);
}

.preparation-text {
  background: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  line-height: 1.8;
  font-size: 0.95rem;
}

.back-link {
  text-align: center;
  padding: 2rem 0 3rem;
}

.back-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--primary);
  color: var(--white);
  padding: 0.7rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: var(--shadow);
}

.back-link a:hover {
  background: var(--accent);
  transform: translateY(-2px);
}

.site-footer {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-size: 0.85rem;
  border-top: 2px solid rgba(0,0,0,0.05);
  margin-top: 2rem;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

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

### Task 3: Create gallery page (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the complete index HTML**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="site-header">
    <div class="container">
      <h1 class="site-title">Ricette della Zia Cristina</h1>
      <p class="site-subtitle">Le ricette della tradizione di famiglia</p>
    </div>
  </header>

  <main class="gallery">
    <div class="container">
      <div class="gallery-grid">

        <a href="recipes/biscotti-maddalena.html" class="recipe-card reveal">
          <div class="recipe-card-image">🍪</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Biscotti Maddalena</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag">Dolce</span>
              <span class="recipe-card-tag secondary">25 min</span>
            </div>
          </div>
        </a>

        <a href="recipes/bil-bol-bul.html" class="recipe-card reveal">
          <div class="recipe-card-image">🍫</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Bil Bol Bul — Torta Cioccolato</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag">Dolce</span>
              <span class="recipe-card-tag secondary">45 min</span>
            </div>
          </div>
        </a>

        <a href="recipes/baguette-farcite.html" class="recipe-card reveal">
          <div class="recipe-card-image">🥖</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Baguette Farcite</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag accent">Salato</span>
              <span class="recipe-card-tag secondary">2h</span>
            </div>
          </div>
        </a>

        <a href="recipes/biscotti-ai-pinoli.html" class="recipe-card reveal">
          <div class="recipe-card-image">🌰</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Biscotti ai Pinoli</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag">Dolce</span>
              <span class="recipe-card-tag secondary">50 min</span>
            </div>
          </div>
        </a>

        <a href="recipes/biscotti-alle-mandorle.html" class="recipe-card reveal">
          <div class="recipe-card-image">🥜</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Biscotti alle Mandorle</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag">Dolce</span>
              <span class="recipe-card-tag secondary">20 min</span>
            </div>
          </div>
        </a>

        <a href="recipes/bucatini-allamatriciana.html" class="recipe-card reveal">
          <div class="recipe-card-image">🍝</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Bucatini all'Amatriciana</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag accent">Salato</span>
              <span class="recipe-card-tag secondary">15 min</span>
            </div>
          </div>
        </a>

        <a href="recipes/chiacchiere.html" class="recipe-card reveal">
          <div class="recipe-card-image">🍩</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Chiacchiere</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag">Dolce</span>
              <span class="recipe-card-tag secondary">Fritto</span>
            </div>
          </div>
        </a>

        <a href="recipes/crostata-di-pere.html" class="recipe-card reveal">
          <div class="recipe-card-image">🍐</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Crostata di Pere</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag">Dolce</span>
              <span class="recipe-card-tag secondary">30 min</span>
            </div>
          </div>
        </a>

        <a href="recipes/crocchette-di-pesce.html" class="recipe-card reveal">
          <div class="recipe-card-image">🐟</div>
          <div class="recipe-card-body">
            <h2 class="recipe-card-title">Crocchette di Pesce</h2>
            <p class="recipe-card-chef">Chef: Cristina</p>
            <div class="recipe-card-tags">
              <span class="recipe-card-tag accent">Salato</span>
              <span class="recipe-card-tag secondary">Fritto</span>
            </div>
          </div>
        </a>

      </div>
    </div>
  </main>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the file**

Run the Write tool to create `index.html` with the content above.

---

### Task 4: Create recipe pages (part 1 — Biscotti Maddalena, Bil Bol Bul, Baguette Farcite)

**Files:**
- Create: `recipes/biscotti-maddalena.html`
- Create: `recipes/bil-bol-bul.html`
- Create: `recipes/baguette-farcite.html`

- [ ] **Step 1: Create `recipes/biscotti-maddalena.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Biscotti Maddalena — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Biscotti Maddalena</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>250 gr zucchero a velo</li>
        <li>5 uova</li>
        <li>250 gr farina</li>
        <li>1/2 bustina lievito</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Mettere le uova su una casseruola a fuoco basso e sbatterle con lo zucchero e il lievito. Quando l'impasto sarà soffice, unire la farina bene amalgamando. Riempire gli stampini per biscotti imburrati e spolverati con la farina e ricoprite con abbondante zucchero a velo. Cuocete in forno per circa 25 minuti.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `recipes/bil-bol-bul.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bil Bol Bul — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Bil Bol Bul — Torta Cioccolato</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>1/2 kg farina</li>
        <li>200 gr zucchero</li>
        <li>100 gr burro</li>
        <li>100 gr cacao amaro</li>
        <li>1/2 l latte</li>
        <li>1 bustina lievito</li>
        <li>buccia di limone grattugiata</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Lavorare il burro con lo zucchero, aggiungere un po' di latte e poi poco per volta la farina e il resto del latte, poi la scorza del limone, il cacao e infine il lievito. Imburrare la tortiera e mettervi l'impasto. Infornare per 45 minuti.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `recipes/baguette-farcite.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baguette Farcite — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Baguette Farcite</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>2 baguette 15 cm (medie)</li>
        <li>200 gr di prosciutto crudo</li>
        <li>100 gr di burro</li>
        <li>100 gr di ricotta</li>
        <li>3 cucchiai di pistacchi tostati</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Private delle estremità i filoncini di pane e scavate eliminando tutta la mollica. Eliminate i gusci dei pistacchi. Mettete il prosciutto nel mixer, aggiungete il burro, la ricotta e i pistacchi e frullate il tutto fino ad ottenere una crema compatta. Farcite il pane con il composto, avvolgetelo in un foglio di pellicola trasparente e mettetelo in frigo per 2 ore. Tagliate i filoncini a rondelle spesse 2 cm e servite.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

---

### Task 5: Create recipe pages (part 2 — Biscotti ai Pinoli, Biscotti alle Mandorle, Bucatini all'Amatriciana)

**Files:**
- Create: `recipes/biscotti-ai-pinoli.html`
- Create: `recipes/biscotti-alle-mandorle.html`
- Create: `recipes/bucatini-allamatriciana.html`

- [ ] **Step 1: Create `recipes/biscotti-ai-pinoli.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Biscotti ai Pinoli — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Biscotti ai Pinoli</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>1 limone</li>
        <li>150 gr di pinoli</li>
        <li>2 albumi d'uovo</li>
        <li>125 gr zucchero</li>
        <li>burro</li>
        <li>sale</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Montate a neve gli albumi con un po' di sale. Passate nel mixer 100 gr di pinoli e mescolateli allo zucchero e alla scorza di limone. Aggiungete gli albumi. Tritate più grossi gli altri pinoli e aggiungeteli. Imburrate una teglia da forno e mettete la pasta a cucchiaiate sulla teglia. Infornare i biscotti e cuocere per 50 minuti.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `recipes/biscotti-alle-mandorle.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Biscotti alle Mandorle — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Biscotti alle Mandorle</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>2 albumi</li>
        <li>250 gr mandorle sgusciate</li>
        <li>150 gr zucchero in polvere</li>
        <li>100 gr zucchero</li>
        <li>1 bustina zucchero vanigliato</li>
        <li>burro</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Fare tostare le mandorle e tritarle finemente. Unite le mandorle, metà dello zucchero in polvere, lo zucchero e la bustina di quello vanigliato. Montate gli albumi a neve e incorporateli. Imburrate una teglia, formate con la pasta delle palline di 3 cm, spolverizzate con lo zucchero e fate riposare per una notte. Infornare e cuocere per 20 minuti.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `recipes/bucatini-allamatriciana.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bucatini all'Amatriciana — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Bucatini all'Amatriciana</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>500 gr bucatini</li>
        <li>250 gr guanciale</li>
        <li>80 gr pecorino</li>
        <li>passata di pomodoro</li>
        <li>4 cucchiai di polpa pronta</li>
        <li>1/2 peperoncino</li>
        <li>olio d'oliva</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Soffriggere il guanciale nell'olio e il peperoncino, aggiungere prima la polpa pronta poi la passata. Lasciare cuocere per 15 minuti. Cuocere la pasta, scolarla e condirla con il sugo e il pecorino.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

---

### Task 6: Create recipe pages (part 3 — Chiacchiere, Crostata di Pere, Crocchette di Pesce)

**Files:**
- Create: `recipes/chiacchiere.html`
- Create: `recipes/crostata-di-pere.html`
- Create: `recipes/crocchette-di-pesce.html`

- [ ] **Step 1: Create `recipes/chiacchiere.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chiacchiere — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Chiacchiere</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>350 gr farina</li>
        <li>3 uova</li>
        <li>3 cucchiai di zucchero</li>
        <li>3 cucchiai di vino bianco secco</li>
        <li>1 pizzico di sale</li>
        <li>1 goccio d'olio</li>
        <li>zucchero a velo</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        In una zuppiera disponete la farina a fontana. Nel centro ponete le uova, lo zucchero e il sale. Impastare bene gli ingredienti aggiungendo poco alla volta il vino, lavorando prima con un cucchiaio di legno poi con le mani fino ad ottenere una pasta omogenea. Sistemate l'impasto sul tavolo e stendetelo con un mattarello fino ad ottenere uno strato molto sottile che taglierete a strisce irregolari. Preparate l'olio in un tegame e quando sarà bollente inserite le strisce. Una volta dorate, spolverate con lo zucchero a velo.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `recipes/crostata-di-pere.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crostata di Pere — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Crostata di Pere</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <h3 style="font-size:1rem;color:var(--text-light);margin-bottom:0.5rem;">Per la base</h3>
      <ul class="ingredients-list" style="margin-bottom:1rem;">
        <li>3 pere</li>
        <li>250 gr farina</li>
        <li>3 cucchiai di zucchero</li>
        <li>1 scorza grattugiata di limone</li>
        <li>50 gr di margarina</li>
      </ul>
      <h3 style="font-size:1rem;color:var(--text-light);margin-bottom:0.5rem;">Per la crema</h3>
      <ul class="ingredients-list">
        <li>1 tuorlo</li>
        <li>1 cucchiaio di zucchero</li>
        <li>1/4 di yogurt magro</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Preparare la pasta frolla e ricoprire la tortiera, metterci sopra le pere a raggiera. Preparare la crema mescolando il tuorlo con lo zucchero e lo yogurt. Mettere questo composto sopra le pere e infornare 30 minuti.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `recipes/crocchette-di-pesce.html`**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crocchette di Pesce — Ricette della Zia Cristina</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spicy+Rice&display=swap" rel="stylesheet">
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
      <h1>Crocchette di Pesce</h1>
      <p class="recipe-chef">Chef: <span>Cristina</span></p>
    </div>
  </article>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>🥄 Ingredienti</h2>
      <ul class="ingredients-list">
        <li>400 gr nasello</li>
        <li>1 carota</li>
        <li>1 cipolla</li>
        <li>2 uova sode</li>
        <li>1 uovo sbattuto</li>
        <li>pangrattato</li>
        <li>2 cucchiai di besciamella</li>
        <li>sale</li>
        <li>olio</li>
      </ul>
    </div>
  </section>

  <hr class="section-divider">

  <section class="recipe-section reveal">
    <div class="container">
      <h2>👩‍🍳 Preparazione</h2>
      <div class="preparation-text">
        Cuocere il nasello per qualche minuto con la carota e la cipolla. Metterlo nel multipratico assieme al prezzemolo, le uova sode, il sale, la besciamella e un po' di mollica. Tritate il tutto e formate delle crocchette. Passarle nell'uovo sbattuto e poi nella mollica, infine friggetele.
      </div>
    </div>
  </section>

  <div class="back-link reveal">
    <a href="../index.html">← Torna a tutte le ricette</a>
  </div>

  <footer class="site-footer">
    <p>Ricette della Zia Cristina &copy; 2026</p>
  </footer>

  <script src="../js/script.js"></script>
</body>
</html>
```

---

### Task 7: Verify the site

- [ ] **Step 1: Open the site in a browser**

Open `code base/index.html` directly in a browser. Verify:
- Gallery page renders with 9 recipe cards
- Cards show emoji, title, chef, tags (Dolce/Salato and time)
- Click each card → navigates to correct recipe page
- Recipe page shows breadcrumb, title, chef, ingredients as pills, preparation text
- Scroll reveal animations work
- Page is responsive (resize browser, check mobile layout)
