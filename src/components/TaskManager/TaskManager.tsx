import React, { useState } from "react";

import TaskItem from "../TaskItem/TaskItem";
import { getInitialTasksFromLocalStorage, storeOnLocalStorage } from "../../utils/localStorage";
import { findLastIndex } from "../../utils/utils";
import Filter from "../Filter/Filter";

export type Task = { id: number, title: string, completed: boolean };
const TaskManager = () => {

  const [tasks, setTasks] = useState<Task[]>(getInitialTasksFromLocalStorage());
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState<string>("");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask) {
      if (newTask!.trim() === "") return;
      const newTaskObj = {
        id: findLastIndex(tasks) + 1,
        title: newTask,
        completed: false,
      };
      const updatedTasks = [...tasks, newTaskObj]
      setTasks(updatedTasks);
      storeOnLocalStorage({ id: "storedTasks", value: updatedTasks })
      setNewTask("");
    }
  };

  const handleDeleteTask = (id: number) => {
    const task = tasks.find(task => task.id === id)
    if (task) {
      const reponse = confirm(`Confirm to delete task: ${task?.title}`)
      if (reponse) {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);
        storeOnLocalStorage({ id: "storedTasks", value: updatedTasks })

      }
    }
  };

  const toggleTaskCompletion = (id: number) => {
    const toggledTasks = tasks.map((task) => {
      if (task.id === id) return {
        ...task, completed: !task.completed
      }
      return task
    });
    setTasks(toggledTasks)
  };

  return (
    <div className="container mx-auto bg-white dark:bg-gray-500 p-4 rounded shadow">
      <form onSubmit={handleAddTask} className="mb-4 flex">
        <input
          data-testid="task-input"
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded-l py-2 px-1 text-black bg-white dark:bg-gray-700 dark:text-white"
        />
        <button data-testid="task-add-button" type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          Add
        </button>
      </form>
      <div className="flex justify-around mb-4">
        <Filter currentFilter={filter} setFilter={setFilter} />
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
