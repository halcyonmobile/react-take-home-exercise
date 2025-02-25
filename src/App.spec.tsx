import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App component", () => {
  it("renders the Task Manager header", () => {
    render(<App />);
    const headerElement = screen.getByText(/Task Manager/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the TaskManager component", () => {
    render(<App />);
    const taskManagerElement = screen.getByTestId("task-manager");
    expect(taskManagerElement).toBeInTheDocument();
  });
});
