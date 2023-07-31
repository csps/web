declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

  type ServerResponse = {
    success: boolean,
    data: any,
    message: any,
  }
}

export {};