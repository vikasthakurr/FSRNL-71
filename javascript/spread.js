// ========== SPREAD OPERATOR & REST PARAMETER IN JAVASCRIPT — NOTES ==========

// Both use the same syntax: ... (three dots)
// The CONTEXT determines whether it's spread or rest.
// - SPREAD → expands/unpacks elements (used in function calls, arrays, objects)
// - REST → collects/gathers elements into an array (used in function params, destructuring)

// ========== 1. SPREAD OPERATOR ==========

// The spread operator EXPANDS an iterable (array, string, object) into individual elements.

// ---------- Spread with Arrays ----------

// Copying an array (shallow copy):
// let arr1 = [1, 2, 4, 5, 6];
// let arr2 = [...arr1]; // [1, 2, 4, 5, 6] — new independent array

// Merging arrays:
// let fruits = ["apple", "banana"];
// let veggies = ["carrot", "pea"];
// let food = [...fruits, ...veggies]; // ["apple", "banana", "carrot", "pea"]

// Adding elements while spreading:
// let arr = [2, 3, 4];
// let newArr = [1, ...arr, 5]; // [1, 2, 3, 4, 5]

// ---------- Spread with Objects ----------

// Copying an object (shallow copy):
// let obj1 = { fullname: "vikas" };
// let obj2 = { ...obj1 }; // { fullname: "vikas" } — new object

// Merging objects:
// let defaults = { theme: "dark", lang: "en" };
// let userPrefs = { lang: "hi", fontSize: 14 };
// let settings = { ...defaults, ...userPrefs };
// // { theme: "dark", lang: "hi", fontSize: 14 }
// // Later properties OVERRIDE earlier ones with the same key.

// Adding/overriding properties:
// let person = { name: "Vikas", age: 26 };
// let updated = { ...person, age: 27, city: "Delhi" };
// // { name: "Vikas", age: 27, city: "Delhi" }

// ---------- Spread with Strings ----------

// let str = "hello";
// let chars = [...str]; // ["h", "e", "l", "l", "o"]

// ---------- Spread in Function Calls ----------

// let numbers = [5, 2, 8, 1, 9];
// console.log(Math.max(...numbers)); // 9
// // Equivalent to: Math.max(5, 2, 8, 1, 9)

// IMPORTANT: Spread creates a SHALLOW copy.
// Nested objects/arrays still share the same reference!
// (See object.js notes for deep copy solutions)

// ========== 2. REST PARAMETER ==========

// The rest parameter COLLECTS remaining arguments into an array.
// Must be the LAST parameter in a function or destructuring pattern.

// ---------- Rest in Function Parameters ----------

// Collects all arguments into an array:
// function sum(...args) {
//   let value = 0;
//   for (let i = 0; i < args.length; i++) {
//     value = value + args[i];
//   }
//   return value;
// }
// let result = sum(2, 4, 4, 6, 6, 54, 67, 6, 434, 334, 677);
// console.log(result); // 1588

// Rest with named parameters + remaining:
// function greet(greeting, ...names) {
//   // greeting = "Hello"
//   // names = ["Vikas", "Akash", "Rahul"] — rest collects the remaining
//   names.forEach((name) => console.log(`${greeting}, ${name}!`));
// }
// greet("Hello", "Vikas", "Akash", "Rahul");

// Rules:
// - Only ONE rest parameter allowed per function.
// - It MUST be the last parameter.
// - function test(a, ...b, c) {} // SyntaxError! Rest must be last.

// ---------- Rest vs 'arguments' Object ----------

// 'arguments' (old way — avoid in modern code):
// - Available in regular functions (NOT arrow functions).
// - Array-like object, NOT a real array (no .map, .filter, etc.).
// - Doesn't work with arrow functions.

// Rest parameter (modern — preferred):
// - A real array — can use .map, .filter, .reduce directly.
// - Works with arrow functions.
// - More explicit and readable.

// const oldWay = function () {
//   console.log(arguments); // [1, 2, 3] — array-like
//   // arguments.map(...) // TypeError! Not a real array.
// };
// const newWay = (...args) => {
//   console.log(args); // [1, 2, 3] — real array
//   args.map((x) => x * 2); // Works!
// };

// ========== 3. REST IN DESTRUCTURING ==========

// ---------- Array Destructuring with Rest ----------

// let arr = ["apple", "orange", "kiwi", "banana"];
// let [first, second, ...rest] = arr;
// console.log(first);  // "apple"
// console.log(second); // "orange"
// console.log(rest);   // ["kiwi", "banana"] — rest collects remaining items

// Skipping elements:
// let [, , third, ...remaining] = arr;
// console.log(third);     // "kiwi"
// console.log(remaining); // ["banana"]

// ---------- Object Destructuring with Rest ----------

// let person = { id: 1, name: "vikas", address: { city: "agra" } };

// const { id, ...otherProps } = person;
// console.log(id);         // 1
// console.log(otherProps); // { name: "vikas", address: { city: "agra" } }

