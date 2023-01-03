<template>
  <landing-section></landing-section>
</template>

<script>
import LandingSection from "./components/sections/index/LandingSection.vue";

export default {
  name: "App",
  components: {
    LandingSection,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

body {
  font-family: "Poppins", sans-serif;
}
</style>
