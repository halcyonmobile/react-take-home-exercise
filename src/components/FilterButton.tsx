import React from "react";
import { Filter } from "./types";

const FilterButton = ({
  filter,
  value,
  onClick,
  children,
}: {
  filter: Filter;
  value: Filter;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-gray-700 ${filter === value ? "underline" : ""}`}
    >
      {children}
    </button>
  );
};

export default FilterButton;
