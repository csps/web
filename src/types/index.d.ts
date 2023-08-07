declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

  type ServerResponse = {
    success: boolean,
    data: any,
    message: any,
  }

  type DialogButton = {
    text: string,
    click: () => void,
  }

  type StudentData = {
    id: number;
    name: string;
  }
}

export {};