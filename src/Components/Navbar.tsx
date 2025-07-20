import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // On initial load: set theme based on localStorage or system preference
  useEffect(() => {
    const userPref = localStorage.theme;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (userPref === "dark" || (!userPref && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Toggle and persist theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-2xl bg-white dark:bg-gray-900 transition-colors duration-500">
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 ">Quiz App</h1>

      <div className="w-[60px] h-[28px] bg-gray-400 dark:bg-slate-700 rounded-full flex items-center p-1 cursor-pointer" onClick={toggleTheme}>
        <div
          className={`w-[26px] h-[26px] rounded-full shadow-md transform transition-all duration-500 ${
            isDark ? "translate-x-8 rotate-180 bg-purple-600 shadow-[0_0_50px_2px_rgba(168,85,247,0.8)] " : "translate-x-0 bg-sky-600"
          }`}
        ></div>
      </div>
    </nav>
  );
}
