<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  display: block;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 10px;
  margin: 5px auto;
  background-color: white;
  min-height: 70vh;
  width: 80%;
}
</style>
