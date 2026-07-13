// ========== OBJECTS IN JAVASCRIPT — NOTES ==========

// What is an Object?
// An object is a collection of key-value pairs (properties and methods).
// Keys are strings (or Symbols), values can be any data type.
// Objects are reference types — stored in heap memory, variables hold a reference.

// ========== 1. CREATING OBJECTS ==========

// Literal approach (preferred):
// let obj = {};

// Constructor approach:
// let obj1 = new Object();
// obj1.fullname = "akash";
// console.log(obj1);

// Object with properties:
// let person = {
//   fullname: "vikas thakur",
//   age: 26,
// };

// ========== 2. ACCESSING PROPERTIES ==========

// Dot notation:
// console.log(person.age); // 26

// Bracket notation (useful for dynamic keys or keys with special chars):
// console.log(person["fullname"]); // "vikas thakur"
// let key = "age";
// console.log(person[key]); // 26

// ========== 3. OBJECT METHODS (Built-in) ==========

// Object.keys(obj)    → returns array of keys
// console.log(Object.keys(person));    // ["fullname", "age"]

// Object.values(obj)  → returns array of values
// console.log(Object.values(person));  // ["vikas thakur", 26]

// Object.entries(obj) → returns array of [key, value] pairs
// console.log(Object.entries(person)); // [["fullname", "vikas thakur"], ["age", 26]]

// Iterating with for...in:
// for (let key in person) {
//   console.log(key, person[key]);
// }

// ========== 4. OBJECT.FREEZE() ==========

// Object.freeze(obj) — makes the object COMPLETELY immutable.
// - Cannot ADD new properties.
// - Cannot MODIFY existing properties.
// - Cannot DELETE properties.
// - Shallow freeze only — nested objects are NOT frozen.

// let person = { fullname: "vikas thakur", age: 26 };
// Object.freeze(person);
// person.fullname = "akash";  // silently fails (no error in non-strict mode)
// person.salary = 12345;      // silently fails
// console.log(person);        // { fullname: "vikas thakur", age: 26 }

// ========== 5. OBJECT.SEAL() ==========

// Object.seal(obj) — allows modification but prevents adding/deleting properties.
// - CAN modify existing properties.
// - CANNOT add new properties.
// - CANNOT delete properties.

// let person = { fullname: "vikas thakur", age: 26 };
// Object.seal(person);
// person.salary = 12345;       // fails — cannot add
// person.fullname = "vikas";   // works — can modify
// console.log(person);         // { fullname: "vikas", age: 26 }

// ========== FREEZE vs SEAL — COMPARISON ==========
// |                 | freeze | seal |
// |-----------------|--------|------|
// | Add property    |   ❌   |  ❌  |
// | Delete property |   ❌   |  ❌  |
// | Modify property |   ❌   |  ✅  |

// ========== 6. SHALLOW COPY ==========

// A shallow copy creates a NEW object, but nested objects still share
// the SAME reference. Changes to nested objects affect both copies.

// Methods for shallow copy:
// let obj1 = { fullname: "vikas", address: { city: "delhi" } };

// Method 1: Spread operator
// let obj2 = { ...obj1 };

// Method 2: Object.assign()
// let obj2 = Object.assign({}, obj1);

// What happens:
// obj2.fullname = "akash";       // only obj2 changes (primitive — copied by value)
// obj2.address.city = "agra";    // BOTH obj1 and obj2 change! (reference shared)
// console.log(obj1.address.city); // "agra" — affected!

// Why? Top-level properties are copied, but nested objects are still
// references pointing to the same memory location.

// ========== 7. DEEP COPY ==========

// A deep copy creates a completely independent clone.
// Nested objects are also duplicated — no shared references.

// Method 1: structuredClone() (Modern — recommended)
// let obj2 = structuredClone(obj1);
// - Handles nested objects, arrays, Date, Map, Set, RegExp, etc.
// - Does NOT copy functions or DOM nodes.
// - Available in modern browsers and Node.js 17+.

// Method 2: JSON.parse(JSON.stringify(obj))
// let obj2 = JSON.parse(JSON.stringify(obj1));
// - Works for simple objects.
// - LIMITATIONS:
//   - Loses functions (they become undefined)
//   - Converts Date objects to strings
//   - Cannot handle circular references
//   - Loses undefined, Symbol, Infinity, NaN

