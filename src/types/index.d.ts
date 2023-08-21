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
    variations: ProductVariationModel[];
  }
  
  /**
   * Models
   */
  type AnnouncementModel = {
    id: number,
    admin_student_id: string,
    title: string,
    content: string,
    photos_id?: number,
    date_stamp: string
  }
  
  type EventModel = {
    id: number;
    thumbnail: number;
    title: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    venue: string;
    date_stamp: string;
  };
  
  type OrderModel = {
    id: number;
    students_id: string;
    products_id: number;
    variations_id: number;
    quantity: number;
    mode_of_payment: ModeOfPayment;
    status: OrderStatus;
    user_remarks: string;
    admin_remarks: string;
    status_updated: string;
    edit_date: string;
    date_stamp: string;
  }
  
  type PhotoModel = {
    id: number;
    type: string;
    data: Buffer;
    date_stamp: string;
  }
  
  type ProductVariationModel = {
    id: number;
    products_id: number;
    variations_id: number;
    photos_id: number;
  
    // Extra
    name: string;
  }
  
  type ProductModel = {
    id: number;
    name: string;
    thumbnail?: number;
    short_description: string;
    description: string;
    likes: number;
    stock: number;
    price: number;
    max_quantity: number;
    date_stamp?: string;
  
    // Extra
    variations: ProductVariationModel[];
  }
  
  type ResetTokenModel = {
    id: number;
    students_id: number;
    token: string;
    is_used: boolean;
    reset_date_stamp?: string;
    date_stamp: string;
  }
  
  type StudentModel = {
    id: number;
    student_id: string;
    last_name: string;
    first_name: string;
    year_level: string;
    email_address: string;
    birth_date: string;
    password?: string;
    date_stamp: string;
  }
  
  type TutorialModel = {
    id: number;
    student_id: string;
    language: string;
    schedule: string;
    status: TutorialStatus;
    status_date_stamp: string;
    remarks: string;
    date_stamp: string;
  };
  
  type VariationModel = {
    id: number;
    name: string;
  };
}

export {};