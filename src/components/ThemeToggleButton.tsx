"use client";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const ThemeToggleButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem("darkMode", newDarkMode.toString());
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newDarkMode;
    });
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? (
        <SunOutlined className="text-3xl text-white" />
      ) : (
        <MoonOutlined className="text-3xl text-black" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
