import { render, screen, fireEvent } from "@testing-library/react"
import TaskItem from "@components/TaskItem"
import type { Task } from "@customTypes/types"

describe("TaskItem Component", () => {
  const mockTask: Task = { id: 1, title: "Test Task", completed: false }
  const mockOnDelete = jest.fn()
  const mockOnToggle = jest.fn()

  it("renders task title correctly", () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    expect(screen.getByText("Test Task")).toBeInTheDocument()
  })

  it("applies line-through style when task is completed", () => {
    const completedTask = { ...mockTask, completed: true }
    render(<TaskItem task={completedTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    const taskTitle = screen.getByText("Test Task")
    expect(taskTitle).toHaveClass("line-through")
    expect(taskTitle).toHaveClass("text-green-600")
  })

  it("calls onToggle when task title is clicked", () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    fireEvent.click(screen.getByText("Test Task"))

    expect(mockOnToggle).toHaveBeenCalledTimes(1)
    expect(mockOnToggle).toHaveBeenCalledWith(1)
  })

  it("calls onDelete when delete button is clicked", () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)

    fireEvent.click(screen.getByText("Delete"))

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(1)
  })
})
