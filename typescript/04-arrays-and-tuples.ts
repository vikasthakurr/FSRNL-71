// ============================================
// ARRAYS AND TUPLES IN TYPESCRIPT
// ============================================

// ============================================
// ARRAYS
// ============================================

// Arrays hold multiple values of the same type.

// Syntax 1: type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: boolean[] = [true, false, true];

// Syntax 2: Array<type> (Generic syntax)
let scores: Array<number> = [90, 85, 78];
let cities: Array<string> = ["Delhi", "Mumbai", "Bangalore"];

// Mixed array using Union Types
let mixed: (string | number)[] = [1, "hello", 2, "world"];

// Array of Objects
type Student = { name: string; marks: number };
let students: Student[] = [
  { name: "Rahul", marks: 85 },
  { name: "Priya", marks: 92 },
];

// Readonly Array (cannot be modified after creation)
let readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'
// readonlyArr[0] = 10; // Error: Index signature in type 'readonly number[]' only permits reading

// Array Methods work the same as JavaScript:
let fruits: string[] = ["apple", "banana", "cherry"];
fruits.push("date");         // Add to end
fruits.pop();                // Remove from end
fruits.unshift("avocado");   // Add to beginning
let sliced = fruits.slice(0, 2); // Get subset

// Array with map, filter, reduce
let nums: number[] = [1, 2, 3, 4, 5];
let doubled = nums.map((n) => n * 2);         // [2, 4, 6, 8, 10]
let evens = nums.filter((n) => n % 2 === 0);  // [2, 4]
let sum = nums.reduce((acc, n) => acc + n, 0); // 15

// ============================================
// TUPLES
// ============================================

// Tuple = Fixed-length array where each element has a specific type.
// Order and types matter!

// Basic Tuple
let personTuple: [string, number] = ["Alice", 25];
// personTuple = [25, "Alice"]; // Error: types are in wrong order

// Accessing Tuple Elements
console.log(personTuple[0]); // "Alice" (string)
console.log(personTuple[1]); // 25 (number)

// Tuple with more types
let record: [number, string, boolean] = [1, "active", true];

// Optional Elements in Tuples
let optionalTuple: [string, number?] = ["hello"];
// or
let optionalTuple2: [string, number?] = ["hello", 42];

// Readonly Tuple
let readonlyTuple: readonly [string, number] = ["fixed", 100];
// readonlyTuple[0] = "changed"; // Error: Cannot assign to '0' because it is a read-only property

// Named Tuples (for better readability - TypeScript 4.0+)
type Coordinate = [x: number, y: number, z: number];
let point: Coordinate = [10, 20, 30];

// Rest Elements in Tuples
type StringAndNumbers = [string, ...number[]];
let data: StringAndNumbers = ["header", 1, 2, 3, 4, 5];

// Destructuring Tuples
// let [name, ageValue] = personTuple;
// console.log(name);     // "Alice"
// console.log(ageValue); // 25

// ============================================
// Array vs Tuple - Key Differences
// ============================================

// Array:
// - Variable length
// - All elements are the same type (or union type)
// - let arr: number[] = [1, 2, 3, 4, 5]

// Tuple:
// - Fixed length
// - Each position has a specific type
// - let tuple: [string, number] = ["hello", 42]

// ============================================
// Use Cases for Tuples
// ============================================

// 1. Returning multiple values from a function
function getUser(): [string, number] {
  return ["Alice", 25];
}
let [userName, userAge] = getUser();

// 2. Representing key-value pairs
let entry: [string, number] = ["age", 30];

// 3. React's useState returns a tuple
// const [state, setState] = useState(initialValue);
