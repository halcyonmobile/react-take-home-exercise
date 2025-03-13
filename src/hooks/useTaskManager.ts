import { useState, useEffect } from "react";
import { Task, addTask, deleteTask, toggleTaskCompletion } from "../services/taskService";
import { getFromStorage, saveToStorage } from "../services/storageService";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(getFromStorage("tasks"));
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    saveToStorage("tasks", tasks);
  }, [tasks]);

  const addNewTask = (title: string) => {
    setTasks((prev) => addTask(prev, title));
  };

  const removeTask = (id: number) => {
    setTasks((prev) => deleteTask(prev, id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => toggleTaskCompletion(prev, id));
  };

  return { tasks, filter, setFilter, addNewTask, removeTask, toggleTask };
};
