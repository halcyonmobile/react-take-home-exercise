import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, vi, expect } from "vitest";
import DeleteConfirmation from "../DeleteConfirmation";

describe("DeleteConfirmation Component", () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("does not render when isOpen is false", () => {
    render(<DeleteConfirmation isOpen={false} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    expect(screen.queryByText("Are you sure you want to delete this task?")).not.toBeInTheDocument();
  });

  test("renders when isOpen is true", () => {
    render(<DeleteConfirmation isOpen={true} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    expect(screen.getByText("Are you sure you want to delete this task?")).toBeInTheDocument();
  });

  test("calls onConfirm when clicking 'Yes' button", async () => {
    render(<DeleteConfirmation isOpen={true} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    const yesButton = screen.getByText("Yes");
    await userEvent.click(yesButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test("calls onCancel when clicking 'Cancel' button", async () => {
    render(<DeleteConfirmation isOpen={true} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText("Cancel");
    await userEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
