import { persist, createJSONStorage } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { StorageKeys } from "../storage/StorageKeys";
import { zustandStorage } from "../zustand/zustandStorage";
import { Task } from "@/models/TaskManager";

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export const useTasks = createWithEqualityFn<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      setTasks: (tasks: Task[]) => set({ tasks }),
      toggleTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: StorageKeys.TASKS,
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
