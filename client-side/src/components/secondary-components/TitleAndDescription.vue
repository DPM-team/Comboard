<template>
  <div class="section__title">
    <h2 class="section__description">{{ title }}</h2>
    <h3 class="section__header">{{ description }}</h3>
  </div>
</template>

<script>
export default {
  props: ["title", "description"],
};
</script>

<style scoped>
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
