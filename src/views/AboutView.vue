<script setup>
import Carousel from "@/components/Carousel.vue";
import Carousel2 from "@/components/Carousel2.vue";
import Slider from "@/components/Slider.vue";
import Hero from "@/components/Hero.vue";
import { ref } from "vue";

const category = ref("Meals");
</script>

<template>
  <main>
    <Hero></Hero>
    <!-- <Carousel2></Carousel2> -->
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 0 124px;
}

@media screen and (max-width: 992px) {
  main {
    margin: 0 80px;
  }
}
@media screen and (max-width: 768) {
  main {
    margin: 0 44px;
  }
}
</style>
