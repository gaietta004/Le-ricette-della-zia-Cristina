# Sound-Responsive SVG Morph Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Single HTML page that morphs Pallino between quiet and speaking states based on microphone volume.

**Architecture:** Single HTML file with inline SVG, CSS, and JS. Flubber.js for polygon morphing of the body. Web Audio API for mic input. Three internal modules: AudioEngine (mic→RMS), MorphEngine (flubber + lerp), Renderer (DOM updates in rAF loop).

**Tech Stack:** HTML5, CSS3, Flubber.js (CDN), Web Audio API

---

## File Structure

- `index.html` — single file containing HTML structure, inline SVG (quiet state), CSS styles, and all JavaScript logic

---

### Task 1: HTML Scaffold with SVG and Flubber CDN

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the HTML skeleton with inline SVG and Flubber CDN**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pallino Parlante</title>
  <script src="https://unpkg.com/flubber@0.3.0"></script>
</head>
<body>
  <div id="container">
    <svg id="character" viewBox="0 0 595.3 841.9" preserveAspectRatio="xMidYMid meet">
      <g id="corpo">
        <polygon id="corpo-poly" class="st0" points="377.6 387.4 382.6 387.1 387 387 ..."/>
      </g>
      <g id="occhio_dx">
        <ellipse id="occhio-dx" class="st0" cx="369.4" cy="387.4" rx="23" ry="33.7"/>
        <ellipse class="st1" cx="373.5" cy="387.4" rx="11.6" ry="21.2"/>
        <ellipse class="st0" cx="376.5" cy="379.8" rx="7" ry="12"/>
      </g>
      <g id="occhio_sx">
        <ellipse id="occhio-sx" class="st0" cx="168.2" cy="410.1" rx="23" ry="33.7"/>
        <ellipse class="st1" cx="168.2" cy="410.1" rx="11.6" ry="21.2"/>
        <ellipse class="st0" cx="171.2" cy="402.3" rx="7" ry="12"/>
      </g>
      <g id="bocca">
        <ellipse id="bocca-el" class="st1" cx="276.6" cy="435.5" rx="44.9" ry="2.9"/>
      </g>
    </svg>
    <div id="ui">
      <button id="startBtn">Avvia microfono</button>
      <div id="levelDisplay">0</div>
    </div>
  </div>
  <script>
    // JS goes here in subsequent tasks
  </script>
</body>
</html>
```

Note: The `points=""` attribute on `#corpo-poly` must contain the full points string from `pallino.svg` (1626 space-separated numbers = 813 coordinate pairs). Copy it verbatim from the SVG file.

---

### Task 2: CSS Styling

- [ ] **Step 1: Add CSS for dark background, centered SVG, and UI overlay**

Add inside `<head>`:

```html
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #1a1a2e;
    color: #fff;
    font-family: system-ui, sans-serif;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  #container {
    position: relative;
    width: 100%;
    max-width: 600px;
    aspect-ratio: 595.3 / 841.9;
  }
  
  #character {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .st0 { fill: #1d1d1b; }
  .st1 { fill: #fff; }
  
  #ui {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  #startBtn {
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background: #e94560;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  #startBtn:hover { opacity: 0.85; }
  #startBtn:disabled { opacity: 0.4; cursor: not-allowed; }
  
  #levelDisplay {
    font-size: 14px;
    font-family: monospace;
    color: rgba(255,255,255,0.6);
  }
</style>
```

---

### Task 3: AudioEngine — Microphone Setup and RMS Computation

- [ ] **Step 1: Implement the AudioEngine module**

Replace the empty `<script>` tag with:

