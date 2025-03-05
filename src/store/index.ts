import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Task } from "@/types";

export type TaskManagerStore = {
  tasks?: Task[];
  addTask?: (title: string) => void;
  deleteTask?: (id: number) => void;
  toggleTaskCompleted?: (id: number) => void;
  activeFilter?: "all" | "completed" | "pending";
  setFilter?: (filter: "all" | "completed" | "pending") => void;
};

export const useTaskManagerStore = create<TaskManagerStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              title,
              id: Date.now(),
              completed: false,
            },
          ],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskCompleted: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      activeFilter: "all",
      setFilter: (filter) => set({ activeFilter: filter }),
    }),
    {
      name: "task-manager-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
