# useEffect Hook in React

## What is useEffect?

- `useEffect` is a React hook that lets you perform **side effects** in function components.
- Side effects = anything that interacts with the outside world (API calls, timers, DOM manipulation, subscriptions).
- It runs **after** the component renders (after the paint to the screen).
- It replaces lifecycle methods from class components: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.

## Why Do We Need useEffect?

- React components should be **pure functions** during rendering (same input → same output).
- But apps need to do "impure" things: fetch data, set up timers, listen to events, etc.
- `useEffect` gives you a controlled place to do these things **after rendering**.

## Basic Syntax

```jsx
import { useEffect } from "react";

useEffect(() => {
  // Side effect code here
  console.log("Effect ran!");

  return () => {
    // Cleanup code (optional)
    console.log("Cleanup ran!");
  };
}, [dependencies]);
```

| Part | Purpose |
|------|---------|
| Effect function | Code to run (the side effect) |
| Cleanup function | Code to run when component unmounts or before re-running effect |
| Dependency array | Controls when the effect runs |

## Dependency Array — Controls When Effect Runs

### 1. No Dependency Array — Runs on EVERY Render

```jsx
useEffect(() => {
  console.log("Runs on every render (mount + every update)");
});
```

- ⚠️ Use cautiously — can cause performance issues or infinite loops.

### 2. Empty Array `[]` — Runs ONLY on Mount

```jsx
useEffect(() => {
  console.log("Runs only once — when component mounts");
}, []);
```

- Equivalent to `componentDidMount` in class components.
- Perfect for: initial API calls, setting up subscriptions, one-time setup.

### 3. With Dependencies — Runs When Dependencies Change

```jsx
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);
```

- Runs on mount AND whenever `count` changes.
- Equivalent to `componentDidUpdate` (for specific values).
- Can have multiple dependencies: `[count, name, isLoggedIn]`.

## Component Lifecycle with useEffect

```
┌─────────────────────────────────────────────────────┐
│                COMPONENT LIFECYCLE                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. MOUNTING (component appears on screen)           │
│     → Component renders                              │
│     → useEffect(() => {...}, []) runs                │
│                                                      │
│  2. UPDATING (state or props change)                 │
│     → Component re-renders                           │
│     → Cleanup of previous effect runs (if any)       │
│     → useEffect(() => {...}, [dep]) runs             │
│                                                      │
│  3. UNMOUNTING (component removed from screen)       │
│     → Cleanup function runs                          │
│     → Component is destroyed                         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Cleanup Function

- Returned from the effect function.
- Runs when:
  - Component **unmounts** (removed from DOM).
  - Before the effect **re-runs** (due to dependency change).
- Used to prevent memory leaks (clear timers, unsubscribe, close connections).

```jsx
useEffect(() => {
  console.log("component mounted / updated");

  return () => {
    console.log("component unmounted / cleanup before re-run");
  };
}, [count]);
```

### Common Cleanup Examples

```jsx
// Timer cleanup
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(timer); // ← Clear timer on unmount
}, []);

// Event listener cleanup
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

// AbortController for fetch cleanup
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort(); // ← Cancel fetch on unmount
}, []);
```

## Practical Examples

### Fetching Data on Mount

```jsx
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // Empty array = fetch only once

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Document Title Update

```jsx
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Updates title whenever count changes

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};
```

### Debounced Search

```jsx
const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(() => {
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer); // Cancel if user types again
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {results.map((r) => <li key={r.id}>{r.name}</li>)}
      </ul>
    </div>
  );
};
```

## useLayoutEffect vs useEffect

| Feature | useEffect | useLayoutEffect |
|---------|-----------|-----------------|
| When it runs | After paint (async) | Before paint (sync) |
| Blocks rendering? | ❌ No | ✅ Yes |
| Use case | Most side effects | DOM measurements, prevent flicker |
| Performance | Better (non-blocking) | Can cause lag if heavy |

```jsx
import { useLayoutEffect } from "react";

// Use when you need to measure/mutate DOM before user sees it
useLayoutEffect(() => {
  // Runs synchronously after DOM update, before browser paint
  const height = ref.current.getBoundingClientRect().height;
  // Set something based on measurement
}, []);
```

- **Rule of thumb**: Use `useEffect` unless you see a visual flicker, then switch to `useLayoutEffect`.

## Multiple useEffects

You can use multiple `useEffect` hooks to separate concerns:

```jsx
const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Effect 1: Fetch user data
  useEffect(() => {
    fetch("/api/user").then(res => res.json()).then(setUser);
  }, []);

  // Effect 2: Fetch posts when user changes
  useEffect(() => {
    if (user) {
      fetch(`/api/posts?userId=${user.id}`).then(res => res.json()).then(setPosts);
    }
  }, [user]);

  // Effect 3: Update document title
  useEffect(() => {
    document.title = user ? `${user.name}'s Profile` : "Loading...";
  }, [user]);

  return <div>...</div>;
};
```

## Common Mistakes

### 1. Infinite Loop (Missing/Wrong Dependencies)

```jsx
// ❌ Infinite loop: state update → re-render → effect runs → state update → ...
useEffect(() => {
  setCount(count + 1); // Updates state every render!
}); // No dependency array = runs every render

// ✅ Fix: Add proper dependency or condition
useEffect(() => {
  if (count < 10) {
    setCount(count + 1);
  }
}, [count]);
```

### 2. Forgetting Cleanup

```jsx
// ❌ Memory leak: interval never stops
useEffect(() => {
  setInterval(() => console.log("tick"), 1000);
}, []);

// ✅ Fix: Return cleanup function
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

### 3. Object/Array Dependencies

```jsx
// ❌ Runs every render (new object reference each time)
const options = { page: 1 };
useEffect(() => {
  fetchData(options);
}, [options]); // Object reference changes every render!

// ✅ Fix: Use primitive values or useMemo
useEffect(() => {
  fetchData({ page: 1 });
}, [page]); // Use the actual primitive dependency
```

## Rules for useEffect

1. Always include all values from the component scope that change over time and are used in the effect in the dependency array.
2. Don't lie about dependencies — if you use `count` inside the effect, include it in `[count]`.
3. Use the cleanup function for subscriptions, timers, and event listeners.
4. Keep effects focused — use multiple `useEffect` calls for different concerns.
5. Don't call `useEffect` conditionally — it must always be at the top level.

## Key Takeaways

- `useEffect` handles side effects after render.
- Dependency array controls when it runs: `[]` = mount only, `[dep]` = when dep changes, no array = every render.
- Return a cleanup function to prevent memory leaks.
- Use `useLayoutEffect` only when you need synchronous DOM measurements.
- Separate unrelated logic into multiple `useEffect` hooks.
- Always include used variables in the dependency array.
- Common uses: API calls, event listeners, timers, DOM manipulation, subscriptions.