```html
<script>
  // ===== AudioEngine =====
  let audioCtx = null;
  let analyser = null;
  let dataArray = null;
  let mediaStream = null;
  let isListening = false;
  
  const SMOOTHING = 0.85;  // higher = smoother (less jitter)
  const SILENCE_FLOOR = 0.02;  // RMS below this → treated as silence
  let smoothedVolume = 0;
  
  async function startMicrophone() {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(mediaStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      dataArray = new Uint8Array(analyser.fftSize);
      isListening = true;
      return true;
    } catch (err) {
      console.error('Mic error:', err);
      return false;
    }
  }
  
  function getVolume() {
    if (!analyser) return 0;
    analyser.getByteTimeDomainData(dataArray);
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128;
      sumSquares += normalized * normalized;
    }
    const rms = Math.sqrt(sumSquares / dataArray.length);
    // Normalize: rms ~0.4 at loud speaking, cap at 0-100 range
    // Apply silence floor
    const effectiveRms = rms < SILENCE_FLOOR ? 0 : rms;
    const rawVolume = Math.min(100, (effectiveRms / 0.4) * 100);
    // Exponential smoothing: weight previous heavily to reduce jitter
    smoothedVolume = smoothedVolume === 0
      ? rawVolume
      : smoothedVolume * SMOOTHING + rawVolume * (1 - SMOOTHING);
    return smoothedVolume;
  }
  
  function stopMicrophone() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => t.stop());
    }
    if (audioCtx) {
      audioCtx.close();
    }
    audioCtx = null;
    analyser = null;
    dataArray = null;
    mediaStream = null;
    isListening = false;
    smoothedVolume = 0;
  }
</script>
```

- [ ] **Step 2: Test microphone**

Open `index.html` in a browser. Click the button — the browser should ask for mic permission. After granting, `startMicrophone()` should resolve without error. Check console for any errors.

---

### Task 4: MorphEngine — SVG State Data and Flubber Setup

- [ ] **Step 1: Add state data and morphing logic**

Add before the AudioEngine code:

