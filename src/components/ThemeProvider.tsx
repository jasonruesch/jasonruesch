import React, { createContext, useContext, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light"); // Default theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
