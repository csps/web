import axios from "axios";
import Endpoints from "./endpoints";

import type { AxiosRequestConfig } from "axios";
import { toast } from "vue3-toastify";

/**
 * Create axios instance
 */
const instance = axios.create({
  baseURL: "http://127.0.0.1:4000/",
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
  // Create config 
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
  };

  // If method is GET
  if (method === "GET") {
    config.params = data;
  }
  
  // If method is not GET
  else {
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

    // Show error toast
    if (error.message) {
      toast.error(error.message);
    }
    
    // TODO: Handle unauthorized error

    // Call the callback function
    callback(error.response?.data || { success: false });
  });
}

export {
  makeRequest,
  Endpoints
}