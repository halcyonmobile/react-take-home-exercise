import React, { useState } from "react";

import useTasks from "../hooks/useTasks";

import TaskItem from "./TaskItem";
import FilterButton from "./shared/FilterButton";
import Modal from "./shared/Modal";
import Button from "./shared/Button";

const TaskManager = () => {
  const {
    filter,
    filters,
    getTaskById,
    handleAddTask,
    handleDeleteTask,
    lastUpdate,
    newTask,
    setFilter,
    setNewTask,
    tasks,
    toggleTaskCompletion,
  } = useTasks();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskIdToDelete, setIdTaskToDelete] = useState(0);

  const handleToDelete = (id: number) => {
    setIdTaskToDelete(id);
    setDeleteModalOpen(true);
  }

  const deleteTask = (id: number) => {
    if (id) handleDeleteTask(id);
    setIdTaskToDelete(0);
    setDeleteModalOpen(false);
  }

  const taskToDelete = getTaskById(taskIdToDelete);

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
            onDelete={handleToDelete}
            onToggle={toggleTaskCompletion}
          />
        )) : <li>No {filter !== "all" && filter} Items</li>}
      </ul>
      <Modal isOpen={deleteModalOpen}>
        <p className="pb-4">
          Do you really want to delete the {taskToDelete?.completed ? 'completed' : 'pending'} task 
          <span className="font-bold"> {taskToDelete?.title}</span>?
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            onClick={() => deleteTask(taskIdToDelete)}
            className="bg-red-500 text-white md:w-40 sm:w-20"
            >
            DELETE
            </Button>
          <Button
            onClick={() => deleteTask(0)}
            className="bg-gray-500 text-white md:w-40 sm:w-20"
            >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskManager;
