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
    setNewTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
        type="text"
        placeholder="New task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow border text-gray-800 rounded-l-lg py-2 px-3 h-11"
      />
      <button type="submit" className="bg-indigo-700 text-white px-4 font-bold rounded-r-lg h-11 hover:bg-indigo-500 transition-colors">
        Add task
      </button>
    </form>
  );
};

export default TaskForm;