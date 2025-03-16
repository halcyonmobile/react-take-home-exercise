import React, { memo, useCallback } from "react";

import TaskItem from "./TaskItem";
import Button from "./common/Button";

import { useTasks } from "../hooks/useTasks";
import { FILTER_BUTTONS } from "../constants/Task";

const TaskManager = memo(() => {
  const {
    tasks,
    filter,
    newTaskTitle,
    setFilter,
    setNewTaskTitle,
    addTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  const handleAddTask = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTaskTitle);
    setNewTaskTitle("");
  }, [addTask, newTaskTitle, setNewTaskTitle]);

  return (
    <div className="container mx-auto bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md max-w-2xl flex flex-col">
      <form onSubmit={handleAddTask} className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
        <input
          type="text"
          placeholder="New task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
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
      
      <div className="inline-flex flex-col sm:flex-row rounded-lg p-1 bg-gray-100 mb-4 mx-auto w-full sm:w-auto">
        {FILTER_BUTTONS.map(({ label, value }) => (
          <Button
            key={value}
            onClick={() => setFilter(value)}
            variant={filter === value ? "secondary" : "primary"}
            className={`rounded-none first:rounded-t sm:first:rounded-l sm:first:rounded-t-none last:rounded-b sm:last:rounded-r sm:last:rounded-b-none border-0 ${
              filter === value ? "shadow-sm" : "bg-transparent hover:bg-gray-50 text-gray-800"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        ))}
      </ul>
    </div>
  );
});

export default TaskManager;
