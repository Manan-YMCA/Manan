import React, { useState, useEffect } from "react";
export default function useDarkMode(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [theme, setTheme] = useState<string>(localStorage.theme || "light");
  const colorTheme = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [colorTheme, theme]);
  return [colorTheme, setTheme];
}
