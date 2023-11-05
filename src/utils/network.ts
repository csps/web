import { Endpoints, makeRequest } from "~/network/request";
import { useStore } from "~/store";
import { Config } from "~/config";

/**
 * Check if the login is valid.
 */
export function isLoginValid(callback: (valid: boolean) => void) {
  // If has token, check if valid
  makeRequest<StudentResponse, null>("GET", Endpoints.Login, null, response => {
    // If logged in
    if (response.success) {
      // Get store 
      const store = useStore();
      // Set student data
      store.user = response.data;
      // Role
      store.role = response.count || 0; // 1 = admin, 0 = student
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