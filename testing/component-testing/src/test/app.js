import "@testing-library/jest-dom";
import App from "../App";
import { render,screen } from "@testing-library/react";
import { test, expect } from "vitest";

test("rendered counter element", () => {
  render(<App />);
  expect(screen.getByText("counter")).toBeInTheDocument();
});
