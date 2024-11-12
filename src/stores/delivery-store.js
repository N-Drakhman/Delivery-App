import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export const useDeliveryStore = defineStore("menu", () => {
  const route = useRoute();
  const router = useRouter();

  const menuItems = ref([]);
  const menuItem = ref({});

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/Menu");
      menuItems.value = response.data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  fetchItems();

  const fetchItem = async (dishId) => {
    try {
      const response = await axios.get(`http://localhost:8000/Menu/${dishId}`);
      menuItem.value = response.data;
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  //

  const itemsByCategory = (cat) => {
    return menuItems.value.filter((item) => item.category === cat);
  };
  //
  return {
    menuItems,
    menuItem,
    fetchItem,
    fetchItems,
    itemsByCategory,
  };
});
