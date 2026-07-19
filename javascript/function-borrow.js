// ===========================
// call, apply, bind & the "this" keyword in JavaScript
// ===========================

// ===========================
// 1. The "this" Keyword
// ===========================

// "this" refers to the object that is currently executing the function.
// Its value depends on HOW the function is called, not where it's defined.

// Rules for "this" (priority order):
//   1. new keyword       -> this = newly created object
//   2. call/apply/bind   -> this = explicitly passed object
//   3. Method call       -> this = object before the dot (obj.method())
//   4. Normal function   -> this = window (browser) / global (Node)
//                           In strict mode -> this = undefined
//   5. Arrow function    -> this = inherited from parent/enclosing scope (lexical this)

// ===========================
// 2. Function Borrowing
// ===========================

// Function borrowing means using a method of one object on another object
// using call, apply, or bind. This avoids code duplication.

let person1 = {
  fname: "vikas",
};
let person2 = {
  fname: "akash",
};

function print(city, state) {
  console.log("hello", this.fname, city, state);
}

// Without context, "this" would be window/global/undefined
// print();  // "this" is not person1 or person2

// ===========================
// 3. call()
// ===========================

// Syntax: functionName.call(thisArg, arg1, arg2, ...)
// - Immediately invokes the function
// - First argument sets the "this" context
// - Remaining arguments are passed individually (comma-separated)

print.call(person1, "Delhi", "Delhi"); // hello vikas Delhi Delhi
print.call(person2, "Agra", "UP"); // hello akash Agra UP

// ===========================
// 4. apply()
// ===========================

// Syntax: functionName.apply(thisArg, [arg1, arg2, ...])
// - Immediately invokes the function
// - First argument sets the "this" context
// - Second argument is an ARRAY of arguments
// - Useful when arguments are already in an array

print.apply(person1, ["Agra", "UP"]); // hello vikas Agra UP
print.apply(person2, ["Delhi", "Delhi"]); // hello akash Delhi Delhi

// Key difference: call passes args individually, apply passes them as an array
// Mnemonic: A for Apply, A for Array

// ===========================
// 5. bind()
// ===========================

// Syntax: const boundFn = functionName.bind(thisArg, arg1, arg2, ...)
// - Does NOT immediately invoke the function
// - Returns a NEW function with "this" permanently bound
// - You can call it later whenever needed
// - Useful for event handlers, callbacks, setTimeout

const printForPerson1 = print.bind(person1, "Delhi", "Delhi");
printForPerson1(); // hello vikas Delhi Delhi

const printForPerson2 = print.bind(person2);
printForPerson2("Agra", "UP"); // hello akash Agra UP

// ===========================
// 6. "this" in Different Scenarios
// ===========================

// --- Normal function (non-strict) ---
// function sayHi() {
//   console.log(this);  // window (browser) or global (Node)
// }
// sayHi();

// --- Strict mode ---
("use strict");
// function sayHi() {
//   console.log(this);  // undefined
// }
// sayHi();

// --- Arrow function ---
// Arrow functions do NOT have their own "this".
// They inherit "this" from the enclosing lexical scope.

// const person = {
//   fname: "vikas",
//   show: () => {
//     console.log(this.fname); // undefined — "this" is NOT the person object
//     // Arrow function takes "this" from outer scope (window/module)
//   },
// };
// person.show();

// --- Method (regular function inside object) ---
// const person = {
//   fname: "vikas",
//   show: function() {
//     console.log(this.fname); // "vikas" — "this" is the person object
//   },
// };
// person.show();

// --- Losing "this" context ---
// const person = {
//   fname: "vikas",
//   show: function() {
//     console.log(this.fname);
//   },
// };
// const fn = person.show;
// fn();  // undefined — "this" is now window/global, not person
// // Fix with bind:
// const boundFn = person.show.bind(person);
// boundFn(); // "vikas"

// ===========================
// 7. Comparison Table
// ===========================

// | Method | Invokes Immediately? | Args Format        | Returns          |
// |--------|---------------------|--------------------|------------------|
// | call   | Yes                 | Comma-separated    | Function result  |
// | apply  | Yes                 | Array              | Function result  |
// | bind   | No                  | Comma-separated    | New bound func   |

// ===========================
// 8. Real-World Use Cases
// ===========================

// bind with setTimeout:
// const user = {
//   name: "Vikas",
//   greet: function() {
//     console.log("Hi, " + this.name);
//   }
// };
// setTimeout(user.greet.bind(user), 1000); // "Hi, Vikas" after 1 sec

// apply with Math.max on an array:
// const numbers = [5, 10, 3, 8];
// console.log(Math.max.apply(null, numbers)); // 10

// call for inheritance (constructor chaining):
// function Animal(type) { this.type = type; }
// function Dog(name) {
//   Animal.call(this, "dog");
//   this.name = name;
// }

// ===========================
// Summary
// ===========================
// - "this" depends on how a function is CALLED, not where it's written
// - call & apply invoke immediately; bind returns a new function
// - Arrow functions don't have their own "this" (lexical binding)
// - Use call/apply/bind to explicitly control what "this" refers to
// - Function borrowing = reusing methods across objects without duplication

let name = "vikas";
name = 1234;
console.log(name);
