<script setup>
import { ref, defineProps, computed } from "vue";
import Card from "./Card.vue";
import { useDeliveryStore } from "@/stores/delivery-store";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/scss";
import "swiper/scss/navigation";
import { Navigation } from "swiper/modules";

const props = defineProps({
  category: String,
});

const modules = [Navigation];

const deliveryStore = useDeliveryStore();

const categoryItems = computed(() =>
  deliveryStore.itemsByCategory(props.category)
);
</script>

<template>
  <section>
    <h1>{{ category }}</h1>
    <swiper
      :navigation="true"
      :spaceBetween="16"
      :slidesPerView="'auto'"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        v-for="menuItem in categoryItems"
        :key="menuItem.id"
        class="slide"
      >
        <Card :menuItem="menuItem"></Card>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style lang="scss">
.swiper-button-next,
.swiper-button-prev {
  color: #ffffff;
  width: 20%;
  height: 100%;
}

.swiper-button-prev {
  background: rgba(0, 10, 15, 0.85);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 10, 15, 1) 5%,
    rgba(0, 10, 15, 1) 25%,
    rgba(255, 255, 255, 0) 100%
  );
  top: 0;
  left: -2%;
  justify-content: start;
  padding-left: 48px;
}

.swiper-button-next {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 10, 15, 1) 75%,
    rgba(0, 10, 15, 1) 95%,
    rgba(255, 255, 255, 0) 100%
  );
  top: 0;
  right: -2%;
  justify-content: end;
  padding-right: 48px;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 28px;
  z-index: 3;
}
section {
  margin-bottom: 48px;

  & .mySwiper {
    & .slide {
      width: 304px;
    }
  }
}

@media screen and (max-width: 1200px) {
  section {
    & .mySwiper {
      & .slide {
        width: 260px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
  .swiper-button-next,
  .swiper-button-prev {
    pointer-events: none;
  }
}

@media screen and (max-width: 768px) {
  section {
    & .mySwiper {
      & .slide {
        width: 210px;
      }
    }
  }
}
</style>
