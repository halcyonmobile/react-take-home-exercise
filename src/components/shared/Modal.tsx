import React from "react";

const Modal = ({ children, isOpen }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="w-6/12">
      <div className="bg-white p-2 rounded">
        { children }
      </div>
      </div>
    </div>
  );
};

export default Modal;