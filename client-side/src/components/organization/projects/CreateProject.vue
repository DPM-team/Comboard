<template>
  <base-dialog title="Create Team" @close="closeDialog">
    <template #main>
      <h3>4324</h3>
      <h3>4324</h3>
    </template>
  </base-dialog>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$router.back();
    },
  },
};
</script>