// Example of JSON limitations:
// const obj1 = {
//   today: new Date(),
//   greet() { console.log("hi"); },
// };
// const obj2 = JSON.parse(JSON.stringify(obj1));
// console.log(obj2.today);  // string, not a Date object
// console.log(obj2.greet);  // undefined — function is lost!

// Method 3: Lodash _.cloneDeep()
// import _ from "lodash";
// let obj2 = _.cloneDeep(obj1);
// - Handles almost everything (functions, circular refs, special types).
// - Requires installing lodash as a dependency.

// Method 4: Custom recursive deepClone function
// function deepClone(obj) {
//   if (obj === null || typeof obj !== "object") {
//     return obj; // base case: primitives returned as-is
//   }
//   let copy = Array.isArray(obj) ? [] : {};
//   for (let key in obj) {
//     copy[key] = deepClone(obj[key]); // recursively clone each property
//   }
//   return copy;
// }

// const obj1 = { fullname: "vikas", address: { city: "agra" } };
// const obj2 = deepClone(obj1);
// obj2.address.city = "delhi";
// console.log(obj1.address.city); // "agra" — not affected!
// console.log(obj2.address.city); // "delhi"

// ========== 8. SHALLOW COPY WITH ARRAYS ==========

// Arrays with nested objects have the same shallow copy problem.

// let arr1 = [1, 2, { city: "delhi" }];

// Shallow copy methods for arrays:
// const arr2 = [...arr1];        // spread
// const arr2 = arr1.slice();     // slice
// const arr2 = Array.from(arr1); // Array.from

// arr2[2].city = "agra";
// console.log(arr1[2].city); // "agra" — affected! (nested object is shared)

// For deep copy of arrays with nested objects:
// const arr2 = structuredClone(arr1);

// ========== 9. REFERENCE vs VALUE ==========

// Primitives (number, string, boolean, null, undefined, symbol, bigint):
// - Stored directly in variable (stack).
// - Copied by VALUE — changing one doesn't affect the other.
// let a = 10;
// let b = a;
// b = 20;
// console.log(a); // 10 (unchanged)

// Objects (object, array, function):
// - Stored in heap, variable holds a REFERENCE (address).
// - Assignment copies the reference, not the object.
// let obj1 = { name: "vikas" };
// let obj2 = obj1;        // both point to the SAME object
// obj2.name = "akash";
// console.log(obj1.name); // "akash" — both affected!

// ========== 10. DESTRUCTURING OBJECTS ==========

// Extract properties into variables:
// const { fullname, age } = person;
// console.log(fullname); // "vikas thakur"

// With renaming:
// const { fullname: name, age: years } = person;

// With default values:
// const { salary = 0 } = person; // uses 0 if salary doesn't exist

// Nested destructuring:
// const { address: { city } } = obj1;

// ========== 11. OPTIONAL CHAINING & OBJECT ACCESS ==========

// Safely access nested properties:
// console.log(obj1?.address?.city);    // "delhi" or undefined (no error)
// console.log(obj1?.phone?.number);    // undefined (no TypeError)

// ========== 12. COMPUTED PROPERTY NAMES ==========

// Use expressions as keys:
// let key = "email";
// let user = {
//   [key]: "vikas@gmail.com",        // "email": "vikas@gmail.com"
//   ["full" + "Name"]: "Vikas",      // "fullName": "Vikas"
// };

// ========== DEEP COPY METHODS — COMPARISON ==========
// | Method               | Functions | Date  | Circular Ref | Performance |
// |----------------------|-----------|-------|--------------|-------------|
// | structuredClone()    |    ❌     |  ✅   |     ✅       |   Fast      |
// | JSON parse/stringify |    ❌     |  ❌   |     ❌       |   Medium    |
// | lodash _.cloneDeep() |    ✅     |  ✅   |     ✅       |   Medium    |
// | Custom recursive     |    ❌*    |  ❌*  |     ❌*      |   Varies    |
// * Can be extended to handle these cases

// ========== KEY TAKEAWAYS ==========

// 1. Objects are reference types — assignment copies the reference, not the object.
// 2. Shallow copy (spread, Object.assign) — top-level only, nested refs are shared.
// 3. Deep copy (structuredClone, JSON, lodash) — fully independent clone.
// 4. Object.freeze() — fully immutable (shallow). Object.seal() — no add/delete but can modify.
// 5. structuredClone() is the modern recommended way for deep cloning.
// 6. JSON method loses functions, Dates, and special values.
// 7. Always be aware of whether you're working with a reference or a copy.
