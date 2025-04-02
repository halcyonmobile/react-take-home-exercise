import React from "react";
import { Modal } from "./Modal";

const DeleteTaskModal = ({
  isOpen,
  onDelete,
  onCancel,
}: {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal isOpen={isOpen}>
      Are you sure you want to delete this task?
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel{" "}
        </button>
      </div>
    </Modal>
  );
};
export default DeleteTaskModal;
