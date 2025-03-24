import React from "react";

const Button = ({ onClick, className='', children }) => (
  <button
    onClick={onClick}
    className={`${className} px-4 py-2 rounded`}
  >
    {children}
  </button>
);

export default Button;
