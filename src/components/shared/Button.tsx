import React, { MouseEventHandler } from "react";

type ButtonProps = {
    children?: React.ReactNode,
    className?: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const Button = ({ onClick, className='', children } : ButtonProps) => (
  <button
    onClick={onClick}
    className={`${className} px-4 py-2 rounded`}
  >
    {children}
  </button>
);

export default Button;
