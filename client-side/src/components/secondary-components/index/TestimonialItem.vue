<template>
  <div class="column--33perc">
    <div class="testimonial">
      <img :src="formatImagePath" alt="Image of the author of this testimonial." />
      <div class="name">{{ authorName }}</div>
      <div class="stars">
        <i class="fas fa-star" v-for="star in positiveRating" :key="star"></i>
        <i class="far fa-star" v-for="star in 5 - positiveRating" :key="star"></i>
      </div>
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
    positiveRating: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0 && value <= 5;
      },
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
.column--33perc {
  flex: 33.33%;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 15px;
}

.testimonial {
  background: #fff;
  padding: 30px;
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

.stars {
  color: #6ab04c;
  margin-bottom: 20px;
}
</style>
