<template>
  <div>
    <base-image-box
      v-for="testimonial in testimonials"
      :key="testimonial.fullname"
      :fullname="testimonial.fullname"
      :pictureLink="testimonial.pictureLink"
      :description="testimonial.description"
    ></base-image-box>
  </div>
</template>

<script>
import BaseImageBox from "./components/basic-components/BaseImageBox.vue";

export default {
  name: "App",
  components: {
    BaseImageBox,
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
</style>
