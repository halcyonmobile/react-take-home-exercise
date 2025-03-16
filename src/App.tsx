import React from "react";

import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8 antialiased">
      <header className="text-center mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Task Manager</h1>
      </header>

      <TaskManager />
    </div>
  );
}

export default App;
