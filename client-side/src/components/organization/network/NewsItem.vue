<template>
  <div class="news-item-container">
    <li>{{ description }}</li>
    <font-awesome-icon class="icon" icon="fa-solid fa-angles-right" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["description"],
};
</script>

<style scoped>
.news-item-container {
  display: flex;
}
.news-item-container li {
  font-size: 15px;
  padding: 5px 0;
  width: 90%;
}
.icon {
  font-size: 13px;
  padding: 8px 0;
  float: right;
  cursor: pointer;
  color: var(--color-primary);
  margin-left: 2px;
}
</style>
