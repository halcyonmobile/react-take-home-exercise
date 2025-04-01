import { FC } from "react"
import { AnimatePresence, motion } from "framer-motion"
import TaskItem from "./TaskItem"
import { Task } from "@customTypes/types"

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TaskList: FC<TaskListProps> = ({ tasks, onDelete, onToggle }) => {
  return (
    <AnimatePresence mode="popLayout">
      <ul className="space-y-2">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            layoutId={`task-${task.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TaskItem task={task} onDelete={onDelete} onToggle={onToggle} />
          </motion.div>
        ))}
      </ul>
    </AnimatePresence>
  )
}

export default TaskList
