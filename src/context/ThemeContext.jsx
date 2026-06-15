import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {

    // Load theme from localStorage or system preference
    const stored = localStorage.getItem("theme");

    if (stored) 
      return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
