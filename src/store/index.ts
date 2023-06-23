import { defineStore } from "pinia";

export const useStore = defineStore("global", () => {
  const isShowBackButton = false;

  return {
    isShowBackButton
  }
});