// ============================================================
// Jest - Complete Notes
// ============================================================

// ============================================================
// 1. WHAT IS JEST?
// ============================================================

// Jest is a JavaScript testing framework developed by Facebook (Meta).
// It is the most widely used testing framework for JavaScript and React.
//
// Key Features:
//   - Zero configuration for most projects
//   - Built-in assertion library (expect)
//   - Built-in mocking (jest.fn, jest.mock)
//   - Code coverage reports
//   - Snapshot testing
//   - Parallel test execution
//   - Watch mode for development
//
// Installation:
//   npm install -D jest
//
// For ES Modules (type: "module"):
//   npm install -D jest @jest/globals
//   OR use with --experimental-vm-modules flag

// ============================================================
// 2. SETUP & CONFIGURATION
// ============================================================

// package.json:
//   {
//     "scripts": {
//       "test": "jest",
//       "test:watch": "jest --watch",
//       "test:coverage": "jest --coverage"
//     }
//   }
//
// jest.config.js (optional, for customization):
//   export default {
//     testEnvironment: "node",       // or "jsdom" for browser-like env
//     transform: {},                 // Transformation config
//     coverageDirectory: "coverage",
//     collectCoverageFrom: ["src/**/*.js"],
//   };
//
// Test file detection (auto):
//   - Files ending with .test.js or .spec.js
//   - Files inside __tests__/ directory

// ============================================================
// 3. BASIC SYNTAX
// ============================================================

// test() or it() — defines a single test case
//
// test("description of what is being tested", () => {
//   // Arrange - set up test data
//   const a = 5;
//   const b = 3;
//
//   // Act - perform the action
//   const result = sum(a, b);
//
//   // Assert - verify the result
//   expect(result).toBe(8);
// });
//
// it() is an alias for test() — they work identically:
// it("should return 8 when adding 5 and 3", () => { ... });

// ============================================================
// 4. DESCRIBE BLOCKS (GROUPING TESTS)
// ============================================================

// describe() groups related tests together:
//
// describe("Math Operations", () => {
//   describe("sum()", () => {
//     test("adds two positive numbers", () => {
//       expect(sum(2, 3)).toBe(5);
//     });
//     test("adds negative numbers", () => {
//       expect(sum(-2, -3)).toBe(-5);
//     });
//   });
//
//   describe("subtract()", () => {
//     test("subtracts two numbers", () => {
//       expect(subtract(10, 4)).toBe(6);
//     });
//   });
// });
//
// Benefits:
//   - Organized console output
//   - Scoped setup/teardown
//   - Run specific groups with --testPathPattern

// ============================================================
// 5. MATCHERS (expect assertions)
// ============================================================

// Common Matchers:
//   ┌────────────────────────────────┬─────────────────────────────────┐
//   │ Matcher                        │ Purpose                         │
//   ├────────────────────────────────┼─────────────────────────────────┤
//   │ .toBe(value)                   │ Strict equality (===)           │
//   │ .toEqual(value)                │ Deep equality (objects/arrays)  │
//   │ .toStrictEqual(value)          │ Deep + checks undefined props   │
//   │ .not.toBe(value)               │ Negation of any matcher         │
//   └────────────────────────────────┴─────────────────────────────────┘
//
// Truthiness:
//   .toBeTruthy()        → Passes if value is truthy
//   .toBeFalsy()         → Passes if value is falsy
//   .toBeNull()          → Passes if value is null
//   .toBeUndefined()     → Passes if value is undefined
//   .toBeDefined()       → Passes if value is NOT undefined
//
// Numbers:
//   .toBeGreaterThan(n)       → value > n
//   .toBeGreaterThanOrEqual(n) → value >= n
//   .toBeLessThan(n)          → value < n
//   .toBeLessThanOrEqual(n)   → value <= n
//   .toBeCloseTo(n, digits)   → Floating point comparison
//
// Strings:
//   .toMatch(/regex/)    → Matches regex pattern
//   .toMatch("substr")   → Contains substring
//   .toHaveLength(n)     → String/array length is n
//
// Arrays & Iterables:
//   .toContain(item)     → Array includes item (uses ===)
//   .toContainEqual(obj) → Array includes object (deep equality)
//   .toHaveLength(n)     → Array has n elements
//
// Objects:
//   .toHaveProperty("key", value)  → Object has property with value
//   .toMatchObject(subset)         → Object contains subset of properties
//
// Exceptions:
//   .toThrow()            → Function throws any error
//   .toThrow("message")   → Function throws with specific message
//   .toThrow(ErrorType)   → Function throws specific error type

// ============================================================
// 6. EXAMPLES WITH MATCHERS
// ============================================================

