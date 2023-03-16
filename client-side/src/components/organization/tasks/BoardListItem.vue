<template>
  <div class="list-item">
    <p>{{ this.content }}</p>
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
  background: white;
  padding: 6px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: blue;
}
.list-item p {
  color: black;
  font-size: 12px;
  margin-left: 5px;
}
</style>
