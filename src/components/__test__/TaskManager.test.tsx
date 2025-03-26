import React, { act } from "react";
import { render, screen } from "@testing-library/react";

import TaskManager from "../TaskManager";
import userEvent from "@testing-library/user-event";

describe("TaskManager Component", () => {
  const renderComponent = () => render(<TaskManager />);

  it("should render the main container", () => {
    renderComponent();

    const comp = screen.getByRole("taskManager");

    expect(comp).toBeInTheDocument();
  });

  it('should render form for adding new task and toggle on/off submit button', async () => {
    renderComponent();

    const comp = screen.getByRole("taskManager:newTaskForm");
    expect(comp).toBeInTheDocument();

    const title = screen.getByPlaceholderText('New task...');
    expect(title).toBeInTheDocument();

    const newTaskButton = screen.getByText('Add');
    expect(newTaskButton).toBeInTheDocument();
    expect(newTaskButton.getAttributeNode('disabled')).toBeTruthy();

    await userEvent.type(title, 'Buy stuff');
    expect(title.getAttribute('value')).toEqual('Buy stuff');

    expect(newTaskButton.getAttributeNode('disabled')).toBeFalsy();

    await userEvent.click(newTaskButton);

    expect(screen.getByText('Buy stuff')).toBeInTheDocument();
    expect(title.getAttribute('value')).toEqual('');
    expect(newTaskButton.getAttributeNode('disabled')).toBeTruthy();
  });
});
