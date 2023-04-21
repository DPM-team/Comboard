<template>
  <li>
    <div class="item">
      <h1>{{ text }}</h1>
      <button v-if="isPrivateProfile">Remove</button><button>View</button>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["text", "isPrivateProfile"],
};
</script>
<style scoped>
.item {
  margin-top: 10px;
}
.item h1 {
  font-size: 17px;
}
button {
  margin-left: 3px;
}
</style>
