# Critical Rendering Path (CRP)

## What is the Critical Rendering Path?

The Critical Rendering Path is the **sequence of steps the browser takes to convert HTML, CSS, and JavaScript into actual pixels on the screen**. Understanding this helps you optimize page load performance.

> 🧠 **Simple Definition:** It's the journey from "browser receives HTML" to "user sees something on screen" (First Paint).

---

## The Big Picture

```
┌──────────┐    ┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   HTML   │───▶│   DOM    │    │   CSSOM   │    │  Render  │    │  Layout  │    │  Paint   │
│ Download │    │  Tree    │───▶│   Tree    │───▶│   Tree   │───▶│  (Reflow)│───▶│ (Pixels) │
└──────────┘    └──────────┘    └───────────┘    └──────────┘    └──────────┘    └──────────┘
                     ▲                ▲
                     │                │
              HTML Parsing      CSS Parsing
```

---

## Step-by-Step Breakdown

### Step 1: HTML Parsing → DOM Tree Construction

When the browser receives the HTML document, it parses it **byte by byte** and constructs the **DOM (Document Object Model)** tree.

```
        HTML Source                          DOM Tree

  <!DOCTYPE html>                    ┌──────────────┐
  <html>                             │   Document   │
    <head>                           └──────┬───────┘
      <title>My Page</title>                │
    </head>                          ┌──────┴───────┐
    <body>                           │     html     │
      <h1>Hello</h1>                 └──┬────────┬──┘
      <p>World</p>                      │        │
    </body>                       ┌─────┴──┐  ┌──┴─────┐
  </html>                         │  head  │  │  body  │
                                  └───┬────┘  └──┬──┬──┘
                                      │          │  │
                                 ┌────┴───┐  ┌──┴┐ ┌┴──┐
                                 │ title  │  │h1 │ │ p │
                                 └────┬───┘  └─┬─┘ └─┬─┘
                                      │        │     │
                                 "My Page"  "Hello" "World"
```

**Key Points:**

- Browser reads HTML **top to bottom**
- Each HTML tag becomes a **node** in the DOM tree
- The DOM represents the **structure** of the page
- This process is **incremental** — browser can start rendering before full HTML is downloaded

---

### Step 2: CSS Parsing → CSSOM Tree Construction

When the browser encounters CSS (via `<link>` or `<style>`), it parses it and builds the **CSSOM (CSS Object Model)** tree.

```
        CSS Source                         CSSOM Tree

  body {                             ┌──────────────┐
    font-size: 16px;                 │    body      │
  }                                  │ font: 16px   │
  h1 {                               └──┬────────┬──┘
    color: red;                         │        │
    font-weight: bold;            ┌─────┴──┐  ┌──┴─────┐
  }                               │   h1   │  │   p    │
  p {                             │color:  │  │color:  │
    color: blue;                  │  red   │  │  blue  │
  }                               │bold    │  └────────┘
                                  └────────┘
```

**Key Points:**

- CSS is **render-blocking** — browser won't paint until CSSOM is ready
- Styles are inherited (like `font-size` from body to children)
- More specific selectors = more work for the browser
- CSSOM is built **top to bottom**, similar to DOM

### Step 3: JavaScript Execution (if encountered)

When the browser encounters a `<script>` tag, it **STOPS HTML parsing** and executes the JavaScript.

```
  Parsing HTML...
       │
       ▼
  ┌─────────────────┐
  │ Found <script>! │
  │                 │
  │  STOP parsing   │──────┐
  │  HTML!          │      │
  └─────────────────┘      │
                            ▼
                   ┌─────────────────┐
                   │  Download JS    │
                   │  (if external)  │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  Execute JS     │
                   │  (can modify    │
                   │   DOM & CSSOM)  │
                   └────────┬────────┘
                            │
                            ▼
                   Resume HTML Parsing...
```

**Key Points:**

- JavaScript is **parser-blocking** by default
- JS can modify both DOM and CSSOM, so browser must wait
- Solutions to avoid blocking:
  - `<script async>` — download in parallel, execute when ready
  - `<script defer>` — download in parallel, execute after HTML parsing
  - Place scripts at bottom of `<body>`

### async vs defer:

```
  Normal <script>:
  HTML: ──────█████████████────────────────────────────▶
  JS:         ↓ Download ↓↓ Execute ↓
              ████████████████████████
              (blocks HTML parsing)

  <script async>:
  HTML: ──────────────────────█████────────────────────▶
  JS:         ↓ Download ↓    ↓Exec↓
              ████████████    ██████
              (downloads in parallel, blocks only during execution)

  <script defer>:
  HTML: ─────────────────────────────────────────┤
  JS:         ↓ Download ↓                       ↓Execute↓
              ████████████                       █████████
              (downloads in parallel, executes AFTER HTML is fully parsed)
```

