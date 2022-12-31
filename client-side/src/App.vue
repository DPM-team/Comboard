<template>
  <!-- <auth-form></auth-form> -->
  <index-header></index-header>
</template>

<script>
// import AuthForm from "./components/auth/AuthForm.vue";
import IndexHeader from "./components/headers/IndexHeader.vue";

export default {
  name: "App",
  components: {
    // AuthForm,
    IndexHeader,
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
