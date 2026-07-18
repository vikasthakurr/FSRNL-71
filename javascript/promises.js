// PROMISES IN JAVASCRIPT - ADVANCED NOTES

// 1. What is a Promise?
// A Promise is an object representing the eventual completion or failure
// of an asynchronous operation. It is a placeholder for a future value.
// Promises solve the problems of callbacks:
//   - No callback hell (chaining instead of nesting)
//   - No inversion of control (promise resolves only once)
//   - Better error handling with .catch()

// A Promise has 3 states:
//   - Pending: initial state, neither fulfilled nor rejected
//   - Fulfilled: operation completed successfully (resolved)
//   - Rejected: operation failed
// Once settled (fulfilled or rejected), a promise is IMMUTABLE - can't change state again.

// 2. Creating a Promise

const myPromise = new Promise((resolve, reject) => {
  // async operation here
  let success = true;
  if (success) {
    resolve("Operation successful!"); // fulfills the promise
  } else {
    reject("Operation failed!"); // rejects the promise
  }
});

// 3. Consuming a Promise - .then(), .catch(), .finally()

myPromise
  .then((data) => {
    console.log("Resolved:", data); // runs if fulfilled
  })
  .catch((err) => {
    console.log("Rejected:", err); // runs if rejected
  })
  .finally(() => {
    console.log("Always runs regardless of outcome"); // runs always
  });

// .then() can take two arguments: onFulfilled and onRejected
// myPromise.then(onFulfilled, onRejected)
// But using .catch() separately is cleaner and recommended

// 4. Promise Chaining
// .then() always returns a new Promise, so we can chain them
// This is how we avoid callback hell

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Vikas" }), 1000);
  });
}

function fetchPosts(user) {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve([`${user.name}'s Post 1`, `${user.name}'s Post 2`]),
      1000,
    );
  });
}

function fetchComments(post) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([`Comment on ${post}`]), 1000);
  });
}

// Chained (flat, readable):
fetchUser(1)
  .then((user) => {
    console.log("User:", user);
    return fetchPosts(user);
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return fetchComments(posts[0]);
  })
  .then((comments) => {
    console.log("Comments:", comments);
  })
  .catch((err) => {
    console.error("Error in chain:", err);
  });

// 5. Error Handling in Promises

// Errors propagate down the chain until caught by a .catch()
function riskyOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Something went wrong!")), 500);
  });
}

riskyOperation()
  .then((data) => console.log(data)) // skipped
  .then((data) => console.log(data)) // skipped
  .catch((err) => console.error("Caught:", err.message)) // catches here
  .then(() => console.log("This still runs after catch")); // runs normally

// Throwing inside .then() also rejects the promise
Promise.resolve("start")
  .then((val) => {
    throw new Error("Thrown inside then!");
  })
  .catch((err) => console.error("Caught thrown error:", err.message));

// 6. Promise Static Methods

// 6a. Promise.resolve() - creates an already fulfilled promise
const resolved = Promise.resolve("Immediately resolved");
resolved.then((val) => console.log(val));

// 6b. Promise.reject() - creates an already rejected promise
const rejected = Promise.reject("Immediately rejected");
rejected.catch((err) => console.log(err));

// 6c. Promise.all()
// Takes an array of promises, returns a single promise
// Resolves when ALL promises resolve (returns array of results)
// Rejects immediately if ANY one promise rejects (fail-fast)

const pa1 = Promise.resolve("One");
const pa2 = Promise.resolve("Two");
const pa3 = Promise.resolve("Three");

Promise.all([pa1, pa2, pa3])
  .then((results) => console.log("All resolved:", results)) // ["One", "Two", "Three"]
  .catch((err) => console.log("One failed:", err));

// If one fails:
const pa4 = Promise.reject("Failed!");
Promise.all([pa1, pa2, pa4])
  .then((results) => console.log(results))
  .catch((err) => console.log("All - caught:", err)); // "Failed!"

// 6d. Promise.allSettled()
// Waits for ALL promises to settle (resolve OR reject)
// Never short-circuits, always returns all results
// Each result has { status: "fulfilled", value } or { status: "rejected", reason }

const ps1 = Promise.resolve("Success 1");
const ps2 = Promise.reject("Error 2");
const ps3 = Promise.resolve("Success 3");

Promise.allSettled([ps1, ps2, ps3]).then((results) => {
  console.log("AllSettled:", results);
  // [
  //   { status: "fulfilled", value: "Success 1" },
  //   { status: "rejected", reason: "Error 2" },
  //   { status: "fulfilled", value: "Success 3" }
  // ]
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Passed:", result.value);
    } else {
      console.log("Failed:", result.reason);
    }
  });
});

// 6e. Promise.race()
// Returns the first promise that SETTLES (either resolves or rejects)
// Useful for timeouts

const fast = new Promise((resolve) => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise((resolve) => setTimeout(() => resolve("Slow!"), 2000));

Promise.race([fast, slow])
  .then((val) => console.log("Race winner:", val)) // "Fast!"
  .catch((err) => console.log("Race error:", err));

// Timeout pattern using Promise.race()
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timed out!")), ms);
  });
  return Promise.race([promise, timeout]);
}

const slowAPI = new Promise((resolve) =>
  setTimeout(() => resolve("Data"), 5000),
);
withTimeout(slowAPI, 2000)
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message)); // "Timed out!"

// 6f. Promise.any()
// Returns the first promise that RESOLVES (ignores rejections)
// Only rejects if ALL promises reject (AggregateError)

