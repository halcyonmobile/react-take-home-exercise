import React, { useState } from "react";

import { Item } from "../types";
import Button from "./shared/Button";

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

      <Button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white"
      >
        Delete
      </Button>
    </li>
  );
};

export default TaskItem;
