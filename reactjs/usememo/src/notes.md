# useMemo, useCallback & React.memo in React

## The Performance Problem

- In React, when a parent component re-renders, **all its children re-render too** — even if their props haven't changed.
- Expensive calculations run again on every render, even if inputs haven't changed.
- Functions are recreated on every render, breaking `React.memo` optimizations.

These three tools solve these problems:

| Tool | Purpose |
|------|---------|
| `useMemo` | Memoize (cache) an **expensive computed value** |
| `useCallback` | Memoize (cache) a **function reference** |
| `React.memo` | Prevent a **child component** from re-rendering if props haven't changed |

## React.memo — Memoize Components

### The Problem

```jsx
// Parent re-renders → Child re-renders (even with same props)
function App() {
  const [count, setCount] = useState(0);  // Only parent uses this

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child />  {/* Re-renders every time count changes! Why? */}
    </>
  );
}

const Child = () => {
  console.log("child component called"); // Logs on EVERY parent render
  return <div>Child</div>;
};
```

### The Solution: Wrap with React.memo

```jsx
import { memo } from "react";

const Child = () => {
  console.log("child component called"); // Only logs when its props change
  return <div>Child</div>;
};

export default memo(Child);
```

- `React.memo` is a **Higher Order Component (HOC)**.
- It does a **shallow comparison** of props before and after.
- If props are the same → skip re-render (use cached version).
- If props changed → re-render the component.

### React.memo with Props

```jsx
// Only re-renders when count1 actually changes
const Child = memo(({ count1 }) => {
  console.log("child rendered");
  return <h2>Child count: {count1}</h2>;
});
```

## useMemo — Memoize Expensive Calculations

### The Problem

