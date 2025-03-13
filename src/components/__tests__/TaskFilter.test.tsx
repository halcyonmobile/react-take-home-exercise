import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, vi, expect } from "vitest";
import TaskFilter from "../TaskFilter";

describe("TaskFilter Component", () => {
  const mockSetFilter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all filter buttons", () => {
    render(<TaskFilter filter="all" setFilter={mockSetFilter} />);
    
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("calls setFilter when clicking on a filter button", async () => {
    render(<TaskFilter filter="all" setFilter={mockSetFilter} />);
    
    const completedButton = screen.getByText("Completed");
    await userEvent.click(completedButton);

    expect(mockSetFilter).toHaveBeenCalledWith("completed");
  });

  test("applies active class to selected filter", () => {
    render(<TaskFilter filter="completed" setFilter={mockSetFilter} />);
    
    const completedButton = screen.getByText("Completed");
    
    expect(completedButton).toHaveClass("bg-blue-500 text-white");
  });

  test("does not apply active class to unselected filters", () => {
    render(<TaskFilter filter="pending" setFilter={mockSetFilter} />);
    
    const allButton = screen.getByText("All");
    const completedButton = screen.getByText("Completed");

    expect(allButton).not.toHaveClass("bg-blue-500 text-white");
    expect(completedButton).not.toHaveClass("bg-blue-500 text-white");
  });
});
