<template>
  <div @click="moveToDashboard()">
    <button class="rtn-button">Return to Dashboard</button>
    <font-awesome-icon class="back-icon" :icon="['fas', 'circle-chevron-left']" />
  </div>
</template>

<script>
export default {
  methods: {
    moveToDashboard() {
      this.$router.push("/organization");
    },
  },
};
</script>

<style scoped>
.back-icon {
  position: absolute;
  top: 15px;
  left: 30px;
  font-size: 28px;
  color: var(--color-primary);
  display: none;
}

.rtn-button {
  position: absolute;
  top: 10px;
  left: 40px;
  padding: 0.5rem 1.2rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

.rtn-button:hover,
.rtn-button:active {
  background-color: #000875;
  border-color: #000875;
}

@media (max-width: 600px) {
  .rtn-button {
    display: none;
  }
  .back-icon {
    display: block;
  }
}
</style>
