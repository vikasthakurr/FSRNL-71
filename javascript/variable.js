// Variables in JavaScript

// 1. What is a Variable?

// A variable is a named container that stores a value in memory.
// It acts as a label/reference to a value so we can use it later.
// In JS, we declare variables using three keywords: var, let, const

// 2. Three Ways to Declare Variables

// a) var — the old way (ES5 and before)
// b) let — the modern way (ES6/ES2015)
// c) const — for constants (ES6/ES2015)

// 3. var (Function Scoped)

// - Can be re-declared (no error)
// - Can be re-assigned (updated)
// - Function scoped (not block scoped)
// - Hoisted with value "undefined" in creation phase
// - Attached to the window object in browsers (global scope)

var a = 10;
var a = 20; // re-declaration allowed — no error
a = 40; // re-assignment allowed
console.log(a); // 40

// var is function scoped (ignores blocks like if, for, while):
if (true) {
  var message = "Hello";
}
console.log(message); // "Hello" — accessible outside the block!

// var is function scoped:
function example() {
  var localVar = "I'm local";
}
// console.log(localVar); // ReferenceError — not accessible outside function

// Hoisting with var:
console.log(hoistedVar); // undefined (not error — hoisted with undefined)
var hoistedVar = 100;
console.log(hoistedVar); // 100

// 4. let (Block Scoped)

// - Cannot be re-declared in the same scope
// - Can be re-assigned (updated)
// - Block scoped (respects {})
// - Hoisted but NOT initialized (Temporal Dead Zone)
// - NOT attached to the window object

let b = 10;
// let b = 20;  // SyntaxError: Identifier 'b' has already been declared
b = 30; // re-assignment is fine
console.log(b); // 30

// let is block scoped:
if (true) {
  let blockVar = "I'm inside block";
  console.log(blockVar); // "I'm inside block"
}
// console.log(blockVar); // ReferenceError — not accessible outside block

// Hoisting with let (TDZ):
// console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
let tdzVar = 50;
console.log(tdzVar); // 50

// let in loops (each iteration gets its own copy):
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 (correct!)
}

// 5. const (Block Scoped, Constant Reference)

// - Cannot be re-declared
// - Cannot be re-assigned (the binding is constant)
// - MUST be initialized at the time of declaration
// - Block scoped (same as let)
// - Hoisted but NOT initialized (TDZ, same as let)
// - NOT attached to the window object

const c = 10;
// c = 20;       // TypeError: Assignment to constant variable
// const d;      // SyntaxError: Missing initializer in const declaration
console.log(c); // 10

// IMPORTANT: const means the REFERENCE cannot change,
// but the VALUE inside objects/arrays CAN be mutated!

const person = { name: "Vikas", age: 22 };
person.name = "Akash"; // this is ALLOWED (mutating the object)
person.city = "Delhi"; // this is ALLOWED (adding a property)
console.log(person); // { name: "Akash", age: 22, city: "Delhi" }
// person = {};           // TypeError — cannot reassign the reference

const numbers = [1, 2, 3];
numbers.push(4); // ALLOWED (mutating the array)
console.log(numbers); // [1, 2, 3, 4]
// numbers = [5, 6];      // TypeError — cannot reassign

// 6. Comparison Table: var vs let vs const

// | Feature              | var              | let              | const            |
// |----------------------|------------------|------------------|------------------|
// | Scope                | Function         | Block            | Block            |
// | Re-declaration       | Yes              | No               | No               |
// | Re-assignment        | Yes              | Yes              | No               |
// | Hoisting             | Yes (undefined)  | Yes (TDZ)        | Yes (TDZ)        |
// | Must initialize      | No               | No               | Yes              |
// | Attached to window   | Yes              | No               | No               |
// | Introduced in        | ES1 (1997)       | ES6 (2015)       | ES6 (2015)       |

// 7. Scope in Detail

