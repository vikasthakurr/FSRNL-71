// CALLBACKS IN JAVASCRIPT - ADVANCED NOTES

// 1. What is a Callback?
// A callback is a function passed as an argument to another function,
// which is then invoked (called back) at a later point in time.
// JavaScript treats functions as first-class citizens, meaning they
// can be stored in variables, passed as arguments, and returned from functions.

// Simple example:
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Vikas", function () {
  console.log("This runs after greeting!");
});

// 2. Synchronous vs Asynchronous Callbacks

// Synchronous Callback -
// Executes immediately within the calling function (blocking)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function (num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]
// .map(), .filter(), .forEach() all use synchronous callbacks

// Asynchronous Callback -
// Executes later, after some async operation completes (non-blocking)
console.log("Start");
setTimeout(function () {
  console.log("This runs after 2 seconds");
}, 2000);
console.log("End");
// Output: Start -> End -> This runs after 2 seconds

// 3. Why Callbacks are Needed
// JavaScript is single-threaded and non-blocking.
// Callbacks help us handle tasks that take time:
//   - API calls / Network requests
//   - File reading/writing (Node.js)
//   - Timers (setTimeout, setInterval)
//   - Event listeners (click, scroll, etc.)
//   - Database queries

// 4. Callback Patterns

// Pattern 1: Error-First Callback (Node.js Convention)
// The first argument of the callback is reserved for an error object.
// If no error, it's null. This is the standard in Node.js.

function readFile(filename, callback) {
  setTimeout(() => {
    if (!filename) {
      callback(new Error("Filename is required"), null);
      return;
    }
    callback(null, "File content of " + filename);
  }, 1000);
}

readFile("data.txt", function (err, data) {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Success:", data);
});

readFile("", function (err, data) {
  if (err) {
    console.error("Error:", err.message); // Error: Filename is required
    return;
  }
  console.log(data);
});

// Pattern 2: Event-based Callbacks
// document.getElementById("btn").addEventListener("click", function(event) {
//   console.log("Button clicked!", event.target);
// });

// Pattern 3: Higher-Order Function Callbacks
// Functions that accept or return other functions
function operate(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(operate(5, 3, add)); // 8
console.log(operate(5, 3, multiply)); // 15

// 5. Callback Hell (Pyramid of Doom)
// When callbacks are nested inside callbacks, code becomes:
//   - Hard to read
//   - Hard to debug
//   - Hard to maintain
//   - Error handling becomes repetitive

// Example of Callback Hell:
function step1(cb) {
  setTimeout(() => {
    console.log("Step 1 complete");
    cb();
  }, 1000);
}

function step2(cb) {
  setTimeout(() => {
    console.log("Step 2 complete");
    cb();
  }, 1000);
}

function step3(cb) {
  setTimeout(() => {
    console.log("Step 3 complete");
    cb();
  }, 1000);
}

function step4(cb) {
  setTimeout(() => {
    console.log("Step 4 complete");
    cb();
  }, 1000);
}

// The Pyramid of Doom:
step1(() => {
  step2(() => {
    step3(() => {
      step4(() => {
        console.log("All steps done!"); // deeply nested = hard to manage
      });
    });
  });
});

// 6. Inversion of Control (IoC) Problem
// When you pass a callback to a third-party function, you lose control:
//   - Will it call your callback?
//   - Will it call it multiple times?
//   - Will it call it with the right arguments?
//   - Will it handle errors properly?
//   - Will it call it too early or too late?

// Example of the problem:
function thirdPartyPayment(amount, onSuccess) {
  // You have NO control over how this library calls your callback
  // It might call onSuccess twice (double charge!)
  // It might never call it (payment stuck)
  // It might call it synchronously instead of async
  onSuccess(); // called once
  onSuccess(); // BUG: called again! double execution
}

// This is why Promises were introduced - they solve IoC by guaranteeing:
// - resolved/rejected only ONCE
// - immutable once settled
// - always async

// 7. Solutions to Callback Hell

// Solution 1: Named Functions (Extract & Flatten)
function onStep1Done() {
  step2(onStep2Done);
}
function onStep2Done() {
  step3(onStep3Done);
}
function onStep3Done() {
  step4(onStep4Done);
}
function onStep4Done() {
  console.log("All done with named functions!");
}
step1(onStep1Done);

// Solution 2: Modularize (split into separate modules/files)
// Break callbacks into separate functions in different files
// and import them as needed.

// Solution 3: Use Promises (ES6+)
// function step1() {
//   return new Promise((resolve) => {
//     setTimeout(() => { console.log("Step 1"); resolve(); }, 1000);
//   });
// }
// step1().then(step2).then(step3).then(step4);

// Solution 4: Use Async/Await (ES2017+)
// async function runSteps() {
//   await step1();
//   await step2();
//   await step3();
//   await step4();
// }

// 8. Real-World Callback Examples

// Example 1: Simulating API Call
function fetchUserData(userId, callback) {
  console.log("Fetching user data...");
  setTimeout(() => {
    const user = { id: userId, name: "Vikas", role: "Developer" };
    callback(null, user);
  }, 1500);
}

fetchUserData(101, function (err, user) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("User fetched:", user);
});

