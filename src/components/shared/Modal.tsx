import React, { AllHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactHTMLElement, ReactNode } from "react";

interface DataProps {
  [headerName: `data-${string}`]: string
}

interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean,
    bgDivProps?: AllHTMLAttributes<HTMLElement> | DataProps,
}

const Modal = ({ children, isOpen, bgDivProps, ...modalDivProps }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div role="modalBackgrond" className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center" {...bgDivProps}>
      <div role="modalSizePanel" className="md:w-3/6 sm:w-5/6">
        <div role="modalPanel" className="bg-white p-2 rounded" {...modalDivProps}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Modal;
