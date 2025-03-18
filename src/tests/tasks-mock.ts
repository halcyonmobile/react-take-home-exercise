import { Task } from "@/models/TaskManager";

export const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title:
      "Implement functionality to save and retrieve tasks from local storage or a remote API, ensuring that the task list persists across page reloads.",
    completed: true,
  },
  {
    id: 2,
    title:
      "Enhance the user interface with additional styling improvements or animations to improve user experience.",
    completed: true,
  },
  {
    id: 3,
    title: "Implement a confirmation dialog when deleting a task.",
    completed: true,
  },
  {
    id: 4,
    title: "Deploy the app",
    completed: false,
  },
  {
    id: 5,
    title:
      "Create a CI/CD pipeline that will automatically deploy/release the app when changes were made.",
    completed: false,
  },
  {
    id: 6,
    title:
      "Write tests for key components using your preferred testing framework (e.g., Jest, React Testing Library).",
    completed: false,
  },
  {
    id: 7,
    title: "Fix Task Filter Bug",
    completed: true,
  },
  {
    id: 8,
    title: "Fix Task Deletion Issue",
    completed: true,
  },
  {
    id: 9,
    title: "Fix Styling Inconsistencies",
    completed: true,
  },
  {
    id: 10,
    title: "Fix TypeScript Warnings/Errors",
    completed: true,
  },
  {
    id: 11,
    title: "Code Refactoring",
    completed: true,
  },
];
