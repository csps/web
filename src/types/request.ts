import { AuthType } from "./enums";

export type AnnouncementRequest = {
  id?: number,
  title: string,
  content: string,
  photo?: File,
  preservePhoto: boolean,
};

export type PhotoRequest = {
  data: Buffer;
  type: string;
}

export type PaginationRequest = {
  sort?: {
    key: string;
    type: 'ASC' | 'DESC';
  },
  search?: {
    key: string[];
    value: any[];
  },
  page?: number;
  limit?: number;
};

export type PaginationOutput = {
  sort?: string,
  search?: string,
  page?: string;
  limit?: string;
};

export type ProductRequest = {
  name: string;
  description: string;
  stock: number;
  price: number;
  max_quantity: number;
  variations: string;
}

export type EventRequest = {
  id?: number;
  title: string;
  description: string;
  venue: string;
  date: string;
  start_time: string;
  end_time: string;
  thumbnail?: File
}

export type LoginRequest = {
  type: AuthType,
  student_id: string,
  password: string
}