import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { mockUseTaskManagerStore } from "../../jest.setup";

import Filters from "@/components/TaskManager/Filters";

import { TaskManagerStore } from "@/store";

describe("Filters", () => {
  const setFilterMock = jest.fn();

  const defaultStoreState: TaskManagerStore = {
    activeFilter: "all",
    setFilter: setFilterMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskManagerStore(defaultStoreState);
  });

  test("renders Filters component", () => {
    render(<Filters />);

    const allFilterButton = screen.getByText(/all/i);
    expect(allFilterButton).toBeInTheDocument();
  });

  test("renders all filter buttons", () => {
    render(<Filters />);

    const allFilterButton = screen.getByText(/all/i);
    const completedFilterButton = screen.getByText(/completed/i);
    const pendingFilterButton = screen.getByText(/pending/i);

    expect(allFilterButton).toBeInTheDocument();
    expect(completedFilterButton).toBeInTheDocument();
    expect(pendingFilterButton).toBeInTheDocument();
  });

  test("calls setFilter with correct value when filter button is clicked", () => {
    render(<Filters />);

    const completedFilterButton = screen.getByText(/completed/i);
    fireEvent.click(completedFilterButton);

    expect(setFilterMock).toHaveBeenCalledWith("completed");
  });

  test("applies active class to the active filter button", () => {
    mockUseTaskManagerStore({
      activeFilter: "completed",
      setFilter: setFilterMock,
    });

    render(<Filters />);

    const completedFilterButton = screen.getByText(/completed/i);
    expect(completedFilterButton).toHaveClass("bg-gray-200");
  });
});
