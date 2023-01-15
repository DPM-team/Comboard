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
  display: block;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  transition-duration: 0.4s;
  /* font-weight: bold; */
  height: 40px;
  width: 80px;
  margin-top: 20px;
  margin-left: 5px;
}

.primary {
  background-color: var(--color-sixth);
  color: white;
  border: 1px solid black;
}
.secondary {
  background-color: var(--color-fourth);
  color: white;
  border: 1px solid black;
}

/* Responsiveness */
@media (max-width: 800px) {
  button {
    display: inline-block;
    height: 35px;
    width: 55px;
    margin-top: 20px;
    margin-left: 5px;
  }
}
@media (max-width: 560px) {
  button {
    display: inline-block;
    height: 35px;
    width: 55px;
    margin-top: 20px;
    margin-left: 5px;
  }
}
</style>
