// How JavaScript Runs - V8 Engine, Node.js Architecture & Worker Threads

// 1. How JavaScript Runs in the Browser (V8 Engine)

// The V8 engine (developed by Google for Chrome) is responsible for
// executing JavaScript. Here's how it works step by step:

// Step 1: Parsing
//   - The JS source code is first parsed by the "Parser".
//   - It performs lexical analysis (tokenizing) and syntax analysis.
//   - Output: Abstract Syntax Tree (AST)
//     Example: `let x = 5 + 3;` becomes a tree of nodes representing
//     variable declaration, binary expression, etc.

// Step 2: Ignition (Interpreter)
//   - The AST is passed to "Ignition", V8's interpreter.
//   - Ignition converts AST into Bytecode (intermediate representation).
//   - Bytecode is executed line by line — this is fast to start but not
//     fully optimized.

// Step 3: TurboFan (Optimizing Compiler / JIT)
//   - While Ignition runs, V8 monitors "hot" functions (frequently called).
//   - Hot functions are sent to "TurboFan", the optimizing compiler.
//   - TurboFan compiles bytecode into highly optimized Machine Code.
//   - This machine code runs directly on the CPU — much faster.
//   - If assumptions made during optimization are wrong (deoptimization),
//     V8 falls back to bytecode.

// Step 4: Garbage Collection (Orinoco)
//   - V8 uses a generational garbage collector called "Orinoco".
//   - It has two heaps:
//     a) Young Generation (short-lived objects) — uses Scavenger (minor GC)
//     b) Old Generation (long-lived objects) — uses Mark-Sweep-Compact (major GC)
//   - GC runs concurrently and incrementally to avoid blocking the main thread.

// V8 Pipeline Summary:
//   Source Code → Parser → AST → Ignition (Bytecode) → TurboFan (Machine Code)
//                                      ↑                        |
//                                      |--- Deoptimization ←----|

// 2. JavaScript is Single-Threaded (in the Browser)

// - JS has ONE call stack (single thread of execution).
// - It can only do one thing at a time.
// - But browsers provide Web APIs (setTimeout, fetch, DOM events, etc.)
//   that run in separate threads managed by the browser.

// How async works in the browser:
//   - Call Stack: Executes synchronous code
//   - Web APIs: Browser-provided async operations (separate threads)
//   - Callback Queue (Task Queue): Holds callbacks ready to execute
//   - Microtask Queue: Holds Promise callbacks (.then, .catch, async/await)
//   - Event Loop: Checks if call stack is empty, then pushes from queues

// Execution Priority:
//   1. Call Stack (synchronous code)
//   2. Microtask Queue (Promises, queueMicrotask, MutationObserver)
//   3. Callback Queue / Task Queue (setTimeout, setInterval, I/O)
//   4. requestAnimationFrame (before repaint)

// Example:
console.log("1"); // → Call Stack (runs first)
setTimeout(() => console.log("2"), 0); // → Task Queue (runs last)
Promise.resolve().then(() => console.log("3")); // → Microtask Queue (runs second)
console.log("4"); // → Call Stack (runs first)
// Output: 1, 4, 3, 2

// 3. How JavaScript Runs in Node.js (Different Architecture)

// Node.js is NOT a browser. It's a runtime built on V8 + libuv.
// It allows JS to run on the server with access to file system, network, etc.

// Node.js Architecture:
//
//   Your JS Code
//       |
//       V
//   ┌──────────────────────────────┐
//   │         V8 Engine            │  ← Executes JS (same as Chrome)
//   └──────────────────────────────┘
//       |
//       V
//   ┌──────────────────────────────┐
//   │     Node.js Bindings         │  ← C++ bindings (bridge between JS & C++)
//   │     (Node API / N-API)       │
//   └──────────────────────────────┘
//       |
//       V
//   ┌──────────────────────────────┐
//   │          libuv               │  ← Async I/O library (written in C)
//   │  (Event Loop + Thread Pool)  │
//   └──────────────────────────────┘
//       |
//       V
//   ┌──────────────────────────────┐
//   │    Operating System (OS)     │  ← File system, Network, DNS, etc.
//   └──────────────────────────────┘