// // Equality
// test("object assignment", () => {
//   const data = { name: "John" };
//   data.age = 30;
//   expect(data).toEqual({ name: "John", age: 30 });
// });
//
// // Truthiness
// test("null checks", () => {
//   const n = null;
//   expect(n).toBeNull();
//   expect(n).toBeFalsy();
//   expect(n).not.toBeTruthy();
//   expect(n).not.toBeUndefined();
// });
//
// // Numbers
// test("two plus two", () => {
//   const value = 2 + 2;
//   expect(value).toBeGreaterThan(3);
//   expect(value).toBeLessThanOrEqual(4);
// });
//
// // Floating point
// test("adding floating point numbers", () => {
//   expect(0.1 + 0.2).toBeCloseTo(0.3);  // NOT .toBe(0.3)
// });
//
// // Strings
// test("string matching", () => {
//   expect("Hello World").toMatch(/World/);
// });
//
// // Arrays
// test("shopping list has milk", () => {
//   const list = ["milk", "bread", "eggs"];
//   expect(list).toContain("milk");
//   expect(list).toHaveLength(3);
// });
//
// // Exceptions
// test("throws on invalid input", () => {
//   expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
// });

// ============================================================
// 7. SETUP AND TEARDOWN
// ============================================================

// Runs before/after EACH test in the describe block:
//   beforeEach(() => {
//     // Reset database, clear mocks, etc.
//   });
//   afterEach(() => {
//     // Clean up after each test
//   });
//
// Runs ONCE before/after ALL tests in the describe block:
//   beforeAll(() => {
//     // Connect to database, start server, etc.
//   });
//   afterAll(() => {
//     // Disconnect, close server, etc.
//   });
//
// Example:
// describe("Database tests", () => {
//   let db;
//
//   beforeAll(() => {
//     db = connectToDatabase();
//   });
//
//   beforeEach(() => {
//     db.clear();  // Fresh state for each test
//   });
//
//   afterAll(() => {
//     db.disconnect();
//   });
//
//   test("inserts a record", () => { ... });
//   test("finds a record", () => { ... });
// });

// ============================================================
// 8. MOCKING
// ============================================================

// Mock Functions (jest.fn):
//   const mockFn = jest.fn();
//   mockFn("hello");
//
//   expect(mockFn).toHaveBeenCalled();
//   expect(mockFn).toHaveBeenCalledWith("hello");
//   expect(mockFn).toHaveBeenCalledTimes(1);
//
// Mock Return Values:
//   const mockFn = jest.fn();
//   mockFn.mockReturnValue(42);
//   mockFn.mockReturnValueOnce(10);   // Only first call
//   mockFn.mockResolvedValue(data);   // Returns Promise.resolve(data)
//   mockFn.mockRejectedValue(error);  // Returns Promise.reject(error)
//
// Mock Modules:
//   jest.mock("./api", () => ({
//     fetchData: jest.fn(() => Promise.resolve({ id: 1 }))
//   }));
//
// Spy on existing methods:
//   const spy = jest.spyOn(Math, "random");
//   spy.mockReturnValue(0.5);
//   // ... run test ...
//   spy.mockRestore();  // Restore original implementation
//
// Mock Assertions:
//   expect(mockFn).toHaveBeenCalled()
//   expect(mockFn).toHaveBeenCalledTimes(n)
//   expect(mockFn).toHaveBeenCalledWith(arg1, arg2)
//   expect(mockFn).toHaveBeenLastCalledWith(arg)
//   expect(mockFn).toHaveReturnedWith(value)

// ============================================================
// 9. ASYNC TESTING
// ============================================================

// Testing Promises:
//   test("fetches data", async () => {
//     const data = await fetchData();
//     expect(data).toEqual({ id: 1, name: "John" });
//   });
//
// Testing rejected promises:
//   test("handles error", async () => {
//     await expect(fetchBadData()).rejects.toThrow("Not found");
//   });
//
// Using resolves/rejects:
//   test("resolves to user", () => {
//     return expect(getUser(1)).resolves.toEqual({ id: 1, name: "John" });
//   });
//
// Callbacks (done pattern):
//   test("callback is called", (done) => {
//     fetchData((data) => {
//       expect(data).toBe("hello");
//       done();  // Signal test is complete
//     });
//   });

// ============================================================
// 10. SNAPSHOT TESTING
// ============================================================

// Snapshots capture the output of a component/function and compare
// it against a stored reference. Useful for detecting unintended changes.
//
// test("renders correctly", () => {
//   const tree = renderer.create(<Button label="Click" />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
//
// First run: Creates a .snap file with the output
// Subsequent runs: Compares current output against stored snapshot
//
// Update snapshots when changes are intentional:
//   jest --updateSnapshot   or   jest -u
//
// Inline snapshots (stored in test file):
//   expect(value).toMatchInlineSnapshot(`"expected output"`);

