<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <NavBar />
  <RouterView></RouterView>

  <Footer></Footer>
  <!-- footer width need fix(adaptivity) -->
</template>

<style lang="scss" scoped></style>
