// ============================================
// DOM MANIPULATION WITH TYPESCRIPT
// ============================================

// TypeScript provides type-safe DOM manipulation using built-in DOM types.
// These types come from the "lib": ["dom"] setting in tsconfig.json.

// ============================================
// Selecting Elements
// ============================================

// getElementById - returns HTMLElement | null
const heading = document.getElementById("main-heading");

// querySelector - returns Element | null
const button = document.querySelector(".btn");

// querySelectorAll - returns NodeListOf<Element>
const listItems = document.querySelectorAll("li");

// ============================================
// Type Assertions for DOM Elements
// ============================================

// TypeScript doesn't know the specific element type from querySelector.
// Use type assertions to tell TypeScript the exact type.

const inputEl = document.querySelector("#username") as HTMLInputElement;
console.log(inputEl.value); // ✅ Now TypeScript knows .value exists

const anchorEl = document.querySelector("a") as HTMLAnchorElement;
console.log(anchorEl.href); // ✅ TypeScript knows .href exists

const imgEl = document.querySelector("img") as HTMLImageElement;
console.log(imgEl.src); // ✅ TypeScript knows .src exists

// Alternative syntax (non-JSX):
const canvasEl = <HTMLCanvasElement>document.querySelector("canvas");

// ============================================
// Null Checks (Handling null returns)
// ============================================

// DOM methods return null if element is not found.
// Always handle the null case.

// Option 1: if check
const title = document.getElementById("title");
if (title) {
  title.textContent = "Updated Title";
}

// Option 2: Optional chaining
const subtitle = document.querySelector(".subtitle");
subtitle?.classList.add("active");

// Option 3: Non-null assertion (use when you're sure it exists)
const nav = document.querySelector("nav")!;
nav.classList.add("visible"); // ✅ No null error (but risky if element doesn't exist)

// ============================================
// Common HTMLElement Types
// ============================================

// HTMLElement         - generic element
// HTMLInputElement    - <input>
// HTMLButtonElement   - <button>
// HTMLAnchorElement   - <a>
// HTMLImageElement    - <img>
// HTMLDivElement      - <div>
// HTMLSpanElement     - <span>
// HTMLFormElement     - <form>
// HTMLSelectElement   - <select>
// HTMLTextAreaElement - <textarea>
// HTMLCanvasElement   - <canvas>
// HTMLVideoElement    - <video>
// HTMLAudioElement    - <audio>
// HTMLTableElement    - <table>
// HTMLUListElement    - <ul>
// HTMLOListElement    - <ol>
// HTMLLIElement       - <li>
// HTMLParagraphElement - <p>
// HTMLHeadingElement  - <h1> to <h6>

// ============================================
// Modifying Elements
// ============================================

const box = document.querySelector(".box") as HTMLDivElement;

// Change text content
box.textContent = "Hello from TypeScript!";

// Change inner HTML
box.innerHTML = "<strong>Bold text</strong>";

// Change styles
box.style.backgroundColor = "blue";
box.style.color = "white";
box.style.padding = "20px";

// Change attributes
box.setAttribute("data-id", "123");
box.id = "main-box";

// Add/remove classes
box.classList.add("active", "highlight");
box.classList.remove("hidden");
box.classList.toggle("visible");

// ============================================
// Creating and Appending Elements
// ============================================

// Create a new element
const newDiv = document.createElement("div");
newDiv.textContent = "I am a new div!";
newDiv.className = "card";
newDiv.id = "card-1";

// Append to the DOM
const container = document.querySelector(".container") as HTMLDivElement;
container.appendChild(newDiv);

// Create and append multiple elements
const ul = document.createElement("ul");
const fruits: string[] = ["Apple", "Banana", "Cherry"];

fruits.forEach((fruit) => {
  const li = document.createElement("li");
  li.textContent = fruit;
  ul.appendChild(li);
});

document.body.appendChild(ul);

// ============================================
// Removing Elements
// ============================================

const removeMe = document.querySelector(".remove-me");
removeMe?.remove(); // Modern way

// Alternative: remove child from parent
// const parent = document.querySelector(".parent") as HTMLElement;
// const child = document.querySelector(".child") as HTMLElement;
// if (parent && child) {
//   parent.removeChild(child);
// }

