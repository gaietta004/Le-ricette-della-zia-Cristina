# SITO Landing Page Design

## Overview
A single-page landing homepage for the SITO folder, serving as a visual index linking to 5 independent project subdirectories. All links open in a new tab (`target="_blank"`).

## Style Guide Reference

- **Background**: `#f0eded`
- **Text**: `#1f0001`
- **Sticker colors**: Yellow `#f2f26b`, Orange `#f58a3d`, Magenta `#ff5ec1`, Green `#50e664`
- **H1**: Zalando Sans Expanded Regular 400, 30px
- **H2**: Zalando Sans Expanded Light 300, 22px
- **Body**: Zalando Sans Expanded Regular 400, 16px
- **Caption**: VT323 Regular 400, 16px
- **Hover**: underline on nav links and captions; `transform: scale(1.05)` on stickers

## Page Structure

### 1. Header Nav (fixed top)
- **Left**: "GAIA PATTI" — H1, Zalando Sans Expanded Regular 400, 30px, color `#1f0001`
- **Right**: "about" | "projects" — body text, 16px
- **"about"**: scrolls to About section on same page via anchor link
- **"projects"**: opens dropdown menu listing the 5 projects. Each item links to its project page (new tab). Dropdown closes on click or outside click.

### 2. Sticker Canvas (full viewport)
Five stickers positioned absolutely as an overlapping, multi-layered composition. Stickers are `<a>` tags with `target="_blank"`.

#### Sticker 1: "YOU HUNGRY?"
- **Shape**: Wavy/scalloped rectangle with rounded corners, tilted ~-5deg
- **Implementation**: CSS `clip-path` multi-point polygon
- **Background**: Orange `#f58a3d`
- **Text color**: Yellow `#f2f26b`
- **Caption**: "click here" (VT323)
- **Link**: `ciambella yougurt_ricetta 1/index.html`
- **Position**: upper-left area

#### Sticker 2: "HELLO HANDS"
- **Shape**: Cloud/blob with outward-curving arcs (scalloped petals)
- **Implementation**: CSS `clip-path: path()` with bezier curves
- **Background**: Yellow `#f2f26b`
- **Text color**: Orange `#f58a3d`
- **Caption**: "click here" (VT323)
- **Link**: `HANDTRACKING 1/index.html`
- **Position**: upper-right area

#### Sticker 3: "SAY HI"
- **Shape**: Starburst with many sharp triangular points around a central circle
- **Implementation**: CSS `clip-path: polygon()` with many vertices
- **Background**: Magenta `#ff5ec1`
- **Text color**: Green `#50e664`
- **Caption**: "click here" (VT323)
- **Link**: `TIPOGRAFIA CINETICA 1/index.html`
- **Position**: center, highest z-index (hero sticker)

#### Sticker 4: "LET PALLINO SPEAK UP"
- **Shape**: Perfect circle with text wrapped along circular path
- **Implementation**: Inline SVG with `<textPath>` element
- **Background**: Green `#50e664`
- **Text color**: Magenta `#ff5ec1`
- **Caption**: "click here" (VT323)
- **Link**: `MASCHERA SONORA 1/index.html`
- **Position**: lower-left

#### Sticker 5: "MORPH YOUR PATTERN"
- **Shape**: Wavy/scalloped rectangle with rounded corners, tilted opposite direction
- **Implementation**: CSS `clip-path` multi-point polygon
- **Background**: Orange `#f58a3d`
- **Text color**: Yellow `#f2f26b`
- **Caption**: "click here" (VT323)
- **Link**: `PATTERN exercise 1/index.html`
- **Position**: lower-right

### 3. About Section (below canvas)
- Scroll target for "about" nav link
- Contains: H2 "LLM, coding explorations of a curious graphic designer" and explanatory body text

## Interactive Behavior
- **Nav links**: underline on hover
- **"projects" dropdown**: appears on click, lists project names, links open in new tab
- **Stickers**: `hover: transform: scale(1.05)` transition
- **Captions**: underline on hover
- **All links**: `target="_blank"` (open in new page)

## Tech Stack
- Pure HTML + CSS + inline SVG (no frameworks, no JS libraries)
- Google Fonts: Zalando Sans Expanded (H1, H2, body), VT323 (caption)
- CSS `clip-path` for custom sticker shapes
- Inline SVG `<textPath>` for circular text on Sticker 4

## Excluded
- "ricette zia 1" folder — omitted from homepage
