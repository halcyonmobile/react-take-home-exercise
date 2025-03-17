import { getNextTaskId, filterTasks } from '../task';
import { INITIAL_TASKS } from '../../mock/Tasks';
import { Task } from '../../types';

describe('Task Utilities', () => {
  describe('getNextTaskId', () => {
    it('returns 1 for empty task list', () => {
      expect(getNextTaskId([])).toBe(1);
    });

    it('returns next available ID based on highest existing ID', () => {
      expect(getNextTaskId(INITIAL_TASKS)).toBe(3);
    });

    it('handles non-sequential IDs', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 5, title: 'Task 5', completed: false },
        { id: 3, title: 'Task 3', completed: true },
      ];
      expect(getNextTaskId(tasks)).toBe(6);
    });
  });

  describe('filterTasks', () => {
    const tasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
      { id: 3, title: 'Task 3', completed: false },
      { id: 4, title: 'Task 4', completed: true },
    ];

    it('returns all tasks when status is "all"', () => {
      const filtered = filterTasks(tasks, 'all');
      expect(filtered).toHaveLength(4);
      expect(filtered).toEqual(tasks);
    });

    it('returns only completed tasks when status is "completed"', () => {
      const filtered = filterTasks(tasks, 'completed');
      expect(filtered).toHaveLength(2);
      expect(filtered.every(task => task.completed)).toBe(true);
    });

    it('returns only pending tasks when status is "pending"', () => {
      const filtered = filterTasks(tasks, 'pending');
      expect(filtered).toHaveLength(2);
      expect(filtered.every(task => !task.completed)).toBe(true);
    });

    it('works with empty task list', () => {
      expect(filterTasks([], 'all')).toHaveLength(0);
      expect(filterTasks([], 'completed')).toHaveLength(0);
      expect(filterTasks([], 'pending')).toHaveLength(0);
    });

    it('works with INITIAL_TASKS mock data', () => {
      expect(filterTasks(INITIAL_TASKS, 'completed')).toHaveLength(1);
      expect(filterTasks(INITIAL_TASKS, 'pending')).toHaveLength(1);
      expect(filterTasks(INITIAL_TASKS, 'all')).toHaveLength(2);
    });
  });
});