// ============================================
// MODULES AND IMPORT/EXPORT IN NODE.JS
// ============================================

// Modules help break code into reusable, maintainable pieces.
// Node.js supports two module systems:
// 1. CommonJS (CJS) - the original Node.js way (require/module.exports)
// 2. ES Modules (ESM) - the modern standard (import/export)

// ============================================
// COMMONJS MODULE SYSTEM (require / module.exports)
// ============================================

// This is the default in Node.js (when "type": "module" is NOT in package.json).

// --- math.js (exporting) ---
// function add(a, b) {
//   return a + b;
// }
// function subtract(a, b) {
//   return a - b;
// }
// module.exports = { add, subtract };

// --- app.js (importing) ---
// const { add, subtract } = require("./math.js");
// console.log(add(5, 3));       // 8
// console.log(subtract(10, 4)); // 6

// ============================================
// module.exports vs exports
// ============================================

// module.exports is the actual object that gets exported.
// exports is just a shorthand reference to module.exports.

// ✅ These are equivalent:
// exports.greet = (name) => `Hello, ${name}`;
// module.exports.greet = (name) => `Hello, ${name}`;

// ❌ This BREAKS the reference:
// exports = { greet: (name) => `Hello, ${name}` };
// (Reassigning exports does NOT change module.exports)

// ✅ To export a single thing, use module.exports directly:
// module.exports = class User { ... };
// module.exports = function calculate() { ... };

// ============================================
// ES MODULES (import / export)
// ============================================

// To use ES Modules in Node.js, either:
// 1. Add "type": "module" in package.json, OR
// 2. Use .mjs file extension

// --- Named Exports ---

// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// app.js (importing named exports)
// import { add, subtract, PI } from "./math.js";
// console.log(add(2, 3));  // 5
// console.log(PI);         // 3.14159

// ============================================
// Default Export
// ============================================

// A module can have ONE default export.

// --- logger.js ---
// export default function logger(message) {
//   console.log(`[LOG]: ${message}`);
// }

// --- app.js ---
// import logger from "./logger.js";  // No curly braces for default
// logger("Server started");

// You can name the default import anything:
// import myLogger from "./logger.js";  // ✅ Works

// ============================================
// Mixing Named and Default Exports
// ============================================

// --- utils.js ---
// export default function main() { ... }
// export function helper1() { ... }
// export function helper2() { ... }

// --- app.js ---
// import main, { helper1, helper2 } from "./utils.js";

// ============================================
// Re-exporting (Barrel Files)
// ============================================

// index.js (barrel file - re-exports from multiple modules)
// export { add, subtract } from "./math.js";
// export { default as logger } from "./logger.js";
// export { formatDate } from "./date-utils.js";

// Now consumers import from one place:
// import { add, logger, formatDate } from "./utils/index.js";

// ============================================
// Import All (Namespace Import)
// ============================================

// import * as MathUtils from "./math.js";
// console.log(MathUtils.add(1, 2));
// console.log(MathUtils.PI);

// ============================================
// Dynamic Imports (Lazy Loading)
// ============================================

// Load a module only when needed (returns a Promise):

async function loadModule() {
  const { add } = await import("./math.js");
  console.log(add(10, 20)); // 30
}

// Useful for:
// - Code splitting
// - Conditional loading
// - Loading heavy modules only when needed

// ============================================
// CommonJS vs ES Modules Comparison
// ============================================

// | Feature          | CommonJS (CJS)         | ES Modules (ESM)       |
// |------------------|------------------------|------------------------|
// | Syntax           | require / module.exports| import / export        |
// | Loading          | Synchronous            | Asynchronous           |
// | File extension   | .js (default)          | .mjs or "type":"module"|
// | Top-level await  | ❌ No                  | ✅ Yes                 |
// | Tree-shaking     | ❌ No                  | ✅ Yes                 |
// | Browser support  | ❌ No (Node only)      | ✅ Yes                 |
// | this at top      | module.exports         | undefined              |
// | __dirname        | ✅ Available           | ❌ Not available*      |

// *In ESM, use:
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// ============================================
// Built-in Module Imports
// ============================================

// CommonJS:
// const fs = require("fs");
// const path = require("path");

// ES Modules:
// import fs from "fs";
// import path from "path";

// With node: protocol (recommended in ESM):
// import fs from "node:fs";
// import path from "node:path";
// import { readFile } from "node:fs/promises";

// ============================================
// Practical Example: Organizing a Project
// ============================================

// project/
// ├── package.json        ("type": "module")
// ├── index.js            (entry point)
// ├── src/
// │   ├── controllers/
// │   │   └── userController.js
// │   ├── models/
// │   │   └── userModel.js
// │   ├── utils/
// │   │   ├── helpers.js
// │   │   └── index.js    (barrel file)
// │   └── config.js

// --- src/utils/helpers.js ---
// export function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
//
// export function slugify(str) {
//   return str.toLowerCase().replace(/\s+/g, "-");
// }

// --- src/utils/index.js ---
// export { capitalize, slugify } from "./helpers.js";

// --- index.js ---
// import { capitalize, slugify } from "./src/utils/index.js";
// console.log(capitalize("hello"));  // "Hello"
// console.log(slugify("Hello World")); // "hello-world"

// ============================================
// Summary
// ============================================

// - CommonJS: require() / module.exports — synchronous, Node.js default.
// - ES Modules: import / export — async, modern standard, tree-shakable.
// - Use "type": "module" in package.json to enable ESM.
// - Named exports: export function foo() {} → import { foo } from "...";
// - Default export: export default foo → import foo from "...";
// - Barrel files (index.js) consolidate exports from multiple modules.
// - Dynamic import: await import("./module.js") for lazy loading.
// - In ESM, use import.meta.url instead of __dirname/__filename.
// - Prefer ESM for new projects (better browser support, tree-shaking).
