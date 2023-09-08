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
  ProductsId = "/products/:id",
  Products = "/products",
  PhotosId = "/photos/:id",
  PhotosIdRaw = "/photos/:id/raw",
  ReceiptId = "/photos/:id/receipt",
  ReceiptIdRaw = "/photos/:id/receipt/raw",
  StudentsKey = "/students/:key",
  Students = "/students",
  Announcements = "/announcements",
  AnnouncementsId = "/announcements/:id",
  Events = "/events",
  Env = "/env",
  EnvKey = "/env/:key",
  Courses = "/courses",
  Orders = "/orders",
  OrdersKey = "/orders/:id/:key",
  QRCode = "/qrcode/:q",
  QRCodeDark = "/qrcode/:q/dark",
  OrdersReceipt = "/orders/receipt/:receipt",
}

export default Endpoints;