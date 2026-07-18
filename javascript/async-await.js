// ASYNC/AWAIT IN JAVASCRIPT - ADVANCED NOTES

// 1. What is Async/Await?
// Async/Await is syntactic sugar over Promises introduced in ES2017 (ES8).
// It makes asynchronous code look and behave like synchronous code.
// Under the hood, it still uses Promises - just cleaner syntax.
//   - async keyword: declares a function that always returns a Promise
//   - await keyword: pauses execution until the Promise settles

// 2. The async Keyword

// An async function ALWAYS returns a Promise.
// If you return a value, it's automatically wrapped in Promise.resolve()
// If you throw an error, it's wrapped in Promise.reject()

async function greet() {
  return "Hello!";
}
// Equivalent to: function greet() { return Promise.resolve("Hello!"); }

greet().then((val) => console.log(val)); // "Hello!"

async function fail() {
  throw new Error("Something broke!");
}
// Equivalent to: function fail() { return Promise.reject(new Error("Something broke!")); }

fail().catch((err) => console.log(err.message)); // "Something broke!"

// 3. The await Keyword

// await pauses the async function execution until the promise resolves.
// It can ONLY be used inside an async function (or top-level in ES modules).
// It returns the resolved value of the promise.

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data received!"), 1000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData(); // pauses here until resolved
  console.log(result); // "Data received!"
  return result;
}

getData();

// 4. Error Handling with try/catch

// With promises we use .catch(), with async/await we use try/catch
// This is more familiar and readable (like synchronous error handling)

function riskyOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Network failed!")), 500);
  });
}

async function handleError() {
  try {
    const data = await riskyOperation();
    console.log(data);
  } catch (err) {
    console.error("Caught:", err.message); // "Caught: Network failed!"
  } finally {
    console.log("Cleanup done"); // always runs
  }
}

handleError();

// 5. Sequential vs Parallel Execution

// Sequential - each await waits for the previous one (slow)
async function sequential() {
  const start = Date.now();

  const result1 = await delay(1000, "First");
  const result2 = await delay(1000, "Second");
  const result3 = await delay(1000, "Third");

  console.log(result1, result2, result3);
  console.log(`Sequential took: ${Date.now() - start}ms`); // ~3000ms
}

// Parallel - all start at once, await all together (fast)
async function parallel() {
  const start = Date.now();

  const p1 = delay(1000, "First"); // starts immediately
  const p2 = delay(1000, "Second"); // starts immediately
  const p3 = delay(1000, "Third"); // starts immediately

  const result1 = await p1;
  const result2 = await p2;
  const result3 = await p3;

  console.log(result1, result2, result3);
  console.log(`Parallel took: ${Date.now() - start}ms`); // ~1000ms
}

// Even better - use Promise.all() for parallel
async function parallelWithAll() {
  const start = Date.now();

  const [r1, r2, r3] = await Promise.all([
    delay(1000, "First"),
    delay(1000, "Second"),
    delay(1000, "Third"),
  ]);

  console.log(r1, r2, r3);
  console.log(`Promise.all took: ${Date.now() - start}ms`); // ~1000ms
}

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// 6. Async/Await with Loops

// for...of loop (sequential - one at a time)
async function processSequential(urls) {
  const results = [];
  for (const url of urls) {
    const result = await fakeFetch(url);
    results.push(result);
    console.log("Fetched:", url);
  }
  return results;
}

// WARNING: forEach does NOT work with await!
// This is WRONG - all requests fire at once, no waiting:
// urls.forEach(async (url) => {
//   const data = await fakeFetch(url); // this doesn't wait properly
// });

// Parallel processing of array items
async function processParallel(urls) {
  const results = await Promise.all(urls.map((url) => fakeFetch(url)));
  return results;
}

// Parallel with error handling for each item
async function processParallelSafe(urls) {
  const results = await Promise.allSettled(urls.map((url) => fakeFetch(url)));
  return results;
}

