import axios from "axios";
import Endpoints from "./endpoints";

import type { AxiosRequestConfig } from "axios";

/**
 * Create axios instance
 */
const instance = axios.create({
  baseURL: `${location.protocol}//${location.hostname}:4000/`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
});

/**
 * Make a request to the server.
 * @param method The HTTP method to use.
 * @param endpoint The endpoint to request.
 * @param data The data to send. 
 * @param callback The callback to call when the request is done. 
 */
function makeRequest(method: HttpMethod, endpoint: Endpoints, data: object | null, callback: (response: ServerResponse) => void) {
  // URL
  let url: string = endpoint;

  // If method is GET and endpoint has param
  if (method === "GET" && endpoint.includes(":")) {
    // Get param
    const params = endpoint.split(":").slice(1).map(s => s.replace(/\//g, ""));
    
    // For every params
    for (const param of params) {
      // Replace param with data
      url = endpoint.replace(`:${param}`, (data as any)[param] || "");
    }
  }

  // Create config 
  const config: AxiosRequestConfig = {
    method, url
  };

  // If method is GET and endpoint has no param
  if (method === "GET" && !endpoint.includes(":")) {
    config.params = data;
  }
  
  // If method is not GET
  if (method !== "GET") {
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