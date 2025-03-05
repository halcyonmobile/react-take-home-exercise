import React from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
};

const Modal = ({ isOpen, onDelete, onCancel }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <motion.div
            key="modal"
            className="fixed bg-gray-100 w-2/3 max-w-96 h m-0 p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="modal"
          >
            <p className="mb-6 text-pretty text-center">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={onDelete}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-white px-4 py-1 rounded"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
