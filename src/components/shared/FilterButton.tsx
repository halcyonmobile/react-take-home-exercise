import React from "react";

type FilterButtonProps = {
  filterKey: string,
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