/**
 * Set key-value pair to localstorage
 */
export function setStore(key: string, value: string) {
  localStorage.setItem(key, value);
}

/**
 * Get value from localstorage
 */
export function getStore(key: string) {
  return localStorage.getItem(key) || "";
}

/**
 * Remove key-value pair from localstorage
 */
export function removeStore(key: string) {
  localStorage.removeItem(key);
}