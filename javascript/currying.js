// ========== CURRYING IN JAVASCRIPT — NOTES ==========

// What is Currying?
// Currying is a technique where a function that takes multiple arguments
// is transformed into a sequence of functions, each taking ONE argument at a time.
// f(a, b, c) → f(a)(b)(c)

// Why use Currying?
// - Reusability: Create specialized functions from general ones.
// - Partial Application: Fix some arguments now, provide the rest later.
// - Composition: Easier to compose small, single-purpose functions.
// - Closures: Each returned function "remembers" the previous arguments via closure.

// How it works:
// - Instead of taking all arguments at once, the function takes the first argument
//   and returns a NEW function that takes the second argument, and so on.
// - Each returned function forms a closure over the previous arguments.

// ========== NORMAL FUNCTION vs CURRIED FUNCTION ==========

// Normal function (all args at once):
// function sendMail(to, sub, body) {
//   console.log(
//     `mail has been sent to ${to} with ${sub} and the body is ${body}`,
//   );
// }
// sendMail("onboarding mail", "welcome to mern-71 batch");

// Curried version (one arg at a time):
function sendMail(to) {
  return function (sub) {
    return function (body) {
      console.log(
        `mail has been sent to ${to} with sub ${sub} and with body ${body}`,
      );
    };
  };
}
sendMail("vikas@gmail.com")("welcome onboard")("this is the body");

// Step-by-step breakdown:
// sendMail("vikas@gmail.com")       → returns function(sub) { ... }
// ("welcome onboard")               → returns function(body) { ... }
// ("this is the body")              → executes the final console.log

// ========== PARTIAL APPLICATION WITH CURRYING ==========

// You can store intermediate functions for reuse:
// const sendToVikas = sendMail("vikas@gmail.com");
// const onboardingMail = sendToVikas("Welcome Onboard");
// onboardingMail("Hello! Welcome to the team.");
// onboardingMail("Here are your login details.");

// Now 'sendToVikas' always sends to vikas@gmail.com
// and 'onboardingMail' always has the subject pre-filled.

// ========== CURRYING WITH ARROW FUNCTIONS ==========

// Arrow functions make currying more concise:
// const multiply = (a) => (b) => a * b;
// const double = multiply(2);
// const triple = multiply(3);
// console.log(double(5));  // 10
// console.log(triple(5));  // 15

// ========== GENERIC CURRY HELPER ==========

// A utility function that converts any regular function into a curried one:
// function curry(fn) {
//   return function curried(...args) {
//     if (args.length >= fn.length) {
//       return fn(...args);
//     } else {
//       return function (...nextArgs) {
//         return curried(...args, ...nextArgs);
//       };
//     }
//   };
// }

// Usage:
// function add(a, b, c) { return a + b + c; }
// const curriedAdd = curry(add);
// curriedAdd(1)(2)(3);    // 6
// curriedAdd(1, 2)(3);    // 6 (partial application also works)
// curriedAdd(1)(2, 3);    // 6

// ========== CURRYING vs PARTIAL APPLICATION ==========

// Currying: Always produces a chain of unary (single-argument) functions.
//   f(a, b, c) → f(a)(b)(c)

// Partial Application: Fixes some arguments and returns a function taking the rest.
//   f(a, b, c) → g(c)  where a and b are already provided.

// Currying enables partial application, but they are not the same thing.

// ========== REAL-WORLD USE CASES ==========

// 1. Event handlers with pre-configured data:
// const handleClick = (section) => (event) => {
//   console.log(`Clicked in ${section}`, event.target);
// };
// button.addEventListener("click", handleClick("header"));

// 2. API request builders:
// const request = (method) => (url) => (data) => {
//   return fetch(url, { method, body: JSON.stringify(data) });
// };
// const post = request("POST");
// const postToUsers = post("/api/users");
// postToUsers({ name: "Vikas" });

// 3. Logging with levels:
// const log = (level) => (message) => {
//   console.log(`[${level}] ${message}`);
// };
// const error = log("ERROR");
// const info = log("INFO");
// error("Something went wrong");  // [ERROR] Something went wrong
// info("Server started");          // [INFO] Server started

// ========== PRACTICE: MAGGI WITH CURRYING & CLOSURE ==========

// Write a function to make a maggi with help of currying and closure:

function makeMaggi(water) {
  return function (masala) {
    return function (noodles) {
      console.log(
        `Maggi is ready with ${water} water, ${masala} masala, and ${noodles} noodles!`,
      );
    };
  };
}

// makeMaggi("2 cups")("tastemaker")("single pack");
// Output: Maggi is ready with 2 cups water, tastemaker masala, and single pack noodles!

// Arrow function version:
// const makeMaggiArrow = (water) => (masala) => (noodles) =>
//   `Maggi: ${water} water + ${masala} masala + ${noodles} noodles`;

// ========== KEY TAKEAWAYS ==========

// 1. Currying transforms f(a, b, c) into f(a)(b)(c).
// 2. It relies heavily on closures — each inner function remembers outer args.
// 3. Useful for creating reusable, specialized functions.
// 4. Arrow functions make curried syntax clean and readable.
// 5. Common in functional programming, event handlers, and config builders.
