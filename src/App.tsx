import { useEffect, useState } from "react";
import TaskManager from "./components/TaskManager/TaskManager";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { getInitialDarkMode } from "./utils/localStorage";

function App() {
  const darkmode = getInitialDarkMode()
  const [isDarkMode, setIsDarkMode] = useState(darkmode);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.classList.add(theme); // Add the theme class to the HTML element
    return () => {
      document.documentElement.classList.remove(theme); // Remove the theme class when the component unmounts
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    const status = !isDarkMode
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("dark-mode", status.toString())
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 p-4">
      <header className="text-center mb-4">
        <div className="flex justify-center align-center justify-around">
          <h1 className="text-3xl text-gray-900 dark:text-white font-bold">Task Manager</h1>
          <button onClick={toggleTheme} className="px-2 py-2 bg-blue-500 text-white rounded">
            {isDarkMode ? <MdDarkMode /> : <CiDark />}
          </button>
        </div>
      </header>
      <TaskManager />
    </div>
  );
}

export default App;
