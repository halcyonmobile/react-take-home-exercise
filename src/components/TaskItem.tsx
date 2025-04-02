import React from "react";
import { useDeleteTask, useUpdateTask } from "../hooks/useTask";
import { Task } from "./types";

const TaskItem = ({ task }: { task: Task }) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const deleteHandler = () => {
    deleteTask(task.id.toString());
  };

  const toogleCompleteHandler = () => {
    updateTask({
      id: task.id.toString(),
      task: { ...task, completed: !task.completed },
    });
  };

  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        className={`cursor-pointer ${
          task.completed && "line-through text-green-500"
        }`}
        onClick={toogleCompleteHandler}
      >
        {task.title}
      </span>

      <button
        onClick={deleteHandler}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
