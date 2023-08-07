import { Endpoints, makeRequest } from "~/network/request";
import { useStore } from "~/store";
import { getLocal } from "./page";

/**
 * Check if the login is valid.
 */
export function isLoginValid(callback: (valid: boolean) => void) {
  // If has no token, return false
  if (!getLocal("token")) {
    callback(false);
    return;
  }

  // If has token, check if valid
  makeRequest("GET", Endpoints.LoginToken, { token: getLocal("token") }, response => {
    // If logged in
    if (response.success) {
      // Get store 
      const store = useStore();
      // Set student data
      store.student = response.data;
    }

    callback(response.success);
  });
}