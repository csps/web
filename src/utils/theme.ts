import { setStore } from "./storage";

/**
 * Set dark mode based on user preference
 * @param isDark 
 */
export function setDarkMode(isDark: boolean) {
  const classes = document.documentElement.classList;
  classes.remove("dark");

  if (isDark) {
    classes.add("dark");
  }

  document.documentElement.setAttribute("data-color-scheme", isDark ? "dark" : "light");
  document.documentElement.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? "#151216" : "#7F4894");

  setStore("dark", isDark ? "1" : "0");
}

