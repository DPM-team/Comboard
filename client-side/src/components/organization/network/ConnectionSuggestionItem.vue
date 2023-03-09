<template>
  <div class="sug-item-container">
    <li>{{ firstname }} {{ lastname }}</li>
    <font-awesome-icon class="icon" icon="fa-solid fa-user-plus" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "test",
    };
  },
  props: ["firstname", "lastname"],
};
</script>

<style scoped>
.sug-item-container {
  display: flex;
}
.sug-item-container li {
  font-size: 15px;
  padding: 5px 0;
  width: 90%;
}
.icon {
  font-size: 15px;
  padding: 4px 0;
  float: right;
}
</style>
