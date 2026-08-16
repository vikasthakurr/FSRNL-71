# Props Drilling & Context API in React

## What is Props Drilling?

- Props drilling is when you pass data through **multiple intermediate components** that don't use the data themselves.
- The data is just being "drilled" through layers to reach a deeply nested child.
- It makes code harder to maintain, read, and refactor.

## The Problem Visualized

```
App (has data: { fname: "vikas", age: 26 })
 │
 └── Child1 (doesn't need data, just passes it down)
      │
      └── Child2 (doesn't need data, just passes it down)
           │
           └── Child3 (actually USES the data)
```

### Without Context (Pure Props Drilling)

```jsx
// App.jsx
const App = () => {
  const data = { fname: "vikas", age: 26 };
  return <Child1 data={data} />;
};

// Child1.jsx — doesn't use data, just passes it
const Child1 = ({ data }) => {
  return <Child2 data={data} />;
};

// Child2.jsx — doesn't use data, just passes it
const Child2 = ({ data }) => {
  return <Child3 data={data} />;
};

// Child3.jsx — finally uses the data!
const Child3 = ({ data }) => {
  return (
    <div>
      <h1>{data.fname}</h1>
      <h1>{data.age}</h1>
    </div>
  );
};
```

- Child1 and Child2 are just "middlemen" — they don't need the data.
- If you add a new prop, you must update every intermediate component.
- This gets worse with more levels of nesting.

## The Solution: Context API

- Context API lets you share data across components **without passing props manually** at every level.
- It creates a "global" value that any nested component can access directly.
- Built into React — no extra library needed.

## How Context API Works

```
┌─────────────────────────────────────────┐
│           Context Provider              │
│    (wraps the component tree)           │
│                                         │
│    ┌───────────────────────────────┐    │
│    │         App                   │    │
│    │    ┌─────────────────────┐    │    │
│    │    │      Child1         │    │    │
│    │    │  ┌───────────────┐  │    │    │
│    │    │  │    Child2     │  │    │    │
│    │    │  │ ┌───────────┐ │  │    │    │
│    │    │  │ │  Child3   │ │  │    │    │
│    │    │  │ │ useContext │◄┼─┼────┼────┼── Directly accesses data
│    │    │  │ └───────────┘ │  │    │    │
│    │    │  └───────────────┘  │    │    │
│    │    └─────────────────────┘    │    │
│    └───────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Context API — 3 Steps

### Step 1: Create Context

```jsx
import { createContext } from "react";

// Create a context object
export const postman = createContext();
```

- `createContext()` creates a Context object.
- Export it so other components can import and use it.
- Convention: name it meaningfully (e.g., `UserContext`, `ThemeContext`).

### Step 2: Provide the Context (Wrap with Provider)

```jsx
import { createContext } from "react";
import Child1 from "./Child1";

export const postman = createContext();

const App = () => {
  let data = {
    fname: "vikas",
    age: 26,
  };

  return (
    <postman.Provider value={data}>
      <div>
        <Child1 />
      </div>
    </postman.Provider>
  );
};
```

- `<Context.Provider value={...}>` wraps the component tree that needs access.
- `value` prop = the data you want to share.
- Any component inside the Provider can access this value.

### Step 3: Consume the Context (useContext Hook)

```jsx
import { useContext } from "react";
import { postman } from "./App";

const Child3 = () => {
  const value = useContext(postman); // ← Directly access the data!

  return (
    <div>
      <h1>{value.fname}</h1>
      <h1>{value.age}</h1>
    </div>
  );
};
```

- `useContext(ContextObject)` returns the current context value.
- No need to pass props through Child1 and Child2!
- The component will re-render when the context value changes.

## Intermediate Components — Clean and Simple

```jsx
// Child1.jsx — No props needed!
const Child1 = () => {
  return (
    <div>
      <Child2 />
    </div>
  );
};

// Child2.jsx — No props needed!
const Child2 = () => {
  return (
    <div>
      <Child3 />
    </div>
  );
};
```

- Child1 and Child2 are no longer cluttered with props they don't use.

## Context with Dynamic Values (State)

```jsx
import { createContext, useState } from "react";

export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
};
```

```jsx
// Any deeply nested component
import { useContext } from "react";
import { ThemeContext } from "./App";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current: {theme}
    </button>
  );
};
```

- You can pass state AND setter functions through context.
- Any component can both read and update the shared state.

## Multiple Contexts

```jsx
export const UserContext = createContext();
export const ThemeContext = createContext();

const App = () => {
  const [user, setUser] = useState({ name: "Vikas" });
  const [theme, setTheme] = useState("dark");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <MainApp />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};
```

```jsx
// Consuming multiple contexts
const Profile = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <h1>{user.name}</h1>
    </div>
  );
};
```

## Best Practice: Separate Context File

```jsx
// context/UserContext.jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

```jsx
// App.jsx
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
};
```

```jsx
// Any component
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav>
      <span>{user?.name}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};
```

## Props Drilling vs Context API

| Feature | Props Drilling | Context API |
|---------|---------------|-------------|
| Setup complexity | None | Need to create Context + Provider |
| Readability (few levels) | ✅ Clear data flow | Overkill |
| Readability (many levels) | ❌ Cluttered | ✅ Clean |
| Maintenance | Hard (update every component) | Easy (update Provider only) |
| Performance | No extra overhead | Re-renders all consumers on change |
| When to use | 1-2 levels deep | 3+ levels or many components need same data |

## When to Use Context API

✅ Use Context when:
- Data needs to be accessed by many components at different nesting levels.
- Data is "global" for a component tree (theme, user, language, auth).
- Props drilling makes code hard to maintain.

❌ Don't use Context when:
- Only 1-2 levels of prop passing — just use props.
- High-frequency updates (Context re-renders all consumers) — use state managers.
- The data is only needed by one child — just pass props.

## Context Limitations

1. **Performance**: When context value changes, ALL consumers re-render (even if they only use part of the value).
2. **Not for high-frequency updates**: Use Redux/Zustand for rapidly changing data.
3. **No selector**: You can't subscribe to only part of the context value (unlike Redux).

## Alternatives to Context for State Management

| Library | Best For |
|---------|---------|
| Context API | Simple global state (theme, auth, language) |
| Redux | Large apps with complex state logic |
| Zustand | Simple global state with less boilerplate than Redux |
| Jotai | Atomic state management |
| React Query | Server state (API data caching) |

## Key Takeaways

- Props drilling = passing props through components that don't use them.
- Context API solves this by providing a way to share data directly.
- Three steps: `createContext()` → `<Provider value={...}>` → `useContext(Context)`.
- Context is best for low-frequency, globally-needed data (theme, auth, user).
- Keep context values stable to avoid unnecessary re-renders.
- For complex or frequently-changing state, consider Redux or Zustand.
- Separate context logic into its own file for cleaner code.
