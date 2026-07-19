// ===========================
// Higher Order Functions (HOF) in JavaScript
// ===========================

// Definition:
// A Higher Order Function is a function that either:
//   1. Takes one or more functions as arguments (callback), OR
//   2. Returns a function as its result

// Why HOFs matter:
// - They enable code reusability and abstraction
// - They are the foundation of functional programming in JS
// - Built-in HOFs: map(), filter(), reduce(), forEach(), sort(), find(), every(), some()

// Examples of HOF patterns:
//   callback   -> fun1(fun2)        — passing a function as an argument
//   promises   -> fn.then(fn2)      — .then() accepts a function
//   currying   -> fn returns fn2    — a function returning another function

// Key Points:
// - Functions in JS are "first-class citizens" — they can be assigned to variables,
//   passed as arguments, and returned from other functions.
// - map, filter, reduce are HOFs because they accept a callback function.
// - Writing your own HOFs helps understand how built-in array methods work internally.

// ===========================
// Code Examples
// ===========================

//callback-> fun1(fun2)
//promises=> fn.then(fn2)

//currying-> fn return fn2

// let arr = [1, 2, 3, 4, 5];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }
// arr.map((ele) => {
//   console.log(ele);
// });
// console.log(arr);

// arr ->Array.prototype ->Object.prototype->null
// console.log(arr.__proto__);

// console.log(arr.prototype);

//tax calculator -> salary ->tenPercent or twentyPercent

function calculateTenPercent(salary) {
  return salary * 0.1;
}
function calculateTwentyPercent(salary) {
  return salary * 0.2;
}

// console.log(salary.map(calculateTwentyPercent));
//map ===calculateTax
Array.prototype.Map = function (cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i]));
  }
  return result;
};
// let salary = [1000, 2000, 3000, 4000];
let salary2 = [3000, 4000, 6000];
// console.log(myMap(salary, calculateTenPercent));
// salary.myMap(calculateTenPercent);
let res = salary2.Map(calculateTenPercent);
console.log(res);

// ===========================
// Built-in Higher Order Functions
// ===========================

// 1. map() - transforms each element, returns new array
// [1,2,3].map(x => x * 2)  => [2, 4, 6]

// 2. filter() - returns elements that pass a condition
// [1,2,3,4].filter(x => x > 2)  => [3, 4]

// 3. reduce() - reduces array to a single value
// [1,2,3,4].reduce((acc, curr) => acc + curr, 0)  => 10

// 4. forEach() - executes a function on each element (no return)
// [1,2,3].forEach(x => console.log(x))

// 5. find() - returns the first element that satisfies a condition
// [1,2,3,4].find(x => x > 2)  => 3

// 6. some() - returns true if at least one element passes the test
// [1,2,3].some(x => x > 2)  => true

// 7. every() - returns true if ALL elements pass the test
// [1,2,3].every(x => x > 0)  => true

// ===========================
// HOF that returns a function (Closure + HOF)
// ===========================

function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// ===========================
// Summary
// ===========================
// - HOFs take functions as args OR return functions
// - They promote DRY (Don't Repeat Yourself) code
// - Array methods like map, filter, reduce are everyday HOFs
// - Custom HOFs help create reusable, composable logic
