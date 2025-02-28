import React from "react";
import { Task } from "../../../types/task";
import useTaskStore from "../../../store/taskStore";

const TaskItem = ({ task }: { task: Task }) => {
  const toggleTaskCompletion = useTaskStore(
    (state) => state.toggleTaskCompletion
  );
  const setDeletingTask = useTaskStore((state) => state.setDeletingTask);

  return (
    <>
      <li className="flex items-center justify-between border-b py-2">
        <span
          onClick={() => toggleTaskCompletion(task.id)}
          className={`cursor-pointer select-none duration-200 active:scale-110 ${
            task.completed ? "line-through text-green-500" : "text-black"
          }`}
        >
          {task.title}
        </span>

        <button
          onClick={() => setDeletingTask(task)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </li>
    </>
  );
};

export default TaskItem;
