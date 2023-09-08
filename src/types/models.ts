export enum AnnouncementEnum {
  id = "id",
  admin_student_id = "admin_student_id",
  title = "title",
  content = "content",
  photos_id = "photos_id",
  date_stamp = "date_stamp",
}

export enum EventEnum {
  id = "id",
  thumbnail = "thumbnail",
  title = "title",
  description = "description",
  venue = "venue",
  start_date_stamp = "start_date_stamp",
  end_date_stamp = "end_date_stamp",
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
  photos_id = "photos_id",

  // Extra
  name = "name",
}

export enum ProductEnum {
  id = "id",
  name = "name",
  thumbnail = "thumbnail",
  description = "description",
  likes = "likes",
  stock = "stock",
  price = "price",
  max_quantity = "max_quantity",
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
  thumbnail = "thumbnail",
  receipt_id = "receipt_id",
  products_id = "products_id",
  product_name = "product_name",
  product_price = "product_price",
  variations_id = "variations_id",
  variations_name = "variations_name",
  variations_photo_id = "variations_photo_id",
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

export enum VariationEnum {
  id = "id",
  name = "name",
}