// ============================================
// Event Handling
// ============================================

// addEventListener with typed events

const btn = document.querySelector("#submit-btn") as HTMLButtonElement;

// Click event
btn.addEventListener("click", (event: MouseEvent) => {
  console.log("Button clicked!");
  console.log("X position:", event.clientX);
  console.log("Y position:", event.clientY);
});

// Input event
const searchInput = document.querySelector("#search") as HTMLInputElement;

searchInput.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log("Typed:", target.value);
});

// Keyboard event
document.addEventListener("keydown", (event: KeyboardEvent) => {
  console.log("Key pressed:", event.key);
  console.log("Key code:", event.code);

  if (event.key === "Enter") {
    console.log("Enter was pressed!");
  }
});

// Form submit event
const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault(); // Prevent page reload

  const formData = new FormData(form);
  const username = formData.get("username") as string;
  console.log("Submitted:", username);
});

// ============================================
// Common Event Types
// ============================================

// MouseEvent     - click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave
// KeyboardEvent  - keydown, keyup, keypress
// Event          - input, change, focus, blur, scroll, resize
// SubmitEvent    - submit
// DragEvent      - drag, dragstart, dragend, drop
// FocusEvent     - focus, blur, focusin, focusout
// WheelEvent     - wheel
// TouchEvent     - touchstart, touchend, touchmove
// ClipboardEvent - copy, cut, paste

// ============================================
// Event Delegation
// ============================================

// Instead of adding events to each child, add one to the parent.

const todoList = document.querySelector("#todo-list") as HTMLUListElement;

todoList.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (target.tagName === "LI") {
    target.classList.toggle("completed");
  }

  if (target.classList.contains("delete-btn")) {
    target.parentElement?.remove();
  }
});

// ============================================
// Working with Forms
// ============================================

const loginForm = document.querySelector("#login-form") as HTMLFormElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;

interface LoginData {
  email: string;
  password: string;
}

loginForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const loginData: LoginData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  if (!loginData.email || !loginData.password) {
    console.error("All fields are required");
    return;
  }

  console.log("Login attempt:", loginData.email);
});

// ============================================
// Working with Local Storage (Type-Safe)
// ============================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Save to localStorage
function saveTodos(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load from localStorage
function loadTodos(): Todo[] {
  const data = localStorage.getItem("todos");
  if (data) {
    return JSON.parse(data) as Todo[];
  }
  return [];
}

// Usage
const todos: Todo[] = loadTodos();
todos.push({ id: Date.now(), text: "Learn TypeScript", completed: false });
saveTodos(todos);

// ============================================
// Fetch API with TypeScript
// ============================================

interface ApiUser {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const users: ApiUser[] = await response.json();
  return users;
}

// Render users to DOM
async function renderUsers(): Promise<void> {
  try {
    const users = await fetchUsers();
    const userList = document.querySelector("#user-list") as HTMLUListElement;

    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.email})`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

// ============================================
// DOM Utility Functions (Type-Safe)
// ============================================

// Type-safe element selector
function $(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

function $$<T extends Element = Element>(selector: string): NodeListOf<T> {
  return document.querySelectorAll<T>(selector);
}

// Create element with attributes
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: Partial<HTMLElementTagNameMap[K]>,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (attributes) {
    Object.assign(element, attributes);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

// Usage:
const newButton = createElement("button", { className: "btn", id: "my-btn" }, "Click Me");
document.body.appendChild(newButton);

// ============================================
// Summary
// ============================================

// - Use type assertions (as HTMLInputElement) for specific element types.
// - Always handle null when selecting DOM elements.
// - Common types: HTMLInputElement, HTMLButtonElement, HTMLFormElement, etc.
// - Event handlers receive typed events: MouseEvent, KeyboardEvent, etc.
// - Use event.target with type assertion to access element properties.
// - event.preventDefault() stops default browser behavior.
// - Event delegation adds one listener to a parent instead of many to children.
// - localStorage with JSON.parse/stringify for type-safe storage.
// - Fetch API with interfaces for typed API responses.
// - Utility functions can be generically typed for reusable DOM helpers.
