<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link class="link-button" v-else :to="to" :class="mode">
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
button,
.link-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  font-size: 15px;
  border-radius: 5px;
  transition-duration: 0.4s;
  /* font-weight: bold; */
  height: 40px;
  width: 80px;
  margin-top: 20px;
  margin-left: 5px;
}

.link-button {
  text-decoration: none;
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
  button,
  .link-button {
    /* display: inline-block; */
    height: 35px;
    width: 55px;
    margin-top: 20px;
    margin-left: 5px;
  }
}
@media (max-width: 560px) {
  button,
  .link-button {
    /* display: inline-block; */
    height: 35px;
    width: 55px;
    margin-top: 20px;
    margin-left: 5px;
  }
}
</style>
