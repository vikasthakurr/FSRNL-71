# Event Handling in React

## What are Events?

- Events are actions that happen in the browser (click, type, hover, submit, etc.).
- React uses **Synthetic Events** — a cross-browser wrapper around native DOM events.
- Synthetic events have the same interface as native events but work consistently across all browsers.

## React Events vs DOM Events

| Feature | Vanilla JS (DOM) | React |
|---------|-----------------|-------|
| Syntax | `addEventListener("click", fn)` | `onClick={fn}` |
| Naming | lowercase (`onclick`) | camelCase (`onClick`) |
| Handler | String or function | Always a function/reference |
| Event object | Native Event | SyntheticEvent (wrapper) |
| Prevent default | `event.preventDefault()` | `event.preventDefault()` |
| Remove listener | `removeEventListener()` | Automatic (on unmount) |

## Basic Click Event

```jsx
const App = () => {
  const handleClick = () => {
    console.log("Button was clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

### ⚠️ Common Mistake

```jsx
// ❌ WRONG: This calls the function immediately on render
<button onClick={handleClick()}>Click</button>

// ✅ CORRECT: Pass the function reference
<button onClick={handleClick}>Click</button>
```

## Passing Arguments to Event Handlers

```jsx
const App = () => {
  const handleGreet = (name) => {
    console.log(`Hello, ${name}!`);
  };

  return (
    <>
      {/* Use arrow function to pass arguments */}
      <button onClick={() => handleGreet("Vikas")}>Greet Vikas</button>
      <button onClick={() => handleGreet("Asfar")}>Greet Asfar</button>
    </>
  );
};
```

## Accessing the Event Object

```jsx
const App = () => {
  const handleClick = (event) => {
    console.log("Event type:", event.type);         // "click"
    console.log("Target:", event.target);           // <button> element
    console.log("Current Target:", event.currentTarget);
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

## Common React Events

### Mouse Events

| Event | Triggers When |
|-------|--------------|
| `onClick` | Element is clicked |
| `onDoubleClick` | Element is double-clicked |
| `onMouseEnter` | Mouse enters the element |
| `onMouseLeave` | Mouse leaves the element |
| `onMouseMove` | Mouse moves over the element |
| `onMouseDown` | Mouse button is pressed |
| `onMouseUp` | Mouse button is released |

### Keyboard Events

| Event | Triggers When |
|-------|--------------|
| `onKeyDown` | A key is pressed down |
| `onKeyUp` | A key is released |
| `onKeyPress` | A key is pressed (deprecated) |

```jsx
const App = () => {
  const handleKeyDown = (e) => {
    console.log("Key:", e.key);
    if (e.key === "Enter") {
      console.log("Enter pressed!");
    }
  };

  return <input type="text" onKeyDown={handleKeyDown} />;
};
```

### Form Events

| Event | Triggers When |
|-------|--------------|
| `onChange` | Input value changes |
| `onSubmit` | Form is submitted |
| `onFocus` | Input gains focus |
| `onBlur` | Input loses focus |

```jsx
const App = () => {
  const handleChange = (e) => {
    console.log("Value:", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## event.preventDefault()

- Stops the browser's default behavior.
- Common use: prevent form submission from reloading the page.

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // ← Stops page reload
  // Handle form data here
};
```

## event.stopPropagation()

- Stops the event from bubbling up to parent elements.

```jsx
const App = () => {
  return (
    <div onClick={() => console.log("Parent clicked")}>
      <button onClick={(e) => {
        e.stopPropagation(); // Won't trigger parent's onClick
        console.log("Button clicked");
      }}>
        Click Me
      </button>
    </div>
  );
};
```

## Event Handling Patterns

### Inline Handler (simple cases)

```jsx
<button onClick={() => console.log("clicked")}>Click</button>
```

### Separate Handler Function (recommended)

```jsx
const handleClick = () => {
  // logic here
};
<button onClick={handleClick}>Click</button>
```

### Handler with Parameters

```jsx
const handleDelete = (id) => {
  console.log("Deleting item:", id);
};
<button onClick={() => handleDelete(5)}>Delete</button>
```

## Synthetic Events Key Points

1. React pools events for performance (reuses event objects).
2. Event properties become `null` after the handler completes.
3. If you need to access the event asynchronously, call `event.persist()` (React 16) or store the value in a variable.

```jsx
const handleClick = (e) => {
  const buttonText = e.target.textContent; // ✅ Store value immediately
  setTimeout(() => {
    console.log(buttonText); // ✅ Use stored value
  }, 1000);
};
```

## Key Takeaways

- Use camelCase for event names: `onClick`, `onChange`, `onSubmit`.
- Pass function references, don't call them: `onClick={fn}` not `onClick={fn()}`.
- Use arrow functions to pass arguments: `onClick={() => fn(arg)}`.
- `e.preventDefault()` stops default browser behavior.
- `e.stopPropagation()` stops event bubbling.
- React handles cleanup automatically when components unmount.
- The event object (`e`) is a SyntheticEvent wrapper around native events.
