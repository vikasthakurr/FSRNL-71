// ============================================
// THIRD-PARTY PACKAGES IN NODE.JS (figlet)
// ============================================

// Third-party packages are modules created by the community.
// They are hosted on the npm registry (https://www.npmjs.com).
// You install them using npm or yarn.

// ============================================
// Installing a Third-Party Package
// ============================================

// npm install <package-name>    → Install as a dependency
// npm install -D <package-name> → Install as a devDependency
// npm install -g <package-name> → Install globally (CLI tools)

// Example:
// npm install figlet

// After installation:
// - Package is downloaded to node_modules/ folder
// - It's added to "dependencies" in package.json
// - package-lock.json records the exact version installed

// ============================================
// What is figlet?
// ============================================

// figlet is a package that converts text into ASCII art (big decorative text).
// Useful for CLI tools, banners, terminal splash screens.
// npm page: https://www.npmjs.com/package/figlet

// Installation:
// npm install figlet

// ============================================
// Using figlet (ES Module Syntax)
// ============================================

import figlet from "figlet";

// Basic usage with callback
figlet("Hello World", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

// Output:
//  _   _      _ _        __        __         _     _
// | | | | ___| | | ___   \ \      / /__  _ __| | __| |
// | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` |
// |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |
// |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_|

