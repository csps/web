declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
  type Response = {
    success: boolean,
    data: object | null,
    message: object | null,
  }
}

export {};