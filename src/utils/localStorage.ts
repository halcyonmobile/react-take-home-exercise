import { Task } from "../components/TaskManager/TaskManager";

export const getInitialTasksFromLocalStorage = () => {
  const localStorageTasks = localStorage.getItem("storedTasks");
  let storagedTasks = [] as Task[]
  if (localStorageTasks) {
    storagedTasks = JSON.parse(localStorageTasks)
  }
  /// Placeholder values when storage is empty
  const initalValue = storagedTasks.length > 0 ? storagedTasks : [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Clean the house", completed: true },
  ]
  return initalValue
}
export const storeOnLocalStorage = ({ id, value }: { id: string, value: Task[] }) => {
  localStorage.setItem(`${id}`, JSON.stringify(value));
}

export const getInitialDarkMode = () => {
  const darkModeFromStorage = localStorage.getItem("dark-mode");
  let isDarkMode = false
  if (darkModeFromStorage) {
    isDarkMode = JSON.parse(darkModeFromStorage)
    return isDarkMode
  }
  return false
}