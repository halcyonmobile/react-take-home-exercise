import { useState } from "react";
import TaskDeleteModal from "./TaskDeleteModal";
import { Checkbox } from "@/components/ui/Checkbox"
import { Card, CardContent } from '@/components/ui/Card';
import { FiTrash } from "react-icons/fi";
import { Task } from "@/models/TaskManager";
import { useTasks } from "@/services/stores/useTasks";

interface Props {
  task: Task;
  darkMode: boolean;
}

const TaskItem = ({ task, darkMode }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { toggleTask, deleteTask } = useTasks(state => ({
    tasks: state.tasks,
    setTasks:  state.setTasks,
    toggleTask: state.toggleTask,
    deleteTask: state.deleteTask
  }));

  return (
    <>
    <Card className={`flex items-center justify-between border-b p-3 mb-4 ${darkMode ? 'bg-gray-600 border-gray-700': 'bg-gray-100 border-gray-200'}`}>
      <CardContent className="flex justify-between items-center p-0">
        <Checkbox
          className="mr-2"
          checked={task.completed}
          onCheckedChange={() => toggleTask(task.id)}
        />
        <span
          className={task.completed ? "line-through" : darkMode ? "text-white" : "text-black"}
        >
          {task.title}
        </span>
      </CardContent>

      <button
        className="flex items-center justify-center bg-red-600 text-white size-8 rounded-lg hover:bg-red-500 transition-colors"
        onClick={() => setShowModal(true)}
      >
        <FiTrash size={18} />
      </button>
    </Card>

    {showModal && <TaskDeleteModal onDelete={() => deleteTask(task.id)} closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default TaskItem;