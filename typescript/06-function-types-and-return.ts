// ============================================
// FUNCTION TYPES AND RETURN TYPES IN TYPESCRIPT
// ============================================

// ============================================
// Function with Type Annotations
// ============================================

// Parameters and return type annotated:
function addNumbers(a: number, b: number): number {
  return a + b;
}

// TypeScript infers the return type, but explicit is better:
function multiply(a: number, b: number): number {
  return a * b;
}

// ============================================
// Return Types
// ============================================

// Returning string
function getGreeting(name: string): string {
  return `Hello, ${name}!`;
}

// Returning boolean
function isEven(num: number): boolean {
  return num % 2 === 0;
}

// Returning void (no return value)
function logInfo(message: string): void {
  console.log(message);
  // No return statement needed
}

// Returning never (function never completes)
function infiniteLoop(): never {
  while (true) {
    // runs forever
  }
}

function throwErr(msg: string): never {
  throw new Error(msg);
}

// ============================================
// Optional Parameters
// ============================================

// Use ? to make a parameter optional (must come after required params)
function buildName(first: string, last?: string): string {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
}

console.log(buildName("Alice"));          // "Alice"
console.log(buildName("Alice", "Smith")); // "Alice Smith"

// ============================================
// Default Parameters
// ============================================

function greetUser(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greetUser("Bob"));            // "Hello, Bob!"
console.log(greetUser("Bob", "Hey"));     // "Hey, Bob!"

// ============================================
// Rest Parameters
// ============================================

function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3));       // 6
console.log(sumAll(10, 20, 30, 40)); // 100

// ============================================
// Function Type Expressions
// ============================================

// Defining a function type (like a blueprint for functions):
type MathOperation = (a: number, b: number) => number;

// Using the function type:
let addition: MathOperation = (a, b) => a + b;
let subtraction: MathOperation = (a, b) => a - b;
let division: MathOperation = (a, b) => a / b;

console.log(addition(5, 3));    // 8
console.log(subtraction(10, 4)); // 6

// ============================================
// Arrow Functions with Types
// ============================================

const square = (n: number): number => n * n;
const isPositive = (n: number): boolean => n > 0;
const printValue = (val: string): void => console.log(val);

// ============================================
// Callback Function Types
// ============================================

// Defining a function that accepts a callback:
function processArray(arr: number[], callback: (item: number) => number): number[] {
  return arr.map(callback);
}

let doubled2 = processArray([1, 2, 3], (item) => item * 2);
console.log(doubled2); // [2, 4, 6]

// ============================================
// Function Type with Interface
// ============================================

interface StringFormatter {
  (input: string): string;
}

let toUpper: StringFormatter = (input) => input.toUpperCase();
let toLower: StringFormatter = (input) => input.toLowerCase();

console.log(toUpper("hello")); // "HELLO"
console.log(toLower("WORLD")); // "world"

// ============================================
// Generic Function Types
// ============================================

// A function that works with any type:
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello")); // "hello"
console.log(identity<number>(42));      // 42

// Generic with arrays:
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

console.log(getFirst([10, 20, 30]));       // 10
console.log(getFirst(["a", "b", "c"]));    // "a"

// ============================================
// Function Returning Objects
// ============================================

interface UserInfo {
  name: string;
  age: number;
}

function createUser(name: string, age: number): UserInfo {
  return { name, age };
}

let newUser = createUser("Dave", 28);
console.log(newUser); // { name: "Dave", age: 28 }

// ============================================
// Function Returning Promises (Async)
// ============================================

async function fetchData(url: string): Promise<string> {
  const response = await fetch(url);
  const data = await response.text();
  return data;
}

// Return type is Promise<string>

// ============================================
// Summary of Return Types
// ============================================

// string    - returns a string
// number    - returns a number
// boolean   - returns true/false
// void      - returns nothing
// never     - never returns (error/infinite loop)
// object    - returns an object
// T         - generic return type
// Promise<T> - returns a promise resolving to T
// type[]    - returns an array
// [type, type] - returns a tuple