// Key Differences from Browser:
//   - No DOM, no window object
//   - Has global object (globalThis)
//   - Has access to file system (fs), network (http/net), OS, child processes
//   - Uses libuv for async operations instead of Web APIs
//   - Has its own module system (CommonJS: require/module.exports, ESM: import/export)

// 4. Node.js Event Loop (libuv) — Different from Browser Event Loop

// Node.js event loop has multiple phases (unlike the simpler browser model):

// Phase 1: Timers
//   - Executes callbacks from setTimeout() and setInterval()

// Phase 2: Pending Callbacks
//   - Executes I/O callbacks deferred from the previous cycle
//   (e.g., some TCP errors)

// Phase 3: Idle / Prepare
//   - Internal use only (used by Node.js internally)

// Phase 4: Poll
//   - Retrieves new I/O events
//   - Executes I/O-related callbacks (file read, network request, etc.)
//   - If no timers are scheduled, it will wait here for new events

// Phase 5: Check
//   - Executes setImmediate() callbacks
//   - setImmediate() runs AFTER the poll phase (different from setTimeout)

// Phase 6: Close Callbacks
//   - Executes close event callbacks (e.g., socket.on('close'))

// Between each phase:
//   - process.nextTick() callbacks run (highest priority, before microtasks)
//   - Promise microtasks run

// Priority in Node.js:
//   1. process.nextTick()
//   2. Promise microtasks (.then, async/await)
//   3. Timers (setTimeout, setInterval)
//   4. I/O callbacks (poll phase)
//   5. setImmediate() (check phase)
//   6. Close callbacks

// Example:
setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));
// Output: nextTick, Promise, setTimeout, setImmediate
// (setTimeout vs setImmediate order can vary in the main module)

// 5. libuv Thread Pool

// - libuv provides a thread pool (default: 4 threads) for expensive operations
//   that can't be handled asynchronously by the OS.
// - Operations that use the thread pool:
//   - File system operations (fs.readFile, fs.writeFile, etc.)
//   - DNS lookups (dns.lookup)
//   - Crypto operations (crypto.pbkdf2, crypto.randomBytes)
//   - Zlib compression

// - Operations that DON'T use thread pool (handled by OS directly):
//   - Network I/O (TCP/UDP sockets, HTTP requests)
//   - Pipes
//   - DNS resolving via dns.resolve (uses c-ares library)

// You can increase the thread pool size:
//   process.env.UV_THREADPOOL_SIZE = 8; // max recommended: 128

// Important: The thread pool is for C++ level operations.
// JavaScript code still runs on a single thread.

// 6. Worker Threads in Node.js

// Problem: JavaScript is single-threaded. CPU-intensive tasks
// (image processing, complex calculations, data parsing) block the
// event loop and make the server unresponsive.

// Solution: Worker Threads (introduced in Node.js v10.5, stable in v12)

// What are Worker Threads?
// - They allow running JavaScript in parallel threads.
// - Each worker has its own V8 instance, event loop, and memory.
// - Workers can communicate with the main thread via message passing.
// - They share memory using SharedArrayBuffer (if needed).

// How Worker Threads Differ from Child Processes:
// | Feature            | Worker Threads          | Child Processes (fork)   |
// |--------------------|-------------------------|--------------------------|
// | Memory             | Same process, can share | Separate process memory  |
// | Overhead           | Lightweight             | Heavy (new process)      |
// | Communication      | MessagePort (fast)      | IPC (slower)             |
// | Use Case           | CPU-intensive JS tasks  | Isolating entire apps    |
// | V8 Instance        | Separate per worker     | Separate per process     |
// | Event Loop         | Separate per worker     | Separate per process     |

// Basic Worker Thread Example:

// main.js (Main Thread)
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  // This code runs in the main thread
  console.log("Main thread started");

  const worker = new Worker(__filename, {
    workerData: { num: 40 }, // pass data to worker
  });

  // Listen for messages from worker
  worker.on("message", (result) => {
    console.log(`Result from worker: ${result}`);
  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);
  });

  worker.on("exit", (code) => {
    console.log(`Worker exited with code ${code}`);
  });
} else {
  // This code runs inside the worker thread
  const { num } = workerData;

  // CPU-intensive task (e.g., fibonacci)
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  const result = fibonacci(num);
  parentPort.postMessage(result); // send result back to main thread
}

// 7. Worker Thread Communication Patterns

