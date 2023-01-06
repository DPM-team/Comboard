<template>
  <div class="column--33perc">
    <div class="testimonial">
      <img :src="pictureLink" />
      <div class="name">{{ fullname }}</div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fullname", "pictureLink", "description"],
};
</script>

<style scoped>
.testimonials {
  padding-top: 40px;
  padding-bottom: 80px;
  background: #f1f1f1;
  color: #434343;
  text-align: center;
}

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
</style>
