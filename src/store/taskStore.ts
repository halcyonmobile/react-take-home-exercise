import { create } from "zustand";
import { Filter } from "../types/filter";
import { Task } from "../types/task";

type TaskStore = {
  tasks: Task[];
  currentFilter: Filter;
  deletingTask: Task | null;
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
  setFilter: (filter: Filter) => void;
  setDeletingTask: (id: Task | null) => void;
};

const useTaskStore = create<TaskStore>()((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "null") || [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Clean the house", completed: true },
  ],
  currentFilter: "all",
  deletingTask: null,
  addTask: (title) =>
    set((state) => {
      const updatedTasks = [
        ...state.tasks,
        { id: state.tasks.length + 1, title, completed: false },
      ];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        tasks: updatedTasks,
      };
    }),
  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks, deletingTask: null };
    }),
  toggleTaskCompletion: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        tasks: updatedTasks,
      };
    }),
  setFilter: (filter) => set(() => ({ currentFilter: filter })),
  setDeletingTask: (task) => set(() => ({ deletingTask: task })),
}));

export default useTaskStore;
