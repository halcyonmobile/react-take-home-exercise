import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

const Button = ({ onClick, children, ...props } : ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...originalProps } = props;

  const buttonClassName = `${className || ''} px-4 py-2 rounded`.trim();

  return (
  <button
    onClick={onClick}
    className={buttonClassName}
    {...originalProps}
  >
    {children}
  </button>
)};

export default Button;
