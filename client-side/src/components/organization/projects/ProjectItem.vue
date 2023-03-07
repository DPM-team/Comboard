<template>
  <div>
    <h3>{{ projectName }}</h3>
    <p>{{ projectDescription }}</p>
  </div>
</template>

<script>
export default {
  props: {
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
div {
  margin-bottom: 20px;
}
</style>
