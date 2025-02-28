import React from "react";
import { Filter } from "../../types/filter";
import useTaskStore from "../../store/taskStore";

const TaskFilter = () => {
  const currentFilter = useTaskStore((state) => state.currentFilter);
  const setFilter = useTaskStore((state) => state.setFilter);
  const filters: Filter[] = ["all", "completed", "pending"];

  return (
    <div className="flex justify-around mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`text-gray-700 w-1/2 p-1 duration-200 ${
            currentFilter === filter ? "font-bold bg-slate-300" : "bg-slate-200"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
