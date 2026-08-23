// ============================================================
// React Component Testing - Notes
// ============================================================

// ============================================================
// 1. WHAT IS COMPONENT TESTING?
// ============================================================

// Component testing is the process of testing individual React components
// in isolation to verify they render correctly and behave as expected.
//
// It sits between unit testing and E2E testing:
//   - Unit Test     → Tests a single function (pure logic)
//   - Component Test → Tests a single UI component (render + behavior)
//   - E2E Test      → Tests the full app from a user's perspective
//
// What we test in a component:
//   - Does it render without crashing?
//   - Does it display the correct content?
//   - Does it respond to user interactions (clicks, typing)?
//   - Does it update state correctly?
//   - Does it call the right functions on events?

// ============================================================
// 2. TOOLS REQUIRED FOR COMPONENT TESTING
// ============================================================

// For Vite + React projects:
//   npm install -D vitest jsdom @testing-library/react
//   npm install -D @testing-library/jest-dom @testing-library/user-event
//
// Tool Breakdown:
//   ┌──────────────────────────────┬──────────────────────────────────────┐
//   │ Package                      │ Purpose                              │
//   ├──────────────────────────────┼──────────────────────────────────────┤
//   │ vitest                       │ Test runner (alternative to Jest)     │
//   │ jsdom                        │ Simulates browser DOM in Node.js     │
//   │ @testing-library/react       │ Renders components & queries DOM     │
//   │ @testing-library/jest-dom    │ Custom DOM matchers (toBeInDocument) │
//   │ @testing-library/user-event  │ Simulates real user interactions     │
//   └──────────────────────────────┴──────────────────────────────────────┘

// ============================================================
// 3. CONFIGURATION (vite.config.js)
// ============================================================

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
//
// export default defineConfig({
//   plugins: [react()],
//   test: {
//     environment: "jsdom",    // Simulates a browser environment
//     globals: true,           // Makes test, expect, describe globally available
//   },
// });
//
// Why jsdom?
//   - React components need a DOM to render into.
//   - jsdom provides a virtual DOM without needing a real browser.
//   - Without it, render() will fail because document doesn't exist.

// ============================================================
// 4. WRITING YOUR FIRST COMPONENT TEST
// ============================================================

// Example Component (App.jsx):
// ─────────────────────────────
// import { useState } from "react";
//
// const App = () => {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1>Counter</h1>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <button onClick={() => setCount(count - 1)}>Decrement</button>
//     </div>
//   );
// };
// export default App;

// Test File (src/test/app.test.jsx):
// ───────────────────────────────────
// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import { test, expect } from "vitest";
// import App from "../App";
//
// test("renders counter heading", () => {
//   render(<App />);
//   expect(screen.getByText("Counter")).toBeInTheDocument();
// });

// ============================================================
// 5. CORE API - render()
// ============================================================

// import { render } from "@testing-library/react";
//
// render(<Component />);
//
// What it does:
//   - Takes a React element and renders it into a virtual DOM (jsdom).
//   - Returns utility functions to interact with the rendered output.
//   - Cleans up automatically after each test (with proper config).
//
// With Props:
//   render(<Greeting name="John" />);
//
// With Providers (Context, Redux, Router):
//   render(
//     <ThemeProvider theme={theme}>
//       <MyComponent />
//     </ThemeProvider>
//   );

// ============================================================
// 6. CORE API - screen OBJECT
// ============================================================

// import { screen } from "@testing-library/react";
//
// The `screen` object provides methods to query the rendered DOM.
// Always use screen over destructured queries from render() — it's cleaner.
//
// Query Priority (use in this order for accessibility):
//   1. getByRole       → Best for accessible elements (buttons, headings)
//   2. getByLabelText  → Best for form fields
//   3. getByText       → For non-interactive text content
//   4. getByPlaceholderText → For inputs with placeholders
//   5. getByDisplayValue    → For filled-in form elements
//   6. getByTestId     → Last resort (data-testid attribute)

// ============================================================
// 7. QUERY VARIANTS
// ============================================================

// Three prefixes with different behaviors:
//
// ┌───────────┬─────────────────────┬──────────────────────────────────┐
// │ Prefix    │ Returns             │ When to Use                      │
// ├───────────┼─────────────────────┼──────────────────────────────────┤
// │ getBy     │ Element or THROWS   │ Element MUST exist               │
// │ queryBy   │ Element or NULL     │ Element might NOT exist          │
// │ findBy    │ Promise (awaitable) │ Element appears ASYNCHRONOUSLY   │
// └───────────┴─────────────────────┴──────────────────────────────────┘
//
// Each also has an "All" variant for multiple elements:
//   - getAllByRole("listitem")   → Returns array of elements
//   - queryAllByText("hello")   → Returns array or empty array
//   - findAllByRole("button")   → Awaits and returns array
//
// Examples:
//   screen.getByText("Counter")           // Throws if not found
//   screen.queryByText("Not Here")        // Returns null if not found
//   await screen.findByText("Loaded!")    // Waits for element to appear

// ============================================================
// 8. TESTING USER INTERACTIONS
// ============================================================

