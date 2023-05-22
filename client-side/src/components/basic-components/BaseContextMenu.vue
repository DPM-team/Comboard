<template>
  <div class="context-menu" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
    <ul>
      <slot name="options"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  z-index: 9999;
}

.context-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
