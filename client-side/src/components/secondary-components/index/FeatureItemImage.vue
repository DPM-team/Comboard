<template>
  <div :class="'column--section-features-with-image-' + position">
    <img :src="formatImagePath" :data-src="formatImagePath" :alt="'Image for ' + title" class="features__img lazy-img" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    mainImageFileName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "left",
    },
  },
  computed: {
    formatImagePath() {
      return require("../../../assets/images/index/" + this.mainImageFileName);
    },
  },
};
</script>

<style scoped>
.column--section-features-with-image-left {
  flex: 40%;
  max-width: 40%;
  box-sizing: border-box;
  display: flex;
  justify-content: end;
  padding-left: 10rem;
  padding-top: 10rem;
}

.column--section-features-with-image-right {
  flex: 40%;
  max-width: 40%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  padding-right: 10rem;
  padding-top: 10rem;
}

.features__img {
  width: 80%;
}

/***** Add with JS later *****/
/* .lazy-img {
    filter: blur(20px);
  } */

@media screen and (max-width: 960px) {
  .column--section-features-with-image-left,
  .column--section-features-with-image-right {
    flex: 100%;
    max-width: 80%;
  }
}

@media screen and (max-width: 600px) {
  .column--section-features-with-image-left,
  .column--section-features-with-image-right {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
