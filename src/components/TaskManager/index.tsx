import { useState } from "react";

import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";
import TaskFilters from "@/components/TaskFilters";

import { Filters, Task } from "@/models/TaskManager";
import { useTasks } from "@/services/stores/useTasks";

interface TaskManagerProps {
  darkMode: boolean;
}

const TaskManager = ({ darkMode }: TaskManagerProps) => {
  const [filter, setFilter] = useState<Filters>("all");
  const [newTask, setNewTask] = useState("");

  const { tasks, setTasks } = useTasks((state) => ({
    tasks: state.tasks,
    setTasks: state.setTasks,
  }));

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  const handleAddTask = (title: string) => {
    const newTaskObj: Task = {
      id: tasks.length + 1,
      title,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setFilter("all");
  };

  const getEmptyStateText =
    filter !== "all"
      ? "No tasks found with the current filter"
      : "There are no tasks at the moment";

  return (
    <div
      className={`w-full min-h-52 mx-auto p-4 rounded-lg shadow ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
      data-testid="task-manager"
    >
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
      />
      <TaskFilters filter={filter} setFilter={setFilter} darkMode={darkMode} />
      {filteredTasks.length === 0 && (
        <p className="mt-8 text-center">{getEmptyStateText}</p>
      )}
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default TaskManager;
