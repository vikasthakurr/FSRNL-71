# Lifting State Up in React

## What is Lifting State Up?

- "Lifting state up" means moving state from a child component to a common parent.
- This is done when **multiple components need to share the same data**.
- The parent holds the state and passes it down via props.
- Children communicate back to the parent using **callback functions** (passed as props).

## The Problem: Sibling Components Can't Share State

```jsx
// ❌ ComponentA and ComponentB can't talk to each other directly
const ComponentA = () => {
  const [data, setData] = useState("hello");
  return <p>{data}</p>;
};

const ComponentB = () => {
  // How do I access ComponentA's data? I can't!
  return <p>I need ComponentA's data...</p>;
};
```

- State is private to the component that owns it.
- Siblings have no way to access each other's state.

## The Solution: Lift State to the Parent

```
        ┌─────────────────┐
        │     Parent       │  ← State lives here
        │  [name, setName] │
        └────────┬─────────┘
                 │
        ┌────────┴─────────┐
        │                  │
   ┌────▼────┐       ┌────▼────┐
   │  Child  │       │ Display │
   │ (input) │       │ (shows) │
   └─────────┘       └─────────┘
```

- Parent owns the state.
- Child receives `setName` as a prop to update it.
- Display receives `name` as a prop to show it.

## How It Works (From Your Code)

### Parent (App.jsx)

```jsx
import { useState } from "react";
import Child from "./Child";

const App = () => {
  const [name, setName] = useState("");  // State lives in parent

  return (
    <div>
      <Child setName={setName} name={name} />  {/* Pass setter to child */}
      <h1>The value coming from child: {name}</h1>  {/* Display state */}
    </div>
  );
};
```

### Child (Child.jsx)

```jsx
const Child = (props) => {
  function handleChange(e) {
    props.setName(e.target.value);  // Calls parent's setter
  }

  return (
    <div>
      <input type="text" placeholder="enter username" onChange={handleChange} />
    </div>
  );
};

export default Child;
```

### Flow:
1. User types in the input (Child component).
2. `handleChange` fires → calls `props.setName(e.target.value)`.
3. Parent's `setName` updates the `name` state.
4. Parent re-renders → new `name` value is displayed in `<h1>`.

## Inverse Data Flow (Child → Parent)

- Normal flow: Parent → Child (via props).
- Inverse flow: Child → Parent (via callback props).

```jsx
// Parent passes a function as a prop
<Child onNameChange={setName} />

// Child calls that function with new data
props.onNameChange("new value"); // Updates parent's state
```

This pattern is called **"callback props"** or **"inverse data flow"**.

## Multiple Children Sharing State

```jsx
const App = () => {
  const [temperature, setTemperature] = useState(0);

  return (
    <div>
      <TemperatureInput
        value={temperature}
        onChange={setTemperature}
        label="Celsius"
      />
      <TemperatureDisplay temp={temperature} unit="C" />
      <TemperatureDisplay temp={(temperature * 9) / 5 + 32} unit="F" />
    </div>
  );
};
```

- One input updates the state.
- Multiple display components read from the same state.
- All stay in sync because they share the same source of truth.

## Practical Example: Shared Counter

```jsx
// Parent
const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <IncrementButton onIncrement={() => setCount((prev) => prev + 1)} />
      <DecrementButton onDecrement={() => setCount((prev) => prev - 1)} />
      <Display count={count} />
    </div>
  );
};

// Child 1: Increment
const IncrementButton = ({ onIncrement }) => {
  return <button onClick={onIncrement}>+1</button>;
};

// Child 2: Decrement
const DecrementButton = ({ onDecrement }) => {
  return <button onClick={onDecrement}>-1</button>;
};

// Child 3: Display
const Display = ({ count }) => {
  return <h1>Count: {count}</h1>;
};
```

## When to Lift State Up

- Two or more components need to reflect the same changing data.
- A child component needs to update a sibling's display.
- You need a "single source of truth" for shared data.

## When NOT to Lift State Up

- State is only used in one component → keep it local.
- Too many levels of prop passing → consider Context API or state management library.

## Common Patterns

### Pattern 1: Controlled Input

```jsx
// Parent controls the input value
const Parent = () => {
  const [value, setValue] = useState("");
  return <Input value={value} onChange={setValue} />;
};

const Input = ({ value, onChange }) => {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
};
```

### Pattern 2: Form with Multiple Fields

```jsx
const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div>
      <FormInput label="Name" value={formData.name}
        onChange={(val) => handleChange("name", val)} />
      <FormInput label="Email" value={formData.email}
        onChange={(val) => handleChange("email", val)} />
      <p>Name: {formData.name}, Email: {formData.email}</p>
    </div>
  );
};
```

## Prop Drilling Problem

When state needs to travel through many levels:

```
App (state) → Layout → Sidebar → Menu → MenuItem (needs state)
```

- Every intermediate component must pass the prop even if it doesn't use it.
- This is called **prop drilling** and makes code messy.
- Solutions for deep trees:
  - **Context API** (built into React)
  - **Redux / Zustand / Jotai** (external state libraries)

## Key Takeaways

- Lift state to the **lowest common parent** of components that share it.
- Pass state **down** as props and setter functions **down** as callbacks.
- Child updates parent via `props.setterFunction(newValue)`.
- This creates a **single source of truth** for shared data.
- All components reading the same state stay in sync automatically.
- If prop drilling gets too deep, consider Context API or state management tools.
- Keep state as local as possible — only lift when sharing is needed.
