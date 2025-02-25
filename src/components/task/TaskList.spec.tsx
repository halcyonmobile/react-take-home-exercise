import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { v7 as uuidV7 } from "uuid";
import { describe, expect, it, vi } from "vitest";
import TaskList from "./TaskList";

const tasks = [
  { id: uuidV7(), title: "Task 1", completed: false },
  { id: uuidV7(), title: "Task 2", completed: true },
];

describe("TaskList", () => {
  it("should render tasks and handle interactions", () => {
    const mockDelete = vi.fn();
    const mockToggle = vi.fn();

    render(
      <TaskList tasks={tasks} onDelete={mockDelete} onToggle={mockToggle} />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Delete task "Task 1"'));
    expect(mockDelete).toHaveBeenCalledWith(tasks[0].id);

    fireEvent.click(screen.getByLabelText("Task 2"));
    expect(mockToggle).toHaveBeenCalledWith(tasks[1].id);
  });
});
