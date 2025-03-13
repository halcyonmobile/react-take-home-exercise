import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import TaskItem from "../TaskItem";
import { Task } from "../../services/taskService";

describe("TaskItem Component", () => {
  const mockTask: Task = {
    id: 1,
    title: "Test Task",
    completed: false,
  };

  const mockOnDelete = vi.fn();
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders task title", () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("applies correct styling when task is completed", () => {
    render(<TaskItem task={{ ...mockTask, completed: true }} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
    const taskElement = screen.getByText("Test Task");
    expect(taskElement).toHaveClass("line-through text-gray-500"); // Ajuste conforme necessário
  });

  test("calls onToggle when task is clicked", async () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
    const taskElement = screen.getByText("Test Task");
    await userEvent.click(taskElement);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test("calls onDelete when delete button is clicked", async () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
