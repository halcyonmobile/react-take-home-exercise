export type Item = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskFilter = "all" | "completed" | "pending";
