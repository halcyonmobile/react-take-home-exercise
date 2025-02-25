import React from "react";
import { ETaskState } from "../../types/task.type";

interface ITaskFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<ETaskState>>;
  filter: ETaskState;
}

const TaskFilter: React.FC<ITaskFilterProps> = ({ setFilter, filter }) => {
  return (
    <div className="flex justify-around mb-4">
      <button
        type="button"
        onClick={() => setFilter(ETaskState.ALL)}
        className={`text-gray-700 ${
          filter === ETaskState.ALL ? "font-bold" : ""
        }`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => setFilter(ETaskState.COMPLETED)}
        className={`text-gray-700 ${
          filter === ETaskState.COMPLETED ? "font-bold" : ""
        }`}
      >
        Completed
      </button>
      <button
        type="button"
        onClick={() => setFilter(ETaskState.PENDING)}
        className={`text-gray-700 ${
          filter === ETaskState.PENDING ? "font-bold" : ""
        }`}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