// Example 2: Retry Pattern with Callbacks
function fetchWithRetry(url, retries, callback) {
  function attempt(remainingRetries) {
    simulateRequest(url, function (err, data) {
      if (err && remainingRetries > 0) {
        console.log(`Retrying... (${remainingRetries} left)`);
        attempt(remainingRetries - 1);
      } else if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
  attempt(retries);
}

function simulateRequest(url, cb) {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) cb(null, { data: "Response from " + url });
    else cb(new Error("Request failed"), null);
  }, 500);
}

fetchWithRetry("https://api.example.com", 3, function (err, data) {
  if (err) console.error("Final error:", err.message);
  else console.log("Success:", data);
});

// Example 3: Callback with Closure
function counter(initialValue) {
  let count = initialValue;
  return {
    increment: function (cb) {
      count++;
      cb(count);
    },
    decrement: function (cb) {
      count--;
      cb(count);
    },
  };
}

const myCounter = counter(0);
myCounter.increment((val) => console.log("Count:", val)); // Count: 1
myCounter.increment((val) => console.log("Count:", val)); // Count: 2
myCounter.decrement((val) => console.log("Count:", val)); // Count: 1

// 9. Callback vs Promise vs Async/Await - Comparison

// Callback Style:
// getData(function(err, a) {
//   getMoreData(a, function(err, b) {
//     getEvenMoreData(b, function(err, c) {
//       console.log(a, b, c);
//     });
//   });
// });

// Promise Style:
// getData()
//   .then(a => getMoreData(a))
//   .then(b => getEvenMoreData(b))
//   .then(c => console.log(c))
//   .catch(err => console.error(err));

// Async/Await Style:
// async function fetchAll() {
//   try {
//     const a = await getData();
//     const b = await getMoreData(a);
//     const c = await getEvenMoreData(b);
//     console.log(a, b, c);
//   } catch(err) {
//     console.error(err);
//   }
// }

// 10. Advanced Concepts

// Debounce (uses callbacks internally)
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debouncedLog = debounce((msg) => console.log(msg), 300);
debouncedLog("Hello");
debouncedLog("Hello Again");
debouncedLog("Final Hello"); // only this last one fires after 300ms

// Throttle (uses callbacks internally)
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Promisifying a Callback Function
// Converting callback-based function to promise-based
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };
}

const readFilePromise = promisify(readFile);
readFilePromise("notes.txt")
  .then((data) => console.log("Promisified:", data))
  .catch((err) => console.error("Promisified Error:", err.message));

// 11. Key Takeaways
// - Callbacks are the foundation of async JavaScript
// - They enable non-blocking code execution
// - Error-first pattern (err, data) is the Node.js standard
// - Callback hell makes code unreadable - use named functions or Promises
// - Inversion of Control is the fundamental trust issue with callbacks
// - Promises and async/await are built ON TOP of callbacks
// - Understanding callbacks deeply is essential before moving to Promises
// - Debounce, throttle, event listeners all use callback patterns
// - util.promisify() in Node.js converts callback functions to Promises

// 12. Original Example - Maggi Making (Callback Hell Demo)

function MakeMaggi(yupee, cb) {
  setTimeout(() => {
    console.log("raw maggi is here maggi is ", yupee);
    cb();
  }, 2000);
}
function boilWater(cb) {
  console.log("water is boiled please add maggi");
  cb();
}
function addMasala(cb) {
  console.log("masala and maggi added please wait for it and then serve");
  cb();
}
function serve(cb) {
  console.log("serving is done ");
  cb();
}

MakeMaggi("yupee", () => {
  boilWater(() => {
    addMasala(() => {
      serve(() => {
        console.log("cleaning is done maggi was tasty");
      });
    });
  });
});
