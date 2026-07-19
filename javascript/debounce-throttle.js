// ===========================
// Debounce & Throttle in JavaScript
// ===========================

// Both are performance optimization techniques used to limit
// how often a function executes in response to frequent events
// (scrolling, resizing, typing, button clicks, API calls).

// ===========================
// 1. Debounce
// ===========================

// Definition:
// Debounce delays the execution of a function until AFTER a specified
// time has passed since the LAST time it was invoked.
// If the event keeps firing, the timer keeps resetting.

// Analogy:
// Like an elevator door — it waits until people stop entering,
// then closes after a pause.

// When to use:
// - Search input (wait until user stops typing to fire API call)
// - Window resize (recalculate layout after resizing stops)
// - Form validation (validate after user finishes typing)
// - Auto-save (save after user stops editing)

// How it works:
// 1. User triggers event → start a timer
// 2. If event triggers again before timer ends → clear old timer, start new one
// 3. Function only executes when the timer finally completes (no more triggers)

// Implementation:
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // Cancel previous timer
    timer = setTimeout(() => {
      fn(...args); // Execute after delay with no interruptions
    }, delay);
  };
}

// Example usage:
// const debouncedSearch = debounce(search, 500);
// input.addEventListener("keyup", (e) => debouncedSearch(e.target.value));
// If user types "vikas" quickly, only ONE API call fires 500ms after last keystroke.

// ===========================
// 2. Throttle
// ===========================

// Definition:
// Throttle ensures a function is called AT MOST once in a specified
// time interval, no matter how many times the event fires.

// Analogy:
// Like a machine gun with a fixed fire rate — it fires at regular
// intervals regardless of how fast you pull the trigger.

// When to use:
// - Scroll events (infinite scroll, lazy loading, scroll position tracking)
// - Mouse move events (drag-and-drop, tooltip positioning)
// - Button clicks (prevent multiple form submissions)
// - Game loop inputs (consistent frame rate actions)
// - Window resize (if you want periodic updates DURING resize)

// How it works:
// 1. User triggers event → execute immediately (first call)
// 2. Any further triggers within the delay period are IGNORED
// 3. After the delay passes, the next trigger will execute again

// Implementation:
function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args); // Execute only if enough time has passed
    }
  };
}

// Alternative implementation using setTimeout:
// function throttle(fn, delay) {
//   let isThrottled = false;
//   return function (...args) {
//     if (isThrottled) return;  // Ignore if in cooldown
//     fn(...args);
//     isThrottled = true;
//     setTimeout(() => {
//       isThrottled = false;   // Allow next call after delay
//     }, delay);
//   };
// }

// ===========================
// 3. Key Differences
// ===========================

// | Feature        | Debounce                        | Throttle                         |
// |----------------|----------------------------------|----------------------------------|
// | Executes       | After event STOPS firing         | At regular intervals             |
// | Timing         | Waits for silence/pause          | Fires at fixed rate              |
// | Resets timer?  | Yes, on every trigger            | No, ignores until cooldown ends  |
// | Guarantees     | Only LAST call executes          | First call + periodic calls      |
// | Best for       | Final value (search, save)       | Continuous updates (scroll)      |

// Visual timeline (events at |, executions at *):
//
// Events:    | | | | |          | | |
// Debounce:                 *              *    (fires after silence)
// Throttle:  *       *       *  *       *       (fires at intervals)

// ===========================
// 4. Demo
// ===========================

function search(query) {
  console.log("searching for", query);
}

// Throttle demo - only first call executes (others within 3s are ignored)
let searchWithThrottle = throttle(search, 3000);
searchWithThrottle("vikas"); // Executes immediately
searchWithThrottle("vikas thakur"); // Ignored (within 3s)
searchWithThrottle("vikas kumar thakur"); // Ignored (within 3s)

// Debounce demo - only the LAST call executes (after 500ms of silence)
// let searchWithDebounce = debounce(search, 500);
// searchWithDebounce("v");       // Timer starts, cleared by next call
// searchWithDebounce("vi");      // Timer resets, cleared by next call
// searchWithDebounce("vikas");   // Timer starts → executes after 500ms ✓

// ===========================
// 5. Common Interview Questions
// ===========================

// Q: Can you debounce with leading edge (execute on first call, then wait)?
// A: Yes — execute immediately, then ignore subsequent calls until delay passes.
//    This is sometimes called "leading debounce" or "immediate debounce".

// function debounceLeading(fn, delay) {
//   let timer;
//   return function (...args) {
//     if (!timer) fn(...args);  // Execute on first call
//     clearTimeout(timer);
//     timer = setTimeout(() => { timer = null; }, delay);
//   };
// }

// Q: Difference between throttle and debounce in one line?
// A: Throttle = execute at fixed intervals; Debounce = execute after event stops.

// Q: Which uses closure?
// A: Both! The timer/lastCall variable is enclosed in the returned function.

// ===========================
// Summary
// ===========================
// - Debounce: waits for silence → executes ONCE after events stop
// - Throttle: rate-limits → executes at most once per interval
// - Both use closures to store timer/state
// - Both return a new function (HOF pattern)
// - Both are essential for performance optimization in web apps
