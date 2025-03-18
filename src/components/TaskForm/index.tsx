import { FiPlus } from "react-icons/fi"

interface TaskFormProps {
  newTask: string;
  setNewTask: (task: string) => void;
  handleAddTask: (title: string) => void;
}

const TaskForm = ({ newTask, setNewTask, handleAddTask }: TaskFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask) return;
    handleAddTask(newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 flex">
      <input
        type="text"
        placeholder="New task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow border text-gray-800 rounded-l-lg py-2 px-3 h-11"
      />
      <button
        data-testid="add-task"
        type="submit"
        className="bg-indigo-700 flex items-center text-white text-sm sm:text-base px-4 font-bold rounded-r-lg h-11 hover:bg-indigo-500 transition-colors"
      >
        <FiPlus size={18} />
      </button>
    </form>
  );
};

export default TaskForm;
