import React, { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    onAdd(newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleAddTask} className="mb-4 flex">
      <input
        type="text"
        placeholder="New task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow border rounded-l py-2 px-3"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