// Useful for removing a property:
// const { password, ...safeUser } = userData; // exclude password

// ========== 4. NESTED DESTRUCTURING ==========

// Extracting deeply nested values:
// let person = {
//   id: 1,
//   name: "vikas",
//   address: {
//     city: "agra",
//   },
// };

// Nested destructuring:
// const { address: { city } } = person;
// console.log(city); // "agra"

// Direct access then destructure:
// const { city } = person.address;
// console.log(city); // "agra"

// Top-level destructuring:
// const { name } = person;
// console.log(name); // "vikas"

// ========== 5. SPREAD vs REST — COMPARISON ==========

// | Feature    | Spread (...)            | Rest (...)                    |
// |------------|-------------------------|-------------------------------|
// | Purpose    | Expands/unpacks         | Collects/gathers              |
// | Used in    | Function calls, arrays, | Function params,              |
// |            | objects                 | destructuring                 |
// | Position   | Can be anywhere         | Must be LAST                  |
// | Result     | Individual elements     | An array                      |
// | Example    | [...arr] or {...obj}    | function(...args) or [a, ...b]|

// Think of it this way:
// SPREAD = "unpack the suitcase" (takes items OUT)
// REST   = "pack the suitcase"   (puts items IN)

// ========== 6. PRACTICAL EXAMPLES ==========

// --- Cloning and modifying an array ---
// const original = [1, 2, 3];
// const withExtra = [...original, 4, 5]; // [1, 2, 3, 4, 5]

// --- Removing duplicates ---
// const nums = [1, 2, 2, 3, 3, 4];
// const unique = [...new Set(nums)]; // [1, 2, 3, 4]

// --- Converting NodeList to Array ---
// const divs = [...document.querySelectorAll("div")];

// --- Combining with destructuring for API responses ---
// const response = { status: 200, data: { users: [] }, message: "OK" };
// const { status, ...payload } = response;
// // status = 200
// // payload = { data: { users: [] }, message: "OK" }

// --- Swapping variables ---
// let a = 1, b = 2;
// [a, b] = [b, a]; // a = 2, b = 1

// ========== 7. TODO — DESTRUCTURING PRACTICE ==========

// Extract dimensions and qr code from the product data below:

// let data = {
//   id: 1,
//   title: "Essence Mascara Lash Princess",
//   description:
//     "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//   category: "beauty",
//   price: 9.99,
//   discountPercentage: 10.48,
//   rating: 2.56,
//   stock: 99,
//   tags: ["beauty", "mascara"],
//   brand: "Essence",
//   sku: "BEA-ESS-ESS-001",
//   weight: 4,
//   dimensions: {
//     width: 15.14,
//     height: 13.08,
//     depth: 22.99,
//   },
//   warrantyInformation: "1 week warranty",
//   shippingInformation: "Ships in 3-5 business days",
//   availabilityStatus: "In Stock",
//   reviews: [
//     {
//       rating: 3,
//       comment: "Would not recommend!",
//       date: "2025-04-30T09:41:02.053Z",
//       reviewerName: "Eleanor Collins",
//       reviewerEmail: "eleanor.collins@x.dummyjson.com",
//     },
//     {
//       rating: 4,
//       comment: "Very satisfied!",
//       date: "2025-04-30T09:41:02.053Z",
//       reviewerName: "Lucas Gordon",
//       reviewerEmail: "lucas.gordon@x.dummyjson.com",
//     },
//     {
//       rating: 5,
//       comment: "Highly impressed!",
//       date: "2025-04-30T09:41:02.053Z",
//       reviewerName: "Eleanor Collins",
//       reviewerEmail: "eleanor.collins@x.dummyjson.com",
//     },
//   ],
//   returnPolicy: "No return policy",
//   minimumOrderQuantity: 48,
//   meta: {
//     createdAt: "2025-04-30T09:41:02.053Z",
//     updatedAt: "2025-04-30T09:41:02.053Z",
//     barcode: "5784719087687",
//     qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
//   },
//   images: [
//     "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
//   ],
//   thumbnail:
//     "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
// };

// Solution:
// const { dimensions: { width, height, depth } } = data;
// console.log(width, height, depth); // 15.14 13.08 22.99

// const { meta: { qrCode } } = data;
// console.log(qrCode); // "https://cdn.dummyjson.com/public/qr-code.png"

// Spread rest with the data object:
// const { id, title, price, ...otherDetails } = data;
// console.log(id, title, price);
// console.log(otherDetails); // everything else

// ========== KEY TAKEAWAYS ==========

// 1. ... is SPREAD when used to expand (in function calls, arrays, objects).
// 2. ... is REST when used to collect (in function params, destructuring).
// 3. Spread creates shallow copies — nested references are still shared.
// 4. Rest must always be the LAST item in params or destructuring.
// 5. Rest gives you a real array (unlike the old 'arguments' object).
// 6. Destructuring + rest is powerful for extracting and separating data.
// 7. Spread in objects: later properties override earlier ones (useful for merging configs).
