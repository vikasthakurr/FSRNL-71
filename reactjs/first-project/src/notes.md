# Components & JSX in React

## What is a Component?

- A component is a **reusable piece of UI** (like a function that returns HTML).
- React apps are built by composing many small components together.
- Each component has its own logic and appearance.
- Components can be nested inside other components.

## Types of Components

### 1. Functional Components (Modern - Recommended)

```jsx
function Home() {
  return <h1>Hello from Home</h1>;
}
export default Home;
```

### 2. Arrow Function Components

```jsx
const About = () => {
  return <h2>About Page</h2>;
};
export default About;
```

### 3. Class Components (Legacy - Not Recommended for New Code)

```jsx
import { Component } from "react";

class Welcome extends Component {
  render() {
    return <h1>Welcome</h1>;
  }
}
```

## What is JSX?

- JSX = **JavaScript XML**
- It lets you write HTML-like syntax inside JavaScript.
- JSX is NOT valid JavaScript — it gets compiled to `React.createElement()` calls by Babel/Vite.
- JSX makes React code more readable and intuitive.

### JSX Rules

| Rule | Example |
|------|---------|
| Must return a single parent element | Wrap in `<div>` or `<>...</>` |
| Use `className` instead of `class` | `<div className="box">` |
| Use `htmlFor` instead of `for` | `<label htmlFor="name">` |
| Self-close tags without children | `<img />`, `<input />`, `<br />` |
| JavaScript expressions use `{}` | `<h1>{name}</h1>` |
| CamelCase for attributes | `onClick`, `onChange`, `tabIndex` |

### JSX Expressions

```jsx
const name = "Vikas";
const age = 26;

function Greeting() {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>Next year: {age + 1}</p>
      <p>{age >= 18 ? "Adult" : "Minor"}</p>
    </div>
  );
}
```

## Fragments (`<>...</>`)

- When you need to return multiple elements without adding an extra DOM node.
- `<React.Fragment>` or shorthand `<>...</>`.

```jsx
// ❌ This fails (multiple root elements)
function App() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Using Fragment
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

## Importing and Exporting Components

### Default Export (one per file)

```jsx
// Home.jsx
function Home() {
  return <h1>Home</h1>;
}
export default Home;

// App.jsx (import with any name)
import Home from "./Home";
import MyHome from "./Home"; // Also works
```

### Named Export (multiple per file)

```jsx
// utils.jsx
export function Button() { return <button>Click</button>; }
export function Card() { return <div className="card">Card</div>; }

// App.jsx (must use exact names with curly braces)
import { Button, Card } from "./utils";
```

## Component Composition

- Building complex UIs by nesting components inside each other.

```jsx
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <>
      <Home />
      <About />
    </>
  );
}
export default App;
```

## How React Renders Components

1. `main.jsx` is the entry point.
2. `ReactDOM.createRoot()` mounts the app to the DOM (`#root` element).
3. React calls your `App` component function.
4. `App` returns JSX → React converts it to actual DOM elements.
5. Nested components are called recursively.

```jsx
// main.jsx
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

## Vite + React Project Structure

```
my-project/
├── node_modules/       → Installed packages
├── public/             → Static files (favicon, etc.)
├── src/
│   ├── assets/         → Images, fonts
│   ├── App.jsx         → Root component
│   ├── App.css         → App styles
│   ├── main.jsx        → Entry point (renders App)
│   └── index.css       → Global styles
├── index.html          → HTML template (has <div id="root">)
├── package.json        → Dependencies & scripts
├── vite.config.js      → Vite configuration
└── eslint.config.js    → Linting rules
```

## Key Takeaways

- Components are reusable, independent pieces of UI.
- Use functional components (not class components).
- JSX lets you write HTML inside JavaScript with `{}` for expressions.
- Always return a single root element (use Fragments if needed).
- One component per file is the convention.
- Export with `export default` and import with `import Name from "./Name"`.
