// ========== CONDITIONALS IN JAVASCRIPT — NOTES ==========

// Conditionals allow you to execute different blocks of code
// based on whether a condition evaluates to true or false.

// ========== 1. if / else if / else ==========

// Syntax:
// if (condition) { ... }
// else if (anotherCondition) { ... }
// else { ... }

// - The condition is evaluated as a boolean (truthy/falsy).
// - Only the FIRST matching block executes; the rest are skipped.
// - 'else' is optional — it runs when no condition above matched.

// let my_age = 19;

// if (my_age == 18) {
//   console.log("you can vote");
// } else if (my_age > 18) {
//   console.log("you can vote because u r more than 18 years old");
// } else {
//   console.log("invalid age");
// }

// ========== 2. TERNARY OPERATOR ==========

// Syntax: condition ? valueIfTrue : valueIfFalse
// - A shorthand for simple if/else.
// - Returns a value, so it can be used in assignments.
// - Avoid nesting ternaries — it hurts readability.

// console.log(my_age >= 18 ? "can vote" : "cant vote");

// ========== 3. SWITCH STATEMENT ==========

// Syntax:
// switch (expression) {
//   case value1: ... break;
//   case value2: ... break;
//   default: ...
// }

// - Compares the expression with each case using STRICT equality (===).
// - 'break' is required — without it, execution "falls through" to the next case.
// - 'default' is like 'else' — runs when no case matches (optional but recommended).
// - Best used when comparing one value against many possible matches.

// let day = 5;
// switch (day) {
//   case 1:
//     console.log("sunday");
//     break;
//   case 2:
//     console.log("monday");
//     break;
//   case 3:
//     console.log("tuesday");
//     break;
//   default:
//     console.log("invalid day provided");
// }

// ========== 4. LOGICAL OPERATORS ==========

// Used to combine multiple conditions.

// || (OR)  — returns true if ANY condition is true
// && (AND) — returns true if ALL conditions are true
// !  (NOT) — inverts a boolean value

// let my_age = 17;
// let gender = "male";

// if (my_age >= 18 || gender == "male") {
//   console.log("vikas");
// } else {
//   console.log("not vikas");
// }

// AND Truth Table:
// A       B       A && B
// true    true     true
// true    false    false
// false   true     false
// false   false    false

// OR Truth Table:
// A       B       A || B
// true    true     true
// true    false    true
// false   true     true
// false   false    false

// NOT:
// !true  → false
// !false → true

// ========== 5. TRUTHY & FALSY VALUES ==========

// JavaScript evaluates non-boolean values in conditions.
// Falsy values (treated as false):
//   false, 0, -0, "" (empty string), null, undefined, NaN

// Everything else is truthy, including:
//   "0", " ", [], {}, functions

// Example:
// let name = "";
// if (name) {
//   console.log("has name");
// } else {
//   console.log("name is empty"); // this runs
// }

// ========== 6. == vs === (COMPARISON) ==========

// ==  (loose equality)  — compares values after type coercion
//     "5" == 5   → true (string converted to number)
//     null == undefined → true

// === (strict equality) — compares value AND type (no coercion)
//     "5" === 5  → false
//     null === undefined → false

// Best practice: Always use === to avoid unexpected type coercion bugs.

// ========== 7. SHORT-CIRCUIT EVALUATION ==========

// || returns the first truthy value (or the last value if all are falsy)
// let username = "" || "Guest"; // "Guest"

// && returns the first falsy value (or the last value if all are truthy)
// let result = true && "hello"; // "hello"

// Useful for default values and conditional execution:
// let user = null;
// user && console.log(user.name); // won't execute — avoids error

// ========== 8. NULLISH COALESCING (??) ==========

// Returns the right-hand value only if left is null or undefined
// (unlike || which triggers on any falsy value)

// let count = 0;
// console.log(count || 10);  // 10 (0 is falsy)
// console.log(count ?? 10);  // 0  (0 is not null/undefined)

// ========== 9. OPTIONAL CHAINING (?.) ==========

// Safely access deeply nested properties without checking each level.
// Returns undefined instead of throwing an error if a property is missing.

// let user = { address: { city: "Delhi" } };
// console.log(user?.address?.city);    // "Delhi"
// console.log(user?.phone?.number);    // undefined (no error)