// a) Global Scope — variables declared outside any function/block
var globalVar = "I'm global"; // accessible everywhere
let globalLet = "I'm global"; // accessible everywhere (but not on window)

// b) Function Scope — variables declared inside a function
function myFunc() {
  var funcVar = "function scope";
  let funcLet = "function scope";
  // both accessible only inside this function
}

// c) Block Scope — variables declared inside {} (if, for, while, etc.)
{
  var blockVar = "var ignores blocks";
  let blockLet = "let respects blocks";
  const blockConst = "const respects blocks";
}
console.log(blockVar); // "var ignores blocks" — leaked out!
// console.log(blockLet);   // ReferenceError
// console.log(blockConst); // ReferenceError

// 8. Hoisting Behavior Compared

// var — hoisted and initialized to undefined
console.log(v1); // undefined
var v1 = "hello";

// let — hoisted but NOT initialized (TDZ)
// console.log(v2); // ReferenceError
let v2 = "hello";

// const — hoisted but NOT initialized (TDZ)
// console.log(v3); // ReferenceError
const v3 = "hello";

// function declaration — hoisted entirely (can call before declaration)
sayHi(); // "Hi!"
function sayHi() {
  console.log("Hi!");
}

// function expression — NOT fully hoisted
// sayBye(); // TypeError: sayBye is not a function
var sayBye = function () {
  console.log("Bye!");
};

// 9. var Problems (Why We Use let/const Now)

// Problem 1: No block scope
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 (not 0, 1, 2!)
}
// Because var is function scoped, there's only ONE 'i' shared across all iterations.

// Problem 2: Accidental re-declaration
var userName = "Vikas";
// ... 500 lines later ...
var userName = "Oops"; // no error! silently overwrites

// Problem 3: Pollutes global object
var globalThing = "hi";
console.log(window.globalThing); // "hi" (in browser) — pollutes window

// Problem 4: Confusing hoisting
console.log(mystery); // undefined — not an error, but confusing
var mystery = 42;

// 10. Best Practices

// - Use const by default (for values that won't be reassigned)
// - Use let when you need to reassign (loop counters, state changes)
// - Avoid var entirely in modern code
// - Always declare variables at the top of their scope
// - Use meaningful, descriptive variable names

// Naming conventions:
const MAX_RETRIES = 3; // UPPER_SNAKE_CASE for true constants
let currentUser = "Vikas"; // camelCase for regular variables
let isLoggedIn = true; // prefix 'is/has/can' for booleans
let userList = []; // plural for arrays
let getUserById = () => {}; // verb prefix for functions

// 11. Variable Declaration Without Keyword

// If you assign a value without var/let/const, it becomes a global variable
// (attached to window). This is dangerous and NOT recommended.

function badPractice() {
  leaked = "I'm global now!"; // no keyword — becomes window.leaked
}
badPractice();
console.log(leaked); // "I'm global now!" — this is a bug!

// "use strict" mode prevents this:
// "use strict";
// undeclaredVar = 10; // ReferenceError in strict mode

// 12. Multiple Variable Declarations

// You can declare multiple variables in one statement:
let x = 1,
  y = 2,
  z = 3;
const PI = 3.14,
  E = 2.71;

// With destructuring (modern approach):
const [first, second, third] = [10, 20, 30];
const { name, age } = { name: "Vikas", age: 22 };
console.log(first, second, third); // 10, 20, 30
console.log(name, age); // "Vikas", 22

// 13. Summary

// - var: old, function scoped, hoisted (undefined), avoid in modern code
// - let: modern, block scoped, TDZ, use when value changes
// - const: modern, block scoped, TDZ, use by default (reference is constant)
// - const objects/arrays can still be mutated (only the binding is fixed)
// - Always prefer const > let > var
// - Block scope ({}) works with let and const, but var leaks through
// - Variables without keywords become dangerous global variables
// - Use strict mode to catch undeclared variable bugs
