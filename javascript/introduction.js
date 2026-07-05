// JAVASCRIPT - INTRODUCTION, HISTORY & DEFINITION (In Depth)

// 1. What is JavaScript?

// JavaScript is a high-level, interpreted (or JIT-compiled), dynamic,
// weakly-typed, multi-paradigm programming language.

// It is one of the three core technologies of the World Wide Web:
//   1. HTML  → Structure (content)
//   2. CSS   → Presentation (styling)
//   3. JS    → Behavior (interactivity & logic)

// JavaScript allows us to:
//   - Manipulate the DOM (Document Object Model)
//   - Handle user events (click, scroll, keypress, etc.)
//   - Make asynchronous network requests (AJAX, Fetch API)
//   - Build full-stack applications (Node.js on the server)
//   - Create mobile apps (React Native, Ionic)
//   - Build desktop apps (Electron)
//   - Develop games, animations, and more

// 2. History of JavaScript

// --- 1995: The Birth ---
// - Created by Brendan Eich at Netscape Communications in just 10 days.
// - Originally named "Mocha", then renamed to "LiveScript".
// - Finally renamed to "JavaScript" as a marketing strategy to ride
//   the popularity of Java (though JS and Java are completely different).
// - Released with Netscape Navigator 2.0 in December 1995.

// --- 1996: Microsoft Enters ---
// - Microsoft reverse-engineered JavaScript and created "JScript"
//   for Internet Explorer 3.0.
// - This led to browser incompatibility issues (the "Browser Wars").

// --- 1997: ECMAScript Standardization ---
// - Netscape submitted JavaScript to ECMA International for standardization.
// - The standard was named "ECMAScript" (ECMA-262).
// - ECMAScript 1 (ES1) was released in June 1997.

// --- 1998: ES2 ---
// - Minor editorial changes to align with ISO/IEC 16262 standard.

// --- 1999: ES3 ---
// - Major update: Regular expressions, try/catch, better string handling,
//   do-while, switch, and more.
// - This version dominated the web for nearly a decade.

// --- 2000-2008: The "Dark Ages" & ES4 Abandonment ---
// - ES4 was proposed with massive changes (classes, modules, types, etc.)
// - Due to political disagreements between TC39 members (Microsoft vs others),
//   ES4 was abandoned.
// - Meanwhile, AJAX (2005) revolutionized web development.
//   (Gmail, Google Maps showed the power of async JS)

// --- 2009: ES5 ---
// - A compromise release after ES4's failure.
// - Added: strict mode, JSON support, Array methods (forEach, map, filter,
//   reduce, etc.), Object.keys(), getters/setters, and more.

// --- 2015: ES6 / ES2015 (The Game Changer) ---
// - The biggest update in JavaScript history.
// - Added: let/const, arrow functions, classes, template literals,
//   destructuring, spread/rest operators, Promises, modules (import/export),
//   Symbol, Map/Set, iterators, generators, default parameters, and more.
// - From this point, ECMAScript adopted yearly releases (ES2016, ES2017...).

// --- 2016: ES7 / ES2016 ---
// - Array.prototype.includes()
// - Exponentiation operator (**)

// --- 2017: ES8 / ES2017 ---
// - async/await (revolutionary for handling asynchronous code)
// - Object.values(), Object.entries()
// - String padding (padStart, padEnd)
// - SharedArrayBuffer and Atomics

// --- 2018: ES9 / ES2018 ---
// - Rest/Spread properties for objects
// - Asynchronous iteration (for-await-of)
// - Promise.finally()
// - RegExp improvements

// --- 2019: ES10 / ES2019 ---
// - Array.flat(), Array.flatMap()
// - Object.fromEntries()
// - Optional catch binding
// - String.trimStart(), String.trimEnd()

// --- 2020: ES11 / ES2020 ---
// - Optional chaining (?.)
// - Nullish coalescing operator (??)
// - BigInt
// - Promise.allSettled()
// - globalThis
// - Dynamic import()

// --- 2021: ES12 / ES2021 ---
// - String.replaceAll()
// - Promise.any()
// - Logical assignment operators (&&=, ||=, ??=)
// - WeakRef and FinalizationRegistry

// --- 2022: ES13 / ES2022 ---
// - Top-level await
// - Class fields (public & private)
// - .at() method for arrays and strings
// - Object.hasOwn()
// - RegExp match indices (/d flag)

// --- 2023: ES14 / ES2023 ---
// - Array findLast(), findLastIndex()
// - Hashbang (#!) grammar
// - Symbols as WeakMap keys
// - Change Array by copy (toSorted, toReversed, toSpliced, with)

// --- 2024: ES15 / ES2024 ---
// - Object.groupBy(), Map.groupBy()
// - Promise.withResolvers()
// - ArrayBuffer transfer
// - Well-formed Unicode strings

