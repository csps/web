/**
 * Set page title
 * @param title Page title
 */
export function setPageTitle(title: string) {
  document.title = `${title === "Home" ? "" : title + " | "} UC Main Computing Society of the Philippines - Students`;
}

/**
 * Get history length
 */
export function getHistoryLength() {
  const { state } = window.history;
  return state ? state.position : 0;
}

/**
 * Set local storage key and value
 * @param key key
 * @param value value
 */
export function setLocal(key: string, value: string) {
  localStorage.setItem(key, value);
}

/**
 * Get local storage value
 * @param key key
 */
export function getLocal(key: string): string {
  return localStorage.getItem(key) || "";
}

/**
 * Remove local storage key
 */
export function removeLocal(key: string) {
  localStorage.removeItem(key);
}
