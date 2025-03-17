import React from 'react';
import Button from './Button';

type ConfirmDialogProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onCancel}
            variant="secondary"
          >
            No
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;