import React from "react";
import { useTasks } from "../hooks/useTask";
import TaskItem from "./TaskItem";
import { Filter } from "./types";

const TaskList = ({ filter }: { filter: Filter }) => {
  const { data = [], isLoading, isError } = useTasks(filter);

  return (
    <div className="flex flex-col space-y-2">
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {isError && (
        <div className="text-red-500">
          Unable to fetch tasks, please try again
        </div>
      )}
      <ul className="space-y-2">
        {data.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
