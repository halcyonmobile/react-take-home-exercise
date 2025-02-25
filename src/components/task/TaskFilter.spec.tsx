import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ETaskState } from "../../types/task.type";
import TaskFilter from "./TaskFilter";

describe("TaskFilter", () => {
  it("should change filter when clicking buttons", () => {
    const mockSetFilter = vi.fn();
    render(<TaskFilter filter={ETaskState.ALL} setFilter={mockSetFilter} />);

    fireEvent.click(screen.getByText("Completed"));
    expect(mockSetFilter).toHaveBeenCalledWith(ETaskState.COMPLETED);

    fireEvent.click(screen.getByText("Pending"));
    expect(mockSetFilter).toHaveBeenCalledWith(ETaskState.PENDING);
  });
});