---

### Step 4: Render Tree Construction

The browser **combines DOM + CSSOM** to create the **Render Tree**. Only **visible elements** are included.

```
      DOM Tree          +        CSSOM Tree        =       Render Tree

  ┌──────────┐           ┌──────────────┐           ┌────────────────┐
  │   html   │           │  body:16px   │           │     body       │
  └──┬────┬──┘           └──┬────────┬──┘           │  font: 16px   │
     │    │                 │        │              └──┬──────────┬──┘
  ┌──┴┐ ┌─┴──┐         ┌───┴──┐ ┌───┴──┐            │          │
  │head│ │body│         │h1:red│ │p:blue│         ┌──┴───┐  ┌───┴──┐
  └──┬─┘ └┬─┬─┘        └──────┘ └──────┘         │  h1  │  │  p   │
     │     │  │                                   │"Hello"│  │"World"│
  ┌──┴──┐ ┌┴┐ ┌┴┐                                │red,   │  │blue  │
  │title│ │h1│ │p│                                │bold   │  │      │
  └─────┘ └──┘ └─┘                               └───────┘  └──────┘
```

**What's NOT in the Render Tree:**

- `<head>`, `<title>`, `<meta>` (not visual)
- Elements with `display: none`
- `<script>`, `<link>` tags

**What IS in the Render Tree:**

- Visible elements with their computed styles
- Pseudo-elements (`::before`, `::after`)
- Elements with `visibility: hidden` (they still take space!)

> 💡 `display: none` → NOT in render tree (no space)
> 💡 `visibility: hidden` → IN render tree (takes space, just invisible)

---

### Step 5: Layout (Reflow)

The browser calculates the **exact position and size** of every element on the page. It figures out the geometry.

```
  ┌─────────────────────────────────── Viewport (1200px) ──────────────────────┐
  │                                                                             │
  │  ┌──────────────────────────────────────────────────────────────────────┐  │
  │  │ body (margin: 8px)                                                    │  │
  │  │                                                                       │  │
  │  │  ┌────────────────────────────────────────────────────────────────┐  │  │
  │  │  │ h1: x=8, y=8, width=1184px, height=32px                       │  │  │
  │  │  │ "Hello"                                                         │  │  │
  │  │  └────────────────────────────────────────────────────────────────┘  │  │
  │  │                                                                       │  │
  │  │  ┌────────────────────────────────────────────────────────────────┐  │  │
  │  │  │ p: x=8, y=48, width=1184px, height=20px                       │  │  │
  │  │  │ "World"                                                         │  │  │
  │  │  └────────────────────────────────────────────────────────────────┘  │  │
  │  │                                                                       │  │
  │  └──────────────────────────────────────────────────────────────────────┘  │
  │                                                                             │
  └─────────────────────────────────────────────────────────────────────────────┘
```

**What Layout calculates:**

- Width and height of each element
- Position (x, y coordinates)
- How elements relate to each other (parent-child, siblings)
- The effect of `margin`, `padding`, `border`
- Viewport dimensions

**Key Points:**

- Layout starts from the **root** and works down the tree
- **Reflows are expensive!** Changing one element can trigger re-layout of many elements
- Reading layout properties (like `offsetWidth`) can force a synchronous layout

---

### Step 6: Paint (Rasterization)

The browser converts the layout into **actual pixels** on the screen. It fills in colors, text, images, borders, shadows, etc.

```
  Layout (boxes + positions)          Paint (actual pixels)

  ┌────────────────────┐             ┌────────────────────┐
  │                    │             │                    │
  │  ┌──────────────┐ │             │  ┌──────────────┐ │
  │  │ box: h1      │ │    ──►      │  │ Hello        │ │  ← red, bold, 32px
  │  └──────────────┘ │             │  └──────────────┘ │
  │  ┌──────────────┐ │             │  ┌──────────────┐ │
  │  │ box: p       │ │    ──►      │  │ World        │ │  ← blue, 16px
  │  └──────────────┘ │             │  └──────────────┘ │
  │                    │             │                    │
  └────────────────────┘             └────────────────────┘
```

**Paint Order (what gets painted first):**

1. Background color
2. Background image
3. Border
4. Children
5. Outline

---

### Step 7: Compositing

For complex pages, the browser creates **multiple layers** and combines them. This is like Photoshop layers!

