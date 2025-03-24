import React from "react";
import { Item } from "../types";

type TaskItemProps = {
  task: Item,
  onDelete: Function,
  onToggle: Function,
}

const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-green-500" : "text-black"
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
