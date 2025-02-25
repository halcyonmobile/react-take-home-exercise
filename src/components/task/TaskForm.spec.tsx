import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("should add a task when form is submitted", () => {
    const mockOnAdd = vi.fn();
    render(<TaskForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("New task...");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith("New Task");
  });

  it("should not add a task when input is empty", () => {
    const mockOnAdd = vi.fn();
    render(<TaskForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("New task...");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