// import userEvent from "@testing-library/user-event";
//
// test("increments counter on click", async () => {
//   const user = userEvent.setup();
//   render(<App />);
//
//   // Find the increment button
//   const incrementBtn = screen.getByText("Increment");
//
//   // Simulate a click
//   await user.click(incrementBtn);
//
//   // Assert the count updated
//   expect(screen.getByText("Count: 1")).toBeInTheDocument();
// });
//
// test("decrements counter on click", async () => {
//   const user = userEvent.setup();
//   render(<App />);
//
//   const decrementBtn = screen.getByText("Decrement");
//   await user.click(decrementBtn);
//
//   expect(screen.getByText("Count: -1")).toBeInTheDocument();
// });
//
// Common user-event methods:
//   - await user.click(element)         → Click an element
//   - await user.dblClick(element)      → Double click
//   - await user.type(input, "hello")   → Type into an input
//   - await user.clear(input)           → Clear an input
//   - await user.selectOptions(select, "value") → Select dropdown option
//   - await user.hover(element)         → Hover over element
//   - await user.unhover(element)       → Move mouse away
//   - await user.tab()                  → Press tab key
//   - await user.keyboard("{Enter}")    → Press specific key

// ============================================================
// 9. TESTING ASYNC COMPONENTS
// ============================================================

// When a component fetches data or updates state asynchronously:
//
// test("shows user data after loading", async () => {
//   render(<UserProfile />);
//
//   // Initially shows loading
//   expect(screen.getByText("Loading...")).toBeInTheDocument();
//
//   // Wait for data to appear
//   const userName = await screen.findByText("John Doe");
//   expect(userName).toBeInTheDocument();
//
//   // Loading should be gone
//   expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
// });
//
// findBy queries:
//   - Return a promise
//   - Wait up to 1000ms by default
//   - Perfect for testing loading states and async data

// ============================================================
// 10. CUSTOM jest-dom MATCHERS
// ============================================================

// Import at top of test file:
//   import "@testing-library/jest-dom";
//
// Available Matchers:
//   .toBeInTheDocument()           → Element exists in DOM
//   .toBeVisible()                 → Element is visible (not hidden)
//   .toBeDisabled()                → Element has disabled attribute
//   .toBeEnabled()                 → Element is not disabled
//   .toHaveTextContent("text")     → Element contains specific text
//   .toHaveValue("value")          → Input/select has specific value
//   .toHaveClass("className")      → Element has specific CSS class
//   .toHaveAttribute("attr", "val") → Element has specific attribute
//   .toBeChecked()                 → Checkbox/radio is checked
//   .toHaveFocus()                 → Element currently has focus
//   .toBeEmpty()                   → Element has no children
//   .toContainElement(element)     → Element contains another element
//   .toHaveStyle({ color: "red" }) → Element has inline style

// ============================================================
// 11. TEST FILE STRUCTURE & NAMING
// ============================================================

// Naming conventions (auto-detected by Vitest/Jest):
//   - ComponentName.test.jsx
//   - ComponentName.spec.jsx
//   - Files inside __tests__/ folder
//
// Recommended folder structures:
//
// Option A - Co-located (test next to component):
//   src/
//   ├── components/
//   │   ├── Counter.jsx
//   │   └── Counter.test.jsx
//
// Option B - Separate test folder:
//   src/
//   ├── components/
//   │   └── Counter.jsx
//   └── test/
//       └── Counter.test.jsx

// ============================================================
// 12. COMMON PATTERNS
// ============================================================

// Pattern: Testing a list renders correct items
// test("renders list of users", () => {
//   const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
//   render(<UserList users={users} />);
//   expect(screen.getByText("Alice")).toBeInTheDocument();
//   expect(screen.getByText("Bob")).toBeInTheDocument();
// });

// Pattern: Testing conditional rendering
// test("shows error message when error exists", () => {
//   render(<Alert message="Something went wrong" />);
//   expect(screen.getByText("Something went wrong")).toBeInTheDocument();
// });

// Pattern: Testing form submission
// test("submits form with input value", async () => {
//   const user = userEvent.setup();
//   const mockSubmit = vi.fn();
//   render(<LoginForm onSubmit={mockSubmit} />);
//
//   await user.type(screen.getByLabelText("Email"), "test@example.com");
//   await user.click(screen.getByRole("button", { name: "Submit" }));
//
//   expect(mockSubmit).toHaveBeenCalledWith("test@example.com");
// });

// ============================================================
// 13. MOCKING IN COMPONENT TESTS
// ============================================================

// Mocking functions with vi.fn() (Vitest):
//   const mockFn = vi.fn();
//   mockFn();
//   expect(mockFn).toHaveBeenCalled();
//   expect(mockFn).toHaveBeenCalledTimes(1);
//
// Mocking modules:
//   vi.mock("./api", () => ({
//     fetchUsers: vi.fn(() => Promise.resolve([{ id: 1, name: "Alice" }]))
//   }));
//
// Mocking a child component:
//   vi.mock("./HeavyChart", () => ({
//     default: () => <div data-testid="mock-chart">Chart</div>
//   }));

// ============================================================
// 14. SUMMARY
// ============================================================

// Component Testing Checklist:
//   ✓ Install: vitest, jsdom, @testing-library/react, jest-dom, user-event
//   ✓ Configure: vite.config.js with test.environment = "jsdom"
//   ✓ Render: Use render(<Component />) to mount
//   ✓ Query: Use screen.getByText/Role/Label to find elements
//   ✓ Assert: Use expect + jest-dom matchers to verify
//   ✓ Interact: Use userEvent for clicks, typing, etc.
//   ✓ Async: Use findBy queries or waitFor for async updates
//   ✓ Mock: Use vi.fn() for functions, vi.mock() for modules
