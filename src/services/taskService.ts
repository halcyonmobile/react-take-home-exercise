export interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export const getTasks = (): Task[] => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  };
  
  export const addTask = (tasks: Task[], title: string): Task[] => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    return [...tasks, newTask];
  };
  
  export const deleteTask = (tasks: Task[], id: number): Task[] => {
    return tasks.filter((task) => task.id !== id);
  };
  
  export const toggleTaskCompletion = (tasks: Task[], id: number): Task[] => {
    return tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  };
  