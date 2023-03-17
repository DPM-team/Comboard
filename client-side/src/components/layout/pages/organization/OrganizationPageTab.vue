<template>
  <div :class="layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    layout: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
div {
  position: absolute;
  top: 60px;
  left: 200px;
  background-color: var(--tab-grey-background);
  width: 100%;
  height: calc(100% - 60px);
}
.flex {
  display: flex;
}

.block {
  display: block;
  overflow-y: auto;
}

/* Responsiveness */

@media (max-width: 1250px) {
  div {
    left: 180px;
  }
}
@media (max-width: 1150px) {
  div {
    left: 80px;
  }
}

@media (max-width: 700px) {
  div {
    left: 55px;
  }
}
@media (max-width: 450px) {
  div {
    left: 45px;
  }
}
</style>
