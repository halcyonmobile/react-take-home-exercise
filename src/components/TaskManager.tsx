import React, { FC, FormEvent, useState } from "react"
import { useTasks } from "../hooks/useTasks"
import TaskList from "../components/TaskList"
import { Filter } from "../types/types"

const TaskManager: FC = () => {
  const [filter, setFilter] = useState<Filter>("all")
  const [newTask, setNewTask] = useState("")
  const { addTask, deleteTask, toggleTask, filterTasks } = useTasks()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask("")
  }

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </form>

      <div className="flex justify-around mb-4">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as Filter)}
            className={`px-4 py-2 rounded-md transition duration-200 ${filter === f
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TaskList tasks={filterTasks(filter)} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  )
}

export default TaskManager
