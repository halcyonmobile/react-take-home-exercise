import { Filters } from "@/models/TaskManager";
import { FiList, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

interface Props {
  filter: Filters;
  setFilter: (filter: Filters) => void;
  darkMode: boolean;
}

interface ButtonProps {
  active: boolean;
  label: string;
  darkMode: boolean;
  onClick: () => void;
}

const FilterIcon = ({ label }: { label: Filters}) => ({
  all: <FiList className="mr-2" size={18} />,
  completed: <FiCheckCircle className="mr-2" size={18} />,
  pending: <FiAlertCircle className="mr-2" size={18} />,
}[label]);

const FilterButton = ({ active, label, darkMode, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2
        ${darkMode ? 'text-gray-200' : 'text-gray-800'} 
        ${active ? (darkMode ? 'font-bold border-b-2 border-b-slate-200' : 'font-bold border-b-2 border-b-slate-950') : ''}`}
    >
      <p className="flex items-center"><FilterIcon label={label.toLowerCase() as Filters} /> {label}</p>
    </button>
  );
};

const TaskFilters = ({ filter, setFilter, darkMode }: Props) => {
  return (
    <div className="flex justify-around mb-4">
      <FilterButton active={filter === "all"} onClick={() => setFilter("all")} darkMode={darkMode} label="All" />
      <FilterButton active={filter === "pending"} onClick={() => setFilter("pending")} darkMode={darkMode} label="Pending" />
      <FilterButton active={filter === "completed"} onClick={() => setFilter("completed")} darkMode={darkMode} label="Completed" />
    </div>
  );
};

export default TaskFilters;