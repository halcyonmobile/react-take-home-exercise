import { Task } from "@customTypes/types"

export const getNewTaskId = (tasks: Task[]): number => {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
}
