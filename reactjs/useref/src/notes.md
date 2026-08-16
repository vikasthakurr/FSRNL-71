# useRef Hook in React

## What is useRef?

- `useRef` is a React hook that creates a **mutable reference** that persists across renders.
- Unlike state, changing a ref does **NOT trigger a re-render**.
- It returns an object with a `.current` property that you can read and write.
- Two main use cases:
  1. **Accessing DOM elements** directly (like `document.querySelector` in vanilla JS).
  2. **Storing mutable values** that persist across renders without causing re-renders.

## useRef Syntax

```jsx
import { useRef } from "react";

const ref = useRef(initialValue);

// Access or modify:
ref.current; // Read the value
ref.current = newValue; // Update (no re-render!)
```

| Part | Purpose |
|------|---------|
| `useRef(initialValue)` | Creates a ref object `{ current: initialValue }` |
| `ref.current` | The mutable value stored in the ref |
| No re-render | Changing `.current` does NOT trigger a re-render |

## Use Case 1: Accessing DOM Elements

### Basic DOM Reference

```jsx
import { useRef, useEffect } from "react";

const App = () => {
  const inputRef = useRef();

  useEffect(() => {
    // Auto-focus the input when component mounts
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" placeholder="I'm auto-focused!" />;
};
```

- Attach the ref to a JSX element using the `ref` attribute.
- After render, `ref.current` points to the actual DOM node.
- You can call any DOM API on it (`.focus()`, `.scrollIntoView()`, etc.).

### Styling DOM Elements (from your code)

```jsx
import { useRef, useEffect } from "react";

const App = () => {
  const ref1 = useRef();

  useEffect(() => {
    ref1.current.style.backgroundColor = "red";
  });

  return (
    <div>
      <h1 ref={ref1}>Hello World</h1>
    </div>
  );
};
```

- `ref1.current` gives direct access to the `<h1>` DOM element.
- You can modify styles, attributes, or call DOM methods.

### Multiple DOM References

```jsx
const App = () => {
  const headingRef = useRef();
  const buttonRef = useRef();
  const inputRef = useRef();

  const handleClick = () => {
    headingRef.current.style.color = "blue";
    inputRef.current.value = ""; // Clear input directly
    inputRef.current.focus();    // Focus the input
  };

  return (
    <div>
      <h1 ref={headingRef}>Title</h1>
      <input ref={inputRef} type="text" />
      <button ref={buttonRef} onClick={handleClick}>Reset</button>
    </div>
  );
};
```

## Use Case 2: Storing Mutable Values (No Re-render)

### Counter without Re-render (from your code)

```jsx
import { useRef, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);  // Triggers re-render
  const ref = useRef(0);                   // Does NOT trigger re-render

  const handleClick = () => {
    setCount(count + 1);      // UI updates (re-render)
    ref.current = ref.current + 1;  // Value updates (NO re-render)
    console.log(ref.current);  // Always shows the latest value
  };

  return (
    <div>
      <h1>State count: {count}</h1>
      {/* ref.current value exists but UI won't show updates */}
      <button onClick={handleClick}>Change</button>
    </div>
  );
};
```

### Why Use Ref Instead of State for Some Values?

| Need | Use State | Use Ref |
|------|-----------|---------|
| Value should update UI when changed | ✅ | ❌ |
| Value needs to persist across renders | ✅ | ✅ |
| Updating should NOT cause re-render | ❌ | ✅ |
| Need to track previous values | ❌ | ✅ |
| Need to store timer/interval IDs | ❌ | ✅ |
| Need to count renders | ❌ | ✅ |

## Practical Examples

### Track Render Count

```jsx
const App = () => {
  const [name, setName] = useState("");
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>This component rendered {renderCount.current} times</p>
    </div>
  );
};
```

- If we used `useState` for render count, updating it would cause another render → infinite loop!
- `useRef` updates the count without triggering additional renders.

### Store Previous State Value

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count; // Save current value after render
  }, [count]);

  return (
    <div>
      <h1>Current: {count}</h1>
      <h1>Previous: {prevCountRef.current}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
```

### Store Timer/Interval IDs

```jsx
const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h1>{seconds}s</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

### Scroll to Element

```jsx
const App = () => {
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <button onClick={scrollToBottom}>Scroll to Bottom</button>
      {/* Long content here... */}
      <div style={{ height: "2000px" }}>Lots of content...</div>
      <div ref={bottomRef}>Bottom of page</div>
    </div>
  );
};
```

### Uncontrolled Input (Form without State)

```jsx
const Form = () => {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Read values directly from DOM — no state needed!
    console.log("Name:", nameRef.current.value);
    console.log("Email:", emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Video Player Control

```jsx
const VideoPlayer = () => {
  const videoRef = useRef();

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" width="400" />
      <button onClick={() => videoRef.current.play()}>Play</button>
      <button onClick={() => videoRef.current.pause()}>Pause</button>
      <button onClick={() => (videoRef.current.currentTime = 0)}>Restart</button>
    </div>
  );
};
```

## useRef vs useState vs Regular Variables

| Feature | useState | useRef | let/const variable |
|---------|----------|--------|-------------------|
| Persists across renders | ✅ | ✅ | ❌ (reset every render) |
| Triggers re-render on change | ✅ | ❌ | ❌ |
| Accessible in next render | ✅ | ✅ | ❌ |
| Can hold DOM reference | ❌ | ✅ | ❌ |
| Synchronous update | ❌ (batched) | ✅ (immediate) | ✅ |

## Important Rules

1. **Don't read/write `ref.current` during rendering** (except initialization):
```jsx
// ❌ BAD: Reading ref during render can cause inconsistencies
return <h1>{ref.current}</h1>; // Value might be stale

// ✅ OK: Read in event handlers or effects
const handleClick = () => console.log(ref.current);
useEffect(() => { ref.current.focus(); }, []);
```

2. **Ref updates are synchronous** (unlike state):
```jsx
ref.current = 5;
console.log(ref.current); // 5 — immediately available!

// vs state:
setCount(5);
console.log(count); // Still old value! (async/batched)
```

3. **Don't overuse refs for DOM manipulation** — prefer React's declarative approach:
```jsx
// ❌ Imperative (using ref to set style)
ref.current.style.display = "none";

// ✅ Declarative (using state + conditional rendering)
{isVisible && <div>Content</div>}
```

## Key Takeaways

- `useRef` creates a persistent mutable container (`{ current: value }`).
- Changing `ref.current` does NOT cause a re-render (unlike `useState`).
- Two primary uses: DOM access and storing mutable values across renders.
- Attach to JSX with `ref={myRef}` to get direct DOM element access.
- Great for: timer IDs, previous values, render counts, DOM manipulation.
- Updates are **synchronous** — the new value is available immediately.
- Don't use refs to replace state for things that should trigger UI updates.
- Prefer declarative React patterns over imperative DOM manipulation when possible.
