import { sum, subtract } from "./app.js";

test("sum of two positive number", () => {
  expect(sum(3, 4)).toBe(7);
});
test("sum of two negative number", () => {
  expect(sum(-3, -4)).toBe(-7);
});
test("sum of two zero", () => {
  expect(sum(0, 0)).toBe(0);
});

test("subtract of two positive number", () => {
  expect(subtract(3, 4)).toBe(-1);
});
test("sub of two zero", () => {
  expect(subtract(0, 0)).toBe(-50);
});
