<template>
  <div :class="'column--section-features-with-text-' + position + ' feature--text'">
    <div class="features__feature">
      <div class="features__icon">
        <img :src="formatImagePath" />
      </div>
      <h5 class="features__header">{{ title }}</h5>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    secondaryIconFileName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "right",
    },
  },
  computed: {
    formatImagePath() {
      return require("../../../assets/images/index/" + this.secondaryIconFileName);
    },
  },
};
</script>

<style scoped>
.column--section-features-with-text-left {
  flex: 50%;
  max-width: 50%;
  box-sizing: border-box;
  text-align: start;
  justify-content: start;
  padding-left: 28rem;
  padding-top: 10rem;
}

.column--section-features-with-text-right {
  flex: 60%;
  max-width: 60%;
  box-sizing: border-box;
  text-align: start;
  justify-content: start;
  padding-left: 8rem;
  padding-right: 15rem;
  padding-top: 10rem;
}

.features__feature {
  align-self: center;
  justify-self: center;
  width: 70%;
  font-size: 1.5rem;
}

.features__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-opacity);
  height: 5.5rem;
  width: 5.5rem;
  border-radius: 50%;
  margin-bottom: 2rem;
}

.features__icon img {
  height: 2.5rem;
  width: 2.5rem;
  fill: var(--color-primary);
}

.features__header {
  font-size: 2rem;
  margin-bottom: 1rem;
}

@media screen and (max-width: 960px) {
  .column--section-features-with-text-right,
  .column--section-features-with-text-left {
    flex: 100%;
    max-width: 80%;
  }
}

@media screen and (max-width: 600px) {
  .column--section-features-with-text-right,
  .column--section-features-with-text-left {
    flex: 100%;
    max-width: 100%;
  }

  .feature--text {
    padding: 2rem;
    flex: 100%;
    width: 90%;
  }
}
</style>
