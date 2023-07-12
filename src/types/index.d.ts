declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
  type Response = {
    success: boolean,
    data: object | null,
    message: object | null,
  }

  type Wavify = {
    reboot: Function,
    play: Function,
    pause: Function,
    kill: Function,
    updateColor: Function
  }
  
}

export {};