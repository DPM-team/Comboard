<template>
  <section class="section" :class="classNames">
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    classNames: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.section {
  padding-top: 10rem;
  padding-right: 4rem;
  padding-bottom: 8rem;
  padding-left: 4rem;
  border-top: 1px solid #ddd;
  transition: transform 1s, opacity 1s;
}

.section__welcome {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: start;
  justify-items: start;
  flex-wrap: wrap;
}
</style>
