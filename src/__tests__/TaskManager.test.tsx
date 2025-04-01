import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TaskManager from "@components/TaskManager"
import { useTasks } from "@hooks/useTasks"

jest.mock("@hooks/useTasks", () => ({
  useTasks: jest.fn(),
}))

describe("TaskManager", () => {
  let addTaskMock: jest.Mock
  let deleteTaskMock: jest.Mock
  let toggleTaskMock: jest.Mock
  let filterTasksMock: jest.Mock

  beforeEach(() => {
    addTaskMock = jest.fn()
    deleteTaskMock = jest.fn()
    toggleTaskMock = jest.fn()
    filterTasksMock = jest.fn().mockReturnValue([
      { id: 1, title: "Test Task", completed: false },
    ])

      ; (useTasks as jest.Mock).mockReturnValue({
        addTask: addTaskMock,
        deleteTask: deleteTaskMock,
        toggleTask: toggleTaskMock,
        filterTasks: filterTasksMock,
      })
  })

  it("renders TaskManager correctly", () => {
    render(<TaskManager />)
    expect(screen.getByPlaceholderText("New task...")).toBeInTheDocument()
    expect(screen.getByText("Add")).toBeInTheDocument()
    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Completed")).toBeInTheDocument()
    expect(screen.getByText("Pending")).toBeInTheDocument()
  })

  it("adds a new task", () => {
    render(<TaskManager />)

    const input = screen.getByPlaceholderText("New task...")
    const addButton = screen.getByText("Add")

    fireEvent.change(input, { target: { value: "New Task" } })
    fireEvent.click(addButton)

    expect(addTaskMock).toHaveBeenCalledWith("New Task")
    expect(input).toHaveValue("")
  })

  it("filters tasks based on selected filter", () => {
    render(<TaskManager />)

    const allFilter = screen.getByText("All")
    const completedFilter = screen.getByText("Completed")
    const pendingFilter = screen.getByText("Pending")

    fireEvent.click(completedFilter)
    expect(filterTasksMock).toHaveBeenCalledWith("completed")

    fireEvent.click(pendingFilter)
    expect(filterTasksMock).toHaveBeenCalledWith("pending")

    fireEvent.click(allFilter)
    expect(filterTasksMock).toHaveBeenCalledWith("all")
  })

  it("opens and closes the delete confirmation modal", async () => {
    render(<TaskManager />)

    const deleteButton = screen.getByRole("button", { name: "Delete" })
    fireEvent.click(deleteButton)

    expect(screen.getByText("Delete Task")).toBeInTheDocument()
    expect(screen.getByText("Are you sure you want to delete this task?")).toBeInTheDocument()

    const cancelButton = screen.getByRole("button", { name: "Cancel" })
    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(screen.queryByText("Delete Task")).not.toBeInTheDocument()
    })
  })

  it("deletes a task when confirmed", async () => {
    render(<TaskManager />)

    const deleteButton = screen.getByRole("button", { name: "Delete" })
    fireEvent.click(deleteButton)

    const confirmButton = screen.getByRole("button", { name: "Confirm" })
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(deleteTaskMock).toHaveBeenCalled()
    })
  })
})
