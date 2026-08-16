# Context API in React — Deep Dive

## What is Context API?

- Context API is a React feature that allows you to **share state/data globally** across a component tree without passing props manually at every level.
- It solves the **prop drilling problem** (passing props through intermediate components that don't use them).
- Built into React — no need for external libraries for simple global state.

## When to Use Context API

| Use Case | Example |
|----------|---------|
| Theme (dark/light mode) | All components need to know the current theme |
| Authentication | User login state needed across navbar, profile, settings |
| Language/Locale | i18n translation strings needed everywhere |
| App configuration | Feature flags, settings |
| Shopping cart | Cart items accessible from navbar, product page, checkout |

## Core Concepts

### 1. Context Object

```jsx
import { createContext } from "react";

const ThemeContext = createContext("light"); // "light" is the default value
```

- `createContext(defaultValue)` creates a Context object.
- The `defaultValue` is only used when a component does NOT have a matching Provider above it in the tree.
- In practice, you almost always have a Provider, so defaultValue is rarely used.

### 2. Provider

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

- The Provider wraps the part of the component tree that needs access to the context.
- `value` prop = the current context value shared with all consumers.
- When `value` changes, all consuming components re-render.

### 3. Consumer (useContext Hook)

```jsx
import { useContext } from "react";

const MyComponent = () => {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Hello</div>;
};
```

- `useContext(ContextObject)` reads the current value from the nearest Provider above.
- The component automatically re-renders when the context value changes.

## Complete Example: Theme Toggle

### Step 1: Create Context (ThemeContext.jsx)

```jsx
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Step 2: Wrap App with Provider (main.jsx or App.jsx)

```jsx
import { ThemeProvider } from "./ThemeContext";
import App from "./App";

const Root = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};
```

### Step 3: Consume in Any Component

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>
    </nav>
  );
};
```

## Context API Architecture

```
┌──────────────────────────────────────────────┐
│              ThemeProvider                     │
│  ┌─────────────────────────────────────────┐  │
│  │  state: { theme: "dark" }               │  │
│  │  methods: { toggleTheme }               │  │
│  └─────────────────────────────────────────┘  │
│                    │                          │
│         value = { theme, toggleTheme }       │
│                    │                          │
│    ┌───────────────┼───────────────┐         │
│    │               │               │         │
│  ┌─▼──┐       ┌───▼───┐      ┌───▼───┐     │
│  │Nav  │       │Sidebar│      │Content│     │
│  │bar  │       │       │      │       │     │
│  └─────┘       └───────┘      └───────┘     │
│                                              │
│  All can access { theme, toggleTheme }       │
│  using useContext(ThemeContext)               │
└──────────────────────────────────────────────┘
```

## Authentication Context — Real-World Example

```jsx
// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

```jsx
// Usage in components
const ProtectedPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login to access this page.</p>;

  return <h1>Welcome, {user.name}!</h1>;
};
```

## Custom Hook for Context (Best Practice)

```jsx
// context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

// Custom hook — cleaner usage + error handling
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

```jsx
// Usage — cleaner import, built-in error checking
import { useTheme } from "./context/ThemeContext";

const Component = () => {
  const { theme, toggleTheme } = useTheme(); // ← Clean!
  return <button onClick={toggleTheme}>{theme}</button>;
};
```

## Multiple Contexts

```jsx
// Nest providers
const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
```

- Each context manages its own domain of state.
- Components can consume multiple contexts using multiple `useContext` calls.

## Context API Performance Considerations

### The Problem: Unnecessary Re-renders

```jsx
// ❌ All consumers re-render when ANY part of value changes
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [cart, setCart] = useState([]);

  // This object is recreated every render → all consumers re-render
  return (
    <AppContext.Provider value={{ user, theme, cart, setUser, setTheme, setCart }}>
      {children}
    </AppContext.Provider>
  );
};
```

### The Solution: Split Contexts

```jsx
// ✅ Separate contexts for separate concerns
<UserProvider>
  <ThemeProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>
</UserProvider>
```

- Now changing the theme only re-renders theme consumers, not user or cart consumers.

### Memoize Context Value

```jsx
import { useMemo } from "react";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // ✅ Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Context vs Props — Decision Guide

```
Do only 1-2 components need this data?
  → YES → Use Props
  → NO ↓

Is the data needed by many components at different depths?
  → YES → Use Context API
  → NO ↓

Does the data change very frequently (multiple times per second)?
  → YES → Use external state library (Redux, Zustand)
  → NO → Use Context API
```

## Common Patterns

### Pattern 1: Reducer + Context (for complex state)

```jsx
import { createContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
```

### Pattern 2: Context with Initial Fetch

```jsx
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/config")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading app...</p>;

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
```

## Key Takeaways

- Context API provides a way to share data globally without prop drilling.
- Three core pieces: `createContext()`, `<Provider value={...}>`, `useContext(Context)`.
- Best for: theme, auth, language, configuration — data that many components need.
- Create custom hooks (`useTheme`, `useAuth`) for cleaner consumption and error handling.
- Split contexts by domain to avoid unnecessary re-renders.
- Memoize context values with `useMemo` when passing objects.
- For complex state logic, combine Context with `useReducer`.
- For high-frequency updates or very complex state, consider Redux or Zustand instead.
