<template>
  <div class="base-card" :width="width" :colorEr="error">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["width"],
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
  /* width: 80%; */
}

div[width] {
  width: v-bind(width);
}

div[colorEr] {
  background-color: #f4725b;
}
</style>
