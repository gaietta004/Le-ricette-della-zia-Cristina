# Recipe Portfolio Site — Design Spec

## Overview

A bold, colorful multi-recipe portfolio website built with pure HTML/CSS/JS. Starting with the "Ciambella allo Yogurt" recipe and designed for easy addition of new recipes.

## Site Structure

```
ciambella yougurt_ricetta/
├── index.html                  ← gallery/home page
├── recipes/
│   └── ciambella-allo-yogurt.html   ← recipe pages
├── css/
│   └── style.css               ← shared stylesheet
├── js/
│   └── script.js               ← interactivity (animations, etc.)
└── assets/
    └── images/                 ← recipe photos
```

To add a new recipe: create an HTML file in `recipes/`, add a card link in `index.html`. All pages share `style.css`.

## Visual Design

- **Style:** Bold, colorful, energetic — food-blog portfolio
- **Primary palette:** Coral/magenta (`#FF6B6B`), warm yellow (`#FFE66D`), deep teal (`#4ECDC4`)
- **Accent:** Rich purple (`#9B59B6`) for headings
- **Background:** Warm off-white (`#FFF8F0`) with bold color blocks
- **Typography:** Bold display font (Poppins/Montserrat) for headings, clean sans-serif (Inter/system) for body
- **Cards:** Rounded corners, vivid color borders, shadow, hover lift animation

## Gallery Page (index.html)

- Site title "Le Ricette di Jennifer" with bold colorful styling
- Responsive flexbox card grid (1 col mobile, 2-3 cols desktop)
- Each card: colored accent border, recipe name, chef name, optional photo placeholder, hover animation
- Footer with optional About section

## Recipe Page (recipe.html)

- Breadcrumb link back to home
- Recipe name as hero headline with colorful underline accent
- Chef byline
- Color band section dividers
- Ingredients displayed as styled chips/pills
- Cooking time as a badge
- Numbered preparation steps with large bold numbers
- "Back to all recipes" link

## Adding Recipes

1. Copy `recipes/template.html` (created during implementation)
2. Fill in recipe content following the template structure
3. Add a card entry in `index.html`
4. No build step, no framework changes needed

## Implementation Plan

1. Create `css/style.css` with full theme (colors, typography, cards, layout, responsive)
2. Create `js/script.js` (scroll animations, hover effects)
3. Create `recipes/template.html` as a reusable blank recipe page
4. Create `recipes/ciambella-allo-yogurt.html` using the template
5. Create `index.html` gallery page with first recipe card
6. Verify all pages render correctly and links work