const pany1 = Promise.reject("Error 1");
const pany2 = Promise.reject("Error 2");
const pany3 = Promise.resolve("First success!");

Promise.any([pany1, pany2, pany3])
  .then((val) => console.log("Any - first success:", val)) // "First success!"
  .catch((err) => console.log(err));

// When all reject:
const px1 = Promise.reject("rejected 1");
const px2 = Promise.reject("rejected 2");
const px3 = Promise.reject("rejected 3");

Promise.any([px1, px2, px3])
  .then((data) => console.log(data))
  .catch((err) => {
    console.log("All rejected:", err); // AggregateError
    console.log("Errors:", err.errors); // ["rejected 1", "rejected 2", "rejected 3"]
  });

// 7. Promise.all() vs Promise.allSettled() vs Promise.race() vs Promise.any()
//
// | Method          | Resolves when            | Rejects when              |
// |-----------------|--------------------------|---------------------------|
// | all()           | ALL resolve              | ANY one rejects (fast)    |
// | allSettled()    | ALL settle (always)      | Never rejects             |
// | race()         | First to settle (any)     | First to settle (if rej)  |
// | any()          | First to resolve          | ALL reject                |

// 8. Microtask Queue & Promise Execution Order
// Promises use the Microtask queue, which has HIGHER priority than
// the Callback/Macrotask queue (setTimeout, setInterval).

console.log("Script start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise 1"));
Promise.resolve().then(() => console.log("Promise 2"));

console.log("Script end");

// Output order:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout
// (Microtasks always run before macrotasks)

// 9. Common Mistakes with Promises

// Mistake 1: Not returning inside .then() (breaks the chain)
// WRONG:
// fetchUser(1).then((user) => {
//   fetchPosts(user); // forgot return! next .then() gets undefined
// }).then((posts) => {
//   console.log(posts); // undefined
// });

// CORRECT:
// fetchUser(1).then((user) => {
//   return fetchPosts(user);
// }).then((posts) => {
//   console.log(posts); // actual posts
// });

// Mistake 2: Nesting .then() inside .then() (recreating callback hell)
// WRONG:
// fetchUser(1).then((user) => {
//   fetchPosts(user).then((posts) => {
//     fetchComments(posts[0]).then((comments) => {
//       console.log(comments);
//     });
//   });
// });

// CORRECT: use flat chaining as shown in section 4

// Mistake 3: Missing .catch() at end of chain
// Always add .catch() to handle unexpected errors

// 10. Creating Utility Functions with Promises

// Delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(1000).then(() => console.log("1 second passed"));

// Retry with Promises
function retryPromise(fn, retries = 3) {
  return fn().catch((err) => {
    if (retries <= 0) throw err;
    console.log(`Retrying... (${retries} left)`);
    return retryPromise(fn, retries - 1);
  });
}

// Sequential execution of promises from array
function sequential(tasks) {
  return tasks.reduce((chain, task) => {
    return chain.then((results) => {
      return task().then((result) => [...results, result]);
    });
  }, Promise.resolve([]));
}

// Parallel execution with concurrency limit
function parallelLimit(tasks, limit) {
  const results = [];
  let running = 0;
  let index = 0;

  return new Promise((resolve) => {
    function next() {
      if (results.length === tasks.length) {
        resolve(results);
        return;
      }
      while (running < limit && index < tasks.length) {
        const i = index++;
        running++;
        tasks[i]().then((result) => {
          results[i] = result;
          running--;
          next();
        });
      }
    }
    next();
  });
}

// 11. Real-World Example: Fetch API with Promises

// const response = fetch("https://dummyjson.com/products/1");
// response
//   .then((res) => {
//     if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
//     return res.json();
//   })
//   .then((data) => console.log("Product:", data))
//   .catch((err) => console.error("Fetch error:", err.message))
//   .finally(() => console.log("API call finished"));

// Fetching multiple resources in parallel:
// Promise.all([
//   fetch("https://dummyjson.com/products/1").then(r => r.json()),
//   fetch("https://dummyjson.com/products/2").then(r => r.json()),
//   fetch("https://dummyjson.com/products/3").then(r => r.json()),
// ])
//   .then(([p1, p2, p3]) => console.log(p1, p2, p3))
//   .catch((err) => console.error(err));

// 12. Promise vs Callback - Key Differences
//
// | Feature            | Callback              | Promise                |
// |--------------------|-----------------------|------------------------|
// | Readability        | Nesting (hell)        | Flat chaining          |
// | Error Handling     | Manual in each cb     | Single .catch()        |
// | Inversion of Ctrl  | Yes (trust issue)     | No (resolves once)     |
// | Composability      | Difficult             | .all, .race, .any      |
// | Execution          | Eager                 | Eager                  |
// | Cancellation       | Not built-in          | Not built-in           |

// 13. Key Takeaways
// - Promises represent a future value (resolved or rejected)
// - They settle only once and are immutable after that
// - .then() returns a new promise enabling flat chains
// - Always use .catch() at the end of your chain
// - Promise.all() for parallel, fails fast on any rejection
// - Promise.allSettled() for parallel, never fails, gives all results
// - Promise.race() for first to settle (resolve or reject)
// - Promise.any() for first to resolve (ignores rejections)
// - Promises run on the Microtask queue (higher priority than setTimeout)
// - Promises are the foundation for async/await syntax

// 14. Original Examples

const p1 = Promise.reject("rejected");
const p2 = Promise.reject("i have no money");
const p3 = Promise.reject("hi how r u");

Promise.any([p1, p2, p3])
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
