import React from "react";
import TaskItem from "./TaskItem";
import useTaskStore from "../../../store/taskStore";

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const currentFilter = useTaskStore((state) => state.currentFilter);

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed") return task.completed === true;
    if (currentFilter === "pending") return task.completed === false;
    return true;
  });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
