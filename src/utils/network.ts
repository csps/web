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
  makeRequest<StudentResponse>("GET", Endpoints.LoginToken, { token: getLocal("token") }, response => {
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

/**
 * Check if admin login is valid.
 */
export function isAdminLoginValid(callback: (valid: boolean) => void) {
  // If has no token, return false
  if (!getLocal("csps_token")) {
    callback(false);
    return;
  }

  // If has token, check if valid
  makeRequest<StudentResponse>("GET", Endpoints.AdminLoginToken, { token: getLocal("csps_token") }, response => {
    // If logged in
    if (response.success) {
      // Get store 
      const store = useStore();
      // Set student data
      store.admin = response.data;
    }

    callback(response.success);
  });
}

/**
 * Get the photo link
 * @param id Photo ID
 */
export function getPhotoLink(id: number) {
  return `${location.protocol}//${location.hostname}:4000` + Endpoints.PhotosIdRaw.replace(":id", id.toString());
}