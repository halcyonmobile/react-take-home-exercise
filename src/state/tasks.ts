import { atom } from "jotai"

export type Task = {
  id: number
  title: string
  completed: boolean
}

export const tasksAtom = atom<Task[]>([
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Clean the house", completed: true },
])
