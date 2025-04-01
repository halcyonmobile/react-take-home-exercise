import { useAtom } from "jotai"
import { tasksAtom } from "@state/tasks"
import type { Task, Filter } from "@customTypes/types"
import { getNewTaskId } from "../utils/tasks"

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom)

  const addTask = (title: string) => {
    if (!title.trim()) return
    const newTask: Task = {
      id: getNewTaskId(tasks),
      title,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filterTasks = (filter: Filter) => {
    return tasks.filter(task => {
      if (filter === "completed") return task.completed
      if (filter === "pending") return !task.completed
      return true
    })
  }

  return { tasks, addTask, deleteTask, toggleTask, filterTasks }
}