```javascript
  // ===== State Data =====
  // Each state stores: corpo points string, eye positions, mouth position
  
  const QUIET = {
    occhioDx: { cx: 369.4, cy: 387.4, rx: 23, ry: 33.7 },
    occhioSx: { cx: 168.2, cy: 410.1, rx: 23, ry: 33.7 },
    bocca:   { cx: 276.6, cy: 435.5, rx: 44.9, ry: 2.9 }
  };
  
  const PARLANTE = {
    occhioDx: { cx: 425.0, cy: 427.2, rx: 23, ry: 33.7 },
    occhioSx: { cx: 223.8, cy: 449.9, rx: 23, ry: 33.7 },
    bocca:   { cx: 332.8, cy: 480.8, rx: 41.9, ry: 36.0 }
  };
  
  // ===== MorphEngine =====
  let corpoInterpolator = null;
  
  function initMorphEngine() {
    // Read quiet state points from SVG element
    const quietPoints = document.getElementById('corpo-poly').getAttribute('points');
    // Convert space-separated "x y x y" to flubber's "x,y x,y" format
    const parlantePoints = toFlubberFormat(PARLANTE_CORPO);
    const quietFlubber = toFlubberFormat(quietPoints);
    corpoInterpolator = flubber.interpolate(quietFlubber, parlantePoints);
  }
  
  // Parlante body points — copy from pallino parlante.svg <polygon points="...">
  // Extract: open pallino parlante.svg, find the <polygon> inside <g id="corpo">,
  // copy its points attribute value (1594 space-separated numbers = 797 pairs).
  // The string starts with "463.2 421.1 466.2 421.6 474.2 421.2 ..."
  const PARLANTE_CORPO = "463.2 421.1 466.2 421.6 474.2 421.2 466.6 423.9 479.2 422.7 466 426.3 474.4 426.1 464.9 428.8 470.8 429.1 481.7 428.7 466 432.1 473.3 432.3 477.1 433.1 477.2 434.3 480.1 435.2 472.2 437.2 482.2 437.5 469.7 439.8 470.4 440.9 479.2 441.5 470.3 443.3 469.1 444.5 470.9 445.6 473.8 446.7 472.9 447.9 478.3 448.9 470.1 450.3 471.1 451.4 478.5 452.6 468.2 453.7 480.4 455.1 466.2 456 471.4 457.3 475.5 458.6 470.1 459.6 468.7 460.7 470.8 462 480.2 463.8 473.9 464.5 477.6 466.1 471.8 466.7 466.1 467.3 476.2 469.6 470.1 470.1 470.6 471.4 467.3 472.1 473.8 474.2 473 475.3 474.7 476.8 475 478 476.2 479.5 480.7 481.6 479.5 482.6 464.8 481 468.8 483 471.2 484.7 476.9 487.2 469.7 486.8 477.1 489.8 464.1 487.9 477 492.4 472.1 492.4 470.1 493.1 473.1 495.2 463.2 493.6 474.2 498.1 472.3 498.8 464.9 497.7 459.6 497.2 465.1 500.3 462.9 500.8 473.9 505.9 471.1 506.2 461.6 504.1 465.8 506.9 456.3 504.5 459.8 507.1 454.9 506.4 465.6 512 468.7 514.7 463.5 513.8 469 517.5 461.3 515.4 466 518.9 465.1 519.9 465.4 521.4 452 516.2 452.2 517.5 450.7 518.1 463 525.7 455.3 523.1 451.8 522.5 463 530 459.7 529.6 447.3 524 458.4 531.7 453.2 530.1 456.9 533.7 449 530.3 457.7 537.1 450.3 533.9 443.9 531.2 454.9 539.8 450.7 538.5 441.1 533.4 450.2 541.1 444.7 538.7 450.4 544.2 443.3 540.6 442.5 541.5 443.1 543.4 447.7 548.4 449.3 551.2 446.3 550.5 444.5 550.6 441.9 550.1 442.9 552.5 443.3 554.4 436.8 550.5 435.5 551 431.7 549.2 434.1 552.8 437.9 557.9 429.7 552 437 560.4 431.6 557 427.4 554.6 428 556.8 430.5 560.9 434.2 566.4 432.7 566.7 423.7 559 430.5 568 425.3 564.1 421.2 561.4 419 560.7 427.3 571.8 417.9 562.9 418.7 565.6 424.3 574.1 420.4 571.3 421.9 575.1 416.3 570.1 413.9 568.9 413.9 570.9 417.6 577.7 410.7 570.5 415.6 579.1 412.2 576.5 414.1 581.2 410.5 578.3 404 570.9 410.3 582.3 406.2 578.4 405.6 579.6 408.7 586.6 402.4 578.9 406.5 587.8 398.1 576.5 396.5 575.9 397.3 579.6 400.8 588 394.3 579 399.2 590.2 395.4 585.8 395.1 587.7 395.5 591.1 392.2 587.4 392.9 591.4 390.7 589.8 388.5 588 389.3 592.5 390.3 597.7 384.8 588.5 383.8 589 386.3 597.9 385.4 598.9 379.9 588.8 381.2 595.1 381.9 600.3 375.5 587.2 374.2 586.9 373.2 587.5 374.7 595.1 370.6 586.9 371.5 593 369.2 589.9 369.6 594.8 370.1 600.2 369.7 603.2 365.8 594.5 365.6 598 362 589.5 364.1 601.8 362.9 602 360.3 596.7 361.3 605.8 359.9 605.3 355.9 593 356.3 600.1 355 600 354.6 603.8 353.1 602.6 352.7 607.1 350.3 600.5 349 600 347.8 600.3 347.9 608.9 345.1 598.3 344.9 605.4 342.9 599.1 342.7 607.7 340.6 599.4 339.2 597.1 338.9 606.7 337.9 609.1 336.3 604.7 334.7 598.7 334.3 610.6 333 609.7 331.7 608.9 330.1 601 329 603.5 327.9 608.1 326.7 608.1 325.4 594.9 324.3 608.1 323 607.5 321.9 600.3 320.4 612.7 319.7 598 318.3 603.6 317 605.4 316.3 596.2 314.8 601.3 314.1 595.6 312.9 596.2 310.7 607.3 309.2 610.4 309.3 597.9 307.1 606.3 307.1 597 305.3 601.9 304.5 598.4 303.9 594.5 302.5 596.1 300.5 601.5 298.6 605.5 297.4 604.9 297.7 597.1 294.8 605.7 294.4 601.7 292.5 604.6 290.4 608.4 290.5 602.6 289.8 599.9 286.8 607.2 285.5 607.2 286.8 597.3 283.6 604.4 285 595 283.7 595.2 283.3 592.4 280.4 598.1 281.9 589.4 278.8 595.1 278.9 591.1 277.2 592.5 277.8 587.3 273.7 595.4 272.8 594.2 271.8 593.6 268 600 272.7 584.9 271.3 585.4 267.1 592.5 267 589.7 265 591.2 261.7 595.8 262.4 591.2 264.7 583.3 261.1 588.4 259.3 589.4 262.3 580.6 256.6 589.4 255.9 588.1 258.8 579.9 256.4 582 252.3 587.2 251 586.9 250.5 585.4 246.4 590.2 250.4 580.7 247.8 583 245.5 584.4 247.3 579.2 245.7 579.5 247.7 574.1 245.3 575.7 240.7 580.6 242.7 575.4 240.6 576.4 243.1 570.7 234 581.7 241.3 569.4 239.1 570.5 231.2 579.2 232.1 575.9 236.5 568.1 227 578.5 234 567.5 232 568.3 234.3 563.6 226.4 571.3 224.3 571.9 221.9 572.8 225.4 566.8 225.4 565.1 225.7 563 217.1 570.6 225.1 560.2 227.2 556.2 216.5 565.8 223.3 557 213.6 565.1 217.3 559.7 219.8 555.5 219.2 554.5 213.2 558.6 214.1 556.1 214.2 554.4 217.1 550.2 217.5 548.3 212.1 551.5 204.4 556.5 212.2 548.3 213.9 545.3 204.7 551.5 209.5 546 211.4 543 205.3 546.3 200.4 548.6 200.7 546.7 199.3 546.3 204.3 541 198 544.1 196.8 543.4 194.1 543.9 197.9 539.7 201.5 535.8 201.5 534.3 198.9 534.7 190.2 538.9 203 529.2 195 532.9 200.2 528.3 195 530.1 188.7 532.4 199.4 524.8 196.6 525 194.7 524.7 184.7 528.9 190.3 524.5 192.3 522 189.4 522.2 198.1 516.4 189.1 519.7 191 517.4 190.4 516.4 187.6 516.4 180.8 518.2 186.3 514.3 186.3 513.1 181.5 513.8 185.2 510.9 189 508 185 508.4 183.6 507.7 178.1 508.5 188.8 503.2 188.2 502.2 183.1 502.8 188.2 499.7 189.2 498.2 183.5 498.9 177.4 499.6 187.7 495.1 179.5 496.4 175.2 496.4 182.1 493.1 177.6 493.2 185.8 489.7 175.5 491.3 176.4 489.8 184.5 486.5 171.7 488.4 170.1 487.5 169.5 486.4 175 483.9 181.6 481.3 173.9 481.6 179.8 479.2 175.1 478.9 176.6 477.4 181.9 475.3 169.9 476.1 166.6 475.4 171.3 473.4 181.9 470.7 174.2 470.6 171.2 469.7 171.7 468.4 177.3 466.6 179.1 465.3 179.5 464.1 168.1 463.9 173 462.2 173.2 461 177.3 459.6 165.4 459 178 457.2 178.2 456 178.8 454.9 182.1 453.6 179.2 452.6 172.9 451.4 175.2 450.3 180.4 449.1 176 447.9 174.3 446.7 178.1 445.6 169.2 444.1 176.9 443.2 168.5 441.6 179.5 441.1 168.8 439.1 172.5 438.2 175.8 437.3 166.9 435.2 169.2 434.2 170.4 433.1 177.8 432.8 182.3 432.2 172.3 429.7 178 429.3 173.2 427.3 180.8 427.3 177.2 425.6 181.9 425.2 180.4 423.8 167.8 420.1 178.6 421 174.8 419 182.1 419.4 170.4 415.6 185.9 417.9 185.3 416.6 173.8 412.6 178.6 412.5 185.5 413.1 184.7 411.7 184.1 410.4 174.7 406.4 181.1 407.1 182.9 406.4 179.5 404.1 181.7 403.5 181.1 402.1 174 398.4 183.2 400.3 185.8 400 177.8 395.7 187.8 398.2 186.2 396.3 184.3 394.3 183.5 392.7 185.6 392.3 177.8 387.7 192.6 392.7 191.7 391.1 188.7 388.5 189 387.3 185.6 384.4 181.9 381.3 189.4 383.6 192.5 383.8 185.4 378.8 186.7 378.1 198.8 383.2 197.7 381.3 196.6 379.4 188 373.3 191.2 373.6 197.6 376 189.7 369.9 195.6 372 201 373.9 202 373.2 192.5 365.8 192.8 364.6 199.5 367.5 204 369 199.5 364.6 197.1 361.5 206.6 366.7 194.4 356.6 207.3 364.3 210.5 365.3 210.5 363.9 211.6 363.3 209.9 360.5 211.1 360.1 199.8 349.6 208.2 354.7 206.3 351.6 205.4 349.3 209 350.7 216.8 355.9 213 351.1 212.7 349.2 215.9 350.5 213.6 346.8 217.4 348.7 217.3 347 221.5 349.4 222.7 349 221 345.7 216.1 339.1 216.1 337.3 214.9 334.3 222.2 340.3 228.1 344.9 226.3 341.3 226.3 339.5 229.5 341.4 229.7 339.8 228.1 336.2 227.6 333.8 232.4 337.8 227.2 329.5 231.3 332.7 226.2 324.2 226.9 323.1 228.1 322.6 237.6 333.2 232.2 323.9 240.5 333.3 238.5 328.5 237.1 324.4 241.2 328.2 241 325.9 244.5 329 240.9 321.5 241.8 320.6 247.9 328 248.9 327.5 242.1 314.1 247.3 320.3 250 322.5 248.1 316.8 248.4 315 253.2 321.1 253.6 319.5 252.4 314.7 253.4 314 251.9 308.4 252.5 306.7 258.1 315.3 258.4 313.1 263.2 320.7 262.5 316.4 261.7 311.7 259.6 304.1 265.3 314 266.5 313.9 263.2 302.8 265.5 305.2 267.7 307.3 267.3 302.9 272.2 312.5 273 311.2 274 310.5 272 301.1 275.8 308.5 277.6 310.2 279.9 313.7 276.7 299.6 279.9 305.9 281.1 305.7 280.8 300.3 283.8 306.4 285.1 306.8 283.4 295.5 287.3 305.7 288.7 306.4 290.3 308.5 288.9 296.7 291.4 302.3 293.3 305.7 294 303 294.4 299.2 295.4 297.7 298.5 308.2 298.3 300.1 300.9 308.7 301.8 307.5 302.6 304.4 304.3 308.3 305.4 308 306.2 305.7 306.5 297.7 308.5 305.7 309 298.8 309.7 292.7 312.1 307.4 312.7 299.4 314.3 305.7 315.2 301.4 316.2 298.1 317.7 305.8 318.9 304.9 319.8 297.5 321.1 303.1 322.2 295.2 323.5 304.8 324.6 301.4 326 291.2 327.1 297.7 328.1 304.4 329.8 290.5 330.6 299.6 332.1 294.2 332.8 303.3 334.2 300 334.8 307.5 337.4 291.1 337.2 305.5 339.4 296.2 339.7 304 342.4 291.9 343.5 292.8 343.9 299.5 345.8 294.6 347.4 292.6 346 308.6 347 309.8 349.9 299.9 350.3 304.6 352.2 301 351.3 311.1 356.2 293.9 356.9 296.6 356.7 302.7 355.9 311.2 361.1 294.9 358.5 310 361.1 305 361.4 308.1 363.6 304.8 365.8 301.5 363.6 313.1 367.7 303.7 366.8 310.5 370.4 303.1 371 305.2 369.9 312.1 371.3 311.6 371.6 314.2 376.7 303.7 378.4 302.9 380.3 301.4 381 302.9 380.8 306.9 381.9 307.2 383.2 307.3 383.7 309.3 385.9 307.5 383.3 316.2 384.4 316.6 387 313.7 387.1 316.3 387.3 318.6 391.5 312.7 391.7 315.1 396.1 309.3 394.5 314.9 397.3 312.3 398 313.6 395.8 320 393.8 325.8 395.4 325.3 401.3 317.7 403.1 317 398.4 327 403.8 320.6 399.7 329.3 401.9 327.9 408.2 320.5 408.6 322 408.5 324.3 407.1 328.5 412.4 323 408.3 330.8 415.3 323.3 410.5 331.8 413.9 329.2 412.3 333.3 414.2 332.7 416.4 331.8 418 331.8 416 336.2 415.6 338.5 414.4 341.7 419.9 337 426.9 330.7 420.5 339.8 429.3 331.9 420.8 343 423.7 341.6 424.5 342.4 423.7 345 429.2 341 432.5 339.3 432.7 340.9 432.9 342.3 433.9 343.1 436.5 342.3 433.2 347.2 431.4 350.4 438 346 428.9 355.7 442.3 345.5 435.7 352.9 431 358.4 437.8 354.1 437.4 356.1 435.8 358.9 445.7 352.4 439.5 358.9 443.1 357.6 438.4 362.6 439.1 363.5 438 365.8 442.6 363.9 445 363.6 448.1 362.9 453.1 360.9 446.7 366.8 443 370.6 442.7 372.2 449.4 369.2 447.7 371.7 452.9 369.9 452.8 371.3 445.9 376.9 449.8 375.9 450.1 377 458.4 373.7 454.4 377.3 450.2 381 458 378.1 461.8 377.5 461.7 378.9 450.6 385.9 458.6 383.2 460.7 383.5 467.1 381.8 463.4 384.9 457.4 389.1 458 390 460.5 390.2 463.5 390.2 466.4 390.3 469 390.6 458.8 396 462.4 395.9 457.6 399 471 395.1 464.1 399 460.9 401.4 457.6 403.8 473.7 399.5 463 404.4 471 403 472.4 403.9 470.5 405.7 468.1 407.7 475.9 406.7 477.3 407.6 465.3 412.2 467.3 412.9 477.6 411.5 467.6 415.3 470.1 415.9 466.2 418 478.5 416.5 463.2 421.1";
  
  function toFlubberFormat(pointsStr) {
    const nums = pointsStr.trim().split(/\s+/);
    const pairs = [];
    for (let i = 0; i < nums.length; i += 2) {
      pairs.push(nums[i] + ',' + nums[i+1]);
    }
    return pairs.join(' ');
  }
  
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  
  function getMorphState(t) {
    t = Math.max(0, Math.min(1, t));
    return {
      corpo: corpoInterpolator(t),
      occhioDx: {
        cx: lerp(QUIET.occhioDx.cx, PARLANTE.occhioDx.cx, t),
        cy: lerp(QUIET.occhioDx.cy, PARLANTE.occhioDx.cy, t)
      },
      occhioSx: {
        cx: lerp(QUIET.occhioSx.cx, PARLANTE.occhioSx.cx, t),
        cy: lerp(QUIET.occhioSx.cy, PARLANTE.occhioSx.cy, t)
      },
      bocca: {
        cx: lerp(QUIET.bocca.cx, PARLANTE.bocca.cx, t),
        cy: lerp(QUIET.bocca.cy, PARLANTE.bocca.cy, t),
        rx: lerp(QUIET.bocca.rx, PARLANTE.bocca.rx, t),
        ry: lerp(QUIET.bocca.ry, PARLANTE.bocca.ry, t)
      }
    };
  }
```

