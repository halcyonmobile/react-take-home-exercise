import React from "react";
import useTaskStore from "../../store/taskStore";

const DeleteTaskModal = () => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const deletingTask = useTaskStore((state) => state.deletingTask);
  const setDeletingTask = useTaskStore((state) => state.setDeletingTask);

  const handleCloseModal = () => {
    setDeletingTask(null);
  };

  if (!deletingTask) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 text-center animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold">Are you sure?</p>
        <p className="text-gray-600 mb-4">
          Do you really want to delete the task <i>{deletingTask.title}</i>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteTask(deletingTask.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
