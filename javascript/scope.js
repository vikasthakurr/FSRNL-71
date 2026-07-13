// ========== SCOPE IN JAVASCRIPT — NOTES ==========

// What is Scope?
// Scope determines the ACCESSIBILITY (visibility) of variables.
// It defines WHERE a variable can be accessed in your code.
// JavaScript uses LEXICAL (static) scoping — scope is determined
// by where the code is WRITTEN, not where it is called.

// ========== 1. GLOBAL SCOPE ==========

// Variables declared outside any function or block are in the global scope.
// They can be accessed from ANYWHERE in the code.

// let a = 10; // global scope — accessible everywhere

// In browsers: global variables become properties of the 'window' object.
// var x = 5; → window.x === 5
// let and const do NOT attach to window.

// Problems with global scope:
// - Name collisions — different parts of code may overwrite the same variable.
// - Hard to debug — any part of the code can modify it.
// - Memory — global variables persist for the entire lifetime of the page.

// ========== 2. FUNCTION SCOPE (Local Scope) ==========

// Variables declared inside a function are accessible ONLY within that function.
// They cannot be accessed from outside.

// function greet() {
//   let message = "Hello";  // function scope
//   console.log(message);   // works
// }
// greet();
// console.log(message); // ReferenceError: message is not defined

// var, let, and const are ALL function-scoped when declared inside a function.
// function test() {
//   var x = 1;
//   let y = 2;
//   const z = 3;
//   // all three are accessible here
// }
// // x, y, z are NOT accessible here

// ========== 3. BLOCK SCOPE ==========

// A block is any code inside { } — if, for, while, or just standalone { }.
// let and const are BLOCK-SCOPED — accessible only inside the block.
// var is NOT block-scoped — it ignores blocks and is function-scoped.

// {
//   let a = 10;
//   const b = 20;
//   var c = 30;
// }
// console.log(a); // ReferenceError (let is block-scoped)
// console.log(b); // ReferenceError (const is block-scoped)
// console.log(c); // 30 (var ignores block scope!)

// Example with if:
// if (true) {
//   let x = "inside";
//   var y = "also inside";
// }
// console.log(x); // ReferenceError
// console.log(y); // "also inside" — var leaks out of blocks!

// Example with for loop:
// for (let i = 0; i < 3; i++) {
//   // i is only accessible here
// }
// console.log(i); // ReferenceError

// for (var j = 0; j < 3; j++) {
//   // j leaks out
// }
// console.log(j); // 3 — var is not block-scoped!

// ========== 4. LEXICAL SCOPE (Static Scope) ==========

// Inner functions have access to variables of their OUTER (parent) functions.
// Scope is determined by where the function is DEFINED, not where it's called.
// This is the foundation of CLOSURES.

// let a = 10;
// function outer() {
//   let a = "vikas";
//   function inner() {
//     let a = 40;
//     console.log(a); // 40 — uses its own 'a' (closest scope)
//   }
//   inner();
// }
// outer();

// Scope chain lookup:
// When a variable is used, JS looks for it in this order:
// 1. Current function's local scope
// 2. Parent function's scope
// 3. Grandparent function's scope
// ... continues up
// 4. Global scope
// 5. If not found → ReferenceError

// ========== 5. SCOPE CHAIN ==========

// Each function has access to its own scope + all parent scopes.
// This chain of scopes is called the SCOPE CHAIN.

// function a() {
//   let a = 10;
//   function b() {
//     console.log(a); // looks up → finds 'a' in function a's scope
//     let a = 20;     // TDZ! This causes ReferenceError (see section 7)
//     function c() {
//       let b = 40;
//       console.log(a, b); // 'a' from b's scope, 'b' from c's scope
//     }
//     c();
//   }
//   b();
// }
// a();

// Visual representation:
// Global Scope
//   └── function a() scope [a = 10]
//         └── function b() scope [a = 20]
//               └── function c() scope [b = 40]

