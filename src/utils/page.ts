/**
 * Set page title
 * @param title Page title
 */
export function setPageTitle(title: string) {
  document.title = `${title === "Home" ? "" : title + " | "} CSP-S UC Main`;
}

/**
 * Set body path as class
 * @param path Path to set to body
 */
export function setBodyPath(path: string) {
  document.body.setAttribute("class", "");
  document.body.classList.add(path.replace("/", "") || "home");
}