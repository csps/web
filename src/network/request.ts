import axios from "axios";
import Endpoints from "./endpoints";

import type { AxiosRequestConfig } from "axios";
import { getStore, setStore } from "~/utils/storage";
import { Config } from "~/config";

/**
 * Create axios instance
 */
const instance = axios.create({
  baseURL: `${Config.API_URL}`,
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
      // Delete param from data
      delete (data as any)[param];
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

  // If has admin token and in admin panel
  if (getStore("adm_token").length > 0 && window.location.href.includes("/admin")) {
    // Add token to config
    config.headers = {
      Authorization: `Bearer ${getStore("adm_token")}`
    }
  }

  // If has student token
  else if (getStore("std_token").length > 0) {
    // Add token to config
    config.headers = {
      Authorization: `Bearer ${getStore("std_token")}`
    }
  }

  // Make request
  instance(config).then((response) => {
    // If response has student authorization header
    if (response.headers["x-std-authorization"]) {
      // Set token
      setStore("std_token", response.headers["x-std-authorization"].split(" ")[1]);
    }

    // If response has admin authorization header
    if (response.headers["x-adm-authorization"]) {
      // Set token
      setStore("adm_token", response.headers["x-adm-authorization"].split(" ")[1]);
    }

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