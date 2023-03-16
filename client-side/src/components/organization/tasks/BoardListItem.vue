<template>
  <div class="list-item">
    {{ this.content }}
  </div>
</template>

<script>
export default {
  props: {
    content: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.list-item {
  background: red;
  color: blue;
}
</style>
