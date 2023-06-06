/**
 * Set page title
 * @param title Page title
 */
export function setPageTitle(title: string) {
  document.title = `${title === "Landing" ? "" : title + " | "} CSP-S UC Main`;
}