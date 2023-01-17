<template>
  <section class="testimonial-section-container">
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
  </section>
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
.testimonial-section-container {
  padding-top: 70px;
  padding-bottom: 60px;
}
.section__title {
  max-width: 80%;
  margin: 0 auto 50px auto;
  text-align: start;
}

.section__description {
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 10px;
}

.section__header {
  font-size: 38px;
  line-height: 1.3;
  font-weight: 500;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
}

/* Responsiveness */

@media (max-width: 1100px) {
  .section__title {
    width: 90%;
  }
  .row {
    width: 90%;
  }
}

@media (max-width: 800px) {
  .section__description {
    font-size: 24px;
  }

  .section__header {
    font-size: 35px;
  }
}

@media (max-width: 570px) {
  .section__description {
    font-size: 20px;
  }

  .section__header {
    font-size: 30px;
  }
}
</style>
