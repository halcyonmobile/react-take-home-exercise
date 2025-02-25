export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export enum ETaskState {
  ALL = "all",
  COMPLETED = "completed",
  PENDING = "pending",
}
