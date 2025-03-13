import React from "react";

enum FilterOptions {
  All = "all",
  Completed = "completed",
  Pending = "pending",
}

interface TaskFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
  const filters = Object.values(FilterOptions);

  return (
    <div className="flex justify-around mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`text-gray-700 px-4 py-2 rounded ${
            filter === f ? "bg-blue-500 text-white" : ""
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
