# Kinetic Typography Tool — "CIAO" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page web tool that animates the word "CIAO" with oscillating rotation, controllable via speed and angle range sliders.

**Architecture:** Single `index.html` file with embedded CSS and JS. No build step, no dependencies. Each letter is a `<span>` driven by a `requestAnimationFrame` loop. Sliders update a shared state object reactively.

**Tech Stack:** Vanilla HTML/CSS/JS

---

### Task 1: Create HTML structure

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the HTML skeleton with letter spans and controls**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CIAO — Kinetic Typography</title>
  <style>
    /* styles in Task 2 */
  </style>
</head>
<body>
  <div id="app">
    <div id="word">
      <span>C</span>
      <span>I</span>
      <span>A</span>
      <span>O</span>
    </div>
    <div id="controls">
      <label>
        Speed
        <input type="range" id="speed" min="0.5" max="5.0" step="0.1" value="2">
        <span id="speed-value">2.0</span>
      </label>
      <label>
        Min Angle
        <input type="range" id="minAngle" min="-90" max="0" step="1" value="-45">
        <span id="minAngle-value">-45°</span>
      </label>
      <label>
        Max Angle
        <input type="range" id="maxAngle" min="0" max="90" step="1" value="45">
        <span id="maxAngle-value">45°</span>
      </label>
    </div>
  </div>
  <script>
    /* JS in Task 3 */
  </script>
</body>
</html>
```

### Task 2: Add CSS styling

**Files:**
- Modify: `index.html` (replace `/* styles in Task 2 */` with actual CSS)

- [ ] **Step 1: Write the CSS styles inside the `<style>` block**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #1a1a1a;
  color: #fff;
  font-family: 'Arial Black', 'Helvetica Neue', sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  text-align: center;
}

#word {
  font-size: 8rem;
  letter-spacing: 0.3em;
  margin-bottom: 3rem;
  user-select: none;
}

#word span {
  display: inline-block;
}

#controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

#controls label {
  font-family: Arial, sans-serif;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 320px;
}

#controls input[type="range"] {
  flex: 1;
}

#controls span {
  min-width: 3.5rem;
  text-align: right;
  font-family: monospace;
}
```

### Task 3: Implement animation logic and slider bindings

**Files:**
- Modify: `index.html` (replace `/* JS in Task 3 */` with actual JS)

- [ ] **Step 1: Write the JavaScript**

```javascript
const state = {
  speed: 2,
  minAngle: -45,
  maxAngle: 45
};

const letters = document.querySelectorAll('#word span');
const speedInput = document.getElementById('speed');
const speedValue = document.getElementById('speed-value');
const minAngleInput = document.getElementById('minAngle');
const minAngleValue = document.getElementById('minAngle-value');
const maxAngleInput = document.getElementById('maxAngle');
const maxAngleValue = document.getElementById('maxAngle-value');

speedInput.addEventListener('input', () => {
  state.speed = parseFloat(speedInput.value);
  speedValue.textContent = state.speed.toFixed(1);
});

minAngleInput.addEventListener('input', () => {
  state.minAngle = parseInt(minAngleInput.value, 10);
  minAngleValue.textContent = state.minAngle + '°';
});

maxAngleInput.addEventListener('input', () => {
  state.maxAngle = parseInt(maxAngleInput.value, 10);
  maxAngleValue.textContent = state.maxAngle + '°';
});

function lerp(t, a, b) {
  return a + (t + 1) * 0.5 * (b - a);
}

function animate(time) {
  const elapsed = time / 1000;
  letters.forEach((letter, i) => {
    const phase = elapsed * state.speed + i * 0.5;
    const normalized = Math.sin(phase);
    const angle = lerp(normalized, state.minAngle, state.maxAngle);
    letter.style.transform = `rotate(${angle}deg)`;
  });
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

- [ ] **Step 2: Verify the file opens in a browser and the animation runs**

Run: `start index.html` (Windows) or open the file manually.

Expected: Page shows "CIAO" with letters oscillating. Sliders adjust speed and angle range in real time.

### Task 4: Final review

- [ ] **Step 1: Read the complete index.html and verify all parts are correct**

Run: `Get-Content index.html` to review the complete file.

Expected: All HTML, CSS, and JS sections are present and consistent with the spec.
