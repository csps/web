import { Endpoints, makeRequest } from "~/network/request";
import { useStore } from "~/store";
import { getStore } from "./storage";
import { Config } from "~/config";

/**
 * Check if the login is valid.
 */
export function isLoginValid(callback: (valid: boolean) => void) {
  // If has no token, return false
  if (!getStore("token")) {
    callback(false);
    return;
  }

  // If has token, check if valid
  makeRequest<StudentResponse>("GET", Endpoints.LoginToken, { token: getStore("token") }, response => {
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
  if (!getStore("csps_token")) {
    callback(false);
    return;
  }

  // If has token, check if valid
  makeRequest<StudentResponse>("GET", Endpoints.AdminLoginToken, { token: getStore("csps_token") }, response => {
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
 * @param isReceipt If the photo is a receipt
 */
export function getPhotoLink(id: number | string, isReceipt = false) {
  return Config.API_URL + Endpoints[isReceipt ? 'ReceiptIdRaw' : "PhotosIdRaw"].replace(":id", id.toString());
}

/**
 * Get the QR Code link
 * @param q QR Code data
 * @param isDark If the QR Code is dark
 */
export function getQRCodeLink(q: string, isDark = false) {
  return Config.API_URL + (isDark ? Endpoints.QRCodeDark : Endpoints.QRCode).replace(":q", q);
}