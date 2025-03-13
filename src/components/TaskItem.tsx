import React from "react";
import { Task } from "../services/taskService";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between border-b py-3 px-4 bg-gray-50 rounded-lg shadow-sm"
    >
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer transition-all ${
          task.completed ? "line-through text-gray-500" : "text-black"
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
      >
        Delete
      </button>
    </motion.div>
  );
};

export default TaskItem;
