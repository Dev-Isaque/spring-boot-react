import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function AlternateTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "inherit",
      }}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