// ============================================================
// 11. CODE COVERAGE
// ============================================================

// Run with coverage:
//   npx jest --coverage
//
// Coverage metrics:
//   - Statements : % of code statements executed
//   - Branches   : % of if/else paths taken
//   - Functions  : % of functions called
//   - Lines      : % of lines executed
//
// Output:
//   - Console table showing coverage per file
//   - HTML report in coverage/lcov-report/index.html
//
// Configuration:
//   // jest.config.js
//   {
//     coverageThreshold: {
//       global: {
//         branches: 80,
//         functions: 80,
//         lines: 80,
//         statements: 80
//       }
//     }
//   }

// ============================================================
// 12. JEST vs VITEST COMPARISON
// ============================================================

//   ┌─────────────────────┬──────────────────────┬─────────────────────┐
//   │ Feature             │ Jest                 │ Vitest              │
//   ├─────────────────────┼──────────────────────┼─────────────────────┤
//   │ Speed               │ Moderate             │ Very Fast (Vite)    │
//   │ ESM Support         │ Requires config      │ Native              │
//   │ API                 │ jest.fn(), jest.mock  │ vi.fn(), vi.mock    │
//   │ Config              │ jest.config.js       │ vite.config.js      │
//   │ Watch Mode          │ Built-in             │ Built-in            │
//   │ Snapshot            │ Built-in             │ Built-in            │
//   │ Coverage            │ Built-in             │ c8 / istanbul       │
//   │ Best For            │ CRA, general JS      │ Vite projects       │
//   │ Compatibility       │ Widely adopted       │ Jest-compatible API │
//   └─────────────────────┴──────────────────────┴─────────────────────┘
//
// Migration from Jest to Vitest:
//   - Replace jest.fn()  → vi.fn()
//   - Replace jest.mock() → vi.mock()
//   - Replace jest.spyOn() → vi.spyOn()
//   - Update config from jest.config.js to vite.config.js test section

// ============================================================
// 13. USEFUL CLI FLAGS
// ============================================================

// npx jest                    → Run all tests
// npx jest --watch            → Watch mode (re-runs on change)
// npx jest --watchAll         → Watch all files
// npx jest filename           → Run specific file
// npx jest --coverage         → Generate coverage report
// npx jest -u                 → Update snapshots
// npx jest --verbose          → Show individual test results
// npx jest --bail             → Stop after first failure
// npx jest --testNamePattern="sum"  → Run tests matching "sum"
// npx jest --silent           → Suppress console output

// ============================================================
// 14. BEST PRACTICES
// ============================================================

// 1. Follow AAA Pattern:
//    - Arrange: Set up test data and conditions
//    - Act: Perform the action being tested
//    - Assert: Verify the expected outcome
//
// 2. One assertion focus per test (test one behavior)
//
// 3. Use descriptive test names:
//    ✗ test("test 1", ...)
//    ✓ test("returns -1 when item not found in array", ...)
//
// 4. Keep tests independent — no shared mutable state between tests
//
// 5. Don't test implementation details — test behavior/output
//
// 6. Use beforeEach to avoid repetition
//
// 7. Mock external dependencies (APIs, databases, file system)
//
// 8. Keep tests fast — mock slow operations
//
// 9. Run tests frequently during development (use watch mode)
//
// 10. Aim for meaningful coverage, not 100% — focus on critical paths

// ============================================================
// 15. COMPLETE EXAMPLE
// ============================================================

// File: calculator.js
// ────────────────────
// export function sum(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }
// export function multiply(a, b) { return a * b; }
// export function divide(a, b) {
//   if (b === 0) throw new Error("Cannot divide by zero");
//   return a / b;
// }

// File: calculator.test.js
// ─────────────────────────
// import { sum, subtract, multiply, divide } from "./calculator.js";
//
// describe("Calculator", () => {
//   describe("sum", () => {
//     test("adds two positive numbers", () => {
//       expect(sum(3, 4)).toBe(7);
//     });
//     test("adds negative numbers", () => {
//       expect(sum(-3, -4)).toBe(-7);
//     });
//     test("adds zero", () => {
//       expect(sum(5, 0)).toBe(5);
//     });
//   });
//
//   describe("subtract", () => {
//     test("subtracts two numbers", () => {
//       expect(subtract(10, 4)).toBe(6);
//     });
//   });
//
//   describe("multiply", () => {
//     test("multiplies two numbers", () => {
//       expect(multiply(3, 4)).toBe(12);
//     });
//     test("multiplies by zero", () => {
//       expect(multiply(5, 0)).toBe(0);
//     });
//   });
//
//   describe("divide", () => {
//     test("divides two numbers", () => {
//       expect(divide(10, 2)).toBe(5);
//     });
//     test("throws on division by zero", () => {
//       expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
//     });
//   });
// });
