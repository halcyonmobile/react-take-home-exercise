import { useState, useCallback, useEffect } from "react";

import { INITIAL_TASKS } from "../mock/Tasks";
import { Task, TaskFilterStatus } from "../types";

import { filterTasks, getNextTaskId } from "../utils/task";

const STORAGE_KEY = "task-manager-tasks";

const getStoredTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : INITIAL_TASKS;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);
  const [filter, setFilter] = useState<TaskFilterStatus>("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setTasks((currentTasks) => {
      const newTask: Task = {
        id: getNextTaskId(currentTasks),
        title: trimmedTitle,
        completed: false,
      };
      return [...currentTasks, newTask];
    });
  }, []);

  const deleteTask = useCallback((taskId: number) => {
    setTasks((currentTasks) => 
      currentTasks.filter((task) => task.id !== taskId)
    );
  }, []);

  const toggleTask = useCallback((taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const filteredTasks = filterTasks(tasks, filter);

  return {
    tasks: filteredTasks,
    filter,
    newTaskTitle,
    setFilter,
    setNewTaskTitle,
    addTask,
    deleteTask,
    toggleTask,
  };
};