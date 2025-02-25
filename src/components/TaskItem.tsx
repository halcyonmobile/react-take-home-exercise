import React from "react";

type TaskItemProps = {
  task: { id: number; title: string; completed: boolean };
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        className={`flex-1 cursor-pointer ${task.completed ? "line-through text-green-500" : "text-black"}`}
        onClick={() => onToggle(task.id)}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
