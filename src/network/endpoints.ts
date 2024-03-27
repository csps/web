/**
 * Contains all the endpoints used in the application.
 */
enum Endpoints {
  Login = "/login",
  ForgotPassword = "/forgot",
  Courses = "/courses",
  Colleges = "/colleges",
  CollegeCourses = "/colleges/:acronym",
  
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

  Tatakforms = "/tatakforms",
  TatakformsSlug = "/tatakforms/:slug",
  TatakformsRegister = "/tatakforms/register",
  TatakformsLogin = "/tatakforms/login",

  TatakformsAttendanceHistory = "/tatakforms/attendance/:slug",
  TatakformsAttendanceHistoryOfEvent = "/tatakforms/attendance",

  ICTCongress = "/ictcongress2024",
  ICTCongressRFID = "/ictcongress2024/rfid/:rfid",
  ICTCongressLogin = "/ictcongress2024/login",
  ICTCongressExportSheet = "/ictcongress2024/export/xlsx",
  ICTCongressExportCsv = "/ictcongress2024/export/csv",
  ICTCongressStatistics = "/ictcongress2024/statistics",
  ICTCongressStudents = "/ictcongress2024/students",
  ICTCongressStudentsId = "/ictcongress2024/students/:uid",
  ICTCongressTshirtClaim = "/ictcongress2024/students/:uid/claim-tshirt",
  ICTCongressStudentPaymentConfirm = "/ictcongress2024/students/:uid/payment-confirm",
  ICTCongressPendingOrders = "/ictcongress2024/campus/pending-orders",
}

export default Endpoints;