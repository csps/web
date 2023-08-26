import { OrderStatus } from "~/types/enums";

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

/**
 * Map order status
 */
export function mapOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING_PAYMENT:
      return "Pending";
    case OrderStatus.COMPLETED:
      return "Completed";
    case OrderStatus.REJECTED:
      return "Rejected";
    case OrderStatus.CANCELLED_BY_USER:
      return "Cancelled by user";
    case OrderStatus.CANCELLED_BY_ADMIN:
      return "Cancelled by admin";
  }
}