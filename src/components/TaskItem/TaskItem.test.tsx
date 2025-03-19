import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TaskItem from "./TaskItem"
import { Task } from '../TaskManager/TaskManager';

describe('Filter Test', () => {
  const onDeleteMock = jest.fn()
  const onToggleMock = jest.fn()
  const completedTask = {
    completed: true,
    id: 1,
    title: 'Placeholder'
  } as Task
  it("Matches DOM Snapshot", () => {
    const { container } = render(<TaskItem onDelete={onDeleteMock} onToggle={onToggleMock} task={completedTask} key={'123'} />);
    expect(container).toMatchSnapshot();
  });
  it("Clicking Button should call mock", () => {
    render(<TaskItem onDelete={onDeleteMock} onToggle={onToggleMock} task={completedTask} key={'123'} />);
    const element = screen.queryByTestId('delete-button')
    element?.click();
    expect(onDeleteMock).toHaveBeenCalledTimes(1)
  });



});