import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial mode from localStorage or system preference
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleMode} style={buttonStyle}>
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

// Simple inline styles (or use Tailwind / external CSS)
const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  borderRadius: "8px",
  cursor: "pointer",
  border: "1px solid #ccc",
  backgroundColor: "transparent",
  color: "inherit"
};

export default DarkModeToggle;
