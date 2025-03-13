import React from "react";
import { motion } from "framer-motion";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-xl text-center"
      >
        <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this task?</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
            Yes
          </button>
          <button onClick={onCancel} className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmation;
