import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { mockUseTaskManagerStore } from "../../jest.setup";

import Item from "@/components/TaskManager/Item";

import { TaskManagerStore } from "@/store";
import { Task } from "@/types";

describe("Item", () => {
  const taskMock: Task = {
    id: 1,
    title: "Task 1",
    completed: false,
  };

  const toggleTaskCompletedMock = jest.fn();

  const defaultStoreState: TaskManagerStore = {
    toggleTaskCompleted: toggleTaskCompletedMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskManagerStore(defaultStoreState);
  });

  test("renders Item component", () => {
    render(<Item task={taskMock} />);

    const task = screen.getByText(/Task 1/i);
    expect(task).toBeInTheDocument();
  });

  test("show the modal dialog when remove button is clicked", () => {
    render(<Item task={taskMock} />);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });

  test("calls toggleTaskCompleted with correct id when checkbox is clicked", () => {
    render(<Item task={taskMock} />);

    const title = screen.getByText(/Task 1/i);
    fireEvent.click(title);

    expect(toggleTaskCompletedMock).toHaveBeenCalledWith(1);
  });

  test("applies completed class to task when task is completed", () => {
    render(<Item task={{ ...taskMock, completed: true }} />);

    const title = screen.getByText(/Task 1/i);
    expect(title).toHaveClass("line-through");
  });
});
