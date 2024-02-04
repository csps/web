export enum AnnouncementEnum {
  id = "id",
  admin_student_id = "admin_student_id",
  title = "title",
  content = "content",
  photos_hash = "photos_hash",
  date_stamp = "date_stamp",
}

export enum EventEnum {
  id = "id",
  photos_hash = "photos_hash",
  title = "title",
  description = "description",
  venue = "venue",
  date = "date",
  start_time = "start_time",
  end_time = "end_time",
  date_stamp = "date_stamp",
}

export enum OrderEnum {
  id = "id",
  students_id = "students_id",
  products_id = "products_id",
  variations_id = "variations_id",
  quantity = "quantity",
  mode_of_payment = "mode_of_payment",
  status = "status",
  user_remarks = "user_remarks",
  admin_remarks = "admin_remarks",
  status_updated = "status_updated",
  edit_date = "edit_date",
  date_stamp = "date_stamp",
}

export enum PhotoEnum {
  id = "id",
  data = "data",
  type = "type",
  width = "width",
  height = "height",
  date_stamp = "date_stamp",
}

export enum ProductVariationEnum {
  id = "id",
  products_id = "products_id",
  variations_id = "variations_id",
  stock = "stock",
  photos_hash = "photos_hash",

  // Extra
  name = "name",
}

export enum ProductEnum {
  id = "id",
  name = "name",
  slug = "slug",
  photos_hash = "photos_hash",
  description = "description",
  likes = "likes",
  stock = "stock",
  price = "price",
  max_quantity = "max_quantity",
  is_available = "is_available",
  date_stamp = "date_stamp",

  // Extra
  variations = "variations",
}

export enum ResetTokenEnum {
  id = "id",
  students_id = "students_id",
  token = "token",
  is_used = "is_used",
  reset_date_stamp = "reset_date_stamp",
  date_stamp = "date_stamp",
}

export enum StudentEnum {
  id = "id",
  student_id = "student_id",
  last_name = "last_name",
  first_name = "first_name",
  year_level = "year_level",
  email_address = "email_address",
  password = "password",
  date_stamp = "date_stamp",
}

export enum TutorialEnum {
  id = "id",
  student_id = "student_id",
  language = "language",
  schedule = "schedule",
  status = "status",
  status_date_stamp = "status_date_stamp",
  remarks = "remarks",
  date_stamp = "date_stamp",
}

export enum FullOrderEnum {
  id = "id",
  photos_hash = "photos_hash",
  reference = "reference",
  unique_id = "unique_id",
  products_id = "products_id",
  product_name = "product_name",
  product_price = "product_price",
  variations_id = "variations_id",
  variations_name = "variations_name",
  variations_photo_hash = "variations_photo_hash",
  quantity = "quantity",
  mode_of_payment = "mode_of_payment",
  student_id = "student_id",
  first_name = "first_name",
  last_name = "last_name",
  email_address = "email_address",
  course = "course",
  year_level = "year_level",
  status = "status",
  user_remarks = "user_remarks",
  admin_remarks = "admin_remarks",
  status_updated = "status_updated",
  edit_date = "edit_date",
  date_stamp = "date_stamp",
}

export enum ICTStudentEnum {
  id = "id",
  campus_id = "campus_id",
  student_id = "student_id",
  year_level = "year_level",
  first_name = "first_name",
  last_name = "last_name",
  email = "email",
  tshirt_size = "tshirt_size",
  attendance = "attendance",
  order_confirmed = "order_confirmed",
  date_stamp = "date_stamp",
}

export enum VariationEnum {
  id = "id",
  name = "name",
}