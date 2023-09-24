/**
 * Contains all the endpoints used in the application.
 */
enum Endpoints {
  AdminLogin = "/admins/login",
  AdminLoginToken = "/admins/login/:token",
  Login = "/students/login",
  LoginToken = "/students/login/:token",
  ForgotPassword = "/forgot-password",
  ResetPassword = "/reset-password",
  ResetPasswordToken = "/reset-password/:token",
  ProductsIdStatus = "/products/status/:id",
  ProductsId = "/products/:id",
  Products = "/products",
  PhotosId = "/photos/:id",
  PhotosIdRaw = "/photos/:id/raw",
  ReferenceId = "/photos/:id/reference",
  ReferenceIdRaw = "/photos/:id/reference/raw",
  StudentsKey = "/students/:key",
  Students = "/students",
  Announcements = "/announcements",
  AnnouncementsId = "/announcements/:id",
  Events = "/events",
  EventsNext = "/events/next",
  Env = "/env",
  EnvKey = "/env/:key",
  Courses = "/courses",
  Orders = "/orders",
  OrdersKey = "/orders/:id/:key",
  QRCode = "/qrcode/:q",
  QRCodeDark = "/qrcode/:q/dark",
  OrdersUnique = "/orders/unique/:uniqueId",
  OrdersReference = "/orders/reference/:reference",
}

export default Endpoints;