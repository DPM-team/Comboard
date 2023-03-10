<template>
  <div class="tab-container"><slot></slot></div>
</template>

<script>
export default {};
</script>

<style scoped>
.tab-container {
  position: absolute;
  top: 60px;
  left: 200px;
  background-color: var(--tab-grey-background);
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
}
</style>
