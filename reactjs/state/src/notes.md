# State Management with useState Hook

## What is State?

- State is **data that changes over time** within a component.
- When state changes, React **re-renders** the component to reflect the new data.
- State is internal/private to the component that owns it.
- Unlike props (which come from parent), state is managed by the component itself.

## Why Do We Need State?

```jsx
// ❌ This does NOT work (UI won't update)
const App = () => {
  let count = 0;

  function handleClick() {
    count = count + 1;         // Variable changes...
    console.log(count);        // Logs updated value...
    // But UI still shows 0!   // React doesn't know to re-render!
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};
```

- Regular variables don't trigger re-renders.
- React needs `useState` to know when data changes and UI needs updating.

## useState Hook

```jsx
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  //      ↑        ↑              ↑
  //   current  setter fn    initial value
  //   value

  function handleClick() {
    setCount(count + 1); // Updates state AND triggers re-render
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};
```

## useState Syntax Breakdown

```jsx
const [stateVariable, setterFunction] = useState(initialValue);
```

| Part | Purpose |
|------|---------|
| `stateVariable` | Current value of the state |
| `setterFunction` | Function to update the state |
| `initialValue` | Starting value (only used on first render) |

- Uses **array destructuring** from what `useState` returns.
- Convention: `[something, setSomething]`.

## How Re-rendering Works

1. Component renders for the first time → `count = 0`.
2. User clicks button → `setCount(1)` is called.
3. React schedules a re-render.
4. Component function runs again → `count = 1` now.
5. React updates only the changed parts of the DOM (diffing).

## Multiple State Variables

```jsx
const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Status: {isLoggedIn ? "Logged In" : "Logged Out"}</p>
    </div>
  );
};
```

## State with Different Data Types

### String State

```jsx
const [name, setName] = useState("");

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Boolean State (Toggle)

```jsx
const [isVisible, setIsVisible] = useState(false);

<button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
{isVisible && <p>Now you see me!</p>}
```

### Array State

```jsx
const [items, setItems] = useState(["Apple", "Banana"]);

// Add item (create new array, don't mutate)
const addItem = () => {
  setItems([...items, "Cherry"]);  // ✅ Spread + new item
};

// Remove item
const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};
```

### Object State

```jsx
const [user, setUser] = useState({ name: "", age: 0 });

// Update one property (spread the rest)
const updateName = (newName) => {
  setUser({ ...user, name: newName });  // ✅ Spread + override
};

// ❌ WRONG: Don't mutate directly
// user.name = "Vikas";  // Won't trigger re-render
```

## Updater Function (Functional Updates)

When the new state depends on the previous state, use the updater form:

```jsx
// ❌ May not work correctly with rapid updates
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// Result: count increases by 1, not 3! (stale closure)

// ✅ Use updater function for reliable updates
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
// Result: count increases by 3! ✅
```

- The updater function `(prevState) => newState` always gets the latest state.

## State is Asynchronous

```jsx
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // ⚠️ Still shows OLD value!
  // State update hasn't happened yet (batched for performance)
};
```

- React **batches** state updates for performance.
- The new value is available on the **next render**, not immediately.

## Rules of Hooks

1. **Only call hooks at the top level** — not inside loops, conditions, or nested functions.
2. **Only call hooks in React function components** or custom hooks.

```jsx
// ❌ WRONG
if (condition) {
  const [value, setValue] = useState(0); // Hooks can't be conditional
}

// ❌ WRONG
for (let i = 0; i < 5; i++) {
  const [item, setItem] = useState(""); // Hooks can't be in loops
}

// ✅ CORRECT
const [value, setValue] = useState(0); // Always at the top level
```

## Practical Examples

### Counter

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};
```

### Toggle Theme

```jsx
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ background: isDark ? "#333" : "#fff", color: isDark ? "#fff" : "#333" }}>
      <p>Current Theme: {isDark ? "Dark" : "Light"}</p>
      <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
    </div>
  );
};
```

### Todo List

```jsx
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Key Takeaways

- State = data that changes and needs to be reflected in UI.
- `useState` returns `[value, setter]` — use array destructuring.
- Calling the setter triggers a re-render.
- Never mutate state directly — always create new values.
- Use the updater function `(prev) => newValue` when new state depends on old state.
- State updates are batched and asynchronous.
- Follow the Rules of Hooks (top-level only, React components only).
- Use spread operator for arrays (`[...arr, newItem]`) and objects (`{ ...obj, key: val }`).
