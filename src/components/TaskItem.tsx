import React from "react";
import { Task } from "./types";

const TaskItem = ({
  task,
  onDelete,
  onToggle,
}: {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) => {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed && "line-through text-green-500"
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
