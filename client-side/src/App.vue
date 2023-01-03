<template>
  <div>
    <index-header></index-header>
    <index-footer></index-footer>
  </div>
</template>

<script>
// import AuthForm from "./components/auth/AuthForm.vue";
//import LoginPage from "./components/pages/LoginPage.vue";
// import RegisterPage from "./components/pages/RegisterPage.vue";
import IndexHeader from "./components/headers/IndexHeader.vue";
import IndexFooter from "./components/footers/IndexFooter.vue";

export default {
  name: "App",
  components: {
    //LoginPage,
    // RegisterPage,
    // AuthForm,
    IndexHeader,
    IndexFooter,
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
