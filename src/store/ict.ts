import { defineStore } from "pinia";

export const useIctStore = defineStore("ict", () => {
  const campuses: ICTCampus[] = [];

  return {
    campuses
  }
});