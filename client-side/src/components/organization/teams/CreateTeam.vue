<template>
  <base-dialog title="Create Team" @close="closeDialog">
    <template #main>
      <h2>fdsfdsfds</h2>
      <h2>fdsfdsfds</h2>
      <h2>fdsfdsfds</h2>
    </template>
  </base-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$router.back();
    },
  },
};
</script>

<style scoped></style>
