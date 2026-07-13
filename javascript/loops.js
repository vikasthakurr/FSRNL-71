// ========== LOOPS IN JAVASCRIPT — NOTES ==========

// What are Loops?
// Loops allow you to execute a block of code repeatedly until a condition is met.
// They help avoid writing the same code multiple times.

// ========== 1. FOR LOOP ==========

// Syntax: for (initialization; condition; update) { ... }
// - initialization: runs ONCE before the loop starts (usually declares a counter).
// - condition: checked BEFORE each iteration; loop stops when it's false.
// - update: runs AFTER each iteration (usually increments/decrements).

// Print 1 to 10:
// for (let i = 1; i <= 10; i++) {
//   console.log(i);
// }

// Looping through an array:
// let arr = [1, 2, 3, 4, 4, 5];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// Reverse loop:
// for (let i = arr.length - 1; i >= 0; i--) {
//   console.log(arr[i]);
// }

// ========== 2. WHILE LOOP ==========

// Syntax: while (condition) { ... }
// - Checks condition BEFORE each iteration.
// - Use when you don't know how many times the loop should run.
// - Be careful — forgetting the update causes an infinite loop!

// let i = 1;
// while (i <= 10) {
//   console.log(i);
//   i++;
// }

// ========== 3. DO...WHILE LOOP ==========

// Syntax: do { ... } while (condition);
// - Executes the body AT LEAST ONCE, then checks the condition.
// - Useful when you want the code to run before checking.

// let i = 11;
// do {
//   console.log(i); // Prints 11 even though condition is false
//   i++;
// } while (i <= 10);

// ========== 4. FOR...OF LOOP (Iterables: Arrays, Strings, Maps, Sets) ==========

// Syntax: for (let item of iterable) { ... }
// - Iterates over VALUES of an iterable (arrays, strings, etc.).
// - Cannot directly access the index (use entries() if needed).
// - Does NOT work on plain objects.

// let fruits = ["apple", "banana", "mango"];
// for (let fruit of fruits) {
//   console.log(fruit); // "apple", "banana", "mango"
// }

// With index using entries():
// for (let [index, fruit] of fruits.entries()) {
//   console.log(index, fruit); // 0 "apple", 1 "banana", 2 "mango"
// }

// Iterating a string:
// for (let char of "hello") {
//   console.log(char); // "h", "e", "l", "l", "o"
// }

// ========== 5. FOR...IN LOOP (Objects) ==========

// Syntax: for (let key in object) { ... }
// - Iterates over KEYS (property names) of an object.
// - Works on objects AND arrays (but not recommended for arrays).
// - Also iterates over inherited enumerable properties (use hasOwnProperty to filter).

let person = {
  fullname: "vikas thakur",
  age: 26,
};

// for (let key in person) {
//   console.log(key, person[key]);
//   // "fullname" "vikas thakur"
//   // "age" 26
// }

// Accessing object data:
// console.log(Object.keys(person));    // ["fullname", "age"]
// console.log(Object.values(person));  // ["vikas thakur", 26]
// console.log(Object.entries(person)); // [["fullname", "vikas thakur"], ["age", 26]]

// ========== 6. HIGHER-ORDER FUNCTION LOOPS (Array Methods) ==========

// These are built-in methods that take a callback function.
// They are more readable and functional compared to traditional loops.

// forEach — executes a function for each element (no return value)
// let arr = [1, 2, 3, 4, 5];
// arr.forEach((ele, index) => {
//   console.log(index, ele);
// });

// map — returns a NEW array with transformed values
// let doubled = arr.map((ele) => ele * 2); // [2, 4, 6, 8, 10]

// filter — returns a NEW array with elements that pass the test
// let evens = arr.filter((ele) => ele % 2 === 0); // [2, 4]

// reduce — reduces array to a single value
// let sum = arr.reduce((acc, ele) => acc + ele, 0); // 15

// find — returns the FIRST element that passes the test
// let found = arr.find((ele) => ele > 3); // 4

// findIndex — returns the INDEX of the first match
// let idx = arr.findIndex((ele) => ele > 3); // 3

// some — returns true if ANY element passes the test
// arr.some((ele) => ele > 4); // true

// every — returns true if ALL elements pass the test
// arr.every((ele) => ele > 0); // true

// ========== 7. BREAK & CONTINUE ==========

// break — exits the loop entirely
// for (let i = 1; i <= 10; i++) {
//   if (i === 5) break;
//   console.log(i); // 1, 2, 3, 4
// }

// continue — skips the current iteration, moves to the next
// for (let i = 1; i <= 10; i++) {
//   if (i === 5) continue;
//   console.log(i); // 1, 2, 3, 4, 6, 7, 8, 9, 10
// }

// Note: break and continue do NOT work in forEach/map/filter.
// Use a regular for loop if you need break/continue.

// ========== 8. NESTED LOOPS ==========

// A loop inside a loop — useful for 2D arrays, patterns, etc.
// for (let i = 1; i <= 3; i++) {
//   for (let j = 1; j <= 3; j++) {
//     console.log(i, j);
//   }
// }
// Output: (1,1), (1,2), (1,3), (2,1), (2,2), (2,3), (3,1), (3,2), (3,3)

// ========== 9. INFINITE LOOPS (AVOID!) ==========

// A loop that never ends because the condition is always true.
// while (true) { ... }      // infinite
// for (;;) { ... }          // infinite
// Always ensure your loop has a valid exit condition!

// ========== 10. CREATING ARRAYS & OBJECTS ==========

// Array — literal vs constructor:
// let arr = [];            // literal approach (preferred)
// let arr1 = new Array();  // constructor approach

// Object — literal vs constructor:
// let obj = {};            // literal approach (preferred)
// let obj1 = new Object();
// obj1.fullname = "akash";

// ========== FOR...OF vs FOR...IN — QUICK COMPARISON ==========

// for...of → iterates VALUES → use with arrays, strings, maps, sets
// for...in → iterates KEYS   → use with objects

// On arrays:
// let colors = ["red", "green", "blue"];
// for (let color of colors) console.log(color);  // "red", "green", "blue"
// for (let index in colors) console.log(index);  // "0", "1", "2" (keys as strings)

// ========== KEY TAKEAWAYS ==========

// 1. 'for' loop — best when you know the number of iterations.
// 2. 'while' — best when the exit condition is dynamic.
// 3. 'do...while' — guarantees at least one execution.
// 4. 'for...of' — clean way to iterate array/string VALUES.
// 5. 'for...in' — iterate object KEYS.
// 6. Array methods (forEach, map, filter, reduce) — functional & readable.
// 7. Use 'break' to exit early, 'continue' to skip an iteration.
// 8. Avoid infinite loops — always have an exit condition.
