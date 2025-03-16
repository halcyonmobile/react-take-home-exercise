import { TaskFilterStatus } from "../types";

export const FILTER_BUTTONS: { label: string; value: TaskFilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];
