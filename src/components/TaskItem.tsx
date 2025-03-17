import { useState } from "react";
import { Task } from "../types";
import Button from "./common/Button";
import ConfirmDialog from "./common/ConfirmDialog";

type TaskItemProps = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b py-3 px-2 hover:bg-gray-50 transition-colors gap-2 sm:gap-4">
        <span
          onClick={() => onToggle(task.id)}
          className={`cursor-pointer transition-colors flex-grow ${
            task.completed
              ? "line-through text-green-500 font-medium"
              : "text-gray-800 hover:text-gray-600"
          }`}
        >
          {task.title}
        </span>

        <Button
          onClick={handleDeleteClick}
          variant="danger"
          className="w-full sm:w-auto"
        >
          Delete
        </Button>
      </li>

      <ConfirmDialog
        isOpen={showConfirm}
        message="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default TaskItem;
