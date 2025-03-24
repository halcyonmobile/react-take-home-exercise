import React from "react";

import { TaskFilter } from "../../types";

type FilterButtonProps = {
  filterKey: TaskFilter,
  setFilter: Function,
  currentFilter: string,
}

const FilterButton = ({ filterKey, setFilter, currentFilter }: FilterButtonProps) => {
  const className = currentFilter === filterKey ? "text-blue-500" : "text-gray-700";
  return <button onClick={() => setFilter(filterKey)} className={`capitalize ${className}`}>
    {filterKey}
  </button>
};

export default FilterButton;
