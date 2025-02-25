import React from "react";
import type { ITask } from "../../types/task.type";

interface ITaskItemProps {
  task: ITask;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<ITaskItemProps> = ({ onDelete, onToggle, task }) => {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <label
        htmlFor={`task-${task.id}`}
        className={`flex items-center gap-2 cursor-pointer ${
          task.completed ? "line-through text-green-500" : "text-black"
        }`}
      >
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-checked={task.completed ? "true" : "false"}
        ></input>
        {task.title}
      </label>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-400"
        aria-label={`Delete task "${task.title}"`}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
