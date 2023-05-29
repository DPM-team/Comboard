<template>
  <li>
    <div class="item">
      <h1>{{ text }}</h1>
      <button class="remove-btn" v-if="isPrivateProfile">Remove</button><button>View</button>
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
  margin-top: 3px;
  padding: 0.3rem 0.75rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}
.remove-btn {
  margin-left: 3px;
  margin-top: 3px;
  padding: 0.3rem 0.75rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}
</style>
