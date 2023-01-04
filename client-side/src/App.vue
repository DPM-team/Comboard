<template>
  <base-options-card></base-options-card>
</template>

<script>
import BaseOptionsCard from "./components/basic-components/BaseOptionsCard.vue";

export default {
  name: "App",
  components: {
    BaseOptionsCard,
  },
  data() {
    return {
      testimonials: [
        { fullname: "Dionisis Lougaris", pictureLink: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", description: "This is a description!" },
        { fullname: "Panagiotis Machairas", pictureLink: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", description: "This is a description!" },
        { fullname: "Minas Theodoros Charakopoulos", pictureLink: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", description: "This is a description!" },
      ],
    };
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
</style>
