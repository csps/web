/**
 * Contains all the endpoints used in the application.
 */
enum Endpoints {
  Login = "/login",
  LoginToken = "/login/:token",
  ForgotPassword = "/forgot-password",
  ResetPassword = "/reset-password",
  ResetPasswordToken = "/reset-password/:token",
  ProductsId = "/products/:id",
  Products = "/products",
  PhotosId = "/photos/:id",
  PhotosIdRaw = "/photos/:id/raw",
  StudentsKey = "/students/:key",
}

export default Endpoints;