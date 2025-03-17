export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type Filters = "all" | "completed" | "pending";