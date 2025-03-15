import React, { useState } from "react";

import TaskItem from "./TaskItem";
import { Task, TaskStatus } from "../types";
import Button from "./common/Button";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Clean the house", completed: true },
  ]);
  const [filter, setFilter] = useState<TaskStatus>("all");
  const [newTask, setNewTask] = useState<string>('');

  // SOLVED - Intentional bug: The filter conditions are reversed.
  const filteredTasks: Task[] = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof newTask !== 'string' || newTask.trim() === "") return;

    const newTaskObj: Task = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  // Intentional bug: Directly mutating the tasks array when deleting.
  const handleDeleteTask = (id: number) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      setTasks(tasks);
    }
  };

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id
          ? { ...t, completed: !t.completed }
          : t))
      );
    }
  };

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
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
      <div className="flex justify-around mb-4">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "secondary" : "primary"}
          
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          variant={filter === "completed" ? "secondary" : "primary"}
        >
          completed
        </Button>
        <Button
          onClick={() => setFilter("pending")}
          variant={filter === "pending" ? "secondary" : "primary"}
        >
          pending
        </Button>
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
