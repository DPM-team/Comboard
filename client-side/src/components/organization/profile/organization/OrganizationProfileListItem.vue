<template>
  <div class="item">
    <h3>{{ itemTitle }}</h3>
    <p>{{ itemDescription }}</p>
  </div>
</template>

<script>
export default {
  props: ["itemTitle", "itemDescription"],
};
</script>

<style scoped>
.item {
  width: 100%;
  background: white;
  padding: 20px;
  margin-top: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>
