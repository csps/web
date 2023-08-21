/**
 * Announcement Request
 */
export type AnnouncementRequest = {
  title: string,
  content: string,
  photo_data?: string;
  photo_type?: string;
  photo_width?: number;
  photo_height?: number;
};

/**
 * Photo request
 */
export type PhotoRequest = {
  data: Buffer;
  type: string;
  width: number;
  height: number;
}