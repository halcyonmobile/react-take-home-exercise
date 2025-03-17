import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../TaskItem';
import { Task } from '../../types';

describe('TaskItem Component', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    completed: false
  };

  const mockHandleToggle = jest.fn();
  const mockHandleDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders task title correctly', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockHandleToggle}
        onDelete={mockHandleDelete}
      />
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('shows correct completion status', () => {
    const completedTask = { ...mockTask, completed: true };
    render(
      <TaskItem
        task={completedTask}
        onToggle={mockHandleToggle}
        onDelete={mockHandleDelete}
      />
    );
    
    const taskTitle = screen.getByText('Test Task');
    expect(taskTitle).toHaveClass('line-through', 'text-green-500');
  });

  it('calls onToggle when task title is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockHandleToggle}
        onDelete={mockHandleDelete}
      />
    );
    
    const taskTitle = screen.getByText('Test Task');
    fireEvent.click(taskTitle);
    expect(mockHandleToggle).toHaveBeenCalledWith(mockTask.id);
  });

  it('shows delete confirmation dialog when delete button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockHandleToggle}
        onDelete={mockHandleDelete}
      />
    );
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
  });

  it('calls onDelete when delete is confirmed', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockHandleToggle}
        onDelete={mockHandleDelete}
      />
    );
    
    // Click delete button to show confirmation dialog
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    // Click Yes to confirm deletion
    const confirmButton = screen.getByRole('button', { name: /yes/i });
    fireEvent.click(confirmButton);
    
    expect(mockHandleDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('does not call onDelete when delete is cancelled', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockHandleToggle}
        onDelete={mockHandleDelete}
      />
    );
    
    // Click delete button to show confirmation dialog
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    // Click No to cancel deletion
    const cancelButton = screen.getByRole('button', { name: /no/i });
    fireEvent.click(cancelButton);
    
    expect(mockHandleDelete).not.toHaveBeenCalled();
  });
});