import axios from "axios";
import Endpoints from "./endpoints";

import type { AxiosRequestConfig } from "axios";
import { Config } from "~/config";

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

/**
 * Make a request to the server.
 * @param method The HTTP method to use.
 * @param endpoint The endpoint to request.
 * @param data The data to send. 
 * @param callback The callback to call when the request is done. 
 */
function makeRequest<T, U>(method: HttpMethod, endpoint: Endpoints, data: U, callback: (response: ServerResponse<T>) => void) {
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

  // Make request
  instance(config).then((response) => {
    // Call the callback function
    callback(response.data);
  }).catch((error) => {
    // If has custom message
    if (error.response && ((error.response?.data) as any).message) {
      error.message = ((error.response?.data) as any).message;
    }

    // TODO: Handle unauthorized error

    // Call the callback function
    callback(error.response?.data || { success: false, message: error.message });
  });
}

export {
  makeRequest,
  Endpoints
}