import { defineStore } from "pinia";

export * from "./dialog"

export const useStore = defineStore("global", () => {
  const isLoggedIn = false;
  const isLoading = true;
  const isShowBackButton = false;
  const isDark = false;
  const errorMessage = "";

  let checkoutDetails: CheckoutDetails | undefined;
  const student: StudentResponse = {
    id: 0,
    student_id: "",
    birth_date: "",
    email_address: "",
    first_name: "",
    last_name: "",
    year_level: "",
    date_stamp: "",
  };

  return {
    isShowBackButton, isDark, isLoggedIn, student, isLoading, errorMessage,
    checkoutDetails
  }
});