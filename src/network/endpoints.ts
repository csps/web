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

  ICTCongress = "/ictcongress2024",
  ICTCongressRFID = "/ictcongress2024/rfid/:rfid",
  ICTCongressLogin = "/ictcongress2024/login",
  ICTCongressExportSheet = "/ictcongress2024/export/xlsx",
  ICTCongressStatistics = "/ictcongress2024/statistics",
  ICTCongressPrice = "/ictcongress2024/price/:discount_code", 
  ICTCongressStudents = "/ictcongress2024/students",
  ICTCongressStudentsId = "/ictcongress2024/students/:student_id",
  ICTCongressTshirtClaim = "/ictcongress2024/students/:student_id/claim-tshirt",
  ICTCongressStudentPaymentConfirm = "/ictcongress2024/students/:student_id/payment-confirm",
  ICTCongressPendingOrders = "/ictcongress2024/campus/pending-orders",
}

export default Endpoints;