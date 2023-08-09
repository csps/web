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

  type Student = {
    id: number;
    student_id: string;
    last_name: string;
    first_name: string;
    year_level: string;
    email_address: string;
    birth_date: string;
    date_stamp: string;
  }
}

export {};