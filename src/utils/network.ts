import { Endpoints, makeRequest } from "~/network/request";
import { useStore } from "~/store";
import { getStore, removeStore } from "./storage";
import { Config } from "~/config";

/**
 * Check if the login is valid.
 */
export function isLoginValid(callback: (valid: boolean) => void) {
  // If has no token, return false
  if (!getStore("std_token")) {
    callback(false);
    return;
  }

  // If has token, check if valid
  makeRequest<StudentResponse>("GET", Endpoints.LoginToken, { token: getStore("std_token") }, response => {
    // If logged in
    if (response.success) {
      // Get store 
      const store = useStore();
      // Set student data
      store.student = response.data;
    } else {
      // Clear token
      removeStore("std_token");
    }

    callback(response.success);
  });
}

/**
 * Check if admin login is valid.
 */
export function isAdminLoginValid(callback: (valid: boolean) => void) {
  // If has no token, return false
  if (!getStore("adm_token")) {
    callback(false);
    return;
  }

  // If has token, check if valid
  makeRequest<StudentResponse>("GET", Endpoints.AdminLoginToken, { token: getStore("adm_token") }, response => {
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
 * @param has Photo hash
 * @param isReference If the photo is a reference
 */
export function getPhotoLink(hash: any, isReference = false) {
  return Config.API_URL + Endpoints[isReference ? 'ReferenceHash' : "PhotosHash"].replace(":hash", hash);
}

/**
 * Get the QR Code link
 * @param q QR Code data
 * @param isDark If the QR Code is dark
 */
export function getQRCodeLink(q: string, isDark = false) {
  return Config.API_URL + (isDark ? Endpoints.QRCodeDark : Endpoints.QRCode).replace(":q", q);
}