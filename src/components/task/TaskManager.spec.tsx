import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { useTaskStore } from "../../store/useTaskStore";
import { ETaskState } from "../../types/task.type";
import TaskManager from "./TaskManager";

describe("TaskManager", () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [], filter: ETaskState.ALL });
  });

  it("should add and delete tasks", () => {
    render(<TaskManager />);

    const input = screen.getByPlaceholderText("New task...");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Integration Task" } });
    fireEvent.click(button);

    expect(screen.getByText("Integration Task")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Delete task "Integration Task"'));
    expect(screen.queryByText("Integration Task")).not.toBeInTheDocument();
  });

  it("should render TaskFilter with the initial filter set to ALL", () => {
    render(<TaskManager />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();

    expect(screen.getByText("All")).toHaveClass("font-bold");
  });

  it("should update the filter state when a filter button is clicked", () => {
    render(<TaskManager />);

    fireEvent.click(screen.getByText("Completed"));

    expect(screen.getByText("Completed")).toHaveClass("font-bold");

    fireEvent.click(screen.getByText("Pending"));

    expect(screen.getByText("Pending")).toHaveClass("font-bold");

    fireEvent.click(screen.getByText("All"));

    expect(screen.getByText("All")).toHaveClass("font-bold");
  });

  it("should filter tasks based on the selected filter", () => {
    useTaskStore.setState({
      tasks: [
        { id: "1", title: "Task 1", completed: true },
        { id: "2", title: "Task 2", completed: false },
      ],
      filter: ETaskState.ALL,
    });

    render(<TaskManager />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Completed"));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Pending"));

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("All"));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("should display no tasks when the task list is empty", () => {
    useTaskStore.setState({
      tasks: [],
      filter: ETaskState.ALL,
    });

    render(<TaskManager />);

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });
});
