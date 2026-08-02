// ============================================
// INTRODUCTION TO NODE.JS AND ITS WORKING
// ============================================

// ============================================
// What is Node.js?
// ============================================

// - Node.js is a JavaScript runtime built on Chrome's V8 engine.
// - It allows you to run JavaScript OUTSIDE the browser (on servers, CLI tools, etc.).
// - Created by Ryan Dahl in 2009.
// - It is NOT a framework or library — it's a runtime environment.
// - Uses an event-driven, non-blocking I/O model (asynchronous by default).

// ============================================
// Why Node.js?
// ============================================

// - Full-stack JavaScript (same language on frontend and backend).
// - Extremely fast (V8 compiles JS to machine code).
// - Non-blocking I/O makes it great for handling many concurrent connections.
// - Huge ecosystem via npm (Node Package Manager).
// - Great for APIs, real-time apps (chat, streaming), microservices.

// ============================================
// How Node.js Works Internally
// ============================================

// 1. V8 Engine
//    - Google's open-source JS engine (written in C++).
//    - Compiles JavaScript directly to native machine code.
//    - Same engine that powers Google Chrome.

// 2. Single-Threaded Event Loop
//    - Node.js runs on a SINGLE thread (unlike traditional servers like Apache).
//    - Uses an event loop to handle multiple requests concurrently.
//    - Does NOT create a new thread for every request.

// 3. Non-Blocking I/O
//    - I/O operations (file read, database query, API call) are offloaded.
//    - While waiting for I/O, Node.js continues processing other requests.
//    - When I/O completes, a callback is triggered.

// 4. libuv
//    - A C library that provides the event loop and async I/O.
//    - Manages a thread pool (default 4 threads) for heavy tasks.
//    - Handles file system, DNS, networking operations.

// ============================================
// Event Loop - How It Works
// ============================================

//  ┌───────────────────────────┐
//  │        Call Stack          │  ← Executes synchronous code
//  └───────────────────────────┘
//               │
//               ▼
//  ┌───────────────────────────┐
//  │       Event Loop           │  ← Checks if async tasks are done
//  └───────────────────────────┘
//               │
//               ▼
//  ┌───────────────────────────┐
//  │     Callback Queue         │  ← Completed async callbacks wait here
//  └───────────────────────────┘

// Event Loop Phases:
// 1. Timers        - executes setTimeout, setInterval callbacks
// 2. Pending       - I/O callbacks deferred from previous cycle
// 3. Idle/Prepare  - internal use only
// 4. Poll          - retrieves new I/O events, executes I/O callbacks
// 5. Check         - executes setImmediate() callbacks
// 6. Close         - executes close event callbacks (socket.on('close'))

// ============================================
// Blocking vs Non-Blocking Code
// ============================================

const fs = require("fs");

// ❌ Blocking (Synchronous) - Blocks the entire thread
// const data = fs.readFileSync("./package.json", "utf-8");
// console.log(data);
// console.log("This runs AFTER file is read");

// ✅ Non-Blocking (Asynchronous) - Does not block
fs.readFile("./package.json", "utf-8", (err, data) => {
  if (err) {
    console.log("Error:", err);
    return;
  }
  console.log("File content:", data);
});
console.log("This runs BEFORE file is read (non-blocking)");

// ============================================
// Node.js Built-in Modules
// ============================================

// Node.js comes with many built-in modules (no installation needed):
// - fs          → File system operations (read, write, delete files)
// - path        → Handle file paths
// - http        → Create HTTP servers
// - https       → Create HTTPS servers
// - os          → Operating system info
// - events      → Event emitter pattern
// - url         → URL parsing
// - crypto      → Cryptography (hashing, encryption)
// - stream      → Handle streaming data
// - buffer      → Handle binary data
// - child_process → Spawn child processes
// - util        → Utility functions

// ============================================
// Basic Examples
// ============================================

// OS Module
const os = require("os");
console.log("Platform:", os.platform());    // "darwin", "win32", "linux"
console.log("Architecture:", os.arch());    // "x64", "arm64"
console.log("CPUs:", os.cpus().length);     // Number of CPU cores
console.log("Free Memory:", (os.freemem() / 1024 / 1024).toFixed(2), "MB");
console.log("Home Dir:", os.homedir());

// Path Module
const path = require("path");
console.log("Basename:", path.basename("/users/vikas/file.js")); // "file.js"
console.log("Extension:", path.extname("app.ts"));               // ".ts"
console.log("Join:", path.join(__dirname, "files", "data.json"));
console.log("Resolve:", path.resolve("src", "index.js"));

// ============================================
// Creating a Simple HTTP Server
// ============================================

const http = require("http");

const server = http.createServer((req, res) => {
  // req = request object (what the client sends)
  // res = response object (what we send back)

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello from Node.js!</h1>");
  } else if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello API" }));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }
});

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// ============================================
// Global Objects in Node.js
// ============================================

// Node.js has global objects (different from browser's window/document):
console.log(__dirname);   // Absolute path of current directory
console.log(__filename);  // Absolute path of current file
console.log(process.pid); // Process ID
console.log(process.cwd()); // Current working directory
// console.log(process.env);   // Environment variables
// console.log(process.argv);  // Command line arguments

// process.exit(0); // Exit the process

// ============================================
// npm (Node Package Manager)
// ============================================

// npm comes bundled with Node.js.
// It's the world's largest software registry.

// Common npm commands:
// npm init              → Initialize a new project (creates package.json)
// npm init -y           → Initialize with defaults
// npm install <pkg>     → Install a package (adds to node_modules)
// npm install           → Install all dependencies from package.json
// npm install -D <pkg>  → Install as devDependency
// npm install -g <pkg>  → Install globally
// npm uninstall <pkg>   → Remove a package
// npm update            → Update packages
// npm list              → List installed packages
// npm run <script>      → Run a script from package.json

// ============================================
// package.json Explained
// ============================================

// {
//   "name": "my-app",           → Project name
//   "version": "1.0.0",         → Version (semver)
//   "description": "...",       → Project description
//   "main": "index.js",         → Entry point
//   "type": "module",           → Enable ES modules (import/export)
//   "scripts": { ... },         → Custom commands (npm run <name>)
//   "dependencies": { ... },    → Production dependencies
//   "devDependencies": { ... }, → Development-only dependencies
//   "keywords": [...],          → Search keywords
//   "author": "...",            → Author name
//   "license": "ISC"            → License type
// }

// ============================================
// Node.js vs Browser
// ============================================

// | Feature         | Browser             | Node.js            |
// |-----------------|---------------------|--------------------|
// | DOM access      | ✅ Yes              | ❌ No              |
// | window object   | ✅ Yes              | ❌ No              |
// | global object   | window              | global / globalThis|
// | File system     | ❌ No               | ✅ Yes (fs module) |
// | HTTP server     | ❌ No               | ✅ Yes (http)      |
// | Module system   | ES Modules          | CommonJS + ESM     |
// | Use case        | Frontend UI         | Backend / CLI      |

// ============================================
// Summary
// ============================================

// - Node.js = JavaScript runtime on V8 engine (outside the browser).
// - Single-threaded + event loop + non-blocking I/O = handles many connections.
// - libuv provides the event loop and thread pool for heavy tasks.
// - Built-in modules: fs, path, http, os, crypto, events, etc.
// - npm manages packages; package.json defines project metadata.
// - Global objects: __dirname, __filename, process, global.
// - Non-blocking code (callbacks, promises, async/await) is preferred.
