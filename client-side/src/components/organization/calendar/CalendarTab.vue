<template>
  <div class="calendar-tab-container">
    <h1>Calendar</h1>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.calendar-tab-container {
  position: absolute;
  top: 100px;
  left: 200px;
  background-color: red;
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
