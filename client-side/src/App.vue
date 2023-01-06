<template>
  <!-- <index-page></index-page> -->
  <!-- <dashboard-header></dashboard-header> -->
  <!-- <dashboar-footer></dashboar-footer> -->
  <dashboard-page></dashboard-page>
</template>

<script>
// import IndexPage from "./components/pages/IndexPage.vue";
// import DashboardHeader from "./components/headers/DashboardHeader.vue";
// import DashboarFooter from "./components/footers/DashboardFooter.vue";
import DashboardPage from "./components/pages/DashboardPage.vue";

export default {
  name: "App",
  components: {
    // IndexPage,
    // DashboardHeader,
    // DashboarFooter,
    DashboardPage,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

:root {
  --color-primary: #1576bb;
  --color-secondary: #6dcce9;
  --color-tertiary: #89e9b7;
  --color-primary-darker: #0a3c5f;
  --color-secondary-darker: #41b0d1;
  --color-tertiary-darker: #37a769;
  --color-primary-opacity: #73b2e371;
  --color-demo-opacity: #5be28dbf;
  --gradient-primary: linear-gradient(to top left, #1b91e5, #bbc3c8);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  font-family: "Poppins", sans-serif;
}
</style>
