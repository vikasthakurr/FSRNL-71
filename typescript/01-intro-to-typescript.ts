// ============================================
// INTRODUCTION TO TYPESCRIPT
// ============================================

// What is TypeScript?
// - TypeScript is a superset of JavaScript developed by Microsoft.
// - It adds static typing to JavaScript.
// - TypeScript code compiles (transpiles) down to plain JavaScript.
// - Any valid JavaScript code is also valid TypeScript code.

// Why TypeScript?
// - Catches errors at compile time instead of runtime.
// - Provides better IDE support (autocompletion, refactoring, navigation).
// - Makes code more readable and self-documenting.
// - Easier to maintain large codebases.
// - Supports modern JavaScript features + additional features like interfaces, enums, generics.

// TypeScript vs JavaScript
// - JavaScript is dynamically typed; TypeScript is statically typed.
// - TypeScript requires compilation; JavaScript runs directly in browsers/Node.js.
// - TypeScript has interfaces, enums, generics; JavaScript does not.

// File Extension
// - TypeScript files use .ts extension.
// - TypeScript + JSX (React) files use .tsx extension.

// How TypeScript Works
// - You write .ts files.
// - The TypeScript compiler (tsc) compiles them into .js files.
// - The generated .js files run in the browser or Node.js.

// Example:
let message: string = "Hello, TypeScript!";
console.log(message);

// TypeScript will throw an error if you try:
// message = 42; // Error: Type 'number' is not assignable to type 'string'

// Key Features of TypeScript:
// 1. Static Typing - Define types for variables, parameters, return values.
// 2. Interfaces - Define contracts/shapes for objects.
// 3. Enums - Named constants.
// 4. Generics - Reusable components that work with multiple types.
// 5. Access Modifiers - public, private, protected in classes.
// 6. Decorators - Metadata annotations (experimental).
// 7. Type Inference - TypeScript can infer types without explicit annotations.

// Type Inference Example:
let count = 10; // TypeScript infers this as 'number'
// count = "hello"; // Error: Type 'string' is not assignable to type 'number'
