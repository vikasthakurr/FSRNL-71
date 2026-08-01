// ============================================
// TYPE ANNOTATIONS IN TYPESCRIPT
// ============================================

// Type Annotation = Explicitly telling TypeScript what type a variable/parameter should be.
// Syntax: variableName: type = value;

// ============================================
// Basic Type Annotations
// ============================================

// String
let firstName: string = "John";

// Number
let age: number = 25;

// Boolean
let isStudent: boolean = true;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;

// Any (disables type checking - avoid when possible)
let randomValue: any = "hello";
randomValue = 42; // No error with 'any'

// Unknown (safer alternative to any)
let unknownValue: unknown = "hello";
// unknownValue.toUpperCase(); // Error! Must narrow type first
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase()); // OK after type check
}

// Void (used for functions that don't return anything)
function logMessage(msg: string): void {
  console.log(msg);
}

// Never (function that never returns - throws error or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}

// ============================================
// Object Type Annotation
// ============================================

let person: { name: string; age: number; isActive: boolean } = {
  name: "Alice",
  age: 30,
  isActive: true,
};

// Optional Properties (use ?)
let employee: { name: string; age: number; department?: string } = {
  name: "Bob",
  age: 28,
};

// ============================================
// Union Types (variable can be one of multiple types)
// ============================================

let id: string | number;
id = "abc123";
id = 456;
// id = true; // Error: boolean is not string | number

// ============================================
// Literal Types (exact values)
// ============================================

let direction: "up" | "down" | "left" | "right";
direction = "up"; // OK
// direction = "diagonal"; // Error

// ============================================
// Type Aliases (create reusable types)
// ============================================

type User = {
  name: string;
  age: number;
  email: string;
};

let user1: User = {
  name: "Charlie",
  age: 35,
  email: "charlie@example.com",
};

// ============================================
// Interface (another way to define object shapes)
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  inStock?: boolean; // optional
}

let laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 2499,
};

// ============================================
// Type Assertion (telling TypeScript "trust me, I know the type")
// ============================================

let someValue: unknown = "Hello World";
let strLength: number = (someValue as string).length;

// Alternative syntax (not in JSX):
// let strLength2: number = (<string>someValue).length;
