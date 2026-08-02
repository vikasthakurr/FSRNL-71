// ============================================
// DECORATORS IN TYPESCRIPT
// ============================================

// Decorators are special functions that modify classes, methods, properties, or parameters.
// They use the @expression syntax and are evaluated at class definition time (not runtime).
// Note: Enable "experimentalDecorators": true in tsconfig.json to use decorators.

// ============================================
// What is a Decorator?
// ============================================

// A decorator is a function that receives metadata about the thing it decorates
// and can modify or replace it.

// Types of Decorators:
// 1. Class Decorators
// 2. Method Decorators
// 3. Property Decorators
// 4. Parameter Decorators
// 5. Accessor Decorators

// ============================================
// Class Decorator
// ============================================

// A class decorator is applied to the class constructor.
// It receives the constructor function as its argument.

function Logger(constructor: Function) {
  console.log(`Class created: ${constructor.name}`);
}

@Logger
class User {
  constructor(public name: string) {}
}

// Output: "Class created: User" (logged when class is defined)
const user1 = new User("Alice");

// ============================================
// Class Decorator Factory (with arguments)
// ============================================

// A decorator factory returns a decorator function.
// This allows passing custom arguments to decorators.

function LoggerWithPrefix(prefix: string) {
  return function (constructor: Function) {
    console.log(`${prefix} - Class: ${constructor.name}`);
  };
}

@LoggerWithPrefix("APP")
class OrderService {
  placeOrder() {
    console.log("Order placed");
  }
}

// Output: "APP - Class: OrderService"

// ============================================
// Class Decorator that Adds Properties
// ============================================

function Timestamped(constructor: Function) {
  constructor.prototype.createdAt = new Date();
}

@Timestamped
class Document {
  constructor(public title: string) {}
}

const doc = new Document("My Doc");
console.log((doc as any).createdAt); // Current date/time

// ============================================
// Method Decorator
// ============================================

// Method decorators receive three arguments:
// 1. target - the prototype (for instance methods) or constructor (for static methods)
// 2. propertyKey - the method name
// 3. descriptor - the property descriptor

function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned: ${result}`);
    return result;
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }

  @LogMethod
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(3, 5);
// Output: "Calling add with args: [3,5]"
// Output: "add returned: 8"

// ============================================
// Method Decorator: Readonly
// ============================================

function Readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}

class Settings {
  @Readonly
  getVersion(): string {
    return "1.0.0";
  }
}

const settings = new Settings();
// settings.getVersion = () => "hacked"; // ❌ Runtime error: Cannot assign to read only property

// ============================================
// Property Decorator
// ============================================

// Property decorators receive:
// 1. target - the prototype (instance) or constructor (static)
// 2. propertyKey - the property name

function Required(target: any, propertyKey: string) {
  let value: any;

  const getter = () => value;
  const setter = (newVal: any) => {
    if (newVal === undefined || newVal === null || newVal === "") {
      throw new Error(`${propertyKey} is required`);
    }
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Profile {
  @Required
  username!: string;

  email!: string;
}

const profile = new Profile();
// profile.username = ""; // ❌ Error: username is required
profile.username = "john_doe"; // ✅ Works
console.log(profile.username); // "john_doe"

// ============================================
// Parameter Decorator
// ============================================

// Parameter decorators receive:
// 1. target - the prototype or constructor
// 2. propertyKey - the method name
// 3. parameterIndex - the index of the parameter

function LogParam(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} in ${propertyKey} is decorated`);
}

class NotificationService {
  sendEmail(@LogParam recipient: string, message: string): void {
    console.log(`Sending to ${recipient}: ${message}`);
  }
}

// Output: "Parameter at index 0 in sendEmail is decorated"

// ============================================
// Accessor Decorator (get/set)
// ============================================

function Configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number = 0;
  private _y: number = 0;

  @Configurable(false)
  get x() {
    return this._x;
  }

  @Configurable(false)
  get y() {
    return this._y;
  }
}

// ============================================
// Decorator Composition (Multiple Decorators)
// ============================================

// Multiple decorators are applied bottom-up (closest to the class/method first).

function First() {
  console.log("First(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("First(): decorator called");
  };
}

function Second() {
  console.log("Second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("Second(): decorator called");
  };
}

class ExampleClass {
  @First()
  @Second()
  method() {}
}

// Output order:
// First(): factory evaluated
// Second(): factory evaluated
// Second(): decorator called  (bottom-up application)
// First(): decorator called

// ============================================
// Real-World Example: API Route Decorator
// ============================================

function Route(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.__routes) {
      target.__routes = [];
    }
    target.__routes.push({ path, handler: propertyKey });
  };
}

class ApiController {
  @Route("/users")
  getUsers() {
    return [{ id: 1, name: "Alice" }];
  }

  @Route("/users/:id")
  getUserById() {
    return { id: 1, name: "Alice" };
  }
}

// ============================================
// Real-World Example: Measure Execution Time
// ============================================

function MeasureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} took ${(end - start).toFixed(2)}ms`);
    return result;
  };
}

class DataProcessor {
  @MeasureTime
  processData(data: number[]): number {
    return data.reduce((sum, n) => sum + n, 0);
  }
}

const processor = new DataProcessor();
processor.processData([1, 2, 3, 4, 5]); // "processData took 0.01ms"

// ============================================
// tsconfig.json Setup for Decorators
// ============================================

// Add these to your tsconfig.json:
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true  // Optional: enables reflection metadata
//   }
// }

// ============================================
// Summary
// ============================================

// - Decorators are functions that add metadata or modify behavior.
// - @decorator syntax is used above classes, methods, properties, or params.
// - Class decorators receive the constructor.
// - Method decorators receive target, name, and property descriptor.
// - Property decorators receive target and property name.
// - Parameter decorators receive target, method name, and param index.
// - Decorator factories allow passing arguments to decorators.
// - Multiple decorators are evaluated top-down, applied bottom-up.
// - Common uses: logging, validation, routing, access control, timing.
// - Requires "experimentalDecorators": true in tsconfig.json.
