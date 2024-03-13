import axios from "axios";
import Endpoints from "./endpoints";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "~/config";
import { getStore, removeStore, setStore } from "~/utils/storage";
import { toast } from "vue3-toastify";

/**
 * Create axios instance
 */
const instance = axios.create({
  baseURL: `${Config.API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data,application/www-form-urlencoded",
  }
});

type AdditionalOptions = {
  useRefreshToken: boolean;
}

/**
 * Make a request to the server.
 * @param method The HTTP method to use.
 * @param endpoint The endpoint to request.
 * @param data The data to send. 
 * @param callback The callback to call when the request is done. 
 */
function makeRequest<T, U>(method: HttpMethod, endpoint: Endpoints, data: U, callback: (response: ServerResponse<T>, fullResponse?: AxiosResponse) => void, options?: AdditionalOptions) {
  // URL
  let url: string = endpoint;
  const originalUrl = url;

  // If endpoint has param
  if (endpoint.includes(":")) {
    // Get param
    const params = endpoint.split("/").filter((param) => param.startsWith(":")).map((param) => param.replace(":", ""));
    
    // For every params
    for (const param of params) {
      // Replace param with data
      url = url.replace(`:${param}`, (data as any)[param] || "");
    }
  }

  // Create config 
  const config: AxiosRequestConfig = {
    method, url,
  };

  if ([Endpoints.ICTCongressExportSheet, Endpoints.ICTCongressExportCsv].includes(endpoint)) {
    config.responseType = "blob";
  }

  // If method is GET
  if (method === "GET") {
    // For every data
    for (const key in data) {
      // Remove query if it's already in the URL param
      if (originalUrl.includes(`:${key}`)) {
        delete data[key];
        continue;
      }
      
      // If data is object, convert to string
      if (typeof data[key] === "object") {
        (data as any)[key] = JSON.stringify(data[key]);
      }
    }

    config.params = data;
  }
  
  // If method is not GET
  if (method !== "GET") {
    // Create form data
    const formData = new FormData();

    // For every data
    for (const key in data) {
      formData.append(key, typeof data === "object" ? JSON.stringify(data) : data as any);
    }

    // Add data to config
    config.data = data;
  }

  // Token conditions
  const isICTCongress = location.pathname.startsWith("/ictcongress");
  const isAdmin = location.pathname.startsWith("/admin");
  const isUnivAccount = location.pathname.startsWith("/tatakforms");

  // Tokens for authentication
  let accessToken = "";
  let refreshToken = "";

  // If using ICT Congress token
  if (isICTCongress) {
    accessToken = getStore("iat");
    refreshToken = getStore("irt");
  }

  // If using admin token
  else if (isAdmin) {
    accessToken = getStore("aat");
    refreshToken = getStore("art");
  }

  // If using tatak forms toke
  else if(isUnivAccount){
    accessToken = getStore("usat");
    refreshToken = getStore("usrt");
  }
  
  // If using student token
  else {
    accessToken = getStore("sat");
    refreshToken = getStore("srt");
  }

  // If using refresh token (meaning, the access token is expired and we need to get a new one using the refresh token)
  if (options?.useRefreshToken) {
    accessToken = refreshToken;
  }

  // If has access token
  if (accessToken.length > 0) {
    // Add access token to header
    instance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    // Remove access token from header
    delete instance.defaults.headers["Authorization"];
  }

  // Make request
  instance(config).then((response) => {
    // Get response auth header
    const auth = response.headers["authorization"];
    
    // If response has refresh token (meaning, the request is successful and we need to update the access token)
    if (auth) {
      // Get token
      const token = auth.split(" ")[1];
      
      // If has token
      if (token) {
        let storeName = "sat"
        // Set token to store
        if(isICTCongress){
          storeName = "iat"
        }else if(isAdmin){
          storeName = "aat"
        }else if(isUnivAccount){
          storeName = "usat"
        }
        setStore(storeName as StoreKeys, token);
      }
    }

    // Call the callback function
    callback(response.data, response);
  })

  // If something went wrong
  .catch((error) => {
    // If session expired
    if (error.response?.data.message.startsWith("Session Expired")) {
      // If already using refresh token
      if (options?.useRefreshToken) {
        // Clear session
        clearSessionTokens();
        // Log session expired
        toast.error(error.response.data.message);

        // Redirect to login
        if (isICTCongress) {
          location.href = "/ictcongress2024/admin/login";
        } else if (isAdmin) {
          location.href = "/admin/login";
        } else if (isUnivAccount){
          location.href = "/tatakforms/login"
        } else {
          location.href = "/login";
        }

        return;
      }

      // Call again the request but using refresh token
      makeRequest(method, endpoint, data, callback, { useRefreshToken: true });
      return;
    }

    // If has custom message
    if (error.response && ((error.response?.data) as any).message) {
      error.message = ((error.response?.data) as any).message;
    }

    // TODO: Handle unauthorized error

    // Call the callback function
    callback(error.response?.data || { success: false, message: error.message });
  });
}

/**
 * Clear session tokens
 */
function clearSessionTokens() {
  removeStore("aat");
  removeStore("art");
  removeStore("sat");
  removeStore("srt");
  removeStore("usat");
  removeStore("usrt");
  removeStore("iat");
  removeStore("irt");
}

export {
  makeRequest,
  clearSessionTokens,
  Endpoints
}