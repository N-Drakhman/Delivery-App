<script setup>
import Card from "./Card.vue";
import { useDeliveryStore } from "@/stores/delivery-store";
import { onBeforeMount, ref, defineProps } from "vue";

// Store setup
const deliveryStore = useDeliveryStore();

const props = defineProps({
  category: String,
});

onBeforeMount(() => {
  deliveryStore.fetchItems();
});

deliveryStore.setCategory(props.category);
const currentSlide = ref(0);

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
  console.log(currentSlide.value);
};

const nextSlide = () => {
  if (currentSlide.value > deliveryStore.menuItems.length - 5) {
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
  console.log(currentSlide.value);
};
</script>

<template>
  <section>
    <h1>{{ category }}</h1>

    <div class="wrapper">
      <div
        class="slides"
        :style="{ marginLeft: '-' + 26 * currentSlide + '%' }"
      >
        <Card
          class="slide"
          v-for="menuItem in deliveryStore.menuItems"
          :key="menuItem"
          :menuItem="menuItem"
        />
        <!-- <Card
          class="slide"
          v-for="menuItem in deliveryStore.filterCategory"
          :key="menuItem"
          :menuItem="menuItem"
        /> -->
      </div>
    </div>

    <button @click="prevSlide" class="move move-left">
      <i class="pi pi-angle-left"></i>
    </button>
    <button @click="nextSlide" class="move move-right">
      <i class="pi pi-angle-right"></i>
    </button>
  </section>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f11f;
}

::-webkit-scrollbar-thumb {
  background: #88888832;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555b6;
}

section {
  padding: 0 124px;
  margin-bottom: 48px;

  h1 {
    margin-bottom: 24px;
    font-size: 32px;
    font-weight: 500;
    line-height: 44.8px;
    color: #e1e1e6;
  }

  .wrapper {
    display: flex;
    overflow: auto;
    overflow: hidden;

    scroll-snap-type: x mandatory;
    scroll-padding: 0 24px;

    & .slides {
      display: flex;
      gap: 27px;
      transition: all ease 0.5s;

      & .slide {
        scroll-snap-align: end;
      }
    }
  }
}
</style>
