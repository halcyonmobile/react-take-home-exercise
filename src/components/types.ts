export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskRequest = Pick<Task, "title" | "completed">;

export enum Filter {
  All = "all",
  Completed = "completed",
  Pending = "pending",
}
