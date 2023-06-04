<template>
  <header>
    <img src="../../assets/comboard-logo/logo-only-symbol.png" width="70" @click.prevent="moveToDashboard()" />
    <slot></slot>
  </header>
</template>

<script>
export default {
  methods: {
    moveToDashboard() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
img {
  display: block;
  margin-top: -10px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
</style>
