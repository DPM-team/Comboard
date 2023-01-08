<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button {
  padding: 0.75rem;
  display: block;
  cursor: pointer;
  text-align: center;
  border-radius: 0.25rem;
  transition-duration: 0.4s;
  font-weight: bold;
}

.primary {
  background-color: blue;
  color: white;
  border: 2px solid black;
}
.secondary {
  background-color: red;
  color: white;
  border: 2px solid black;
}
</style>
