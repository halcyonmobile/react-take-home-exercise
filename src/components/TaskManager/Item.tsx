import React from "react";
import { createPortal } from "react-dom";

import Modal from "@/components/TaskManager/Modal";

import { useTaskManagerStore } from "@/store";
import { Task } from "@/types";

type Props = {
  task: Task;
};

const Item = ({ task }: Props) => {
  const [showModal, setShowModal] = React.useState(false);

  const { deleteTask, toggleTaskCompleted } = useTaskManagerStore(
    (state) => state
  );

  const handleTitleClick = () => {
    toggleTaskCompleted(task.id);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleDeleteConsent = () => {
    setShowModal(false);
    setTimeout(() => {
      deleteTask(task.id);
    }, 300);
  };

  return (
    <li className="flex items-center justify-between border-b py-4">
      <span
        className={`cursor-pointer ${
          task.completed ? "line-through text-green-500" : "text-black"
        }`}
        onClick={handleTitleClick}
      >
        {task.title}
      </span>

      <button
        className="bg-red-500 text-white px-4 py-1 rounded"
        onClick={handleDeleteClick}
      >
        Delete
      </button>

      {createPortal(
        <Modal
          isOpen={showModal}
          onDelete={handleDeleteConsent}
          onCancel={() => setShowModal(false)}
        />,
        document.body
      )}
    </li>
  );
};

export default Item;
