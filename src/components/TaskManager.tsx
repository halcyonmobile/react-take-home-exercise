import { FC, FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { useTasks } from "@hooks/useTasks"
import TaskList from "@components/TaskList"
import ConfirmModal from "@components/ConfirmModal"
import type { Filter } from "@customTypes/types"

const TaskManager: FC = () => {
  const [filter, setFilter] = useState<Filter>("all")
  const [newTask, setNewTask] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null)

  const { addTask, deleteTask, toggleTask, filterTasks } = useTasks()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask("")
  }

  const confirmDelete = (id: number) => {
    setTaskToDelete(id)
    setModalOpen(true)
  }

  const handleDeleteConfirmed = () => {
    if (taskToDelete !== null) {
      setModalOpen(false)
      deleteTask(taskToDelete)
      setTaskToDelete(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto bg-white p-6 rounded-lg shadow-md"
    >
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
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TaskList tasks={filterTasks(filter)} onDelete={confirmDelete} onToggle={toggleTask} />

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />
    </motion.div>
  )
}

export default TaskManager
