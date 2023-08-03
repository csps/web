/**
 * Contains all the endpoints used in the application.
 */
enum Endpoints {
  Login = "/login",
  ForgotPassword = "/forgot-password",
  ResetPassword = "/reset-password",
  ResetPasswordToken = "/reset-password/:token"
}

export default Endpoints;