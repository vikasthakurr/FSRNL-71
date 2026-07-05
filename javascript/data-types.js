// JavaScript Data Types & Memory Allocation (Stack vs Heap)

// 1. Two Categories of Data Types

// JavaScript has two main categories:
//   a) Primitive Data Types (stored in STACK)
//   b) Non-Primitive / Reference Data Types (stored in HEAP)

// 2. Primitive Data Types (7 types)

// These are immutable (cannot be changed in memory) and stored directly in the STACK.

// a) Number — integers and floating point numbers
let age = 25;
let price = 99.99;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN; // NaN is technically a Number type

// b) String — sequence of characters
let name = "Vikas";
let greeting = "Hello";
let template = `My name is ${name}`; // template literal

// c) Boolean — true or false
let isLoggedIn = true;
let hasAccess = false;

// d) undefined — variable declared but not assigned a value
let x;
console.log(x); // undefined

// e) null — intentional absence of value (explicitly set by developer)
let user = null; // we intentionally set it to "nothing"
// typeof null === "object" (this is a known JS bug since 1995)

// f) Symbol (ES6) — unique and immutable identifier
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false — every Symbol is unique

// g) BigInt (ES2020) — for numbers larger than Number.MAX_SAFE_INTEGER
let bigNumber = 9007199254740991n; // add 'n' at the end
let anotherBig = BigInt("123456789012345678901234567890");

// 3. Non-Primitive / Reference Data Types

// These are mutable, stored in HEAP, and accessed via reference from STACK.

// a) Object — key-value pairs
let person = {
  name: "Vikas",
  age: 22,
  city: "Delhi",
};

// b) Array — ordered list (technically an object in JS)
let colors = ["red", "green", "blue"];
let mixed = [1, "hello", true, null, { key: "value" }];

// c) Function — callable object
function add(a, b) {
  return a + b;
}
// functions are objects in JS (first-class citizens)

// d) Date
let today = new Date();

// e) RegExp
let pattern = /hello/gi;

// f) Map, Set, WeakMap, WeakSet (ES6)
let myMap = new Map();
let mySet = new Set([1, 2, 3, 3]); // {1, 2, 3}

// 4. Stack Memory (for Primitives)

// - Stack is a small, fast, LIFO (Last In, First Out) memory structure.
// - Each variable gets its own COPY of the value.
// - When you assign a primitive to another variable, the VALUE is copied.
// - Changing one does NOT affect the other.

// How Stack works with primitives:
//
//   STACK MEMORY:
//   |_______________|
//   |  b = 60       |  ← b got its own copy, changed independently
//   |  a = 10       |  ← a stays 10
//   |_______________|

let a = 10;
let b = a; // b gets a COPY of 10 (separate memory slot)
b = 60; // changing b does NOT affect a
console.log(a); // 10 (unchanged)
console.log(b); // 60

// Another example:
let str1 = "hello";
let str2 = str1; // str2 gets its own copy of "hello"
str2 = "world"; // str1 is still "hello"
console.log(str1); // "hello"
console.log(str2); // "world"

// 5. Heap Memory (for Reference Types)

// - Heap is a large, unstructured memory pool.
// - Objects are stored in the heap.
// - The variable in the stack stores only a REFERENCE (address/pointer) to
//   the actual object in the heap.
// - When you assign a reference type to another variable, the REFERENCE is copied,
//   NOT the object itself. Both variables point to the SAME object.

// How Heap works with reference types:
//
//   STACK MEMORY:              HEAP MEMORY:
//   |_______________|          |__________________________|
//   |  obj2 = 0x01  |---┐      |  0x01: { name: "akash" } |
//   |  obj1 = 0x01  |---┘      |__________________________|
//   |_______________|
//
//   Both obj1 and obj2 hold the SAME reference (0x01)
//   So changing obj2.name also changes obj1.name!

let obj1 = {
  name: "vikas",
};
let obj2 = obj1; // obj2 gets the REFERENCE (not a copy of the object)
obj2.name = "akash"; // modifying through obj2 affects the same object
console.log(obj1); // { name: "akash" } — obj1 is also changed!
console.log(obj2); // { name: "akash" }
console.log(obj1 === obj2); // true — they point to the same memory location

// 6. Visual Comparison: Stack vs Heap

// | Feature          | Stack (Primitives)        | Heap (Reference Types)     |
// |------------------|---------------------------|----------------------------|
// | Stores           | Actual value              | Reference/pointer to value |
// | Data Types       | number, string, boolean,  | object, array, function,   |
// |                  | undefined, null, symbol,  | date, map, set, etc.       |
// |                  | bigint                    |                            |
// | Size             | Fixed, small              | Dynamic, large             |
// | Speed            | Very fast                 | Slower (pointer lookup)    |
// | Copy Behavior    | Copies the value          | Copies the reference       |
// | Mutation         | Independent copies        | Shared — changes affect all|
// | Memory Mgmt      | Auto removed when out     | Garbage collected when no  |
// |                  | of scope                  | references remain          |

