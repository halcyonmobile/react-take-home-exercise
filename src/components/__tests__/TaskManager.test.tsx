import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from '../TaskManager';
import { INITIAL_TASKS } from '../../mock/Tasks';
import { TaskFilterStatus } from '../../types';
import { useTasks } from '../../hooks/useTasks';

jest.mock('../../hooks/useTasks');

describe('TaskManager Component', () => {
  const mockSetFilter = jest.fn();
  const mockSetNewTaskTitle = jest.fn();
  const mockAddTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTasks as jest.Mock).mockReturnValue({
      tasks: INITIAL_TASKS,
      filter: 'all' as TaskFilterStatus,
      newTaskTitle: '',
      setFilter: mockSetFilter,
      setNewTaskTitle: mockSetNewTaskTitle,
      addTask: mockAddTask,
      deleteTask: mockDeleteTask,
      toggleTask: mockToggleTask
    });
  });

  it('renders the task input form', () => {
    render(<TaskManager />);
    expect(screen.getByPlaceholderText('New task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('handles task input changes', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('New task...');
    fireEvent.change(input, { target: { value: 'New Task' } });
    expect(mockSetNewTaskTitle).toHaveBeenCalledWith('New Task');
  });

  it('handles task submission', () => {
    (useTasks as jest.Mock).mockReturnValue({
      ...useTasks(),
      newTaskTitle: 'New Task'
    });

    render(<TaskManager />);
    const form = screen.getByRole('form', { name: /add task form/i });
    fireEvent.submit(form);

    expect(mockAddTask).toHaveBeenCalledWith('New Task');
    expect(mockSetNewTaskTitle).toHaveBeenCalledWith('');
  });

  it('renders the task filter buttons', () => {
    render(<TaskManager />);
    ['All', 'Completed', 'Pending'].forEach(filterName => {
      expect(screen.getByRole('button', { name: filterName })).toBeInTheDocument();
    });
  });

  it('handles filter changes', () => {
    render(<TaskManager />);
    const completedFilterButton = screen.getByRole('button', { name: /completed/i });
    fireEvent.click(completedFilterButton);
    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });

  it('renders task list correctly', () => {
    render(<TaskManager />);
    INITIAL_TASKS.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it('handles task deletion', () => {
    render(<TaskManager />);
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    // Find and click the confirmation dialog's Yes button
    const confirmButton = screen.getByRole('button', { name: /yes/i });
    fireEvent.click(confirmButton);
    
    expect(mockDeleteTask).toHaveBeenCalledWith(INITIAL_TASKS[0].id);
  });

  it('handles task toggle', () => {
    render(<TaskManager />);
    const taskTitle = screen.getByText(INITIAL_TASKS[0].title);
    fireEvent.click(taskTitle);
    
    expect(mockToggleTask).toHaveBeenCalledWith(INITIAL_TASKS[0].id);
  });

  it('shows active filter button state', () => {
    (useTasks as jest.Mock).mockReturnValue({
      ...useTasks(),
      filter: 'completed' as TaskFilterStatus
    });

    render(<TaskManager />);
    const completedButton = screen.getByRole('button', { name: /completed/i });
    const allButton = screen.getByRole('button', { name: /all/i });
    const pendingButton = screen.getByRole('button', { name: /pending/i });

    // Active button should have shadow-sm class
    expect(completedButton).toHaveClass('shadow-sm');
    
    // Inactive buttons should have bg-transparent class
    expect(allButton).toHaveClass('bg-transparent');
    expect(pendingButton).toHaveClass('bg-transparent');
  });

  it('handles empty task list', () => {
    (useTasks as jest.Mock).mockReturnValue({
      ...useTasks(),
      tasks: []
    });

    render(<TaskManager />);
    const taskList = screen.getByRole('list');
    expect(taskList.children).toHaveLength(0);
  });
});