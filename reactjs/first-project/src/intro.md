# Introduction to React

## What is React?

- React is a **JavaScript library** for building user interfaces (UIs).
- Developed by **Facebook (Meta)** in 2013.
- It is NOT a framework (unlike Angular) — it focuses only on the **view layer**.
- Used for building **Single Page Applications (SPAs)**.
- Currently the most popular frontend library in the industry.

## Why React?

| Problem (Vanilla JS) | React's Solution |
|----------------------|-----------------|
| Manually updating DOM is slow & error-prone | Virtual DOM handles updates efficiently |
| Code becomes spaghetti as app grows | Component-based architecture |
| Hard to reuse UI pieces | Reusable components |
| Full page reloads on navigation | SPA with client-side routing |
| No structure for large apps | Unidirectional data flow |

## How React Works Internally

### 1. Virtual DOM

- React keeps a **lightweight copy** of the real DOM in memory (Virtual DOM).
- When state changes, React creates a **new Virtual DOM tree**.
- React **compares** (diffs) the new tree with the old one.
- Only the **changed parts** are updated in the real DOM (reconciliation).
- This makes updates fast because touching the real DOM is expensive.

```
State Changes → New Virtual DOM → Diff with Old → Update Real DOM (minimal changes)
```

### 2. Reconciliation (Diffing Algorithm)

```
Old Virtual DOM          New Virtual DOM
┌──────────────┐        ┌──────────────┐
│     <div>    │        │     <div>    │
│  ┌────────┐  │        │  ┌────────┐  │
│  │ <h1>   │  │        │  │ <h1>   │  │  ← Same (skip)
│  │ Hello  │  │        │  │ Hello  │  │
│  └────────┘  │        │  └────────┘  │
│  ┌────────┐  │        │  ┌────────┐  │
│  │ <p>    │  │   →    │  │ <p>    │  │  ← Changed! (update this)
│  │ count:0│  │        │  │ count:1│  │
│  └────────┘  │        │  └────────┘  │
└──────────────┘        └──────────────┘
```

- React only updates the `<p>` tag, not the entire page.

### 3. Component-Based Architecture

- UI is split into small, independent, reusable pieces called **components**.
- Each component manages its own logic and rendering.
- Components can be **composed** (nested inside each other).

```
App
├── Navbar
│   ├── Logo
│   └── NavLinks
├── Main
│   ├── Sidebar
│   └── Content
└── Footer
```

### 4. Unidirectional Data Flow (One-Way Binding)

```
State → UI (render) → User Action → State Update → UI (re-render)
```

- Data flows in **one direction**: parent → child (via props).
- Makes app behavior predictable and easier to debug.
- Unlike Angular's two-way binding, React is explicit about data flow.

## React vs Vanilla JavaScript

| Feature | Vanilla JS | React |
|---------|-----------|-------|
| DOM updates | Manual (`querySelector`, `innerHTML`) | Automatic (Virtual DOM) |
| UI structure | HTML files + JS manipulation | Components (JSX) |
| State management | Variables + manual DOM sync | useState + auto re-render |
| Reusability | Copy-paste or template literals | Import & use components |
| Performance | Touch DOM for every change | Batch updates, minimal DOM changes |
| Scalability | Gets messy in large apps | Scales well with component architecture |

## Key Concepts Overview

| Concept | What It Is |
|---------|-----------|
| **JSX** | HTML-like syntax inside JavaScript |
| **Components** | Reusable UI building blocks |
| **Props** | Data passed from parent to child |
| **State** | Data that changes within a component |
| **Hooks** | Functions to add features (useState, useEffect, etc.) |
| **Virtual DOM** | In-memory representation of real DOM |
| **Reconciliation** | Process of comparing and updating DOM |

## How a React App Runs

### Step-by-Step Flow

1. **Browser loads `index.html`** — contains a single `<div id="root"></div>`.
2. **Vite loads `main.jsx`** — the JavaScript entry point.
3. **`ReactDOM.createRoot()`** — connects React to the `#root` div.
4. **`.render(<App />)`** — React calls the `App` component function.
5. **App returns JSX** — React converts it to Virtual DOM.
6. **Virtual DOM → Real DOM** — React inserts elements into the page.
7. **User interacts** — clicks, types, etc.
8. **State updates** — triggers re-render of affected components only.

```jsx
// index.html
<body>
  <div id="root"></div>  <!-- React takes over this div -->
  <script type="module" src="/src/main.jsx"></script>
</body>
```

```jsx
// main.jsx
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
```

## Single Page Application (SPA)

- Traditional websites: every page click = full page reload from server.
- SPA: the page loads **once**, then JavaScript handles all navigation.
- React swaps components in/out without reloading the page.
- Feels faster and more app-like (like Gmail, Instagram, Twitter).

```
Traditional:  /home → server → full HTML page
              /about → server → full HTML page

SPA (React):  /home → React swaps <Home /> component
              /about → React swaps <About /> component
              (No server request, no page reload!)
```

## React Ecosystem

| Tool/Library | Purpose |
|-------------|---------|
| React | UI components & rendering |
| React DOM | Connects React to browser DOM |
| Vite / CRA | Project setup & dev server |
| React Router | Client-side routing (page navigation) |
| Redux / Zustand | Global state management |
| Axios / Fetch | API calls |
| Tailwind / CSS Modules | Styling |
| React Hook Form | Form handling |
| Jest / Vitest | Testing |

## Creating a React Project (Vite)

```bash
# Create new project
npm create vite@latest my-app -- --template react

# Navigate into project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

- Vite is the recommended tool (faster than Create React App).
- Dev server runs at `http://localhost:5173` by default.
- Hot Module Replacement (HMR) — changes appear instantly without full reload.

## Summary

- React is a library for building UIs with reusable components.
- It uses a Virtual DOM to minimize expensive real DOM operations.
- Components are functions that return JSX (HTML-like syntax in JS).
- Data flows one-way: parent → child via props.
- State changes trigger automatic re-renders.
- React apps are SPAs — fast, no full page reloads.
- The ecosystem provides routing, state management, and more as separate packages.
- Vite is the standard tool for creating new React projects.
