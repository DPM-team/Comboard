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
  background-color: #1c32ad;
  border: 1px solid #1c32ad;
  color: white;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #000875;
  border-color: #000875;
}

.close-btn {
  background-color: red;
  color: white;
  border: none;
}

.close-btn:hover,
.close-btn:active {
  background-color: rgb(148, 0, 0);
}
</style>
