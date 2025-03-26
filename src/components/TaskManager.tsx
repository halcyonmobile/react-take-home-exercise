import React from "react";

import useTasks from "../hooks/useTasks";

import TaskItem from "./TaskItem";
import FilterButton from "./shared/FilterButton";

const TaskManager = () => {
  const {
    filter,
    filters,
    handleAddTask,
    handleDeleteTask,
    lastUpdate,
    newTask,
    setFilter,
    setNewTask,
    tasks,
    toggleTaskCompletion,
  } = useTasks();

  return (
    <div role="taskManager" className="container mx-auto bg-white p-4 rounded shadow">
      <form role="taskManager:newTaskForm" key={lastUpdate.toString()} onSubmit={handleAddTask} className="mb-4 flex">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded-l py-2 px-3"
        />
        <button type="submit" className={`${newTask ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-100"} px-4 rounded-r`} disabled={!newTask}>
          Add
        </button>
      </form>
      <div className="flex justify-around mb-4">
        {filters.map((filterKey) => <FilterButton key={filterKey} filterKey={filterKey} currentFilter={filter} onClick={() => setFilter(filterKey)} />)}
      </div>
      <ul>
        {tasks.length ? tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggle={toggleTaskCompletion}
          />
        )) : <li>No {filter !== "all" && filter} Items</li>}
      </ul>
    </div>
  );
};

export default TaskManager;
