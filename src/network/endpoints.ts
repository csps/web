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
  StudentsKey = "/students/:key",
  Announcements = "/announcements",
  Config = "/config",
  Courses = "/courses",
  Orders = "/orders",
  QRCode = "/qrcode/:q",
  QRCodeDark = "/qrcode/:q/dark",
}

export default Endpoints;