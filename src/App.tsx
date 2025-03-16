import React from "react";

import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 antialiased">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Task Manager</h1>
      </header>

      <TaskManager />
    </div>
  );
}

export default App;
