<template>
  <div class="tab-container"><slot></slot></div>
</template>

<script>
export default {};
</script>

<style scoped>
.tab-container {
  position: absolute;
  top: 60px;
  left: 200px;
  background-color: var(--tab-grey-background);
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
}

/* Responsiveness */

@media (max-width: 1250px) {
  .tab-container {
    left: 180px;
  }
}
@media (max-width: 1150px) {
  .tab-container {
    left: 80px;
  }
}

@media (max-width: 700px) {
  .tab-container {
    left: 55px;
  }
}
@media (max-width: 450px) {
  .tab-container {
    left: 45px;
  }
}
</style>
