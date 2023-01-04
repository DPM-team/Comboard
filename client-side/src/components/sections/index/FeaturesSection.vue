<template>
  <section class="section" id="section--features">
    <div class="section__title">
      <h2 class="section__description">Features</h2>
      <h3 class="section__header">Every tool you need in order to do your job, lies inside the Comboard universe.</h3>
    </div>
    <feature-item></feature-item>
    <feature-item></feature-item>
    <feature-item></feature-item>
  </section>
</template>

<script>
import FeatureItem from "../../secondary-components/index/FeatureItem.vue";

export default {
  components: {
    FeatureItem,
  },
};
</script>

<style>
.section {
  padding-top: 10rem;
  padding-right: 4rem;
  padding-bottom: 8rem;
  padding-left: 4rem;
  border-top: 1px solid #ddd;
  transition: transform 1s, opacity 1s;
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
</style>
