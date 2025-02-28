import React, { useState } from "react";
import useTaskStore from "../../store/taskStore";

const TaskForm = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTaskTitle.trim() === "") return;

    const existingTask = tasks.find((task) => task.title === newTaskTitle);
    if (existingTask) return;

    addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <form onSubmit={handleAddTask} className="mb-4 flex">
      <input
        type="text"
        placeholder="New task..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="flex-grow border rounded-l py-2 px-3"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
