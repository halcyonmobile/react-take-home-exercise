import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { mockUseTaskManagerStore } from "../../jest.setup";

import TaskManager from "@/components/TaskManager";

import { TaskManagerStore } from "@/store";

describe("TaskManager", () => {
  const addTaskMock = jest.fn();

  const defaultStoreState: TaskManagerStore = {
    addTask: addTaskMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskManagerStore(defaultStoreState);
  });

  it("should render a list of tasks", () => {
    render(<TaskManager />);

    const input = screen.getByPlaceholderText("New task...");
    const addButton = screen.getByText("Add");

    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("should add a new task", () => {
    render(<TaskManager />);

    const input = screen.getByPlaceholderText("New task...");

    fireEvent.change(input, {
      target: { value: "New Task" },
    });

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(addTaskMock).toHaveBeenCalledWith("New Task");
  });
});