// 3. Key Characteristics of JavaScript

// a) Interpreted / JIT-Compiled:
//    - JS engines (V8, SpiderMonkey, JavaScriptCore) use Just-In-Time
//      compilation for performance, but code is not pre-compiled like C/C++.

// b) Dynamically Typed:
//    - Variables don't have fixed types. A variable can hold a number,
//      then a string, then an object — no type declaration needed.
//    let x = 10;      // number
//    x = "hello";     // now it's a string — no error!

// c) Single-Threaded with Event Loop:
//    - JS runs on a single thread but handles concurrency via the
//      event loop, callback queue, and microtask queue.
//    - This makes it non-blocking and asynchronous.

// d) Multi-Paradigm:
//    - Supports Object-Oriented Programming (prototypal inheritance)
//    - Supports Functional Programming (first-class functions, closures)
//    - Supports Event-Driven Programming
//    - Supports Imperative and Declarative styles

// e) Prototype-Based Inheritance:
//    - Unlike classical OOP (Java, C++), JS uses prototypes.
//    - Every object has a hidden [[Prototype]] link to another object.

// f) First-Class Functions:
//    - Functions are treated as values — they can be assigned to variables,
//      passed as arguments, and returned from other functions.

// g) Platform Independent:
//    - Runs in browsers (client-side), servers (Node.js), mobile (React Native),
//      desktop (Electron), IoT devices, and more.

// 4. JavaScript Engines

// Every browser has its own JS engine:
//   - V8          → Google Chrome, Node.js, Deno, Microsoft Edge
//   - SpiderMonkey → Mozilla Firefox (first ever JS engine by Brendan Eich)
//   - JavaScriptCore (Nitro) → Apple Safari
//   - Chakra      → Old Microsoft Edge (now replaced by V8)

// These engines:
//   1. Parse the code → Abstract Syntax Tree (AST)
//   2. Compile → Bytecode / Machine Code (JIT)
//   3. Execute → Run the optimized code
//   4. Optimize → Re-compile hot functions for better performance

// 5. JavaScript Runtime Environments

// a) Browser Runtime:
//    - Provides: DOM API, BOM (Browser Object Model), Fetch API,
//      Web Storage, Canvas, WebSockets, etc.
//    - window is the global object.

// b) Node.js Runtime:
//    - Created by Ryan Dahl in 2009 using Chrome's V8 engine.
//    - Provides: File system (fs), HTTP module, Streams, Buffers,
//      child_process, etc.
//    - global (or globalThis) is the global object.
//    - Allows JS to run on the server side.

// c) Deno Runtime:
//    - Created by Ryan Dahl in 2018 (to fix Node.js design mistakes).
//    - Secure by default, supports TypeScript out of the box.

// d) Bun Runtime:
//    - A newer, faster JS runtime (2022) focused on speed and DX.
//    - Built on JavaScriptCore (Safari's engine).

// 6. Why JavaScript is Important

// - It is the ONLY language that runs natively in all web browsers.
// - Used by 98%+ of all websites for client-side scripting.
// - Most popular programming language (Stack Overflow surveys).
// - Massive ecosystem: npm has 2M+ packages.
// - Full-stack capability: Frontend + Backend with one language.
// - Community: One of the largest and most active developer communities.
// - Job market: Consistently in top demand for developers worldwide.

// 7. JavaScript vs Java (Common Confusion)

// | Feature        | JavaScript              | Java                    |
// |----------------|-------------------------|-------------------------|
// | Type System    | Dynamic, weak           | Static, strong          |
// | Compilation    | Interpreted / JIT       | Compiled to bytecode    |
// | OOP Model      | Prototype-based         | Class-based             |
// | Usage          | Web, server, mobile     | Enterprise, Android     |
// | Concurrency    | Single-threaded + Event | Multi-threaded          |
// | Creator        | Brendan Eich (Netscape) | James Gosling (Sun)     |
// | Year           | 1995                    | 1995                    |
// | Relation       | NO relation to Java     | NO relation to JS       |

// The name "JavaScript" was purely a marketing decision by Netscape
// to capitalize on Java's popularity at the time.

// 8. Summary Timeline

// 1995 → JavaScript created (Brendan Eich, 10 days, Netscape)
// 1996 → JScript by Microsoft (IE3)
// 1997 → ECMAScript 1 standardized (ECMA-262)
// 1999 → ES3 (regex, try/catch)
// 2005 → AJAX revolution (Web 2.0)
// 2009 → ES5 (strict mode, JSON, array methods) + Node.js released
// 2015 → ES6/ES2015 (let/const, arrow fn, classes, promises, modules)
// 2016+ → Yearly releases (ES2016, ES2017, ... ES2024)
// Today → JS powers the entire web and beyond
