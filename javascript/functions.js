// ========== FUNCTIONS IN JAVASCRIPT — NOTES ==========

// What is a Function?
// A function is a reusable block of code designed to perform a specific task.
// Functions help us follow DRY (Don't Repeat Yourself) principle.

// Why use Functions?
// - Code reusability — write once, use many times.
// - Modularity — break complex problems into smaller, manageable pieces.
// - Abstraction — hide implementation details behind a function name.
// - Maintainability — easier to debug and update.

// ========== 1. NAMED FUNCTION (Function Declaration) ==========

// Syntax: function functionName(parameters) { ... }
// - Has a name for identification.
// - Hoisted — can be called BEFORE it's defined in the code.
// - Creates its own scope.

// function greeting() {
//   console.log("Hello!");
// }
// greeting(); // "Hello!"

// With parameters and return:
// function add(a, b) {
//   return a + b;
// }
// let sum = add(5, 3); // 8

// Hoisting example:
// sayHello(); // Works! Function is hoisted.
// function sayHello() {
//   console.log("Hello!");
// }

// ========== 2. ANONYMOUS / FUNCTION EXPRESSION (Ghost/Orphan Function) ==========

// A function without a name, assigned to a variable.
// Syntax: let variableName = function(parameters) { ... }
// - NOT hoisted — cannot be called before the assignment.
// - The variable holds a reference to the function.
// - Also called "ghost function" or "orphan function."

// let sayHi = function () {
//   console.log("hi");
// };
// sayHi(); // "hi"

// Why use it?
// - When you need to pass a function as an argument (callbacks).
// - When you want to conditionally assign a function.

// let greet;
// if (timeOfDay === "morning") {
//   greet = function () { console.log("Good morning!"); };
// } else {
//   greet = function () { console.log("Hello!"); };
// }

// ========== 3. ARROW FUNCTION (ES6) ==========

// A shorter syntax for writing functions.
// Syntax: const fn = (params) => expression;
// - Concise — great for one-liners.
// - Does NOT have its own 'this' (inherits from parent scope).
// - Does NOT have 'arguments' object.
// - Cannot be used as constructors (no 'new' keyword).
// - NOT hoisted (same as function expressions).

// let result = () => console.log("hi");
// result(); // "hi"

// Variations:
// const square = (x) => x * x;             // single param, implicit return
// const add = (a, b) => a + b;             // multiple params, implicit return
// const greet = (name) => {                // with block body
//   let msg = `Hello, ${name}!`;
//   return msg;                            // explicit return needed with {}
// };

// When NOT to use arrow functions:
// - Object methods (because 'this' won't refer to the object)
// - Event handlers where you need 'this' to be the element
// - Functions that use 'arguments' object

// ========== 4. IIFE (Immediately Invoked Function Expression) ==========

// A function that runs immediately after it's defined.
// Syntax: (function() { ... })(); or (() => { ... })();
// - Executes once, immediately.
// - Creates a private scope — variables inside don't pollute global scope.
// - Used for initialization code, module pattern.

// (() => console.log("hi"))(); // "hi"

// With parameters:
// ((name) => {
//   console.log(`Hello, ${name}`);
// })("Vikas"); // "Hello, Vikas"

// Classic use — avoiding global pollution:
// (function () {
//   let secret = "hidden";
//   console.log(secret); // "hidden"
// })();
// console.log(secret); // ReferenceError: secret is not defined

// ========== 5. FUNCTION RETURNING A FUNCTION (fn → fn) ==========

// A function can return another function (this is the basis of closures & currying).

// function outer() {
//   return function inner() {
//     console.log("I am the inner function");
//   };
// }
// const myFn = outer(); // myFn now holds the inner function
// myFn(); // "I am the inner function"

// Practical use — function factory:
// function multiplier(factor) {
//   return function (num) {
//     return num * factor;
//   };
// }
// const double = multiplier(2);
// const triple = multiplier(3);
// console.log(double(5));  // 10
// console.log(triple(5));  // 15

// ========== 6. FUNCTION AS ARGUMENT — CALLBACKS (fn(fn)) ==========

// Functions are "first-class citizens" in JS — they can be passed as arguments.
// A function passed as an argument to another function is called a CALLBACK.

// function greet(name, callbackFn) {
//   console.log(`Hello, ${name}`);
//   callbackFn();
// }
// function sayBye() {
//   console.log("Goodbye!");
// }
// greet("Vikas", sayBye);
// Output:
// "Hello, Vikas"
// "Goodbye!"

// Common real-world callbacks:
// setTimeout(function () {
//   console.log("Runs after 2 seconds");
// }, 2000);

// [1, 2, 3].forEach(function (item) {
//   console.log(item);
// });

// ========== 7. HIGHER-ORDER FUNCTIONS ==========

// A higher-order function is any function that:
// - Takes a function as an argument, OR
// - Returns a function

// Built-in examples: .map(), .filter(), .reduce(), .forEach(), setTimeout()

// const numbers = [1, 2, 3, 4, 5];
// const doubled = numbers.map((n) => n * 2);     // [2, 4, 6, 8, 10]
// const evens = numbers.filter((n) => n % 2 === 0); // [2, 4]
// const total = numbers.reduce((acc, n) => acc + n, 0); // 15

// ========== 8. DEFAULT PARAMETERS ==========

// You can set default values for parameters (ES6+).
// function greet(name = "Guest") {
//   console.log(`Hello, ${name}`);
// }
// greet();        // "Hello, Guest"
// greet("Vikas"); // "Hello, Vikas"

// ========== 9. REST PARAMETERS (...args) ==========

// Collects all remaining arguments into an array.
// function sum(...numbers) {
//   return numbers.reduce((acc, num) => acc + num, 0);
// }
// sum(1, 2, 3);       // 6
// sum(1, 2, 3, 4, 5); // 15

// ========== 10. FUNCTION SCOPE & 'this' ==========

// - Regular functions: 'this' depends on HOW the function is called.
// - Arrow functions: 'this' is inherited from the enclosing lexical scope.

// const obj = {
//   name: "Vikas",
//   regular: function () {
//     console.log(this.name); // "Vikas" — 'this' refers to obj
//   },
//   arrow: () => {
//     console.log(this.name); // undefined — 'this' is from outer scope (window/global)
//   },
// };

// ========== KEY TAKEAWAYS ==========

// 1. Named functions are hoisted; expressions and arrows are NOT.
// 2. Arrow functions don't have their own 'this' or 'arguments'.
// 3. IIFE creates a private scope and runs immediately.
// 4. Functions returning functions → closures, currying, factories.
// 5. Functions as arguments → callbacks, higher-order functions.
// 6. Functions are first-class citizens: assign, pass, return them freely.
