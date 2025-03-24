import React from "react";

type ModalProps = {
    children?: React.ReactNode,
    isOpen: boolean,
}

const Modal = ({ children, isOpen }: ModalProps) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="md:w-3/6 sm:w-5/6">
      <div className="bg-white p-2 rounded">
        { children }
      </div>
      </div>
    </div>
  );
};

export default Modal;