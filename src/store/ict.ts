import { defineStore } from "pinia";

export const useIctStore = defineStore("ict", () => {
  const campuses: ICTCampus[] = [];
  const tshirtSizes: ICTShirtSize[] = [];
  const discountCodes: ICTDiscountCode[] = [];
  const tshirtSizesCount: Record<number, any> = {};
  const stats: ICTStatistics = {
    countAll: 0,
    countPaymentConfirmed: 0,
    countPendingPayments: 0,
    countPresent: 0,
    countSnackClaimed: 0,
    countTShirtClaimed: 0
  };

  return {
    campuses, stats, tshirtSizesCount, tshirtSizes, discountCodes
  }
});