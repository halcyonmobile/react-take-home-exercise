import React, { useState, useCallback } from "react";

import { INITIAL_TASKS } from "../mock/Tasks";
import { Task, TaskFilterStatus } from "../types";

import { filterTasks, getNextTaskId } from "../utils/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<TaskFilterStatus>("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filteredTasks = useCallback(() => {
    return filterTasks(tasks, filter);
  }, [tasks, filter]);

  const addTask = useCallback((title: string) => {
    if (!title.trim()) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: getNextTaskId(prevTasks),
        title: title.trim(),
        completed: false,
      },
    ]);
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return {
    tasks: filteredTasks(),
    filter,
    newTaskTitle,
    setFilter,
    setNewTaskTitle,
    addTask,
    deleteTask,
    toggleTask,
  };
};