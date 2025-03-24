import React, { useEffect, useState } from "react";

import TaskItem from "./TaskItem";
import { Item } from "../constants/Item";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Item[]>([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Clean the house", completed: true },
  ]);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => setLastUpdate(new Date()), [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0)

    const newTaskObj:Item = {
      id: maxId + 1,
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    setLastUpdate(new Date());
    task.completed = !task.completed;
  };

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
      <form key={lastUpdate.toString()} onSubmit={handleAddTask} className="mb-4 flex">
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
      <div className="flex justify-around mb-4">
        <button onClick={() => setFilter("all")} className="text-gray-700">
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="text-gray-700"
        >
          Completed
        </button>
        <button onClick={() => setFilter("pending")} className="text-gray-700">
          Pending
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggle={toggleTaskCompletion}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
