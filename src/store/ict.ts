import { defineStore } from "pinia";

export const useIctStore = defineStore("ict", () => {
  const isAcceptingRegistrations = false;
  const campuses: ICTCampus[] = [];
  const tshirtSizes: ICTShirtSize[] = [];
  const discountCodes: ICTDiscountCode[] = [];
  const tshirtSizesCount: Record<number, any> = {};
  const confirmedCount: Record<number, any> = {};
  const stats: ICTStatistics = {
    countAll: 0,
    countPaymentConfirmed: 0,
    countPendingPayments: 0,
    countPresent: 0,
    countSnackClaimed: 0,
    countKitsClaimed: 0,
    countTShirtClaimed: 0
  };

  return {
    campuses, stats, tshirtSizesCount, confirmedCount, tshirtSizes, discountCodes,
    isAcceptingRegistrations
  }
});