/**
 * Set key-value pair to localstorage
 */
export function setStore(key: StoreKeys, value: string) {
  localStorage.setItem(key, value);
}

/**
 * Get value from localstorage
 */
export function getStore(key: StoreKeys) {
  return localStorage.getItem(key) || "";
}

/**
 * Remove key-value pair from localstorage
 */
export function removeStore(key: StoreKeys) {
  localStorage.removeItem(key);
}