import React from "react";

import { TaskFilter } from "../../types";

type FilterButtonProps = {
  filterKey: TaskFilter,
  setFilter: Function,
  currentFilter: string,
}

const FilterButton = ({ filterKey, setFilter, currentFilter }: FilterButtonProps) => {
  const className = currentFilter === filterKey ? "bg-blue-500 text-white" : "text-gray-700";
  return <button onClick={() => setFilter(filterKey)} className={`px-5 py-2 rounded capitalize ${className}`}>
    {filterKey}
  </button>
};

export default FilterButton;
