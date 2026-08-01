// ============================================
// FUNCTION OVERLOADING IN TYPESCRIPT
// ============================================

// Function Overloading = Defining multiple function signatures for the same function.
// The function behaves differently based on the number/types of arguments passed.

// In TypeScript, overloading is done by:
// 1. Writing multiple "overload signatures" (declarations without body)
// 2. Writing one "implementation signature" (with the actual body)

// ============================================
// Basic Function Overloading
// ============================================

// Overload signatures (no body):
function greet(name: string): string;
function greet(firstName: string, lastName: string): string;

// Implementation signature (with body):
function greet(nameOrFirst: string, lastName?: string): string {
  if (lastName) {
    return `Hello, ${nameOrFirst} ${lastName}!`;
  }
  return `Hello, ${nameOrFirst}!`;
}

console.log(greet("Alice"));          // "Hello, Alice!"
console.log(greet("Alice", "Smith")); // "Hello, Alice Smith!"

// ============================================
// Overloading with Different Parameter Types
// ============================================

function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  throw new Error("Invalid arguments");
}

console.log(add(5, 10));          // 15
console.log(add("Hello", " World")); // "Hello World"
// add(5, "hello"); // Error: No overload matches this call

// ============================================
// Overloading with Different Return Types
// ============================================

function parseInput(input: string): string;
function parseInput(input: number): number;

function parseInput(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}

let result1 = parseInput("hello"); // TypeScript knows this is string
let result2 = parseInput(10);      // TypeScript knows this is number

// ============================================
// Overloading with Different Number of Parameters
// ============================================

function createDate(timestamp: number): Date;
function createDate(year: number, month: number, day: number): Date;

function createDate(yearOrTimestamp: number, month?: number, day?: number): Date {
  if (month !== undefined && day !== undefined) {
    return new Date(yearOrTimestamp, month - 1, day);
  }
  return new Date(yearOrTimestamp);
}

let date1 = createDate(1690000000000);  // From timestamp
let date2 = createDate(2024, 1, 15);    // From year, month, day

// ============================================
// Method Overloading in Classes
// ============================================

class Calculator {
  calculate(a: number, b: number): number;
  calculate(a: number, b: number, c: number): number;

  calculate(a: number, b: number, c?: number): number {
    if (c !== undefined) {
      return a + b + c;
    }
    return a + b;
  }
}

let calc = new Calculator();
console.log(calc.calculate(5, 10));     // 15
console.log(calc.calculate(5, 10, 20)); // 35

// ============================================
// Rules for Function Overloading
// ============================================

// 1. Overload signatures must be ABOVE the implementation.
// 2. The implementation signature must be COMPATIBLE with all overload signatures.
// 3. The implementation signature is NOT directly callable - only overload signatures are.
// 4. You need at least 2 overload signatures.
// 5. Implementation must handle all cases defined by overloads.

// ============================================
// When to Use Function Overloading
// ============================================

// - When a function can accept different types of arguments.
// - When the return type depends on the input type.
// - When you want better type safety and IntelliSense support.
// - Alternative: Sometimes union types or generics are simpler solutions.
