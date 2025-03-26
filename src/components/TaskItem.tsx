import React, { useState } from "react";

import { Item } from "../types";
import Button from "./shared/Button";
import Modal from "./shared/Modal";

type TaskItemProps = {
  task: Item,
  onDelete: Function,
  onToggle: Function,
}

const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteTask = () => {
    onDelete(task.id);
    setDeleteModalOpen(false);
  }

  return (
    <li role="taskItem" className="flex items-center justify-between border-b py-2">
      <span 
        role="taskItem:toggleCompletedAndShowTitle"
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer pr-1 ${
          task.completed ? "line-through text-green-500" : "text-black"
        }`}
      >
        {task.title}
      </span>

      <Button
        onClick={() => setDeleteModalOpen(true)}
        className="bg-red-500 text-white"
        role="taskItem:delete"
      >
        Delete
      </Button>

      <Modal isOpen={deleteModalOpen}>
        <p className="pb-4">
          Do you really want to delete the {task.completed ? 'completed' : 'pending'} task 
          <span className="font-bold"> {task.title}</span>?
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            onClick={() => deleteTask()}
            className="bg-red-500 text-white md:w-40 sm:w-20"
            >
            DELETE
            </Button>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            className="bg-gray-500 text-white md:w-40 sm:w-20"
            >
            Cancel
          </Button>
        </div>
      </Modal>
    </li>
  );
};

export default TaskItem;
