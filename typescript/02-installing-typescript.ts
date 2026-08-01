// ============================================
// INSTALLING TYPESCRIPT
// ============================================

// Prerequisites:
// - Node.js must be installed on your system.
// - npm (Node Package Manager) comes with Node.js.

// Step 1: Install TypeScript Globally
// Run in terminal:
// npm install -g typescript

// Step 2: Verify Installation
// Run in terminal:
// tsc --version
// This should print the installed TypeScript version (e.g., Version 5.x.x)

// Step 3: Compile a TypeScript File
// Create a file: hello.ts
// Then run:
// tsc hello.ts
// This generates a hello.js file.

// Step 4: Run the Compiled JavaScript
// node hello.js

// ============================================
// TypeScript Configuration (tsconfig.json)
// ============================================

// Initialize a tsconfig.json file:
// tsc --init

// tsconfig.json is the configuration file for TypeScript projects.
// Common options:
// {
//   "compilerOptions": {
//     "target": "ES6",          // JavaScript version to compile to
//     "module": "commonjs",     // Module system (commonjs, ES6, etc.)
//     "strict": true,           // Enable all strict type-checking options
//     "outDir": "./dist",       // Output directory for compiled files
//     "rootDir": "./src",       // Root directory of source files
//     "esModuleInterop": true,  // Enables interop between CommonJS and ES modules
//     "skipLibCheck": true,     // Skip type checking of declaration files
//     "forceConsistentCasingInFileNames": true
//   },
//   "include": ["src/**/*"],    // Files to include
//   "exclude": ["node_modules"] // Files to exclude
// }

// ============================================
// Running TypeScript Without Compilation
// ============================================

// Using ts-node (runs TypeScript directly):
// npm install -g ts-node
// ts-node hello.ts

// ============================================
// Installing TypeScript Locally (Per Project)
// ============================================

// npm init -y
// npm install typescript --save-dev
// npx tsc --init
// npx tsc          // Compile using local TypeScript

// ============================================
// Watch Mode (Auto-recompile on changes)
// ============================================

// tsc --watch
// or
// tsc -w
// This watches for file changes and recompiles automatically.
