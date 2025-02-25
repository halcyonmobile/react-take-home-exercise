import React from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { ETaskState } from "../../types/task.type";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskManager: React.FC = () => {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTaskStore();

  const filteredTasks = tasks.filter((task) => {
    if (filter === ETaskState.COMPLETED) return task.completed === true;
    if (filter === ETaskState.PENDING) return task.completed === false;
    return true;
  });

  return (
    <div
      className="container mx-auto bg-white p-4 rounded shadow"
      data-testid="task-manager"
    >
      <TaskForm onAdd={addTask} />
      <TaskFilter
        filter={filter}
        setFilter={(value) => setFilter(value as ETaskState)}
      />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTaskCompletion}
      />
    </div>
  );
};

export default TaskManager;