function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Response from ${url}`), 500);
  });
}

// 7. Top-Level Await (ES2022)
// In ES Modules (.mjs files or type: "module" in package.json),
// you can use await at the top level without wrapping in async function.

// Example (only works in ES modules):
// const response = await fetch("https://api.example.com/data");
// const data = await response.json();
// console.log(data);

// 8. Async/Await with Different Patterns

// Pattern 1: IIFE (Immediately Invoked Function Expression)
// Used when you need async at top level without ES modules
(async () => {
  const data = await delay(100, "IIFE result");
  console.log(data);
})();

// Pattern 2: Async Arrow Functions
const fetchUser = async (id) => {
  const user = await delay(500, { id, name: "Vikas" });
  return user;
};

// Pattern 3: Async Methods in Objects
const api = {
  async getUser(id) {
    return await delay(500, { id, name: "Vikas" });
  },
  async getPosts(userId) {
    return await delay(500, ["Post 1", "Post 2"]);
  },
};

// Pattern 4: Async Methods in Classes
class UserService {
  async fetchUser(id) {
    try {
      const user = await delay(500, { id, name: "Vikas" });
      return user;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      throw err;
    }
  }

  async fetchUserWithPosts(id) {
    const user = await this.fetchUser(id);
    const posts = await delay(500, ["Post 1", "Post 2"]);
    return { ...user, posts };
  }
}

// 9. Error Handling Patterns (Advanced)

// Pattern 1: Wrapper function to avoid repetitive try/catch
function handleAsync(fn) {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error("Unhandled async error:", err.message);
    });
  };
}

const safeGetData = handleAsync(async () => {
  const data = await riskyOperation();
  return data;
});

// Pattern 2: Go-style error handling [error, data]
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

// Usage:
async function goStyleExample() {
  const [err, data] = await to(fetchData());
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Data:", data);
}

// Pattern 3: Multiple try/catch blocks for different errors
async function multipleErrors() {
  let user;
  try {
    user = await fetchUser(1);
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return;
  }

  let posts;
  try {
    posts = await api.getPosts(user.id);
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return;
  }

  console.log(user, posts);
}

// 10. Async Generators and for-await-of

// Async Generator - yields promises one at a time
async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    await delay(500, null);
    yield i;
  }
}

// Consuming with for-await-of
async function consumeAsyncGenerator() {
  for await (const num of asyncNumberGenerator()) {
    console.log("Generated:", num);
  }
  console.log("Done generating");
}

// Real use case: paginated API
async function* fetchPages(baseUrl, totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    const data = await delay(300, {
      page,
      items: [`Item ${page}a`, `Item ${page}b`],
    });
    yield data;
  }
}

async function getAllPages() {
  const allItems = [];
  for await (const page of fetchPages("/api/data", 3)) {
    console.log(`Page ${page.page}:`, page.items);
    allItems.push(...page.items);
  }
  console.log("All items:", allItems);
}

// 11. Common Mistakes with Async/Await

// Mistake 1: Forgetting to await
// async function wrong() {
//   const data = fetchData(); // Missing await! data is a Promise, not the value
//   console.log(data); // Promise { <pending> }
// }

// Mistake 2: Using await in forEach (doesn't work as expected)
// async function wrong() {
//   [1, 2, 3].forEach(async (num) => {
//     await delay(1000, null);
//     console.log(num); // all print at roughly the same time
//   });
// }
// Use for...of instead for sequential processing

// Mistake 3: Unnecessary sequential awaits (performance issue)
// async function slow() {
//   const a = await fetchA(); // waits 1s
//   const b = await fetchB(); // waits 1s after a is done
//   // total: 2s
// }
// async function fast() {
//   const [a, b] = await Promise.all([fetchA(), fetchB()]);
//   // total: 1s (parallel)
// }

// Mistake 4: Not handling errors
// async function noErrorHandling() {
//   const data = await riskyOperation(); // if this rejects, unhandled rejection!
// }
// Always use try/catch or .catch() when calling

// Mistake 5: Returning await unnecessarily
// async function redundant() {
//   return await fetchData(); // the await here is redundant
// }
// async function better() {
//   return fetchData(); // same behavior, slightly more efficient
// }
// Exception: return await IS needed inside try/catch to catch errors from the awaited promise

// 12. Async/Await with Promise Static Methods

async function withPromiseAll() {
  try {
    const results = await Promise.all([
      delay(500, "A"),
      delay(800, "B"),
      delay(300, "C"),
    ]);
    console.log("All results:", results); // ["A", "B", "C"]
  } catch (err) {
    console.error("One failed:", err);
  }
}

async function withPromiseAllSettled() {
  const results = await Promise.allSettled([
    delay(500, "Success"),
    Promise.reject("Failed"),
    delay(300, "Another Success"),
  ]);
  console.log("AllSettled:", results);
  // Filter successes and failures
  const successes = results.filter((r) => r.status === "fulfilled");
  const failures = results.filter((r) => r.status === "rejected");
  console.log("Successes:", successes.length, "Failures:", failures.length);
}

async function withPromiseRace() {
  const winner = await Promise.race([
    delay(500, "Slow"),
    delay(100, "Fast"),
    delay(300, "Medium"),
  ]);
  console.log("Winner:", winner); // "Fast"
}

// 13. Real-World Patterns

// Pattern: Fetch API with async/await
// async function fetchProduct(id) {
//   try {
//     const response = await fetch(`https://dummyjson.com/products/${id}`);
//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("Product:", data);
//     return data;
//   } catch (err) {
//     console.error("Fetch failed:", err.message);
//     throw err;
//   }
// }

// Pattern: Retry with exponential backoff
async function retryWithBackoff(fn, retries = 3, baseDelay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      const waitTime = baseDelay * Math.pow(2, i); // 1s, 2s, 4s...
      console.log(`Attempt ${i + 1} failed. Retrying in ${waitTime}ms...`);
      await delay(waitTime, null);
    }
  }
}

// Pattern: Timeout wrapper
async function withTimeout(asyncFn, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  return Promise.race([asyncFn(), timeout]);
}

// Pattern: Queue/Semaphore - limit concurrent async operations
class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(task) {
    if (this.running >= this.concurrency) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.running++;
    try {
      return await task();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        this.queue.shift()();
      }
    }
  }
}

// Usage:
// const queue = new AsyncQueue(2); // max 2 concurrent
// const results = await Promise.all(
//   urls.map(url => queue.add(() => fetch(url)))
// );

// 14. Async/Await vs Promises vs Callbacks - When to Use What
//
// | Use Case                      | Best Choice      |
// |-------------------------------|------------------|
// | Simple async operations       | async/await      |
// | Complex error handling        | async/await      |
// | Parallel operations           | Promise.all()    |
// | Event listeners               | Callbacks        |
// | Streams/iterators             | Async generators |
// | Library/framework code        | Promises         |
// | Sequential async logic        | async/await      |
// | Conditional async branching   | async/await      |

// 15. Key Takeaways
// - async functions always return a Promise
// - await pauses execution until the Promise settles
// - Use try/catch for error handling (cleaner than .catch chains)
// - Avoid sequential awaits when operations are independent (use Promise.all)
// - forEach does NOT work with await - use for...of for sequential
// - async/await is just syntax sugar over Promises (not a replacement)
// - Top-level await works in ES modules
// - Async generators + for-await-of are great for paginated/streaming data
// - Always handle errors - unhandled rejections crash Node.js processes
// - return await is only needed inside try/catch blocks
