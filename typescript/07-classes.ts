// ============================================
// CLASSES IN TYPESCRIPT
// ============================================

// ============================================
// Basic Class
// ============================================

class Animal {
  name: string;
  sound: string;

  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }

  makeSound(): string {
    return `${this.name} says ${this.sound}`;
  }
}

const dog = new Animal("Dog", "Woof");
console.log(dog.makeSound()); // "Dog says Woof"

// ============================================
// Access Modifiers: public, private, protected
// ============================================

// public    - accessible everywhere (default)
// private   - accessible only within the class
// protected - accessible within the class and subclasses

class Person {
  public name: string;
  private age: number;
  protected email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public getInfo(): string {
    return `${this.name}, Age: ${this.age}`;
  }

  private getAge(): number {
    return this.age;
  }
}

const person = new Person("Alice", 30, "alice@example.com");
console.log(person.name);      // ✅ Works (public)
// console.log(person.age);    // ❌ Error (private)
// console.log(person.email);  // ❌ Error (protected)
console.log(person.getInfo()); // ✅ Works (public method)

// ============================================
// Shorthand Constructor (Parameter Properties)
// ============================================

// TypeScript shorthand: declare and assign in constructor params
class Product {
  constructor(
    public name: string,
    public price: number,
    private stock: number
  ) {}

  isAvailable(): boolean {
    return this.stock > 0;
  }
}

const laptop = new Product("Laptop", 999, 50);
console.log(laptop.name);          // "Laptop"
console.log(laptop.isAvailable()); // true

// ============================================
// Readonly Properties
// ============================================

class Config {
  readonly apiUrl: string;

  constructor(url: string) {
    this.apiUrl = url;
  }
}

const config = new Config("https://api.example.com");
console.log(config.apiUrl);
// config.apiUrl = "new-url"; // ❌ Error: Cannot assign to 'apiUrl' because it is a read-only property

// ============================================
// Inheritance (extends)
// ============================================

class Vehicle {
  constructor(public brand: string, public speed: number) {}

  drive(): string {
    return `${this.brand} is driving at ${this.speed} km/h`;
  }
}

class Car extends Vehicle {
  constructor(brand: string, speed: number, public doors: number) {
    super(brand, speed); // Call parent constructor
  }

  honk(): string {
    return `${this.brand} goes beep beep!`;
  }
}

const myCar = new Car("Toyota", 120, 4);
console.log(myCar.drive()); // "Toyota is driving at 120 km/h"
console.log(myCar.honk());  // "Toyota goes beep beep!"

// ============================================
// Method Overriding
// ============================================

class Shape {
  area(): number {
    return 0;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  // Override parent method
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
console.log(circle.area()); // 78.539...

const rect = new Rectangle(4, 6);
console.log(rect.area()); // 24

// ============================================
// Abstract Classes
// ============================================

// Abstract classes cannot be instantiated directly.
// They serve as blueprints for other classes.

abstract class Employee {
  constructor(public name: string, public department: string) {}

  // Abstract method: must be implemented by subclasses
  abstract calculateSalary(): number;

  // Regular method: shared by all subclasses
  getDetails(): string {
    return `${this.name} works in ${this.department}`;
  }
}

class FullTimeEmployee extends Employee {
  constructor(name: string, department: string, private annualSalary: number) {
    super(name, department);
  }

  calculateSalary(): number {
    return this.annualSalary / 12;
  }
}

class ContractEmployee extends Employee {
  constructor(name: string, department: string, private hourlyRate: number, private hours: number) {
    super(name, department);
  }

  calculateSalary(): number {
    return this.hourlyRate * this.hours;
  }
}

const emp1 = new FullTimeEmployee("Bob", "Engineering", 120000);
console.log(emp1.getDetails());       // "Bob works in Engineering"
console.log(emp1.calculateSalary());  // 10000

const emp2 = new ContractEmployee("Eve", "Design", 50, 160);
console.log(emp2.calculateSalary());  // 8000

// ============================================
// Implementing Interfaces
// ============================================

interface Printable {
  print(): void;
}

interface Loggable {
  log(message: string): void;
}

// A class can implement multiple interfaces
class Report implements Printable, Loggable {
  constructor(public title: string) {}

  print(): void {
    console.log(`Printing report: ${this.title}`);
  }

  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

const report = new Report("Q4 Sales");
report.print();
report.log("Report generated successfully");

// ============================================
// Getters and Setters
// ============================================

class BankAccount {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }
    this._balance = amount;
  }

  deposit(amount: number): void {
    this._balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }
    this._balance -= amount;
  }
}

const account = new BankAccount();
account.deposit(1000);
console.log(account.balance); // 1000 (uses getter)
account.withdraw(200);
console.log(account.balance); // 800

// ============================================
// Static Members
// ============================================

// Static properties/methods belong to the class itself, not instances.

class MathUtils {
  static PI: number = 3.14159;

  static circleArea(radius: number): number {
    return MathUtils.PI * radius ** 2;
  }

  static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * MathUtils.factorial(n - 1);
  }
}

// No need to create an instance:
console.log(MathUtils.PI);              // 3.14159
console.log(MathUtils.circleArea(5));   // 78.539...
console.log(MathUtils.factorial(5));    // 120

// ============================================
// Singleton Pattern
// ============================================

class Database {
  private static instance: Database;
  private connected: boolean = false;

  private constructor() {} // Private constructor prevents direct instantiation

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  connect(): void {
    this.connected = true;
    console.log("Database connected");
  }

  isConnected(): boolean {
    return this.connected;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true (same instance)

// ============================================
// Generic Classes
// ============================================

class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }

  remove(index: number): T | undefined {
    return this.items.splice(index, 1)[0];
  }
}

const numberStore = new DataStore<number>();
numberStore.add(10);
numberStore.add(20);
console.log(numberStore.getAll()); // [10, 20]

const stringStore = new DataStore<string>();
stringStore.add("hello");
stringStore.add("world");
console.log(stringStore.get(0)); // "hello"

// ============================================
// Summary
// ============================================

// - Classes provide blueprints for objects with properties and methods.
// - Access modifiers (public, private, protected) control visibility.
// - Shorthand constructor assigns params as properties automatically.
// - readonly makes properties immutable after initialization.
// - extends enables inheritance; super() calls the parent constructor.
// - abstract classes define a contract that subclasses must implement.
// - implements connects classes to interfaces.
// - Getters/setters allow controlled access to private properties.
// - static members belong to the class, not instances.
// - Generics make classes reusable with multiple types.
