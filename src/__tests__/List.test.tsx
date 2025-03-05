import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { mockUseTaskManagerStore } from "../../jest.setup";

import List from "@/components/TaskManager/List";

import { TaskManagerStore } from "@/store";

describe("List", () => {
  const defaultStoreState: TaskManagerStore = {
    tasks: [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
      { id: 3, title: "Task 3", completed: false },
    ],
    activeFilter: "all",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskManagerStore(defaultStoreState);
  });

  it("should render a list of tasks", () => {
    render(<List />);

    const taskItems = screen.getAllByRole("listitem");

    expect(taskItems).toHaveLength(defaultStoreState.tasks.length);
  });

  it("should filter tasks by completed filter", () => {
    defaultStoreState.activeFilter = "completed";

    render(<List />);

    const taskItems = screen.getAllByRole("listitem");
    expect(taskItems).toHaveLength(
      defaultStoreState.tasks.filter((item) => item.completed).length
    );
  });
});
