# Props (Properties) in React

## What are Props?

- Props are **inputs** passed from a parent component to a child component.
- They are like function arguments — the parent decides what data to send.
- Props are **read-only** (immutable) — a child cannot modify its own props.
- Props flow **one-way**: parent → child (unidirectional data flow).

## Basic Props Example

```jsx
// Parent (App.jsx)
import Asfar from "./Asfar";

const App = () => {
  return (
    <div>
      <Asfar fullname="Asfar" age="24" />
      <Asfar fullname="Vikas" age="26" />
    </div>
  );
};
```

```jsx
// Child (Asfar.jsx)
const Asfar = (props) => {
  return (
    <div>
      <h1>Name: {props.fullname}</h1>
      <p>Age: {props.age}</p>
    </div>
  );
};

export default Asfar;
```

## Destructuring Props (Recommended)

Instead of using `props.name`, `props.age`, destructure directly:

```jsx
// ✅ Cleaner syntax
const Asfar = ({ fullname, age }) => {
  return (
    <div>
      <h1>Name: {fullname}</h1>
      <p>Age: {age}</p>
    </div>
  );
};
```

## Props are Read-Only

```jsx
const Child = ({ name }) => {
  // ❌ This will throw an error or be ignored
  // name = "New Name";

  return <h1>{name}</h1>;
};
```

- If you need to change data, use **state** (covered in state folder).

## Different Data Types as Props

```jsx
// Parent
<UserCard
  name="Vikas"           // string
  age={26}               // number
  isAdmin={true}         // boolean
  hobbies={["coding", "gaming"]}  // array
  address={{ city: "Delhi", pin: "110001" }}  // object
  onClick={handleClick}  // function
/>
```

```jsx
// Child
const UserCard = ({ name, age, isAdmin, hobbies, address, onClick }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Admin: {isAdmin ? "Yes" : "No"}</p>
      <p>Hobbies: {hobbies.join(", ")}</p>
      <p>City: {address.city}</p>
      <button onClick={onClick}>Click</button>
    </div>
  );
};
```

## Default Props

If a prop is not passed, you can set a default value:

```jsx
// Method 1: Default parameters (recommended)
const Greeting = ({ name = "Guest", greeting = "Hello" }) => {
  return <h1>{greeting}, {name}!</h1>;
};

// Usage
<Greeting />                    // "Hello, Guest!"
<Greeting name="Vikas" />       // "Hello, Vikas!"
<Greeting greeting="Hey" />     // "Hey, Guest!"
```

```jsx
// Method 2: defaultProps (older approach)
const Greeting = ({ name, greeting }) => {
  return <h1>{greeting}, {name}!</h1>;
};

Greeting.defaultProps = {
  name: "Guest",
  greeting: "Hello",
};
```

## Children Props

- Special prop for content placed **between** opening and closing tags.

```jsx
// Parent
<Card>
  <h1>This is inside the card!</h1>
  <p>Any content can go here.</p>
</Card>
```

```jsx
// Child (Card.jsx)
const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};
```

- `children` can be text, elements, or even other components.

## Spreading Props

When you have an object with all the props:

```jsx
const userData = { name: "Vikas", age: 26, city: "Delhi" };

// Instead of:
<Profile name={userData.name} age={userData.age} city={userData.city} />

// Use spread:
<Profile {...userData} />
```

## Conditional Rendering with Props

```jsx
const Alert = ({ type, message }) => {
  if (!message) return null; // Don't render if no message

  const color = type === "error" ? "red" : "green";

  return <p style={{ color }}>{message}</p>;
};

// Usage
<Alert type="error" message="Something went wrong!" />
<Alert type="success" message="Saved successfully!" />
<Alert />  {/* Renders nothing */}
```

## Rendering Lists with Props

```jsx
// Parent
const App = () => {
  const users = [
    { id: 1, name: "Vikas", age: 26 },
    { id: 2, name: "Asfar", age: 24 },
    { id: 3, name: "Rahul", age: 25 },
  ];

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} age={user.age} />
      ))}
    </div>
  );
};
```

- Always provide a unique `key` prop when rendering lists.

## Props vs State

| Feature | Props | State |
|---------|-------|-------|
| Owned by | Parent | Component itself |
| Mutable? | ❌ Read-only | ✅ Can be updated |
| Passed from | Parent → Child | Internal |
| Triggers re-render? | Yes (when parent changes) | Yes (when updated) |
| Purpose | Configure a child | Track changing data |

## Prop Drilling Problem

When you pass props through many intermediate components:

```
App → Layout → Sidebar → Menu → MenuItem (prop passed through all)
```

- This is called **prop drilling** and can make code hard to maintain.
- Solutions: Context API, Redux, Zustand (covered in later topics).

## Key Takeaways

- Props = data passed from parent to child.
- Props are read-only — never modify them in the child.
- Destructure props for cleaner code: `({ name, age })`.
- Any data type can be a prop: strings, numbers, booleans, arrays, objects, functions.
- Use default values for optional props.
- `children` is a special prop for nested content.
- Use spread (`{...obj}`) to pass all properties at once.
- Always use `key` when rendering lists of components.
- Props flow one-way: parent → child (unidirectional).
