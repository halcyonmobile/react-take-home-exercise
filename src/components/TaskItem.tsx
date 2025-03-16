import React from "react";
import { Task } from "../types";
import Button from "./common/Button";

type TaskItemProps = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  return (
    <li className="flex items-center justify-between border-b py-3 px-2 hover:bg-gray-50 transition-colors">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer transition-colors ${
          task.completed 
            ? "line-through text-green-500 font-medium" 
            : "text-gray-800 hover:text-gray-600"
        }`}
      >
        {task.title}
      </span>

      <Button 
        onClick={() => onDelete(task.id)}
        variant="danger"
      >
        Delete
      </Button>
    </li>
  );
};

export default TaskItem;
