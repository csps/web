export type AnnouncementRequest = {
  title: string,
  content: string,
  photo?: File
};

export type PhotoRequest = {
  data: Buffer;
  type: string;
}

export type PaginationRequest = {
  sort_column?: string;
  sort_type?: 'ASC' | 'DESC';
  search_column?: string[];
  search_value?: string[];
  page?: number | string;
  limit?: number | string;
};

export type ProductRequest = {
  name: string;
  description: string;
  stock: number;
  price: number;
  max_quantity: number;
  variations: string;
}