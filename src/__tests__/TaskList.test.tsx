import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TaskList from "@components/TaskList"
import type { Task } from "@customTypes/types"

describe("TaskList Component", () => {
  const mockTasks: Task[] = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true }
  ]

  const mockOnDelete = jest.fn()
  const mockOnToggle = jest.fn()

  it("renders the list of tasks correctly", async () => {
    render(<TaskList tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument()
      expect(screen.getByText("Task 2")).toBeInTheDocument()
    })
  })

  it("calls onToggle when a task is clicked", async () => {
    render(<TaskList tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    fireEvent.click(screen.getByText("Task 1"))

    await waitFor(() => {
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
      expect(mockOnToggle).toHaveBeenCalledWith(1)
    })
  })

  it("calls onDelete when the delete button is clicked", async () => {
    render(<TaskList tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    fireEvent.click(screen.getAllByText("Delete")[0])

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledTimes(1)
      expect(mockOnDelete).toHaveBeenCalledWith(1)
    })
  })

  it("renders no tasks when the list is empty", async () => {
    render(<TaskList tasks={[]} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    await waitFor(() => {
      expect(screen.queryByText("Task 1")).not.toBeInTheDocument()
      expect(screen.queryByText("Task 2")).not.toBeInTheDocument()
    })
  })
})
