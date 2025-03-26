import React from "react";
import { render, screen } from "@testing-library/react";

import TaskManager from "../components/TaskManager";
import App from "../App";

describe("App Component", () => {
  it("render Title and call TaskManager", () => {
    render(<App />);

    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  it("render Task Manager", () => {
    vi.mock("../components/TaskManager.tsx", { spy: true });

    render(<App />);

    expect(TaskManager).toHaveBeenCalled();
  });
});
