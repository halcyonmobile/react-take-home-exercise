import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../useTasks';
import { INITIAL_TASKS } from '../../mock/Tasks';
import { Task } from '../../types';

describe('useTasks Hook', () => {

  it('initializes with INITIAL_TASKS', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual(INITIAL_TASKS);
  });

  it('adds a new task correctly', () => {
    const { result } = renderHook(() => useTasks());
    const newTaskTitle = 'New Test Task';

    act(() => {
      result.current.addTask(newTaskTitle);
    });

    const newTask = result.current.tasks.find((task: Task) => task.title === newTaskTitle);
    expect(newTask).toBeTruthy();
    expect(newTask?.completed).toBe(false);
  });

  it('deletes a task correctly', () => {
    const { result } = renderHook(() => useTasks());
    const taskToDelete = INITIAL_TASKS[0];

    act(() => {
      result.current.deleteTask(taskToDelete.id);
    });

    expect(result.current.tasks.find((task: Task) => task.id === taskToDelete.id)).toBeUndefined();
  });

  it('toggles task completion correctly', () => {
    const { result } = renderHook(() => useTasks());
    const taskToToggle = INITIAL_TASKS[0];
    const initialCompletionState = taskToToggle.completed;

    act(() => {
      result.current.toggleTask(taskToToggle.id);
    });

    const toggledTask = result.current.tasks.find((task: Task) => task.id === taskToToggle.id);
    expect(toggledTask?.completed).toBe(!initialCompletionState);
  });

  it('filters tasks correctly', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setFilter('completed');
    });
    expect(result.current.tasks.every((task: Task) => task.completed)).toBe(true);

    act(() => {
      result.current.setFilter('pending');
    });
    expect(result.current.tasks.every((task: Task) => !task.completed)).toBe(true);

    act(() => {
      result.current.setFilter('all');
    });
    expect(result.current.tasks).toEqual(INITIAL_TASKS);
  });

  it('handles new task title state', () => {
    const { result } = renderHook(() => useTasks());
    const newTitle = 'New Task';

    act(() => {
      result.current.setNewTaskTitle(newTitle);
    });

    expect(result.current.newTaskTitle).toBe(newTitle);
  });

  it('does not add empty tasks', () => {
    const { result } = renderHook(() => useTasks());
    const initialTaskCount = result.current.tasks.length;

    act(() => {
      result.current.addTask('');
    });

    expect(result.current.tasks.length).toBe(initialTaskCount);
  });

  it('trims task title when adding', () => {
    const { result } = renderHook(() => useTasks());
    const taskTitle = '  New Task  ';

    act(() => {
      result.current.addTask(taskTitle);
    });

    const newTask = result.current.tasks.find((task: Task) => task.title === taskTitle.trim());
    expect(newTask).toBeTruthy();
  });
});