```jsx
function App() {
  const [count, setCount] = useState(0);

  // ❌ This expensive function runs on EVERY render!
  function calculate() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }

  let res = calculate(); // Blocks the UI for seconds on every click!

  return (
    <div>
      <h1>Sum: {res}</h1>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

- Every time `count` changes → component re-renders → `calculate()` runs again.
- The calculation result doesn't depend on `count`, but it still runs!

### The Solution: useMemo

```jsx
import { useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);

  function calculate() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }

  // ✅ Only calculates once (empty dependency = compute on mount only)
  let res = useMemo(() => calculate(), []);

  return (
    <div>
      <h1>Sum: {res}</h1>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### useMemo Syntax

```jsx
const memoizedValue = useMemo(() => {
  // Expensive computation
  return computedResult;
}, [dependency1, dependency2]);
```

| Part | Purpose |
|------|---------|
| Factory function | The expensive calculation to memoize |
| Dependency array | Re-compute only when these values change |
| Return value | The cached result |

### useMemo with Dependencies

```jsx
const App = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(2);
  const [name, setName] = useState("");

  // Only recalculates when numbers or multiplier change
  // Changing name does NOT trigger recalculation
  const total = useMemo(() => {
    console.log("Calculating...");
    return numbers.reduce((sum, n) => sum + n * multiplier, 0);
  }, [numbers, multiplier]);

  return (
    <div>
      <h1>Total: {total}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {/* Typing here doesn't re-run the calculation */}
    </div>
  );
};
```

## useCallback — Memoize Functions

### The Problem

```jsx
function App() {
  const [count, setCount] = useState(0);

  // ❌ This function is RECREATED on every render
  function sayHi() {
    console.log("hi");
  }

  // Even with React.memo, Child re-renders because sayHi is a new reference!
  return <Child sayHi={sayHi} />;
}

const Child = memo(({ sayHi }) => {
  console.log("child rendered"); // Still renders every time!
  return <button onClick={sayHi}>Say Hi</button>;
});
```

- Functions are objects in JavaScript.
- `sayHi` is recreated every render → new reference → `React.memo` sees props "changed".

### The Solution: useCallback

```jsx
import { useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);

  // ✅ Function reference stays the same between renders
  const sayHi = useCallback(() => {
    console.log("hi");
  }, []); // Empty deps = same function forever

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child sayHi={sayHi} />  {/* Child won't re-render now! */}
    </>
  );
}

const Child = memo(({ sayHi }) => {
  console.log("child rendered"); // Only on mount now ✅
  return <button onClick={sayHi}>Say Hi</button>;
});
```

### useCallback Syntax

```jsx
const memoizedFunction = useCallback(() => {
  // function body
}, [dependency1, dependency2]);
```

- Returns the **same function reference** between renders.
- Only creates a new function when dependencies change.

### useCallback with Dependencies

```jsx
const App = () => {
  const [user, setUser] = useState("Vikas");

  // Recreates only when `user` changes
  const greet = useCallback(() => {
    console.log(`Hello, ${user}!`);
  }, [user]);

  return <Child onGreet={greet} />;
};
```

## How They Work Together (from your code)

```jsx
import { useCallback, useMemo, useState, memo } from "react";

function App() {
  const [count, setCount] = useState(0);   // Parent counter
  const [count1, setCount1] = useState(0);  // Child counter

  // 1. useMemo: expensive calculation runs only once
  function calculate() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }
  let res = useMemo(() => calculate(), []);

  // 2. useCallback: function reference stays stable
  function sayHi() {
    console.log("hi");
  }
  let sayHi1 = useCallback(() => sayHi(), []);

  return (
    <>
      <h1>Sum: {res}</h1>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>Parent +</button>

      <button onClick={() => setCount1((c) => c + 1)}>Child +</button>
      {/* 3. React.memo: Child skips re-render if props unchanged */}
      <Child count1={count1} sayHi={sayHi1} />
    </>
  );
}

// Wrapped with memo — only re-renders if count1 or sayHi changes
const Child = memo(() => {
  console.log("child component called");
  return <div>Child</div>;
});
```

## Comparison Table

| Feature | useMemo | useCallback | React.memo |
|---------|---------|-------------|------------|
| What it caches | A computed **value** | A **function** reference | A **component** render |
| Returns | The memoized value | The memoized function | A memoized component |
| When to use | Expensive calculations | Functions passed as props | Child components that re-render unnecessarily |
| Syntax | `useMemo(() => val, [deps])` | `useCallback(fn, [deps])` | `memo(Component)` |
| Recalculates when | Dependencies change | Dependencies change | Props change (shallow compare) |

## useMemo vs useCallback — The Relationship

```jsx
// These are equivalent:
const memoizedFn = useCallback(fn, [deps]);
const memoizedFn = useMemo(() => fn, [deps]);

// useCallback(fn, deps) is just shorthand for useMemo(() => fn, deps)
```

- `useMemo` caches the **return value** of the function.
- `useCallback` caches the **function itself**.

## When to Use (and When NOT to)

### ✅ Use useMemo when:
- Filtering/sorting large arrays.
- Complex mathematical calculations.
- Creating derived data from state.
- Expensive object transformations.

### ✅ Use useCallback when:
- Passing functions to memoized child components (`React.memo`).
- Functions used as dependencies in `useEffect`.
- Event handlers passed to many list items.

### ✅ Use React.memo when:
- Child component re-renders often with same props.
- Child component has expensive rendering logic.
- Parent re-renders frequently but child's props don't change.

### ❌ Don't over-use them:
- Simple calculations (memoization adds overhead).
- Components that always receive new props anyway.
- Functions only used within the same component (not passed down).
- Premature optimization — profile first, then optimize.

## Key Takeaways

- `React.memo` wraps a component to skip re-renders if props are unchanged (shallow comparison).
- `useMemo` caches expensive computed values — only recalculates when dependencies change.
- `useCallback` caches function references — prevents recreating functions every render.
- `useCallback` + `React.memo` work together: stable function ref means memo can skip re-render.
- All three use **dependency arrays** to know when to recalculate/re-render.
- Don't use them everywhere — they add complexity. Only optimize when you see performance issues.
- Profile with React DevTools before adding memoization.
