import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import ConfirmModal from "@components/ConfirmModal"

describe("ConfirmModal Component", () => {
  const mockOnClose = jest.fn()
  const mockOnConfirm = jest.fn()

  it("renders modal title and message", async () => {
    render(
      <ConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Delete Task" message="Are you sure?" />
    )

    await waitFor(() => {
      expect(screen.getByText("Delete Task")).toBeInTheDocument()
      expect(screen.getByText("Are you sure?")).toBeInTheDocument()
    })
  })

  it("calls onConfirm when Confirm button is clicked", async () => {
    render(<ConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />)

    fireEvent.click(screen.getByText("Confirm"))

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    })
  })

  it("calls onClose when Cancel button is clicked", async () => {
    render(<ConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />)

    fireEvent.click(screen.getByText("Cancel"))

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  it("does not render when isOpen is false", async () => {
    render(<ConfirmModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} />)

    await waitFor(() => {
      expect(screen.queryByText("Confirm")).not.toBeInTheDocument()
      expect(screen.queryByText("Cancel")).not.toBeInTheDocument()
    })
  })
})
