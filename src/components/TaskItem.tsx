import React, { FC } from "react"
import { Task } from "../types/types"

interface TaskItemProps {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TaskItem: FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <li className="flex items-center justify-between border-b py-2 px-4">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer transition duration-200 ${task.completed ? "line-through text-green-600" : "text-gray-900 hover:text-gray-600"
          }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem
