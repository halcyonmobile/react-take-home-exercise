export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Filter {
  All = "all",
  Completed = "completed",
  Pending = "pending",
}
