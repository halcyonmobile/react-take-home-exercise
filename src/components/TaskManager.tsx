import React, { FormEvent, useMemo, useState } from "react";

import FilterButton from "./FilterButton";
import TaskItem from "./TaskItem";
import { Filter, Task } from "./types";

const TaskList = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Clean the house", completed: true },
];

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(TaskList);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [newTask, setNewTask] = useState<string>("");

  const filteredTasks = useMemo<Task[]>(
    () =>
      tasks.filter((task) => {
        if (filter === Filter.Completed) return task.completed;
        if (filter === Filter.Pending) return !task.completed;
        return true;
      }),
    [tasks, filter]
  );

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();

    if (!newTask) return;

    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    const newTasksList = tasks.filter((task) => task.id !== id);

    setTasks(newTasksList);
  };

  const toggleTaskCompletion = (id: number) => {
    const newTasksList = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(newTasksList);
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
        <FilterButton
          filter={Filter.All}
          value={filter}
          onClick={() => setFilter(Filter.All)}
        >
          All
        </FilterButton>
        <FilterButton
          filter={Filter.Completed}
          value={filter}
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </FilterButton>
        <FilterButton
          filter={Filter.Pending}
          value={filter}
          onClick={() => setFilter(Filter.Pending)}
        >
          Pending
        </FilterButton>
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
