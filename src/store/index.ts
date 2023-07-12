import { defineStore } from "pinia";

export const useStore = defineStore("global", () => {
  const isShowBackButton = false;
  const isDark = false;

  return {
    isShowBackButton, isDark
  }
});