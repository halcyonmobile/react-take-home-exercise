import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { TaskFilter } from "../../types";

interface FilterButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  filterKey: TaskFilter,
  currentFilter: string,
}

const FilterButton = ({ filterKey, currentFilter, ...props }: FilterButtonProps) => {
  const { className, ...originalProps } = props;

  const classNameForCurrentFilter = currentFilter === filterKey ? "bg-blue-500 text-white" : "text-gray-700";

  const buttonClassName = `px-5 py-2 rounded capitalize ${classNameForCurrentFilter} ${className || ''}`.trim().replace(/\s+/g, ' ');
  
  return <button className={buttonClassName} {...originalProps}>
    {filterKey}
  </button>
};

export default FilterButton;
