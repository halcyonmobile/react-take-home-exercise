import { Task } from "../TaskManager/TaskManager";

type TaskItemProps = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void
}
const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        data-testid="toggle-button"
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${task.completed ? "line-through text-green-500" : "text-gray-900 dark:text-white"
          }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        data-testid="delete-button"
        className="px-2 py-2 bg-red-500 dark:bg-red-800 text-white rounded"
        style={{
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
