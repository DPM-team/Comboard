<template>
  <div class="teams-tab-container">
    <h1>Teams</h1>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.teams-tab-container {
  position: absolute;
  top: 100px;
  left: 200px;
  background-color: red;
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
