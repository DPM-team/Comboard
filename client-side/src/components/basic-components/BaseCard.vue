<template>
  <div class="base-card" :width="width" :bgColor="bgColor">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      default: "#ffffff",
    },
  },
};
</script>

<style scoped>
.base-card {
  display: block;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 10px;
  margin: 5px auto;
  background-color: white;
}

div[width] {
  width: v-bind(width);
}

div[bgColor] {
  background-color: v-bind(bgColor);
}
</style>
