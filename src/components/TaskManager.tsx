import React, { useState } from "react";
import { useTaskManager } from "../hooks/useTaskManager";
import { useDeleteConfirmation } from "../hooks/useDeleteConfirmation";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmation from "./DeleteConfirmation";

const TaskManager = () => {
  const { tasks, filter, setFilter, addNewTask, removeTask, toggleTask } = useTaskManager();
  const { isOpen, requestConfirmation, confirm, cancel } = useDeleteConfirmation();
  const [newTask, setNewTask] = useState("");

  const getFilteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addNewTask(newTask);
    setNewTask("");
  };

  return (
    <div className="container mx-auto bg-white p-6 rounded shadow-lg">
      <form onSubmit={handleTaskSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
          Add
        </button>
      </form>

      <TaskFilter filter={filter} setFilter={setFilter} />

      <ul className="space-y-2 mt-4">
        <AnimatePresence>
          {getFilteredTasks().map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TaskItem task={task} onDelete={() => requestConfirmation(task.id, () => removeTask(task.id))} onToggle={toggleTask} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <DeleteConfirmation isOpen={isOpen} onConfirm={confirm} onCancel={cancel} />
    </div>
  );
};

export default TaskManager;
