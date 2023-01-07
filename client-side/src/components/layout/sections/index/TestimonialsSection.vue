<template>
  <base-section>
    <div class="inner">
      <div class="section__title">
        <h2 class="section__description">Testimonials</h2>
        <h3 class="section__header">What's all the fuss about?</h3>
      </div>
      <div class="row">
        <testimonial-item
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :authorName="testimonial.authorName"
          :authorImageFileName="testimonial.authorImageFileName"
          :testimonialContent="testimonial.testimonialContent"
          :positiveRating="testimonial.positiveRating"
        ></testimonial-item>
      </div>
    </div>
  </base-section>
</template>

<script>
import TestimonialItem from "../../../secondary-components/index/TestimonialItem.vue";

export default {
  components: {
    TestimonialItem,
  },
  data() {
    return {
      testimonials: new Array(
        {
          id: "1",
          authorName: "Full name",
          authorImageFileName: "p1.png",
          testimonialContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          positiveRating: 5,
        },
        {
          id: "2",
          authorName: "Full name",
          authorImageFileName: "p2.png",
          testimonialContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          positiveRating: 3,
        },
        {
          id: "3",
          authorName: "Full name",
          authorImageFileName: "p3.png",
          testimonialContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          positiveRating: 4,
        }
      ),
    };
  },
};
</script>

<style scoped>
.inner {
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
  padding: 0 20px;
}

.section__title {
  max-width: 80rem;
  margin: 0 auto 8rem auto;
  text-align: start;
}

.section__description {
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.section__header {
  font-size: 4rem;
  line-height: 1.3;
  font-weight: 500;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
