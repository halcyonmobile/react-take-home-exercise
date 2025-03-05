import React from "react";

import { useTaskManagerStore } from "@/store";

const filters = ["all", "completed", "pending"];

const Filters = () => {
  const { activeFilter, setFilter } = useTaskManagerStore((state) => state);

  const handleFilterClick = (value) => () => {
    setFilter(value);
  };

  return (
    <div className="flex gap-4 justify-around mb-4 text-gray-700">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`grow rounded capitalize py-2 ${
            activeFilter === filter ? "bg-gray-200" : ""
          }`}
          onClick={handleFilterClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filters;
