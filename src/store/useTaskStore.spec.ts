import { describe, it, expect, beforeEach } from "vitest";
import { useTaskStore } from "./useTaskStore";
import { ETaskState } from "../types/task.type";

describe("useTaskStore", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
      filter: ETaskState.ALL,
    });
    localStorage.clear();
  });

  it("should add a task", () => {
    useTaskStore.getState().addTask("Test Task");
    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0].title).toBe("Test Task");
  });

  it("should delete a task", () => {
    useTaskStore.getState().addTask("Task to Delete");
    const taskId = useTaskStore.getState().tasks[0].id;

    useTaskStore.getState().deleteTask(taskId);
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("should toggle task completion", () => {
    useTaskStore.getState().addTask("Task to Toggle");
    const taskId = useTaskStore.getState().tasks[0].id;

    useTaskStore.getState().toggleTaskCompletion(taskId);
    expect(useTaskStore.getState().tasks[0].completed).toBe(true);

    useTaskStore.getState().toggleTaskCompletion(taskId);
    expect(useTaskStore.getState().tasks[0].completed).toBe(false);
  });

  it("should filter tasks correctly", () => {
    useTaskStore.getState().addTask("Pending Task");
    useTaskStore.getState().addTask("Completed Task");
    useTaskStore
      .getState()
      .toggleTaskCompletion(useTaskStore.getState().tasks[1].id);

    useTaskStore.getState().setFilter(ETaskState.COMPLETED);
    expect(
      useTaskStore.getState().tasks.filter((t) => t.completed)
    ).toHaveLength(1);

    useTaskStore.getState().setFilter(ETaskState.PENDING);
    expect(
      useTaskStore.getState().tasks.filter((t) => !t.completed)
    ).toHaveLength(1);
  });
});