```
  ┌─────────────────────────────────────┐
  │          Layer 3 (popup/modal)       │  ← z-index, transform
  ├─────────────────────────────────────┤
  │          Layer 2 (fixed header)      │  ← position: fixed
  ├─────────────────────────────────────┤
  │          Layer 1 (main content)      │  ← default layer
  └─────────────────────────────────────┘

         All layers composited together
                     │
                     ▼
          ┌─────────────────┐
          │  Final Frame    │
          │  on Screen! 🖥️  │
          └─────────────────┘
```

**What triggers a new layer:**

- `transform` or `opacity` animations
- `position: fixed` or `sticky`
- `will-change` property
- `<video>`, `<canvas>` elements
- High `z-index` with positioned elements

---

## Complete CRP Flow — All Steps Together

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CRITICAL RENDERING PATH                               │
└─────────────────────────────────────────────────────────────────────────────┘

  ① Network          ② Process           ③ Build             ④ Render
  ─────────          ─────────           ─────────           ─────────

  Download    ──►    Parse HTML   ──►    Build DOM    ─┐
  HTML                                                  │
                                                        ├──►  Render  ──►  Layout  ──►  Paint  ──►  Composite
  Download    ──►    Parse CSS    ──►    Build CSSOM  ─┘       Tree
  CSS

  Download    ──►    Execute JS   ──►    May modify
  JS                (blocks!)            DOM/CSSOM


  ┌────────────────────────────────────────────────────────────────────────┐
  │                                                                        │
  │  Time ────────────────────────────────────────────────────────────▶   │
  │                                                                        │
  │  [HTML Download] [Parse] [DOM]                                         │
  │       [CSS Download] [Parse] [CSSOM]                                   │
  │            [JS Download] [Execute]                                      │
  │                                    [Render Tree] [Layout] [Paint] 🎨   │
  │                                                                        │
  │                                                          First Paint!  │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## CRP Optimization Techniques

### 1. Minimize Critical Resources

| Technique                 | What it does                            |
| ------------------------- | --------------------------------------- |
| Inline critical CSS       | Put above-the-fold CSS in `<style>` tag |
| Defer non-critical CSS    | Load below-the-fold CSS asynchronously  |
| `async` / `defer` scripts | Don't block HTML parsing                |
| Remove unused CSS/JS      | Less to download and parse              |

### 2. Minimize Critical Path Length

```
  BAD (Long Critical Path):
  HTML → CSS → JS → More CSS → More JS → Render
  ═══════════════════════════════════════════════ SLOW 🐢

  GOOD (Short Critical Path):
  HTML → Critical CSS → Render (then load the rest)
  ════════════════════════════ FAST 🚀
```

### 3. Minimize Critical Bytes

| Technique                       | Savings        |
| ------------------------------- | -------------- |
| Minify CSS/JS                   | 20-30% smaller |
| Gzip/Brotli compression         | 60-80% smaller |
| Remove comments/whitespace      | 10-15% smaller |
| Tree shaking (remove dead code) | Varies         |

---

## What Triggers Re-renders?

Understanding this helps avoid performance issues:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  LAYOUT (Reflow) triggered by:          COST: 💰💰💰 (Expensive) │
│  • Changing width, height, margin, padding                       │
│  • Adding/removing DOM elements                                   │
│  • Changing font-size                                             │
│  • Resizing window                                                │
│  • Reading offsetWidth, clientHeight (forces sync layout)        │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PAINT triggered by:                    COST: 💰💰 (Moderate)    │
│  • Changing color, background-color                               │
│  • Changing visibility, box-shadow                                │
│  • Changing border-color, outline                                 │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  COMPOSITE ONLY:                        COST: 💰 (Cheapest)      │
│  • Changing transform (translate, scale, rotate)                 │
│  • Changing opacity                                               │
│  • These DON'T trigger layout or paint!                          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

> 💡 **Performance Tip:** For animations, ALWAYS use `transform` and `opacity` instead of `top`, `left`, `width`, or `height`. They're WAY cheaper!

---

## Key Metrics Related to CRP

| Metric                             | What it measures                                |
| ---------------------------------- | ----------------------------------------------- |
| **FP (First Paint)**               | When browser paints ANYTHING (background color) |
| **FCP (First Contentful Paint)**   | When first text/image appears                   |
| **LCP (Largest Contentful Paint)** | When the biggest visible element loads          |
| **TTI (Time to Interactive)**      | When page is fully interactive (can click/type) |

```
  Time ──────────────────────────────────────────────────────────────▶

  │         │              │                    │                │
  │   FP    │    FCP       │       LCP          │      TTI       │
  │(blank   │(some text    │(hero image/main    │(fully          │
  │ paint)  │ appears)     │ content loaded)    │ interactive)   │
  │         │              │                    │                │
