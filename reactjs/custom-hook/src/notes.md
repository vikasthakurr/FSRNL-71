# Custom Hooks in React

## What is a Custom Hook?

- A custom hook is a **JavaScript function** whose name starts with `use` and that can call other hooks inside it.
- It allows you to **extract and reuse** stateful logic across multiple components.
- Custom hooks don't share state between components — each component using the hook gets its own independent state.
- They follow the same rules as built-in hooks (must be called at the top level, only in React components or other hooks).

## Why Create Custom Hooks?

| Problem | Solution with Custom Hooks |
|---------|--------------------------|
| Same logic repeated in multiple components | Extract into one reusable hook |
| Component becomes too large | Split logic into focused hooks |
| Hard to test business logic | Isolate logic in hooks, test independently |
| Mixing concerns (UI + logic) | Hook handles logic, component handles UI |

## Basic Custom Hook Example (from your code)

### The Hook: UseFetch (UseCustom.jsx)

```jsx
import { useState, useEffect } from "react";

const UseCustom = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default UseCustom;
```

### Using the Hook (App.jsx)

```jsx
import UseCustom from "./UseCustom";

const App = () => {
  const [data] = UseCustom("https://dummyjson.com/products/1");
  console.log(data);

  return (
    <div>
      <h1>{data?.title}</h1>
    </div>
  );
};
```

- The hook encapsulates all fetching logic (state + effect).
- The component just calls the hook and uses the returned data.
- Any component can reuse this hook with different URLs.

## Rules for Custom Hooks

1. **Name must start with `use`** — React uses this to identify hooks and apply rules.
2. **Can call other hooks** — `useState`, `useEffect`, `useRef`, other custom hooks.
3. **Must follow Rules of Hooks** — only call at the top level, not in conditions/loops.
4. **Return whatever the consumer needs** — single value, array, or object.

```jsx
// ✅ Valid custom hook names
useAuth()
useFetch()
useLocalStorage()
useWindowSize()
useDebounce()

// ❌ Invalid — won't be treated as hooks
getData()        // Doesn't start with "use"
fetchUser()      // Doesn't start with "use"
UseCustom()      // Capital "U" — convention is lowercase "use"
```

> Note: While `UseCustom` (capital U) works in your code, the convention is lowercase `useFetch`, `useCustom`, etc.

## Improved useFetch Hook (Production-Ready)

```jsx
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: abort fetch if component unmounts or URL changes
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

### Usage

```jsx
const App = () => {
  const { data, loading, error } = useFetch("https://dummyjson.com/products/1");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Price: ${data.price}</p>
      <img src={data.thumbnail} alt={data.title} />
    </div>
  );
};
```

## Common Custom Hook Patterns

### 1. useToggle — Boolean Toggle

```jsx
import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
};

export default useToggle;
```

```jsx
// Usage
const App = () => {
  const { value: isOpen, toggle } = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>{isOpen ? "Close" : "Open"} Modal</button>
      {isOpen && <div className="modal">Modal Content</div>}
    </div>
  );
};
```

### 2. useLocalStorage — Persist State in LocalStorage

```jsx
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
```

```jsx
// Usage — state persists across page reloads!
const App = () => {
  const [name, setName] = useLocalStorage("username", "");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your name persists!"
    />
  );
};
```

### 3. useWindowSize — Track Browser Dimensions

```jsx
import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useWindowSize;
```

```jsx
// Usage
const App = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      Window: {width}px x {height}px
      {width < 768 ? " (Mobile)" : " (Desktop)"}
    </p>
  );
};
```

### 4. useDebounce — Delay Value Updates

```jsx
import { useState, useEffect } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
```

```jsx
// Usage — great for search inputs
const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { data } = useFetch(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {/* API call only happens 300ms after user stops typing */}
      {data && data.map((item) => <p key={item.id}>{item.name}</p>)}
    </div>
  );
};
```

### 5. useCounter — Reusable Counter Logic

```jsx
import { useState } from "react";

const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

export default useCounter;
```

```jsx
// Usage
const App = () => {
  const { count, increment, decrement, reset } = useCounter(0, 5);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+5</button>
      <button onClick={decrement}>-5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

### 6. useOnClickOutside — Detect Clicks Outside an Element

```jsx
import { useEffect, useRef } from "react";

const useOnClickOutside = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [handler]);

  return ref;
};

export default useOnClickOutside;
```

```jsx
// Usage — close dropdown when clicking outside
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOnClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>
      )}
    </div>
  );
};
```

## Custom Hooks — Key Concepts

### Each Component Gets Its Own State

```jsx
const ComponentA = () => {
  const { count, increment } = useCounter(0);
  // count here is independent...
};

const ComponentB = () => {
  const { count, increment } = useCounter(10);
  // ...from count here. They don't share state!
};
```

### Hooks Can Call Other Hooks

```jsx
const useUserData = (userId) => {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);
  const [isFollowing, setIsFollowing] = useLocalStorage(`follow-${userId}`, false);

  return { user: data, loading, error, isFollowing, setIsFollowing };
};
```

### Return Format — Array vs Object

```jsx
// Array return — good for 1-2 values (like useState)
const useToggle = () => {
  const [value, setValue] = useState(false);
  return [value, () => setValue(!value)]; // Caller can rename freely
};
const [isOpen, toggle] = useToggle();

// Object return — good for multiple values
const useFetch = (url) => {
  return { data, loading, error, refetch }; // Caller uses exact names
};
const { data, loading } = useFetch("/api");
```

## File Structure for Custom Hooks

```
src/
├── hooks/
│   ├── useFetch.js
│   ├── useToggle.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   └── useWindowSize.js
├── components/
│   ├── App.jsx
│   └── ...
└── main.jsx
```

## Key Takeaways

- Custom hooks extract reusable logic from components.
- Name must start with `use` (e.g., `useFetch`, `useToggle`).
- They can use any built-in hooks or other custom hooks.
- Each component calling the hook gets its own independent state copy.
- Return values as arrays (positional) or objects (named) based on the use case.
- Common hooks: `useFetch`, `useLocalStorage`, `useDebounce`, `useToggle`, `useWindowSize`.
- Keep hooks focused on one responsibility.
- Organize hooks in a `hooks/` folder for larger projects.
- Custom hooks make components cleaner, logic testable, and code DRY.
