import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedModel, setSelectedModel] = useState("SentriAI-v1");

  // 🌓 Apply dark mode to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">⚙️ Settings</h1>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 transition">
        <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">
          🌗 Appearance
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              darkMode ? "bg-blue-600" : "bg-gray-500"
            }`}
          >
            {darkMode ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 transition">
        <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">
          🔔 Notifications
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">
            Enable Alerts
          </span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              notifications ? "bg-green-600" : "bg-gray-500"
            }`}
          >
            {notifications ? "On" : "Off"}
          </button>
        </div>
      </div>

      {/* AI Model Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 transition">
        <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">
          🧠 AI Model Settings
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">
            Select Model
          </span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="p-2 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option>SentriAI-v1</option>
            <option>SentriAI-v2</option>
            <option>YOLOv8-CrowdNet</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={() =>
          alert(
            `✅ Settings saved:\nDark Mode: ${darkMode}\nNotifications: ${notifications}\nModel: ${selectedModel}`
          )
        }
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
