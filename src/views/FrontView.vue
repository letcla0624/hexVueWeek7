<template>
  <FrontNavbarComponent></FrontNavbarComponent>
  <router-view />
  <footer class="bg-light py-3">
    <p class="text-center mb-0">&copy; 2022 - 威爾 in hexschool Design</p>
  </footer>
</template>

<script>
import FrontNavbarComponent from "@/components/FrontNavbarComponent.vue";

export default {
  components: {
    FrontNavbarComponent,
  },
};
</script>
