/**
 * Student type data
 */
export enum StudentType {
  id = "id",
  student_id = "student_id",
  last_name = "last_name",
  first_name = "first_name",
  year_level = "year_level",
  email_address = "email_address",
  birth_date = "birth_date",
  password = "password",
  date_stamp = "date_stamp",
}

/**
 * Product type data
 */
export enum ProductType {
  id = "id",
  name = "name",
  thumbnail = "thumbnail",
  short_description = "short_description",
  description = "description",
  likes = "likes",
  stock = "stock",
  price = "price",
  max_quantity = "max_quantity",
  date_stamp = "date_stamp",
  variations = "variations"
}

/**
 * Product Variation data
 */
export enum ProductVariation {
  id = "id",
  product_id = "product_id",
  photos_id = "photos_id",
  name = "name"
};

/**
 * Event type data
 */
export enum EventType {
  id = "id",
  thumbnail = "thumbnail",
  title = "title",
  description = "description",
  date = "date",
  start_time = "start_time",
  end_time = "end_time",
  venue = "venue",
  date_stamp = "date_stamp",
};

export enum TutorialType {
  id = "id",
  student_id = "student_id",
  language = "language",
  schedule = "schedule",
  status = "status",
  status_date_stamp = "status_date_stamp",
  remarks = "remarks",
  date_stamp = "date_stamp",
};

 /*
 * Photo type data
 */
export enum PhotoType {
  id = "id",
  data = "data",
  type = "type",
  width = "width",
  height = "height",
  date_stamp = "date_stamp",
}

/**
 * Order type data
 */
export enum OrderType {
  id = "id",
  student_id = "student_id",
  product_variations_id = "product_variations_id",
  quantity = "quantity",
  mode_of_payment_id = "mode_of_payment_id",
  status_id = "status_id",
  user_remarks = "user_remarks",
  admin_remarks = "admin_remarks",
  status_updated = "status_updated",
  edit_date = "edit_date",
  date_stamp = "date_stamp",
}
