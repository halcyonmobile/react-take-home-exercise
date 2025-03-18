import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest'

import TaskManager from '@/components/TaskManager';
import { useTasks } from '@/services/stores/useTasks';
import { INITIAL_TASKS } from '@/tests/tasks-mock';

describe('TaskManager', () => {
  beforeAll(() => {
    useTasks.setState({
      tasks: INITIAL_TASKS, 
    })
  });

  it('renders the TaskManager component', () => {
    const testId = 'task-manager';
    render(<TaskManager darkMode={true} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('renders the TaskManager with tasks from store', () => {
    render(<TaskManager darkMode={true} />);

    const task = screen.getByText(INITIAL_TASKS[0].title);
    expect(task).toBeInTheDocument();
  });

  describe('Task Filters', async () => {
    it('Filters by all tasks', () => {
      render(<TaskManager darkMode={true} />);
      const filterAll = screen.getByTestId('filter-all');

      waitFor(() => filterAll.click());

      const filteredTask = screen.getByText('Code Refactoring');

      expect(filterAll).toHaveTextContent('All (11)');
    });

    it('Filters by pending tasks', async () => {
      render(<TaskManager darkMode={true} />);
      const filterPending = screen.getByTestId('filter-pending');
      
      waitFor(() => filterPending.click());

      const filteredTask = screen.getByText('Deploy the app');

      expect(filterPending).toHaveTextContent('Pending (3)');
      expect(filteredTask).toBeInTheDocument();
    });

    it('Filters by completed tasks', async () => {
      render(<TaskManager darkMode={true} />);
      const filterCompleted = screen.getByTestId('filter-completed');

      waitFor(() => filterCompleted.click());

      const filteredTask = screen.getByText('Fix Task Filter Bug');

      expect(filterCompleted).toHaveTextContent('Completed (8)');
      expect(filteredTask).toBeInTheDocument();
    });
  });

  describe('Task Actions', () => {
    it('Adds a new task', async () => {
      render(<TaskManager darkMode={true} />);
      const newTask = 'New task :)';
      const input = screen.getByPlaceholderText('New task...');
      const button = screen.getByText('Add task');
      
      fireEvent.change(input, { target: { value: newTask } });
      fireEvent.click(button);

      await waitFor(() => {
        const task = screen.getByText(newTask);
        expect(task).toBeInTheDocument();
      });
    });
    
    it('Toggles a task', async () => {
      render(<TaskManager darkMode={true} />);
      const task = screen.getByText('Deploy the app');
      const checkbox = task.previousElementSibling as HTMLButtonElement;
      fireEvent.click(checkbox);
      
      await waitFor(() => {
        expect(checkbox.ariaChecked).toBe("true");
        expect(task).toHaveClass('line-through');
      });
    });
    
    it('Deletes a task', async () => {
      render(<TaskManager darkMode={true} />);
      const task = screen.getByText('Deploy the app');
      const taskContainer = task.parentElement
      const taskParentContainer = taskContainer?.parentElement
      const deleteButton = taskParentContainer?.children[1] as HTMLButtonElement;

      await waitFor(() => deleteButton.click());

      const confirmDelete = screen.getByText('Delete');
      await waitFor(() => confirmDelete.click());

      expect(task).not.toBeInTheDocument()
    });
  });
});