// a) Simple Message Passing:
//    - Main sends data via workerData (one-time at creation)
//    - Ongoing communication via worker.postMessage() and parentPort.postMessage()

// b) SharedArrayBuffer (Shared Memory):
//    - Allows multiple threads to read/write the same memory
//    - Must use Atomics for thread-safe operations
//    - Avoids copying data between threads (faster for large datasets)

// Example with SharedArrayBuffer:
// const sharedBuffer = new SharedArrayBuffer(4); // 4 bytes
// const sharedArray = new Int32Array(sharedBuffer);
// Atomics.store(sharedArray, 0, 42);  // thread-safe write
// Atomics.load(sharedArray, 0);       // thread-safe read

// c) MessageChannel:
//    - Create custom communication channels between workers
//    - Useful when you have multiple workers that need to talk to each other

// d) Transferable Objects:
//    - Transfer ownership of ArrayBuffer to worker (zero-copy)
//    - Original thread loses access after transfer
//    worker.postMessage(buffer, [buffer]); // transfer, not copy

// 8. When to Use Worker Threads

// USE worker threads for:
//   - Heavy computations (fibonacci, prime numbers, sorting large arrays)
//   - Image/video processing
//   - Data encryption/decryption
//   - Parsing large JSON/CSV files
//   - Machine learning inference
//   - Any CPU-bound task that takes > 50ms

// DON'T use worker threads for:
//   - I/O operations (file reads, HTTP requests) — event loop handles these fine
//   - Simple async tasks — Promises/async-await are sufficient
//   - Tasks that need DOM access (workers don't have DOM)

// 9. Worker Thread Pool Pattern

// Creating workers is expensive. For repeated tasks, use a pool:

// const { Worker } = require('worker_threads');

// class WorkerPool {
//     constructor(workerFile, poolSize) {
//         this.workers = [];
//         this.queue = [];
//         for (let i = 0; i < poolSize; i++) {
//             this.workers.push({ worker: new Worker(workerFile), busy: false });
//         }
//     }
//
//     runTask(data) {
//         return new Promise((resolve, reject) => {
//             const available = this.workers.find(w => !w.busy);
//             if (available) {
//                 available.busy = true;
//                 available.worker.postMessage(data);
//                 available.worker.once('message', (result) => {
//                     available.busy = false;
//                     resolve(result);
//                     this.processQueue();
//                 });
//             } else {
//                 this.queue.push({ data, resolve, reject });
//             }
//         });
//     }
//
//     processQueue() {
//         if (this.queue.length > 0) {
//             const { data, resolve, reject } = this.queue.shift();
//             this.runTask(data).then(resolve).catch(reject);
//         }
//     }
// }

// 10. Comparison: Browser JS vs Node.js JS Execution

// | Aspect              | Browser                    | Node.js                    |
// |---------------------|----------------------------|----------------------------|
// | Engine              | V8 (Chrome), SpiderMonkey  | V8                         |
// | Global Object       | window                     | global / globalThis        |
// | Async Provider      | Web APIs                   | libuv (C library)          |
// | Thread Pool         | No (Web Workers instead)   | Yes (libuv, 4 threads)     |
// | Event Loop Phases   | Simple (macro + micro)     | 6 phases (timers, poll...) |
// | DOM Access          | Yes                        | No                         |
// | File System         | No (limited via File API)  | Yes (fs module)            |
// | Parallel JS         | Web Workers                | Worker Threads             |
// | Module System       | ES Modules (import/export) | CJS + ESM both supported   |
// | Top-level await     | Yes (in modules)           | Yes (in ESM, Node 14.8+)  |

// 11. Summary

// - V8 Engine: Parser → AST → Ignition (Bytecode) → TurboFan (Machine Code)
// - Browser: Single thread + Web APIs + Event Loop (microtask + task queue)
// - Node.js: Single thread + libuv + 6-phase Event Loop + Thread Pool
// - libuv Thread Pool: For file I/O, DNS lookup, crypto (default 4 threads)
// - Worker Threads: True parallelism for CPU-intensive JavaScript tasks
// - Workers have their own V8 instance, event loop, and memory
// - Communicate via message passing or SharedArrayBuffer
// - Use worker pools for repeated CPU tasks to avoid creation overhead
