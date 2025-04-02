import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Filter, Task, TaskRequest } from "../components/types";
import { fetchWithBaseUrl, postWithBaseUrl } from "../utils/api";

const fetchTasks = (filter: Filter) => {
  let params;

  console.log(filter);

  if (filter === Filter.Completed) {
    params = { completed: "true" };
  } else if (filter === Filter.Pending) {
    params = { completed: "false" };
  }

  return fetchWithBaseUrl<Task[]>("/tasks", params);
};

const createTask = (task: TaskRequest) => {
  return postWithBaseUrl<Task[]>("/tasks", task, { method: "POST" });
};

const deleteTask = (id: string) => {
  return postWithBaseUrl<Task[]>(`/tasks/${id}`, undefined, {
    method: "DELETE",
  });
};

const updateTask = (id: string, task: TaskRequest) => {
  return postWithBaseUrl<Task[]>(`/tasks/${id}`, task, {
    method: "PATCH",
  });
};

export const useTasks = (filter: Filter) => {
  return useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => fetchTasks(filter),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: TaskRequest) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// TODO: Use optimistic update
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// TODO: Use optimistic update
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: TaskRequest }) =>
      updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
