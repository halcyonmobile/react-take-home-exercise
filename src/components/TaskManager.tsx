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
  const [newTask, setNewTask] = useState<string>("");

  // SOLVED - Intentional bug: The filter conditions are reversed.
  const filteredTasks: Task[] = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  const getNextId = (tasks: Task[]): number => {
    return Math.max(...tasks.map((task) => task.id), 0) + 1;
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof newTask !== "string" || newTask.trim() === "") return;

    const newTaskObj: Task = {
      id: getNextId(tasks),
      title: newTask,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  // SOLVED -Intentional bug: Directly mutating the tasks array when deleting.
  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    }
  };

  return (
    <div className="container mx-auto bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md max-w-2xl flex flex-col">
      <form onSubmit={handleAddTask} className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded sm:rounded-r-none py-2 px-3"
        />
        <Button
          type="submit"
          variant="primary"
          className="sm:rounded-l-none sm:rounded-r w-full sm:w-auto"
        >
          Add
        </Button>
      </form>
      <div className="inline-flex flex-col sm:flex-row rounded-lg p-1 bg-gray-100 mb-4 mx-auto 
      w-full sm:w-auto
      ">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "secondary" : "primary"}
          className={`rounded-none first:rounded-t sm:first:rounded-l sm:first:rounded-t-none last:rounded-b sm:last:rounded-r sm:last:rounded-b-none border-0 ${
            filter === "all" ? "shadow-sm" : "bg-transparent hover:bg-gray-50 text-gray-800"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          variant={filter === "completed" ? "secondary" : "primary"}
          className={`rounded-none border-0 ${
            filter === "completed" ? "shadow-sm" : "bg-transparent hover:bg-gray-50 text-gray-800 "
          }`}
        >
          Completed
        </Button>
        <Button
          onClick={() => setFilter("pending")}
          variant={filter === "pending" ? "secondary" : "primary"}
          className={`rounded-none border-0 ${
            filter === "pending" ? "shadow-sm" : "bg-transparent hover:bg-gray-50 text-gray-800"
          }`}
        >
          Pending
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
