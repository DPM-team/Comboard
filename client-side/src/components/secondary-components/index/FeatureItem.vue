<template>
  <section class="feature__item">
    <slot name="first"></slot>
    <slot name="second"></slot>
  </section>
</template>

<style scoped>
.feature__item {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: start;
  justify-items: start;
  flex-wrap: wrap;
}
</style>