// c() can access: its own vars + b's vars + a's vars + global vars
// b() can access: its own vars + a's vars + global vars
// a() can access: its own vars + global vars

// ========== 6. var vs let vs const — SCOPE BEHAVIOR ==========

// | Feature          | var            | let            | const          |
// |------------------|----------------|----------------|----------------|
// | Scope            | Function       | Block          | Block          |
// | Hoisting         | Yes (undefined)| Yes (TDZ)      | Yes (TDZ)      |
// | Re-declaration   | Allowed        | Not allowed    | Not allowed    |
// | Re-assignment    | Allowed        | Allowed        | Not allowed    |
// | Global object    | Attaches to    | Does NOT       | Does NOT       |
// |                  | window         | attach         | attach         |

// var hoisting:
// console.log(x); // undefined (hoisted but not initialized)
// var x = 5;

// let/const hoisting (Temporal Dead Zone):
// console.log(y); // ReferenceError (in TDZ)
// let y = 5;

// ========== 7. TEMPORAL DEAD ZONE (TDZ) ==========

// The TDZ is the period between entering a scope and the variable's declaration.
// During TDZ, accessing the variable throws a ReferenceError.

// {
//   // TDZ for 'name' starts here
//   console.log(name); // ReferenceError: Cannot access 'name' before initialization
//   let name = "Vikas"; // TDZ ends here
//   console.log(name);  // "Vikas" — works fine
// }

// Why TDZ exists:
// - Catches bugs where you use variables before declaring them.
// - Makes code more predictable and easier to reason about.

// ========== 8. MODULE SCOPE ==========

// In ES6 modules (files with import/export), variables are scoped to the module.
// They are NOT added to the global scope.

// file: utils.js
// let secret = "hidden"; // only accessible within this file
// export let name = "Vikas"; // accessible to files that import it

// file: main.js
// import { name } from "./utils.js";
// console.log(name);   // "Vikas"
// console.log(secret); // ReferenceError — not exported

// ========== 9. SCOPE & CLOSURES CONNECTION ==========

// A closure is created when an inner function "remembers" its outer scope
// even after the outer function has returned.

// function counter() {
//   let count = 0; // function scope — private
//   return function () {
//     count++;
//     return count;
//   };
// }
// const increment = counter();
// increment(); // 1
// increment(); // 2
// // 'count' is not accessible from outside — it's "enclosed" in the closure.

// ========== 10. SHADOWING ==========

// When a variable in an inner scope has the same name as one in an outer scope,
// the inner variable "shadows" (hides) the outer one.

// let a = "global";
// function test() {
//   let a = "local"; // shadows the global 'a'
//   console.log(a);  // "local"
// }
// test();
// console.log(a); // "global" — outer 'a' is unchanged

// Illegal shadowing:
// let x = 10;
// {
//   var x = 20; // SyntaxError! Cannot shadow let with var in the same scope
// }

// But this is fine:
// var y = 10;
// {
//   let y = 20; // OK — let can shadow var
// }

// ========== 11. SCOPE BEST PRACTICES ==========

// 1. Prefer const by default, use let when you need to reassign.
// 2. Avoid var — it has confusing scope rules (no block scope, hoisting issues).
// 3. Declare variables in the narrowest scope possible.
// 4. Minimize global variables — they cause naming conflicts and are hard to track.
// 5. Use IIFE or modules to encapsulate code and avoid polluting global scope.
// 6. Be aware of TDZ — always declare let/const before using them.

// ========== KEY TAKEAWAYS ==========

// 1. Global scope — accessible everywhere (avoid overusing).
// 2. Function scope — var, let, const all respect function boundaries.
// 3. Block scope — let and const are block-scoped; var is NOT.
// 4. Lexical scope — inner functions access outer variables (scope chain).
// 5. Scope chain — JS looks up from current scope → parent → global.
// 6. TDZ — let/const cannot be used before their declaration line.
// 7. Shadowing — inner variables can hide outer ones with the same name.
// 8. Closures rely on lexical scope to "remember" variables.
