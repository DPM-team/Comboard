<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #000875;
  border-color: #000875;
}

.close-btn {
  background-color: rgb(189, 25, 25);
  color: white;
  border: none;
}

.close-btn:hover,
.close-btn:active {
  background-color: rgb(148, 0, 0);
}
</style>
