import React, { createContext, useState } from "react";
type ChildrenType = {
  children: React.ReactNode;
};
export type ThemeType = {
  theme: string;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeType | null>(null);

export const ThemeContextProvider = ({ children }: ChildrenType) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((curr: string) => (curr === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
