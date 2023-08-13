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
  CANCELLED = 3,
  REMOVED = 4,
  REJECTED = 5
}

// Mode of payments
export enum ModeOfPayment {
  WALK_IN = 1,
  GCASH = 2
}
