import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { v7 as uuidV7 } from "uuid";
import { ETaskState, type ITask } from "../types/task.type";

interface TaskStore {
  tasks: ITask[];
  filter: ETaskState;
  addTask: (title: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: ETaskState) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "01953e82-ae34-7344-aa4f-95008fc9a844",
          title: "Buy groceries",
          completed: false,
        },
        {
          id: "01953e82-cb18-742c-80a7-0ecf4d42aaaf",
          title: "Clean the house",
          completed: true,
        },
      ],
      filter: ETaskState.ALL,

      addTask: (title: string) => {
        set(
          produce((state: TaskStore) => {
            state.tasks.push({
              id: uuidV7(),
              title,
              completed: false,
            });
          })
        );
      },

      toggleTaskCompletion: (id: string) => {
        set(
          produce((state: TaskStore) => {
            const task = state.tasks.find((t) => t.id === id);
            if (task) task.completed = !task.completed;
          })
        );
      },

      deleteTask: (id: string) => {
        set(
          produce((state: TaskStore) => {
            state.tasks = state.tasks.filter((task) => task.id !== id);
          })
        );
      },

      setFilter: (filter: ETaskState) => set({ filter }),
    }),
    {
      name: "task-storage",
    }
  )
);
