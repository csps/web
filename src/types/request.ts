/**
 * Announcement Request
 */
export type AnnouncementRequest = {
  title: string,
  content: string,
  photo?: File
};

/**
 * Photo request
 */
export type PhotoRequest = {
  data: Buffer;
  type: string;
}

/**
 * Pagination request
 */
export type PaginationRequest = {
  sort_column?: string;
  sort_type?: 'ASC' | 'DESC';
  search_column?: string[];
  search_value?: string[];
  page?: number | string;
  limit?: number | string;
};