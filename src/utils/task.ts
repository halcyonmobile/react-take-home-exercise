import { Task, TaskFilterStatus } from "../types";

export const getNextTaskId = (tasks: Task[]): number => {
  return Math.max(...tasks.map((task) => task.id), 0) + 1;
};

export const filterTasks = (tasks: Task[], status: TaskFilterStatus): Task[] => {
  switch (status) {
    case "completed":
      return tasks.filter((task) => task.completed);
    case "pending":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
};