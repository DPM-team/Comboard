<template>
  <div :class="handleOuterDivClasses">
    <div :class="'packages__icon packages__icon--' + id">
      <img :src="formatImagePath" />
    </div>
    <br />
    <h5 class="packages__header">{{ title }}</h5>
    <br />
    <p>{{ detailedDescription }}</p>
    <button class="btn--text-packages">Get started &RightArrow;</button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    detailedDescription: {
      type: String,
      required: true,
    },
    imageFileName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    formatImagePath() {
      return require("../../../assets/images/index/" + this.imageFileName);
    },
    handleOuterDivClasses() {
      if (this.isActive) {
        return "packages__content packages__content--active";
      }

      return "packages__content";
    },
  },
};
</script>

<style scoped>
.packages__content {
  display: none;
  /* JUST PRESENTATIONAL */
  font-size: 18px;
  padding: 40px 60px 75px 60px;
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;
}

.packages__content--active {
  display: block;
}

.packages__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.packages__icon img {
  height: 30px;
  width: 30px;
}

.packages__icon--1 {
  background-color: var(--color-third);
}

.packages__icon--2 {
  background-color: var(--color-sixth);
}

.packages__icon--3 {
  background-color: var(--color-secondary);
}

.packages__header {
  font-size: 28px;
  font-weight: 500;
  align-self: center;
}

.btn--text-packages {
  float: right;
  background: none;
  font-size: 18px;
  font-family: inherit;
  font-weight: 500;
  color: var(--color-primary);
  border: none;
  border-bottom: 1px solid currentColor;
  padding-top: 15px;
  padding-bottom: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

/* Responsiveness */
@media (max-width: 800px) {
  .packages__header {
    font-size: 25px;
  }

  .btn--text-packages {
    font-size: 16px;
  }

  .packages__content {
    font-size: 16px;
  }
}
</style>
