import { useState } from "react";
import TaskManager from "./components/TaskManager";
import ThemeSwitch from "./components/ThemeSwitch";
import TaskManagerHeader from "./components/TaskManagerHeader";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} p-4 sm:px-20`}>
      <header className="text-center my-5">
        <ThemeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
        <TaskManagerHeader />
      </header>
      <TaskManager darkMode={darkMode} />
    </div>
  );
}

export default App;