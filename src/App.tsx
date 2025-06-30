import React, { useState } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors">
      <header className="flex flex-col items-center">
        <img
          src={darkMode ? "/images/main_logo_white.png" : "/images/main_logo_black.png"}
          alt="Stitch-In Logo"
          className="w-64 h-64 object-contain mb-6 transition-all duration-300"
        />
        <button
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>
    </div>
  );
}

export default App;
