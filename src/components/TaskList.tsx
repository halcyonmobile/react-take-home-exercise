import React from "react"
import TaskItem from "./TaskItem"
import { Task } from "../types/types"

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggle }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  )
}

export default TaskList