- [ ] **Step 2: Test morph engine**

Open the page. Add a temporary `console.log(flubber.interpolate(...))` call in the console to verify Flubber is loaded. The `toFlubberFormat()` should produce correctly formatted comma-separated pairs — test with `console.log(toFlubberFormat("1 2 3 4"))` expecting `"1,2 3,4"`.

---

### Task 5: Animation Loop and Renderer

- [ ] **Step 1: Implement the renderer and rAF loop**

Add after `getMorphState()`:

```javascript
  // ===== Renderer =====
  function render(state) {
    document.getElementById('corpo-poly').setAttribute('points', state.corpo);
    
    const odx = document.getElementById('occhio-dx');
    odx.setAttribute('cx', state.occhioDx.cx);
    odx.setAttribute('cy', state.occhioDx.cy);
    
    const osx = document.getElementById('occhio-sx');
    osx.setAttribute('cx', state.occhioSx.cx);
    osx.setAttribute('cy', state.occhioSx.cy);
    
    const bocca = document.getElementById('bocca-el');
    bocca.setAttribute('cx', state.bocca.cx);
    bocca.setAttribute('cy', state.bocca.cy);
    bocca.setAttribute('rx', state.bocca.rx);
    bocca.setAttribute('ry', state.bocca.ry);
    
    document.getElementById('levelDisplay').textContent = Math.round(smoothedVolume);
  }
  
  // ===== Animation Loop =====
  function animate() {
    if (isListening) {
      const volume = getVolume();
      const t = volume / 100;
      const state = getMorphState(t);
      render(state);
    }
    requestAnimationFrame(animate);
  }
```

