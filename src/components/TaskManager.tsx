import React, { FormEvent, useState } from "react";

import { useCreateTask } from "../hooks/useTask";
import FilterButton from "./FilterButton";
import TaskList from "./TaskList";
import { Filter, Task } from "./types";

const TASK_LIST = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Clean the house", completed: true },
];

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(TASK_LIST);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [newTask, setNewTask] = useState<string>("");

  const { mutate: createTask } = useCreateTask();

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();

    if (!newTask) return;

    const newTaskObj = {
      title: newTask,
      completed: false,
    };

    createTask(newTaskObj);

    setNewTask("");
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
      <TaskList filter={filter} />
    </div>
  );
};

export default TaskManager;
