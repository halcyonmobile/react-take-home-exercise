import { FiList, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import { Filters, Task } from "@/models/TaskManager";
import { useTasks } from "@/services/stores/useTasks";

interface Props {
  filter: Filters;
  setFilter: (filter: Filters) => void;
  darkMode: boolean;
}

interface ButtonProps {
  active: boolean;
  label: string;
  darkMode: boolean;
  icon: JSX.Element;
  testId: string;
  onClick: () => void;
}

const FilterIcon = ({ label }: { label: Filters }) =>
  ({
    all: <FiList className="mr-2" size={18} />,
    completed: <FiCheckCircle className="mr-2" size={18} />,
    pending: <FiAlertCircle className="mr-2" size={18} />,
  }[label]);

const FilterButton = ({
  active,
  label,
  darkMode,
  icon,
  testId,
  onClick,
}: ButtonProps) => (
  <button
    data-testid={testId}
    onClick={onClick}
    className={`text-sm sm:text-base px-4 py-2 w-40 sm:w-auto mb-2
      ${darkMode ? "text-gray-200" : "text-gray-800"} 
      ${
        active
          ? darkMode
            ? "font-bold border-b-2 border-b-slate-200"
            : "font-bold border-b-2 border-b-slate-950"
          : ""
      }`}
  >
    <p className="flex items-center">
      {icon} {label}
    </p>
  </button>
);

const TaskFilters = ({ filter, setFilter, darkMode }: Props) => {
  const tasks = useTasks((state) => state.tasks);

  const allTaskAmount = tasks?.length;
  const pendingTaskAmount = tasks?.filter(
    (task: Task) => !task.completed
  ).length;
  const completedTaskAmount = tasks?.filter(
    (task: Task) => task.completed
  ).length;

  return (
    <div className="mb-4 flex flex-col items-center sm:flex-row sm:justify-around">
      <FilterButton
        testId="filter-all"
        active={filter === "all"}
        onClick={() => setFilter("all")}
        darkMode={darkMode}
        icon={<FilterIcon label="all" />}
        label={`All (${allTaskAmount})`}
      />
      <FilterButton
        testId="filter-pending"
        active={filter === "pending"}
        onClick={() => setFilter("pending")}
        darkMode={darkMode}
        icon={<FilterIcon label="pending" />}
        label={`Pending (${pendingTaskAmount})`}
      />
      <FilterButton
        testId="filter-completed"
        active={filter === "completed"}
        onClick={() => setFilter("completed")}
        darkMode={darkMode}
        icon={<FilterIcon label="completed" />}
        label={`Completed (${completedTaskAmount})`}
      />
    </div>
  );
};

export default TaskFilters;
