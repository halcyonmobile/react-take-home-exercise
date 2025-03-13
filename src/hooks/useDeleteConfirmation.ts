import { useState } from "react";

export const useDeleteConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const requestConfirmation = (taskId: number, onConfirmCallback: () => void) => {
    setTaskToDelete(taskId);
    setOnConfirm(() => onConfirmCallback);
    setIsOpen(true);
  };

  const confirm = () => {
    if (onConfirm) onConfirm();
    setIsOpen(false);
    setTaskToDelete(null);
  };

  const cancel = () => {
    setIsOpen(false);
    setTaskToDelete(null);
  };

  return { isOpen, taskToDelete, requestConfirmation, confirm, cancel };
};