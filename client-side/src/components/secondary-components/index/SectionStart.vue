<template>
  <div class="section__title">
    <h2 class="section__description">{{ sectionTitle }}</h2>
    <h3 class="section__header">{{ sectionDescription }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    sectionTitle: {
      type: String,
      required: true,
    },
    sectionDescription: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
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

/* Responsiveness */
@media (max-width: 1100px) {
  .section__title {
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
