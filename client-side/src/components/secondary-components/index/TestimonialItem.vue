<template>
  <div class="column--container">
    <div class="testimonial">
      <img :src="formatImagePath" alt="Image of the author of this testimonial." />
      <div class="name">{{ authorName }}</div>
      <p>{{ testimonialContent }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authorName: {
      type: String,
      required: true,
    },
    authorImageFileName: {
      type: String,
      required: true,
    },
    testimonialContent: {
      type: String,
      required: true,
    },
  },
  computed: {
    formatImagePath() {
      return require("../../../assets/images/index/" + this.authorImageFileName);
    },
  },
};
</script>

<style scoped>
.column--container {
  flex: 33.33%;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 15px;
}

.testimonial {
  background: #fff;
  padding: 30px;
  box-shadow: 0 0 2.5em rgba(0, 0, 0, 0.15);
}

.testimonial img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.name {
  font-size: 20px;
  text-transform: uppercase;
  margin: 20px 0;
}
/* Responsiveness */

@media (max-width: 750px) {
  .column--container {
    flex: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
  .testimonial {
    width: 80%;
    margin: 0 auto;
  }
}
@media (max-width: 500px) {
  .testimonial {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
