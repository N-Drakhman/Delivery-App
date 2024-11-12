import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", () => {
  // Items array (acts as state)


  return {
    items,
    itemsByCategory,
  };
});
