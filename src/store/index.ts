import { defineStore } from "pinia";

export const useStore = defineStore("global", () => {
  const isLoggedIn = false;
  const isLoading = true;
  const isShowBackButton = false;
  const isDark = false;
  const student: StudentData = {
    id: -1, name: ""
  };

  return {
    isShowBackButton, isDark, isLoggedIn, student, isLoading
  }
});