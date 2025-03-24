import { useEffect, useState } from "react";
import { Item, TaskFilter } from "../types";

const FILTERS: TaskFilter[] = ["all", "completed", "pending"];

const useTasks = () => {
  const [tasks, setTasks] = useState<Item[]>([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Clean the house", completed: true },
  ]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [newTask, setNewTask] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => setLastUpdate(new Date()), [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0)

    const newTaskObj: Item = {
      id: maxId + 1,
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    setLastUpdate(new Date());
    task.completed = !task.completed;
  };

  return {
    filter,
    filters: FILTERS,
    handleAddTask,
    handleDeleteTask,
    lastUpdate,
    newTask,
    setFilter,
    setNewTask,
    tasks: filteredTasks,
    toggleTaskCompletion,
  };
}

export default useTasks;