# Ricette della Zia Cristina — Website Design

## Overview

A static HTML recipe website showcasing 9 recipes from Chef Cristina ("Zia Cristina"). The site lives at `C:\Users\gaiap\Desktop\WS_abadir\ricette zia\code base` as a standalone project.

## Color Palette

| Role        | Color   | Hex       |
|-------------|---------|-----------|
| Background  | Pink    | `#ffc7d7` |
| Primary     | Blue    | `#1906db` |
| Secondary   | Red     | `#c32349` |
| Accent      | Dark red| `#750d1c` |

## Typography

- **Headings:** Spicy Rice (Google Fonts)
- **Body:** Inter (Google Fonts)

## Site Structure

```
code base/
├── index.html               # Gallery of all 9 recipes
├── css/
│   └── style.css            # All styles
├── js/
│   └── script.js            # Scroll reveal animations
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

## Pages

### index.html
- Header with site title "Ricette della Zia Cristina" and subtitle
- Gallery grid with 9 recipe cards, each linking to the respective recipe page
- Each card shows: emoji icon, recipe name, "Chef: Cristina", tags (Dolce/Salato, difficulty, time where available)
- Footer

### Recipe pages (recipes/*.html)
- Breadcrumb link back to gallery
- Recipe title + "Chef: Cristina"
- Ingredients displayed as pill-shaped tags
- Preparation as plain text paragraph (no numbered list)
- Footer

## Shared Behaviors
- Scroll-reveal animation on page load (IntersectionObserver)
- Responsive grid (single column on mobile, multi on desktop)

## Recipes (9 total)

1. **Biscotti Maddalena** — dolce, 25 min
2. **Bil Bol Bul — Torta Cioccolato** — dolce, 45 min
3. **Baguette Farcite** — salato, 2h + preparazione, 4 porzioni
4. **Biscotti ai Pinoli** — dolce, 50 min, 25 biscotti
5. **Biscotti alle Mandorle** — dolce, riposo notte + 20 min, 50 biscotti
6. **Bucatini all'Amatriciana** — salato, 15 min, 4 persone
7. **Chiacchiere** — dolce, fritto
8. **Crostata di Pere** — dolce, 30 min
9. **Crocchette di Pesce** — salato, fritto

## Design Constraints
- No build tools or dependencies
- Must open directly in browser (file:// protocol)
- Italian language
- All recipes from a single source file (`ricette zia.md`)
