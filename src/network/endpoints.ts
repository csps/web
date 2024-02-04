/**
 * Contains all the endpoints used in the application.
 */
enum Endpoints {
  Login = "/login",
  ForgotPassword = "/forgot",
  Courses = "/courses",
  
  PhotosHash = "/photos/:hash",
  ReferenceHash = "/photos/:hash/reference",

  StudentsPassword = "/students/password",
  StudentsKey = "/students/:key",
  Students = "/students",

  Announcements = "/announcements",
  AnnouncementsId = "/announcements/:id",

  Env = "/env",
  EnvKey = "/env/:key",

  QRCode = "/qrcode/:q",
  QRCodeDark = "/qrcode/:q/dark",

  ResetPassword = "/reset",
  ResetPasswordToken = "/reset/:token",

  Events = "/events",
  EventsId = "/events/:id",
  EventsNext = "/events/next",

  Products = "/products",
  ProductsSlug = "/products/:slug",
  ProductsKey = "/products/:slug/:key",

  Orders = "/orders",
  OrdersKey = "/orders/:id/:key",
  OrdersUnique = "/orders/unique/:uniqueId",
  OrdersReference = "/orders/reference/:reference",

  ICTCongressLogin = "/ictcongress2024/login"
}

export default Endpoints;