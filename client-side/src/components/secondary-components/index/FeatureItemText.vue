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
  padding-left: 200px;
  padding-top: 50px;
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
  font-size: 17px;
}

.features__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-fifth);
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.features__icon img {
  height: 26px;
  width: 26px;
  fill: var(--color-primary);
  /* fill: white; */
}

.features__header {
  font-size: 28px;
  margin-bottom: 10px;
}
/* 
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
} */
</style>
