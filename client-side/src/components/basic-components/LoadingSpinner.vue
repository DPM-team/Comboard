<template>
  <teleport to="body">
    <div class="overflow"></div>
    <base-spinner></base-spinner>
  </teleport>
</template>

<script>
export default {};
</script>

<style scoped>
.overflow {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 10;
}
</style>
