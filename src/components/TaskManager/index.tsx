import React, { useState } from "react";

import Filters from "@/components/TaskManager/Filters";
import List from "@/components/TaskManager/List";

import { useTaskManagerStore } from "@/store";

const TaskManager = () => {
  const { addTask } = useTaskManagerStore((state) => state);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    addTask(data.get("title").toString());

    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
      <form className="mb-4 flex" onSubmit={handleAddTask} role="form">
        <input
          className="flex-grow border rounded-l py-2 px-3"
          type="text"
          name="title"
          placeholder="New task..."
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" type="submit">
          Add
        </button>
      </form>

      <Filters />

      <List />
    </div>
  );
};

export default TaskManager;
