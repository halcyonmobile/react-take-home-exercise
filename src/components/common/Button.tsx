import React, { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-white text-gray-800 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
    onClick={onClick}
    type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