// 7. Proving Primitives are Copied by Value

let num1 = 100;
let num2 = num1;
num2 = 200;
console.log(num1); // 100 — not affected
console.log(num2); // 200 — its own copy

let bool1 = true;
let bool2 = bool1;
bool2 = false;
console.log(bool1); // true — not affected
console.log(bool2); // false

// 8. Proving Reference Types are Copied by Reference

let arr1 = [1, 2, 3];
let arr2 = arr1; // arr2 points to the SAME array
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] — affected!
console.log(arr2); // [1, 2, 3, 4]
console.log(arr1 === arr2); // true — same reference

// Functions are also reference types:
function greet() {
  return "hi";
}
let fn = greet;
console.log(fn === greet); // true — same reference

// 9. How to Create Independent Copies of Objects/Arrays (Break the Reference)

// a) Spread Operator (shallow copy)
let original = { name: "Vikas", age: 22 };
let copy = { ...original };
copy.name = "Akash";
console.log(original.name); // "Vikas" — not affected!
console.log(copy.name); // "Akash"

// b) Object.assign() (shallow copy)
let copy2 = Object.assign({}, original);

// c) Array spread (shallow copy)
let arrOriginal = [1, 2, 3];
let arrCopy = [...arrOriginal];
arrCopy.push(4);
console.log(arrOriginal); // [1, 2, 3] — not affected!

// d) Array.from() (shallow copy)
let arrCopy2 = Array.from(arrOriginal);

// e) JSON method (deep copy — but has limitations)
let nested = { name: "Vikas", address: { city: "Delhi", pin: 110001 } };
let deepCopy = JSON.parse(JSON.stringify(nested));
deepCopy.address.city = "Mumbai";
console.log(nested.address.city); // "Delhi" — not affected!
// Limitation: doesn't work with functions, undefined, Symbol, Date, RegExp

// f) structuredClone() (deep copy — modern, ES2022)
let deepCopy2 = structuredClone(nested);
// Works with Date, Map, Set, ArrayBuffer, etc.
// Doesn't work with functions and DOM nodes.

// 10. Shallow Copy vs Deep Copy

// Shallow Copy:
//   - Copies only the first level of properties
//   - Nested objects/arrays still share the same reference
let shallowOriginal = { name: "Vikas", scores: [90, 85, 88] };
let shallowCopy = { ...shallowOriginal };
shallowCopy.scores.push(100);
console.log(shallowOriginal.scores); // [90, 85, 88, 100] — affected! (nested reference shared)

// Deep Copy:
//   - Copies ALL levels, including nested objects
//   - No shared references at any level
let deepOriginal = { name: "Vikas", scores: [90, 85, 88] };
let deepClone = structuredClone(deepOriginal);
deepClone.scores.push(100);
console.log(deepOriginal.scores); // [90, 85, 88] — NOT affected!

// 11. typeof Operator — Checking Data Types

console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (known JS bug)
console.log(typeof Symbol()); // "symbol"
console.log(typeof 10n); // "bigint"
console.log(typeof {}); // "object"
console.log(typeof []); // "object" (arrays are objects)
console.log(typeof function () {}); // "function"

// To check for arrays specifically:
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

// 12. Memory Lifecycle in JavaScript

// Step 1: Allocation
//   - Primitives: allocated on the stack when declared
//   - Objects: allocated on the heap, reference stored on stack

// Step 2: Usage
//   - Read/write values through variables

// Step 3: Deallocation (Garbage Collection)
//   - When a variable goes out of scope (stack) → automatically removed
//   - When no references point to a heap object → garbage collected
//   - V8 uses "Mark and Sweep" algorithm:
//     1. Mark: Starting from roots (global, stack), mark all reachable objects
//     2. Sweep: Remove all unmarked (unreachable) objects from heap

// Example of garbage collection:
function createUser() {
  let tempUser = { name: "Temp" }; // allocated on heap
  return tempUser.name;
}
createUser();
// After function returns, tempUser reference is gone from stack
// The object { name: "Temp" } has no references → garbage collected

// 13. Summary

// - Primitives (7): number, string, boolean, undefined, null, symbol, bigint
// - Reference types: object, array, function, date, map, set, etc.
// - Stack: stores primitives (actual values) — fast, fixed size, copied by value
// - Heap: stores objects (actual data) — dynamic size, accessed via reference
// - Assigning primitives = independent copy (changing one doesn't affect other)
// - Assigning objects = shared reference (changing one affects the other)
// - Use spread/Object.assign for shallow copy
// - Use structuredClone/JSON for deep copy
// - Garbage collector frees heap memory when objects have no references
