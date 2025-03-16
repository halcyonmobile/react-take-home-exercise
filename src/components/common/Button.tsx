import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
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
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
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
