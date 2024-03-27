// Tutorial Status
export enum TutorialStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  DONE = "Done"
}

// Order status
export enum OrderStatus {
  PENDING_PAYMENT = 1,
  COMPLETED = 2,
  CANCELLED_BY_USER = 3,
  CANCELLED_BY_ADMIN = 4,
  REMOVED = 5,
  REJECTED = 6,
}

// Status
export enum Status {
  SUCCESS,
  ERROR,
  INFO,
  WARNING
}

// Mode of payments
export enum ModeOfPayment {
  WALK_IN = 1,
  GCASH = 2
}

// Auth Type
export enum AuthType {
  STUDENT,
  ADMIN,
  ICT_ADMIN,
  UNIV__ADMIN_ACCOUNT,
  UNIV_ACCOUNT,
}