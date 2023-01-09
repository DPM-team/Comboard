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
  height: 40px;
  width: 80px;
  margin-top: 20px;
  margin-left: 5px;
}

.primary {
  background-color: var(--color-sixth);
  color: white;
  border: 2px solid black;
}
.secondary {
  background-color: var(--color-primary);
  color: white;
  border: 2px solid black;
}
</style>
