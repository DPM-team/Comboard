<template>
  <ul class="options-list" :class="position">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.options-list {
  background: var(--color-primary);
  display: inline-block;
  position: absolute;
  top: 50px;

  z-index: 4;
  list-style: none;
  /* padding: 10px; */
}
.user-toggle {
  right: 50px;
  width: 180px;
}
.video-toggle {
  right: 80px;
  width: 180px;
}
.messages-toggle {
  right: 70px;
  width: 250px;
}
.notifications-toggle {
  right: 150px;
  width: 180px;
}
</style>