- [ ] **Step 2: Wire up the start button and bootstrap**

Add at the end of the script:

```javascript
  // ===== Bootstrap =====
  document.getElementById('startBtn').addEventListener('click', async () => {
    const btn = document.getElementById('startBtn');
    btn.textContent = 'Avvio...';
    btn.disabled = true;
    
    const ok = await startMicrophone();
    if (ok) {
      initMorphEngine();
      btn.textContent = 'In ascolto';
      animate();
    } else {
      btn.textContent = 'Riprova';
      btn.disabled = false;
      alert('Impossibile accedere al microfono. Controlla i permessi.');
    }
  });
  
  // Keep the animation loop running even before mic starts (show t=0 state)
  animate();
```

---

### Task 6: Manual Verification

- [ ] **Step 1: Open in browser and test**

Open `index.html` directly in a browser (Chrome or Firefox recommended).

Expected behavior:
1. Page shows Pallino in quiet state (closed mouth, eyes centered)
2. Click "Avvia microfono" — browser asks for mic permission
3. After granting, start speaking: mouth opens, body morphs, eyes shift
4. Level display shows 0–100 number changing with volume
5. Silence → character returns to quiet state

Test edge cases:
- Deny mic permission → "Riprova" message shown
- Speak softly → partial morph (t around 0.2–0.5)
- Speak loudly → full morph (t near 1.0)

- [ ] **Step 2: Adjust sensitivity if needed**

If the character doesn't respond to normal speaking volume, adjust the normalization constant in `getVolume()`:
```javascript
// Change 0.4 to tune sensitivity — lower = more sensitive
const rawVolume = Math.min(100, (rms / 0.3) * 100);
```

If the morph is too jittery, increase smoothing:
```javascript
const SMOOTHING = 0.92;  // higher = smoother but slower response
```
