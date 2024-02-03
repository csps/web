import axios from "axios";
import Endpoints from "./endpoints";

import type { AxiosRequestConfig } from "axios";
import { Config } from "~/config";
import { getStore, removeStore, setStore } from "~/utils/storage";

/**
 * Create axios instance
 */
const instance = axios.create({
  baseURL: `${Config.API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
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
function makeRequest<T, U>(method: HttpMethod, endpoint: Endpoints, data: U, callback: (response: ServerResponse<T>) => void, options?: AdditionalOptions) {
  // URL
  let url: string = endpoint;

  // If endpoint has param
  if (endpoint.includes(":")) {
    // Get param
    const params = endpoint.split(":").slice(1).map(s => s.replace(/\//g, ""));
    
    // For every params
    for (const param of params) {
      // Replace param with data
      url = url.replace(`:${param}`, (data as any)[param] || "");
    }
  }

  // Create config 
  const config: AxiosRequestConfig = {
    method, url
  };

  // If method is GET and endpoint has no param
  if (method === "GET" && !endpoint.includes(":")) {
    // For every data
    for (const key in data) {
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

  // Tokens for authentication
  let accessToken = "";
  let refreshToken = "";

  // If using admin token
  if (location.pathname.startsWith("/admin")) {
    accessToken = getStore("aat");
    refreshToken = getStore("art");
  } else {
    // If using student token
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
        console.log("Saving...");
        // Set token to store
        setStore(location.pathname.startsWith("/admin") ? "aat" : "sat", token);
      }
    }

    // Call the callback function
    callback(response.data);
  })

  // If something went wrong
  .catch((error) => {
    // If session expired
    if (error.response?.data.message.startsWith("Session Expired")) {
      // If already using refresh token
      if (options?.useRefreshToken) {
        // Clear session
        clearSessionTokens();
        // Redirect to login
        location.href = "/login";
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
}

export {
  makeRequest,
  Endpoints
}