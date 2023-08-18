declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
  type Role = "dean" | "adviser" | "admin";

  type ServerResponse<T> = {
    success: boolean,
    data: T,
    message: any,
  }

  type DialogButton = {
    text: string,
    click: () => void,
  }

  type StudentResponse = {
    id: number;
    student_id: string;
    last_name: string;
    first_name: string;
    year_level: string;
    email_address: string;
    birth_date: string;
    date_stamp: string;
  }

  type LoginResponse = {
    token: string;
    student: Student;
  }

  type ProductResponse = {
    id: number;
    name: string;
    thumbnail: number;
    short_description: string;
    description: string;
    likes: number;
    stock: number;
    price: number;
    max_quantity: number;
    date_stamp?: string;
    variations: ProductVariation[];
  }
  
  type ProductVariation = {
    id: number;
    product_id: number;
    photos_id: number;
    name: string;
  }

  type Announcement = {
    id: number,
    admin_student_id: string,
    title: string,
    content: string,
    photo_id?: number,
    date_stamp: string
  }
}

export {};