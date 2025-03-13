import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import TaskManager from "../TaskManager";
import { useTaskManager } from "../../hooks/useTaskManager";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";

vi.mock("../../hooks/useTaskManager", () => ({
    useTaskManager: vi.fn(() => ({
        tasks: [
            { id: 1, title: "Task 1", completed: false },
            { id: 2, title: "Task 2", completed: true },
        ],
        filter: "all",
        setFilter: vi.fn(),
        addNewTask: vi.fn(),
        removeTask: vi.fn(),
        toggleTask: vi.fn(),
    })),
}));

vi.mock("../../hooks/useDeleteConfirmation", () => ({
    useDeleteConfirmation: vi.fn(() => ({
        isOpen: false,
        taskToDelete: null,
        requestConfirmation: vi.fn(),
        confirm: vi.fn(),
        cancel: vi.fn(),
    })),
}));

describe("TaskManager Component", () => {
    let mockAddNewTask: ReturnType<typeof vi.fn>;
    let mockRemoveTask: ReturnType<typeof vi.fn>;
    let mockToggleTask: ReturnType<typeof vi.fn>;
    let mockSetFilter: ReturnType<typeof vi.fn>;
    let mockRequestConfirmation: ReturnType<typeof vi.fn>;
    let mockConfirm: ReturnType<typeof vi.fn>;
    let mockCancel: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.clearAllMocks();

        mockAddNewTask = vi.fn();
        mockRemoveTask = vi.fn();
        mockToggleTask = vi.fn();
        mockSetFilter = vi.fn();
        mockRequestConfirmation = vi.fn();
        mockConfirm = vi.fn();
        mockCancel = vi.fn();

        vi.mocked(useTaskManager).mockReturnValue({
            tasks: [
                { id: 1, title: "Task 1", completed: false },
                { id: 2, title: "Task 2", completed: true },
            ],
            filter: "all",
            setFilter: mockSetFilter,
            addNewTask: mockAddNewTask,
            removeTask: mockRemoveTask,
            toggleTask: mockToggleTask,
        });

        vi.mocked(useDeleteConfirmation).mockReturnValue({
            isOpen: false,
            taskToDelete: null,
            requestConfirmation: mockRequestConfirmation,
            confirm: mockConfirm,
            cancel: mockCancel,
        });
    });

    test("renders tasks correctly", () => {
        render(<TaskManager />);
        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    test("adds a new task when form is submitted", async () => {
        render(<TaskManager />);
        const input = screen.getByPlaceholderText("New task...");
        const button = screen.getByText("Add");

        await userEvent.type(input, "New Task");
        await userEvent.click(button);

        expect(mockAddNewTask).toHaveBeenCalledWith("New Task");
    });

    test("calls setFilter when a filter button is clicked", async () => {
        render(<TaskManager />);

        const completedFilter = screen.getByText("Completed");

        await userEvent.click(completedFilter);

        expect(mockSetFilter).toHaveBeenCalledWith("completed");
    });

    test("removes a task when delete button is clicked", async () => {
        render(<TaskManager />);
        const deleteButton = screen.getAllByText("Delete")[0];

        await userEvent.click(deleteButton);

        expect(mockRequestConfirmation).toHaveBeenCalled();
    });

    test("toggles task completion when clicked", async () => {
        render(<TaskManager />);
        const task = screen.getByText("Task 1");

        await userEvent.click(task);

        expect(mockToggleTask).toHaveBeenCalledWith(1);
    });

    test("does not add an empty task", async () => {
        render(<TaskManager />);
        const button = screen.getByText("Add");

        await userEvent.click(button);

        expect(mockAddNewTask).not.toHaveBeenCalled();
    });
});
