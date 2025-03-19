import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import TaskManager from "./TaskManager"

describe('TaskManager Test', () => {
  it("Matches DOM Snapshot", () => {
    const { container } = render(<TaskManager />);
    expect(container).toMatchSnapshot();
  });
  it("Should have 2 elements as placeholders", () => {
    render(<TaskManager />);
    const element = screen.getByText('Buy groceries')
    expect(element).toBeInTheDocument();
    const element2 = screen.getByText('Clean the house')
    expect(element2).toBeInTheDocument();
  });
  it("Click on delete should delete 1 elements", () => {
    render(<TaskManager />);
    window.confirm = jest.fn().mockImplementation(() => true)
    fireEvent.click(screen.getAllByTestId('delete-button')[0])
    expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
  });

  it("Add 1 elements", () => {
    render(<TaskManager />);
    const input = screen.getByTestId('task-input');
    fireEvent.change(input, { target: { value: 'test123' } });
    const buttonAdd = screen.getByTestId('task-add-button');
    fireEvent.click(buttonAdd)
    expect(screen.queryByText('test123')).toBeInTheDocument();
  });

});